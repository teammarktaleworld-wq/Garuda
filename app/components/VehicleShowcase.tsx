// "use client";
// import { useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// const vehicles = [
//   {
//     name: "Tata Sierra",
//     category: "Premium SUV",
//     price: "₹24.99 Lakh",
//     img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80",
//     badge: "NEW",
//     color: "#0055A5",
//   },
//   {
//     name: "Tata Harrier",
//     category: "Flagship SUV",
//     price: "₹15.49 Lakh",
//     img: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=600&q=80",
//     badge: "BESTSELLER",
//     color: "#1E7FE8",
//   },
//   {
//     name: "Tata Safari",
//     category: "Premium 7-Seater",
//     price: "₹16.19 Lakh",
//     img: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=600&q=80",
//     badge: null,
//     color: "#0055A5",
//   },
//   {
//     name: "Tata Curvv",
//     category: "Coupe SUV",
//     price: "₹10.00 Lakh",
//     img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&q=80",
//     badge: "NEW",
//     color: "#1E7FE8",
//   },
//   {
//     name: "Tata Nexon",
//     category: "Compact SUV",
//     price: "₹8.10 Lakh",
//     img: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=600&q=80",
//     badge: "TOP RATED",
//     color: "#0055A5",
//   },
//   {
//     name: "Tata Punch",
//     category: "Micro SUV",
//     price: "₹6.13 Lakh",
//     img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
//     badge: null,
//     color: "#1E7FE8",
//   },
//   {
//     name: "Tata Altroz",
//     category: "Premium Hatchback",
//     price: "₹6.60 Lakh",
//     img: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&q=80",
//     badge: "5 STAR NCAP",
//     color: "#0055A5",
//   },
//   {
//     name: "Tata Tiago",
//     category: "Hatchback",
//     price: "₹5.60 Lakh",
//     img: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&q=80",
//     badge: null,
//     color: "#1E7FE8",
//   },
// ];

// export default function VehicleShowcase() {
//   const ref = useRef(null);
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-100px" });

//   const scroll = (dir: "left" | "right") => {
//     if (!scrollRef.current) return;
//     scrollRef.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
//   };

//   return (
//     <section className="bg-[#07111F] py-20 lg:py-28 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div ref={ref} className="flex items-end justify-between mb-12 gap-6 flex-wrap">
//           <div>
//             <motion.span
//               initial={{ opacity: 0, x: -20 }}
//               animate={inView ? { opacity: 1, x: 0 } : {}}
//               className="text-[#1E7FE8] text-sm font-semibold uppercase tracking-widest mb-3 block"
//             >
//               Our Range
//             </motion.span>
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.1 }}
//               className="text-4xl lg:text-5xl font-bold text-white"
//               style={{ fontFamily: "'Syne', sans-serif" }}
//             >
//               Find Your Perfect Tata
//             </motion.h2>
//           </div>
//           <div className="hidden lg:flex gap-3">
//             <button onClick={() => scroll("left")} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#0055A5] hover:border-[#0055A5] transition-all">
//               <ChevronLeft size={18} />
//             </button>
//             <button onClick={() => scroll("right")} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#0055A5] hover:border-[#0055A5] transition-all">
//               <ChevronRight size={18} />
//             </button>
//           </div>
//         </div>

//         {/* Horizontal scroll */}
//         <div
//           ref={scrollRef}
//           className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
//           style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
//         >
//           {vehicles.map((v, i) => (
//             <motion.div
//               key={v.name}
//               initial={{ opacity: 0, y: 30 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: i * 0.07, duration: 0.5 }}
//               className="vehicle-card flex-none w-72 sm:w-80 bg-[#080B10] rounded-2xl overflow-hidden cursor-pointer snap-start border border-white/5 hover:border-[#0055A5]/40"
//             >
//               {/* Image */}
//               <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#07111F] to-[#0A1628]">
//                 <img
//                   src={v.img}
//                   alt={v.name}
//                   className="car-img w-full h-full object-cover transition-transform duration-500"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#080B10]/60 to-transparent" />
//                 {v.badge && (
//                   <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#0055A5] rounded-full text-white text-xs font-bold tracking-wider">
//                     {v.badge}
//                   </div>
//                 )}
//               </div>

//               {/* Info */}
//               <div className="p-5">
//                 <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{v.category}</div>
//                 <h3 className="text-white font-bold text-xl mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>{v.name}</h3>
//                 <div className="text-[#1E7FE8] font-semibold text-sm mb-4">Starting {v.price}*</div>
//                 <div className="flex gap-3">
//                   <a href="#cars" className="flex-1 py-2 text-center text-xs font-semibold border border-white/10 rounded-lg text-white/60 hover:border-[#0055A5]/60 hover:text-white transition-all">
//                     View Details
//                   </a>
//                   <a href="#testdrive" className="group flex items-center justify-center gap-1.5 px-4 py-2 bg-[#0055A5] rounded-lg text-white text-xs font-semibold hover:bg-[#1E7FE8] transition-all">
//                     Test Drive
//                     <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
//                   </a>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }















