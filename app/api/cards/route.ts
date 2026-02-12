import { prisma } from "@/lib/prisma"
import { getUserCompany } from "@/lib/auth"

export async function POST(req: Request) {
  const body = await req.json()
  const companyId = await getUserCompany()

  const card = await prisma.card.create({
    data: { ...body, companyId }
  })

  return Response.json(card)
}

export async function GET() {
  const companyId = await getUserCompany()
  const cards = await prisma.card.findMany({
    where: { companyId }
  })
  return Response.json(cards)
}
