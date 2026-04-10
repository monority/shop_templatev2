import { useRef, useEffect, useCallback, memo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const WATCH_IMAGE  = 'https://cdn.dummyjson.com/product-images/mens-watches/rolex-cellini-date-black-dial/1.webp';
const FALLBACK_IMG = 'https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/1.webp';

const TICKER = ['NEW ARRIVALS', 'FREE SHIPPING OVER $200', 'LUXURY TIMEPIECES', 'EXCLUSIVE DROPS', 'LIMITED EDITIONS', 'AUTHENTICATED'];

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };
const fadeUp  = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] } } };

// ── Animated background canvas ────────────────────────────────────────────────
const HeroBg = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let raf: number;
    let w = 0, h = 0;

    // Fewer orbs = less GPU work
    const orbs = Array.from({ length: 3 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 250 + Math.random() * 250,
      vx: (Math.random() - 0.5) * 0.00025,
      vy: (Math.random() - 0.5) * 0.00025,
      opacity: 0.035 + Math.random() * 0.03,
    }));

    const resize = () => {
      w = canvas.width  = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    let frame = 0;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      frame++;
      // Only redraw every 2 frames (30fps) — imperceptible, halves GPU load
      if (frame % 2 !== 0) return;

      ctx.clearRect(0, 0, w, h);

      // Grid — draw once every 10 frames since it never changes
      if (frame % 10 === 0 || frame <= 2) {
        ctx.strokeStyle = 'rgba(255,255,255,0.022)';
        ctx.lineWidth = 0.5;
        const step = 90;
        for (let x = 0; x < w; x += step) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
        }
        for (let y = 0; y < h; y += step) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
        }
      }

      orbs.forEach((o) => {
        o.x += o.vx; o.y += o.vy;
        if (o.x < 0 || o.x > 1) o.vx *= -1;
        if (o.y < 0 || o.y > 1) o.vy *= -1;
        const grd = ctx.createRadialGradient(o.x * w, o.y * h, 0, o.x * w, o.y * h, o.r);
        grd.addColorStop(0, `rgba(255,255,255,${o.opacity})`);
        grd.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(o.x * w, o.y * h, o.r, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    resize();
    // Start on idle to not block initial paint
    const start = () => { raf = requestAnimationFrame(draw); };
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(start, { timeout: 500 });
    } else {
      setTimeout(start, 100);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
});
HeroBg.displayName = 'HeroBg';

// ── Mouse parallax watch image ────────────────────────────────────────────────
const ParallaxWatch = memo(({ onError }: { onError: (e: any) => void }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });
  const rotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [6, -6]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const { innerWidth: W, innerHeight: H } = window;
    mouseX.set((e.clientX / W - 0.5));
    mouseY.set((e.clientY / H - 0.5));
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <motion.div
      className="relative z-10 w-full max-w-[460px] lg:max-w-none lg:w-[82%]"
      style={{ rotateY, rotateX, transformPerspective: 1200 }}
      initial={{ opacity: 0, y: 70, rotate: -14 }}
      animate={{ opacity: 1, y: 0, rotate: -5 }}
      transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
    >
      {/* Glow under watch */}
      <div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-24 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.12) 0%, transparent 70%)', filter: 'blur(20px)' }}
        aria-hidden="true"
      />
      <img
        src={WATCH_IMAGE}
        alt="Luxury watch — HORLOGÉ 2026 collection"
        className="w-full object-contain"
        style={{ filter: 'drop-shadow(0 50px 100px rgba(0,0,0,0.95)) drop-shadow(0 0 40px rgba(255,255,255,0.04))' }}
        loading="eager"
        fetchpriority="high"
        onError={onError}
      />
    </motion.div>
  );
});
ParallaxWatch.displayName = 'ParallaxWatch';

