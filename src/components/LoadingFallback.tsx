import React from 'react';

interface LoadingFallbackProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingFallback: React.FC<LoadingFallbackProps> = ({ 
  message = "Cargando...", 
  fullScreen = true 
}) => {
  const containerClass = fullScreen 
    ? "min-h-screen flex items-center justify-center bg-white" 
    : "flex items-center justify-center p-8";

  return (
    <div className={containerClass}>
      <div className="text-center">
        {/* Animated logo/spinner */}
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-reinbou-coral/20 border-t-reinbou-coral rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-reinbou-coral/10 rounded-full"></div>
          </div>
        </div>

        {/* Loading text */}
        <h2 className="text-2xl font-display font-semibold text-reinbou-navy mb-2">
          Reinbou
        </h2>
        <p className="text-gray-600 animate-pulse">
          {message}
        </p>

        {/* Progress dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-reinbou-coral rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-reinbou-coral rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-reinbou-coral rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingFallback;