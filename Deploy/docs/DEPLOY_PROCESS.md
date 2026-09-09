# Despliegue — Portfolio Edinson Delgado

Sitio: **https://edinson.proyectocolmena.com**

El portfolio es un sitio estático independiente. Los scripts de esta carpeta solo deben apuntar al dominio de Edinson.

## Estructura

```text
Deploy/
├── validate_remote.bat / .ps1     # Confirma ruta remota (sin subir)
├── build_Production.bat / .ps1    # npm run build:prod → ZIP
├── deploy_Production.bat / .ps1   # SCP + replace document root
├── deploy.config.example.ps1      # Plantilla versionada (placeholders)
├── deploy.config.ps1              # Secretos locales (NO versionar)
├── artifacts/                     # ZIPs generados (gitignored)
├── logs/                          # Logs locales (gitignored)
├── lib/DeployCommon.ps1
└── docs/DEPLOY_PROCESS.md         # Este archivo
```

## Configuración inicial

```bat
copy Deploy\deploy.config.example.ps1 Deploy\deploy.config.ps1
```

Completar host, puerto, usuario y rutas **solo** en `deploy.config.ps1` (o definir `DEPLOY_SSH_PASSWORD`). No copiar esos valores a documentación, issues ni commits.

## Ruta remota

Los valores reales de SSH y del document root se leen de `deploy.config.ps1`. `validate_remote.ps1` usa esa configuración local; no hay IP, usuario ni rutas internas versionadas.

Protecciones del script:

- Abort si `RemoteAppPath` contiene `clicks.` o `aprobar.`
- Abort si no contiene `edinson.proyectocolmena.com`
- No subir al padre del dominio (`DO_NOT_UPLOAD_HERE`)

## Qué se despliega

Contenido de `dist/` únicamente:

- HTML / rutas con trailing slash
- `/_astro/*` (CSS/JS)
- `api/contact.php` + `contact.config.example.php`
- `.htaccess`, `robots.txt`, sitemap
- `cv/`, `images/`, `scripts/`

## Qué se excluye

- `.git`, `node_modules`, `src/`, `docs/`, `tests/`
- `.env`, `Deploy/deploy.config.ps1`
- `contact.config.php` local (nunca en el ZIP)
- En servidor se **preserva** `api/contact.config.php` si ya existe

## Flujo

```bat
Deploy\validate_remote.bat
Deploy\build_Production.bat
Deploy\deploy_Production.bat
```

1. `build:prod` con `PUBLIC_SITE_URL=https://edinson.proyectocolmena.com`
2. ZIP con rutas Unix (sin backslash)
3. Pre-flight SSH
4. Backup del document root
5. Wipe solo el document root de Edinson
6. Extraer + chmod 755/644
7. Restaurar `contact.config.php` preservado

## Post-deploy SMTP

Crear en el servidor (una sola vez), junto a `contact.php`:

`api/contact.config.php`

Ver `docs/SMTP_HOSTINGER.md`. No versionar credenciales.

## Verificación rápida

```text
https://edinson.proyectocolmena.com/          → 200 + estilos
https://edinson.proyectocolmena.com/contacto/ → 200
```

Tras un despliegue, comprobar también que ningún otro sitio de la misma cuenta de hosting haya cambiado.
