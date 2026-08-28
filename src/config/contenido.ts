/**
 * Contenido estructurado del sitio: aplicaciones, materiales y terminaciones.
 *
 * Los materiales y su división interior/exterior salen del análisis de costos
 * del taller (Análisis de Costos/Costos de Materiales.xlsx). No se publican
 * precios: la decisión fue cotizar todo caso a caso.
 */

import type { ImageMetadata } from 'astro';
import patronesJson from './patrones.json';
import imagenTiposDeDisenos from '../assets/blog/tipos-de-disenos-jaali.png';
import imagenJaaliEnDecoracion from '../assets/blog/jaali-en-decoracion-y-arquitectura.png';
import imagenGuiaDeDiseno from '../assets/blog/guia-de-diseno-jaali.png';

export interface Patron {
  slug: string;
  nombre: string;
  origen: string;
  destacado: boolean;
  teselado: string;
  anguloContacto: number;
  moduloMm: number;
  tiraMm: number;
  caladoPct: number;
  celda: [number, number];
  relacionCelda: number;
  piezaUnicaPct: number;
}

export const PATRONES = patronesJson as Patron[];
export const PATRONES_DESTACADOS = PATRONES.filter((p) => p.destacado);
export const patronPorSlug = (slug: string) => PATRONES.find((p) => p.slug === slug);

/* ----------------------------- aplicaciones ---------------------------- */

export interface Aplicacion {
  slug: string;
  nombre: string;
  /** Titular de la página. Lleva el término que la gente busca en Chile. */
  titulo: string;
  resumen: string;
  cuerpo: string[];
  ubicacion: 'interior' | 'exterior' | 'ambas';
  materialSugerido: string;
  patronSugerido: string;
  consideraciones: string[];
}