// "use client";

// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence, useInView } from "framer-motion";
// import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";

// // 1. VEHICLE LINEUP DATA (Strictly using local/official assets placeholders)
// const vehicles = [
//   {
//     id: "sierra",
//     name: "Tata Sierra",
//     category: "SUV",
//     tagline: "Explore the new generation of adventure.",
//     price: "Price on Request",
//     image: "/images/vehicles/sierra.png", // Replace with official transparent asset
//     badge: "NEW",
//   },
//   {
//     id: "harrier",
//     name: "Tata Harrier",
//     category: "SUV",
//     tagline: "Bold design. Confident performance. Built for every journey.",
//     price: "From ₹15.49 Lakh*",
//     image: "/images/vehicles/harrier.png",
//     badge: "FLAGSHIP",
//   },
//   {
//     id: "safari",
//     name: "Tata Safari",
//     category: "SUV",
//     tagline: "Reclaim your life with the premium 7-seater.",
//     price: "From ₹16.19 Lakh*",
//     image: "/images/vehicles/safari.png",
//     badge: null,
//   },
//   {
//     id: "curvv",
//     name: "Tata Curvv",
//     category: "EV",
//     tagline: "The ultimate electric SUV coupe.",
//     price: "Price on Request",
//     image: "/images/vehicles/curvv.png",
//     badge: "NEW",
//   },
//   {
//     id: "nexon",
//     name: "Tata Nexon",
//     category: "SUV",
//     tagline: "India's favorite compact SUV.",
//     price: "From ₹8.10 Lakh*",
//     image: "/images/vehicles/nexon.png",
//     badge: "BESTSELLER",
//   },
//   {
//     id: "punch",
//     name: "Tata Punch",
//     category: "SUV",
//     tagline: "Vibes with every drive.",
//     price: "From ₹6.13 Lakh*",
//     image: "/images/vehicles/punch.png",
//     badge: null,
//   },
//   {
//     id: "altroz",
//     name: "Tata Altroz",
//     category: "HATCHBACK",
//     tagline: "The gold standard of hatchbacks.",
//     price: "From ₹6.60 Lakh*",
//     image: "/images/vehicles/altroz.png",
//     badge: "5 STAR NCAP",
//   },
//   {
//     id: "tiago",
//     name: "Tata Tiago",
//     category: "HATCHBACK",
//     tagline: "Seriously fun.",
//     price: "From ₹5.60 Lakh*",
//     image: "/images/vehicles/tiago.png",
//     badge: null,
//   },
// ];

// const categories = ["ALL", "SUV", "HATCHBACK", "EV"];

// export default function VehicleShowcase() {
//   const [activeCategory, setActiveCategory] = useState("ALL");
//   const [activeIndex, setActiveIndex] = useState(0);
  
//   const sectionRef = useRef(null);
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const inView = useInView(sectionRef, { once: true, margin: "-100px" });

//   const filteredVehicles = vehicles.filter((v) => 
//     activeCategory === "ALL" ? true : v.category === activeCategory
//   );

//   // Reset selected vehicle when category changes
//   useEffect(() => {
//     setActiveIndex(0);
//   }, [activeCategory]);

//   const activeVehicle = filteredVehicles[activeIndex] || filteredVehicles[0];

//   const handleScroll = (dir: "left" | "right") => {
//     if (scrollRef.current) {
//       const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.85 : 400;
//       scrollRef.current.scrollBy({ 
//         left: dir === "right" ? scrollAmount : -scrollAmount, 
//         behavior: "smooth" 
//       });
//     }
//   };

//   return (
//     <section ref={sectionRef} className="relative bg-[#050A12] pt-24 pb-32 overflow-hidden font-sans">
      
