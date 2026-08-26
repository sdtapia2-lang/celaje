/**
 * Recibe el formulario de /cotizar. Corre en el servidor (nunca en el
 * navegador) porque es el unico lugar donde puede vivir la service role
 * key de Supabase: esa key ignora RLS, asi que exponerla en el cliente
 * dejaria la tabla de cotizaciones abierta a cualquiera.
 *
 * Flujo: valida -> filtra spam -> sube el adjunto a Storage -> inserta la
 * fila -> notifica por email. El insert nunca depende del email: si Resend
 * falla, la cotizacion ya quedo guardada y se puede recuperar a mano.
 */
export const prerender = false;

import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { supabaseAdmin } from '../../lib/supabaseAdmin';
import {
  cotizacionSchema,
  ADJUNTO_TIPOS,
  ADJUNTO_MAX_BYTES,
  TIEMPO_MINIMO_LLENADO_SEG,
} from '../../lib/cotizacionSchema';
import { NOMBRE, EMAIL_TALLER } from '../../config/marca';

const json = (cuerpo: unknown, status = 200) =>
  new Response(JSON.stringify(cuerpo), { status, headers: { 'Content-Type': 'application/json' } });

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'Formulario ilegible.' }, 400);
  }

  const crudo = Object.fromEntries(
    [...form.entries()].filter(([, v]) => typeof v === 'string'),
  ) as Record<string, string>;

  const analisis = cotizacionSchema.safeParse(crudo);
  if (!analisis.success) {
    return json({ ok: false, error: 'Datos invalidos.', detalles: analisis.error.issues }, 400);
  }
  const datos = analisis.data;

  // Honeypot: un campo que ningun humano llena porque esta oculto por CSS.
  if (datos.sitioWeb) {
    return json({ ok: true }); // 200 falso para no darle senal al bot.
  }
  // Un envio completado antes de este umbral es casi con certeza un script.
  if (datos.tiempoLlenadoSeg !== undefined && datos.tiempoLlenadoSeg < TIEMPO_MINIMO_LLENADO_SEG) {
    return json({ ok: true });
  }

  // --- Adjunto opcional -------------------------------------------------
  let adjuntoPath: string | null = null;
  const archivo = form.get('adjunto');
  if (archivo instanceof File && archivo.size > 0) {
    if (!ADJUNTO_TIPOS.includes(archivo.type as (typeof ADJUNTO_TIPOS)[number])) {
      return json({ ok: false, error: 'Formato de adjunto no permitido.' }, 400);
    }
    if (archivo.size > ADJUNTO_MAX_BYTES) {
      return json({ ok: false, error: 'El adjunto supera los 10 MB.' }, 400);
    }

    const extension = archivo.name.split('.').pop()?.toLowerCase().replace(/[^a-z0-9]/g, '') || 'bin';
    const nombreArchivo = `${crypto.randomUUID()}.${extension}`;
    const ruta = `${new Date().toISOString().slice(0, 10)}/${nombreArchivo}`;

    const { error: errorSubida } = await supabaseAdmin.storage
      .from('adjuntos-cotizacion')
      .upload(ruta, archivo, { contentType: archivo.type, upsert: false });

    if (errorSubida) {
      return json({ ok: false, error: 'No se pudo subir el adjunto.' }, 502);
    }
    adjuntoPath = ruta;
  }

  // --- Guardar en Supabase ------------------------------------------------
  const { data: fila, error: errorInsert } = await supabaseAdmin
    .from('cotizaciones')
    .insert({
      nombre: datos.nombre,
      email: datos.email,
      telefono: datos.telefono || null,
      tipo_cliente: datos.tipoCliente,
      comuna: datos.comuna || null,
      aplicacion: datos.aplicacion || null,
      alto_cm: datos.altoCm,
      ancho_cm: datos.anchoCm,
      cantidad: datos.cantidad,
      ubicacion: datos.ubicacion,
      patron: datos.patron || null,
      material: datos.material || null,
      terminacion: datos.terminacion || null,
      plazo: datos.plazo || null,
      mensaje: datos.mensaje || null,
      adjunto_path: adjuntoPath,
      origen: datos.origen || null,
      tiempo_llenado_seg: datos.tiempoLlenadoSeg ?? null,
    })
    .select('id')
    .single();

  if (errorInsert) {
    return json({ ok: false, error: 'No se pudo guardar la solicitud.' }, 502);
  }

  // --- Notificar al taller -------------------------------------------------
  // Un fallo aca no debe invalidar el envio: el dato ya esta a salvo en la
  // base. RESEND_API_KEY ausente en desarrollo tampoco debe romper el flujo.
  const resendKey = import.meta.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const resend = new Resend(resendKey);
      let urlAdjunto: string | null = null;
      if (adjuntoPath) {
        const { data: firmada } = await supabaseAdmin.storage
          .from('adjuntos-cotizacion')
          .createSignedUrl(adjuntoPath, 60 * 60 * 24 * 7); // 7 dias
        urlAdjunto = firmada?.signedUrl ?? null;
      }

      await resend.emails.send({
        // onboarding@resend.dev solo sirve para pruebas: antes de lanzar,
        // verificar un dominio propio en resend.com/domains y actualizar esto.
        from: `${NOMBRE} <onboarding@resend.dev>`,
        to: [EMAIL_TALLER],
        replyTo: datos.email,
        subject: `Nueva cotizacion: ${datos.nombre} — ${datos.anchoCm}×${datos.altoCm} cm`,
        html: `
          <h2>Nueva solicitud de cotizacion</h2>
          <p><b>Nombre:</b> ${escapar(datos.nombre)}<br>
             <b>Email:</b> ${escapar(datos.email)}<br>
             <b>Telefono:</b> ${escapar(datos.telefono || '—')}<br>
             <b>Tipo de cliente:</b> ${escapar(datos.tipoCliente)}<br>
             <b>Comuna:</b> ${escapar(datos.comuna || '—')}</p>
          <p><b>Aplicacion:</b> ${escapar(datos.aplicacion || '—')}<br>
             <b>Medidas:</b> ${datos.anchoCm} × ${datos.altoCm} cm &times; ${datos.cantidad}<br>
             <b>Ubicacion:</b> ${escapar(datos.ubicacion)}<br>
             <b>Patron:</b> ${escapar(datos.patron || 'a recomendar')}<br>
             <b>Material:</b> ${escapar(datos.material || 'a recomendar')}<br>
             <b>Terminacion:</b> ${escapar(datos.terminacion || '—')}<br>
             <b>Plazo:</b> ${escapar(datos.plazo || '—')}</p>
          ${datos.mensaje ? `<p><b>Mensaje:</b><br>${escapar(datos.mensaje)}</p>` : ''}
          ${urlAdjunto ? `<p><a href="${urlAdjunto}">Ver adjunto</a> (enlace valido 7 dias)</p>` : ''}
          <p style="color:#888;font-size:12px">ID interno: ${fila.id}</p>
        `,
      });
    } catch {
      // Se ignora a proposito: la cotizacion ya esta guardada en Supabase.
    }
  }

  return json({ ok: true, id: fila.id });
};

function escapar(texto: string) {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