// ── Hero ──────────────────────────────────────────────────────────────────────
interface HeroProps {
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

const Hero = memo(({ onPrimaryClick, onSecondaryClick }: HeroProps) => {
  const handleImgError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    if (e.currentTarget.src !== FALLBACK_IMG) e.currentTarget.src = FALLBACK_IMG;
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#080808]"
      style={{ minHeight: '100svh' }}
      aria-labelledby="hero-title"
    >
      {/* Animated canvas background */}
      <HeroBg />

      {/* Vignette edges */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8,8,8,0.8) 100%)'
      }} aria-hidden="true" />

      <div className="relative z-10 grid lg:grid-cols-2 min-h-screen">

        {/* ── LEFT: Copy ─────────────────────────────────────────────────── */}
        <motion.div
          className="flex flex-col justify-between px-6 sm:px-10 lg:px-16 pt-32 pb-10 lg:pt-40 lg:pb-16"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <motion.span
              className="w-6 h-px bg-white/40"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ originX: 0 }}
              aria-hidden="true"
            />
            <span className="text-white/50 text-xs tracking-[0.25em] uppercase font-medium">SS 2026 Collection</span>
          </motion.div>

          {/* Headline */}
          <div className="mt-12 lg:mt-0">
            <motion.h1
              id="hero-title"
              className="text-white leading-[0.88] mb-8"
              style={{ fontFamily: "'DM Serif Display', serif", fontSize: 'clamp(3.2rem, 8vw, 7rem)', letterSpacing: '-0.02em' }}
              variants={fadeUp}
            >
              Time Is The<br />
              <em className="not-italic" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent' }}>
                Statement
              </em>
            </motion.h1>

            <motion.p className="text-white/45 text-base leading-relaxed max-w-sm mb-10" variants={fadeUp}>
              Curated luxury timepieces for those who understand that a watch is never just a watch.
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-5" variants={fadeUp}>
              <motion.button
                onClick={onPrimaryClick}
                className="relative overflow-hidden flex items-center gap-3 bg-white text-black px-7 py-4 text-xs font-bold tracking-[0.2em] uppercase"
                aria-label="Shop the collection"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Shimmer on hover */}
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full"
                  whileHover={{ translateX: '200%' }}
                  transition={{ duration: 0.5 }}
                  aria-hidden="true"
                />
                Shop Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </motion.button>

              <motion.button
                onClick={onSecondaryClick}
                className="text-white/50 text-xs font-medium tracking-[0.2em] uppercase relative"
                whileHover={{ color: 'rgba(255,255,255,1)' }}
              >
                New Arrivals
                <motion.span
                  className="absolute -bottom-0.5 left-0 h-px bg-white/40"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.25 }}
                  aria-hidden="true"
                />
              </motion.button>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className="mt-16 lg:mt-auto pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-4"
            variants={fadeUp}
          >
            {[['500+', 'Brands'], ['12K+', 'Collectors'], ['4.9★', 'Rating']].map(([value, label], i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
              >
                <p className="text-white text-xl font-bold" style={{ fontFamily: "'DM Serif Display', serif" }}>{value}</p>
                <p className="text-white/35 text-[10px] tracking-[0.2em] uppercase mt-0.5">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Watch with parallax ──────────────────────────────────── */}
        <div className="relative flex items-end justify-center overflow-hidden min-h-[50vh] lg:min-h-0">

          {/* Radial spotlight */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 60% 70%, rgba(255,255,255,0.05) 0%, transparent 60%)' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />

          {/* Big ghost text */}
          <motion.span
            className="absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-black select-none pointer-events-none"
            style={{
              fontSize: 'clamp(5rem, 17vw, 15rem)',
              fontFamily: "'DM Serif Display', serif",
              letterSpacing: '-0.04em',
              WebkitTextStroke: '1px rgba(255,255,255,0.04)',
              color: 'transparent',
            }}
            aria-hidden="true"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          >
            TEMPS
          </motion.span>

          {/* Floating info tag */}
          <motion.div
            className="absolute top-10 right-6 lg:top-16 lg:right-10 border border-white/10 px-4 py-2.5 backdrop-blur-sm bg-white/[0.02]"
            aria-hidden="true"
            initial={{ opacity: 0, x: 20, y: -10 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <p className="text-white/40 text-[10px] tracking-[0.2em] uppercase">New Drop</p>
            <p className="text-white text-sm font-semibold mt-0.5" style={{ fontFamily: "'DM Serif Display', serif" }}>Rolex Cellini</p>
          </motion.div>

          {/* Vertical label */}
          <motion.div
            className="absolute top-1/2 left-4 lg:left-8 -translate-y-1/2 flex flex-col items-center gap-2"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 1.2 }}
          >
            <motion.span
              className="w-px bg-white/20"
              initial={{ height: 0 }}
              animate={{ height: 48 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            />
            <span className="text-white/35 text-[10px] tracking-[0.3em] uppercase" style={{ writingMode: 'vertical-rl' }}>Premium</span>
            <motion.span
              className="w-px bg-white/20"
              initial={{ height: 0 }}
              animate={{ height: 48 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            />
          </motion.div>

          <ParallaxWatch onError={handleImgError} />
        </div>
      </div>

      {/* ── Ticker ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-white/[0.06] overflow-hidden py-3 bg-white/[0.015]" aria-hidden="true">
        <motion.div
          className="flex gap-12 whitespace-nowrap will-change-transform"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 24, ease: 'linear', repeat: Infinity }}
        >
          {[...TICKER, ...TICKER].map((item, i) => (
            <span key={i} className="text-white/25 text-[10px] tracking-[0.3em] uppercase font-medium flex items-center gap-12">
              {item}
              <span className="w-1 h-1 rounded-full bg-white/15 inline-block" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';
export { Hero };
export default Hero;
