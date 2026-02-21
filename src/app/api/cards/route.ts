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
    if (v === undefined || v === null || typeof v !== "string" || v.trim() === "") {
      return { ok: false, error: `Missing or invalid required field: ${key}` };
    }
  }
  const data: Record<string, unknown> = {};
  for (const key of requiredFields) {
    data[key] = (o[key] as string).trim();
  }
  for (const key of optionalLinkFields) {
    const v = o[key];
    if (v !== undefined && v !== null && typeof v === "string" && v.trim() !== "") {
      data[key] = (v as string).trim();
    }
  }
  return { ok: true, data };
}

export async function GET() {
  try {
    //@ts-ignore
    const cards = await prisma.card.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(cards);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to fetch cards";
    console.error("GET /api/cards", e);
    return NextResponse.json(
      { error: "Failed to fetch cards", detail: message },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = validateBody(body);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
    const card = await prisma.card.create({
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
    return NextResponse.json({ id: card.id, }, { status: 201 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Failed to create card";
    console.error("POST /api/cards", e);
    return NextResponse.json(
      { error: "Failed to create card", detail: message },
      { status: 500 }
    );
  }
}
