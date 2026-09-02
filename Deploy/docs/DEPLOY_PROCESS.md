# Despliegue Hostinger — Portfolio Edinson Delgado

Sitio: **https://edinson.proyectocolmena.com**  
Proyecto independiente de Clicks y AProbar (rutas, archivos y config separados).

## Referencia tomada de Clicks (solo lectura)

De `ClickS/Deploy/` se reutilizó el **mecanismo**:

| Aspecto | Clicks | Portfolio |
|---------|--------|-----------|
| SSH | `149.62.37.221:65002` / Posh-SSH | Igual (misma cuenta Hostinger) |
| Auth | `deploy.config.ps1` o `DEPLOY_SSH_PASSWORD` | Igual (archivo propio, gitignored) |
| Build | ZIP de app PHP | ZIP de `dist/` Astro |
| Deploy | SCP + bash remoto | SCP + bash remoto |
| Destino | `domains/clicks.../public_html` | `domains/edinson.../public_html` |
| Staging remoto | `/home/.../deploy` | `/home/.../deploy/portfolio-edinson` |
| Persistente | storage symlink | N/A (sitio estático) |
| Preservar | storage | `api/contact.config.php` |

**No** se modificaron ni ejecutaron scripts de Clicks/AProbar apuntando a este sitio.

## Estructura

```text
Deploy/
├── validate_remote.bat / .ps1     # Confirma ruta remota (sin subir)
├── build_Production.bat / .ps1    # npm run build:prod → ZIP
├── deploy_Production.bat / .ps1   # SCP + replace public_html
├── deploy.config.example.ps1      # Plantilla versionada
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

Completar `SshPassword` o definir `DEPLOY_SSH_PASSWORD`.

## Ruta remota confirmada (SSH)

```text
Host:     149.62.37.221:65002
Usuario:  u506984013
Dominio:  /home/u506984013/domains/edinson.proyectocolmena.com
App:      /home/u506984013/domains/edinson.proyectocolmena.com/public_html
Staging:  /home/u506984013/deploy/portfolio-edinson
```

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
4. Backup `public_html_backup_*`
5. Wipe solo `public_html` de Edinson
6. Extraer + chmod 755/644
7. Restaurar `contact.config.php` preservado

## Post-deploy SMTP

Crear en el servidor (una sola vez):

`public_html/api/contact.config.php`

Ver `docs/SMTP_HOSTINGER.md`. No versionar credenciales.

## Verificación rápida

```text
https://edinson.proyectocolmena.com/          → 200 + estilos
https://edinson.proyectocolmena.com/contacto/ → 200
https://clicks.proyectocolmena.com/           → 200 (sin cambios)
https://aprobar.proyectocolmena.com/          → 200 (sin cambios)
```
