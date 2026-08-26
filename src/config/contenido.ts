/**
 * Contenido estructurado del sitio: aplicaciones, materiales y terminaciones.
 *
 * Los materiales y su division interior/exterior salen del analisis de costos
 * del taller (Analisis de Costos/Costos de Materiales.xlsx). No se publican
 * precios: la decision fue cotizar todo caso a caso.
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
  /** Titular de la pagina. Lleva el termino que la gente busca en Chile. */
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
      'Un panel ciego te tapa la vista y te deja la terraza oscura y encajonada. Una celosia ' +
      'hace lo contrario: bloquea la linea de vision directa desde el departamento de enfrente ' +
      'y sigue ventilando.',
      'Para exterior el material no es negociable: terciado marino de encolado fenolico o HDPE. ' +
      'El terciado estandar y el MDF se delaminan con la primera lluvia y no los usamos afuera.',
    ],
    ubicacion: 'exterior',
    materialSugerido: 'terciado-marino',
    patronSugerido: 'octogono-y-cruz',
    consideraciones: [
      'Separa el panel al menos 30 mm del muro para que ventile por las dos caras.',
      'En terrazas con viento fuerte conviene bajar el calado: mas madera, mas rigidez.',
      'Orientacion poniente: el patron de tira ancha da mas sombra a media tarde.',
    ],
  },
  {
    slug: 'biombo-separador-ambientes',
    nombre: 'Biombo separador',
    titulo: 'Biombos y separadores de ambiente calados a medida',
    resumen:
      'Divide sin levantar un muro. Separa el comedor del living, o crea un rincon de ' +
      'escritorio, sin perder la sensacion de amplitud.',
    cuerpo: [
      'Es la aplicacion mas pedida en departamentos: el espacio unico necesita zonas, pero un ' +
      'tabique solido lo achica y lo oscurece. La celosia marca el limite y deja pasar la luz ' +
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
      'En interior conviene mas calado: entra mas luz y la pieza pesa menos.',
      'Si va detras de una lampara, el patron proyecta su dibujo sobre el muro de enfrente.',
    ],
  },
  {
    slug: 'fachada-ventilada',
    nombre: 'Fachada ventilada',
    titulo: 'Celosias para fachada ventilada y revestimiento exterior',
    resumen:
      'Piel exterior sobre subestructura. Suma control solar y caracter a la fachada sin ' +
      'intervenir la envolvente.',
    cuerpo: [
      'La celosia se monta sobre perfileria separada del muro, dejando la camara de aire que ' +
      'define una fachada ventilada. El calado regula cuanta radiacion llega al paramento.',
      'Es la aplicacion mas exigente del catalogo y donde el material manda: aqui van HDPE o ' +
      'HPL, no madera. Trabajamos el despiece sobre los planos del proyecto.',
    ],
    ubicacion: 'exterior',
    materialSugerido: 'hdpe',
    patronSugerido: 'khatam-andalusi',
    consideraciones: [
      'Se despieza segun la modulacion de la subestructura, no al reves.',
      'Requiere definir fijacion, dilatacion y tolerancia de montaje en obra.',
      'Para proyectos con especificacion tecnica, escribinos con los planos.',
    ],
  },
  {
    slug: 'cielo-decorativo',
    nombre: 'Cielo decorativo',
    titulo: 'Cielos decorativos calados para locales y hoteleria',
    resumen:
      'El plano que nadie usa. Un cielo calado con luz detras cambia por completo el caracter ' +
      'de un local sin tocar ni un muro.',
    cuerpo: [
      'En restaurantes, hoteles y oficinas es la intervencion de mayor efecto por metro ' +
      'cuadrado: se ve desde toda la sala y no compite con el mobiliario ni con la circulacion.',
      'Con iluminacion indirecta por sobre el panel, el patron deja de ser un dibujo en la ' +
      'madera y pasa a ser una figura de luz proyectada sobre el resto del espacio.',
    ],
    ubicacion: 'interior',
    materialSugerido: 'terciado-mueblería',
    patronSugerido: 'roseta-de-doce',
    consideraciones: [
      'Deja al menos 150 mm entre el panel y la luminaria para que el dibujo se abra.',
      'Los patrones de modulo grande se leen mejor mirados desde abajo y a distancia.',
      'Consulta la normativa de comportamiento al fuego del recinto antes de definir material.',
    ],
  },
  {
    slug: 'puertas-y-frentes-de-mueble',
    nombre: 'Frentes de mueble',
    titulo: 'Puertas y frentes de mueble calados a medida',
    resumen:
      'Closets, bares, muebles de television y despensas. El calado ventila el interior y ' +
      'convierte un frente plano en la pieza principal del ambiente.',
    cuerpo: [
      'Es la escala mas chica y la de plazo mas corto. Sirve tanto para renovar un mueble ' +
      'existente cambiandole solo las puertas, como para un proyecto de carpinteria nuevo.',
      'En equipos de audio y video el calado no es solo estetico: deja respirar los aparatos y ' +
      'permite que pase la senal de los controles remotos.',
    ],
    ubicacion: 'interior',
    materialSugerido: 'mdf',
    patronSugerido: 'reticula-de-rombos',
    consideraciones: [
      'En modulos angostos conviene un patron de modulo chico para que el dibujo se lea entero.',
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
  /** Orden relativo de costo, 1 = mas economico. No es precio. */
  nivelCosto: 1 | 2 | 3 | 4;
  recomendado?: boolean;
}

export const MATERIALES: Material[] = [
  {
    slug: 'terciado-estandar',
    nombre: 'Terciado estandar',
    espesorMm: 15,
    ubicacion: 'interior',
    nivelCosto: 1,
    resumen: 'La entrada al catalogo. Buen resultado en interior seco, con nudos a la vista.',
    detalle:
      'Es el mas economico y funciona bien cuando el panel se va a pintar o cuando los nudos ' +
      'suman al caracter de la pieza. No sirve para exterior ni para banos: el encolado no ' +
      'resiste humedad sostenida.',
  },
  {
    slug: 'terciado-muebleria',
    nombre: 'Terciado de muebleria',
    espesorMm: 15,
    ubicacion: 'interior',
    nivelCosto: 2,
    recomendado: true,
    resumen: 'Cara limpia y canto parejo. El estandar para interior a la vista.',
    detalle:
      'Mejor seleccion de chapa que el estandar: menos nudos, menos vacios internos y un canto ' +
      'que queda limpio despues del lijado. Es el que recomendamos cuando la madera se ve, ' +
      'porque en una celosia el canto del calado queda expuesto en toda su longitud.',
  },
  {
    slug: 'terciado-marino',
    nombre: 'Terciado marino',
    espesorMm: 15,
    ubicacion: 'exterior',
    nivelCosto: 2,
    recomendado: true,
    resumen: 'Encolado fenolico. Es lo que permite sacar el panel afuera.',
    detalle:
      'El salto desde el terciado estandar es pequeno en el total de la cotizacion, porque en ' +
      'una celosia el grueso del costo es el mecanizado y no la plancha. Si el panel va a ' +
      'exterior, esta es la eleccion evidente.',
  },
  {
    slug: 'mdf',
    nombre: 'MDF',
    espesorMm: 15,
    ubicacion: 'interior',
    nivelCosto: 1,
    resumen: 'Superficie sin veta, la mejor base para pintar a color.',
    detalle:
      'No tiene veta ni nudos, asi que la pintura queda pareja y el color sale exacto. Es la ' +
      'opcion cuando el panel debe integrarse a una paleta ya definida. Solo interior seco: ' +
      'ante humedad se hincha y no vuelve atras.',
  },
  {
    slug: 'hdpe',
    nombre: 'HDPE',
    espesorMm: 15,
    ubicacion: 'exterior',
    nivelCosto: 3,
    resumen: 'Polietileno de alta densidad. Cero mantencion a la intemperie.',
    detalle:
      'No absorbe agua, no se delamina y no pide barniz nunca. Es lo indicado en fachada, ' +
      'piscinas y cualquier punto de dificil acceso para mantener. Se trabaja en negro y ' +
      'entrega un canto mate muy limpio.',
  },
  {
    slug: 'hpl',
    nombre: 'HPL',
    espesorMm: 12,
    ubicacion: 'exterior',
    nivelCosto: 4,
    resumen: 'Laminado compacto de alta presion. El de mayor resistencia del catalogo.',
    detalle:
      'Maxima estabilidad dimensional y resistencia al rayado, al impacto y al sol. Es el ' +
      'material de fachada ventilada cuando el proyecto exige documentacion tecnica y una ' +
      'vida util larga sin intervencion.',
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
    detalle: 'Aceite penetrante que realza la veta y deja tacto de madera, no de plastico.',
  },
  {
    nombre: 'Barnizado',
    detalle: 'Capa de proteccion sobre la veta. Con filtro UV si el panel recibe sol directo.',
  },
  {
    nombre: 'Pintado',
    detalle: 'Color a eleccion, incluido color de muestra. Rinde mejor sobre MDF.',
  },
];

/* ------------------------------ navegacion ----------------------------- */

export const NAVEGACION = [
  { href: '/disenos', texto: 'Disenos' },
  { href: '/aplicaciones', texto: 'Aplicaciones' },
  { href: '/materiales', texto: 'Materiales' },
  { href: '/el-oficio', texto: 'El oficio' },
];
