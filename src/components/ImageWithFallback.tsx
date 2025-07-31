import React, { useState, useCallback } from 'react';
import { ImageIcon } from 'lucide-react';

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  onLoad,
  onError
}: ImageWithFallbackProps) {
  const [imageState, setImageState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [imageSrc, setImageSrc] = useState<string | undefined>(src);

  const handleImageLoad = useCallback(() => {
    setImageState('loaded');
    onLoad?.();
  }, [onLoad]);

  const handleImageError = useCallback(() => {
    setImageState('error');
    setImageSrc(undefined);
    onError?.();
  }, [onError]);

  // If no src provided or error occurred, show fallback
  if (!imageSrc || imageState === 'error') {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-reinbou-sky/20 to-reinbou-peach/20 ${fallbackClassName}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-reinbou-coral/20 rounded-full flex items-center justify-center mx-auto mb-2">
            <ImageIcon className="w-8 h-8 text-reinbou-coral" />
          </div>
          <p className="text-sm text-reinbou-navy font-medium">Sin imagen</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {imageState === 'loading' && (
        <div className={`absolute inset-0 flex items-center justify-center bg-gray-100 ${fallbackClassName}`}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-reinbou-coral"></div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        className={`${className} ${imageState === 'loading' ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
      />
    </div>
  );
}