import { prisma } from "@/lib/prisma"
import { getUserCompany } from "@/lib/auth"

export async function GET() {
  const companyId = await getUserCompany()

  const products = await prisma.product.findMany({
    where: { companyId }
  })

  const programData: Record<string, number> = {}

  products.forEach(p => {
    programData[p.pointsProgram] =
      (programData[p.pointsProgram] || 0) + (p.profit || 0)
  })

  return Response.json({
    summary: {
      invested: products.reduce((a,p)=>a+p.purchaseValue,0),
      profit: products.reduce((a,p)=>a+(p.profit||0),0)
    },
    programChart: Object.entries(programData).map(([name,value])=>({
      name,
      value
    }))
  })
}
