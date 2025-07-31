// Image URL validation and error handling utilities
export class ImageValidator {
  private static readonly VALID_PROTOCOLS = ['http:', 'https:'];
  private static readonly VALID_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  private static readonly MAX_URL_LENGTH = 2048;

  /**
   * Validates if a URL is a valid image URL
   */
  static isValidImageUrl(url: string | null | undefined): boolean {
    if (!url || typeof url !== 'string' || url.trim() === '') {
      return false;
    }

    try {
      const urlObj = new URL(url);
      
      // Check protocol
      if (!this.VALID_PROTOCOLS.includes(urlObj.protocol)) {
        console.warn(`❌ Invalid protocol: ${urlObj.protocol} for URL: ${url}`);
        return false;
      }

      // Check URL length
      if (url.length > this.MAX_URL_LENGTH) {
        console.warn(`❌ URL too long: ${url.length} characters`);
        return false;
      }

      // Check if it looks like an image URL
      const pathname = urlObj.pathname.toLowerCase();
      const hasValidExtension = this.VALID_EXTENSIONS.some(ext => 
        pathname.endsWith(ext)
      );

      // Allow URLs without extensions if they're from known image services
      const isKnownImageService = this.isKnownImageService(urlObj.hostname);

      if (!hasValidExtension && !isKnownImageService) {
        console.warn(`❌ URL doesn't appear to be an image: ${url}`);
        return false;
      }

      return true;
    } catch (error) {
      console.error(`❌ Invalid URL format: ${url}`, error);
      return false;
    }
  }

  /**
   * Checks if hostname is from a known image service
   */
  private static isKnownImageService(hostname: string): boolean {
    const knownServices = [
      'images.unsplash.com',
      'unsplash.com',
      'images.pexels.com',
      'pexels.com',
      'cdn.pixabay.com',
      'pixabay.com',
      'i.imgur.com',
      'imgur.com',
      'cloudinary.com',
      'amazonaws.com',
      'googleusercontent.com'
    ];

    return knownServices.some(service => 
      hostname.includes(service) || hostname.endsWith(service)
    );
  }

  /**
   * Preloads an image and returns a promise
   */
  static preloadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      if (!this.isValidImageUrl(url)) {
        reject(new Error(`Invalid image URL: ${url}`));
        return;
      }

      const img = new Image();
      
      img.onload = () => {
        console.log(`✅ Image loaded successfully: ${url}`);
        resolve(img);
      };
      
      img.onerror = (error) => {
        console.error(`❌ Failed to load image: ${url}`, error);
        reject(new Error(`Failed to load image: ${url}`));
      };

      // Set timeout for slow loading images
      setTimeout(() => {
        if (!img.complete) {
          console.warn(`⏰ Image loading timeout: ${url}`);
          reject(new Error(`Image loading timeout: ${url}`));
        }
      }, 10000); // 10 second timeout

      img.src = url;
    });
  }

  /**
   * Batch preload multiple images
   */
  static async preloadImages(urls: string[]): Promise<{
    successful: string[];
    failed: { url: string; error: string }[];
  }> {
    const results = await Promise.allSettled(
      urls.map(async (url) => {
        try {
          await this.preloadImage(url);
          return { url, success: true };
        } catch (error) {
          return { 
            url, 
            success: false, 
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      })
    );

    const successful: string[] = [];
    const failed: { url: string; error: string }[] = [];

    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const { url, success, error } = result.value;
        if (success) {
          successful.push(url);
        } else {
          failed.push({ url, error: error || 'Unknown error' });
        }
      } else {
        failed.push({ 
          url: urls[index], 
          error: result.reason?.message || 'Promise rejected'
        });
      }
    });

    return { successful, failed };
  }
}</parameter>