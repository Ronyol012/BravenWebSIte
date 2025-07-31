import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: [0.215, 0.610, 0.355, 1.000],
    },
  }),
};

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-reinbou-sky/20 via-white to-reinbou-peach/30">
      <motion.div 
        className="absolute inset-0 opacity-10"
        initial={{ scale: 1.2, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-reinbou-coral rounded-full blur-3xl opacity-30" />
        <div className="absolute top-40 right-20 w-48 h-48 bg-reinbou-yellow rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-reinbou-sky rounded-full blur-3xl opacity-35" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-4xl">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="overflow-hidden mb-6"
          >
            <h1 className="text-6xl md:text-8xl font-display font-bold text-reinbou-navy leading-tight">
              Diseñamos
              <span className="block text-reinbou-coral">
                con intención
              </span>
            </h1>
          </motion.div>
          
          <motion.p
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl font-light"
          >
            Transformamos ideas en experiencias visuales memorables que conectan 
            con tu audiencia y potencian tu marca.
          </motion.p>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="inline-block">
              <Link to="/servicios">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-reinbou-coral text-white px-8 py-4 rounded-full font-medium
                    hover:bg-reinbou-navy transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center space-x-2">
                    <span>Ver Servicios</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>
            </div>
            <div className="inline-block">
              <Link to="/portfolio">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group bg-transparent border-2 border-reinbou-coral text-reinbou-coral px-8 py-4 rounded-full font-medium
                    hover:bg-reinbou-coral hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center space-x-2">
                    <span>Ver Portfolio</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-reinbou-navy/30 rounded-full p-1">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-2 h-2 bg-reinbou-coral rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}