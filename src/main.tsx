import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure root element exists
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found!');
  
  // Create root element if missing
  const newRoot = document.createElement('div');
  newRoot.id = 'root';
  document.body.appendChild(newRoot);
} else {
  console.log('Root element found');
}

// Enhanced root creation with error handling
try {
  console.log('Initializing React application...');
  
  const root = createRoot(rootElement!);
  
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  console.log('React application initialized successfully');
  
} catch (error) {
  console.error('Failed to initialize React application:', error);
  
  // Fallback error display
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: system-ui, -apple-system, sans-serif;
        background: #f9fafb;
      ">
        <div style="
          max-width: 400px;
          padding: 2rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          text-align: center;
        ">
          <h1 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; color: #111827;">
            Error de Aplicación
          </h1>
          <p style="color: #6b7280; margin-bottom: 1.5rem;">
            No se pudo cargar la aplicación. Por favor, recarga la página.
          </p>
          <button 
            onclick="window.location.reload()" 
            style="
              background: #EA6969;
              color: white;
              padding: 0.75rem 1.5rem;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-weight: 500;
            "
          >
            Recargar Página
          </button>
        </div>
      </div>
    `;
  }
}