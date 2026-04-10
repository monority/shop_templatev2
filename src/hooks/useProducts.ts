import { useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import { productService } from '../services/productService';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook générique pour les états async — évite la duplication.
 */
const useAsync = <T,>(asyncFn: () => Promise<T>, deps: any[]): AsyncState<T> => {
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

interface Product {
  id: string | number;
  name: string;
  brand: string;
  price: number;
  image: string;
  movement?: string;
  [key: string]: any;
}

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

/** Produits par catégorie */
export const useProducts = (category: string = 'all'): UseProductsReturn => {
  const { data, loading, error } = useAsync(() => productService.getByCategory(category), [category]);
  return { products: data ?? [], loading, error };
};

/** Produit unique par ID */
export const useProduct = (id: string | number | undefined): UseProductReturn => {
  const { data, loading, error } = useAsync(
    () => id ? productService.getById(id) : Promise.resolve(null),
    [id]
  );
  return { product: data, loading, error };
};

/** Produits mis en avant */
export const useFeaturedProducts = (): UseProductsReturn => {
  const { data, loading, error } = useAsync(() => productService.getFeatured(), []);
  return { products: data ?? [], loading, error };
};

/** Recherche avec debounce géré côté composant */
export const useSearchProducts = (query: string): UseSearchProductsReturn => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading,  setLoading]  = useState<boolean>(false);
  const [error,    setError]    = useState<string | null>(null);

  const search = useCallback(async (q: string) => {
    if (!q) { setProducts([]); return; }
    setLoading(true);
    setError(null);
    try {
      const data = await productService.search(q);
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { search(query); }, [query, search]);

  return { products, loading, error, search };
};
