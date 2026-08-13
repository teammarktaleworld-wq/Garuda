// "use client";
// import { useRef, useState } from "react";
// import { motion, useInView, AnimatePresence } from "framer-motion";
// import { X, ZoomIn } from "lucide-react";

// const images = [
//   { src: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80", alt: "Showroom exterior", span: "col-span-2 row-span-2" },
//   { src: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80", alt: "Tata display", span: "" },
//   { src: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80", alt: "Sierra", span: "" },
//   { src: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80", alt: "Harrier", span: "col-span-2" },
//   { src: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80", alt: "Safari", span: "" },
//   { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80", alt: "Punch", span: "" },
// ];

// export default function Gallery() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });
//   const [lightbox, setLightbox] = useState<string | null>(null);

//   return (
//     <section id="gallery" className="bg-[#080B10] py-20 lg:py-28">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div ref={ref} className="text-center mb-12">
//           <motion.span
//             initial={{ opacity: 0 }}
//             animate={inView ? { opacity: 1 } : {}}
//             className="text-[#1E7FE8] text-sm font-semibold uppercase tracking-widest block mb-3"
//           >
//             Gallery
//           </motion.span>
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.1 }}
//             className="text-4xl lg:text-5xl font-bold text-white mb-3"
//             style={{ fontFamily: "'Syne', sans-serif" }}
//           >
//             Inside Garud Tata
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={inView ? { opacity: 1 } : {}}
//             transition={{ delay: 0.15 }}
//             className="text-white/40"
//           >
//             A closer look at our showroom and customer experience.
//           </motion.p>
//         </div>

//         {/* Masonry-style grid */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[200px]">
//           {images.map((img, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={inView ? { opacity: 1, scale: 1 } : {}}
//               transition={{ delay: i * 0.07, duration: 0.5 }}
//               className={`relative overflow-hidden rounded-2xl cursor-pointer group ${img.span}`}
//               onClick={() => setLightbox(img.src)}
//             >
//               <img
//                 src={img.src}
//                 alt={img.alt}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//               />
//               <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                 <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
//                   <ZoomIn size={18} className="text-white" />
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Lightbox */}
//       <AnimatePresence>
//         {lightbox && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
//             onClick={() => setLightbox(null)}
//           >
//             <button
//               className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
//               onClick={() => setLightbox(null)}
//             >
//               <X size={20} />
//             </button>
//             <motion.img
//               initial={{ scale: 0.9 }}
//               animate={{ scale: 1 }}
//               exit={{ scale: 0.9 }}
//               src={lightbox}
//               alt="Gallery"
//               className="max-w-4xl w-full max-h-[85vh] object-contain rounded-2xl"
//               onClick={(e) => e.stopPropagation()}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }














// "use client";
// import { useRef, useState } from "react";
// import { motion, useInView, AnimatePresence } from "framer-motion";
// import { X, ZoomIn } from "lucide-react";

// // Updated with actual Tata Motors vehicles and a premium showroom image
// const images = [
//   { 
//     src: "https://images.unsplash.com/photo-1560200353-ce0a76b1d438?w=800&q=80", 
//     alt: "Garud Tata Premium Showroom Exterior", 
//     span: "col-span-2 row-span-2" 
//   },
//   { 
//     src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Tata_Sierra_EV_Concept_at_Auto_Expo_2023.jpg/800px-Tata_Sierra_EV_Concept_at_Auto_Expo_2023.jpg", 
//     alt: "Tata Sierra Concept Display", 
//     span: "" 
//   },
//   { 
//     src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/2020_Tata_Harrier_XZ_2.0L_front.jpg/800px-2020_Tata_Harrier_XZ_2.0L_front.jpg", 
//     alt: "Tata Harrier SUV", 
//     span: "" 
//   },
//   { 
//     src: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Tata_Curvv_EV_Concept_at_Auto_Expo_2023.jpg/800px-Tata_Curvv_EV_Concept_at_Auto_Expo_2023.jpg", 
//     alt: "Tata Curvv EV Showcase", 
//     span: "col-span-2" 
//   },
//   { 
//     src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/2021_Tata_Safari_XZA%2B_%28front_view%29.png/800px-2021_Tata_Safari_XZA%2B_%28front_view%29.png", 
//     alt: "Tata Safari Flagship SUV", 
//     span: "" 
//   },
//   { 
//     src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Tata_Nexon_EV_at_Auto_Expo_2023.jpg/800px-Tata_Nexon_EV_at_Auto_Expo_2023.jpg", 
//     alt: "Tata Nexon EV", 
//     span: "" 
//   },
// ];

