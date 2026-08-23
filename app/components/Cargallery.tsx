// "use client";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, ChevronLeft, ChevronRight } from "lucide-react";

// interface CarGalleryProps {
//   images: string[];
//   alt: string;
// }

// export default function CarGallery({ images, alt }: CarGalleryProps) {
//   const [active, setActive]     = useState(0);
//   const [lightbox, setLightbox] = useState(false);

//   if (!images.length) return null;

//   const prev = () => setActive(i => (i === 0 ? images.length - 1 : i - 1));
//   const next = () => setActive(i => (i === images.length - 1 ? 0 : i + 1));

//   return (
//     <>
//       <section className="bg-[#0a1425] py-10 sm:py-14 px-5 lg:px-12">
//         <div className="max-w-[1200px] mx-auto">

//           {/* Main image */}
//           <div
//             className="relative aspect-[16/8] bg-[#111d30] rounded-2xl overflow-hidden cursor-zoom-in mb-3 group"
//             onClick={() => setLightbox(true)}
//           >
//             <AnimatePresence mode="wait">
//               <motion.img
//                 key={images[active]}
//                 src={images[active]}
//                 alt={`${alt} — image ${active + 1}`}
//                 initial={{ opacity: 0, scale: 1.02 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0 }}
//                 transition={{ duration: 0.3 }}
//                 className="w-full h-full object-contain"
//                 loading="lazy"
//               />
//             </AnimatePresence>

//             {/* Prev / Next */}
//             {images.length > 1 && (
//               <>
//                 <button
//                   onClick={e => { e.stopPropagation(); prev(); }}
//                   aria-label="Previous image"
//                   className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//                 >
//                   <ChevronLeft size={18} />
//                 </button>
//                 <button
//                   onClick={e => { e.stopPropagation(); next(); }}
//                   aria-label="Next image"
//                   className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
//                 >
//                   <ChevronRight size={18} />
//                 </button>
//               </>
//             )}

//             {/* Counter */}
//             <div className="absolute bottom-3 right-3 bg-black/50 text-white/70 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
//               {active + 1} / {images.length}
//             </div>
//           </div>

//           {/* Thumbnails */}
//           {images.length > 1 && (
//             <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
//               {images.map((img, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setActive(i)}
//                   aria-label={`View image ${i + 1}`}
//                   className={`flex-shrink-0 w-20 h-14 sm:w-28 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${i === active ? "border-[#0055A5] scale-[1.02]" : "border-white/10 hover:border-white/25"}`}
//                 >
//                   {/* eslint-disable-next-line @next/next/no-img-element */}
//                   <img src={img} alt={`${alt} thumbnail ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>
//       </section>

//       {/* Lightbox */}
//       <AnimatePresence>
//         {lightbox && (
//           <motion.div
//             className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 backdrop-blur-sm p-4"
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             onClick={() => setLightbox(false)}
//           >
//             <button
//               onClick={() => setLightbox(false)}
//               aria-label="Close lightbox"
//               className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
//             >
//               <X size={18} />
//             </button>
//             {images.length > 1 && (
//               <>
//                 <button
//                   onClick={e => { e.stopPropagation(); prev(); }}
//                   aria-label="Previous"
//                   className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
//                 >
//                   <ChevronLeft size={22} />
//                 </button>
//                 <button
//                   onClick={e => { e.stopPropagation(); next(); }}
//                   aria-label="Next"
//                   className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
//                 >
//                   <ChevronRight size={22} />
//                 </button>
//               </>
//             )}
//             <motion.img
//               key={images[active]}
//               src={images[active]}
//               alt={`${alt} — lightbox ${active + 1}`}
//               initial={{ opacity: 0, scale: 0.96 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.25 }}
//               className="max-w-full max-h-[88vh] object-contain rounded-xl"
//               onClick={e => e.stopPropagation()}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }












"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";

interface CarGalleryProps {
  images: string[];
  alt: string;
}

