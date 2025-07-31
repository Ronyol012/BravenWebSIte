import React, { useState, useCallback } from 'react';
import { ImageIcon, RefreshCw } from 'lucide-react';
import { useImageLoader } from '../hooks/useImageLoader';

interface OptimizedImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  showRetryButton?: boolean;
  onLoad?: () => void;
  onError?: (error: string) => void;
  placeholder?: React.ReactNode;
}

export default function OptimizedImage({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  showRetryButton = true,
  onLoad,
  onError,
  placeholder
}: OptimizedImageProps) {
  const [userRetried, setUserRetried] = useState(false);
  
  const { loading, loaded, error, src: imageSrc, reload, isRetrying } = useImageLoader(src, {
    retryAttempts: 2,
    retryDelay: 1000
  });

  // Notify parent components of load/error events
  React.useEffect(() => {
    if (loaded && onLoad) {
      onLoad();
    }
  }, [loaded, onLoad]);

  React.useEffect(() => {
    if (error && onError) {
      onError(error);
    }
  }, [error, onError]);

  const handleRetry = useCallback(() => {
    setUserRetried(true);
    reload();
  }, [reload]);

  // Loading state
  if (loading || isRetrying) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${fallbackClassName}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-reinbou-coral mx-auto mb-2"></div>
          <p className="text-sm text-gray-500">
            {isRetrying ? 'Reintentando...' : 'Cargando imagen...'}
          </p>
        </div>
      </div>
    );
  }

  // Error state with retry option
  if (error || !imageSrc) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-reinbou-sky/20 to-reinbou-peach/20 ${fallbackClassName}`}>
        <div className="text-center p-4">
          <div className="w-16 h-16 bg-reinbou-coral/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <ImageIcon className="w-8 h-8 text-reinbou-coral" />
          </div>
          <p className="text-sm text-reinbou-navy font-medium mb-2">
            {error?.includes('Invalid') ? 'URL inválida' : 'Error al cargar imagen'}
          </p>
          {showRetryButton && src && (
            <button
              onClick={handleRetry}
              className="inline-flex items-center space-x-2 text-xs bg-reinbou-coral text-white px-3 py-1 rounded-full hover:bg-reinbou-navy transition-colors"
              disabled={isRetrying}
            >
              <RefreshCw className={`w-3 h-3 ${isRetrying ? 'animate-spin' : ''}`} />
              <span>Reintentar</span>
            </button>
          )}
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-2 text-xs text-gray-500">
              <summary className="cursor-pointer">Detalles del error</summary>
              <p className="mt-1 break-all">{error}</p>
              <p className="mt-1 break-all">URL: {src}</p>
            </details>
          )}
        </div>
      </div>
    );
  }

  // Success state - render the image
  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${className} transition-opacity duration-300`}
      loading="lazy"
      onError={(e) => {
        console.error('Image render error:', e);
        // This shouldn't happen since we pre-validate, but just in case
        if (onError) {
          onError('Image failed to render');
        }
      }}
    />
  );
}</parameter>