// export default function Gallery() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });
//   const [lightbox, setLightbox] = useState<string | null>(null);

//   return (
//     <section id="gallery" className="bg-[#080B10] py-20 lg:py-28">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div ref={ref} className="text-center mb-12">
//           <motion.span
//             initial={{ opacity: 0 }}
//             animate={inView ? { opacity: 1 } : {}}
//             className="text-[#1E7FE8] text-sm font-semibold uppercase tracking-widest block mb-3"
//           >
//             Gallery
//           </motion.span>
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.1 }}
//             className="text-4xl lg:text-5xl font-bold text-white mb-3"
//             style={{ fontFamily: "'Syne', sans-serif" }}
//           >
//             Inside Garud Tata
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={inView ? { opacity: 1 } : {}}
//             transition={{ delay: 0.15 }}
//             className="text-white/40"
//           >
//             A closer look at our showroom and premium customer experience.
//           </motion.p>
//         </div>

//         {/* Masonry-style grid */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 auto-rows-[200px]">
//           {images.map((img, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={inView ? { opacity: 1, scale: 1 } : {}}
//               transition={{ delay: i * 0.07, duration: 0.5 }}
//               className={`relative overflow-hidden rounded-2xl cursor-pointer group bg-white/5 border border-white/10 ${img.span}`}
//               onClick={() => setLightbox(img.src)}
//             >
//               <img
//                 src={img.src}
//                 alt={img.alt}
//                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//               />
//               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                 <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
//                   <ZoomIn size={18} className="text-white" />
//                 </div>
//               </div>
              
//               {/* Optional: Add a subtle text overlay on hover */}
//               <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
//                 <p className="text-white text-sm font-medium">{img.alt}</p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* Lightbox */}
//       <AnimatePresence>
//         {lightbox && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
//             onClick={() => setLightbox(null)}
//           >
//             <button
//               className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#0055A5] hover:border-[#0055A5] transition-all"
//               onClick={() => setLightbox(null)}
//             >
//               <X size={24} />
//             </button>
//             <motion.img
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: "spring", damping: 25, stiffness: 300 }}
//               src={lightbox}
//               alt="Gallery Preview"
//               className="max-w-5xl w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
//               onClick={(e) => e.stopPropagation()}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </section>
//   );
// }

















"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

// Using your local public vehicle assets for guaranteed 100% working images
const images = [
  { 
    src: "/images/vehicles/sierra.webp", 
    alt: "Tata Sierra Showcase", 
    span: "col-span-2 row-span-2" 
  },
  { 
    src: "/images/vehicles/harrier.webp", 
    alt: "Tata Harrier SUV", 
    span: "" 
  },
  { 
    src: "/images/vehicles/tatasafari.webp", 
    alt: "Tata Safari Flagship SUV", 
    span: "" 
  },
  { 
    src: "/images/vehicles/tatacurvve.webp", 
    alt: "Tata Curvv EV Showcase", 
    span: "col-span-2" 
  },
  { 
    src: "/images/vehicles/tatanexon.webp", 
    alt: "Tata Nexon", 
    span: "" 
  },
  { 
    src: "/images/vehicles/punchtata.webp", 
    alt: "Tata Punch", 
    span: "" 
  },
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
            A closer look at our flagship vehicles and premium showroom experience.
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
              className={`relative overflow-hidden rounded-2xl cursor-pointer group bg-[#0F1522] border border-white/10 ${img.span}`}
              onClick={() => setLightbox(img.src)}
            >
              {/* Studio Backdrop for PNG/WebP cars */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#121A2A] via-[#0B101A] to-[#05080E] flex items-center justify-center p-4">
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-[15px] bg-black/80 blur-[12px] rounded-[100%]" />
              </div>

              <img
                src={img.src}
                alt={img.alt}
                className="relative z-10 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
              />
              
              <div className="absolute inset-0 z-20 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                  <ZoomIn size={18} className="text-white" />
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 z-30">
                <p className="text-white text-sm font-medium">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-[#0055A5] hover:border-[#0055A5] transition-all z-50"
              onClick={() => setLightbox(null)}
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full h-[70vh] flex items-center justify-center p-8 bg-[#0D131F] rounded-2xl border border-white/10 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#121A2A] via-[#0B101A] to-[#05080E]" />
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[60%] h-[30px] bg-black/80 blur-[25px] rounded-[100%]" />
              <img
                src={lightbox}
                alt="Gallery Preview"
                className="relative z-10 max-w-full max-h-full object-contain drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}