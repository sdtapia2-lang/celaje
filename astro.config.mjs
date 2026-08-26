// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

import { SITIO } from './src/config/marca.ts';

// https://astro.build/config
export default defineConfig({
  site: SITIO,
  // Estatico por defecto; solo /api/cotizar se renderiza on-demand
  // mediante `export const prerender = false` en ese archivo.
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
