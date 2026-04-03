import { NextRequest, NextResponse } from "next/server";

function r2PublicBase(): string {
  const base =
    process.env.R2_PUBLIC_URL?.trim() ||
    process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.trim() ||
    "";
  return base.replace(/\/$/, "");
}

type RouteCtx = { params: Promise<{ key: string }> };

async function proxyFromR2(
  req: NextRequest,
  key: string
): Promise<NextResponse> {
  const base = r2PublicBase();
  if (!base) {
    return new NextResponse(null, { status: 503 });
  }

  const safeKey = key.split("/").filter(Boolean).map(encodeURIComponent).join("/");
  const upstreamUrl = `${base}/${safeKey}`;

  const upstream = await fetch(upstreamUrl, {
    method: req.method === "HEAD" ? "HEAD" : "GET",
    headers: {
      Accept: req.headers.get("Accept") ?? "*/*",
    },
  });

  if (!upstream.ok) {
    return new NextResponse(null, {
      status: upstream.status === 404 ? 404 : 502,
    });
  }

  const headers = new Headers();
  const ct = upstream.headers.get("Content-Type");
  if (ct) headers.set("Content-Type", ct);
  const cache = upstream.headers.get("Cache-Control");
  if (cache) {
    headers.set("Cache-Control", cache);
  } else {
    headers.set("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
  }
  const etag = upstream.headers.get("ETag");
  if (etag) headers.set("ETag", etag);
  const len = upstream.headers.get("Content-Length");
  if (len) headers.set("Content-Length", len);

  if (req.method === "HEAD") {
    return new NextResponse(null, { status: 200, headers });
  }

  return new NextResponse(upstream.body, {
    status: 200,
    headers,
  });
}

function decodeKey(key: string): string {
  try {
    return decodeURIComponent(key);
  } catch {
    return key;
  }
}

export async function GET(req: NextRequest, ctx: RouteCtx) {
  const { key } = await ctx.params;
  if (!key) {
    return new NextResponse(null, { status: 404 });
  }
  return proxyFromR2(req, decodeKey(key));
}

export async function HEAD(req: NextRequest, ctx: RouteCtx) {
  const { key } = await ctx.params;
  if (!key) {
    return new NextResponse(null, { status: 404 });
  }
  return proxyFromR2(req, decodeKey(key));
}
