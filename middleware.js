import { NextResponse } from "next/server";

export async function middleware(req) {
  const cookies = req.cookies;

  if (!cookies.get("authjs.session-token")) {
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/protected",
};
