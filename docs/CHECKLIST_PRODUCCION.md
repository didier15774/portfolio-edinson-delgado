# Checklist de pruebas productivas

Dominio: **https://edinson.proyectocolmena.com**

## Antes de subir

- [ ] `.env` local con `PUBLIC_SITE_URL=https://edinson.proyectocolmena.com` (no commitear)
- [ ] `npm run check` sin errores
- [ ] `npm run build:prod` genera `dist/`
- [ ] `npm test` pasa (incluye SEO productivo)
- [ ] `dist/index.html` contiene canonical y `og:url` del dominio
- [ ] `dist/robots.txt` apunta a `https://edinson.proyectocolmena.com/sitemap-index.xml`
- [ ] Existe `dist/sitemap-index.xml` o `dist/sitemap-0.xml`
- [ ] JSON-LD Person en inicio con `"url":"https://edinson.proyectocolmena.com"`
- [ ] No aparece `example.com` en HTML/XML de `dist/`
- [ ] No existe `dist/api/contact.config.php` (solo el `.example`)
- [ ] Sección `#recomendaciones` ausente si no hay ítems autorizados
- [ ] CV PDF presente en `dist/cv/`

## Tras desplegar en Hostinger

- [ ] Contenido de `dist/` subido a `public_html/` (no la carpeta `dist` en sí)
- [ ] SSL activo (HTTPS sin advertencias)
- [ ] `https://edinson.proyectocolmena.com/` responde 200
- [ ] Rutas con trailing slash: `/contacto/`, `/proyectos/aprobar/`, etc.
- [ ] `/_astro/*.css` carga correctamente (sitio con estilos)
- [ ] `/robots.txt` y `/sitemap-index.xml` accesibles
- [ ] Open Graph: depurador LinkedIn/Facebook con URL del dominio
- [ ] Crear `public_html/api/contact.config.php` desde el example (SMTP real)
- [ ] Probar formulario (mensaje ≥ 20 caracteres) → email recibido
- [ ] Honeypot: campo `website` con valor → no envía correo (respuesta ok silenciosa)
- [ ] Rate limit: varios envíos rápidos → 429
- [ ] Descarga de CV funciona
- [ ] Lighthouse ≥ 90 (Performance, Accessibility, Best Practices, SEO)
- [ ] Sin errores de consola en rutas críticas

## SMTP (servidor únicamente)

Ver [SMTP_HOSTINGER.md](./SMTP_HOSTINGER.md).

- [ ] Buzón `noreply@edinson.proyectocolmena.com` (o el elegido) creado en Hostinger
- [ ] `smtp.enabled = true` con usuario/contraseña solo en servidor
- [ ] `allowed_origins` incluye `https://edinson.proyectocolmena.com`
- [ ] Credenciales no aparecen en git, issues ni chats

## Recomendaciones (cuando existan)

- [ ] Texto original del autor (o corrección de claridad aprobada)
- [ ] `authorized: true` solo con permiso explícito
- [ ] Nombre, cargo, empresa y relación profesional completos
- [ ] Tras publicar: sección visible en inicio; rebuild y redeploy
