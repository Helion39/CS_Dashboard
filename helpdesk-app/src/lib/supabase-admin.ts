import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy-loaded Supabase admin client (only initializes when first called)
let _supabaseAdminInstance: SupabaseClient | null = null;

export const getSupabaseAdmin = (): SupabaseClient => {
    if (_supabaseAdminInstance) {
        return _supabaseAdminInstance;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        throw new Error(
            'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.'
        );
    }

    _supabaseAdminInstance = createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    });

    return _supabaseAdminInstance;
};

// Export a named constant for backward compatibility
// This will throw at runtime if env vars are missing, not at import time
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
    get(_target, prop) {
        return getSupabaseAdmin()[prop as keyof SupabaseClient];
    },
});
