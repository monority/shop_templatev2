import { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import Lenis from 'lenis';

const LenisContext = createContext<Lenis | null>(null);
export const useLenis = () => useContext(LenisContext);

export const LenisProvider = ({ children }: { children: ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,           // linear interpolation — smoother than duration-based
      smoothWheel: true,
      wheelMultiplier: 1,  // native feel, no over-multiplication
      touchMultiplier: 1,
      syncTouch: false,    // don't intercept touch — avoids mobile stutter
    });

    lenisRef.current = lenis;

    let raf: number;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
};
