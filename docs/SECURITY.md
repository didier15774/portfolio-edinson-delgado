# SECURITY.md — Portfolio Edinson Delgado

## Principios

1. Superficie de ataque mínima (sitio estático + un endpoint PHP)
2. Sin secretos en el repositorio
3. Validación en servidor como fuente de verdad
4. Defensa en profundidad en el formulario de contacto

## Superficie de exposición

| Componente | Riesgo | Mitigación |
|------------|--------|------------|
| Sitio estático HTML/CSS/JS | Bajo | Sin datos dinámicos, sin DB |
| `contact.php` | Medio | Validación, rate limiting básico, honeypot |
| Archivos en `public/` | Bajo | Solo assets públicos; sin `.env` |
| Dependencias npm | Medio | `npm audit`, dependencias mínimas |

## Formulario de contacto (`public/api/contact.php`)

### Configuración sensible (fuera del repo)

```php
// contact.config.php — NO commitear
return [
    'mail_to' => 'it.edelgado@gmail.com',
    'mail_from' => 'noreply@tudominio.com',
    'allowed_origins' => ['https://tudominio.com'],
    'max_requests_per_hour' => 10,  // por IP, archivo temporal
];
```

- Incluir `contact.config.example.php` en el repo con valores de ejemplo
- Añadir `contact.config.php` a `.gitignore`
- En Hostinger: crear `contact.config.php` manualmente post-despliegue

### Validaciones servidor

| Campo | Reglas |
|-------|--------|
| `name` | Requerido, 2–100 chars, sin saltos de línea |
| `email` | Requerido, `filter_var(FILTER_VALIDATE_EMAIL)` |
| `subject` | Requerido, 5–150 chars |
| `message` | Requerido, 20–2000 chars |
| `website` (honeypot) | Debe estar vacío; si tiene valor → respuesta 200 silenciosa |

### Protección contra inyección de cabeceras

- Rechazar campos con `\r`, `\n`, `%0a`, `%0d`
- Sanitizar `name`, `subject`, `message` con `strip_tags()`
- No concatenar input de usuario en cabeceras `To`, `From`, `Subject` sin validación estricta
- Usar `mb_substr()` para límites de longitud

### Antispam

1. **Honeypot** — campo `website` oculto con CSS, no `display:none` agresivo (usar posición off-screen)
2. **Tiempo mínimo** — timestamp oculto; rechazar si envío < 3 segundos
3. **Rate limiting** — contador por IP en archivo temporal (`sys_get_temp_dir()`)
4. **Sin CAPTCHA en v1** — evaluar hCaptcha/Turnstile si hay abuso

### Respuestas HTTP

| Código | Situación |
|--------|-----------|
| 200 | Éxito (JSON `{ "ok": true }`) |
| 400 | Validación fallida |
| 405 | Método no POST |
| 429 | Rate limit excedido |
| 500 | Error interno (sin detalles al cliente) |

### CORS

- Solo necesario si el formulario hace fetch desde el mismo dominio → CORS no aplica en producción normal
- Si se prueba en otro origen durante desarrollo, restringir en config

## Headers de seguridad (Hostinger / `.htaccess`)

```apache
# public/.htaccess (previsto)
Header set X-Content-Type-Options "nosniff"
Header set X-Frame-Options "SAMEORIGIN"
Header set Referrer-Policy "strict-origin-when-cross-origin"
Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
# CSP definir tras conocer dominios de fuentes
```

### Content-Security-Policy (borrador)

```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline' fonts.googleapis.com;
font-src 'self' fonts.gstatic.com;
img-src 'self' data:;
connect-src 'self';
frame-ancestors 'self';
base-uri 'self';
form-action 'self';
```

Ajustar tras integrar fuentes y scripts finales.

## Secretos y `.gitignore`

```
contact.config.php
.env
.env.local
dist/
node_modules/
*.log
.DS_Store
```

## Dependencias

- Ejecutar `npm audit` antes de cada release
- Fijar versiones en `package-lock.json`
- No instalar paquetes no utilizados

## Datos personales

- No publicar emails de terceros, datos de clientes ni capturas con información sensible
- Anonimizar capturas de AProbar y Clicks antes de publicar

## Checklist pre-despliegue

- [ ] `contact.config.php` existe solo en servidor
- [ ] Honeypot funcional
- [ ] Inyección de cabeceras bloqueada (prueba manual con `%0aBcc:`)
- [ ] Rate limiting activo
- [ ] Sin archivos `.env` en `dist/`
- [ ] `npm audit` sin vulnerabilidades críticas

## Criterios de aceptación (seguridad)

- [ ] Pentest manual básico del formulario documentado en QA
- [ ] Ningún secreto en git history
- [ ] Respuestas de error no revelan rutas ni stack traces
