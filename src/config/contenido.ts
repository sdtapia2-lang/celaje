/**
 * Contenido estructurado del sitio: aplicaciones, materiales y terminaciones.
 *
 * Los materiales y su división interior/exterior salen del análisis de costos
 * del taller (Análisis de Costos/Costos de Materiales.xlsx). No se publican
 * precios: la decisión fue cotizar todo caso a caso.
 */

import patronesJson from './patrones.json';

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
      'Un panel ciego te tapa la vista y te deja la terraza oscura y encajonada. Una celosía ' +
      'hace lo contrario: bloquea la línea de visión directa desde el departamento de enfrente ' +
      'y sigue ventilando.',
      'Para exterior el material no es negociable: terciado marino de encolado fenólico o HDPE. ' +
      'El terciado estándar y el MDF se delaminan con la primera lluvia y no los usamos afuera.',
    ],
    ubicacion: 'exterior',
    materialSugerido: 'terciado-marino',
    patronSugerido: 'octogono-y-cruz',
    consideraciones: [
      'Separa el panel al menos 30 mm del muro para que ventile por las dos caras.',
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
      'tabique sólido lo achica y lo oscurece. La celosía marca el límite y deja pasar la luz ' +
      'de lado a lado.',
      'Al ser interior se abre todo el abanico de materiales y terminaciones, incluido el MDF ' +
      'pintado a color, que es el que mejor rinde cuando el panel tiene que integrarse a una ' +
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
    titulo: 'Celosías para fachada ventilada y revestimiento exterior',
    resumen:
      'Piel exterior sobre subestructura. Suma control solar y carácter a la fachada sin ' +
      'intervenir la envolvente.',
    cuerpo: [
      'La celosía se monta sobre perfilería separada del muro, dejando la cámara de aire que ' +
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
      'Con iluminación indirecta por sobre el panel, el patrón deja de ser un dibujo en la ' +
      'madera y pasa a ser una figura de luz proyectada sobre el resto del espacio.',
    ],
    ubicacion: 'interior',
    materialSugerido: 'terciado-mueblería',
    patronSugerido: 'roseta-de-doce',
    consideraciones: [
      'Deja al menos 150 mm entre el panel y la luminaria para que el dibujo se abra.',
      'Los patrones de módulo grande se leen mejor mirados desde abajo y a distancia.',
      'Consulta la normativa de comportamiento al fuego del recinto antes de definir material.',
    ],
  },
  {
    slug: 'puertas-y-frentes-de-mueble',
    nombre: 'Frentes de mueble',
    titulo: 'Puertas y frentes de mueble calados a medida',
    resumen:
      'Closets, bares, muebles de televisión y despensas. El calado ventila el interior y ' +
      'convierte un frente plano en la pieza principal del ambiente.',
    cuerpo: [
      'Es la escala más chica y la de plazo más corto. Sirve tanto para renovar un mueble ' +
      'existente cambiándole solo las puertas, como para un proyecto de carpintería nuevo.',
      'En equipos de audio y video el calado no es solo estético: deja respirar los aparatos y ' +
      'permite que pase la señal de los controles remotos.',
    ],
    ubicacion: 'interior',
    materialSugerido: 'mdf',
    patronSugerido: 'reticula-de-rombos',
    consideraciones: [
      'En módulos angostos conviene un patrón de módulo chico para que el dibujo se lea entero.',
      'Se entrega perforado para bisagra si nos pasas el herraje que vas a usar.',
      'El MDF pintado es el que mejor iguala el color de una cocina o un closet existente.',
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
      'tiempo de taller y mayor variabilidad en el acabado. Funciona si el panel se va a pintar ' +
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
      'el que recomendamos cuando la madera se ve, porque en una celosía el canto del calado ' +
      'queda expuesto en toda su longitud.',
  },
  {
    slug: 'terciado-marino',
    nombre: 'Terciado marino',
    espesorMm: 15,
    ubicacion: 'exterior',
    nivelCosto: 2,
    recomendado: true,
    resumen: 'Encolado fenólico. Es lo que permite sacar el panel afuera.',
    detalle:
      'El salto desde el terciado estándar es pequeño en el total de la cotización, porque en ' +
      'una celosía el grueso del costo es el mecanizado y no la plancha. Si el panel va a ' +
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
      'opción cuando el panel debe integrarse a una paleta ya definida. Solo interior seco: ' +
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
    detalle: 'Capa de protección sobre la veta. Con filtro UV si el panel recibe sol directo.',
  },
  {
    nombre: 'Pintado',
    detalle: 'Color a elección, incluido color de muestra. Rinde mejor sobre MDF.',
  },
];

/* ------------------------------ navegacion ----------------------------- */

export const NAVEGACION = [
  { href: '/disenos', texto: 'Diseños' },
  { href: '/aplicaciones', texto: 'Aplicaciones' },
  { href: '/materiales', texto: 'Materiales' },
  { href: '/el-oficio', texto: 'El oficio' },
];
