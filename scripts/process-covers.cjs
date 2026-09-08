/**
 * process-covers.cjs
 * Genera WebP 16:9 (máx. 1600×900) sin ampliar por encima del recorte fuente.
 *
 * AProbar  – pieza promocional escritorio+móvil (ver process-aprobar-promo-cover.cjs)
 * ClickS   – pieza promocional escritorio+móvil (ver process-clicks-promo-cover.cjs)
 * Colmena  – pieza promocional escritorio+móvil (ver process-colmena-promo-cover.cjs)
 */

'use strict';

const sharp = require('sharp');
const path = require('path');

const SRC = path.join(__dirname, '..', 'assets', 'project-covers');
const OUT = path.join(__dirname, '..', 'public', 'images', 'projects');
const MAX_W = 1600;
const MAX_H = 900;
const RATIO = 16 / 9;

function solidRect(w, h, color) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">` +
      `<rect width="${w}" height="${h}" fill="${color}"/>` +
      `</svg>`,
  );
}

/**
 * Extrae región, fuerza 16:9 desde la izquierda, aplica parches y exporta WebP.
 * No hace upscale: solo reduce si supera 1600×900.
 */
async function exportCover({ name, extract, patches = [] }) {
  const input = path.join(SRC, `${name}-cover.png`);
  const output = path.join(OUT, `${name}-cover.webp`);
  const meta = await sharp(input).metadata();
  const srcW = meta.width ?? 0;
  const srcH = meta.height ?? 0;

  let left = Math.max(0, extract.left);
  let top = Math.max(0, extract.top);
  let width = Math.min(extract.width, srcW - left);
  let height = Math.min(extract.height, srcH - top);

  if (width / height > RATIO) {
    width = Math.round(height * RATIO);
  } else {
    height = Math.round(width / RATIO);
  }

  let pipeline = sharp(input).extract({ left, top, width, height });

  if (patches.length > 0) {
    const composites = [];
    for (const patch of patches) {
      const pw = Math.max(1, Math.round(patch.w));
      const ph = Math.max(1, Math.round(patch.h));
      composites.push({
        input: solidRect(pw, ph, patch.color),
        left: Math.round(patch.x),
        top: Math.round(patch.y),
      });
    }
    pipeline = pipeline.composite(composites);
  }

  const scale = Math.min(1, MAX_W / width, MAX_H / height);
  const outW = Math.round(width * scale);
  const outH = Math.round(height * scale);

  await pipeline
    .resize(outW, outH, { fit: 'fill', withoutEnlargement: true })
    .webp({ quality: 85, effort: 6 })
    .toFile(output);

  const out = await sharp(output).metadata();
  console.log(`✓ ${name}-cover.webp ${srcW}×${srcH} → ${out.width}×${out.height}`);
  return { width: out.width, height: out.height };
}

(async () => {
  console.log('Procesando portadas…\n');

  // AProbar: regenerar con scripts/process-aprobar-promo-cover.cjs (pieza promocional).
  console.log('↷ aprobar-cover.webp: usar node scripts/process-aprobar-promo-cover.cjs');
  const aprobarMeta = await sharp(path.join(OUT, 'aprobar-cover.webp')).metadata();
  const aprobar = { width: aprobarMeta.width, height: aprobarMeta.height };

  // ClickS: regenerar con scripts/process-clicks-promo-cover.cjs (pieza promocional).
  // Se deja un placeholder para no pisar la promo si se corre este script solo.
  console.log('↷ clicks-cover.webp: usar node scripts/process-clicks-promo-cover.cjs');
  const clicksMeta = await sharp(path.join(OUT, 'clicks-cover.webp')).metadata();
  const clicks = { width: clicksMeta.width, height: clicksMeta.height };

  // Colmena: regenerar con scripts/process-colmena-promo-cover.cjs (pieza promocional).
  console.log('↷ colmena-cover.webp: usar node scripts/process-colmena-promo-cover.cjs');
  const colmenaMeta = await sharp(path.join(OUT, 'colmena-cover.webp')).metadata();
  const colmena = { width: colmenaMeta.width, height: colmenaMeta.height };

  console.log('\nDimensiones finales:');
  console.log(JSON.stringify({ aprobar, clicks, colmena }, null, 2));
})().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
