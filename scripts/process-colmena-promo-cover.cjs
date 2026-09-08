/**
 * Genera portada WebP de Proyecto Colmena desde la pieza promocional.
 * Fuente: assets/project-covers/colmena-cover.jpg
 */
'use strict';

const sharp = require('sharp');
const path = require('path');

const SRC = path.join(__dirname, '..', 'assets', 'project-covers', 'colmena-cover.jpg');
const OUT = path.join(__dirname, '..', 'public', 'images', 'projects', 'colmena-cover.webp');
const RATIO = 16 / 9;
const MAX_W = 1600;
const MAX_H = 900;

(async () => {
  const meta = await sharp(SRC).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;

  const cw = w;
  const ch = Math.round(w / RATIO);
  let top = Math.max(0, Math.round((h - ch) * 0.2));
  if (top + ch > h) top = Math.max(0, h - ch);

  const scale = Math.min(1, MAX_W / cw, MAX_H / ch);
  const outW = Math.round(cw * scale);
  const outH = Math.round(ch * scale);

  await sharp(SRC)
    .extract({ left: 0, top, width: cw, height: ch })
    .resize(outW, outH, { fit: 'fill', withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toFile(OUT);

  const out = await sharp(OUT).metadata();
  console.log(`✓ colmena-cover.webp ${w}×${h} → ${out.width}×${out.height}`);
  console.log(JSON.stringify({ width: out.width, height: out.height }));
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
