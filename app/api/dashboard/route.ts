import { prisma } from "@/lib/prisma"

export async function GET() {
  const products = await prisma.product.findMany()

  const monthly: Record<string, number> = {}

  products.forEach(p => {
    const month = new Date(p.createdAt)
      .toLocaleString("pt-BR", { month: "short", year: "numeric" })

    const profit =
      (p.resaleValue || 0) - p.realCost

    monthly[month] = (monthly[month] || 0) + profit
  })

  return Response.json({
    monthly: Object.entries(monthly).map(([month, profit]) => ({
      month,
      profit
    }))
  })
}
