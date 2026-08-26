/**
 * Construccion de patrones geometricos islamicos por el metodo de Hankin
 * (polygons-in-contact): sobre un teselado, en el punto medio de cada arista
 * se lanzan dos rayos simetricos a un angulo de contacto; cada rayo se corta
 * con el primer rayo que encuentra. La union de esos segmentos es el patron.
 *
 * Es el procedimiento historico real, no una aproximacion decorativa: cambiar
 * el teselado o el angulo produce las familias clasicas (khatam de ocho,
 * estrella de seis, roseta de doce).
 */

const TAU = Math.PI * 2;
export const gr = (d) => (d * Math.PI) / 180;

const rot = ([x, y], a) => [x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a)];
const norm = ([x, y]) => { const m = Math.hypot(x, y); return [x / m, y / m]; };
const areaFirmada = (p) =>
  p.reduce((s, [x, y], i) => { const [u, v] = p[(i + 1) % p.length]; return s + (x * v - u * y); }, 0) / 2;

/** Poligono regular de n lados, centro c, circunradio R, girado `giro` radianes. */
export function poligono(n, [cx, cy], R, giro = 0) {
  return Array.from({ length: n }, (_, i) => {
    const a = giro + (i * TAU) / n;
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
  });
}

/** Interseccion de dos rayos. Devuelve null si son paralelos o el corte queda detras. */
function cortaRayos([p1, d1], [p2, d2], eps = 1e-9) {
  const den = d1[0] * d2[1] - d1[1] * d2[0];
  if (Math.abs(den) < eps) return null;
  const dx = p2[0] - p1[0], dy = p2[1] - p1[1];
  const t = (dx * d2[1] - dy * d2[0]) / den;
  const u = (dx * d1[1] - dy * d1[0]) / den;
  if (t < eps || u < eps) return null;
  return { t, punto: [p1[0] + d1[0] * t, p1[1] + d1[1] * t] };
}

/**
 * Aplica Hankin a un poligono y devuelve los segmentos del patron dentro de el.
 * @param {number[][]} pol vertices
 * @param {number} theta angulo de contacto en radianes, medido desde la arista
 */
export function hankin(pol, theta) {
  // Orientar siempre en sentido antihorario para que el interior quede a la izquierda.
  const p = areaFirmada(pol) < 0 ? [...pol].reverse() : pol;
  const n = p.length;

  const rayos = [];
  for (let i = 0; i < n; i++) {
    const a = p[i], b = p[(i + 1) % n];
    const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    const dir = norm([b[0] - a[0], b[1] - a[1]]);
    // Simetricos respecto de la normal interior (que esta a +90 de la arista).
    rayos.push({ arista: i, origen: m, d: rot(dir, theta) });
    rayos.push({ arista: i, origen: m, d: rot(dir, Math.PI - theta) });
  }

  const segs = [];
  for (const r of rayos) {
    let mejor = null;
    for (const o of rayos) {
      if (o.arista === r.arista) continue; // los dos rayos de una misma arista no se cortan entre si
      const c = cortaRayos([r.origen, r.d], [o.origen, o.d]);
      if (c && (!mejor || c.t < mejor.t)) mejor = c;
    }
    if (mejor) segs.push([r.origen, mejor.punto]);
  }
  return segs;
}

/* ---------------------------------------------------------------------- */
/* Teselados. Cada uno devuelve { celda:[ancho,alto], poligonos:[...] }     */
/* generados sobre una region mas grande que la celda para que el patron    */
/* case sin costura al repetirse.                                           */
/* ---------------------------------------------------------------------- */

const REP = 2; // celdas de margen a cada lado

/** Cuadricula: produce la familia del khatam de ocho puntas. */
export function teseladoCuadrado(lado = 1) {
  const poligonos = [];
  for (let i = -REP; i <= REP + 1; i++)
    for (let j = -REP; j <= REP + 1; j++)
      poligonos.push([
        [i * lado, j * lado], [(i + 1) * lado, j * lado],
        [(i + 1) * lado, (j + 1) * lado], [i * lado, (j + 1) * lado],
      ]);
  return { celda: [lado, lado], poligonos };
}

/** Hexagonal de vertice plano: familia de la estrella de seis. */
export function teseladoHexagonal(R = 1) {
  const ancho = 3 * R, alto = Math.sqrt(3) * R;
  const poligonos = [];
  for (let i = -REP * 2; i <= REP * 2 + 2; i++)
    for (let j = -REP * 2; j <= REP * 2 + 2; j++) {
      const cx = i * 1.5 * R;
      const cy = j * alto + (Math.abs(i % 2) === 1 ? alto / 2 : 0);
      poligonos.push(poligono(6, [cx, cy], R, 0));
    }
  return { celda: [ancho, alto], poligonos };
}

/** 4.8.8 — octagonos y cuadrados. El teselado clasico del khatam andalusi. */
export function tesela488(arista = 1) {
  const Roct = arista / (2 * Math.sin(Math.PI / 8));
  const s = arista * (1 + Math.SQRT2); // lado de la celda
  const Rcua = arista / Math.SQRT2;
  const poligonos = [];
  for (let i = -REP; i <= REP + 1; i++)
    for (let j = -REP; j <= REP + 1; j++) {
      poligonos.push(poligono(8, [i * s, j * s], Roct, gr(22.5)));
      poligonos.push(poligono(4, [i * s + s / 2, j * s + s / 2], Rcua, 0));
    }
  return { celda: [s, s], poligonos };
}

/** 3.6.3.6 — hexagonos y triangulos alternados. Trama mas abierta. */
export function tesela3636(a = 1) {
  const ancho = 3 * a, alto = Math.sqrt(3) * a;
  const poligonos = [];
  const h = (Math.sqrt(3) / 2) * a;
  for (let i = -REP * 2; i <= REP * 2 + 2; i++)
    for (let j = -REP * 2; j <= REP * 2 + 2; j++) {
      const cx = i * 1.5 * a;
      const cy = j * alto + (Math.abs(i % 2) === 1 ? alto / 2 : 0);
      poligonos.push(poligono(6, [cx, cy], a, 0));
      // Los dos triangulos que rellenan el hueco entre hexagonos vecinos.
      poligonos.push(poligono(3, [cx + a, cy + h * (2 / 3) * 0 + 0], a / Math.sqrt(3), gr(0)));
      poligonos.push(poligono(3, [cx + a, cy], a / Math.sqrt(3), gr(60)));
    }
  return { celda: [ancho, alto], poligonos };
}

/** 3.12.12 — dodecagonos y triangulos: la roseta de doce puntas. */
export function tesela31212(arista = 1) {
  const Rdod = arista / (2 * Math.sin(Math.PI / 12));
  // Centros de dodecagono en red hexagonal, separacion = 2 * apotema
  const ap = (arista / 2) / Math.tan(Math.PI / 12);
  const d = 2 * ap;
  const ancho = d, alto = d * Math.sqrt(3);
  const poligonos = [];
  for (let i = -REP * 2; i <= REP * 2 + 2; i++)
    for (let j = -REP * 2; j <= REP * 2 + 2; j++) {
      const cx = i * d + (Math.abs(j % 2) === 1 ? d / 2 : 0);
      const cy = j * (alto / 2);
      poligonos.push(poligono(12, [cx, cy], Rdod, gr(15)));
      poligonos.push(poligono(3, [cx + d / 2, cy + alto / 4], arista / Math.sqrt(3), gr(90)));
      poligonos.push(poligono(3, [cx + d / 2, cy - alto / 4], arista / Math.sqrt(3), gr(-90)));
    }
  return { celda: [ancho, alto], poligonos };
}
