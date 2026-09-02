/**
 * Carga PUBLIC_SITE_URL desde process.env o .env y ejecuta el build de producción.
 * Las credenciales SMTP nunca viven aquí: solo en contact.config.php del servidor.
 */
import { spawn } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const BLOCKED = new Set(['example.com', 'www.example.com', 'localhost']);

function loadDotEnv() {
  const envPath = resolve(process.cwd(), '.env');
  if (!existsSync(envPath)) return;

  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, '');
    if (!(key in process.env)) process.env[key] = value;
  }
}

function resolveSiteUrl(raw) {
  if (!raw?.trim()) return undefined;
  try {
    const url = new URL(raw.trim().endsWith('/') ? raw.trim() : `${raw.trim()}/`);
    if (BLOCKED.has(url.hostname)) return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

loadDotEnv();

const siteUrl = resolveSiteUrl(process.env.PUBLIC_SITE_URL);
if (!siteUrl) {
  console.error(
    '[portfolio] PUBLIC_SITE_URL requerida y válida para build de producción.\n' +
      '  Ejemplo: PUBLIC_SITE_URL=https://edinson.proyectocolmena.com\n' +
      '  Definir en .env (no versionado) o en el entorno de CI/servidor.',
  );
  process.exit(1);
}

console.log(`[portfolio] Build de producción → ${siteUrl}`);

const child = spawn('npx', ['astro', 'build'], {
  stdio: 'inherit',
  shell: true,
  env: process.env,
});

child.on('exit', (code) => process.exit(code ?? 1));
