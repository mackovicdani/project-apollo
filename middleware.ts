import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const auth = req.cookies.get("auth");
  const pathname = req.nextUrl.pathname;
  if (pathname.endsWith("/home")) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (!pathname.endsWith("/login") && !pathname.endsWith("/signup") && !auth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if ((pathname.endsWith("/login") || pathname.endsWith("/signup")) && auth) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/", "/signup", "/login", "/wallets", "/home"],
};
