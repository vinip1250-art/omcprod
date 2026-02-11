import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { email, password, companyName } = await req.json()

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Usuário já existe" },
        { status: 400 }
      )
    }

    const hashed = await bcrypt.hash(password, 10)

    const company = await prisma.company.create({
      data: { name: companyName }
    })

    await prisma.user.create({
      data: {
        email,
        password: hashed,
        companyId: company.id
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    )
  }
}
