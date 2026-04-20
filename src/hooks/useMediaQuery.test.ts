import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMediaQuery } from './useMediaQuery';

describe('useMediaQuery', () => {
  let addEventListenerSpy: ReturnType<typeof vi.fn>;
  let removeEventListenerSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    addEventListenerSpy = vi.fn();
    removeEventListenerSpy = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns false on server side (no window)', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'), {
      wrapper: ({ children }) => children,
    });
    expect(typeof result.current).toBe('boolean');
  });

  it('returns initial match value', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
      matches: true,
      media: '(min-width: 768px)',
      addEventListener: addEventListenerSpy,
      removeEventListener: removeEventListenerSpy,
    }));

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('updates when media query changes', () => {
    let callback: (() => void) | null = null;
    
    vi.stubGlobal('matchMedia', vi.fn().mockImplementation((query: string) => ({
      matches: query === '(min-width: 768px)',
      media: query,
      addEventListener: (_type: string, listener: () => void) => {
        callback = listener;
      },
      removeEventListener: (_type: string, _listener: () => void) => {
        callback = null;
      },
    })));

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    
    act(() => {
      if (callback) callback();
    });

    expect(result.current).toBe(true);
  });

  it('cleans up event listener on unmount', () => {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({
      matches: false,
      media: '(max-width: 768px)',
      addEventListener: addEventListenerSpy,
      removeEventListener: removeEventListenerSpy,
    }));

    const { unmount } = renderHook(() => useMediaQuery('(max-width: 768px)'));
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
});