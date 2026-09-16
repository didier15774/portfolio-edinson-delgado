/**
 * Genera portada WebP de Argos desde la pieza del showcase público.
 * Fuente: assets/project-covers/argos-cover.png (gitignored)
 */
'use strict';

const sharp = require('sharp');
const path = require('path');

const SRC = path.join(__dirname, '..', 'assets', 'project-covers', 'argos-cover.png');
const OUT = path.join(__dirname, '..', 'public', 'images', 'projects', 'argos-cover.webp');
const RATIO = 16 / 9;
const MAX_W = 1600;
const MAX_H = 900;

(async () => {
  const meta = await sharp(SRC).metadata();
  const w = meta.width ?? 0;
  const h = meta.height ?? 0;

  let cw = w;
  let ch = Math.round(w / RATIO);
  let left = 0;
  let top = 0;

  if (ch > h) {
    ch = h;
    cw = Math.round(h * RATIO);
    left = Math.max(0, Math.round((w - cw) / 2));
  } else {
    top = Math.max(0, Math.round((h - ch) * 0.15));
    if (top + ch > h) top = Math.max(0, h - ch);
  }

  const scale = Math.min(1, MAX_W / cw, MAX_H / ch);
  const outW = Math.round(cw * scale);
  const outH = Math.round(ch * scale);

  await sharp(SRC)
    .extract({ left, top, width: cw, height: ch })
    .resize(outW, outH, { fit: 'fill', withoutEnlargement: true })
    .webp({ quality: 88, effort: 6 })
    .toFile(OUT);

  const out = await sharp(OUT).metadata();
  console.log(`✓ argos-cover.webp ${w}×${h} → ${out.width}×${out.height}`);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
