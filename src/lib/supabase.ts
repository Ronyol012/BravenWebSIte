import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Proyecto {
  id: string;
  slug: string;
  nombre: string;
  tipo: string;
  categoria: string;
  descripcion?: string;
  url_demo?: string;
  imagen_url?: string;
  galeria?: string[];
  tecnologias?: string[];
  tags?: string[];
  destacado?: boolean;
  activo?: boolean;
  orden?: number;
  fecha?: string;
}