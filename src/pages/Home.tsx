import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import FeaturedPortfolio from '../components/FeaturedPortfolio';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Hero />
      <About />
      <Services />
      <FeaturedPortfolio />
      <ContactSection />
    </motion.div>
  );
}