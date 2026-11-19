import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import type { Database } from '@/integrations/supabase/types';
import { contentSchema, defaultContent } from './content';

export const getConferenceContent = createServerFn({ method: 'GET' }).handler(async () => {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  const origin = process.env['SUPABASE_URL'];
  if (!key || !origin) throw new Error('Configuration des contenus indisponible.');
  const client = createClient<Database>(origin, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { fetch: (input, init) => {
      const headers = new Headers(init?.headers);
      if (key.startsWith('sb_') && headers.get('Authorization') === `Bearer ${key}`) headers.delete('Authorization');
      headers.set('apikey', key);
      return fetch(input, { ...init, headers });
    } },
  });
  const { data, error } = await client.from('conference_content').select('document').eq('slug', 'lome-2027').maybeSingle();
  if (error) throw new Error('Impossible de charger les informations de la conférence.');
  return data ? contentSchema.parse(data.document) : defaultContent;
});
export const getConferenceAdmin = createServerFn({ method: 'GET' }).middleware([requireSupabaseAuth]).handler(async ({ context }) => {
  const { data, error } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
  if (error || !data) throw new Error('Accès réservé à l’équipe administratrice.');
  const result = await context.supabase.from('conference_content').select('document').eq('slug', 'lome-2027').maybeSingle();
  if (result.error) throw new Error('Impossible de charger les contenus.');
  return result.data ? contentSchema.parse(result.data.document) : defaultContent;
});
export const saveConferenceContent = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator(input => contentSchema.parse(input)).handler(async ({ data, context }) => {
    const { data: admin, error } = await context.supabase.rpc('has_role', { _user_id: context.userId, _role: 'admin' });
    if (error || !admin) throw new Error('Accès réservé à l’équipe administratrice.');
    const result = await context.supabase.from('conference_content').upsert({ slug: 'lome-2027', document: data, updated_at: new Date().toISOString() });
    if (result.error) throw new Error('Enregistrement impossible. Réessayez.');
    return { saved: true };
  });
