/**
 * Genera la biblioteca de patrones: un SVG teselable por patrón más un JSON
 * con sus datos técnicos.
 *
 * Nada aquí es decorativo por casualidad. Cada patrón se elige por dos
 * criterios de fabricación medidos sobre la geometría, no estimados:
 *
 *  1. CONECTIVIDAD. La madera debe formar una sola pieza continua. Un patrón
 *     que se fragmenta produce trozos que se caen al terminar el corte. El
 *     barrido de ángulos de contacto (scripts/analisis.mjs) descartó la
 *     mayoría de las combinaciones por esta razón.
 *  2. ANCHO DE TIRA. Se resuelve por bisección el grosor que da el calado
 *     buscado, y se exige >= TIRA_MINIMA_MM: por debajo de eso el terciado
 *     de 15 mm se vuelve frágil al manipular la pieza.
 *
 *   npm run patrones
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {
  gr, hankin, teseladoCuadrado, teseladoHexagonal, tesela488, tesela3636, tesela31212,
} from './geometria.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
// Los SVG van a public/ para poder referenciarlos por URL desde CSS (mask-image).
// Los datos tecnicos van a src/config/ para importarlos con tipos en las paginas.
const destinoSvg = join(raiz, 'public/patrones');
const destinoDatos = join(raiz, 'src/config');
mkdirSync(destinoSvg, { recursive: true });
mkdirSync(destinoDatos, { recursive: true });

/** Por debajo de esto la tira no aguanta el manejo en terciado de 15 mm. */
const TIRA_MINIMA_MM = 14;

const TES = {
  cuadrado: teseladoCuadrado, hex: teseladoHexagonal,
  '4.8.8': tesela488, '3.6.3.6': tesela3636, '3.12.12': tesela31212,
};

/**
 * Los pares (teselado, angulo) salen del barrido de scripts/analisis.mjs:
 * son los unicos que forman una sola pieza. `calado` ordena el catalogo de
 * mas luz a mas sombra.
 */
const PATRONES = [
  {
    slug: 'reticula-de-rombos', nombre: 'Retícula de rombos',
    tesela: 'cuadrado', angulo: 45, moduloMm: 200, calado: 0.65,
    origen:
      'El trazado más elemental de la familia: los puntos medios de una cuadrícula ' +
      'unidos entre si. Sin rosetas ni entrelazado, es el que menos cambios de ' +
      'dirección pide a la fresadora y por eso el más económico de mecanizar.',
    destacado: false,
  },
  {
    slug: 'estrella-de-seis', nombre: 'Estrella de seis',
    tesela: 'hex', angulo: 60, moduloMm: 240, calado: 0.62,
    origen:
      'Construida sobre retícula hexagonal. La estrella de seis puntas es de las ' +
      'formas más antiguas del repertorio y la más luminosa del catálogo: deja ' +
      'pasar más luz que ninguna otra a igual ancho de tira.',
    destacado: true,
  },
  {
    slug: 'octogono-y-cruz', nombre: 'Octógono y cruz',
    tesela: 'cuadrado', angulo: 22.5, moduloMm: 210, calado: 0.58,
    origen:
      'Octógonos regulares separados por pequeñas cruces. Aparece igual en la ' +
      'carpintería mudéjar y en el azulejo, y su tira ancha lo hace el más ' +
      'resistente de todos: el indicado para vanos grandes o exterior expuesto.',
    destacado: false,
  },
  {
    slug: 'khatam-andalusi', nombre: 'Khatam andalusí',
    tesela: '4.8.8', angulo: 45, moduloMm: 280, calado: 0.55,
    origen:
      'Trazado sobre el teselado de octógonos y cuadrados, el que sostiene los ' +
      'paneles calados de al-Andalus y del Magreb. Dibujo denso y de sombra muy gráfica, ' +
      'la familia a la que pertenece el primer prototipo del taller.',
    destacado: true,
  },
  {
    slug: 'roseta-de-doce', nombre: 'Roseta de doce',
    tesela: '3.12.12', angulo: 75, moduloMm: 340, calado: 0.52,
    origen:
      'Dodecágonos y triángulos. La roseta de doce puntas es el registro más ' +
      'ornamental del repertorio persa. Pide vanos amplios: bajo 1,5 m de ancho ' +
      'la estrella se corta y el dibujo no llega a leerse completo.',
    destacado: true,
  },
  {
    slug: 'tabla-hexagonal', nombre: 'Tabla hexagonal',
    tesela: '3.6.3.6', angulo: 54, moduloMm: 260, calado: 0.57,
    origen:
      'Trazado sobre el teselado trihexagonal, de triángulos y hexágonos ' +
      'alternados: la construcción de la "tabla" de doble nivel del repertorio ' +
      'mogol. Reparte la sombra en un entramado más fino que el de la estrella ' +
      'de seis, sobre la misma retícula hexagonal.',
    destacado: false,
  },
];

/* ------------------------------ medicion ------------------------------ */

const distPuntoSeg = (px, py, [[x1, y1], [x2, y2]]) => {
  const dx = x2 - x1, dy = y2 - y1, L2 = dx * dx + dy * dy;
  let t = L2 === 0 ? 0 : ((px - x1) * dx + (py - y1) * dy) / L2;
  t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
};

function medirCalado(segs, [W, H], grosor, muestras = 200000) {
  const r = grosor / 2;
  let madera = 0;
  for (let k = 0; k < muestras; k++) {
    const px = Math.random() * W, py = Math.random() * H;
    for (const s of segs) if (distPuntoSeg(px, py, s) <= r) { madera++; break; }
  }
  return 1 - madera / muestras;
}

