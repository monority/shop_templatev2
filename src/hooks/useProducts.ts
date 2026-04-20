import { useState, useEffect, useCallback } from 'react';
import { productService, CategoryFilter } from '../services/productService';
import type { Product } from '../types';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const useAsync = <T,>(asyncFn: () => Promise<T>, deps: unknown[]): AsyncState<T> => {
  const [state, setState] = useState<AsyncState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        const data = await asyncFn();
        if (!cancelled) setState({ data, loading: false, error: null });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        if (!cancelled) setState({ data: null, loading: false, error: errorMessage });
      }
    };

    fetchData();
    return () => { cancelled = true; };
  }, deps);

  return state;
};

interface UseProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
}

interface UseProductReturn {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

interface UseSearchProductsReturn {
  products: Product[];
  loading: boolean;
  error: string | null;
  search: (q: string) => Promise<void>;
}

export const useProducts = (category: CategoryFilter = 'all'): UseProductsReturn => {
  const { data, loading, error } = useAsync(() => productService.getByCategory(category), [category]);
  return { products: data ?? [], loading, error };
};

export const useProduct = (id: number | undefined): UseProductReturn => {
  const { data, loading, error } = useAsync(
    () => id ? productService.getById(id) : Promise.resolve(null),
    [id]
  );
  return { product: data, loading, error };
};

export const useFeaturedProducts = (): UseProductsReturn => {
  const { data, loading, error } = useAsync(() => productService.getFeatured(), []);
  return { products: data ?? [], loading, error };
};

export const useSearchProducts = (query: string): UseSearchProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (q: string) => {
    if (!q) { setProducts([]); return; }
    setLoading(true);
    setError(null);
    try {
      const data = await productService.search(q);
      setProducts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { search(query); }, [query, search]);

  return { products, loading, error, search };
};