//       {/* BACKGROUND EFFECTS (Cinematic Studio) */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[#0055A5]/10 blur-[150px] rounded-full mix-blend-screen" />
//         <div 
//           className="absolute inset-0 opacity-[0.03]" 
//           style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} 
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050A12]/50 to-[#050A12]" />
//       </div>

//       <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        
//         {/* HEADER */}
//         <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
//           <div className="max-w-2xl">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6 }}
//               className="flex items-center gap-3 mb-4"
//             >
//               <div className="h-[1px] w-8 bg-[#0055A5]" />
//               <span className="text-white/60 text-xs font-semibold tracking-[0.2em] uppercase">
//                 Tata Motors
//               </span>
//             </motion.div>
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white leading-[1.1] tracking-tight mb-4"
//             >
//               Find Your Perfect Tata
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="text-white/50 text-base lg:text-lg max-w-md"
//             >
//               Explore the Tata Motors range, designed for every road, every ambition, and every journey.
//             </motion.p>
//           </div>

//           {/* EDITORIAL CATEGORY FILTER */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="flex gap-6 lg:gap-8 overflow-x-auto scrollbar-hide pb-2"
//           >
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className="relative pb-2 text-sm font-semibold tracking-wider transition-colors"
//               >
//                 <span className={activeCategory === cat ? "text-white" : "text-white/40 hover:text-white/70"}>
//                   {cat}
//                 </span>
//                 {activeCategory === cat && (
//                   <motion.div
//                     layoutId="category-indicator"
//                     className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0055A5]"
//                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   />
//                 )}
//               </button>
//             ))}
//           </motion.div>
//         </div>

//         {/* DESKTOP FEATURED SHOWCASE (Hidden on mobile) */}
//         <div className="hidden lg:block">
//           <div className="relative min-h-[500px] flex items-center">
            
//             {/* Vehicle Details */}
//             <div className="w-[35%] z-20">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeVehicle.id}
//                   initial={{ opacity: 0, x: -30 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
//                 >
//                   {activeVehicle.badge && (
//                     <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-[0.2em] rounded-full mb-4">
//                       {activeVehicle.badge}
//                     </span>
//                   )}
//                   <div className="text-[#0055A5] text-xs font-semibold tracking-widest uppercase mb-2">
//                     {activeVehicle.category}
//                   </div>
//                   <h3 className="text-5xl font-bold text-white mb-4 tracking-tight">
//                     {activeVehicle.name}
//                   </h3>
//                   <p className="text-white/60 text-lg mb-8 max-w-sm">
//                     {activeVehicle.tagline}
//                   </p>
//                   <div className="text-white/40 text-sm mb-2">Starting from</div>
//                   <div className="text-2xl font-medium text-white mb-8">
//                     {activeVehicle.price}
//                   </div>
                  
//                   <div className="flex items-center gap-4">
//                     <a href={`#${activeVehicle.id}`} className="group flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0055A5] text-white text-sm font-medium rounded-full hover:bg-[#1E7FE8] hover:shadow-[0_0_20px_rgba(0,85,165,0.4)] transition-all duration-300">
//                       EXPLORE MODEL
//                       <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//                     </a>
//                     <a href="#test-drive" className="px-8 py-3.5 border border-white/20 text-white text-sm font-medium rounded-full hover:bg-white/5 transition-all duration-300">
//                       BOOK TEST DRIVE
//                     </a>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* Huge Vehicle Image (Cinematic Studio) */}
//             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[70%] h-[120%] pointer-events-none flex justify-center items-center">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeVehicle.id}
//                   initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
//                   animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
//                   exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
//                   transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
//                   className="relative w-full h-full"
//                 >
//                   {/* Fake shadow to ground the transparent car image */}
//                   <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[70%] h-[40px] bg-black/80 blur-[20px] rounded-[100%]" />
//                   <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[40%] h-[20px] bg-[#0055A5]/30 blur-[30px] rounded-[100%]" />
                  
//                   <Image
//                     src={activeVehicle.image}
//                     alt={activeVehicle.name}
//                     fill
//                     className="object-contain drop-shadow-2xl"
//                     sizes="(max-width: 1440px) 70vw, 1000px"
//                     priority
//                   />
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* Desktop Thumbnail Selector */}
//           <div className="mt-20 border-t border-white/10 pt-8 flex items-center justify-between">
//             <div className="flex gap-12">
//               {filteredVehicles.map((v, i) => (
//                 <button
//                   key={v.id}
//                   onClick={() => setActiveIndex(i)}
//                   className={`text-sm font-medium tracking-wide transition-all duration-300 ${
//                     activeIndex === i ? "text-white scale-105" : "text-white/30 hover:text-white/60"
//                   }`}
//                 >
//                   {v.name.replace("Tata ", "")}
//                 </button>
//               ))}
//             </div>
            
//             {/* Progress Indicator */}
//             <div className="flex items-center gap-4 text-white/30 text-sm font-mono">
//               <span className="text-white">0{activeIndex + 1}</span>
//               <div className="w-16 h-[1px] bg-white/20 relative overflow-hidden">
//                 <motion.div 
//                   className="absolute top-0 left-0 h-full bg-[#0055A5]" 
//                   initial={{ width: 0 }}
//                   animate={{ width: `${((activeIndex + 1) / filteredVehicles.length) * 100}%` }}
//                   transition={{ duration: 0.5 }}
//                 />
//               </div>
//               <span>0{filteredVehicles.length}</span>
//             </div>
//           </div>
//         </div>

//         {/* MOBILE SHOWCASE (Swipeable Cards) */}
//         <div className="lg:hidden">
//           <div 
//             ref={scrollRef}
//             className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-6 px-6"
//           >
//             {filteredVehicles.map((v, i) => (
//               <motion.div
//                 key={v.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={inView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ delay: i * 0.1, duration: 0.6 }}
//                 className="relative flex-none w-[85vw] max-w-[380px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden snap-center group hover:-translate-y-1 transition-all duration-300"
//               >
//                 {/* Mobile Card Header */}
//                 <div className="p-6 pb-0 relative z-20">
//                   <div className="flex justify-between items-start mb-2">
//                     <span className="text-[#0055A5] text-[10px] font-bold tracking-widest uppercase">{v.category}</span>
//                     {v.badge && <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 bg-white/10 text-white rounded-full">{v.badge}</span>}
//                   </div>
//                   <h3 className="text-2xl font-bold text-white">{v.name}</h3>
//                 </div>

