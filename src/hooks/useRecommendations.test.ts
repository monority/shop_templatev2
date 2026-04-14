import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRecommendations } from './useRecommendations';

const mockProducts = [
  { id: '1', category: 'men', brand: 'rolex', price: 5000 },
  { id: '2', category: 'men', brand: 'omega', price: 4500 },
  { id: '3', category: 'women', brand: 'rolex', price: 3000 },
  { id: '4', category: 'women', brand: 'longines', price: 800 },
  { id: '5', category: 'men', brand: 'seiko', price: 300 },
];

describe('useRecommendations', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('localStorage', {
      getItem: vi.fn(() => null),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });
  });

  it('recommends products from same category', () => {
    const { result } = renderHook(() => useRecommendations(mockProducts, mockProducts[0]));
    
    expect(result.current.recommendations.length).toBeLessThanOrEqual(4);
    expect(result.current.recommendations.some(p => p.category === 'men')).toBe(true);
  });

  it('tracks viewed products', () => {
    const { result } = renderHook(() => useRecommendations(mockProducts, mockProducts[0]));
    
    act(() => {
      result.current.trackView('1');
    });
    
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});