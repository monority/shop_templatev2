import { HTMLAttributes, ReactNode } from 'react';

interface SkeletonBaseProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

/**
 * Composant de base — barre de skeleton animée.
 */
const SkeletonBase = ({ className = '', ...props }: SkeletonBaseProps) => (
  <div className={`animate-pulse bg-gray-200 rounded-lg ${className}`} aria-hidden="true" {...props} />
);

interface ProductGridSkeletonProps {
  count?: number;
}

/**
 * Grille de skeletons pour la page Shop / Home.
 */
export const ProductGridSkeleton = ({ count = 8 }: ProductGridSkeletonProps) => (
  <div className="products-grid" role="status" aria-label="Loading products">
    <span className="sr-only">Loading products…</span>
    {[...Array(count)].map((_, i) => <ProductCardSkeleton key={i} />)}
  </div>
);

/**
 * Skeleton d'une ProductCard — même dimensions que la vraie card.
 */
export const ProductCardSkeleton = () => (
  <div className="card overflow-hidden" aria-hidden="true">
    {/* Image */}
    <SkeletonBase className="w-full aspect-square rounded-none" />
    {/* Body */}
    <div className="card-body space-y-3">
      <SkeletonBase className="h-3 w-1/3" />
      <SkeletonBase className="h-4 w-3/4" />
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => <SkeletonBase key={i} className="h-3 w-3 rounded-full" />)}
      </div>
      <SkeletonBase className="h-5 w-1/4" />
    </div>
  </div>
);

interface CategoryGridSkeletonProps {
  count?: number;
}

/**
 * Skeleton d'une CategoryCard.
 */
export const CategoryCardSkeleton = () => (
  <div className="card overflow-hidden" aria-hidden="true">
    <SkeletonBase className="w-full rounded-none" style={{ aspectRatio: '16/10' }} />
  </div>
);

/**
 * Grille de skeletons pour les catégories.
 */
export const CategoryGridSkeleton = ({ count = 4 }: CategoryGridSkeletonProps) => (
  <div className="categories-grid" role="status" aria-label="Loading categories">
    <span className="sr-only">Loading categories…</span>
    {[...Array(count)].map((_, i) => <CategoryCardSkeleton key={i} />)}
  </div>
);

/**
 * Skeleton page produit.
 */
export const ProductDetailSkeleton = () => (
  <div className="container py-12" role="status" aria-label="Loading product">
    <span className="sr-only">Loading product…</span>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <SkeletonBase className="w-full aspect-square" />
        <div className="flex gap-3">
          {[...Array(3)].map((_, i) => <SkeletonBase key={i} className="w-20 h-20" />)}
        </div>
      </div>
      <div className="space-y-4">
        <SkeletonBase className="h-4 w-1/4" />
        <SkeletonBase className="h-8 w-3/4" />
        <SkeletonBase className="h-4 w-1/3" />
        <SkeletonBase className="h-8 w-1/4" />
        <SkeletonBase className="h-20 w-full" />
        <div className="flex gap-2 flex-wrap">
          {[...Array(6)].map((_, i) => <SkeletonBase key={i} className="h-12 w-16" />)}
        </div>
        <SkeletonBase className="h-14 w-full" />
      </div>
    </div>
  </div>
);

export default SkeletonBase;
