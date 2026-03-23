import { NextResponse, type NextRequest } from "next/server"

import { authCookieName, verifySessionToken } from "@/lib/auth"

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const isAuthenticated = verifySessionToken(request.cookies.get(authCookieName)?.value)

  if (pathname === "/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/", request.url))
    }

    return NextResponse.next()
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
