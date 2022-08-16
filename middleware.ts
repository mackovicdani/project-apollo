import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const auth = req.cookies.get("auth");
  if (req.nextUrl.pathname === "/" && !auth) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (
    (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup") &&
    auth
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
