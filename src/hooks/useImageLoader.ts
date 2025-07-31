import { useState, useEffect, useCallback } from 'react';
import { ImageValidator } from '../utils/imageValidator';

interface ImageLoadState {
  loading: boolean;
  loaded: boolean;
  error: string | null;
  src: string | null;
}

interface UseImageLoaderOptions {
  fallbackSrc?: string;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}

export function useImageLoader(
  initialSrc: string | null | undefined,
  options: UseImageLoaderOptions = {}
) {
  const {
    fallbackSrc,
    timeout = 10000,
    retryAttempts = 2,
    retryDelay = 1000
  } = options;

  const [state, setState] = useState<ImageLoadState>({
    loading: false,
    loaded: false,
    error: null,
    src: null
  });

  const [currentAttempt, setCurrentAttempt] = useState(0);

  const loadImage = useCallback(async (src: string, attempt: number = 0) => {
    if (!ImageValidator.isValidImageUrl(src)) {
      setState({
        loading: false,
        loaded: false,
        error: `Invalid image URL: ${src}`,
        src: fallbackSrc || null
      });
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      await ImageValidator.preloadImage(src);
      setState({
        loading: false,
        loaded: true,
        error: null,
        src
      });
      setCurrentAttempt(0);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to load image';
      
      if (attempt < retryAttempts) {
        console.log(`🔄 Retrying image load (${attempt + 1}/${retryAttempts}): ${src}`);
        setTimeout(() => {
          setCurrentAttempt(attempt + 1);
          loadImage(src, attempt + 1);
        }, retryDelay);
      } else {
        console.error(`❌ Final attempt failed for image: ${src}`, error);
        setState({
          loading: false,
          loaded: false,
          error: errorMessage,
          src: fallbackSrc || null
        });
        setCurrentAttempt(0);
      }
    }
  }, [fallbackSrc, retryAttempts, retryDelay]);

  const reload = useCallback(() => {
    if (initialSrc) {
      setCurrentAttempt(0);
      loadImage(initialSrc);
    }
  }, [initialSrc, loadImage]);

  useEffect(() => {
    if (initialSrc && initialSrc.trim() !== '') {
      loadImage(initialSrc);
    } else {
      setState({
        loading: false,
        loaded: false,
        error: 'No image URL provided',
        src: fallbackSrc || null
      });
    }
  }, [initialSrc, loadImage, fallbackSrc]);

  return {
    ...state,
    reload,
    isRetrying: currentAttempt > 0
  };
}</parameter>