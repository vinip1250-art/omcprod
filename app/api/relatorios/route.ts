export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import { getUserCompany } from "@/lib/auth"

export async function GET() {
  const companyId = await getUserCompany()

  // totais compras
  const totalCompras = await prisma.purchase.aggregate({
    where: { companyId },
    _sum: {
      purchaseValue: true,
      freightCost: true
    }
  })

  // estoque
  const totalEstoque = await prisma.stock.aggregate({
    where: { companyId },
    _sum: {
      quantity: true,
      finalCost: true
    }
  })

  // vendas e lucro
  const totalVendas = await prisma.sale.aggregate({
    where: { companyId },
    _sum: {
      totalValue: true,
      profit: true
    }
  })

  // milhas pendentes
  const compras = await prisma.purchase.findMany({
    where: { companyId }
  })
  const totalMilhasPendentes = compras.reduce(
    (acc, c) =>
      acc +
      ((c.pointsQuantity || 0) -
        (c.delivered ? 0 : 0)),
    0
  )

  return Response.json({
    totalCompras,
    totalEstoque,
    totalVendas,
    totalMilhasPendentes
  })
}
