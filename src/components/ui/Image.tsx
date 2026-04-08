import { useState, useEffect, useRef } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const Image = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  placeholder,
  onLoad,
  onError,
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    // Preload image
    const preloadImg = new window.Image();
    preloadImg.onload = () => {
      setIsLoaded(true);
      onLoad?.();
    };
    preloadImg.onerror = () => {
      setError(true);
      onError?.();
    };
    preloadImg.src = src;
  }, [src, onLoad, onError]);

  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={`${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300 ${className}`}
        style={{
          backgroundImage: placeholder ? `url(${placeholder})` : undefined,
          backgroundSize: 'cover',
        }}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
      />
      {error && (
        <div className="bg-slate-200 dark:bg-slate-700 flex items-center justify-center" style={{ width, height }}>
          <span className="text-slate-500">Image not found</span>
        </div>
      )}
    </picture>
  );
};
