import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useScrollAnimation } from './useScrollAnimation';

describe('useScrollAnimation', () => {
  let observeMock: ReturnType<typeof vi.fn>;
  let unobserveMock: ReturnType<typeof vi.fn>;
  let disconnectMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    observeMock = vi.fn();
    unobserveMock = vi.fn();
    disconnectMock = vi.fn();
    
    vi.stubGlobal('IntersectionObserver', class {
      observe = observeMock;
      unobserve = unobserveMock;
      disconnect = disconnectMock;
      takeRecords = () => [];
      root = null;
      rootMargin = '';
      thresholds = [];
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with isVisible false', () => {
    const { result } = renderHook(() => useScrollAnimation());
    expect(result.current.isVisible).toBe(false);
  });

  it('returns a ref object', () => {
    const { result } = renderHook(() => useScrollAnimation());
    expect(result.current.ref).toBeDefined();
    expect(result.current.ref.current).toBe(null);
  });

  it('accepts custom threshold option', () => {
    const { result } = renderHook(() => useScrollAnimation({ threshold: 0.5 }));
    expect(result.current.isVisible).toBe(false);
  });

  it('accepts custom rootMargin option', () => {
    const { result } = renderHook(() => useScrollAnimation({ rootMargin: '50px' }));
    expect(result.current.isVisible).toBe(false);
  });

  it('accepts root option', () => {
    const root = document.createElement('div');
    const { result } = renderHook(() => useScrollAnimation({ root }));
    expect(result.current.isVisible).toBe(false);
  });
});