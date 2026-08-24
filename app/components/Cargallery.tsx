

// "use client";

// import { useState, useEffect, useRef, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { X, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";

// interface CarGalleryProps {
//   images:      string[];
//   alt:         string;
//   onGetOffer:  () => void;
//   onTestDrive: () => void;
// }

// export default function CarGallery({ images, alt, onGetOffer, onTestDrive }: CarGalleryProps) {
//   const [active, setActive]     = useState(0);
//   const [lightbox, setLightbox] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const thumbnailContainerRef   = useRef<HTMLDivElement>(null);

//   if (!images || !images.length) return null;

//   const handlePrev = useCallback(() => {
//     setActive((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   }, [images.length]);

//   const handleNext = useCallback(() => {
//     setActive((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   }, [images.length]);

//   // Auto-advance slideshow — paused on hover or when lightbox is open
//   useEffect(() => {
//     if (images.length <= 1 || isHovered || lightbox) return;
//     const timer = setInterval(handleNext, 4000);
//     return () => clearInterval(timer);
//   }, [images.length, isHovered, lightbox, handleNext, active]);

//   // ✅ Scroll only the thumbnail STRIP horizontally — never touches window/page scroll.
//   // scrollIntoView() is intentionally NOT used because it walks up the DOM and can
//   // scroll any ancestor element including window, causing unwanted page jumps.
//   useEffect(() => {
//     const container = thumbnailContainerRef.current;
//     if (!container) return;
//     const activeThumb = container.children[active] as HTMLElement;
//     if (!activeThumb) return;

//     // Manually calculate scroll offset to center the active thumb within the strip.
//     // container.scrollTo() only moves this element's internal scroll — not the page.
//     const targetScroll =
//       activeThumb.offsetLeft - container.offsetWidth / 2 + activeThumb.offsetWidth / 2;

//     container.scrollTo({ left: targetScroll, behavior: "smooth" });
//   }, [active]);

//   // Lightbox keyboard navigation + body scroll lock
//   useEffect(() => {
//     if (!lightbox) return;
//     document.body.style.overflow = "hidden";
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === "Escape")     setLightbox(false);
//       if (e.key === "ArrowRight") handleNext();
//       if (e.key === "ArrowLeft")  handlePrev();
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       document.body.style.overflow = "unset";
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [lightbox, handleNext, handlePrev]);

//   return (
//     <section className="bg-[#F7F8FA] w-full py-10 sm:py-16 px-4 sm:px-6 lg:px-8 font-sans">
//       <style dangerouslySetInnerHTML={{ __html: `@keyframes gallery-progress { 0% { width: 0%; } 100% { width: 100%; } }` }} />

//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

//           {/* LEFT — GALLERY */}
//           <div
//             className="lg:col-span-7 xl:col-span-8 flex flex-col gap-5"
//             onMouseEnter={() => setIsHovered(true)}
//             onMouseLeave={() => setIsHovered(false)}
//           >
//             {/* Main image */}
//             <div
//               className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[16/10] bg-white rounded-[24px] overflow-hidden cursor-zoom-in border border-[#E5E7EB] shadow-sm group"
//               onClick={() => setLightbox(true)}
//             >
//               <AnimatePresence>
//                 <motion.div
//                   key={active}
//                   initial={{ opacity: 0, scale: 1.02 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
//                   className="absolute inset-0 flex items-center justify-center p-4 sm:p-8"
//                 >
//                   <motion.img
//                     src={images[active]}
//                     alt={`${alt} — view ${active + 1}`}
//                     animate={{ y: [0, -4, 0] }}
//                     transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//                     className="w-full h-full object-contain"
//                     loading={active === 0 ? "eager" : "lazy"}
//                   />
//                 </motion.div>
//               </AnimatePresence>

//               {images.length > 1 && (
//                 <>
//                   <button
//                     onClick={(e) => { e.stopPropagation(); handlePrev(); }}
//                     aria-label="Previous image"
//                     className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-slate-800 flex items-center justify-center opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md border border-transparent hover:scale-110 hover:text-[#0055A5] hover:border-[#0055A5] z-10"
//                   >
//                     <ChevronLeft size={20} strokeWidth={2.5} />
//                   </button>
//                   <button
//                     onClick={(e) => { e.stopPropagation(); handleNext(); }}
//                     aria-label="Next image"
//                     className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white text-slate-800 flex items-center justify-center opacity-100 lg:opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md border border-transparent hover:scale-110 hover:text-[#0055A5] hover:border-[#0055A5] z-10"
//                   >
//                     <ChevronRight size={20} strokeWidth={2.5} />
//                   </button>
//                 </>
//               )}
//             </div>

//             {/* Progress bar */}
//             {images.length > 1 && (
//               <div className="flex items-center gap-4 px-2">
//                 <span className="text-sm font-semibold text-slate-800 w-5 text-right tracking-wider">
//                   {String(active + 1).padStart(2, "0")}
//                 </span>
//                 <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden relative">
//                   <div
//                     key={active}
//                     className="h-full bg-[#0055A5] rounded-full"
//                     style={{
//                       animation: `gallery-progress 4s linear forwards`,
//                       animationPlayState: isHovered || lightbox ? "paused" : "running",
//                     }}
//                   />
//                 </div>
//                 <span className="text-sm font-medium text-slate-400 w-5 tracking-wider">
//                   {String(images.length).padStart(2, "0")}
//                 </span>
//               </div>
//             )}

