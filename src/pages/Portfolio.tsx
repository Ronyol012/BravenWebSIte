import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ArrowUpRight, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase, Proyecto } from '../lib/supabase';
import OptimizedImage from '../components/OptimizedImage';
import { fetchProjectsWithValidation } from '../lib/supabase';

const categories = [
  { key: 'all', label: 'Todos' },
  { key: 'branding', label: 'Branding' },
  { key: 'web', label: 'Diseño Web' },
  { key: 'ecommerce', label: 'E-commerce' },
  { key: 'plantilla', label: 'Plantillas' },
  { key: 'redes_sociales', label: 'Redes Sociales' },
  { key: 'fotografia', label: 'Fotografía' },
  { key: 'landing', label: 'Landing Pages' }
];

export default function Portfolio() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Proyecto[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Proyecto[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log('Portfolio component rendered');

  useEffect(() => {
    console.log('Portfolio useEffect triggered');
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, activeCategory]);

  const fetchProjects = async () => {
  try {
    console.log('Fetching projects...');
    setError(null);
    const validatedProjects = await fetchProjectsWithValidation();

    setProjects(validatedProjects);
    setFilteredProjects(validatedProjects); // ← aquí aplicamos el filtro directo
  } catch (error) {
    console.error('Error fetching projects:', error);
    setError('Error al cargar los proyectos');
  } finally {
    setLoading(false);
  }
};


  const filterProjects = () => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.categoria === activeCategory));
    }
  };

  const handleCategoryChange = (category: string) => {
    console.log('Category changed to:', category);
    setActiveCategory(category);
  };

  const handleProjectClick = (project: Proyecto) => {
    // Validate project data before navigation
    if (!project?.slug || project.slug.trim() === '') {
      console.error('Project missing slug:', project?.nombre || 'Unknown project');
      return;
    }

    // Navigate using React Router - this ensures proper SPA behavior
    navigate(`/proyecto/${project.slug}`, { 
      // React Router v7 compatible options
      replace: false,
      state: { projectName: project.nombre }
    });

    // Smooth scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-8">Cargando Portfolio...</h1>
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-8"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-2xl h-80"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">{error}</h3>
            <button 
              onClick={fetchProjects}
              className="bg-reinbou-coral text-white px-6 py-2 rounded-lg hover:bg-reinbou-navy transition-colors"
            >
              Reintentar
            </button>
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-reinbou-navy mb-6">
            Nuestro Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explora nuestra colección de proyectos creativos y descubre cómo transformamos ideas en realidad.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="w-5 h-5 text-reinbou-navy" />
            <span className="text-reinbou-navy font-medium">Filtrar por:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.key}
                onClick={() => handleCategoryChange(category.key)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.key
                    ? 'bg-reinbou-coral text-white shadow-lg'
                    : 'bg-white text-reinbou-navy border border-reinbou-navy/20 hover:border-reinbou-coral hover:text-reinbou-coral'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  <div className="relative overflow-hidden aspect-video">
                    <OptimizedImage
                      src={project.imagen_url}
                      alt={project.nombre}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      fallbackClassName="w-full h-full"
                      onError={(error) => console.error(`Image error for ${project.nombre}:`, error)}
                    />
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full 
                      flex items-center justify-center opacity-0 group-hover:opacity-100 
                      transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
                      <ArrowUpRight className="w-5 h-5 text-reinbou-navy" />
                    </div>
                    {project.destacado && (
                      <div className="absolute top-4 left-4 bg-reinbou-coral text-white px-3 py-1 
                        rounded-full text-sm font-medium">
                        Destacado
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-reinbou-coral uppercase tracking-wide">
                        {project.tipo || 'Proyecto'}
                      </span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {categories.find(cat => cat.key === project.categoria)?.label || project.categoria}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-reinbou-navy mb-3">
                      {project.nombre}
                    </h3>
                    {project.descripcion && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {project.descripcion.length > 120 
                          ? `${project.descripcion.substring(0, 120)}...` 
                          : project.descripcion
                        }
                      </p>
                    )}
                    {project.tecnologias && project.tecnologias.length > 0 && (
                      <div className="flex flex-wrap gap-2">
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
                            +{project.tecnologias.length - 3} más
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Filter className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No hay proyectos en esta categoría
              </h3>
              <p className="text-gray-500">
                Prueba seleccionando otra categoría o ve todos los proyectos.
              </p>
              <motion.button
                onClick={() => handleCategoryChange('all')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 bg-reinbou-coral text-white px-6 py-2 rounded-full font-medium
                  hover:bg-reinbou-navy transition-all duration-300"
              >
                Ver Todos
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}