# DEPLOYMENT_HOSTINGER.md — Portfolio Edinson Delgado

## Resumen

El portfolio es un sitio **estático** generado por Astro. Hostinger sirve los archivos desde `public_html`. El único componente dinámico es `api/contact.php`.

## Requisitos Hostinger

| Requisito | Detalle |
|-----------|---------|
| Plan | Cualquier hosting compartido con PHP ≥ 8.0 |
| Dominio | https://edinson.proyectocolmena.com |
| SSL | Let's Encrypt vía panel Hostinger (obligatorio) |
| Node.js en producción | **No requerido** — build local o CI |

## Flujo de despliegue

```
[Máquina local / CI]
  npm install
  PUBLIC_SITE_URL=https://tudominio.com npm run build:prod
  npm test

[Subida a Hostinger]
  FTP / File Manager
  Copiar contenido de dist/ → public_html/ (no la carpeta dist en sí)

[Post-despliegue]
  Crear contact.config.php en public_html/api/ (SMTP recomendado)
  Verificar HTTPS, formulario y sitemap-index.xml
```

> **Importante:** No abrir `dist/index.html` directamente en el navegador.
> Usar `npm run dev` (desarrollo) o `npm run preview` (producción local).
> En Hostinger, el servidor web sirve los archivos con rutas `/_astro/` correctas.

## Estructura en servidor

```
public_html/
├── index.html
├── sobre-mi/
├── proyectos/
├── genexus/
├── ...
├── api/
│   ├── contact.php
│   └── contact.config.php    ← solo en servidor
├── assets/
├── cv/
├── images/
├── robots.txt
└── sitemap-index.xml
```

## Configuración Astro para producción

```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://DOMINIO-PENDIENTE.com',
  output: 'static',
  trailingSlash: 'always', // o 'never' — ser consistente
  integrations: [sitemap()],
});
```

## contact.config.php en servidor

1. Copiar `contact.config.example.php` → `contact.config.php`
2. Completar valores reales:

```php
<?php
return [
    'mail_to' => 'it.edelgado@gmail.com',
    'mail_from' => 'noreply@tudominio.com',
    'site_name' => 'Portfolio Edinson Delgado',
];
```

3. Verificar que `mail()` de PHP funciona en Hostinger o configurar SMTP si es necesario

### Si mail() no funciona

Opciones en orden de preferencia:

1. SMTP de Hostinger (credenciales en panel)
2. PHPMailer con SMTP (añadir solo si necesario, documentar en DECISIONS.md)
3. Servicio externo (Formspree, etc.) — último recurso, cambia arquitectura

## .htaccess (opcional, en public/)

```apache
# Redirección HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Página 404 personalizada
ErrorDocument 404 /404.html

# Headers de seguridad
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
</IfModule>

# Cache estático
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType image/avif "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## DNS (cuando se tenga dominio)

| Tipo | Nombre | Valor |
|------|--------|-------|
| A | @ | IP de Hostinger |
| CNAME | www | dominio principal o @ |

Activar SSL tras propagación DNS.

## Despliegue por FTP (paso a paso)

1. Conectar con credenciales del panel Hostinger
2. Navegar a `public_html/`
3. **Backup** del contenido anterior si existe
4. Subir todo el contenido de `dist/` (no la carpeta dist en sí)
5. Subir `contact.config.php` por separado (no está en dist)
6. Verificar permisos: archivos 644, carpetas 755
7. Probar `https://dominio/` y `https://dominio/api/contact.php` (POST solo)

## Despliegue con Git (si Hostinger lo permite)

1. Repo privado en GitHub/GitLab
2. GitHub Actions: build + deploy FTP/rsync
3. **Nunca** commitear `contact.config.php`
4. Secretos en variables del repositorio: `FTP_HOST`, `FTP_USER`, `FTP_PASS`

### Workflow ejemplo (futuro)

```yaml
# .github/workflows/deploy.yml — crear en bloque 8
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
      - run: npm ci && npm test
      - run: npm run build
      - name: Deploy via FTP
        # ... acción FTP
```

## Verificación post-despliegue

- [ ] HTTPS activo sin mixed content
- [ ] Todas las rutas del mapa del sitio responden 200
- [ ] `sitemap.xml` accesible
- [ ] `robots.txt` accesible
- [ ] Formulario envía email
- [ ] CV descargable
- [ ] OG tags correctos (debugger de Facebook/LinkedIn)
- [ ] Lighthouse en producción ≥ 90

## Rollback

1. Mantener backup ZIP del `public_html` anterior
2. Restaurar vía File Manager si el deploy falla

## Entorno local vs producción

| Aspecto | Local | Producción |
|---------|-------|------------|
| Astro dev | `npm run dev` | N/A |
| Preview build | `npm run preview` | Hostinger |
| PHP contacto | Apache local o mock | Hostinger PHP |
| Dominio | localhost:4321 | dominio real |

Para probar PHP localmente con Apache en `htdocs`, copiar `dist/` a subcarpeta o configurar virtual host.

## Criterios de aceptación (despliegue)

- [ ] Sitio accesible por HTTPS en dominio final
- [ ] Build reproducible desde repo limpio
- [ ] Formulario operativo
- [ ] Documentación de deploy verificada por ejecución real
