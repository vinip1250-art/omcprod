import { prisma } from "@/lib/prisma"

export async function GET() {
  const products = await prisma.product.findMany()

  const totalInvested = products.reduce((a, p) => a + p.purchaseValue, 0)
  const totalRealCost = products.reduce((a, p) => a + p.realCost, 0)
  const totalResale = products.reduce((a, p) => a + (p.resaleValue || 0), 0)

  const profit = totalResale - totalRealCost

  return Response.json({
    totalInvested,
    totalRealCost,
    totalResale,
    profit
  })
}
