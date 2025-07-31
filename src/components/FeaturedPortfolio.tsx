import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase, Proyecto } from '../lib/supabase';
import ImageWithFallback from './ImageWithFallback';
import { useImageCache } from '../hooks/useImageCache';

export default function FeaturedPortfolio() {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [projects, setProjects] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract image URLs for caching
  const imageUrls = projects
    .map(project => project.imagen_url)
    .filter((url): url is string => Boolean(url));
  
  const { loadingStates } = useImageCache(imageUrls);

  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    try {
      setError(null);
      const { data, error } = await supabase
        .from('proyectos')
        .select('*')
        .eq('destacado', true)
        .eq('activo', true)
        .order('orden', { ascending: true })
        .limit(6);

      if (error) throw error;
      
      // Validate image URLs
      const validatedProjects = (data || []).map(project => ({
        ...project,
        imagen_url: project.imagen_url && isValidUrl(project.imagen_url) 
          ? project.imagen_url 
          : undefined
      }));
      
      setProjects(validatedProjects);
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      setError('Error al cargar los proyectos destacados');
    } finally {
      setLoading(false);
    }
  };

  const isValidUrl = (string: string): boolean => {
    try {
      const url = new URL(string);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const handleProjectClick = (project: Proyecto) => {
    // Validate project data before navigation
    if (!project?.slug || project.slug.trim() === '') {
      console.error('Featured project missing slug:', project?.nombre || 'Unknown project');
      return;
    }

    // Navigate using React Router - ensures proper SPA behavior
    navigate(`/proyecto/${project.slug}`, {
      // React Router v7 compatible options
      replace: false,
      state: { projectName: project.nombre, fromFeatured: true }
    });

    // Smooth scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  if (loading) {
    return (
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">{error}</h3>
            <button 
              onClick={fetchFeaturedProjects}
              className="bg-reinbou-coral text-white px-6 py-2 rounded-lg hover:bg-reinbou-navy transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-reinbou-navy mb-6">
            Portfolio Destacado
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Algunos de nuestros proyectos más representativos
          </p>
        </motion.div>

        {projects.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl 
                    transition-all duration-300 transform hover:-translate-y-2 cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-reinbou-coral"
                    role="button"
                    tabIndex={0}
                    data-react-router="true"
                    aria-label={`Ver detalles del proyecto ${project.nombre}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleProjectClick(project);
                      }
                    }}
                  >
                    <div className="relative overflow-hidden aspect-video bg-gray-100">
                      {project.imagen_url ? (
                        <img
                          src={project.imagen_url}
                          alt={project.nombre}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                                <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-reinbou-sky/20 to-reinbou-peach/20">
                                  <div class="text-center">
                                    <div class="w-16 h-16 bg-reinbou-coral/20 rounded-full flex items-center justify-center mx-auto mb-2">
                                      <svg class="w-8 h-8 text-reinbou-coral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              `;
                            }
                          }}
                        />
                      ) : (
                        <ImageWithFallback
                          src={project.imagen_url}
                          alt={project.nombre}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          fallbackClassName="w-full h-full"
                        />
                      )}
                      <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full 
                        flex items-center justify-center opacity-0 group-hover:opacity-100 
                        transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                        <ArrowUpRight className="w-5 h-5 text-reinbou-navy" />
                      </div>
                    </div>
                    <div className="p-6">
                      <span className="text-sm font-medium text-reinbou-coral uppercase tracking-wide">
                        {project.tipo || 'Proyecto'}
                      </span>
                      <h3 className="text-xl font-semibold text-reinbou-navy mt-2 mb-3">
                        {project.nombre}
                      </h3>
                      {project.descripcion && (
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {project.descripcion.length > 120 
                            ? `${project.descripcion.substring(0, 120)}...`
                            : project.descripcion
                          }
                        </p>
                      )}
                      {project.tecnologias && project.tecnologias.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {project.tecnologias.slice(0, 3).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="text-xs bg-reinbou-sky/20 text-reinbou-navy px-2 py-1 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.tecnologias.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{project.tecnologias.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-transparent border-2 border-reinbou-coral text-reinbou-coral 
                    px-8 py-4 rounded-full font-medium hover:bg-reinbou-coral hover:text-white 
                    transition-all duration-300"
                >
                  <span className="flex items-center space-x-2">
                    <span>Ver Todo el Portfolio</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No hay proyectos destacados disponibles.</p>
          </div>
        )}
      </div>
    </section>
  );
}