/**
 * Punto único de verdad de la identidad verbal.
 *
 * Nombre definitivo: CELAJE. Todo el sitio consume estas constantes, así
 * que un cambio futuro de nombre es editar este archivo y nada más.
 */

export const NOMBRE = 'CELAJE';
export const DESCRIPTOR = 'Pantallas decorativas a medida';
export const LOCKUP = `${NOMBRE} · ${DESCRIPTOR}`;

export const DOMINIO = 'celaje.cl';
export const SITIO = `https://${DOMINIO}`;

/** Teléfono en formato internacional sin signos, para los enlaces wa.me */
export const WHATSAPP = '56900000000';
export const EMAIL_TALLER = 'hola@celaje.cl';
export const CIUDAD = 'Santiago';
export const PAIS = 'Chile';

export const TAGLINE = 'Geometría que respira';

export const DESCRIPCION_META =
  'Pantallas decorativas de madera a medida, cortadas en CNC con geometría islámica trazada a mano. ' +
  'Quiebravistas, biombos, fachadas y cielos decorativos para arquitectos, hogares y comercios en Chile.';

/** Mensaje que se abre prellenado al tocar el botón de WhatsApp. */
export const WHATSAPP_MENSAJE =
  `Hola ${NOMBRE}, quiero cotizar una pantalla decorativa a medida.`;

export const whatsappUrl = (mensaje: string = WHATSAPP_MENSAJE) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