export const APLICACIONES: Aplicacion[] = [
  {
    slug: 'quiebravista-terraza',
    nombre: 'Quiebravista',
    titulo: 'Quiebravistas de madera a medida para terrazas y patios',
    resumen:
      'Recupera la terraza sin cerrarla. El calado corta la vista del vecino y baja el sol ' +
      'de la tarde, pero deja pasar el aire y la luz.',
    cuerpo: [
      'Una pantalla ciega te tapa la vista y te deja la terraza oscura y encajonada. Una calada ' +
      'hace lo contrario: bloquea la línea de visión directa desde el departamento de enfrente ' +
      'y sigue ventilando.',
      'Para exterior el material no es negociable: terciado marino de encolado fenólico o HDPE. ' +
      'El terciado estándar y el MDF se delaminan con la primera lluvia y no los usamos afuera.',
    ],
    ubicacion: 'exterior',
    materialSugerido: 'terciado-marino',
    patronSugerido: 'octogono-y-cruz',
    consideraciones: [
      'Separa la pantalla al menos 30 mm del muro para que ventile por las dos caras.',
      'En terrazas con viento fuerte conviene bajar el calado: más madera, más rigidez.',
      'Orientación poniente: el patrón de tira ancha da más sombra a media tarde.',
    ],
  },
  {
    slug: 'biombo-separador-ambientes',
    nombre: 'Biombo separador',
    titulo: 'Biombos y separadores de ambiente calados a medida',
    resumen:
      'Divide sin levantar un muro. Separa el comedor del living, o crea un rincón de ' +
      'escritorio, sin perder la sensación de amplitud.',
    cuerpo: [
      'Es la aplicación más pedida en departamentos: el espacio único necesita zonas, pero un ' +
      'tabique sólido lo achica y lo oscurece. La pantalla decorativa marca el límite y deja pasar la luz ' +
      'de lado a lado.',
      'Al ser interior se abre todo el abanico de materiales y terminaciones, incluido el MDF ' +
      'pintado a color, que es el que mejor rinde cuando la pantalla tiene que integrarse a una ' +
      'paleta ya definida.',
    ],
    ubicacion: 'interior',
    materialSugerido: 'terciado-mueblería',
    patronSugerido: 'estrella-de-seis',
    consideraciones: [
      'Fijo del piso al cielo, o montado sobre base con pie si necesitas moverlo.',
      'En interior conviene más calado: entra más luz y la pieza pesa menos.',
      'Si va detrás de una lámpara, el patrón proyecta su dibujo sobre el muro de enfrente.',
    ],
  },
  {
    slug: 'fachada-ventilada',
    nombre: 'Fachada ventilada',
    titulo: 'Pantallas decorativas para fachada ventilada y revestimiento exterior',
    resumen:
      'Piel exterior sobre subestructura. Suma control solar y carácter a la fachada sin ' +
      'intervenir la envolvente.',
    cuerpo: [
      'La pantalla decorativa se monta sobre perfilería separada del muro, dejando la cámara de aire que ' +
      'define una fachada ventilada. El calado regula cuanta radiación llega al paramento.',
      'Es la aplicación más exigente del catálogo y donde el material manda: aquí van HDPE o ' +
      'HPL, no madera. Trabajamos el despiece sobre los planos del proyecto.',
    ],
    ubicacion: 'exterior',
    materialSugerido: 'hdpe',
    patronSugerido: 'khatam-andalusi',
    consideraciones: [
      'Se despieza según la modulación de la subestructura, no al revés.',
      'Requiere definir fijación, dilatación y tolerancia de montaje en obra.',
      'Para proyectos con especificación técnica, escríbenos con los planos.',
    ],
  },
  {
    slug: 'cielo-decorativo',
    nombre: 'Cielo decorativo',
    titulo: 'Cielos decorativos calados para locales y hotelería',
    resumen:
      'El plano que nadie usa. Un cielo calado con luz detrás cambia por completo el carácter ' +
      'de un local sin tocar ni un muro.',
    cuerpo: [
      'En restaurantes, hoteles y oficinas es la intervención de mayor efecto por metro ' +
      'cuadrado: se ve desde toda la sala y no compite con el mobiliario ni con la circulación.',
      'Con iluminación indirecta por sobre la pantalla, el patrón deja de ser un dibujo en la ' +
      'madera y pasa a ser una figura de luz proyectada sobre el resto del espacio.',
    ],
    ubicacion: 'interior',
    materialSugerido: 'terciado-mueblería',
    patronSugerido: 'roseta-de-doce',
    consideraciones: [
      'Deja al menos 150 mm entre la pantalla y la luminaria para que el dibujo se abra.',
      'Los patrones de módulo grande se leen mejor mirados desde abajo y a distancia.',
      'Consulta la normativa de comportamiento al fuego del recinto antes de definir material.',
    ],
  },
  {
    slug: 'cuadros-y-decoracion',
    nombre: 'Cuadros y decoración',
    titulo: 'Cuadros y paneles decorativos calados para pared',
    resumen:
      'Un cuadro que no se pinta: se corta. El calado convierte un patrón geométrico en la ' +
      'pieza central de una pared, con o sin luz detrás.',
    cuerpo: [
      'Acá el calado no resuelve ventilación ni privacidad: es puramente compositivo. Funciona ' +
      'como pieza única sobre un sofá o un escritorio, o repetido en formato tríptico para ' +
      'cubrir un muro completo sin que se note la unión entre paños.',
      'Con una tira de luz LED montada detrás y separada del muro, el patrón deja de ser solo ' +
      'relieve y proyecta su propia sombra sobre la pared: la misma pieza se ve distinta de día ' +
      'que de noche.',
    ],
    ubicacion: 'interior',
    materialSugerido: 'mdf',
    patronSugerido: 'tabla-hexagonal',
    consideraciones: [
      'Se entrega lista para colgar, con el sistema de fijación que prefieras: riel francés, ' +
      'argollas o tacos ocultos.',
      'Si va con luz de fondo, deja al menos 40 mm de separación del muro para que la sombra se ' +
      'abra bien.',
      'Para formato tríptico, el patrón se ajusta para que la trama cruce sin cortes visibles ' +
      'entre los tres paños.',
    ],
  },
];

export const aplicacionPorSlug = (slug: string) => APLICACIONES.find((a) => a.slug === slug);

/* ------------------------------ materiales ----------------------------- */

export interface Material {
  slug: string;
  nombre: string;
  espesorMm: number;
  ubicacion: 'interior' | 'exterior';
  resumen: string;
  detalle: string;
  /** Orden relativo de costo, 1 = más económico. No es precio. */
  nivelCosto: 1 | 2 | 3 | 4;
  recomendado?: boolean;
}

