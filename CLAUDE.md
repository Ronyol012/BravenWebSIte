# Braven Studio — Notas del proyecto

## Repositorio Git
- **Remote origin:** https://github.com/Ronyol012/BravenWebSIte.git
- **Rama principal:** main
- Este proyecto SIEMPRE apunta a ese repositorio. No cambiar a BravenOS ni otro repo.

## Netlify
- **Site ID:** c3e9d2cc-7000-4cc4-9afc-ff1b0430c2c4
- **URL producción:** https://bravenweb.com
- **URL alternativa:** https://webbraven.netlify.app
- Siempre hacer `git commit` antes de deploy.
- El deploy via MCP requiere correr el comando `npx @netlify/mcp@latest` con el proxy token.

## Stack
- HTML/CSS/JS puro (sin framework)
- Módulos ES6 (`import/export`)
- Deploy en Netlify (sitio estático, `command = ""` en netlify.toml)

## Archivos clave
- `scripts/data/content.js` — todos los textos ES/EN y datos de proyectos
- `scripts/config.js` — precios, WhatsApp, email, monedas
- `scripts/main.js` — punto de entrada, cache buster en import de content.js
- `styles/components.css` — estilos de componentes

## Precios actuales (DOP) — actualizados 16 nov 2026
- Lista: BRV-01: 20,000 | BRV-02: 24,000 | BRV-03: 42,000 | BRV-04: 70,000
- Lanzamiento: BRV-01 a 15,000 (3 cupos). Se controla en `PRECIOS_LANZAMIENTO` de `scripts/config.js`.
- Mantenimiento: Esencial 2,800/mes (BRV-01 a 03), Profesional US$100–150/mes (BRV-04).
- Ya no se promete plazo de entrega: se habla de seguimiento del proceso en una plataforma.
- Fuente de verdad: `../Servicios/Planes_Web_Braven.md` y `../Servicios/Planes_Mantenimiento_Braven.md`.

## Proyectos en portafolio
- 02 · Valentina Cruz (portafolio fotográfico)
- 03 · Reinbou (agencia creativa)
- 04 · Greenhouse RD (vivero & e-commerce)
