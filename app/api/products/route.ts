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
