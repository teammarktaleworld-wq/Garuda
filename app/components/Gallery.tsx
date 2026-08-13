"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const images = [
  { src: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80", alt: "Showroom exterior", span: "col-span-2 row-span-2" },
  { src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80", alt: "Tata display", span: "" },
  { src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80", alt: "Sierra", span: "" },
  { src: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80", alt: "Harrier", span: "col-span-2" },
  { src: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80", alt: "Safari", span: "" },
  { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", alt: "Punch", span: "" },
];

export default function Gallery() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="gallery" className="bg-[#080B10] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#1E7FE8] text-sm font-semibold uppercase tracking-widest block mb-3"
          >
            Gallery
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-3"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Inside Garud Tata
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15 }}
            className="text-white/40"
          >
            A closer look at our showroom and customer experience.
          </motion.p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[200px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${img.span}`}
              onClick={() => setLightbox(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <ZoomIn size={18} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              onClick={() => setLightbox(null)}
            >
              <X size={20} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={lightbox}
              alt="Gallery"
              className="max-w-4xl w-full max-h-[85vh] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
