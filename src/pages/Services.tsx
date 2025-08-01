import { motion } from 'framer-motion';
import { 
  Palette, 
  Globe, 
  FileText, 
  Share2, 
  Camera, 
  ShoppingCart,
  Lightbulb,
  Users,
  ArrowRight,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// Listado de los servicios, alimenta el bucle
const services = [
  {
    icon: Palette,
    title: 'Branding e Identidad Visual',
    description: 'Creamos marcas que comunican y conectan.',
    features: [
      'Identidad visual básica',
      'Identidad visual completa',
      'Rediseño de marca',
      'Asesoría de marca',
      'Auditoría visual de Instagram', 
    ],
    gradient: 'from-reinbou-coral to-reinbou-peach',
    price: '',
    popular: false
  },
  {
    icon: Globe,
    title: 'Diseño Web y Experiencia Digital',
    description: 'Tu casa digital, diseñada con intención.',
    features: [
      'Landing page profesional',
      'Página web institucional',
      'Web con catálogo visual',
      'Diseño UX/UI profesional'
    ],
    gradient: 'from-reinbou-navy to-reinbou-sky',
    price: '',
    popular: false
  },
  {
    icon: ShoppingCart,
    title: 'Plantillas y Recursos Editables',
    description: 'Herramientas listas para usar y destacar.',
    features: [
      'Pack de plantillas para Instagram (básico y pro)',
      'Plantillas educativas (ebooks, PPT).',
      'Plantillas empresariales (brochures, cotizadores, portafolios)'
    ],
    gradient: 'from-reinbou-yellow to-reinbou-peach',
    price: '',
    popular: false
  },
  {
    icon: FileText,
    title: 'Plantillas Editables',
    description: 'Diseños profesionales y personalizables para que puedas mantener tu marca consistente en todos tus materiales.',
    features: [
      'Plantillas para redes sociales',
      'Presentaciones corporativas',
      'Materiales de marketing',
      'Documentos empresariales',
      'Formatos editables'
    ],
    gradient: 'from-reinbou-sky to-reinbou-coral',
    price: 'Desde $300',
    popular: false
  },
  {
    icon: Share2,
    title: 'Diseño para Redes Sociales',
    description: 'Contenido visual impactante que aumenta tu engagement y fortalece tu presencia en redes sociales.',
    features: [
      'Posts para Instagram/Facebook',
      'Stories animadas',
      'Covers para perfiles',
      'Contenido para LinkedIn',
      'Calendarios de contenido'
    ],
    gradient: 'from-reinbou-peach to-reinbou-yellow',
    price: 'Desde $400',
    popular: false
  },
  {
    icon: Camera,
    title: 'Fotografía Profesional',
    description: 'Sesiones fotográficas profesionales para productos, corporativas y eventos que elevan la imagen de tu marca.',
    features: [
      'Fotografía de producto',
      'Retratos corporativos',
      'Fotografía de eventos',
      'Edición profesional',
      'Entrega en alta resolución'
    ],
    gradient: 'from-reinbou-coral to-reinbou-navy',
    price: 'Desde $600',
    popular: false
  }
];

const additionalServices = [
  {
    icon: Lightbulb,
    title: 'Consultoría Creativa',
    description: 'Asesoramiento estratégico para potenciar tu marca y optimizar tu presencia digital.'
  },
  {
    icon: Users,
    title: 'Capacitación',
    description: 'Entrenamientos personalizados para que tu equipo maneje las herramientas de diseño.'
  }
];

export default function Services() {
  const navigate = useNavigate();

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
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-6xl font-display font-bold text-reinbou-navy mb-6">
            Nuestros Servicios
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Soluciones creativas integrales diseñadas para potenciar tu marca y 
            conectar con tu audiencia de manera auténtica y memorable.
          </p>
        </motion.div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl 
                transition-all duration-300 transform hover:-translate-y-2 h-full
                ${service.popular ? 'ring-2 ring-reinbou-coral' : ''}`}>
                
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-reinbou-coral text-white px-4 py-1 rounded-full text-sm font-medium">
                      Más Popular
                    </span>
                  </div>
                )}

                <div className={`h-2 bg-gradient-to-r ${service.gradient}`} />
                
                <div className="p-8">
                  <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-r ${service.gradient} p-4 
                    transform group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-reinbou-navy mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="font-semibold text-reinbou-navy mb-3">Incluye:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <Check className="w-4 h-4 text-reinbou-coral mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-reinbou-navy">
                      {service.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate('/contacto')}
                      className="bg-reinbou-coral text-white px-4 py-2 rounded-lg font-medium
                        hover:bg-reinbou-navy transition-all duration-300 flex items-center space-x-2"
                    >
                      <span>Cotizar</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-display font-bold text-reinbou-navy text-center mb-12">
            Servicios Adicionales
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                className="bg-gradient-to-br from-reinbou-sky/10 to-reinbou-peach/10 
                  rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-reinbou-coral/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <service.icon className="w-6 h-6 text-reinbou-coral" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-reinbou-navy mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-gradient-to-br from-reinbou-navy to-reinbou-sky rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-display font-bold mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Creamos soluciones personalizadas para cada proyecto. 
            Cuéntanos tu idea y la haremos realidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contacto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-reinbou-navy px-8 py-4 rounded-lg font-medium
                  hover:bg-gray-100 transition-all duration-300"
              >
                Solicitar Cotización
              </motion.button>
            </Link>
            <Link to="/portfolio">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-medium
                  hover:bg-white hover:text-reinbou-navy transition-all duration-300"
              >
                Ver Portfolio
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}