//             {/* Thumbnail strip */}
//             {images.length > 1 && (
//               <div
//                 ref={thumbnailContainerRef}
//                 className="flex gap-3 overflow-x-auto pb-4 pt-1 px-1 snap-x"
//                 // ✅ overflow-x: auto on this element means container.scrollTo()
//                 // moves THIS strip only — never the page.
//                 style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
//               >
//                 {images.map((img, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setActive(i)}
//                     aria-label={`View image ${i + 1}`}
//                     className={`flex-shrink-0 relative w-24 h-16 sm:w-28 sm:h-20 rounded-[14px] overflow-hidden border-2 transition-all duration-300 snap-center focus:outline-none ${
//                       i === active
//                         ? "border-[#0055A5] scale-[1.03] shadow-md shadow-[#0055A5]/15 z-10"
//                         : "border-transparent bg-white shadow-sm hover:border-slate-300"
//                     }`}
//                   >
//                     <img
//                       src={img}
//                       alt={`${alt} thumbnail ${i + 1}`}
//                       className="w-full h-full object-cover"
//                       loading="lazy"
//                     />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* RIGHT — INFO + CTAs */}
//           <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center">
//             <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0055A5]/10 border border-[#0055A5]/15 text-[#0055A5] text-[11px] font-bold tracking-widest uppercase mb-6 w-max">
//               <ShieldCheck size={14} strokeWidth={2.5} /> GARUD TATA
//             </div>

//             <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-slate-900 mb-4 leading-tight tracking-tight">
//               {alt || "Tata Motors Premium Vehicle"}
//             </h1>

//             <p className="text-slate-500 text-base sm:text-lg mb-8 leading-relaxed">
//               Explore the latest offers and experience unparalleled comfort, cutting-edge technology, and premium performance.
//             </p>

//             <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 mb-6">
//               {/*
//                 ✅ onGetOffer and onTestDrive MUST only update state in the parent
//                 (e.g. setEnquiryType). They must NOT call scrollIntoView, window.scrollTo,
//                 router.push with a hash, or any other scroll API. Scrolling is 100% user-driven.
//               */}
//               <button
//                 onClick={onGetOffer}
//                 className="flex-1 w-full bg-[#0055A5] hover:bg-[#004080] text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-[#0055A5]/25 hover:shadow-xl hover:-translate-y-0.5 text-center"
//               >
//                 View Offer Details
//               </button>
//               <button
//                 onClick={onTestDrive}
//                 className="flex-1 w-full bg-white hover:bg-slate-50 text-slate-900 border border-[#E5E7EB] px-6 py-4 rounded-xl font-semibold transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-center"
//               >
//                 Book Test Drive
//               </button>
//             </div>

//             <div className="text-sm font-medium text-slate-400 flex items-center gap-2 mt-2">
//               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//               Available at Garud Tata Showroom
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* LIGHTBOX */}
//       <AnimatePresence>
//         {lightbox && (
//           <motion.div
//             className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-4 sm:p-8"
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             transition={{ duration: 0.2 }}
//             onClick={() => setLightbox(false)}
//           >
//             <button
//               onClick={() => setLightbox(false)}
//               aria-label="Close lightbox"
//               className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-50"
//             >
//               <X size={20} strokeWidth={2.5} />
//             </button>

//             {images.length > 1 && (
//               <>
//                 <button
//                   onClick={(e) => { e.stopPropagation(); handlePrev(); }}
//                   className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-50"
//                 >
//                   <ChevronLeft size={24} strokeWidth={2.5} />
//                 </button>
//                 <button
//                   onClick={(e) => { e.stopPropagation(); handleNext(); }}
//                   className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors z-50"
//                 >
//                   <ChevronRight size={24} strokeWidth={2.5} />
//                 </button>
//               </>
//             )}

//             <motion.img
//               key={active}
//               src={images[active]}
//               alt={`${alt} — full screen ${active + 1}`}
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.95 }}
//               transition={{ duration: 0.3, ease: "easeOut" }}
//               className="max-w-full max-h-[85vh] object-contain rounded-xl"
//               onClick={(e) => e.stopPropagation()}
//             />

//             <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 text-white/90 font-semibold tracking-widest text-sm bg-black/40 px-5 py-2 rounded-full backdrop-blur-md">
//               {active + 1} / {images.length}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }
















"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ShieldCheck, Grid } from "lucide-react";

interface CarGalleryProps {
  images: string[];
  alt: string;
  onGetOffer: () => void;
  onTestDrive: () => void;
}

