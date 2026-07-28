/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DatabaseProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'editor' | 'reviewer' | 'author' | 'patient';
  crp_registration?: string;
  bio?: string;
  avatar_url?: string;
  phone?: string;
  two_factor_enabled: boolean;
  created_at: string;
}

export async function getCurrentUserProfile(): Promise<DatabaseProfile | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) {
    console.warn('Profile fetch warning (using fallback offline mode):', error.message);
    return {
      id: user.id,
      email: user.email || 'paciente@menteclinica.com.br',
      full_name: user.user_metadata?.full_name || 'Carlos Eduardo Silva',
      role: 'patient',
      two_factor_enabled: false,
      created_at: new Date().toISOString(),
    };
  }

  return data;
}
