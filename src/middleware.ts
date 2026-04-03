import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { shouldSameOriginProxyR2Asset } from "@/lib/segment-static-asset";

const COOKIE_NAME = "admin_token";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Same-origin R2 proxy: /uuid.png stays on this host; internal rewrite only.
  const rootFile = pathname.match(/^\/([^/]+)$/);
  if (rootFile) {
    let segment: string;
    try {
      segment = decodeURIComponent(rootFile[1]);
    } catch {
      segment = rootFile[1];
    }
    if (shouldSameOriginProxyR2Asset(segment)) {
      const url = request.nextUrl.clone();
      url.pathname = `/api/r2-public/${encodeURIComponent(segment)}`;
      return NextResponse.rewrite(url);
    }
  }

  const isAdminLogin = pathname === "/admin";
  const isAdminProtected =
    pathname.startsWith("/admin/") || pathname === "/admin";

  if (!isAdminProtected) {
    return NextResponse.next();
  }

  if (isAdminLogin) {
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
    "/:file",
  ],
};
