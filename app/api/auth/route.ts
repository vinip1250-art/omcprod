import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { generateToken } from "@/lib/auth"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { email, password: hashed }
  })

  const token = generateToken(user.id)

  return Response.json({ token })
}
