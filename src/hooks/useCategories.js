import { useState, useEffect } from 'react';
import { categoryService } from '../services/categoryService';

const useAsync = (asyncFn, deps) => {
  const [state, setState] = useState({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));

    asyncFn()
      .then((data) => { if (!cancelled) setState({ data, loading: false, error: null }); })
      .catch((err) => { if (!cancelled) setState({ data: null, loading: false, error: err.message }); });

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
};

export const useCategories = () => {
  const { data, loading, error } = useAsync(() => categoryService.getAll(), []);
  return { categories: data ?? [], loading, error };
};

export const useCategory = (slug) => {
  const { data, loading, error } = useAsync(
    () => slug ? categoryService.getBySlug(slug) : Promise.resolve(null),
    [slug]
  );
  return { category: data, loading, error };
};