/** Biseccion sobre el grosor hasta alcanzar el calado pedido. */
function resolverGrosor(segs, celda, objetivo) {
  let lo = celda[0] * 0.005, hi = celda[0] * 0.28;
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2;
    if (medirCalado(segs, celda, mid, 20000) > objetivo) lo = mid; else hi = mid;
  }
  return (lo + hi) / 2;
}

function distSegSeg(A, B) {
  const [p1, p2] = A, [q1, q2] = B;
  const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const d1 = cr(p1, p2, q1), d2 = cr(p1, p2, q2), d3 = cr(q1, q2, p1), d4 = cr(q1, q2, p2);
  if ((d1 > 0) !== (d2 > 0) && (d3 > 0) !== (d4 > 0)) return 0;
  return Math.min(
    distPuntoSeg(p1[0], p1[1], B), distPuntoSeg(p2[0], p2[1], B),
    distPuntoSeg(q1[0], q1[1], A), distPuntoSeg(q2[0], q2[1], A));
}

/** Porcentaje de segmentos en la mayor pieza conexa. 100 = una sola pieza. */
function piezaMayorPct(segs, grosor) {
  const n = segs.length;
  const padre = Array.from({ length: n }, (_, i) => i);
  const find = (x) => (padre[x] === x ? x : (padre[x] = find(padre[x])));
  const tol = grosor * 1.02;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (distSegSeg(segs[i], segs[j]) <= tol) {
        const a = find(i), b = find(j);
        if (a !== b) padre[a] = b;
      }
    }
  }
  const tam = new Map();
  for (let i = 0; i < n; i++) { const r = find(i); tam.set(r, (tam.get(r) || 0) + 1); }
  return Math.round((Math.max(...tam.values()) / n) * 100);
}

/* ------------------------------ generacion ---------------------------- */

const f = (n) => Number(n.toFixed(4));
const salida = [];
let fallos = 0;

console.log('\npatron                calado  tira    modulo  pieza unica');
console.log('-'.repeat(60));

for (const p of PATRONES) {
  const { celda, poligonos } = TES[p.tesela](1);
  const [W, H] = celda;
  const todos = poligonos.flatMap((pol) => hankin(pol, gr(p.angulo)));

  const enCelda = todos.filter(([a, b]) =>
    Math.max(a[0], b[0]) > 0 && Math.min(a[0], b[0]) < W &&
    Math.max(a[1], b[1]) > 0 && Math.min(a[1], b[1]) < H);

  const grosor = resolverGrosor(enCelda, [W, H], p.calado);
  const caladoReal = medirCalado(enCelda, [W, H], grosor);
  const tiraMm = Math.round((grosor / W) * p.moduloMm);

  // Conectividad sobre un bloque de 3x3 celdas, no sobre una sola.
  const bloque = todos.filter(([a, b]) =>
    Math.min(a[0], b[0]) > -W && Math.max(a[0], b[0]) < 2 * W &&
    Math.min(a[1], b[1]) > -H && Math.max(a[1], b[1]) < 2 * H);
  const unica = piezaMayorPct(bloque, grosor);

  if (unica < 97) {
    console.error(`FALLA ${p.slug}: se fragmenta (mayor pieza ${unica}%)`);
    fallos++;
  }
  if (tiraMm < TIRA_MINIMA_MM) {
    console.error(`FALLA ${p.slug}: tira ${tiraMm} mm bajo el minimo ${TIRA_MINIMA_MM} mm`);
    fallos++;
  }

  const margen = grosor * 2;
  const dibujo = todos.filter(([a, b]) =>
    Math.max(a[0], b[0]) > -margen && Math.min(a[0], b[0]) < W + margen &&
    Math.max(a[1], b[1]) > -margen && Math.min(a[1], b[1]) < H + margen);

  const d = dibujo.map(([a, b]) => `M${f(a[0])} ${f(a[1])}L${f(b[0])} ${f(b[1])}`).join('');
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${f(W)} ${f(H)}" ` +
    `width="${f(W * 100)}" height="${f(H * 100)}" fill="none">` +
    `<path d="${d}" stroke="currentColor" stroke-width="${f(grosor)}" ` +
    `stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  writeFileSync(join(destinoSvg, `${p.slug}.svg`), svg + '\n');

  salida.push({
    slug: p.slug, nombre: p.nombre, origen: p.origen, destacado: p.destacado,
    teselado: p.tesela, anguloContacto: p.angulo,
    moduloMm: p.moduloMm, tiraMm,
    caladoPct: Math.round(caladoReal * 100),
    celda: [f(W), f(H)],
    relacionCelda: f(W / H),
    piezaUnicaPct: unica,
  });

  console.log(
    `${p.slug.padEnd(20)} ${String(Math.round(caladoReal * 100)).padStart(5)}%  ` +
    `${String(tiraMm).padStart(3)}mm  ${String(p.moduloMm).padStart(4)}mm  ` +
    `${String(unica).padStart(9)}%`);
}

writeFileSync(join(destinoDatos, 'patrones.json'), JSON.stringify(salida, null, 2) + '\n');
console.log('-'.repeat(60));
if (fallos) {
  console.error(`\n${fallos} patron(es) no cumplen. Revisar antes de usar.\n`);
  process.exit(1);
}
console.log(`\n${salida.length} patrones: todos de una sola pieza y con tira >= ${TIRA_MINIMA_MM} mm.\n`);
