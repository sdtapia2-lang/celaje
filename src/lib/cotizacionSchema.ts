/**
 * Validación del formulario de cotización. Se usa en el endpoint de
 * servidor -- la única validación que importa, porque el navegador puede
 * mandar cualquier cosa sin pasar por el formulario.
 */
import { z } from 'zod';

export const ADJUNTO_TIPOS = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'] as const;
export const ADJUNTO_MAX_BYTES = 10 * 1024 * 1024; // 10 MB, igual al límite del bucket

export const cotizacionSchema = z.object({
  nombre: z.string().trim().min(2, 'Falta el nombre').max(120),
  email: z.email('Email inválido'),
  telefono: z.string().trim().max(40).optional().or(z.literal('')),
  tipoCliente: z.enum(['hogar', 'arquitecto', 'comercio']),
  comuna: z.string().trim().max(80).optional().or(z.literal('')),

  aplicacion: z.string().trim().max(80).optional().or(z.literal('')),
  altoCm: z.coerce.number().positive('El alto debe ser mayor a 0').max(1000),
  anchoCm: z.coerce.number().positive('El ancho debe ser mayor a 0').max(1000),
  cantidad: z.coerce.number().int().positive().max(500).default(1),
  ubicacion: z.enum(['interior', 'exterior']),
  patron: z.string().trim().max(80).optional().or(z.literal('')),
  material: z.string().trim().max(80).optional().or(z.literal('')),
  terminacion: z.string().trim().max(80).optional().or(z.literal('')),
  plazo: z.string().trim().max(80).optional().or(z.literal('')),
  mensaje: z.string().trim().max(2000).optional().or(z.literal('')),

  origen: z.string().trim().max(120).optional().or(z.literal('')),

  // Antispam: honeypot debe llegar vacío; el formulario tarda un mínimo
  // en llenarse a mano, así que un envío en menos de ese tiempo es un bot.
  sitioWeb: z.string().max(0, 'Solicitud rechazada').optional().or(z.literal('')),
  tiempoLlenadoSeg: z.coerce.number().min(0).optional(),
});

export type CotizacionInput = z.infer<typeof cotizacionSchema>;

export const TIEMPO_MINIMO_LLENADO_SEG = 3;
