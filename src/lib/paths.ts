/**
 * Normaliza rutas con trailing slash para comparación y aria-current.
 */
export function normalizePath(path: string): string {
  if (path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
}

export function isNavActive(currentPath: string, href: string): boolean {
  const current = normalizePath(currentPath);
  const target = normalizePath(href);

  if (target === '/') return current === '/';
  return current === target || current.startsWith(target);
}
