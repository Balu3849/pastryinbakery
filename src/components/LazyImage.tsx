import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

export interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * LazyImage component designed to be lazy-loaded via React.lazy and wrapped in Suspense.
 * Features native lazy loading, skeleton placeholder during decoding, smooth fade-in,
 * and graceful fallback if the image fails to load.
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  loading = 'lazy',
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleImageError = () => {
    setHasError(true);
    if (onError) onError();
  };

  if (hasError) {
    return (
      <div 
        className={`w-full h-full bg-[#E8DEC8] flex flex-col items-center justify-center p-3 text-center text-[#786A63] ${className}`}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="w-5 h-5 text-[#A89A92] mb-1" />
        <span className="text-[11px] font-medium line-clamp-1 opacity-80">
          {alt || 'Delight preview'}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Underlying smooth placeholder during image decode */}
      {!isLoaded && (
        <div 
          aria-hidden="true" 
          className="absolute inset-0 bg-[#E8DEC8] animate-pulse" 
        />
      )}
      
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
    </div>
  );
};

export default LazyImage;
