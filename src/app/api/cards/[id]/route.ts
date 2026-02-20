import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const requiredFields = [
  "name",
  "profession",
  "Company",
  "hobbie",
  "profile_image_url",
  "cover_image_url",
] as const;

const optionalLinkFields = [
  "personal_website_link",
  "instagram",
  "whatsapp",
  "twitter",
  "mobile",
  "telegram",
  "linkedin",
  "gmail",
] as const;

function validateBody(
  body: unknown
): { ok: true; data: Record<string, unknown> } | { ok: false; error: string } {
  if (body == null || typeof body !== "object") {
    return { ok: false, error: "Request body must be JSON object" };
  }
  const o = body as Record<string, unknown>;
  for (const key of requiredFields) {
    const v = o[key];
    if (v === undefined || v === null || typeof v !== "string" || (v as string).trim() === "") {
      return { ok: false, error: `Missing or invalid required field: ${key}` };
    }
  }
  const data: Record<string, unknown> = {};
  for (const key of requiredFields) {
    data[key] = (o[key] as string).trim();
  }
  for (const key of optionalLinkFields) {
    const v = o[key];
    if (v !== undefined && v !== null && typeof v === "string" && (v as string).trim() !== "") {
      data[key] = (v as string).trim();
    }
  }
  return { ok: true, data };
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing id" },
        { status: 400 }
      );
    }
    // @ts-ignore
    const card = await prisma.card.findUnique({
      where: { id },
    });
    if (!card) {
      return NextResponse.json({ success: false }, { status: 200 });
    }
    return NextResponse.json({
      success: true,
      ...card,
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to fetch card";
    console.error("GET /api/cards/[id]", e);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing id" },
        { status: 400 }
      );
    }
    const body = await req.json();
    const result = validateBody(body);
    if (!result.ok) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
    // @ts-ignore
    const existing = await prisma.card.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Card not found" },
        { status: 404 }
      );
    }
    await prisma.card.update({
      where: { id },
      data: {
        name: result.data.name as string,
        profession: result.data.profession as string,
        Company: result.data.Company as string,
        hobbie: result.data.hobbie as string,
        profile_image_url: result.data.profile_image_url as string,
        cover_image_url: result.data.cover_image_url as string,
        personal_website_link: (result.data.personal_website_link as string) ?? null,
        instagram: (result.data.instagram as string) ?? null,
        whatsapp: (result.data.whatsapp as string) ?? null,
        twitter: (result.data.twitter as string) ?? null,
        mobile: (result.data.mobile as string) ?? null,
        telegram: (result.data.telegram as string) ?? null,
        linkedin: (result.data.linkedin as string) ?? null,
        gmail: (result.data.gmail as string) ?? null,
      },
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to update card";
    console.error("PUT /api/cards/[id]", e);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
