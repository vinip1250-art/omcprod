export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import { getUserCompany } from "@/lib/auth"

export async function POST(req: Request) {
  const body = await req.json()
  const companyId = await getUserCompany()

  const purchase = await prisma.purchase.create({
    data: {
      ...body,
      purchaseDate: new Date(body.purchaseDate),
      companyId
    }
  })

  if (body.delivered) {
    const finalCost =
      (body.purchaseValue + (body.freightCost || 0)) /
      body.quantity

    await prisma.stock.create({
      data: {
        productId: body.productId,
        quantity: body.quantity,
        finalCost,
        entryDate: new Date(),
        companyId
      }
    })
  }

  return Response.json(purchase)
}
