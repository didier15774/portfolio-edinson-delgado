/**
 * Resolución centralizada de URL pública.
 * Sin PUBLIC_SITE_URL no se emiten canonical, Open Graph absolutos ni JSON-LD con URL.
 */

const BLOCKED_HOSTS = new Set(['example.com', 'www.example.com', 'localhost']);

export function resolvePublicSiteUrl(envValue?: string): string | undefined {
  const raw = envValue?.trim();
  if (!raw) return undefined;

  try {
    const url = new URL(raw.endsWith('/') ? raw : `${raw}/`);
    if (BLOCKED_HOSTS.has(url.hostname)) return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

export function getPublicSiteUrl(): string | undefined {
  return resolvePublicSiteUrl(import.meta.env.PUBLIC_SITE_URL);
}

export function hasPublicSiteUrl(): boolean {
  return Boolean(getPublicSiteUrl());
}

export function absoluteUrl(path: string, siteUrl?: string): string | undefined {
  const base = siteUrl ?? getPublicSiteUrl();
  if (!base) return undefined;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return new URL(normalizedPath, `${base}/`).href;
}
