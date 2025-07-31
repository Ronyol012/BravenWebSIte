import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Palette, Globe, FileText, Share2 } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Branding',
    description: 'Identidades visuales completas que reflejan la esencia de tu marca y conectan con tu audiencia.',
    gradient: 'from-reinbou-coral to-reinbou-peach',
    delay: 0
  },
  {
    icon: Globe,
    title: 'Diseño Web',
    description: 'Sitios web modernos, responsivos y optimizados que convierten visitantes en clientes.',
    gradient: 'from-reinbou-navy to-reinbou-sky',
    delay: 0.1
  },
  {
    icon: FileText,
    title: 'Plantillas Editables',
    description: 'Diseños profesionales y personalizables para que puedas mantener tu marca consistente.',
    gradient: 'from-reinbou-yellow to-reinbou-peach',
    delay: 0.2
  },
  {
    icon: Share2,
    title: 'Diseño para Redes Sociales',
    description: 'Contenido visual impactante que aumenta tu engagement y fortalece tu presencia digital.',
    gradient: 'from-reinbou-sky to-reinbou-coral',
    delay: 0.3
  }
];

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-reinbou-navy mb-6">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Soluciones creativas integrales para potenciar tu marca
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: service.delay }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 
                transform hover:-translate-y-2 h-full">
                <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-r ${service.gradient} p-4 
                  transform group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-xl font-semibold text-reinbou-navy mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}