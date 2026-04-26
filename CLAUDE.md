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

## Precios actuales (DOP)
- BRV-01: 11,000 | BRV-02: 15,000 | BRV-03: 25,000 | BRV-04: 38,000

## Proyectos en portafolio
- 02 · Valentina Cruz (portafolio fotográfico)
- 03 · Reinbou (agencia creativa)
- 04 · Greenhouse RD (vivero & e-commerce)
