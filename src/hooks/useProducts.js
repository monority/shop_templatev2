import { useState, useEffect, useCallback } from 'react';
import { productService } from '../services/productService';

/**
 * Hook générique pour les états async — évite la duplication.
 */
const useAsync = (asyncFn, deps) => {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));

    asyncFn()
      .then((data)  => { if (!cancelled) setState({ data, loading: false, error: null }); })
      .catch((err)  => { if (!cancelled) setState({ data: null, loading: false, error: err.message }); });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
};

/** Produits par catégorie */
export const useProducts = (category = 'all') => {
  const { data, loading, error } = useAsync(() => productService.getByCategory(category), [category]);
  return { products: data ?? [], loading, error };
};

/** Produit unique par ID */
export const useProduct = (id) => {
  const { data, loading, error } = useAsync(
    () => id ? productService.getById(id) : Promise.resolve(null),
    [id]
  );
  return { product: data, loading, error };
};

/** Produits mis en avant */
export const useFeaturedProducts = () => {
  const { data, loading, error } = useAsync(() => productService.getFeatured(), []);
  return { products: data ?? [], loading, error };
};

/** Recherche avec debounce géré côté composant */
export const useSearchProducts = (query) => {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);

  const search = useCallback(async (q) => {
    if (!q) { setProducts([]); return; }
    setLoading(true);
    setError(null);
    try {
      const data = await productService.search(q);
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { search(query); }, [query, search]);

  return { products, loading, error, search };
};
