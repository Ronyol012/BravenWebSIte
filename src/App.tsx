import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, useEffect, lazy } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import ProjectDetail from './pages/ProjectDetail';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingFallback from './components/LoadingFallback';

// Lazy load DatabaseTest component for development
const DatabaseTest = lazy(() => import('./pages/DatabaseTest'));

function App() {
  // Scroll to top on route change
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Listen for navigation events
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <div className="bg-white min-h-screen">
          <Navbar />
          <main>
            <Suspense fallback={<LoadingFallback message="Cargando página..." />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/servicios" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/proyecto/:slug" element={<ProjectDetail />} />
                <Route path="/contacto" element={<Contact />} />
                {import.meta.env.DEV && (
                  <Route path="/database-test" element={<DatabaseTest />} />
                )}
                <Route path="*" element={
                  <div className="min-h-screen pt-32 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        404 - Página no encontrada
                      </h1>
                      <p className="text-gray-600 mb-8">
                        La página que buscas no existe.
                      </p>
                      <a 
                        href="/" 
                        className="bg-reinbou-coral text-white px-6 py-3 rounded-lg hover:bg-reinbou-navy transition-colors"
                      >
                        Volver al inicio
                      </a>
                    </div>
                  </div>
                } />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;