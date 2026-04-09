import { useState, useEffect } from 'react';
import { categoryService } from '../services/categoryService';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

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

interface Category {
  id: string | number;
  name: string;
  slug: string;
  [key: string]: any;
}

interface UseCategoriesReturn {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

interface UseCategoryReturn {
  category: Category | null;
  loading: boolean;
  error: string | null;
}

export const useCategories = (): UseCategoriesReturn => {
  const { data, loading, error } = useAsync(() => categoryService.getAll(), []);
  return { categories: data ?? [], loading, error };
};

export const useCategory = (slug: string | undefined): UseCategoryReturn => {
  const { data, loading, error } = useAsync(
    () => slug ? categoryService.getBySlug(slug) : Promise.resolve(null),
    [slug]
  );
  return { category: data, loading, error };
};
