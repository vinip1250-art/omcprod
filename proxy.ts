import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "./lib/auth"

export function proxy(request: NextRequest) {
  const token = request.headers
    .get("authorization")
    ?.replace("Bearer ", "")

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

  try {
    verifyToken(token)
    return NextResponse.next()
  } catch {
    return NextResponse.json(
      { error: "Invalid Token" },
      { status: 401 }
    )
  }
}

export const config = {
  matcher: ["/api/products/:path*", "/api/dashboard/:path*"]
}