//                 {/* Mobile Image */}
//                 <div className="relative h-[220px] w-full mt-4 z-10 group-hover:scale-105 transition-transform duration-500">
//                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-[20px] bg-black/60 blur-[15px] rounded-[100%]" />
//                   <Image
//                     src={v.image}
//                     alt={v.name}
//                     fill
//                     className="object-contain p-4"
//                     sizes="(max-width: 768px) 85vw, 400px"
//                   />
//                 </div>

//                 {/* Mobile Card Footer */}
//                 <div className="p-6 relative z-20 bg-gradient-to-t from-[#050A12] via-[#050A12]/80 to-transparent">
//                   <div className="text-white/40 text-xs mb-1">Starting from</div>
//                   <div className="text-lg font-medium text-white mb-6">{v.price}</div>
//                   <a href={`#${v.id}`} className="flex items-center justify-between w-full py-3 px-4 bg-white/10 hover:bg-[#0055A5] border border-white/10 rounded-xl text-white text-sm font-medium transition-colors">
//                     EXPLORE MODEL
//                     <ArrowRight size={16} />
//                   </a>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Mobile Navigation Controls */}
//           <div className="flex items-center justify-between mt-4">
//             <div className="text-white/30 text-sm font-mono">
//               SWIPE TO EXPLORE
//             </div>
//             <div className="flex gap-2">
//               <button onClick={() => handleScroll("left")} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md active:bg-white/20 transition-colors">
//                 <ChevronLeft size={18} />
//               </button>
//               <button onClick={() => handleScroll("right")} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md active:bg-white/20 transition-colors">
//                 <ChevronRight size={18} />
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* BOTTOM TRANSITION GRADIENT */}
//       {/* Creates a seamless, curved/soft fade into the next section (assuming next section is white/light) */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
//       <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-48 bg-[#0055A5]/10 blur-[80px] pointer-events-none" />

//     </section>
//   );
// }












// "use client";

// import { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence, useInView } from "framer-motion";
// import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
// import Image from "next/image";

// // 1. VEHICLE LINEUP DATA (Strictly using local/official assets placeholders)
// const vehicles = [
//   {
//     id: "sierra",
//     name: "Tata Sierra",
//     category: "SUV",
//     tagline: "Explore the new generation of adventure.",
//     price: "Price on Request",
//     image: "/images/vehicles/sierra.webp",
//     badge: "NEW",
//   },
//   {
//     id: "harrier",
//     name: "Tata Harrier",
//     category: "SUV",
//     tagline: "Bold design. Confident performance. Built for every journey.",
//     price: "From ₹15.49 Lakh*",
//     image: "/images/vehicles/harrier.webp",
//     badge: "FLAGSHIP",
//   },
//   {
//     id: "safari",
//     name: "Tata Safari",
//     category: "SUV",
//     tagline: "Reclaim your life with the premium 7-seater.",
//     price: "From ₹16.19 Lakh*",
//     image: "/images/vehicles/tatasafari.webp",
//     badge: null,
//   },
//   {
//     id: "curvv",
//     name: "Tata Curvv",
//     category: "EV",
//     tagline: "The ultimate electric SUV coupe.",
//     price: "Price on Request",
//     image: "/images/vehicles/tatacurvve.webp",
//     badge: "NEW",
//   },
//   {
//     id: "nexon",
//     name: "Tata Nexon",
//     category: "SUV",
//     tagline: "India's favorite compact SUV.",
//     price: "From ₹8.10 Lakh*",
//     image: "/images/vehicles/tatanexon.webp",
//     badge: "BESTSELLER",
//   },
//   {
//     id: "punch",
//     name: "Tata Punch",
//     category: "SUV",
//     tagline: "Vibes with every drive.",
//     price: "From ₹6.13 Lakh*",
//     image: "/images/vehicles/punchtata.webp",
//     badge: null,
//   },
//   {
//     id: "altroz",
//     name: "Tata Altroz",
//     category: "HATCHBACK",
//     tagline: "The gold standard of hatchbacks.",
//     price: "From ₹6.60 Lakh*",
//     image: "/images/vehicles/altrozaltroz.webp",
//     badge: "5 STAR NCAP",
//   },
//   {
//     id: "tiago",
//     name: "Tata Tiago",
//     category: "HATCHBACK",
//     tagline: "Seriously fun.",
//     price: "From ₹5.60 Lakh*",
//     image: "/images/vehicles/tatatiago.webp",
//     badge: null,
//   },
// ];

// const categories = ["ALL", "SUV", "HATCHBACK", "EV"];

// export default function VehicleShowcase() {
//   const [activeCategory, setActiveCategory] = useState("ALL");
//   const [activeIndex, setActiveIndex] = useState(0);
  
