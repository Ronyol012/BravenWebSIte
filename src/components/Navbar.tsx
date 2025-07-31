import { motion } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Contacto', path: '/contacto' }
  ];

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleNavClick = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed w-full z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
            <Link to="/" onClick={handleNavClick}>
              <motion.img
                src="/data/sublogo.svg"
                alt="Reinbou logo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="h-10 w-auto cursor-pointer transition-opacity"
              />
            </Link>


          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  onClick={handleNavClick}
                  className={`font-medium transition-colors hover:text-reinbou-coral relative focus:outline-none focus:ring-2 focus:ring-reinbou-coral rounded px-2 py-1 ${
                    location.pathname === item.path
                      ? 'text-reinbou-coral'
                      : 'text-reinbou-navy'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-reinbou-coral"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-reinbou-navy hover:text-reinbou-coral transition-colors p-2 focus:outline-none focus:ring-2 focus:ring-reinbou-coral rounded"
              type="button"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100"
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={handleNavClick}
                className={`block font-medium transition-colors hover:text-reinbou-coral py-2 focus:outline-none focus:ring-2 focus:ring-reinbou-coral rounded px-2 ${
                  location.pathname === item.path
                    ? 'text-reinbou-coral border-l-4 border-reinbou-coral pl-4'
                    : 'text-reinbou-navy'
                }`}
              >
                {item.name}
              </Link> 
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}