export default function CarGallery({ images, alt }: CarGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  // Return early if no images exist to preserve existing behavior
  if (!images || !images.length) return null;

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Autoplay Logic
  useEffect(() => {
    if (images.length <= 1 || isHovered || lightbox) return;
    
    const timer = setInterval(() => {
      handleNext();
    }, 4000);
    
    return () => clearInterval(timer);
  }, [images.length, isHovered, lightbox, handleNext, active]);

  // Auto-scroll thumbnails
  useEffect(() => {
    if (!thumbnailContainerRef.current) return;
    const activeThumb = thumbnailContainerRef.current.children[active] as HTMLElement;
    if (activeThumb) {
      activeThumb.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [active]);

  // Lightbox keyboard navigation & body scroll lock
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setLightbox(false);
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "ArrowLeft") handlePrev();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [lightbox, handleNext, handlePrev]);

  return (
    <section className="bg-[#F7F8FA] w-full py-10 sm:py-16 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Dynamic Keyframes for the Progress Bar */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes gallery-progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `
      }} />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT SIDE — MAIN GALLERY */}
          <div 
            className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Hero Image Container */}
            <div
              className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[16/10] bg-white rounded-[24px] overflow-hidden cursor-zoom-in border border-[#E5E7EB] shadow-sm group"
              onClick={() => setLightbox(true)}
            >
              <AnimatePresence>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute inset-0 flex items-center justify-center p-4 sm:p-8"
                >
                  <motion.img
                    src={images[active]}
                    alt={`${alt} — view ${active + 1}`}
                    animate={{ y: [0, -4, 0] }} // Extremely subtle natural float
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="w-full h-full object-contain"
                    loading={active === 0 ? "eager" : "lazy"}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                    aria-label="Previous image"
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-slate-800 flex items-center justify-center opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md border border-transparent hover:scale-110 hover:text-[#0055A5] hover:border-[#0055A5] z-10 focus:outline-none focus:ring-2 focus:ring-[#0055A5]"
                  >
                    <ChevronLeft size={20} strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                    aria-label="Next image"
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-slate-800 flex items-center justify-center opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md border border-transparent hover:scale-110 hover:text-[#0055A5] hover:border-[#0055A5] z-10 focus:outline-none focus:ring-2 focus:ring-[#0055A5]"
                  >
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </button>
                </>
              )}
            </div>

            {/* Progress Indicator */}
            {images.length > 1 && (
              <div className="flex items-center gap-4 px-2">
                <span className="text-sm font-semibold text-slate-800 w-5 text-right tracking-wider">
                  {String(active + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden relative">
                  <div
                    key={active}
                    className="h-full bg-[#0055A5] rounded-full"
                    style={{
                      animation: `gallery-progress 4s linear forwards`,
                      animationPlayState: isHovered || lightbox ? "paused" : "running",
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-slate-400 w-5 tracking-wider">
                  {String(images.length).padStart(2, "0")}
                </span>
              </div>
            )}

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div
                ref={thumbnailContainerRef}
                className="flex gap-3 overflow-x-auto pb-4 pt-1 px-1 snap-x"
                style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
              >
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`flex-shrink-0 relative w-24 h-16 sm:w-28 sm:h-20 rounded-[14px] overflow-hidden border-2 transition-all duration-300 snap-center focus:outline-none ${
                      i === active
                        ? "border-[#0055A5] scale-[1.03] shadow-md shadow-[#0055A5]/15 z-10"
                        : "border-transparent bg-white shadow-sm hover:border-slate-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${alt} thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE — VEHICLE INFORMATION */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0055A5]/10 border border-[#0055A5]/15 text-[#0055A5] text-[11px] font-bold tracking-widest uppercase mb-6 w-max">
              <ShieldCheck size={14} strokeWidth={2.5} /> GARUD TATA
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
              {alt || "Tata Motors Premium Vehicle"}
            </h1>
            
            <p className="text-slate-500 text-base sm:text-lg mb-8 leading-relaxed">
              Explore the latest offers and experience unparalleled comfort, cutting-edge technology, and premium performance.
            </p>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 mb-6">
              <button className="flex-1 w-full bg-[#0055A5] hover:bg-[#004080] text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-[#0055A5]/25 hover:shadow-xl hover:shadow-[#0055A5]/35 hover:-translate-y-0.5 text-center flex items-center justify-center">
                Get Offer
              </button>
              <button className="flex-1 w-full bg-white hover:bg-slate-50 text-slate-900 border border-[#E5E7EB] px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-center flex items-center justify-center">
                Book Test Drive
              </button>
            </div>

            <div className="text-sm font-medium text-slate-400 flex items-center gap-2 mt-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Available at Garud Tata Showroom
            </div>
          </div>

        </div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightbox(false)}
          >
            <button
              onClick={() => setLightbox(false)}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
            
            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  aria-label="Previous"
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <ChevronLeft size={24} strokeWidth={2.5} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  aria-label="Next"
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-50 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <ChevronRight size={24} strokeWidth={2.5} />
                </button>
              </>
            )}

            <motion.img
              key={active}
              src={images[active]}
              alt={`${alt} — full screen ${active + 1}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />

            <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/90 font-semibold tracking-widest text-sm bg-black/40 px-5 py-2 rounded-full backdrop-blur-md">
              {active + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}