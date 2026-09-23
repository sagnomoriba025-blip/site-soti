import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Lazy singleton — only instantiate if env vars are present.
// This prevents build-time crashes during static page generation.
let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase;
  if (!supabaseUrl || !supabaseAnonKey) {
    // During build / static pre-rendering, env vars may be absent.
    // We return a no-op client that will be replaced at runtime.
    console.warn(
      '[SoTI] Supabase env vars not found. ' +
      'Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
    );
    // Return a client pointing to a placeholder — calls will fail gracefully at runtime.
    _supabase = createClient('https://placeholder.supabase.co', 'placeholder-key');
    return _supabase;
  }
  _supabase = createClient(supabaseUrl, supabaseAnonKey);
  return _supabase;
}

// Named export for direct use  
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabase() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