export const MATERIALES: Material[] = [
  {
    slug: 'terciado-estandar',
    nombre: 'Terciado estándar',
    espesorMm: 15,
    ubicacion: 'interior',
    nivelCosto: 1,
    resumen: 'La entrada al catálogo. Requiere lijado manual más intenso: no es la opción para calados finos.',
    detalle:
      'Es el más económico, pero en las pruebas de corte reales astilla y levanta fibra en el ' +
      'canto del calado, sobre todo en trazados finos. Eso significa más lijado a mano, más ' +
      'tiempo de taller y mayor variabilidad en el acabado. Funciona si la pantalla se va a pintar ' +
      'y el patrón es de tira ancha; para calados finos o piezas a la vista, mejor terciado de ' +
      'mueblería. No sirve para exterior ni para baños: el encolado no resiste humedad sostenida.',
  },
  {
    slug: 'terciado-muebleria',
    nombre: 'Terciado de mueblería',
    espesorMm: 15,
    ubicacion: 'interior',
    nivelCosto: 2,
    recomendado: true,
    resumen: 'Cara limpia y canto parejo. El estándar para interior a la vista y calados finos.',
    detalle:
      'Mejor selección de chapa que el estándar: menos nudos, menos vacíos internos y un canto ' +
      'que astilla mucho menos al corte, por lo que el lijado final es más rápido y parejo. Es ' +
      'el que recomendamos cuando la madera se ve, porque en una pantalla decorativa el canto queda ' +
      'expuesto en toda su longitud.',
  },
  {
    slug: 'terciado-marino',
    nombre: 'Terciado marino',
    espesorMm: 15,
    ubicacion: 'exterior',
    nivelCosto: 2,
    recomendado: true,
    resumen: 'Encolado fenólico. Es lo que permite sacar la pantalla afuera.',
    detalle:
      'El salto desde el terciado estándar es pequeño en el total de la cotización, porque en ' +
      'una pantalla decorativa el grueso del costo es el mecanizado y no la plancha. Si la pantalla va a ' +
      'exterior, esta es la elección evidente.',
  },
  {
    slug: 'mdf',
    nombre: 'MDF',
    espesorMm: 15,
    ubicacion: 'interior',
    nivelCosto: 1,
    resumen: 'Superficie sin veta, la mejor base para pintar a color.',
    detalle:
      'No tiene veta ni nudos, así que la pintura queda pareja y el color sale exacto. Es la ' +
      'opción cuando la pantalla debe integrarse a una paleta ya definida. Solo interior seco: ' +
      'ante humedad se hincha y no vuelve atrás.',
  },
  {
    slug: 'hdpe',
    nombre: 'HDPE',
    espesorMm: 15,
    ubicacion: 'exterior',
    nivelCosto: 3,
    resumen: 'Polietileno de alta densidad. Cero mantención a la intemperie.',
    detalle:
      'No absorbe agua, no se delamina y no pide barniz nunca. Es lo indicado en fachada, ' +
      'piscinas y cualquier punto de difícil acceso para mantener. Se trabaja en negro y ' +
      'entrega un canto mate muy limpio.',
  },
  {
    slug: 'hpl',
    nombre: 'HPL',
    espesorMm: 12,
    ubicacion: 'exterior',
    nivelCosto: 4,
    resumen: 'Laminado compacto de alta presión. El de mayor resistencia del catálogo.',
    detalle:
      'Máxima estabilidad dimensional y resistencia al rayado, al impacto y al sol. Es el ' +
      'material de fachada ventilada cuando el proyecto exige documentación técnica y una ' +
      'vida útil larga sin intervención.',
  },
];

export const materialPorSlug = (slug: string) => MATERIALES.find((m) => m.slug === slug);

export const TERMINACIONES = [
  {
    nombre: 'Lijado natural',
    detalle: 'Madera desnuda, lijada en canto y en las dos caras. Para interior seco.',
  },
  {
    nombre: 'Aceitado',
    detalle: 'Aceite penetrante que realza la veta y deja tacto de madera, no de plástico.',
  },
  {
    nombre: 'Barnizado',
    detalle: 'Capa de protección sobre la veta. Con filtro UV si la pantalla recibe sol directo.',
  },
  {
    nombre: 'Pintado',
    detalle: 'Color a elección, incluido color de muestra. Rinde mejor sobre MDF.',
  },
];

/* --------------------------------- blog --------------------------------- */