//   const sectionRef = useRef(null);
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const inView = useInView(sectionRef, { once: true, margin: "-100px" });

//   const filteredVehicles = vehicles.filter((v) => 
//     activeCategory === "ALL" ? true : v.category === activeCategory
//   );

//   // Reset selected vehicle when category changes
//   useEffect(() => {
//     setActiveIndex(0);
//   }, [activeCategory]);

//   const activeVehicle = filteredVehicles[activeIndex] || filteredVehicles[0];

//   const handleScroll = (dir: "left" | "right") => {
//     if (scrollRef.current) {
//       const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.85 : 400;
//       scrollRef.current.scrollBy({ 
//         left: dir === "right" ? scrollAmount : -scrollAmount, 
//         behavior: "smooth" 
//       });
//     }
//   };

//   return (
//     <section ref={sectionRef} className="relative bg-[#050A12] pt-24 pb-32 overflow-hidden font-sans">
      
//       {/* BACKGROUND EFFECTS (Cinematic Studio) */}
//       <div className="absolute inset-0 pointer-events-none">
//         <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[#0055A5]/10 blur-[150px] rounded-full mix-blend-screen" />
//         <div 
//           className="absolute inset-0 opacity-[0.03]" 
//           style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} 
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050A12]/50 to-[#050A12]" />
//       </div>

//       <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        
//         {/* HEADER */}
//         <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
//           <div className="max-w-2xl">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6 }}
//               className="flex items-center gap-3 mb-4"
//             >
//               <div className="h-[1px] w-8 bg-[#0055A5]" />
//               <span className="text-white/60 text-xs font-semibold tracking-[0.2em] uppercase">
//                 Tata Motors
//               </span>
//             </motion.div>
//             <motion.h2
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white leading-[1.1] tracking-tight mb-4"
//             >
//               Find Your Perfect Tata
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ duration: 0.6, delay: 0.2 }}
//               className="text-white/50 text-base lg:text-lg max-w-md"
//             >
//               Explore the Tata Motors range, designed for every road, every ambition, and every journey.
//             </motion.p>
//           </div>

//           {/* EDITORIAL CATEGORY FILTER */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             className="flex gap-6 lg:gap-8 overflow-x-auto scrollbar-hide pb-2"
//           >
//             {categories.map((cat) => (
//               <button
//                 key={cat}
//                 onClick={() => setActiveCategory(cat)}
//                 className="relative pb-2 text-sm font-semibold tracking-wider transition-colors"
//               >
//                 <span className={activeCategory === cat ? "text-white" : "text-white/40 hover:text-white/70"}>
//                   {cat}
//                 </span>
//                 {activeCategory === cat && (
//                   <motion.div
//                     layoutId="category-indicator"
//                     className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0055A5]"
//                     transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                   />
//                 )}
//               </button>
//             ))}
//           </motion.div>
//         </div>

//         {/* DESKTOP FEATURED SHOWCASE (Hidden on mobile) */}
//         <div className="hidden lg:block">
//           <div className="relative min-h-[500px] flex items-center">
            
//             {/* Vehicle Details */}
//             <div className="w-[35%] z-20">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeVehicle.id}
//                   initial={{ opacity: 0, x: -30 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -20 }}
//                   transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
//                 >
//                   {activeVehicle.badge && (
//                     <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-[0.2em] rounded-full mb-4">
//                       {activeVehicle.badge}
//                     </span>
//                   )}
//                   <div className="text-[#0055A5] text-xs font-semibold tracking-widest uppercase mb-2">
//                     {activeVehicle.category}
//                   </div>
//                   <h3 className="text-5xl font-bold text-white mb-4 tracking-tight">
//                     {activeVehicle.name}
//                   </h3>
//                   <p className="text-white/60 text-lg mb-8 max-w-sm">
//                     {activeVehicle.tagline}
//                   </p>
//                   <div className="text-white/40 text-sm mb-2">Starting from</div>
//                   <div className="text-2xl font-medium text-white mb-8">
//                     {activeVehicle.price}
//                   </div>
                  
//                   <div className="flex items-center gap-4">
//                     <a href={`#${activeVehicle.id}`} className="group flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0055A5] text-white text-sm font-medium rounded-full hover:bg-[#1E7FE8] hover:shadow-[0_0_20px_rgba(0,85,165,0.4)] transition-all duration-300">
//                       EXPLORE MODEL
//                       <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//                     </a>
//                     <a href="#test-drive" className="px-8 py-3.5 border border-white/20 text-white text-sm font-medium rounded-full hover:bg-white/5 transition-all duration-300">
//                       BOOK TEST DRIVE
//                     </a>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </div>

//             {/* Huge Vehicle Image (Cinematic Studio) */}
//             <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[70%] h-[120%] pointer-events-none flex justify-center items-center">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeVehicle.id}
//                   initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
//                   animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
//                   exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
//                   transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
//                   className="relative w-full h-full"
//                 >
//                   {/* Fake shadow to ground the transparent car image */}
//                   <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[70%] h-[40px] bg-black/80 blur-[20px] rounded-[100%]" />
//                   <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[40%] h-[20px] bg-[#0055A5]/30 blur-[30px] rounded-[100%]" />
                  
