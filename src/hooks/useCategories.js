import { useState, useEffect } from 'react';
import { categoryService } from '../services/categoryService';

const useAsync = (asyncFn, deps) => {
  const [state, setState] = useState({ data: null, loading: true, error: null });

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
