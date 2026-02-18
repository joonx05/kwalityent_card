import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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
