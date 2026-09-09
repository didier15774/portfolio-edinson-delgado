# Contribuir

Este repositorio contiene el sitio público de **Edinson Delgado**. Las contribuciones puntuales (correcciones de contenido, accesibilidad o documentación) son bienvenidas.

## Requisitos

- Node.js ≥ 22.12
- npm ≥ 10

## Desarrollo local

```bash
git clone https://github.com/didier15774/portfolio-edinson-delgado.git
cd portfolio-edinson-delgado
cp .env.example .env
npm install
npm run dev
```

Abrir http://localhost:4321. No abrir `dist/index.html` con `file://`.

## Comprobaciones

```bash
npm run check
npm run build:prod
npm test
```

## Secretos y datos de infraestructura

No incluir en commits, issues ni pull requests:

- archivos `.env` o `contact.config.php`
- `Deploy/deploy.config.ps1`
- contraseñas, tokens, claves SSH
- IP, puertos, usuarios SSH o rutas internas del hosting

Use las plantillas `/.env.example`, `Deploy/deploy.config.example.ps1` y `public/api/contact.config.example.php`.

## Alcance

- El sitio es estático (Astro). El único endpoint dinámico es `public/api/contact.php`.
- No añadir React, Next.js ni base de datos.
- Los productos privados (AProbar, ClickS y otros) no forman parte de este repositorio.

## Estilo

- TypeScript strict
- CSS con variables de diseño existentes
- Textos en español, tono profesional, hechos verificables
- Actualizar el documento correspondiente en `docs/` si cambia alcance, arquitectura o identidad visual

## Licencia

El contenido y el código de este sitio son propiedad de Edinson Delgado. Al contribuir, acepta que los cambios se incorporen bajo los mismos términos.
