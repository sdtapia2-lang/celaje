/**
 * Cliente de Supabase con la service role key. Solo se importa desde código
 * de servidor (src/pages/api/*.ts): esta key ignora RLS por completo, así
 * que si llegara al navegador cualquiera podría leer o escribir la tabla
 * de cotizaciones. Nunca prefijar su variable de entorno con PUBLIC_.
 */
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.PUBLIC_SUPABASE_URL;
const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error(
    'Faltan PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY. Configúralas en .env (ver .env.example).',
  );
}

export const supabaseAdmin = createClient(url, serviceRoleKey, {
  auth: { persistSession: false },
});
