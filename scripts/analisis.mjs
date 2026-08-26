/**
 * Analiza patrones candidatos con dos criterios objetivos:
 *  1. CONECTIVIDAD — la madera debe formar una sola pieza. Si el patron se
 *     parte en trozos, esos trozos se caen literalmente al terminar el corte.
 *     Es el criterio que descarta o aprueba un patron para fabricacion.
 *  2. CALADO — fraccion de vano abierto, medida por muestreo.
 */
import { gr, hankin, teseladoCuadrado, teseladoHexagonal, tesela488, tesela3636, tesela31212 } from './geometria.mjs';

const TES = { cuadrado: teseladoCuadrado, hex: teseladoHexagonal, '4.8.8': tesela488, '3.6.3.6': tesela3636, '3.12.12': tesela31212 };

/** Distancia minima entre dos segmentos. */
function distSegSeg(A, B) {
  const d = (px, py, [[x1, y1], [x2, y2]]) => {
    const dx = x2 - x1, dy = y2 - y1, L2 = dx * dx + dy * dy;
    let t = L2 === 0 ? 0 : ((px - x1) * dx + (py - y1) * dy) / L2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
  };
  // Si se cruzan, distancia 0.
  const [p1, p2] = A, [q1, q2] = B;
  const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const d1 = cr(p1, p2, q1), d2 = cr(p1, p2, q2), d3 = cr(q1, q2, p1), d4 = cr(q1, q2, p2);
  if (((d1 > 0) !== (d2 > 0)) && ((d3 > 0) !== (d4 > 0))) return 0;
  return Math.min(d(p1[0], p1[1], B), d(p2[0], p2[1], B), d(q1[0], q1[1], A), d(q2[0], q2[1], A));
}

/** Componentes conexas de la madera: dos segmentos se tocan si su distancia <= grosor. */
function conectividad(segs, grosor) {
  const n = segs.length;
  const padre = Array.from({ length: n }, (_, i) => i);
  const find = (x) => (padre[x] === x ? x : (padre[x] = find(padre[x])));
  const une = (a, b) => { a = find(a); b = find(b); if (a !== b) padre[a] = b; };
  const tol = grosor * 1.02;
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++)
      if (distSegSeg(segs[i], segs[j]) <= tol) une(i, j);
  const tam = new Map();
  for (let i = 0; i < n; i++) { const r = find(i); tam.set(r, (tam.get(r) || 0) + 1); }
  const tallas = [...tam.values()].sort((a, b) => b - a);
  return { componentes: tallas.length, mayorPct: Math.round((tallas[0] / n) * 100) };
}

function calado(segs, [W, H], grosor, muestras = 60_000) {
  const r = grosor / 2;
  const d = (px, py, [[x1, y1], [x2, y2]]) => {
    const dx = x2 - x1, dy = y2 - y1, L2 = dx * dx + dy * dy;
    let t = L2 === 0 ? 0 : ((px - x1) * dx + (py - y1) * dy) / L2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy));
  };
  let madera = 0;
  for (let k = 0; k < muestras; k++) {
    const px = Math.random() * W, py = Math.random() * H;
    for (const s of segs) if (d(px, py, s) <= r) { madera++; break; }
  }
  return Math.round((1 - madera / muestras) * 100);
}

const ANG = [22.5, 30, 36, 45, 54, 60, 67.5, 72, 75];
console.log('\nteselado   angulo  segs  compon.  mayor%  calado%  veredicto');
console.log('-'.repeat(66));
const buenos = [];
for (const [nom, fn] of Object.entries(TES)) {
  const { celda, poligonos } = fn(1);
  const [W, H] = celda;
  const grosor = W * 0.055;
  for (const a of ANG) {
    // Analizar solo la zona central: 3x3 celdas alrededor del origen.
    const todos = poligonos.flatMap((p) => hankin(p, gr(a)));
    const segs = todos.filter(([p, q]) =>
      Math.min(p[0], q[0]) > -W && Math.max(p[0], q[0]) < 2 * W &&
      Math.min(p[1], q[1]) > -H && Math.max(p[1], q[1]) < 2 * H);
    if (segs.length < 6) continue;
    const { componentes, mayorPct } = conectividad(segs, grosor);
    const c = calado(segs.filter(([p, q]) =>
      Math.max(p[0], q[0]) > 0 && Math.min(p[0], q[0]) < W &&
      Math.max(p[1], q[1]) > 0 && Math.min(p[1], q[1]) < H), [W, H], grosor);
    // Viable = una sola pieza (o casi, salvo recortes de borde) y calado util.
    const viable = mayorPct >= 97 && c >= 35 && c <= 80;
    if (viable) buenos.push({ nom, a, c, mayorPct });
    console.log(
      `${nom.padEnd(10)} ${String(a).padStart(5)}  ${String(segs.length).padStart(4)}  ` +
      `${String(componentes).padStart(7)}  ${String(mayorPct).padStart(5)}%  ${String(c).padStart(6)}%  ` +
      `${viable ? 'VIABLE' : mayorPct < 97 ? 'se fragmenta' : 'calado fuera de rango'}`);
  }
  console.log('-'.repeat(66));
}
console.log(`\nCandidatos viables: ${buenos.length}`);
buenos.forEach((b) => console.log(`   ${b.nom} @ ${b.a}deg  calado ${b.c}%  pieza unica ${b.mayorPct}%`));
