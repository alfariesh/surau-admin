export function normalizeNextPath(value: string | null | undefined, fallback = "/") {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return fallback;
  if (value.startsWith("/api") || value.startsWith("/login")) return fallback;

  return value;
}