//                   <Image
//                     src={activeVehicle.image}
//                     alt={activeVehicle.name}
//                     fill
//                     className="object-contain drop-shadow-2xl"
//                     sizes="(max-width: 1440px) 70vw, 1000px"
//                     priority
//                   />
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* Desktop Thumbnail Selector */}
//           <div className="mt-20 border-t border-white/10 pt-8 flex items-center justify-between">
//             <div className="flex gap-12">
//               {filteredVehicles.map((v, i) => (
//                 <button
//                   key={v.id}
//                   onClick={() => setActiveIndex(i)}
//                   className={`text-sm font-medium tracking-wide transition-all duration-300 ${
//                     activeIndex === i ? "text-white scale-105" : "text-white/30 hover:text-white/60"
//                   }`}
//                 >
//                   {v.name.replace("Tata ", "")}
//                 </button>
//               ))}
//             </div>
            
//             {/* Progress Indicator */}
//             <div className="flex items-center gap-4 text-white/30 text-sm font-mono">
//               <span className="text-white">0{activeIndex + 1}</span>
//               <div className="w-16 h-[1px] bg-white/20 relative overflow-hidden">
//                 <motion.div 
//                   className="absolute top-0 left-0 h-full bg-[#0055A5]" 
//                   initial={{ width: 0 }}
//                   animate={{ width: `${((activeIndex + 1) / filteredVehicles.length) * 100}%` }}
//                   transition={{ duration: 0.5 }}
//                 />
//               </div>
//               <span>0{filteredVehicles.length}</span>
//             </div>
//           </div>
//         </div>

//         {/* MOBILE SHOWCASE (Swipeable Cards) */}
//         <div className="lg:hidden">
//           <div 
//             ref={scrollRef}
//             className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-6 px-6"
//           >
//             {filteredVehicles.map((v, i) => (
//               <motion.div
//                 key={v.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={inView ? { opacity: 1, y: 0 } : {}}
//                 transition={{ delay: i * 0.1, duration: 0.6 }}
//                 className="relative flex-none w-[85vw] max-w-[380px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden snap-center group hover:-translate-y-1 transition-all duration-300"
//               >
//                 {/* Mobile Card Header */}
//                 <div className="p-6 pb-0 relative z-20">
//                   <div className="flex justify-between items-start mb-2">
//                     <span className="text-[#0055A5] text-[10px] font-bold tracking-widest uppercase">{v.category}</span>
//                     {v.badge && <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 bg-white/10 text-white rounded-full">{v.badge}</span>}
//                   </div>
//                   <h3 className="text-2xl font-bold text-white">{v.name}</h3>
//                 </div>

//                 {/* Mobile Image */}
//                 <div className="relative h-[220px] w-full mt-4 z-10 group-hover:scale-105 transition-transform duration-500">
//                   <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-[20px] bg-black/60 blur-[15px] rounded-[100%]" />
//                   <Image
//                     src={v.image}
//                     alt={v.name}
//                     fill
//                     className="object-contain p-4"
//                     sizes="(max-width: 768px) 85vw, 400px"
//                   />
//                 </div>

//                 {/* Mobile Card Footer */}
//                 <div className="p-6 relative z-20 bg-gradient-to-t from-[#050A12] via-[#050A12]/80 to-transparent">
//                   <div className="text-white/40 text-xs mb-1">Starting from</div>
//                   <div className="text-lg font-medium text-white mb-6">{v.price}</div>
//                   <a href={`#${v.id}`} className="flex items-center justify-between w-full py-3 px-4 bg-white/10 hover:bg-[#0055A5] border border-white/10 rounded-xl text-white text-sm font-medium transition-colors">
//                     EXPLORE MODEL
//                     <ArrowRight size={16} />
//                   </a>
//                 </div>
//               </motion.div>
//             ))}
//           </div>

//           {/* Mobile Navigation Controls */}
//           <div className="flex items-center justify-between mt-4">
//             <div className="text-white/30 text-sm font-mono">
//               SWIPE TO EXPLORE
//             </div>
//             <div className="flex gap-2">
//               <button onClick={() => handleScroll("left")} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md active:bg-white/20 transition-colors">
//                 <ChevronLeft size={18} />
//               </button>
//               <button onClick={() => handleScroll("right")} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md active:bg-white/20 transition-colors">
//                 <ChevronRight size={18} />
//               </button>
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* BOTTOM TRANSITION GRADIENT */}
//       {/* Creates a seamless, curved/soft fade into the next section (assuming next section is white/light) */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
//       <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-48 bg-[#0055A5]/10 blur-[80px] pointer-events-none" />

//     </section>
//   );
// }