export default function CarGallery({ images, alt, onGetOffer, onTestDrive }: CarGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  if (!images || !images.length) return null;

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const openLightbox = (index: number) => {
    setActive(index);
    setLightbox(true);
  };

  // Lightbox keyboard navigation + body scroll lock
  useEffect(() => {
    if (!lightbox) return;
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
  }, [lightbox, handleNext, handlePrev]);

  // Determine collage layout based on image count
  const displayImages = images.slice(0, 3);
  const remainingCount = images.length - 3;

  return (
    <section className="bg-gray-50 w-full py-12 sm:py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT — INTERACTIVE COLLAGE */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-3 sm:gap-4">
            <div className={`grid gap-3 sm:gap-4 h-[350px] sm:h-[450px] lg:h-[500px] ${
                images.length >= 3 
                  ? "grid-cols-1 sm:grid-cols-3 sm:grid-rows-2" 
                  : images.length === 2 
                  ? "grid-cols-2" 
                  : "grid-cols-1"
              }`}
            >
              {displayImages.map((img, idx) => {
                const isMain = idx === 0;
                const isLastInCollage = idx === 2;
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.15, ease: "easeOut" }}
                    onClick={() => openLightbox(idx)}
                    className={`relative rounded-3xl overflow-hidden cursor-pointer group bg-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-300 ${
                      images.length >= 3 && isMain
                        ? "sm:col-span-2 sm:row-span-2"
                        : images.length >= 3
                        ? "hidden sm:block sm:col-span-1 sm:row-span-1"
                        : ""
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${alt} — view ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading={isMain ? "eager" : "lazy"}
                    />
                    
                    {/* Subtle Hover Overlay */}
                    <div className="absolute inset-0 bg-[#004b8d]/0 group-hover:bg-[#004b8d]/10 transition-colors duration-500 z-10" />

                    {/* View All Overlay on the last image if more exist */}
                    {isLastInCollage && remainingCount > 0 && (
                      <div className="absolute inset-0 bg-gray-900/40 hover:bg-gray-900/60 transition-colors duration-300 z-20 flex flex-col items-center justify-center text-white backdrop-blur-[2px]">
                        <Grid size={28} className="mb-2 opacity-80" />
                        <span className="font-bold text-lg">+{remainingCount} Photos</span>
                        <span className="text-xs font-medium opacity-80 mt-1 uppercase tracking-widest">View Gallery</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
            
            {/* Mobile View Gallery Button (Visible only on mobile if images > 1) */}
            {images.length > 1 && (
              <button 
                onClick={() => openLightbox(0)}
                className="sm:hidden w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-gray-200 text-gray-700 font-bold text-sm shadow-sm active:scale-95 transition-transform"
              >
                <Grid size={16} className="text-[#004b8d]" />
                View Full Gallery ({images.length})
              </button>
            )}
          </div>

          {/* RIGHT — INFO + CTAs */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#004b8d]/10 border border-[#004b8d]/20 text-[#004b8d] text-[10px] font-black tracking-widest uppercase mb-5 w-max shadow-sm">
                <ShieldCheck size={14} strokeWidth={2.5} /> GARUD TATA
              </div>

              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black text-gray-900 mb-4 leading-tight tracking-tight">
                {alt || "Tata Motors Premium Vehicle"}
              </h1>

              <p className="text-gray-500 text-base sm:text-lg mb-8 leading-relaxed font-medium">
                Explore the latest offers and experience unparalleled comfort, cutting-edge technology, and premium performance.
              </p>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3.5 mb-6">
                <button
                  onClick={onGetOffer}
                  className="flex-1 w-full bg-[#004b8d] hover:bg-[#00386b] text-white px-6 py-4 rounded-xl font-black text-sm sm:text-base transition-all duration-300 shadow-lg shadow-[#004b8d]/20 hover:shadow-[#004b8d]/30 hover:-translate-y-0.5 text-center active:scale-[0.98]"
                >
                  View Offer Details
                </button>
                <button
                  onClick={onTestDrive}
                  className="flex-1 w-full bg-white hover:bg-gray-50 text-[#004b8d] border-2 border-[#004b8d] px-6 py-4 rounded-xl font-black text-sm sm:text-base transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-center active:scale-[0.98]"
                >
                  Book Test Drive
                </button>
              </div>

              <div className="text-xs font-bold text-gray-400 flex items-center gap-2 mt-2 uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
                Available at Garud Tata Showroom
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* FULL SCREEN LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/95 backdrop-blur-md p-4 sm:p-8"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightbox(false)}
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-center z-50 bg-gradient-to-b from-gray-900/80 to-transparent">
              <span className="text-white font-bold tracking-widest text-xs sm:text-sm bg-black/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/10">
                {active + 1} / {images.length}
              </span>
              <button
                onClick={() => setLightbox(false)}
                aria-label="Close lightbox"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-[#004b8d] text-white flex items-center justify-center transition-colors border border-white/10"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-[#004b8d] text-white flex items-center justify-center transition-colors z-50 border border-white/10"
                >
                  <ChevronLeft size={28} strokeWidth={2.5} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-[#004b8d] text-white flex items-center justify-center transition-colors z-50 border border-white/10"
                >
                  <ChevronRight size={28} strokeWidth={2.5} />
                </button>
              </>
            )}

            <motion.img
              key={active}
              src={images[active]}
              alt={`${alt} — full screen ${active + 1}`}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}