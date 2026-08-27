# QA — celaje-web.vercel.app — 2026-08-26

Modo: Full (produccion, sin URL objetivo especifica -> se probo el deploy en vivo)
Herramienta: Playwright MCP (el binario `browse` de gstack no pudo levantar su
servidor en este entorno Windows/Drive; ver nota abajo).

## Cobertura
16/16 rutas verificadas: 200 OK en todas. 404 de control: 404 correcto.
Consola sin errores en home, /cotizar (desktop y movil 375px) tras
interaccion (submit vacio). Sin scroll horizontal en movil. Formulario:
validacion HTML5 bloquea el envio vacio y enfoca el primer campo faltante.
Assets criticos (fuentes via CSS, SVGs de patrones, favicon, foto del
prototipo) responden 200.

## Issues encontrados y corregidos

| ID | Severidad | Descripcion | Commit |
|----|-----------|-------------|--------|
| ISSUE-001 | Medium (SEO) | `/robots.txt` devolvia 404 — nunca se genero el archivo. Sin el, los buscadores no descubren la referencia al sitemap. | `31257dd` |
| ISSUE-002 | Medium (UX/marca) | `/pagina-inexistente` devolvia el 404 generico de Vercel: en ingles, sin marca, sin navegacion de vuelta. Se agrego `src/pages/404.astro` con el layout del sitio. | `329981f` |

Ambos verificados en produccion tras el deploy (curl + Playwright).

## Nota de entorno
El binario `browse` de gstack (`~/.claude/skills/gstack/browse/dist/browse`)
no logra iniciar su servidor local en este entorno (working dir en Google
Drive + restriccion de ACL de Windows). Se uso Playwright MCP como
alternativa equivalente, ya validado en la sesion para QA visual del mismo
sitio. Se omitio el bootstrap de framework de tests: el sitio es
mayormente estatico (Astro, sin logica de negocio compleja en el cliente),
y el unico endpoint dinamico (`/api/cotizar`) ya se probo de punta a punta
manualmente contra Supabase real durante el deploy.

## Salud
Sin bugs criticos ni altos. 2 medium encontrados y corregidos. 0 bajos/cosmeticos
relevados (no se hizo pase exhaustivo de esa categoria).
