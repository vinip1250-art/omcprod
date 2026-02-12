export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import { getUserCompany } from "@/lib/auth"

function calculateFinalCost(body: any) {
  const base =
    Number(body.purchaseValue || 0) +
    Number(body.freightCost || 0) -
    Number(body.discountBefore || 0)

  const mileDiscount =
    (Number(body.pointsExpected || 0) / 1000) *
    Number(body.mileValue || 0)

  const cashback = Number(body.cashbackValue || 0)

  return base - mileDiscount - cashback
}

export async function GET() {
  const companyId = await getUserCompany()

  const purchases = await prisma.purchase.findMany({
    where: { companyId },
    include: { product: true },
    orderBy: { createdAt: "desc" }
  })

  return Response.json(purchases)
}

export async function POST(req: Request) {
  const body = await req.json()
  const companyId = await getUserCompany()

  const finalCost = calculateFinalCost(body)

  const purchase = await prisma.purchase.create({
    data: {
      ...body,
      purchaseDate: new Date(body.purchaseDate),
      deliveryDate: body.deliveryDate
        ? new Date(body.deliveryDate)
        : null,
      finalCost,
      companyId
    }
  })

  return Response.json(purchase)
}

export async function PUT(req: Request) {
  const body = await req.json()

  const finalCost = calculateFinalCost(body)

  const purchase = await prisma.purchase.update({
    where: { id: body.id },
    data: {
      ...body,
      finalCost
    }
  })

  return Response.json(purchase)
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  await prisma.purchase.delete({
    where: { id: id! }
  })

  return Response.json({ success: true })
}
