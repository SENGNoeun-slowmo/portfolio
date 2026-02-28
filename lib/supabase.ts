import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yrokrmxdftsfgbranofs.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseAnonKey) {
  console.warn('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY. Authentication will not work.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
