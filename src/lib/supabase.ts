import { createClient } from '@supabase/supabase-js';
import { ImageValidator } from '../utils/imageValidator';

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

// Enhanced project fetching with image validation
export async function fetchProjectsWithValidation() {
  try {
    console.log('🔍 Fetching projects from Supabase...');
    
    const { data, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('activo', true)
      .order('orden', { ascending: true });

    if (error) {
      console.error('❌ Supabase error:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.warn('⚠️ No projects found in database');
      return [];
    }

    console.log(`✅ Found ${data.length} projects in database`);

    // Validate and clean image URLs
    const validatedProjects = data.map((project, index) => {
      const validatedProject = { ...project };
      
      // Validate main image
      if (project.imagen_url) {
        if (ImageValidator.isValidImageUrl(project.imagen_url)) {
          console.log(`✅ Valid image URL for ${project.nombre}: ${project.imagen_url}`);
        } else {
          console.warn(`❌ Invalid image URL for ${project.nombre}: ${project.imagen_url}`);
          validatedProject.imagen_url = null;
        }
      } else {
        console.warn(`⚠️ No image URL for project: ${project.nombre}`);
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
        
        if (validGalleryImages.length !== project.galeria.length) {
          console.warn(`⚠️ Removed ${project.galeria.length - validGalleryImages.length} invalid gallery images for ${project.nombre}`);
        }
      }

      return validatedProject;
    });

    // Log summary
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

// Fetch featured projects with validation
export async function fetchFeaturedProjectsWithValidation() {
  try {
    console.log('🌟 Fetching featured projects...');
    
    const { data, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('destacado', true)
      .eq('activo', true)
      .order('orden', { ascending: true })
      .limit(6);

    if (error) throw error;
    
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