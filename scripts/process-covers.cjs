/**
 * process-covers.cjs
 * Genera versiones WebP optimizadas 1600×900 (16:9) de las portadas de proyectos.
 *
 * AProbar  – recorta footer técnico, borra widget "Sistema" con email
 * ClickS   – recorta espacio vacío inferior, excluye footer y versión
 * Colmena  – recorta sección "¿Te suena familiar?" inferior
 */

'use strict';

const sharp = require('sharp');
const path  = require('path');

const SRC = 'C:/Program Files/Apache Server/Apache24/htdocs/Portfolio_2026/public/images/projects';
const OUT = SRC; // mismo directorio, nombres finales

const TARGET_W = 1600;
const TARGET_H = 900;

/** Genera SVG de rectángulo sólido para usar como overlay */
function solidRect(w, h, color) {
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">` +
    `<rect width="${w}" height="${h}" fill="${color}"/>` +
    `</svg>`
  );
}

async function processAProbar() {
  const src = path.join(SRC, 'aprobar-cover.png');
  const dst = path.join(OUT, 'aprobar-cover.webp');

  // 1. Recortar zona útil: y=0 a y=940 (elimina footer oscuro con datos técnicos)
  //    Dimensiones tras recorte: 1856 × 940
  const cropped = await sharp(src)
    .extract({ left: 0, top: 0, width: 1856, height: 940 })
    .toBuffer();

  // 2. Tapar widget "Sistema" (contiene email it.edelgado@gmail.com)
  //    Zona confirmada: x=230, y=760, w=700, h=130  (sobre imagen 1856×940)
  //    Color de fondo del card: blanco #ffffff  (el card tiene bg blanco sobre fondo gris)
  const emailOverlay = solidRect(700, 130, '#ffffff');

  const cleaned = await sharp(cropped)
    .composite([{
      input: emailOverlay,
      left: 230,
      top:  760,
    }])
    .toBuffer();

  // 3. Escalar a 1600×900 y convertir a WebP calidad 85
  await sharp(cleaned)
    .resize(TARGET_W, TARGET_H, {
      fit: 'cover',
      position: 'top',   // mantener topbar y métricas visibles
    })
    .webp({ quality: 85, effort: 6 })
    .toFile(dst);

  console.log('✓ aprobar-cover.webp generado');
}

async function processClickS() {
  const src = path.join(SRC, 'clicks-cover.png');
  const dst = path.join(OUT, 'clicks-cover.webp');

  // Recortar zona 16:9 exacta desde x=0 para preservar el sidebar completo:
  //   h=650 → w_16:9 = 650 * (16/9) ≈ 1156
  //   Cubre sidebar + indicadores + últimos trabajos + estado operativo
  //   Excluye espacio vacío inferior, footer y versión
  await sharp(src)
    .extract({ left: 0, top: 0, width: 1156, height: 650 })
    .resize(TARGET_W, TARGET_H, { fit: 'fill' })
    .webp({ quality: 85, effort: 6 })
    .toFile(dst);

  console.log('✓ clicks-cover.webp generado');
}

async function processColmena() {
  const src = path.join(SRC, 'colmena-cover.png');
  const dst = path.join(OUT, 'colmena-cover.webp');

  // Recortar y=0 a y=875 → conserva nav, hero y gráfico HEXYN completo
  // Excluye sección oscura "¿Te suena familiar?" que empieza ~y=880
  // 1852×875 → resize 1600×900 con cover/top
  await sharp(src)
    .extract({ left: 0, top: 0, width: 1852, height: 875 })
    .resize(TARGET_W, TARGET_H, {
      fit: 'cover',
      position: 'top',
    })
    .webp({ quality: 85, effort: 6 })
    .toFile(dst);

  console.log('✓ colmena-cover.webp generado');
}

(async () => {
  console.log('Procesando portadas…\n');
  await processAProbar();
  await processClickS();
  await processColmena();
  console.log('\nListo. Archivos en:', OUT);
})().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
