import { useState, useEffect, useCallback } from 'react';

interface ImageCacheEntry {
  url: string;
  status: 'loading' | 'loaded' | 'error';
  timestamp: number;
}

class ImageCache {
  private cache = new Map<string, ImageCacheEntry>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  preloadImage(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if already in cache and not expired
      const cached = this.cache.get(url);
      if (cached && cached.status === 'loaded' && 
          Date.now() - cached.timestamp < this.CACHE_DURATION) {
        resolve();
        return;
      }

      // Set loading state
      this.cache.set(url, {
        url,
        status: 'loading',
        timestamp: Date.now()
      });

      const img = new Image();
      img.onload = () => {
        this.cache.set(url, {
          url,
          status: 'loaded',
          timestamp: Date.now()
        });
        resolve();
      };
      img.onerror = () => {
        this.cache.set(url, {
          url,
          status: 'error',
          timestamp: Date.now()
        });
        reject(new Error(`Failed to load image: ${url}`));
      };
      img.src = url;
    });
  }

  getStatus(url: string): 'loading' | 'loaded' | 'error' | 'not-cached' {
    const cached = this.cache.get(url);
    if (!cached) return 'not-cached';
    
    // Check if expired
    if (Date.now() - cached.timestamp > this.CACHE_DURATION) {
      this.cache.delete(url);
      return 'not-cached';
    }
    
    return cached.status;
  }

  clearExpired() {
    const now = Date.now();
    for (const [url, entry] of this.cache.entries()) {
      if (now - entry.timestamp > this.CACHE_DURATION) {
        this.cache.delete(url);
      }
    }
  }
}

const imageCache = new ImageCache();

export function useImageCache(urls: string[]) {
  const [loadingStates, setLoadingStates] = useState<Record<string, 'loading' | 'loaded' | 'error'>>({});

  const preloadImages = useCallback(async (imageUrls: string[]) => {
    const validUrls = imageUrls.filter(url => url && url.trim() !== '');
    
    if (validUrls.length === 0) return;

    // Initialize loading states
    const initialStates: Record<string, 'loading' | 'loaded' | 'error'> = {};
    validUrls.forEach(url => {
      const status = imageCache.getStatus(url);
      initialStates[url] = status === 'not-cached' ? 'loading' : status;
    });
    setLoadingStates(initialStates);

    // Preload images that aren't cached
    const preloadPromises = validUrls.map(async (url) => {
      try {
        await imageCache.preloadImage(url);
        setLoadingStates(prev => ({ ...prev, [url]: 'loaded' }));
      } catch (error) {
        console.warn(`Failed to preload image: ${url}`, error);
        setLoadingStates(prev => ({ ...prev, [url]: 'error' }));
      }
    });

    await Promise.allSettled(preloadPromises);
  }, []);

  useEffect(() => {
    if (urls.length > 0) {
      preloadImages(urls);
    }
  }, [urls, preloadImages]);

  // Clean up expired cache entries periodically
  useEffect(() => {
    const interval = setInterval(() => {
      imageCache.clearExpired();
    }, 60000); // Clean every minute

    return () => clearInterval(interval);
  }, []);

  return { loadingStates, preloadImages };
}