"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// 1. VEHICLE LINEUP DATA (Strictly using local/official assets placeholders)
const vehicles = [
  {
    id: "sierra",
    name: "Tata Sierra",
    category: "SUV",
    tagline: "Explore the new generation of adventure.",
    price: "Price on Request",
    image: "/images/vehicles/sierra.webp",
    badge: "NEW",
  },
  {
    id: "harrier",
    name: "Tata Harrier",
    category: "SUV",
    tagline: "Bold design. Confident performance. Built for every journey.",
    price: "From ₹15.49 Lakh*",
    image: "/images/vehicles/harrier.webp",
    badge: "FLAGSHIP",
  },
  {
    id: "safari",
    name: "Tata Safari",
    category: "SUV",
    tagline: "Reclaim your life with the premium 7-seater.",
    price: "From ₹16.19 Lakh*",
    image: "/images/vehicles/tatasafari.webp",
    badge: null,
  },
  {
    id: "curvv",
    name: "Tata Curvv",
    category: "EV",
    tagline: "The ultimate electric SUV coupe.",
    price: "Price on Request",
    image: "/images/vehicles/tatacurvve.webp",
    badge: "NEW",
  },
  {
    id: "nexon",
    name: "Tata Nexon",
    category: "SUV",
    tagline: "India's favorite compact SUV.",
    price: "From ₹8.10 Lakh*",
    image: "/images/vehicles/tatanexon.webp",
    badge: "BESTSELLER",
  },
  {
    id: "punch",
    name: "Tata Punch",
    category: "SUV",
    tagline: "Vibes with every drive.",
    price: "From ₹6.13 Lakh*",
    image: "/images/vehicles/punchtata.webp",
    badge: null,
  },
  {
    id: "altroz",
    name: "Tata Altroz",
    category: "HATCHBACK",
    tagline: "The gold standard of hatchbacks.",
    price: "From ₹6.60 Lakh*",
    image: "/images/vehicles/altrozaltroz.webp",
    badge: "5 STAR NCAP",
  },
  {
    id: "tiago",
    name: "Tata Tiago",
    category: "HATCHBACK",
    tagline: "Seriously fun.",
    price: "From ₹5.60 Lakh*",
    image: "/images/vehicles/tatatiago.webp",
    badge: null,
  },
];

const categories = ["ALL", "SUV", "HATCHBACK", "EV"];

