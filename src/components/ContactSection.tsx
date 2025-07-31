import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hola! Me interesa conocer más sobre los servicios de Reinbou.');
    window.open(`https://wa.me/5215512345678?text=${message}`, '_blank');
  };

  return (
    <section ref={ref} className="py-32 bg-gradient-to-br from-reinbou-sky/20 to-reinbou-peach/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-reinbou-navy mb-6">
            Hablemos de tu Proyecto
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¿Tienes una idea? Nos encantaría escucharla y ayudarte a hacerla realidad.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6" data-netlify="true">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-reinbou-navy mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 
                    focus:ring-reinbou-coral focus:border-transparent transition-all duration-300"
                  placeholder="Tu nombre"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-reinbou-navy mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 
                    focus:ring-reinbou-coral focus:border-transparent transition-all duration-300"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-reinbou-navy mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 
                    focus:ring-reinbou-coral focus:border-transparent transition-all duration-300"
                  placeholder="Cuéntanos sobre tu proyecto..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-reinbou-coral text-white px-8 py-4 rounded-lg font-medium
                  hover:bg-reinbou-navy transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Send className="w-5 h-5" />
                <span>Enviar Mensaje</span>
              </motion.button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold text-reinbou-navy mb-4">
                ¿Prefieres WhatsApp?
              </h3>
              <p className="text-gray-600 mb-6">
                Contáctanos directamente por WhatsApp para una respuesta más rápida.
              </p>
              <motion.button
                onClick={handleWhatsApp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium
                  hover:bg-green-600 transition-all duration-300 flex items-center space-x-2"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Escribir por WhatsApp</span>
              </motion.button>
            </div>

            <div className="bg-gradient-to-br from-reinbou-yellow/20 to-reinbou-peach/20 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-reinbou-navy mb-4">
                ¿Qué incluye nuestro proceso?
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-reinbou-coral rounded-full mt-2 flex-shrink-0" />
                  <span>Consulta inicial gratuita</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-reinbou-coral rounded-full mt-2 flex-shrink-0" />
                  <span>Propuesta personalizada</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-reinbou-coral rounded-full mt-2 flex-shrink-0" />
                  <span>Desarrollo colaborativo</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-reinbou-coral rounded-full mt-2 flex-shrink-0" />
                  <span>Soporte post-entrega</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}