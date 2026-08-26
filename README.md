# Celaje — celosías a medida

Sitio de marca y cotización para Celaje, celosías de madera cortadas en CNC con
patrones geométricos generados por código (método de Hankin).

## Stack

- [Astro](https://astro.build) 7 + Tailwind CSS v4
- Supabase (formulario de cotización, adjuntos)
- Resend (notificación por email)
- Deploy en Vercel

## Desarrollo

```bash
npm install
npm run dev
```

## Scripts

- `npm run patrones` — regenera la biblioteca de patrones SVG (`scripts/generar-patrones.mjs`)
- `npm run contraste` — verifica los tokens de color contra WCAG 2.1 AA
- `npm run verificar` — contraste + chequeo de tipos + build

## Variables de entorno

Ver `.env.example`. Necesarias en Vercel: `PUBLIC_SUPABASE_URL`,
`PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`.
