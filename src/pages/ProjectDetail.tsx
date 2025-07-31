import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Tag, Globe, Github } from 'lucide-react';
import { supabase, Proyecto } from '../lib/supabase';
import OptimizedImage from '../components/OptimizedImage';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Proyecto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (slug && slug.trim() !== '') {
      fetchProject(slug);
    } else {
      setError('Slug de proyecto inválido');
      setLoading(false);
    }
  }, [slug]);

  const fetchProject = async (projectSlug: string) => {
    try {
      setError(null);
      setLoading(true);

      const { data, error } = await supabase
        .from('proyectos')
        .select('*')
        .eq('slug', projectSlug)
        .eq('activo', true)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          setError('Proyecto no encontrado');
          setLoading(false);
        } else {
          throw error;
        }
        return;
      }

      setProject(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching project:', error);
      setError('Error al cargar el proyecto');
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded w-96 mb-6"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state (404 or other errors)
  if (error || !project) {
    return (
      <div className="min-h-screen pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {error === 'Proyecto no encontrado' ? '404 - Proyecto no encontrado' : 'Error'}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {error === 'Proyecto no encontrado' 
                ? 'El proyecto que buscas no existe o ha sido eliminado.'
                : error
              }
            </p>
            <div className="space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="bg-reinbou-coral text-white px-6 py-3 rounded-lg hover:bg-reinbou-navy transition-colors"
              >
                Volver
              </button>
              <Link
                to="/portfolio"
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Ver Portfolio
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-32 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
        >
          <Link to="/" className="hover:text-reinbou-coral transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <Link to="/portfolio" className="hover:text-reinbou-coral transition-colors">
            Portfolio
          </Link>
          <span>/</span>
          <span className="text-reinbou-coral font-medium">{project.nombre}</span>
        </motion.nav>

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-reinbou-navy hover:text-reinbou-coral 
            transition-colors mb-8 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span>Volver</span>
        </motion.button>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-8"
            >
              <div className="flex items-center space-x-4 mb-4">
                <span className="bg-reinbou-coral text-white px-3 py-1 rounded-full text-sm font-medium">
                  {project.tipo || 'Proyecto'}
                </span>
                {project.destacado && (
                  <span className="bg-reinbou-yellow text-reinbou-navy px-3 py-1 rounded-full text-sm font-medium">
                    Destacado
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-reinbou-navy mb-4">
                {project.nombre}
              </h1>
              {project.descripcion && (
                <p className="text-xl text-gray-600 leading-relaxed">
                  {project.descripcion}
                </p>
              )}
            </motion.div>

            {/* Project Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-lg aspect-video">
                <OptimizedImage
                  src={project.imagen_url}
                  alt={project.nombre}
                  className="w-full h-full object-cover"
                  fallbackClassName="w-full h-full"
                  onError={(error) => console.error(`Project detail image error:`, error)}
                />
              </div>
            </motion.div>

            {/* Gallery */}
            {project.galeria && project.galeria.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="text-2xl font-semibold text-reinbou-navy mb-6">Galería</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {project.galeria.map((imageUrl, index) => (
                    <div key={index} className="relative overflow-hidden rounded-xl aspect-video">
                      <OptimizedImage
                        src={imageUrl}
                        alt={`${project.nombre} - Imagen ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        fallbackClassName="w-full h-full"
                        onError={(error) => console.error(`Gallery image error:`, error)}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="sticky top-32 space-y-8"
            >
              {/* Project Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-reinbou-navy mb-6">
                  Información del Proyecto
                </h3>
                <div className="space-y-4">
                  {project.fecha && (
                    <div className="flex items-start space-x-3">
                      <Calendar className="w-5 h-5 text-reinbou-coral mt-0.5" />
                      <div>
                        <p className="font-medium text-reinbou-navy">Fecha</p>
                        <p className="text-gray-600">
                          {new Date(project.fecha).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start space-x-3">
                    <Tag className="w-5 h-5 text-reinbou-coral mt-0.5" />
                    <div>
                      <p className="font-medium text-reinbou-navy">Categoría</p>
                      <p className="text-gray-600 capitalize">
                        {project.categoria?.replace('_', ' ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              {project.tecnologias && project.tecnologias.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-reinbou-navy mb-6">
                    Tecnologías
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tecnologias.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-reinbou-sky/20 text-reinbou-navy px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-reinbou-navy mb-6">
                    Etiquetas
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-reinbou-peach/30 text-reinbou-navy px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Demo Link */}
              {project.url_demo && (
                <div className="bg-gradient-to-br from-reinbou-coral to-reinbou-peach rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-semibold mb-4">Ver Demo</h3>
                  <p className="mb-4 opacity-90">
                    Explora este proyecto en vivo
                  </p>
                  <a
                    href={project.url_demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-white text-reinbou-coral px-4 py-2 
                      rounded-lg font-medium hover:bg-gray-100 transition-colors"
                  >
                    <Globe className="w-5 h-5" />
                    <span>Visitar Sitio</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              {/* Contact CTA */}
              <div className="bg-gradient-to-br from-reinbou-navy to-reinbou-sky rounded-2xl p-6 text-white">
                <h3 className="text-xl font-semibold mb-4">¿Te gusta este proyecto?</h3>
                <p className="mb-4 opacity-90">
                  Hablemos sobre cómo podemos crear algo similar para ti.
                </p>
                <Link
                  to="/contacto"
                  className="inline-block bg-white text-reinbou-navy px-4 py-2 rounded-lg font-medium 
                    hover:bg-gray-100 transition-colors"
                >
                  Contactar
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}