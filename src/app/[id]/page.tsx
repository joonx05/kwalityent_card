import { notFound } from "next/navigation";
import CardPageClient from "./CardPageClient";
import { shouldSameOriginProxyR2Asset } from "@/lib/segment-static-asset";

type PageProps = { params: Promise<{ id: string }> };

export default async function CardPage({ params }: PageProps) {
  const { id } = await params;

  // Fallback if middleware did not rewrite (e.g. matcher change): never show "card" UI for asset-like paths.
  if (shouldSameOriginProxyR2Asset(id)) {
    notFound();
  }

  return <CardPageClient id={id} />;
}
