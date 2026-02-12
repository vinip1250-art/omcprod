import { prisma } from "@/lib/prisma"
import { getUserCompany } from "@/lib/auth"

export async function GET() {
  const companyId = await getUserCompany()

  const products = await prisma.product.findMany({
    where: { companyId }
  })

  const header = "Produto,Compra,Lucro,ROI\n"

  const rows = products.map(p =>
    `${p.description},${p.purchaseValue},${p.profit},${p.roi}`
  ).join("\n")

  return new Response(header + rows, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=relatorio.csv"
    }
  })
}
