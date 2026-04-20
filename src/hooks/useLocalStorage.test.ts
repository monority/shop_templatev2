import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('returns initial value when no stored value exists', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(null);
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('returns stored value when it exists', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify('stored-value'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('stored-value');
  });

  it('updates stored value when setter is called', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(null);
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    
    act(() => {
      result.current[1]('new-value');
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('test-key', JSON.stringify('new-value'));
    expect(result.current[0]).toBe('new-value');
  });

  it('handles functional update', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(5));
    const { result } = renderHook(() => useLocalStorage('count', 0));

    act(() => {
      result.current[1]((prev: number) => prev + 1);
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('count', JSON.stringify(6));
  });

  it('handles JSON parse errors gracefully', () => {
    vi.mocked(localStorage.getItem).mockReturnValue('invalid-json');
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('handles complex values', () => {
    const complexValue = { name: 'test', items: [1, 2, 3] };
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(complexValue));
    const { result } = renderHook(() => useLocalStorage('complex', {} as any));
    expect(result.current[0]).toEqual(complexValue);
  });
});