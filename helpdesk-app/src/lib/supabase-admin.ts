import { createClient } from '@supabase/supabase-js';

// Supabase client for server (with service role key for admin operations)
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);
