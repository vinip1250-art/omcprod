import { calculateProduct } from "@/lib/calculator"

export async function POST(req: Request) {
  const body = await req.json()
  const result = calculateProduct(body)
  return Response.json(result)
}
