import { motion } from 'framer-motion';
import { Send, MessageCircle, Mail, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  console.log('Contact component rendered');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({ name: '', email: '', phone: '', company: '', service: '', message: '' });
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Hola! Me interesa conocer más sobre los servicios de Reinbou.');
    window.open(`https://wa.me/5215512345678?text=${message}`, '_blank');
  };

  const services = [
    'Branding',
    'Diseño Web',
    'Plantillas Editables',
    'Diseño para Redes Sociales',
    'Fotografía',
    'Consultoría Creativa'
  ];

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
            Hablemos de tu Proyecto
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            ¿Tienes una idea increíble? Nos encantaría escucharla y ayudarte a hacerla realidad. 
            Contáctanos y comencemos a crear algo extraordinario juntos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-semibold text-reinbou-navy mb-6">
                Cuéntanos sobre tu proyecto
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6" name="contacto-page" netlify>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-reinbou-navy mb-2">
                      Nombre *
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
                      Email *
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
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-reinbou-navy mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 
                        focus:ring-reinbou-coral focus:border-transparent transition-all duration-300"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-reinbou-navy mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 
                        focus:ring-reinbou-coral focus:border-transparent transition-all duration-300"
                      placeholder="Tu empresa"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-reinbou-navy mb-2">
                    Servicio de interés
                  </label>
                  <select
                    id="service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 
                      focus:ring-reinbou-coral focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Selecciona un servicio</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-reinbou-navy mb-2">
                    Mensaje *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 
                      focus:ring-reinbou-coral focus:border-transparent transition-all duration-300"
                    placeholder="Cuéntanos sobre tu proyecto, objetivos, timeline y cualquier detalle que consideres importante..."
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
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* WhatsApp */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl text-white">
              <MessageCircle className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
              <p className="mb-4 opacity-90">
                ¿Prefieres una conversación más directa? Escríbenos por WhatsApp.
              </p>
              <motion.button
                onClick={handleWhatsApp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium
                  hover:bg-gray-100 transition-all duration-300"
              >
                Escribir ahora
              </motion.button>
            </div>

            {/* Contact Details */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold text-reinbou-navy mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-reinbou-coral mt-1" />
                  <div>
                    <p className="font-medium text-reinbou-navy">Email</p>
                    <p className="text-gray-600">hola@reinbou.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-reinbou-coral mt-1" />
                  <div>
                    <p className="font-medium text-reinbou-navy">Teléfono</p>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-reinbou-coral mt-1" />
                  <div>
                    <p className="font-medium text-reinbou-navy">Ubicación</p>
                    <p className="text-gray-600">Ciudad de México, México</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Info */}
            <div className="bg-gradient-to-br from-reinbou-sky/20 to-reinbou-peach/20 p-6 rounded-2xl">
              <h3 className="text-xl font-semibold text-reinbou-navy mb-4">
                Nuestro Proceso
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-reinbou-coral text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    1
                  </div>
                  <span>Consulta inicial gratuita</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-reinbou-coral text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    2
                  </div>
                  <span>Propuesta personalizada</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-reinbou-coral text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    3
                  </div>
                  <span>Desarrollo colaborativo</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-reinbou-coral text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    4
                  </div>
                  <span>Entrega y soporte</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}