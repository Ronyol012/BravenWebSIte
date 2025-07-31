import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Palette, Heart, Target } from 'lucide-react';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-reinbou-navy mb-8">
              Sobre Nosotros
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                En <span className="font-semibold text-reinbou-coral">Reinbou</span>, 
                creemos que cada marca tiene una historia única que contar. Nuestro enfoque 
                va más allá de lo estético: diseñamos con propósito, estrategia e intención.
              </p>
              <p>
                Combinamos creatividad, tecnología y estrategia para crear experiencias 
                visuales que no solo se ven increíbles, sino que también generan resultados 
                tangibles para nuestros clientes.
              </p>
              <p>
                Cada proyecto es una oportunidad de transformar una visión en realidad, 
                conectando marcas con sus audiencias de manera auténtica y memorable.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-reinbou-coral to-reinbou-peach p-8 rounded-2xl text-white"
              >
                <Palette className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Creatividad</h3>
                <p className="text-sm opacity-90">Ideas frescas y originales</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-reinbou-navy to-reinbou-sky p-8 rounded-2xl text-white mt-8"
              >
                <Target className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Estrategia</h3>
                <p className="text-sm opacity-90">Diseño con propósito</p>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-reinbou-yellow to-reinbou-peach p-8 rounded-2xl text-reinbou-navy -mt-4"
              >
                <Heart className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Pasión</h3>
                <p className="text-sm opacity-80">Amor por lo que hacemos</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}