export default function VehicleShowcase() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeIndex, setActiveIndex] = useState(0);
  
  const sectionRef = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const filteredVehicles = vehicles.filter((v) => 
    activeCategory === "ALL" ? true : v.category === activeCategory
  );

  // Reset selected vehicle when category changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  // AUTO-PLAY LOGIC: Automatically change vehicles every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % filteredVehicles.length);
    }, 5000);
    
    // Clear the interval if the component unmounts or if the user manually changes the index
    return () => clearInterval(timer);
  }, [activeIndex, filteredVehicles.length]);

  const activeVehicle = filteredVehicles[activeIndex] || filteredVehicles[0];

  // Manual Desktop Controls
  const handleNextDesktop = () => {
    setActiveIndex((prev) => (prev + 1) % filteredVehicles.length);
  };

  const handlePrevDesktop = () => {
    setActiveIndex((prev) => (prev === 0 ? filteredVehicles.length - 1 : prev - 1));
  };

  // Manual Mobile Controls
  const handleScroll = (dir: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth * 0.85 : 400;
      scrollRef.current.scrollBy({ 
        left: dir === "right" ? scrollAmount : -scrollAmount, 
        behavior: "smooth" 
      });
    }
  };

  return (
    <section ref={sectionRef} className="relative bg-[#050A12] pt-24 pb-32 overflow-hidden font-sans">
      
      {/* BACKGROUND EFFECTS (Cinematic Studio) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[#0055A5]/10 blur-[150px] rounded-full mix-blend-screen" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050A12]/50 to-[#050A12]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-[1px] w-8 bg-[#0055A5]" />
              <span className="text-white/60 text-xs font-semibold tracking-[0.2em] uppercase">
                Tata Motors
              </span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-white leading-[1.1] tracking-tight mb-4"
            >
              Find Your Perfect Tata
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/50 text-base lg:text-lg max-w-md"
            >
              Explore the Tata Motors range, designed for every road, every ambition, and every journey.
            </motion.p>
          </div>

          {/* EDITORIAL CATEGORY FILTER */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex gap-6 lg:gap-8 overflow-x-auto scrollbar-hide pb-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative pb-2 text-sm font-semibold tracking-wider transition-colors"
              >
                <span className={activeCategory === cat ? "text-white" : "text-white/40 hover:text-white/70"}>
                  {cat}
                </span>
                {activeCategory === cat && (
                  <motion.div
                    layoutId="category-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0055A5]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </div>

        {/* DESKTOP FEATURED SHOWCASE (Hidden on mobile) */}
        <div className="hidden lg:block">
          <div className="relative min-h-[500px] flex items-center">
            
            {/* Vehicle Details */}
            <div className="w-[35%] z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVehicle.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {activeVehicle.badge && (
                    <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold tracking-[0.2em] rounded-full mb-4">
                      {activeVehicle.badge}
                    </span>
                  )}
                  <div className="text-[#0055A5] text-xs font-semibold tracking-widest uppercase mb-2">
                    {activeVehicle.category}
                  </div>
                  <h3 className="text-5xl font-bold text-white mb-4 tracking-tight">
                    {activeVehicle.name}
                  </h3>
                  <p className="text-white/60 text-lg mb-8 max-w-sm">
                    {activeVehicle.tagline}
                  </p>
                  <div className="text-white/40 text-sm mb-2">Starting from</div>
                  <div className="text-2xl font-medium text-white mb-8">
                    {activeVehicle.price}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <a href={`#${activeVehicle.id}`} className="group flex items-center justify-center gap-2 px-8 py-3.5 bg-[#0055A5] text-white text-sm font-medium rounded-full hover:bg-[#1E7FE8] hover:shadow-[0_0_20px_rgba(0,85,165,0.4)] transition-all duration-300">
                      EXPLORE MODEL
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="#test-drive" className="px-8 py-3.5 border border-white/20 text-white text-sm font-medium rounded-full hover:bg-white/5 transition-all duration-300">
                      BOOK TEST DRIVE
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Huge Vehicle Image (Cinematic Studio) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[70%] h-[120%] pointer-events-none flex justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeVehicle.id}
                  initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  {/* Fake shadow to ground the transparent car image */}
                  <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[70%] h-[40px] bg-black/80 blur-[20px] rounded-[100%]" />
                  <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[40%] h-[20px] bg-[#0055A5]/30 blur-[30px] rounded-[100%]" />
                  
                  <Image
                    src={activeVehicle.image}
                    alt={activeVehicle.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 1440px) 70vw, 1000px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Thumbnail Selector & Controls */}
          <div className="mt-20 border-t border-white/10 pt-8 flex items-center justify-between">
            <div className="flex gap-12">
              {filteredVehicles.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setActiveIndex(i)}
                  className={`text-sm font-medium tracking-wide transition-all duration-300 ${
                    activeIndex === i ? "text-white scale-105" : "text-white/30 hover:text-white/60"
                  }`}
                >
                  {v.name.replace("Tata ", "")}
                </button>
              ))}
            </div>
            
            {/* Progress Indicator and Buttons */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4 text-white/30 text-sm font-mono">
                <span className="text-white">0{activeIndex + 1}</span>
                <div className="w-16 h-[1px] bg-white/20 relative overflow-hidden">
                  <motion.div 
                    className="absolute top-0 left-0 h-full bg-[#0055A5]" 
                    initial={{ width: 0 }}
                    animate={{ width: `${((activeIndex + 1) / filteredVehicles.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span>0{filteredVehicles.length}</span>
              </div>
              
              {/* Desktop Next/Prev Controls */}
              <div className="flex gap-2">
                <button 
                  onClick={handlePrevDesktop} 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={handleNextDesktop} 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/10 hover:border-white/30 transition-all"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE SHOWCASE (Swipeable Cards) */}
        <div className="lg:hidden">
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-8 -mx-6 px-6"
          >
            {filteredVehicles.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative flex-none w-[85vw] max-w-[380px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden snap-center group hover:-translate-y-1 transition-all duration-300"
              >
                {/* Mobile Card Header */}
                <div className="p-6 pb-0 relative z-20">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[#0055A5] text-[10px] font-bold tracking-widest uppercase">{v.category}</span>
                    {v.badge && <span className="text-[9px] font-bold tracking-wider px-2 py-0.5 bg-white/10 text-white rounded-full">{v.badge}</span>}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{v.name}</h3>
                </div>

                {/* Mobile Image */}
                <div className="relative h-[220px] w-full mt-4 z-10 group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-[20px] bg-black/60 blur-[15px] rounded-[100%]" />
                  <Image
                    src={v.image}
                    alt={v.name}
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 85vw, 400px"
                  />
                </div>

                {/* Mobile Card Footer */}
                <div className="p-6 relative z-20 bg-gradient-to-t from-[#050A12] via-[#050A12]/80 to-transparent">
                  <div className="text-white/40 text-xs mb-1">Starting from</div>
                  <div className="text-lg font-medium text-white mb-6">{v.price}</div>
                  <a href={`#${v.id}`} className="flex items-center justify-between w-full py-3 px-4 bg-white/10 hover:bg-[#0055A5] border border-white/10 rounded-xl text-white text-sm font-medium transition-colors">
                    EXPLORE MODEL
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Navigation Controls */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-white/30 text-sm font-mono">
              SWIPE TO EXPLORE
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleScroll("left")} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md active:bg-white/20 transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => handleScroll("right")} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white backdrop-blur-md active:bg-white/20 transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM TRANSITION GRADIENT */}
      {/* Creates a seamless, curved/soft fade into the next section (assuming next section is white/light) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-48 bg-[#0055A5]/10 blur-[80px] pointer-events-none" />

    </section>
  );
}