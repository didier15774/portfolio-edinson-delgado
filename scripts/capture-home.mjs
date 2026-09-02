import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, '..', 'docs', 'assets', 'home-production.png');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto('https://edinson.proyectocolmena.com/', { waitUntil: 'networkidle' });
await page.screenshot({ path: out, type: 'png' });
await browser.close();
console.log('saved', out);
