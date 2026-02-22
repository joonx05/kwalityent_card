import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE_NAME = "admin_token";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Leave /admin (login) public; protect /admin/form and /admin/cards and their nested routes
  if (pathname === "/admin") {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET ?? "kwality-admin-secret-change-in-production"
  );

  try {
    const { payload } = await jwtVerify(token, secret);
    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/admin",
    "/admin/form",
    "/admin/form/:path*",
    "/admin/cards",
    "/admin/cards/:path*",
  ],
};
