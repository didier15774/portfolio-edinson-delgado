# Configuración SMTP en Hostinger (sin secretos en el repo)

## Objetivo

Activar el formulario de contacto (`/api/contact.php`) con SMTP de Hostinger.
Las credenciales **nunca** se versionan: solo viven en `contact.config.php` del servidor.

Buzón corporativo unificado: **edelgado@proyectocolmena.com** (destino, remitente y usuario SMTP).

## Pasos

1. En el panel Hostinger, crear o usar el buzón `edelgado@proyectocolmena.com`.
2. Anotar host SMTP (`smtp.hostinger.com`), puerto `465` (SSL) o `587` (TLS), usuario y contraseña.
3. En el servidor, dentro de `public_html/api/`:

```bash
# Desde el ejemplo del deploy (ya en dist/api/)
cp contact.config.example.php contact.config.php
```

4. Editar `contact.config.php` solo en el servidor:

```php
'smtp' => [
    'enabled' => true,
    'host' => 'smtp.hostinger.com',
    'port' => 465,
    'encryption' => 'ssl',
    'username' => 'edelgado@proyectocolmena.com',
    'password' => '*** solo en servidor ***',
],
'mail_from' => 'edelgado@proyectocolmena.com',
'mail_to' => 'edelgado@proyectocolmena.com',
'allowed_origins' => ['https://edinson.proyectocolmena.com'],
```

5. Permisos: archivo `644`, carpeta `755`.

## Prueba

```bash
# Desde un cliente HTTP (ajustar URL)
curl -X POST https://edinson.proyectocolmena.com/api/contact.php \
  -F "name=Prueba Portfolio" \
  -F "email=tu@correo.com" \
  -F "subject=Prueba SMTP Hostinger" \
  -F "message=Mensaje de prueba con longitud suficiente para validar." \
  -F "website="
```

Respuesta esperada: `{"ok":true}`.

Verificar bandeja de `edelgado@proyectocolmena.com` (y spam).

## Fallos frecuentes

| Síntoma | Causa probable |
|---------|----------------|
| 503 Servicio no configurado | Falta `contact.config.php` en el servidor |
| 500 No se pudo enviar | Usuario/contraseña SMTP incorrectos o puerto |
| 403 Origen no permitido | `Origin` distinto de `allowed_origins` |
| 429 | Rate limit (máx. 10/hora por IP) |
| 400 | Validación (mensaje &lt; 20 caracteres, etc.) |

## Seguridad

- `contact.config.php` en `.gitignore`
- No pegar contraseñas en issues, chats ni commits
- Si se filtra una credencial: rotarla en Hostinger de inmediato