export interface ArticuloBlog {
  slug: string;
  titulo: string;
  resumen: string;
  fecha: string;
  tiempoLectura: string;
  cuerpo: string[];
  imagen: ImageMetadata;
  imagenAlt: string;
}

export const ARTICULOS_BLOG: ArticuloBlog[] = [
  {
    slug: 'tipos-de-disenos-jaali',
    titulo: 'Tipos de diseños Jaali: cómo leer un patrón calado',
    resumen:
      'Geométricos, florales o de retícula: cada familia de patrones resuelve distinto la ' +
      'relación entre calado y madera. Una guía para reconocerlos antes de elegir uno.',
    fecha: '2026-08-28',
    tiempoLectura: '6 min',
    imagen: imagenTiposDeDisenos,
    imagenAlt: 'Pantalla decorativa de madera con patrón geométrico hexagonal, luz natural proyectando su sombra en un muro claro.',
    cuerpo: [
      'Todo patrón Jaali se arma sobre una unidad que se repite: el módulo. Lo que cambia de un ' +
      'diseño a otro no es la técnica de corte, es la figura que se elige para teselar el plano ' +
      'y el porcentaje de calado que resulta de esa elección.',
      'Los patrones geométricos son los más comunes: hexágonos, estrellas, rombos y sus ' +
      'combinaciones. Se apoyan en la simetría, así que el ojo los lee como orden incluso a ' +
      'distancia. Son también los más predecibles de fabricar, porque el teselado se resuelve ' +
      'con ángulos exactos y no depende de curvas.',
      'Los patrones florales y de roseta parten de una geometría igual de estricta, pero la ' +
      'disimulan con curvas: pétalos, lóbulos, tramas que giran alrededor de un centro. Piden ' +
      'más tiempo de corte y una tira más ancha para no perder rigidez en los puntos donde la ' +
      'curva se estrecha.',
      'La retícula es la familia más simple: una grilla de rombos o cuadrados sin ornamento ' +
      'adicional. Se usa cuando la pantalla tiene que discretear, no protagonizar; es habitual en ' +
      'frentes de mueble y biombos donde el patrón no debe competir con el resto del ambiente.',
      'Tres números definen a cualquier patrón, más allá de su familia: el módulo (el tamaño de ' +
      'la unidad que se repite), el ancho de tira (el grosor de madera que queda entre calados, ' +
      'y que determina la rigidez de la pieza) y el porcentaje de calado (cuánta luz y aire ' +
      'pasan). Subir el calado baja la rigidez; es la decisión de diseño detrás de cada patrón, ' +
      'no un detalle estético.',
      'No hay un patrón "mejor": hay un patrón que responde a la escala del vano, a la distancia ' +
      'desde la que se va a mirar y al uso que va a tener la pantalla. En la página de diseños está ' +
      'la ficha técnica completa de cada uno, con su módulo y su porcentaje de calado.',
    ],
  },
  {
    slug: 'jaali-en-decoracion-y-arquitectura',
    titulo: 'Jaali en decoración y arquitectura: de la ventana al cielo',
    resumen:
      'La pantalla decorativa dejó de ser solo una solución para fachadas. Repasamos los usos que más ' +
      'está tomando dentro de la casa y en proyectos de arquitectura interior.',
    fecha: '2026-08-28',
    tiempoLectura: '5 min',
    imagen: imagenJaaliEnDecoracion,
    imagenAlt: 'Living minimalista con un biombo calado de madera separando el comedor, luz de tarde filtrada por el calado.',
    cuerpo: [
      'La pantalla decorativa nació resolviendo un problema de clima: ventilar sin exponer, sombrear sin ' +
      'oscurecer. Esa misma lógica se trasladó adentro de la casa y hoy se usa donde antes se ' +
      'ponía un tabique de yeso cartón.',
      'En arquitectura interior, el uso más extendido es como separador de ambientes: divide el ' +
      'living del comedor, o un escritorio del resto de la casa, sin cerrar el espacio ni tapar ' +
      'la luz que entra por la ventana del otro lado.',
      'El segundo uso en crecimiento es el cielo decorativo, sobre todo en locales comerciales y ' +
      'hotelería. Con iluminación indirecta por encima de la pantalla, el patrón deja de leerse como ' +
      'un dibujo tallado en la madera y pasa a proyectarse como una figura de luz sobre las ' +
      'mesas y el piso.',
      'Puertas de closet, frentes de mueble de audio y video, puertas de bar: la pantalla decorativa resuelve ' +
      'ahí un problema práctico, no solo decorativo. El calado deja circular el aire dentro del ' +
      'mueble y, en equipos electrónicos, deja pasar la señal del control remoto.',
      'Afuera, sigue siendo la solución de fachada ventilada y quiebravista que fue siempre: una ' +
      'piel montada sobre una subestructura separada del muro, que filtra sol y vista sin ' +
      'bloquear la ventilación de la cámara de aire.',
      'Lo que cambió no es la técnica, es la cantidad de lugares donde un arquitecto o un ' +
      'diseñador de interiores decide usar calado en vez de un plano ciego. Cada aplicación pide ' +
      'un material y un patrón distintos: el detalle de cada una está en la sección de ' +
      'aplicaciones.',
    ],
  },
  {
    slug: 'guia-de-diseno-jaali',
    titulo: 'Guía de diseño Jaali: historia, función y principios',
    resumen:
      'De dónde viene la técnica, qué problema resuelve y qué principios de diseño hay detrás de ' +
      'cada patrón calado. Una introducción antes de elegir el tuyo.',
    fecha: '2026-08-28',
    tiempoLectura: '7 min',
    imagen: imagenGuiaDeDiseno,
    imagenAlt: 'Detalle de una fachada ventilada con pantallas decorativas de madera, luz cálida de atardecer marcando el relieve del calado.',
    cuerpo: [
      'Jaali (del hindi/urdu, "red" o "malla") es el nombre que reciben las pantallas decorativas en ' +
      'piedra o madera de la arquitectura del sur de Asia. Se usaron durante siglos en ventanas, ' +
      'pantallas y balcones, sobre todo en climas cálidos donde ventilar sin dejar entrar sol ' +
      'directo era una necesidad estructural, no una moda.',
      'La función precede al ornamento. Antes que un patrón bonito, un Jaali es una solución a ' +
      'tres problemas al mismo tiempo: control solar, ventilación cruzada y privacidad, todo sin ' +
      'cerrar el vano por completo. El calado hace de filtro: deja pasar el aire, corta la línea ' +
      'de visión directa y reduce la radiación que llega al otro lado.',
      'De esa función nace el principio de diseño central: la relación entre lleno y vacío. Cada ' +
      'patrón es un balance entre la madera que queda (la tira, que da rigidez estructural) y el ' +
      'espacio que se retira (el calado, que da paso a luz y aire). Ese balance es lo que un ' +
      'buen diseño Jaali tiene que resolver antes de pensar en la forma de la figura.',
      'El segundo principio es la repetición modular. Un patrón Jaali no se dibuja pieza por ' +
      'pieza: se define una unidad mínima y se repite sobre una grilla, geométrica o triangular, ' +
      'hasta cubrir el plano completo. Esa repetición es lo que permite fabricarlo por corte CNC ' +
      'hoy en día con precisión milimétrica, algo que antes tomaba semanas de talla manual.',
      'El tercer principio es la escala en relación a la distancia de lectura. Un patrón de ' +
      'módulo chico se lee como textura cuando se mira de cerca, en un frente de mueble; el ' +
      'mismo patrón agrandado se lee como figura cuando se mira desde lejos, en una fachada. La ' +
      'escala del módulo no es una preferencia estética: depende de dónde va a estar la pantalla y ' +
      'desde dónde se lo va a mirar.',
      'Hoy la técnica se usa fuera de su origen geográfico, aplicada a materiales que no existían ' +
      'cuando se inventó: terciado marino, MDF, HDPE. Lo que se mantiene igual es el principio de ' +
      'diseño de origen, control solar y ventilación resueltos con un patrón que repite una ' +
      'unidad geométrica, ajustando esa unidad a la función y a la escala de cada proyecto.',
    ],
  },
];

export const articuloBlogPorSlug = (slug: string) => ARTICULOS_BLOG.find((a) => a.slug === slug);

/* ------------------------------ navegacion ----------------------------- */

export const NAVEGACION = [
  { href: '/disenos', texto: 'Diseños' },
  { href: '/aplicaciones', texto: 'Aplicaciones' },
  { href: '/materiales', texto: 'Materiales' },
  { href: '/el-oficio', texto: 'El oficio' },
  { href: '/blog', texto: 'Blog' },
];
