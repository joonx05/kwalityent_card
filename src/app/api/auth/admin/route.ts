import { SignJWT } from "jose";
import { NextResponse } from "next/server";


const COOKIE_NAME = "admin_token";
const MAX_AGE = 60 * 60 * 24; // 24 hours
const ADMIN_EMAIL =
  process.env.ADMIN_EMAIL ?? process.env.NEXT_PUBLIC_ADMIN_EMAIL ?? "alpeshprajapati286@gmail.com";
const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD ?? process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "ALPESH";

export async function POST(request: Request) {
  try {
    const body: { password?: string; mail?: string } = await request.json();
    const { password, mail } = body;

    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET ?? "kwality-admin-secret-change-in-production"
    );

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "Password is required." },
        { status: 400 }
      );
    }

    if (!mail || typeof mail !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const emailMatch = mail.trim().toLowerCase() === ADMIN_EMAIL.trim().toLowerCase();
    const passwordMatch = password === ADMIN_PASSWORD;

    if (!emailMatch || !passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(`${MAX_AGE}s`)
      .sign(secret);

    const response = NextResponse.json({ success: true });
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: MAX_AGE,
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
