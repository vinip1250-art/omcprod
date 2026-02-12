import { prisma } from "@/lib/prisma"
import { calculateRealCost } from "@/lib/mileCalculator"

export async function POST(req: Request) {
  const body = await req.json()

  const realCost = calculateRealCost(
    body.purchaseValue,
    body.cashbackValue,
    body.pointsQuantity,
    body.pointsProgram
  )

  const product = await prisma.product.create({
    data: {
      ...body,
      realCost
    }
  })

  return Response.json(product)
}

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" }
  })
  return Response.json(products)
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) return Response.json({ error: "Missing id" }, { status: 400 })

  await prisma.product.delete({
    where: { id }
  })

  return Response.json({ success: true })
}
