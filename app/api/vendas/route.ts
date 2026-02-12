export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import { getUserCompany } from "@/lib/auth"

export async function POST(req: Request) {
  const body = await req.json()
  const companyId = await getUserCompany()

  const stock = await prisma.stock.findFirst({
    where: {
      productId: body.productId,
      companyId
    }
  })

  if (!stock || stock.quantity < body.quantity) {
    return Response.json(
      { error: "Estoque insuficiente" },
      { status: 400 }
    )
  }

  const totalValue = body.unitValue * body.quantity
  const cost = stock.finalCost * body.quantity
  const profit = totalValue - cost

  await prisma.stock.update({
    where: { id: stock.id },
    data: {
      quantity: stock.quantity - body.quantity
    }
  })

  const sale = await prisma.sale.create({
    data: {
      ...body,
      totalValue,
      profit,
      companyId
    }
  })

  return Response.json(sale)
}
