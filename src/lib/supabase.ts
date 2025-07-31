import { createClient } from '@supabase/supabase-js';
import { ImageValidator } from '../utils/imageValidator';

// ===== 1. DATABASE CONNECTION CONFIGURATION =====

// Environment variables validation
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Connection validation
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Required: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
  throw new Error('Supabase configuration is incomplete');
}

// Validate URL format
try {
  new URL(supabaseUrl);
} catch (error) {
  console.error('❌ Invalid Supabase URL format:', supabaseUrl);
  throw new Error('Invalid Supabase URL configuration');
}

// ===== 2. SUPABASE CLIENT INITIALIZATION =====

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  global: {
    headers: {
      'X-Client-Info': 'reinbou-creative-agency'
    }
  }
});

// ===== 3. CONNECTION TESTING FUNCTIONS =====

export async function testDatabaseConnection(): Promise<{
  success: boolean;
  message: string;
  details?: any;
}> {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Test basic connectivity
    const { data, error } = await supabase
      .from('proyectos')
      .select('count(*)')
      .limit(1);

    if (error) {
      console.error('❌ Database connection failed:', error);
      return {
        success: false,
        message: `Connection failed: ${error.message}`,
        details: error
      };
    }

    console.log('✅ Database connection successful');
    return {
      success: true,
      message: 'Database connection established successfully',
      details: data
    };
  } catch (error) {
    console.error('❌ Connection test error:', error);
    return {
      success: false,
      message: `Connection test failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      details: error
    };
  }
}

export async function validateDatabaseSchema(): Promise<{
  success: boolean;
  message: string;
  tables?: string[];
}> {
  try {
    console.log('🔍 Validating database schema...');
    
    // Check if proyectos table exists and has expected structure
    const { data, error } = await supabase
      .from('proyectos')
      .select('id, slug, nombre, categoria, imagen_url')
      .limit(1);

    if (error) {
      if (error.code === '42P01') {
        return {
          success: false,
          message: 'Table "proyectos" does not exist'
        };
      }
      return {
        success: false,
        message: `Schema validation failed: ${error.message}`
      };
    }

    console.log('✅ Database schema is valid');
    return {
      success: true,
      message: 'Database schema validated successfully',
      tables: ['proyectos']
    };
  } catch (error) {
    return {
      success: false,
      message: `Schema validation error: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

// ===== 4. PROJECT DATA INTERFACE =====

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

// ===== 5. ROBUST DATA FETCHING FUNCTIONS =====

export async function fetchProjectsWithValidation(): Promise<Proyecto[]> {
  try {
    console.log('🔍 Fetching projects from Supabase...');
    
    // Test connection first
    const connectionTest = await testDatabaseConnection();
    if (!connectionTest.success) {
      throw new Error(`Database connection failed: ${connectionTest.message}`);
    }

    const { data, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('activo', true)
      .order('orden', { ascending: true });

    if (error) {
      console.error('❌ Supabase query error:', error);
      throw new Error(`Database query failed: ${error.message}`);
    }

    if (!data || data.length === 0) {
      console.warn('⚠️ No projects found in database');
      return [];
    }

    console.log(`✅ Found ${data.length} projects in database`);

    // Validate and clean image URLs
    const validatedProjects = data.map((project) => {
      const validatedProject = { ...project };
      
      // Validate main image
      if (project.imagen_url) {
        if (ImageValidator.isValidImageUrl(project.imagen_url)) {
          console.log(`✅ Valid image URL for ${project.nombre}`);
        } else {
          console.warn(`❌ Invalid image URL for ${project.nombre}: ${project.imagen_url}`);
          validatedProject.imagen_url = null;
        }
      }

      // Validate gallery images
      if (project.galeria && Array.isArray(project.galeria)) {
        const validGalleryImages = project.galeria.filter((url: string) => {
          const isValid = ImageValidator.isValidImageUrl(url);
          if (!isValid) {
            console.warn(`❌ Invalid gallery image URL for ${project.nombre}: ${url}`);
          }
          return isValid;
        });
        
        validatedProject.galeria = validGalleryImages;
      }

      return validatedProject;
    });

    // Log validation summary
    const projectsWithImages = validatedProjects.filter(p => p.imagen_url).length;
    const projectsWithoutImages = validatedProjects.length - projectsWithImages;
    
    console.log(`📊 Image validation summary:`);
    console.log(`   ✅ Projects with valid images: ${projectsWithImages}`);
    console.log(`   ⚠️ Projects without images: ${projectsWithoutImages}`);

    return validatedProjects;
  } catch (error) {
    console.error('❌ Error fetching projects:', error);
    throw error;
  }
}

export async function fetchFeaturedProjectsWithValidation(): Promise<Proyecto[]> {
  try {
    console.log('🌟 Fetching featured projects...');
    
    const { data, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('destacado', true)
      .eq('activo', true)
      .order('orden', { ascending: true })
      .limit(6);

    if (error) {
      console.error('❌ Featured projects query error:', error);
      throw new Error(`Featured projects query failed: ${error.message}`);
    }
    
    if (!data || data.length === 0) {
      console.warn('⚠️ No featured projects found');
      return [];
    }

    // Apply same validation as regular projects
    const validatedProjects = data.map(project => {
      const validatedProject = { ...project };
      
      if (project.imagen_url && !ImageValidator.isValidImageUrl(project.imagen_url)) {
        console.warn(`❌ Invalid featured project image: ${project.nombre}`);
        validatedProject.imagen_url = null;
      }
      
      return validatedProject;
    });

    console.log(`✅ Found ${validatedProjects.length} featured projects`);
    return validatedProjects;
  } catch (error) {
    console.error('❌ Error fetching featured projects:', error);
    throw error;
  }
}

export async function fetchProjectBySlug(slug: string): Promise<Proyecto | null> {
  try {
    console.log(`🔍 Fetching project with slug: ${slug}`);
    
    if (!slug || slug.trim() === '') {
      throw new Error('Invalid slug provided');
    }

    const { data, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('slug', slug.trim())
      .eq('activo', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        console.warn(`⚠️ Project not found with slug: ${slug}`);
        return null;
      }
      console.error('❌ Project fetch error:', error);
      throw new Error(`Failed to fetch project: ${error.message}`);
    }

    console.log(`✅ Found project: ${data.nombre}`);
    return data;
  } catch (error) {
    console.error('❌ Error fetching project by slug:', error);
    throw error;
  }
}

// ===== 6. CONNECTION MONITORING =====

export function setupConnectionMonitoring() {
  // Monitor connection status
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth state changed:', event);
    if (event === 'SIGNED_OUT') {
      console.log('User signed out');
    } else if (event === 'SIGNED_IN') {
      console.log('User signed in');
    }
  });

  // Test connection periodically in development
  if (process.env.NODE_ENV === 'development') {
    setInterval(async () => {
      const result = await testDatabaseConnection();
      if (!result.success) {
        console.warn('Periodic connection check failed:', result.message);
      }
    }, 300000); // Every 5 minutes
  }
}

// ===== 7. ERROR RECOVERY FUNCTIONS =====

export async function retryDatabaseOperation<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔄 Database operation attempt ${attempt}/${maxRetries}`);
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('Unknown error');
      console.warn(`❌ Attempt ${attempt} failed:`, lastError.message);
      
      if (attempt < maxRetries) {
        console.log(`⏳ Waiting ${delay}ms before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= 2; // Exponential backoff
      }
    }
  }
  
  throw lastError!;
}

// Initialize connection monitoring
setupConnectionMonitoring();