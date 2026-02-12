import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { prisma } from "./prisma"

export function generateToken(userId: string) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  )
}

export async function getUserFromToken() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  if (!token) return null

  try {
    const decoded: any = jwt.verify(
      token,
      process.env.JWT_SECRET!
    )

    return decoded.userId
  } catch {
    return null
  }
}

export async function getUserCompany() {
  const userId = await getUserFromToken()
  if (!userId) throw new Error("Unauthorized")

  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) throw new Error("User not found")

  return user.companyId
}
