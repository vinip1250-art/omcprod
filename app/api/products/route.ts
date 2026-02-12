export const dynamic = "force-dynamic"

import { prisma } from "@/lib/prisma"
import { getUserCompany } from "@/lib/auth"

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

    const product = await prisma.product.create({
      data: {
        description: body.description,
        companyId
      }
    })

    return Response.json(product)
  } catch (err) {
    console.error("Erro ao salvar produto:", err)
    return Response.json({ error: "Erro ao salvar" }, { status: 500 })
  }
}
