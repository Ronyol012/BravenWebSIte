import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contacto', path: '/contacto' }
  ];

  const socialLinks = [
    { icon: Instagram,
     href: 'https://www.instagram.com/reinbourd/',
     label: 'Instagram' },
    { icon: Linkedin,
     href: 'https://www.linkedin.com/company/reinbou-transformamos-marcas-y-potenciamos-su-presencial-digital',
     label: 'Linkedin' }
  ];

  return (
    <footer className="bg-reinbou-navy text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Logo y descripción */}
          <div className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
             
            <div>
               <motion.img
                src="/data/Reinboublanco.svg"
                alt="Reinbou logo blanco"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="h-9 w-auto cursor-pointer transition-opacity"
              />
            </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Agencia creativa especializada en diseño con intención. 
                Transformamos ideas en experiencias visuales memorables.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center
                        hover:bg-reinbou-coral transition-all duration-300"
                      aria-label={social.label}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Enlaces */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-4">Navegación</h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      className="text-gray-300 hover:text-reinbou-coral transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contacto */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-reinbou-coral" />
                  <span className="text-gray-300">reinbourd@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-reinbou-coral" />
                  <span className="text-gray-300">+1 (829) 805-2619</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-gray-400 text-sm"
            >
              © {currentYear} Reinbou. Todos los derechos reservados.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-400 text-sm mt-2 md:mt-0"
            >
              Diseñado con ❤️ por Reinbou
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}
