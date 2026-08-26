/**
 * Verifica los tokens de color de src/styles/global.css contra WCAG 2.1.
 * Lee el CSS real, no una copia: si alguien cambia un color, esto lo detecta.
 * Se ejecuta en `npm run contraste` y como parte de `npm run verificar`.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const css = readFileSync(join(raiz, 'src/styles/global.css'), 'utf8');

const C = Object.fromEntries(
  [...css.matchAll(/--color-([a-z-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]),
);
C.blanco = '#FFFFFF';

const lin = (c) => ((c /= 255), c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const L = (h) => {
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.replace('#', '').slice(i, i + 2), 16));
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
};
const ratio = (a, b) => {
  const x = L(a), y = L(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

/** [frente, fondo, minimo, nota] — 4.5 texto normal, 3.0 elementos no textuales */
const CASOS = [
  ['tinta', 'hueso', 4.5, 'texto principal'],
  ['tinta', 'crema', 4.5, 'texto sobre superficie elevada'],
  ['tinta', 'arena', 4.5, 'texto sobre bloque arena'],
  ['tinta-suave', 'hueso', 4.5, 'texto secundario'],
  ['tinta-suave', 'crema', 4.5, 'texto secundario sobre crema'],
  ['blanco', 'bosque', 4.5, 'boton primario'],
  ['blanco', 'bosque-hover', 4.5, 'boton primario en hover'],
  ['blanco', 'terracota-accion', 4.5, 'boton terracota'],
  ['terracota-texto', 'hueso', 4.5, 'terracota como texto'],
  ['ocre-texto', 'hueso', 4.5, 'ocre como texto'],
  ['hueso', 'bosque', 4.5, 'texto sobre footer'],
  ['arena', 'bosque', 4.5, 'texto secundario sobre footer'],
  ['borde', 'hueso', 3.0, 'bordes y separadores'],
  ['bosque', 'hueso', 3.0, 'anillo de foco'],
];

let fallos = 0;
console.log(`\nVerificando ${Object.keys(C).length - 1} tokens en ${CASOS.length} combinaciones\n`);
for (const [f, b, min, nota] of CASOS) {
  if (!C[f] || !C[b]) {
    console.error(`FALTA  token inexistente: ${!C[f] ? f : b}`);
    fallos++;
    continue;
  }
  const r = ratio(C[f], C[b]);
  const pasa = r >= min;
  if (!pasa) fallos++;
  console.log(
    `${pasa ? 'PASA ' : 'FALLA'}  ${(f + ' / ' + b).padEnd(30)} ${r.toFixed(2).padStart(6)}  (min ${min})  ${nota}`,
  );
}

if (fallos) {
  console.error(`\n${fallos} combinacion(es) por debajo del minimo WCAG. No commitear asi.\n`);
  process.exit(1);
}
console.log('\nTodas las combinaciones cumplen WCAG 2.1 AA.\n');
