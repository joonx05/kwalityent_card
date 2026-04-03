/** Single URL segment that looks like a static file (e.g. uuid.png), not a bare card id. */
const STATIC_ASSET_EXT =
  /\.(png|jpe?g|gif|webp|svg|ico|avif|bmp|heic|heif|txt|json|xml|pdf|map|css|js|mjs|woff2?|ttf|eot|webmanifest)$/i;

export function isLikelyStaticAssetFilename(segment: string): boolean {
  return STATIC_ASSET_EXT.test(segment);
}

/** Root paths served by the app or public/ — do not R2-proxy these. */
const RESERVED_ROOT_FILES = new Set(
  ["favicon.ico", "robots.txt", "sitemap.xml", "site.webmanifest"].map((s) =>
    s.toLowerCase()
  )
);

export function shouldSameOriginProxyR2Asset(segment: string): boolean {
  if (!segment || RESERVED_ROOT_FILES.has(segment.toLowerCase())) {
    return false;
  }
  return isLikelyStaticAssetFilename(segment);
}
