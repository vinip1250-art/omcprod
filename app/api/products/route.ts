export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import { getUserCompany } from "@/lib/auth"
import { calculateProduct } from "@/lib/calculator"

export async function GET() {
  const companyId = await getUserCompany()

  const products = await prisma.product.findMany({
    where: { companyId },
    orderBy: { createdAt: "desc" }
  })

  return Response.json(products)
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const companyId = await getUserCompany()

    const calc = calculateProduct(body)

    const product = await prisma.product.create({
      data: {
        description: body.description,
        purchaseDate: new Date(body.purchaseDate),
        purchaseValue: Number(body.purchaseValue),
        cashbackValue: Number(body.cashbackValue),
        pointsQuantity: Number(body.pointsQuantity),
        creditedPoints: body.creditedPoints
          ? Number(body.creditedPoints)
          : null,
        pointsProgram: body.pointsProgram,
        resaleValue: body.resaleValue
          ? Number(body.resaleValue)
          : null,
        ...calc,
        companyId
      }
    })

    return Response.json(product)
  } catch (err) {
    console.error("Erro ao salvar produto:", err)
    return Response.json(
      { error: "Erro ao salvar produto" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 })
  }

  await prisma.product.delete({
    where: { id }
  })

  return Response.json({ success: true })
}
