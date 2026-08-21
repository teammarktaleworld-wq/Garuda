


"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* ── GALLERY IMAGES ─────────────────────────────────────────────────── */
const SLIDES = [
  { src: "/images/gallery/showroom-images-11013.jpg", alt: "Garud Tata showroom floor" },
  { src: "/images/gallery/showroom-images-11014.jpg", alt: "Garud Tata vehicle display" },
  { src: "/images/gallery/showroom-images-11015.jpg", alt: "Garud Tata customer lounge" },
  { src: "/images/gallery/showroom-images-11035.jpg", alt: "Garud Tata service centre" },
];

const INTERVAL_MS = 4000;

/* ── ANIMATED COUNTER ───────────────────────────────────────────────── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount]   = useState(0);
  const ref                 = useRef<HTMLSpanElement>(null);
  const inView              = useInView(ref, { once: true });
  const prefersReduced      = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (prefersReduced) { setCount(target); return; }

    let raf: number;
    const start     = performance.now();
    const duration  = 1800;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, prefersReduced]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── IMAGE SLIDER ───────────────────────────────────────────────────── */
function ShowroomSlider() {
  const [current, setCurrent]   = useState(0);
  const [paused,  setPaused]    = useState(false);
  const prefersReduced          = useReducedMotion();
  const total                   = SLIDES.length;

  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);

  // Auto-advance
  useEffect(() => {
    if (paused || prefersReduced) return;
    const id = setInterval(next, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, prefersReduced, next]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden aspect-[4/3] select-none bg-[#0D1829]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={SLIDES[current].src}
          alt={SLIDES[current].alt}
          loading="lazy"
          decoding="async"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      </AnimatePresence>

      {/* Gradient vignette bottom */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#07111F]/70 to-transparent pointer-events-none" />

      {/* Arrow controls */}
      <button
        onClick={prev}
        aria-label="Previous image"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-black/55 transition-colors duration-150"
      >
        <ChevronLeft size={16} strokeWidth={2.5} />
      </button>
      <button
        onClick={next}
        aria-label="Next image"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm border border-white/15 flex items-center justify-center text-white hover:bg-black/55 transition-colors duration-150"
      >
        <ChevronRight size={16} strokeWidth={2.5} />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-5 h-1.5 bg-white"
                : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Floating badge */}
      <div className="absolute bottom-6 left-5 z-10 flex items-center gap-3 bg-[#07111F]/70 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3">
        <div>
          <p className="text-white font-extrabold text-xl leading-none tracking-tight">
            <Counter target={15} suffix="+" />
          </p>
          <p className="text-white/45 text-[10px] uppercase tracking-[0.16em] font-semibold mt-0.5">
            Years of Trust
          </p>
        </div>
        <div className="w-px h-8 bg-white/10" />
        <div>
          <p className="text-white font-extrabold text-xl leading-none tracking-tight">
            <Counter target={3} suffix="" />
          </p>
          <p className="text-white/45 text-[10px] uppercase tracking-[0.16em] font-semibold mt-0.5">
            Showrooms
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── STAT CARD ──────────────────────────────────────────────────────── */
const STATS = [
  { value: 5000, suffix: "+", label: "Happy Customers" },
  { value: 10000, suffix: "+", label: "Cars Delivered" },
  { value: 100, suffix: "%", label: "Commitment" },
  { value: 3, suffix: "", label: "Delhi Locations" },
];

/* ── MAIN SECTION ───────────────────────────────────────────────────── */
export default function About() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  return (
    <section id="about" className="bg-[#F5F7FA] py-16 sm:py-20 lg:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

          {/* ── LEFT — Slider ── */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: -28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <ShowroomSlider />

            {/* Decorative accent block — bottom-right */}
            <div
              className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-[#0055A5] opacity-[0.12] -z-10"
              aria-hidden="true"
            />
            {/* Top-left accent */}
            <div
              className="absolute -top-4 -left-4 w-20 h-20 rounded-xl border-2 border-[#0055A5]/20 -z-10"
              aria-hidden="true"
            />
          </motion.div>

          {/* ── RIGHT — Copy + Stats ── */}
          <div>
            <motion.span
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.05 }}
              className="inline-block text-[10px] font-bold tracking-[0.26em] text-[#0055A5] uppercase mb-3"
            >
              Our Story
            </motion.span>

            <motion.h2
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#07111F] font-extrabold text-[clamp(1.9rem,6vw,3rem)] tracking-[-0.02em] leading-[1.06] mb-5"
            >
              Built on Trust.<br />
              <span className="text-[#0055A5]">Driven by Tata.</span>
            </motion.h2>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.18 }}
              className="text-gray-500 text-[14.5px] sm:text-[15px] leading-relaxed mb-4 max-w-md"
            >
              Garud Tata is an authorized Tata Motors dealership committed to delivering a
              trusted, premium experience. From your first visit to years of ownership, we
              stand by professional guidance, transparent communication, and genuine
              customer-first service.
            </motion.p>
            <motion.p
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.22 }}
              className="text-gray-400 text-[14px] leading-relaxed mb-10 max-w-md"
            >
              With showrooms in Palam, Narela and Najafgarh, we've been helping Delhi
              families find their perfect Tata for over 15 years.
            </motion.p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.28 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-[#0055A5]/20 transition-all duration-200 overflow-hidden"
                >
                  {/* Hover accent */}
                  <div className="absolute inset-x-0 bottom-0 h-0.5 bg-[#0055A5] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

                  <p className="text-[#0055A5] font-extrabold text-[1.75rem] sm:text-[2rem] leading-none tracking-tight mb-1">
                    <Counter target={s.value} suffix={s.suffix} />
                  </p>
                  <p className="text-[10.5px] text-gray-400 uppercase tracking-[0.16em] font-semibold">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}