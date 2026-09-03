/**
 * Genera WebP optimizado de la foto de perfil.
 * Uso: node scripts/optimize-profile.mjs
 */
import sharp from 'sharp';

const source = 'public/images/profile/edinson-portfolio-2026.jpg';
const target = 'public/images/profile/edinson-portfolio-2026.webp';

const meta = await sharp(source).metadata();
await sharp(source).webp({ quality: 85 }).toFile(target);

console.log(`WebP generado: ${target} (${meta.width}x${meta.height})`);
