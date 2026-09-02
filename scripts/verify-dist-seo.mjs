import { readFileSync, existsSync } from 'node:fs';

const h = readFileSync('dist/index.html', 'utf8');
const canonical = /rel="canonical" href="([^"]+)"/.exec(h)?.[1];
const ogUrl = /property="og:url" content="([^"]+)"/.exec(h)?.[1];

console.log('canonical:', canonical);
console.log('og:url:', ogUrl);
console.log('ld+json:', h.includes('application/ld+json'));
console.log('Person:', h.includes('"@type":"Person"'));
console.log('recomendaciones:', h.includes('recomendaciones'));
console.log('example.com:', h.includes('example.com'));
console.log('sitemap-index:', existsSync('dist/sitemap-index.xml'));
console.log('contact.config.php in dist:', existsSync('dist/api/contact.config.php'));
