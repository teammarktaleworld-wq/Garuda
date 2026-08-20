





// // garud-tata\app\components\Hero.tsx







// "use client";

// import { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { 
//   ArrowRight, 
//   CheckCircle2, 
//   Volume2, 
//   VolumeX,
//   Phone,
//   MapPin,
//   Car,
//   Calendar
// } from "lucide-react";

// export default function CinematicHero() {
//   const [isMuted, setIsMuted] = useState(true);
//   const [isPlaying, setIsPlaying] = useState(true);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const toggleMute = () => setIsMuted(!isMuted);
//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (isPlaying) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   // Ensure video plays on load even in strict browser environments
//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.play().catch((e) => console.log("Autoplay prevented:", e));
//     }
//   }, []);

//   // Animation variants
// const fadeUp = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
//     },
//   },
// };

//   return (
//     <section className="relative w-full h-[100vh] min-h-[600px] overflow-hidden bg-[#050505] font-sans">
      
//       {/* 1. VIDEO BACKGROUND */}
//       <div className="absolute inset-0 z-0">
//         <video
//           ref={videoRef}
//           src="/video/vidssave.com Sierra _ Glimpse 2 _ The Legend Returns 720P.mp4"
//           poster="/images/tata-fallback.jpg" // Add a fallback image in your public folder
//           autoPlay
//           muted={isMuted}
//           loop
//           playsInline
//           className="w-full h-full object-cover object-[70%_center]"
//         />
//       </div>

//       {/* 2. CINEMATIC OVERLAYS */}
//       {/* Film Grain */}
//       <div 
//         className="absolute inset-0 z-[1] opacity-20 pointer-events-none mix-blend-overlay"
//         style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
//       />
      
//       {/* Gradients & Vignette */}
//       <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none" />
//       <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
      
//       {/* Soft Blue Ambient Glow */}
//       <div className="absolute top-1/4 left-0 w-[50vw] h-[50vh] bg-[#0055A5]/15 blur-[120px] rounded-full pointer-events-none z-[2]" />

//       {/* 3. MAIN HERO CONTENT */}
//       <div className="absolute inset-0 z-10 flex flex-col justify-center pl-[8%] pr-6 sm:pr-8 pt-20">
//         <div className="max-w-[700px]">
          
//           {/* Eyebrow */}
//           <motion.div 
//             initial="hidden"
//             animate="visible"
//             variants={fadeUp}
//             className="flex items-center gap-4 mb-6"
//           >
//             <span className="text-xs sm:text-sm font-semibold text-white tracking-[0.2em] uppercase">
//               GARUD TATA
//             </span>
//             <motion.div 
//               initial={{ width: 0 }}
//               animate={{ width: 40 }}
//               transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
//               className="h-[2px] bg-[#0055A5]"
//             />
//           </motion.div>

//           {/* Headline */}
//           <div className="mb-6">
//             <motion.div className="overflow-hidden">
//               <motion.h1 
//                 initial={{ y: "100%" }}
//                 animate={{ y: 0 }}
//                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
//                 className="text-[clamp(3rem,7vw,8rem)] font-bold text-white leading-[0.95] tracking-tighter"
//               >
//                 DRIVE YOUR
//               </motion.h1>
//             </motion.div>
//             <motion.div className="overflow-hidden">
//               <motion.h1 
//                 initial={{ y: "100%" }}
//                 animate={{ y: 0 }}
//                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
//                 className="text-[clamp(3rem,7vw,8rem)] font-bold text-white leading-[0.95] tracking-tighter"
//               >
//                 NEXT CHAPTER.
//               </motion.h1>
//             </motion.div>
//           </div>

//           {/* Description */}
//           <motion.p
//             initial="hidden"
//             animate="visible"
//             variants={fadeUp}
//             transition={{ delay: 0.3 }}
//             className="text-gray-300 text-base sm:text-lg max-w-[520px] mb-10 leading-relaxed font-light"
//           >
//             Experience the confidence, technology and performance of Tata Motors at Garud Tata.
//           </motion.p>

//           {/* CTA Buttons */}
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={fadeUp}
//             transition={{ delay: 0.4 }}
//             className="flex flex-col sm:flex-row gap-4 mb-12"
//           >
//             <a
//               href="#explore"
//               className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-[#0055A5] text-white font-medium rounded-md overflow-hidden hover:shadow-[0_0_25px_rgba(0,85,165,0.4)] transition-all duration-300"
//             >
//               <span className="relative z-10">EXPLORE CARS</span>
//               <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
//               <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
//             </a>

//             <a
//               href="#test-drive"
//               className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/30 text-white font-medium rounded-md hover:-translate-y-1 hover:bg-white/10 hover:border-white/60 transition-all duration-300"
//             >
//               BOOK A TEST DRIVE
//               <ArrowRight size={18} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
//             </a>
//           </motion.div>

//           {/* Trust Indicators */}
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={fadeUp}
//             transition={{ delay: 0.5 }}
//             className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-xs sm:text-sm text-white/70"
//           >
//             <div className="flex items-center gap-2 font-medium text-white/90">
//               <CheckCircle2 size={16} className="text-[#0055A5]" />
//               AUTHORIZED TATA MOTORS DEALER
//             </div>
//             <div className="hidden sm:block w-px h-4 bg-white/20" />
//             <div className="flex items-center gap-4">
//               <span>15+ Years of Trust</span>
//               <span className="w-1 h-1 rounded-full bg-white/30" />
//               <span>5000+ Happy Customers</span>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* 4. FLOATING BOTTOM NAVIGATION */}
//       <motion.div 
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.8, duration: 0.6 }}
//         className="fixed sm:absolute bottom-0 sm:bottom-8 left-0 sm:left-1/2 sm:-translate-x-1/2 w-full sm:w-auto z-40"
//       >
//         <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-6 px-4 sm:px-8 py-3 sm:py-4 bg-black/40 sm:bg-white/5 backdrop-blur-xl sm:border border-white/10 sm:rounded-2xl">
//           {[
//             { icon: Car, label: "Cars", href: "#cars" },
//             { icon: Calendar, label: "Test Drive", href: "#test-drive" },
//             { icon: Phone, label: "Call Us", href: "tel:+1234567890" },
//             { icon: MapPin, label: "Location", href: "#location" },
//           ].map((item, i) => (
//             <a 
//               key={i} 
//               href={item.href}
//               className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-white/70 hover:text-white transition-colors p-2 sm:p-0"
//             >
//               <item.icon size={18} strokeWidth={1.5} />
//               <span className="text-[10px] sm:text-sm font-medium">{item.label}</span>
//             </a>
//           ))}
//         </div>
//       </motion.div>

//       {/* 5. VIDEO CONTROLS */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1 }}
//         className="absolute bottom-24 sm:bottom-12 right-6 sm:right-12 z-30 flex items-center gap-4"
//       >
//         <button 
//           onClick={togglePlay}
//           className="flex items-center gap-2 text-xs font-medium tracking-widest text-white/60 hover:text-white transition-colors uppercase"
//         >
//           <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-white/40'}`} />
//           {isPlaying ? 'Playing' : 'Paused'}
//         </button>
//         <div className="w-px h-4 bg-white/20" />
//         <button 
//           onClick={toggleMute}
//           className="text-white/60 hover:text-white transition-colors p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
//         >
//           {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
//         </button>
//       </motion.div>

//       {/* 6. SCROLL INDICATOR */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.2 }}
//         className="absolute bottom-28 sm:bottom-12 left-[8%] z-30 hidden sm:flex flex-col items-center gap-3"
//       >
//         <span className="text-[10px] uppercase tracking-[0.2em] text-white/50" style={{ writingMode: 'vertical-rl' }}>
//           Scroll to explore
//         </span>
//         <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
//           <motion.div 
//             animate={{ y: ["-100%", "200%"] }}
//             transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
//             className="absolute top-0 left-0 w-full h-1/2 bg-white"
//           />
//         </div>
//       </motion.div>

//     </section>
//   );
// }

















// "use client";

// import {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   type FormEvent,
// } from "react";
// import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
// import { ArrowRight, CheckCircle2, Phone, MessageCircle } from "lucide-react";

// // ─── TRACKING ─────────────────────────────────────────────────────────────────
// // Thin wrappers around fbq so nothing else in the file needs to know about Meta.
// declare global {
//   interface Window {
//     fbq?: (...args: unknown[]) => void;
//   }
// }

// function track(event: string, params?: Record<string, string>) {
//   if (typeof window !== "undefined" && typeof window.fbq === "function") {
//     window.fbq("track", event, params);
//   }
// }

// const trackViewContent  = (vehicle?: string) => track("ViewContent", { content_name: vehicle ?? "General Offer" });
// const trackGetOffer     = (vehicle?: string) => track("Lead",         { content_name: vehicle ?? "General Offer", source: "GetOfferCTA" });
// const trackTestDrive    = ()                  => track("Lead",         { source: "TestDriveCTA" });
// const trackCall         = ()                  => track("Contact",      { source: "CallCTA" });
// const trackWhatsApp     = ()                  => track("Contact",      { source: "WhatsAppCTA" });

// // ─── TYPES ────────────────────────────────────────────────────────────────────
// export interface OfferHeroProps {
//   /** e.g. "Nexon" — used for WhatsApp copy, headline fallback, pixel events */
//   vehicle?: string;
//   /** Primary headline, first line */
//   headlineLine1?: string;
//   /** Primary headline, second line */
//   headlineLine2?: string;
//   /** Sub-copy below headline */
//   description?: string;
//   /**
//    * Path to an official Tata vehicle PNG/WebP (preferably with transparent bg).
//    * IMPORTANT: use only official Tata Motors or dealership-supplied images.
//    */
//   image: string;
//   /**
//    * Optional campaign video path. Falls back to `image` on error.
//    * Use only official Tata Motors promotional videos.
//    */
//   video?: string;
//   /** Short label shown in the badge, e.g. "EXCLUSIVE NEXON OFFER" */
//   offerLabel?: string;
//   /**
//    * Verified offer value string, e.g. "₹50,000".
//    * Pass `undefined` if no verified figure exists — shows "SPECIAL BENEFITS AVAILABLE".
//    */
//   offerValue?: string;
//   /** Dealership phone number */
//   phone?: string;
//   /** WhatsApp number with country code, digits only */
//   whatsappNumber?: string;
//   /** ID of the lead form / offer section to scroll to */
//   offerSectionId?: string;
//   /** Tata car model names for the quick form dropdown */
//   carModels?: string[];
// }

// // ─── DEFAULTS ─────────────────────────────────────────────────────────────────
// const DEFAULT_MODELS = [
//   "Tata Nexon",
//   "Tata Punch",
//   "Tata Harrier",
//   "Tata Safari",
//   "Tata Curvv",
//   "Tata Altroz",
//   "Tata Tiago",
// ];

// // ─── ANIMATION VARIANTS ───────────────────────────────────────────────────────
// const EASE = [0.16, 1, 0.3, 1] as const;

// const fadeUp = (delay = 0) => ({
//   hidden:  { opacity: 0, y: 22 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } },
// });

// const lineReveal = (delay = 0) => ({
//   hidden:  { y: "105%" },
//   visible: { y: "0%",   transition: { duration: 0.65, ease: EASE, delay } },
// });

// // ─── COMPONENT ────────────────────────────────────────────────────────────────
// export default function OfferHero({
//   vehicle,
//   headlineLine1,
//   headlineLine2,
//   description = "Explore exciting benefits on selected Tata cars at Garud Tata. Submit your details and our team will get in touch with you.",
//   image,
//   video,
//   offerLabel,
//   offerValue,
//   phone = "+919876543210",
//   whatsappNumber = "919876543210",
//   offerSectionId = "offer-form",
//   carModels = DEFAULT_MODELS,
// }: OfferHeroProps) {
//   // ── Derived copy ─────────────────────────────────────────────────────────
//   const displayVehicle = vehicle ? `Tata ${vehicle}` : undefined;
//   const hl1 = headlineLine1 ?? (vehicle ? `Drive Home Your` : "Drive Home");
//   const hl2 = headlineLine2 ?? (vehicle ? displayVehicle! : "Your Dream Tata.");
//   const badgeLabel = offerLabel ?? (vehicle ? `EXCLUSIVE ${vehicle.toUpperCase()} OFFER` : "EXCLUSIVE OFFER");
//   const waMessage = vehicle
//     ? `Hi Garud Tata, I am interested in the Tata ${vehicle} offer. Please share the details.`
//     : `Hi Garud Tata, I am interested in the latest Tata car offers. Please share the current offers.`;
//   const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`;

//   // ── Video fallback ────────────────────────────────────────────────────────
//   const [videoError, setVideoError] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (videoRef.current && video && !videoError) {
//       videoRef.current.play().catch(() => setVideoError(true));
//     }
//   }, [video, videoError]);

//   // ── Track ViewContent on mount ────────────────────────────────────────────
//   useEffect(() => {
//     trackViewContent(vehicle);
//   }, [vehicle]);

//   // ── Smooth scroll ─────────────────────────────────────────────────────────
//   const scrollTo = useCallback((id: string) => {
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//   }, []);

//   // ── Mouse parallax for vehicle image ─────────────────────────────────────
//   const rawX = useMotionValue(0);
//   const rawY = useMotionValue(0);
//   const springX = useSpring(rawX, { stiffness: 60, damping: 20 });
//   const springY = useSpring(rawY, { stiffness: 60, damping: 20 });
//   const moveX = useTransform(springX, [-1, 1], [-8, 8]);
//   const moveY = useTransform(springY, [-1, 1], [-5, 5]);

//   const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

//   const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
//     if (isMobile) return;
//     const { clientX, clientY, currentTarget } = e;
//     const { left, top, width, height } = currentTarget.getBoundingClientRect();
//     rawX.set(((clientX - left) / width) * 2 - 1);
//     rawY.set(((clientY - top) / height) * 2 - 1);
//   }, [isMobile, rawX, rawY]);

//   // ── Quick lead form state ─────────────────────────────────────────────────
//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     car: vehicle ? `Tata ${vehicle}` : "",
//   });
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = useCallback((e: FormEvent) => {
//     e.preventDefault();
//     // Replace with your actual form submission logic / API call
//     trackGetOffer(vehicle);
//     setSubmitted(true);
//     setTimeout(() => scrollTo(offerSectionId), 400);
//   }, [vehicle, offerSectionId, scrollTo]);

//   // ─── RENDER ──────────────────────────────────────────────────────────────
//   return (
//     <>
//       {/* ════════════════════════════════════════════
//           HERO SECTION
//       ════════════════════════════════════════════ */}
//       <section
//         id="hero"
//         className="
//           relative w-full overflow-hidden bg-[#050A12]
//           min-h-[700px] lg:min-h-[720px]
//           h-[100svh] lg:h-[90vh]
//           lg:max-h-[900px]
//         "
//         onMouseMove={handleMouseMove}
//         aria-label="Hero — Garud Tata Exclusive Offers"
//       >
//         {/* ── Background layers ────────────────────────────────── */}
//         <HeroBackground image={image} video={video} videoRef={videoRef} videoError={videoError} onVideoError={() => setVideoError(true)} />

//         {/* ── Main grid ────────────────────────────────────────── */}
//         <div className="
//           relative z-10
//           h-full w-full
//           max-w-[1440px] mx-auto
//           px-5 lg:px-12
//           grid grid-cols-1 lg:grid-cols-[1fr_480px]
//           items-center
//           pt-[80px] pb-[96px] lg:pt-[100px] lg:pb-[60px]
//           gap-6 lg:gap-10
//         ">
//           {/* ── LEFT — Content column ────────────────────────────── */}
//           <div className="flex flex-col justify-center order-1">

//             {/* Campaign badge */}
//             <motion.div
//               variants={fadeUp(0.05)}
//               initial="hidden"
//               animate="visible"
//               className="mb-5 flex flex-col gap-2 items-start"
//             >
//               <span className="
//                 text-[10px] font-bold tracking-[0.28em] text-white/55 uppercase
//               ">
//                 GARUD TATA
//               </span>
//               <span className="
//                 inline-flex items-center gap-2
//                 px-3.5 py-1.5 rounded-full
//                 bg-[#0055A5]/20 border border-[#0055A5]/40
//                 text-[#5BA3E8] text-[11px] font-semibold tracking-[0.16em] uppercase
//               ">
//                 <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8] animate-pulse" />
//                 {badgeLabel}
//               </span>
//             </motion.div>

//             {/* Headline */}
//             <div className="mb-5 overflow-hidden">
//               <div className="overflow-hidden mb-1">
//                 <motion.h1
//                   variants={lineReveal(0.1)}
//                   initial="hidden"
//                   animate="visible"
//                   className="
//                     text-white font-extrabold tracking-tight leading-[1.0]
//                     text-[clamp(2.6rem,6vw,5.5rem)]
//                   "
//                 >
//                   {hl1}
//                 </motion.h1>
//               </div>
//               <div className="overflow-hidden">
//                 <motion.h1
//                   variants={lineReveal(0.18)}
//                   initial="hidden"
//                   animate="visible"
//                   className="
//                     text-white font-extrabold tracking-tight leading-[1.0]
//                     text-[clamp(2.6rem,6vw,5.5rem)]
//                   "
//                 >
//                   {hl2}
//                 </motion.h1>
//               </div>
//             </div>

//             {/* Offer value pill */}
//             <motion.div
//               variants={fadeUp(0.26)}
//               initial="hidden"
//               animate="visible"
//               className="mb-6"
//             >
//               {offerValue ? (
//                 <span className="
//                   inline-block px-4 py-2 rounded-lg
//                   bg-[#0055A5] text-white
//                   text-[13px] font-semibold tracking-[0.06em]
//                 ">
//                   BENEFITS UP TO {offerValue}*
//                 </span>
//               ) : (
//                 <span className="
//                   inline-block px-4 py-2 rounded-lg
//                   bg-white/8 border border-white/15 text-white/75
//                   text-[13px] font-semibold tracking-[0.06em]
//                 ">
//                   SPECIAL BENEFITS AVAILABLE
//                 </span>
//               )}
//             </motion.div>

//             {/* Description */}
//             <motion.p
//               variants={fadeUp(0.32)}
//               initial="hidden"
//               animate="visible"
//               className="
//                 text-white/65 text-[15px] leading-relaxed
//                 max-w-[520px] mb-8
//               "
//             >
//               {description}
//             </motion.p>

//             {/* CTA buttons */}
//             <motion.div
//               variants={fadeUp(0.4)}
//               initial="hidden"
//               animate="visible"
//               className="flex flex-col sm:flex-row gap-3 mb-8"
//             >
//               <button
//                 onClick={() => { trackGetOffer(vehicle); scrollTo(offerSectionId); }}
//                 className="
//                   group flex items-center justify-center gap-2.5
//                   px-7 py-[15px] rounded-full
//                   bg-[#0055A5] hover:bg-[#1E7FE8]
//                   text-white font-bold text-[14px] tracking-[0.06em]
//                   shadow-[0_4px_20px_rgba(0,85,165,0.4)]
//                   hover:shadow-[0_6px_28px_rgba(30,127,232,0.5)]
//                   hover:-translate-y-px
//                   transition-all duration-250
//                 "
//                 aria-label="Get my offer"
//               >
//                 GET MY OFFER
//                 <ArrowRight
//                   size={16}
//                   className="group-hover:translate-x-1 transition-transform duration-200"
//                 />
//               </button>

//               <button
//                 onClick={() => { trackTestDrive(); scrollTo("test-drive"); }}
//                 className="
//                   group flex items-center justify-center gap-2.5
//                   px-7 py-[15px] rounded-full
//                   bg-white/6 backdrop-blur-md
//                   border border-white/25 hover:border-white/45 hover:bg-white/10
//                   text-white font-medium text-[14px] tracking-[0.04em]
//                   hover:-translate-y-px
//                   transition-all duration-250
//                 "
//                 aria-label="Book a test drive"
//               >
//                 BOOK TEST DRIVE
//               </button>
//             </motion.div>

//             {/* Trust indicators */}
//             <motion.div
//               variants={fadeUp(0.48)}
//               initial="hidden"
//               animate="visible"
//               className="flex flex-wrap gap-x-5 gap-y-2"
//             >
//               {[
//                 "Authorized Tata Dealer",
//                 "Multiple Delhi Locations",
//                 "Easy Enquiry",
//               ].map(label => (
//                 <span key={label} className="flex items-center gap-1.5 text-[12px] text-white/55 font-medium">
//                   <CheckCircle2 size={13} className="text-[#0055A5] flex-shrink-0" />
//                   {label}
//                 </span>
//               ))}
//             </motion.div>
//           </div>

//           {/* ── RIGHT — Vehicle + Floating card ──────────────────── */}
//           <div className="
//             relative order-first lg:order-2
//             flex items-center justify-center
//             h-[240px] sm:h-[300px] lg:h-full
//           ">
//             {/* Blue glow behind vehicle */}
//             <div className="
//               absolute inset-0 rounded-full
//               bg-[#0055A5]/18 blur-[80px]
//               scale-90 translate-y-4
//             " />

//             {/* Vehicle image with parallax */}
//             <motion.div
//               style={{ x: moveX, y: moveY }}
//               initial={{ opacity: 0, scale: 0.96 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
//               className="relative z-10 w-full h-full flex items-center justify-center"
//             >
//               {/* Ground shadow */}
//               <div className="
//                 absolute bottom-0 left-1/2 -translate-x-1/2
//                 w-[70%] h-[14px]
//                 bg-[#0055A5]/25 blur-[18px] rounded-full
//               " />
//               <img
//                 src={image}
//                 alt={displayVehicle ?? "Tata car"}
//                 className="
//                   w-full max-w-[520px] lg:max-w-full
//                   h-auto max-h-[320px] lg:max-h-[440px]
//                   object-contain
//                   drop-shadow-[0_20px_60px_rgba(0,85,165,0.22)]
//                 "
//                 draggable={false}
//               />
//             </motion.div>

//             {/* Floating offer card */}
//             <motion.div
//               initial={{ opacity: 0, y: 12, scale: 0.97 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               transition={{ delay: 0.55, duration: 0.5, ease: EASE }}
//               className="
//                 absolute bottom-4 right-0 lg:bottom-8 lg:-right-2
//                 w-[190px]
//                 bg-white/8 backdrop-blur-xl
//                 border border-white/12
//                 rounded-2xl p-4
//                 shadow-[0_8px_32px_rgba(0,0,0,0.3)]
//                 z-20
//               "
//             >
//               <p className="text-[9px] font-bold tracking-[0.2em] text-white/40 mb-1 uppercase">
//                 GARUD TATA
//               </p>
//               <p className="text-white font-semibold text-[13px] leading-tight mb-1">
//                 {offerValue ? `Benefits up to ${offerValue}*` : "Special Benefits"}
//               </p>
//               <p className="text-white/50 text-[11px] mb-3">On selected models</p>
//               <button
//                 onClick={() => { trackGetOffer(vehicle); scrollTo(offerSectionId); }}
//                 className="
//                   flex items-center gap-1.5 text-[11px] font-bold
//                   text-[#5BA3E8] hover:text-white
//                   transition-colors duration-200
//                   group
//                 "
//               >
//                 GET OFFER
//                 <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
//               </button>
//             </motion.div>
//           </div>

//         </div>

//         {/* ── Floating quick lead form — desktop only ───────────── */}
//         <motion.div
//           initial={{ opacity: 0, x: 24 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.7, duration: 0.55, ease: EASE }}
//           className="
//             hidden xl:block
//             absolute right-12 bottom-10
//             w-[280px]
//             bg-[#060C1A]/90 backdrop-blur-2xl
//             border border-white/10
//             rounded-2xl p-5
//             shadow-[0_16px_48px_rgba(0,0,0,0.4)]
//             z-20
//           "
//         >
//           {submitted ? (
//             <div className="py-6 text-center">
//               <CheckCircle2 size={32} className="text-[#0055A5] mx-auto mb-3" />
//               <p className="text-white font-semibold text-[15px]">We'll call you back!</p>
//               <p className="text-white/50 text-[12px] mt-1">Our team will reach out shortly.</p>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} noValidate>
//               <p className="text-white font-bold text-[14px] tracking-[0.05em] mb-4">
//                 GET YOUR OFFER
//               </p>
//               <div className="space-y-3 mb-4">
//                 <div>
//                   <label className="block text-[10px] text-white/40 mb-1 tracking-wider uppercase">Name</label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
//                     placeholder="Your name"
//                     className="
//                       w-full bg-white/6 border border-white/12
//                       rounded-lg px-3 py-2.5 text-white text-[13px]
//                       placeholder:text-white/30
//                       focus:outline-none focus:border-[#0055A5]/60 focus:bg-white/8
//                       transition-colors
//                     "
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-[10px] text-white/40 mb-1 tracking-wider uppercase">Mobile</label>
//                   <input
//                     type="tel"
//                     required
//                     value={formData.mobile}
//                     onChange={e => setFormData(p => ({ ...p, mobile: e.target.value }))}
//                     placeholder="+91 00000 00000"
//                     className="
//                       w-full bg-white/6 border border-white/12
//                       rounded-lg px-3 py-2.5 text-white text-[13px]
//                       placeholder:text-white/30
//                       focus:outline-none focus:border-[#0055A5]/60 focus:bg-white/8
//                       transition-colors
//                     "
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-[10px] text-white/40 mb-1 tracking-wider uppercase">Select Car</label>
//                   <select
//                     value={formData.car}
//                     onChange={e => setFormData(p => ({ ...p, car: e.target.value }))}
//                     className="
//                       w-full bg-white/6 border border-white/12
//                       rounded-lg px-3 py-2.5 text-white text-[13px]
//                       focus:outline-none focus:border-[#0055A5]/60 focus:bg-white/8
//                       transition-colors appearance-none
//                       [&>option]:bg-[#060C1A] [&>option]:text-white
//                     "
//                   >
//                     <option value="">Choose a model</option>
//                     {carModels.map(m => (
//                       <option key={m} value={m}>{m}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="
//                   w-full flex items-center justify-center gap-2
//                   py-3 rounded-xl
//                   bg-[#0055A5] hover:bg-[#1E7FE8]
//                   text-white font-bold text-[13px] tracking-[0.06em]
//                   shadow-[0_4px_16px_rgba(0,85,165,0.35)]
//                   hover:shadow-[0_6px_22px_rgba(30,127,232,0.45)]
//                   transition-all duration-200
//                   group
//                 "
//               >
//                 GET MY OFFER
//                 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//               </button>
//               <p className="text-[10px] text-white/25 mt-3 text-center leading-relaxed">
//                 *Terms apply. Our team will contact you within 24 hrs.
//               </p>
//             </form>
//           )}
//         </motion.div>

//         {/* ── Bottom gradient fade ──────────────────────────────── */}
//         <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#050A12] to-transparent z-10 pointer-events-none" />
//       </section>

//       {/* ════════════════════════════════════════════
//           TRUST STRIP — below hero
//       ════════════════════════════════════════════ */}
//       <TrustStrip />

//       {/* ════════════════════════════════════════════
//           MOBILE STICKY BOTTOM BAR
//           (Same pattern as CampaignNavbar — renders here so OfferHero
//            is self-contained, but you can remove it if CampaignNavbar
//            already provides this.)
//       ════════════════════════════════════════════ */}
//       <div
//         className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
//         style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
//       >
//         <div className="bg-[#060B18]/96 backdrop-blur-xl border-t border-white/10 grid grid-cols-3 h-[72px]">
//           <a
//             href={`tel:${phone}`}
//             onClick={trackCall}
//             className="flex flex-col items-center justify-center gap-1 text-white/60 hover:text-white transition-colors"
//             aria-label={`Call ${phone}`}
//           >
//             <Phone size={19} strokeWidth={1.5} />
//             <span className="text-[9px] uppercase tracking-wider font-semibold">Call</span>
//           </a>
//           <a
//             href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             onClick={trackWhatsApp}
//             className="flex flex-col items-center justify-center gap-1 text-[#25D366]/70 hover:text-[#25D366] transition-colors"
//             aria-label="Chat on WhatsApp"
//           >
//             <MessageCircle size={19} strokeWidth={1.5} />
//             <span className="text-[9px] uppercase tracking-wider font-semibold">WhatsApp</span>
//           </a>
//           <button
//             onClick={() => { trackGetOffer(vehicle); scrollTo(offerSectionId); }}
//             className="flex flex-col items-center justify-center gap-1 bg-[#0055A5] active:bg-[#004494] text-white transition-colors"
//             aria-label="Get your offer"
//           >
//             <ArrowRight size={19} strokeWidth={1.8} />
//             <span className="text-[9px] uppercase tracking-wider font-bold">Get Offer</span>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// // ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

// interface HeroBgProps {
//   image: string;
//   video?: string;
//   videoRef: React.RefObject<HTMLVideoElement | null>;
//   videoError: boolean;
//   onVideoError: () => void;
// }

// function HeroBackground({ image, video, videoRef, videoError, onVideoError }: HeroBgProps) {
//   const useVideo = !!video && !videoError;

//   return (
//     <div className="absolute inset-0 z-0">
//       {/* Dark base */}
//       <div className="absolute inset-0 bg-[#050A12]" />

//       {/* Vehicle / video background — subtle, dark, not competing with content */}
//       {useVideo ? (
//         <video
//           ref={videoRef}
//           src={video}
//           poster={image}
//           autoPlay
//           muted
//           loop
//           playsInline
//           onError={onVideoError}
//           className="absolute inset-0 w-full h-full object-cover object-right opacity-35"
//         />
//       ) : (
//         <img
//           src={image}
//           alt=""
//           aria-hidden="true"
//           className="
//             absolute inset-0 w-full h-full
//             object-cover object-right
//             opacity-15 lg:opacity-0
//             select-none pointer-events-none
//           "
//         />
//       )}

//       {/* Blue ambient glow — right side / vehicle zone */}
//       <div className="
//         absolute top-1/4 right-0 lg:right-[8%]
//         w-[55vw] h-[55vw] max-w-[640px] max-h-[640px]
//         bg-[#0055A5]/14 blur-[120px] rounded-full
//         pointer-events-none
//       " />

//       {/* Dark gradient over text side */}
//       <div className="absolute inset-0 bg-gradient-to-r from-[#050A12] via-[#050A12]/80 to-transparent pointer-events-none" />

//       {/* Bottom fade */}
//       <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050A12] to-transparent pointer-events-none" />

//       {/* Very subtle top fade */}
//       <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#050A12]/60 to-transparent pointer-events-none" />
//     </div>
//   );
// }

// function TrustStrip() {
//   const items = [
//     "Authorized Tata Dealer",
//     "Multiple Showrooms",
//     "Test Drive Available",
//     "Easy Enquiry",
//   ];
//   return (
//     <div className="bg-[#050A12] border-b border-white/6 py-4 px-5 overflow-x-auto">
//       <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-4 flex-wrap">
//         {items.map((item, i) => (
//           <span key={item} className="flex items-center gap-3 text-[11px] text-white/40 font-medium uppercase tracking-[0.14em] whitespace-nowrap">
//             {i > 0 && <span className="text-white/15">•</span>}
//             {item}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }















// "use client";

// import {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   type FormEvent,
// } from "react";
// import { motion } from "framer-motion";
// import { ArrowRight, CheckCircle2, Phone, MessageCircle, Loader2 } from "lucide-react";

// // ─── TRACKING ─────────────────────────────────────────────────────────────────
// declare global {
//   interface Window {
//     fbq?: (...args: unknown[]) => void;
//   }
// }
// function track(event: string, params?: Record<string, string>) {
//   if (typeof window !== "undefined" && typeof window.fbq === "function") {
//     window.fbq("track", event, params);
//   }
// }
// const trackViewContent = (vehicle?: string) => track("ViewContent", { content_name: vehicle ?? "General Offer" });
// const trackGetOffer    = (vehicle?: string) => track("Lead",         { content_name: vehicle ?? "General Offer", source: "GetOfferCTA" });
// const trackTestDrive   = ()                 => track("Lead",         { source: "TestDriveCTA" });
// const trackCall        = ()                 => track("Contact",      { source: "CallCTA" });
// const trackWhatsApp    = ()                 => track("Contact",      { source: "WhatsAppCTA" });

// // ─── TYPES ────────────────────────────────────────────────────────────────────
// export interface OfferHeroProps {
//   vehicle?: string;
//   headlineLine1?: string;
//   headlineLine2?: string;
//   description?: string;
//   offerLabel?: string;
//   offerValue?: string;
//   phone?: string;
//   whatsappNumber?: string;
//   offerSectionId?: string;
//   carModels?: string[];
// }

// const DEFAULT_MODELS = [
//   "Tata Nexon",
//   "Tata Punch",
//   "Tata Harrier",
//   "Tata Safari",
//   "Tata Curvv",
//   "Tata Altroz",
//   "Tata Tiago",
// ];

// const EASE = [0.16, 1, 0.3, 1] as const;

// const fadeUp = (delay = 0) => ({
//   hidden:  { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } },
// });

// const lineReveal = (delay = 0) => ({
//   hidden:  { y: "108%" },
//   visible: { y: "0%",   transition: { duration: 0.7, ease: EASE, delay } },
// });

// // ─── COMPONENT ────────────────────────────────────────────────────────────────
// export default function OfferHero({
//   vehicle,
//   headlineLine1,
//   headlineLine2,
//   description = "Explore exciting benefits on selected Tata cars at Garud Tata. Submit your details and our team will get in touch with you.",
//   offerLabel,
//   offerValue,
//   phone = "+919876543210",
//   whatsappNumber = "919876543210",
//   offerSectionId = "offer-form",
//   carModels = DEFAULT_MODELS,
// }: OfferHeroProps) {
//   const displayVehicle = vehicle ? `Tata ${vehicle}` : undefined;
//   const hl1 = headlineLine1 ?? (vehicle ? `Drive Home Your` : "Drive Home");
//   const hl2 = headlineLine2 ?? (vehicle ? displayVehicle! : "Your Dream Tata.");
//   const badgeLabel = offerLabel ?? (vehicle ? `EXCLUSIVE ${vehicle.toUpperCase()} OFFER` : "EXCLUSIVE OFFER");
//   const waMessage = vehicle
//     ? `Hi Garud Tata, I am interested in the Tata ${vehicle} offer. Please share the details.`
//     : `Hi Garud Tata, I am interested in the latest Tata car offers. Please share the current offers.`;

//   useEffect(() => { trackViewContent(vehicle); }, [vehicle]);

//   const scrollTo = useCallback((id: string) => {
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//   }, []);

//   // ── Quick lead form state ─────────────────────────────────────────────────
//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     car: vehicle ? `Tata ${vehicle}` : "",
//   });
//   const [submitted, setSubmitted]   = useState(false);
//   const [loading, setLoading]       = useState(false);
//   const [formError, setFormError]   = useState("");

//   const handleSubmit = useCallback(async (e: FormEvent) => {
//     e.preventDefault();
//     setFormError("");

//     if (!formData.name.trim()) { setFormError("Please enter your name."); return; }
//     if (formData.mobile.replace(/\D/g, "").length < 10) { setFormError("Please enter a valid mobile number."); return; }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/enquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, source: "hero-form" }),
//       });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error ?? "Submission failed.");
//       }
//       trackGetOffer(vehicle);
//       setSubmitted(true);
//       setTimeout(() => scrollTo(offerSectionId), 400);
//     } catch (err: unknown) {
//       setFormError(err instanceof Error ? err.message : "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   }, [formData, vehicle, offerSectionId, scrollTo]);

//   return (
//     <>
//       {/* ════════════════════════════════════════════
//           HERO SECTION — text-only, no vehicle image
//       ════════════════════════════════════════════ */}
//       <section
//         id="hero"
//         className="
//           relative w-full overflow-hidden bg-[#050A12]
//           min-h-[680px]
//           flex items-center
//         "
//         aria-label="Hero — Garud Tata Exclusive Offers"
//       >
//         {/* ── Animated background ──────────────────────────────── */}
//         <HeroBackground />

//         {/* ── Content ──────────────────────────────────────────── */}
//         <div className="
//           relative z-10
//           w-full max-w-[1440px] mx-auto
//           px-5 lg:px-16
//           py-[120px] lg:py-[140px]
//           grid grid-cols-1 xl:grid-cols-[1fr_320px]
//           gap-10 xl:gap-16
//           items-center
//         ">
//           {/* LEFT — hero copy */}
//           <div className="flex flex-col max-w-[720px]">

//             {/* Badge row */}
//             <motion.div
//               variants={fadeUp(0.05)}
//               initial="hidden"
//               animate="visible"
//               className="mb-6 flex items-center gap-3 flex-wrap"
//             >
//               <span className="text-[10px] font-bold tracking-[0.28em] text-white/40 uppercase">
//                 GARUD TATA · NEW DELHI
//               </span>
//               <span className="
//                 inline-flex items-center gap-2
//                 px-3.5 py-1.5 rounded-full
//                 bg-[#0055A5]/20 border border-[#0055A5]/40
//                 text-[#5BA3E8] text-[11px] font-semibold tracking-[0.16em] uppercase
//               ">
//                 <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8] animate-pulse" />
//                 {badgeLabel}
//               </span>
//             </motion.div>

//             {/* Headline */}
//             <div className="mb-7">
//               <div className="overflow-hidden mb-1">
//                 <motion.h1
//                   variants={lineReveal(0.1)}
//                   initial="hidden"
//                   animate="visible"
//                   className="
//                     font-extrabold tracking-tight leading-[1.0]
//                     text-[clamp(3rem,6.5vw,6rem)]
//                     text-white
//                   "
//                 >
//                   {hl1}
//                 </motion.h1>
//               </div>
//               <div className="overflow-hidden">
//                 <motion.h1
//                   variants={lineReveal(0.18)}
//                   initial="hidden"
//                   animate="visible"
//                   className="
//                     font-extrabold tracking-tight leading-[1.0]
//                     text-[clamp(3rem,6.5vw,6rem)]
//                     bg-gradient-to-r from-white via-[#A8CAFF] to-[#5BA3E8]
//                     bg-clip-text text-transparent
//                   "
//                 >
//                   {hl2}
//                 </motion.h1>
//               </div>
//             </div>

//             {/* Offer value pill */}
//             <motion.div variants={fadeUp(0.26)} initial="hidden" animate="visible" className="mb-6">
//               {offerValue ? (
//                 <span className="
//                   inline-block px-5 py-2.5 rounded-xl
//                   bg-[#0055A5] text-white
//                   text-[14px] font-bold tracking-[0.06em]
//                   shadow-[0_4px_24px_rgba(0,85,165,0.5)]
//                 ">
//                   BENEFITS UP TO {offerValue}*
//                 </span>
//               ) : (
//                 <span className="
//                   inline-block px-5 py-2.5 rounded-xl
//                   bg-white/8 border border-white/15 text-white/70
//                   text-[13px] font-semibold tracking-[0.06em]
//                 ">
//                   SPECIAL BENEFITS AVAILABLE
//                 </span>
//               )}
//             </motion.div>

//             {/* Description */}
//             <motion.p
//               variants={fadeUp(0.32)}
//               initial="hidden"
//               animate="visible"
//               className="text-white/55 text-[16px] leading-relaxed max-w-[540px] mb-9"
//             >
//               {description}
//             </motion.p>

//             {/* CTA buttons */}
//             <motion.div
//               variants={fadeUp(0.4)}
//               initial="hidden"
//               animate="visible"
//               className="flex flex-col sm:flex-row gap-3 mb-9"
//             >
//               <button
//                 onClick={() => { trackGetOffer(vehicle); scrollTo(offerSectionId); }}
//                 className="
//                   group flex items-center justify-center gap-2.5
//                   px-8 py-[16px] rounded-full
//                   bg-[#0055A5] hover:bg-[#1E7FE8]
//                   text-white font-bold text-[14px] tracking-[0.06em]
//                   shadow-[0_4px_24px_rgba(0,85,165,0.45)]
//                   hover:shadow-[0_8px_32px_rgba(30,127,232,0.55)]
//                   hover:-translate-y-0.5
//                   transition-all duration-250
//                 "
//               >
//                 GET MY OFFER
//                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
//               </button>

//               <button
//                 onClick={() => { trackTestDrive(); scrollTo("test-drive"); }}
//                 className="
//                   group flex items-center justify-center gap-2.5
//                   px-8 py-[16px] rounded-full
//                   bg-white/6 backdrop-blur-md
//                   border border-white/20 hover:border-white/40 hover:bg-white/10
//                   text-white font-medium text-[14px] tracking-[0.04em]
//                   hover:-translate-y-0.5
//                   transition-all duration-250
//                 "
//               >
//                 BOOK TEST DRIVE
//               </button>
//             </motion.div>

//             {/* Trust indicators */}
//             <motion.div
//               variants={fadeUp(0.48)}
//               initial="hidden"
//               animate="visible"
//               className="flex flex-wrap gap-x-6 gap-y-2"
//             >
//               {[
//                 "Authorized Tata Dealer",
//                 "Multiple Delhi Locations",
//                 "Easy Enquiry",
//               ].map(label => (
//                 <span key={label} className="flex items-center gap-1.5 text-[12px] text-white/45 font-medium">
//                   <CheckCircle2 size={13} className="text-[#0055A5] flex-shrink-0" />
//                   {label}
//                 </span>
//               ))}
//             </motion.div>
//           </div>

//           {/* RIGHT — Quick lead form (visible from xl, inline) */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
//             className="hidden xl:block"
//           >
//             <LeadForm
//               formData={formData}
//               setFormData={setFormData}
//               onSubmit={handleSubmit}
//               submitted={submitted}
//               loading={loading}
//               error={formError}
//               carModels={carModels}
//             />
//           </motion.div>
//         </div>

//         {/* ── Bottom gradient ───────────────────────────────────── */}
//         <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050A12] to-transparent z-10 pointer-events-none" />
//       </section>

//       {/* ════════════════════════════════════════════
//           TRUST STRIP
//       ════════════════════════════════════════════ */}
//       <TrustStrip />

//       {/* ════════════════════════════════════════════
//           MOBILE STICKY BOTTOM BAR
//       ════════════════════════════════════════════ */}
//       <div
//         className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
//         style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
//       >
//         <div className="bg-[#060B18]/96 backdrop-blur-xl border-t border-white/10 grid grid-cols-3 h-[72px]">
//           <a
//             href={`tel:${phone}`}
//             onClick={trackCall}
//             className="flex flex-col items-center justify-center gap-1 text-white/60 hover:text-white transition-colors"
//             aria-label={`Call ${phone}`}
//           >
//             <Phone size={19} strokeWidth={1.5} />
//             <span className="text-[9px] uppercase tracking-wider font-semibold">Call</span>
//           </a>
//           <a
//             href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             onClick={trackWhatsApp}
//             className="flex flex-col items-center justify-center gap-1 text-[#25D366]/70 hover:text-[#25D366] transition-colors"
//             aria-label="Chat on WhatsApp"
//           >
//             <MessageCircle size={19} strokeWidth={1.5} />
//             <span className="text-[9px] uppercase tracking-wider font-semibold">WhatsApp</span>
//           </a>
//           <button
//             onClick={() => { trackGetOffer(vehicle); scrollTo(offerSectionId); }}
//             className="flex flex-col items-center justify-center gap-1 bg-[#0055A5] active:bg-[#004494] text-white transition-colors"
//           >
//             <ArrowRight size={19} strokeWidth={1.8} />
//             <span className="text-[9px] uppercase tracking-wider font-bold">Get Offer</span>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// // ─── BACKGROUND — pure CSS animated gradient, no images ───────────────────────
// function HeroBackground() {
//   return (
//     <div className="absolute inset-0 z-0 overflow-hidden">
//       {/* Base */}
//       <div className="absolute inset-0 bg-[#050A12]" />

//       {/* Large radial blue glow — centre-left */}
//       <div className="
//         absolute -top-[10%] -left-[5%]
//         w-[70vw] h-[70vw] max-w-[900px] max-h-[900px]
//         rounded-full
//         bg-[#0055A5]/12 blur-[140px]
//         pointer-events-none
//       " />

//       {/* Smaller accent glow — right */}
//       <div className="
//         absolute top-[20%] right-[-5%]
//         w-[40vw] h-[40vw] max-w-[560px] max-h-[560px]
//         rounded-full
//         bg-[#1E7FE8]/8 blur-[110px]
//         pointer-events-none
//       " />

//       {/* Bottom glow */}
//       <div className="
//         absolute bottom-[-10%] left-1/2 -translate-x-1/2
//         w-[60vw] h-[30vw]
//         bg-[#0055A5]/10 blur-[100px]
//         pointer-events-none
//       " />

//       {/* Very subtle noise / grid overlay */}
//       <div
//         className="absolute inset-0 opacity-[0.025] pointer-events-none"
//         style={{
//           backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
//                             linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
//           backgroundSize: "60px 60px",
//         }}
//       />

//       {/* Top gradient fade */}
//       <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050A12] to-transparent pointer-events-none" />
//     </div>
//   );
// }

// // ─── LEAD FORM ────────────────────────────────────────────────────────────────
// interface LeadFormProps {
//   formData: { name: string; mobile: string; car: string };
//   setFormData: React.Dispatch<React.SetStateAction<{ name: string; mobile: string; car: string }>>;
//   onSubmit: (e: FormEvent) => void;
//   submitted: boolean;
//   loading: boolean;
//   error: string;
//   carModels: string[];
// }

// function LeadForm({ formData, setFormData, onSubmit, submitted, loading, error, carModels }: LeadFormProps) {
//   const inputCls = `
//     w-full bg-white/6 border border-white/12
//     rounded-xl px-4 py-3 text-white text-[13px]
//     placeholder:text-white/25
//     focus:outline-none focus:border-[#0055A5]/70 focus:bg-white/9
//     transition-colors duration-150
//   `;

//   return (
//     <div className="
//       bg-[#060C1A]/80 backdrop-blur-2xl
//       border border-white/10
//       rounded-2xl p-6
//       shadow-[0_20px_60px_rgba(0,0,0,0.5)]
//     ">
//       {submitted ? (
//         <div className="py-8 text-center">
//           <CheckCircle2 size={36} className="text-[#0055A5] mx-auto mb-3" />
//           <p className="text-white font-bold text-[16px]">We'll call you back!</p>
//           <p className="text-white/45 text-[13px] mt-1.5 leading-relaxed">
//             Our team will reach out within 24 hours.
//           </p>
//         </div>
//       ) : (
//         <form onSubmit={onSubmit} noValidate>
//           <p className="text-white font-bold text-[15px] tracking-[0.05em] mb-5">
//             GET YOUR OFFER
//           </p>

//           <div className="space-y-3.5 mb-5">
//             <div>
//               <label className="block text-[10px] text-white/35 mb-1.5 tracking-widest uppercase">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
//                 placeholder="Your full name"
//                 className={inputCls}
//               />
//             </div>

//             <div>
//               <label className="block text-[10px] text-white/35 mb-1.5 tracking-widest uppercase">
//                 Mobile
//               </label>
//               <input
//                 type="tel"
//                 required
//                 value={formData.mobile}
//                 onChange={e => setFormData(p => ({ ...p, mobile: e.target.value }))}
//                 placeholder="+91 00000 00000"
//                 className={inputCls}
//               />
//             </div>

//             <div>
//               <label className="block text-[10px] text-white/35 mb-1.5 tracking-widest uppercase">
//                 Car of Interest
//               </label>
//               <select
//                 value={formData.car}
//                 onChange={e => setFormData(p => ({ ...p, car: e.target.value }))}
//                 className={`${inputCls} appearance-none [&>option]:bg-[#060C1A] [&>option]:text-white`}
//               >
//                 <option value="">Choose a model</option>
//                 {carModels.map(m => (
//                   <option key={m} value={m}>{m}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {error && (
//             <p className="text-red-400 text-[12px] mb-3 leading-snug">{error}</p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="
//               w-full flex items-center justify-center gap-2
//               py-3.5 rounded-xl
//               bg-[#0055A5] hover:bg-[#1E7FE8]
//               disabled:opacity-60 disabled:cursor-not-allowed
//               text-white font-bold text-[13px] tracking-[0.06em]
//               shadow-[0_4px_18px_rgba(0,85,165,0.4)]
//               hover:shadow-[0_8px_24px_rgba(30,127,232,0.5)]
//               transition-all duration-200 group
//             "
//           >
//             {loading ? (
//               <Loader2 size={16} className="animate-spin" />
//             ) : (
//               <>
//                 GET MY OFFER
//                 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//               </>
//             )}
//           </button>

//           <p className="text-[10px] text-white/20 mt-3.5 text-center leading-relaxed">
//             *T&C apply. Our team will contact you within 24 hrs.
//           </p>
//         </form>
//       )}
//     </div>
//   );
// }

// // ─── TRUST STRIP ─────────────────────────────────────────────────────────────
// function TrustStrip() {
//   const items = [
//     "Authorized Tata Dealer",
//     "Multiple Showrooms",
//     "Test Drive Available",
//     "Easy Enquiry",
//   ];
//   return (
//     <div className="bg-[#050A12] border-b border-white/6 py-4 px-5 overflow-x-auto">
//       <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-4 flex-wrap">
//         {items.map((item, i) => (
//           <span key={item} className="flex items-center gap-3 text-[11px] text-white/35 font-medium uppercase tracking-[0.14em] whitespace-nowrap">
//             {i > 0 && <span className="text-white/12">•</span>}
//             {item}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }
















// "use client";

// import {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   type FormEvent,
// } from "react";
// import { motion } from "framer-motion";
// import { ArrowRight, CheckCircle2, Phone, MessageCircle, Loader2 } from "lucide-react";

// // ─── TRACKING ─────────────────────────────────────────────────────────────────
// declare global {
//   interface Window {
//     fbq?: (...args: unknown[]) => void;
//   }
// }
// function track(event: string, params?: Record<string, string>) {
//   if (typeof window !== "undefined" && typeof window.fbq === "function") {
//     window.fbq("track", event, params);
//   }
// }
// const trackViewContent = (vehicle?: string) => track("ViewContent", { content_name: vehicle ?? "General Offer" });
// const trackGetOffer    = (vehicle?: string) => track("Lead",         { content_name: vehicle ?? "General Offer", source: "GetOfferCTA" });
// const trackTestDrive   = ()                 => track("Lead",         { source: "TestDriveCTA" });
// const trackCall        = ()                 => track("Contact",      { source: "CallCTA" });
// const trackWhatsApp    = ()                 => track("Contact",      { source: "WhatsAppCTA" });

// // ─── TYPES ────────────────────────────────────────────────────────────────────
// export interface OfferHeroProps {
//   vehicle?: string;
//   headlineLine1?: string;
//   headlineLine2?: string;
//   description?: string;
//   offerLabel?: string;
//   offerValue?: string;
//   phone?: string;
//   whatsappNumber?: string;
//   offerSectionId?: string;
//   carModels?: string[];
// }

// const DEFAULT_MODELS = [
//   "Tata Nexon",
//   "Tata Punch",
//   "Tata Harrier",
//   "Tata Safari",
//   "Tata Curvv",
//   "Tata Altroz",
//   "Tata Tiago",
// ];

// const EASE = [0.16, 1, 0.3, 1] as const;

// const fadeUp = (delay = 0) => ({
//   hidden:  { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } },
// });

// const lineReveal = (delay = 0) => ({
//   hidden:  { y: "108%" },
//   visible: { y: "0%",   transition: { duration: 0.7, ease: EASE, delay } },
// });

// // ─── COMPONENT ────────────────────────────────────────────────────────────────
// export default function OfferHero({
//   vehicle,
//   headlineLine1,
//   headlineLine2,
//   description = "Explore exciting benefits on selected Tata cars at Garud Tata. Submit your details and our team will get in touch with you.",
//   offerLabel,
//   offerValue,
//   phone = "+919876543210",
//   whatsappNumber = "919876543210",
//   offerSectionId = "offer-form",
//   carModels = DEFAULT_MODELS,
// }: OfferHeroProps) {
//   const displayVehicle = vehicle ? `Tata ${vehicle}` : undefined;
//   const hl1 = headlineLine1 ?? (vehicle ? `Drive Home Your` : "Drive Home");
//   const hl2 = headlineLine2 ?? (vehicle ? displayVehicle! : "Your Dream Tata.");
//   const badgeLabel = offerLabel ?? (vehicle ? `EXCLUSIVE ${vehicle.toUpperCase()} OFFER` : "EXCLUSIVE OFFER");
//   const waMessage = vehicle
//     ? `Hi Garud Tata, I am interested in the Tata ${vehicle} offer. Please share the details.`
//     : `Hi Garud Tata, I am interested in the latest Tata car offers. Please share the current offers.`;

//   useEffect(() => { trackViewContent(vehicle); }, [vehicle]);

//   const scrollTo = useCallback((id: string) => {
//     document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
//   }, []);

//   // ── Quick lead form state ─────────────────────────────────────────────────
//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     car: vehicle ? `Tata ${vehicle}` : "",
//   });
//   const [submitted, setSubmitted]   = useState(false);
//   const [loading, setLoading]       = useState(false);
//   const [formError, setFormError]   = useState("");

//   const handleSubmit = useCallback(async (e: FormEvent) => {
//     e.preventDefault();
//     setFormError("");

//     if (!formData.name.trim()) { setFormError("Please enter your name."); return; }
//     if (formData.mobile.replace(/\D/g, "").length < 10) { setFormError("Please enter a valid mobile number."); return; }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/enquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, source: "hero-form" }),
//       });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error ?? "Submission failed.");
//       }
//       trackGetOffer(vehicle);
//       setSubmitted(true);
//       setTimeout(() => scrollTo(offerSectionId), 400);
//     } catch (err: unknown) {
//       setFormError(err instanceof Error ? err.message : "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   }, [formData, vehicle, offerSectionId, scrollTo]);

//   return (
//     <>
//       {/* ════════════════════════════════════════════
//           HERO SECTION — text-only, no vehicle image
//       ════════════════════════════════════════════ */}
//       <section
//         id="hero"
//         className="
//           relative w-full overflow-hidden bg-[#050A12]
//           min-h-[680px]
//           flex items-center
//         "
//         aria-label="Hero — Garud Tata Exclusive Offers"
//       >
//         {/* ── Animated background ──────────────────────────────── */}
//         <HeroBackground />

//         {/* ── Content ──────────────────────────────────────────── */}
//         <div className="
//           relative z-10
//           w-full max-w-[1440px] mx-auto
//           px-5 lg:px-16
//           py-[120px] lg:py-[140px]
//           grid grid-cols-1 xl:grid-cols-[1fr_320px]
//           gap-10 xl:gap-16
//           items-center
//         ">
//           {/* LEFT — hero copy */}
//           <div className="flex flex-col max-w-[720px]">

//             {/* Badge row */}
//             <motion.div
//               variants={fadeUp(0.05)}
//               initial="hidden"
//               animate="visible"
//               className="mb-6 flex items-center gap-3 flex-wrap"
//             >
//               <span className="text-[10px] font-bold tracking-[0.28em] text-white/40 uppercase">
//                 GARUD TATA · NEW DELHI
//               </span>
//               <span className="
//                 inline-flex items-center gap-2
//                 px-3.5 py-1.5 rounded-full
//                 bg-[#0055A5]/20 border border-[#0055A5]/40
//                 text-[#5BA3E8] text-[11px] font-semibold tracking-[0.16em] uppercase
//               ">
//                 <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8] animate-pulse" />
//                 {badgeLabel}
//               </span>
//             </motion.div>

//             {/* Headline */}
//             <div className="mb-7">
//               <div className="overflow-hidden mb-1">
//                 <motion.h1
//                   variants={lineReveal(0.1)}
//                   initial="hidden"
//                   animate="visible"
//                   className="
//                     font-extrabold tracking-tight leading-[1.0]
//                     text-[clamp(3rem,6.5vw,6rem)]
//                     text-white
//                   "
//                 >
//                   {hl1}
//                 </motion.h1>
//               </div>
//               <div className="overflow-hidden">
//                 <motion.h1
//                   variants={lineReveal(0.18)}
//                   initial="hidden"
//                   animate="visible"
//                   className="
//                     font-extrabold tracking-tight leading-[1.0]
//                     text-[clamp(3rem,6.5vw,6rem)]
//                     bg-gradient-to-r from-white via-[#A8CAFF] to-[#5BA3E8]
//                     bg-clip-text text-transparent
//                   "
//                 >
//                   {hl2}
//                 </motion.h1>
//               </div>
//             </div>

//             {/* Offer value pill */}
//             <motion.div variants={fadeUp(0.26)} initial="hidden" animate="visible" className="mb-6">
//               {offerValue ? (
//                 <span className="
//                   inline-block px-5 py-2.5 rounded-xl
//                   bg-[#0055A5] text-white
//                   text-[14px] font-bold tracking-[0.06em]
//                   shadow-[0_4px_24px_rgba(0,85,165,0.5)]
//                 ">
//                   BENEFITS UP TO {offerValue}*
//                 </span>
//               ) : (
//                 <span className="
//                   inline-block px-5 py-2.5 rounded-xl
//                   bg-white/8 border border-white/15 text-white/70
//                   text-[13px] font-semibold tracking-[0.06em]
//                 ">
//                   SPECIAL BENEFITS AVAILABLE
//                 </span>
//               )}
//             </motion.div>

//             {/* Description */}
//             <motion.p
//               variants={fadeUp(0.32)}
//               initial="hidden"
//               animate="visible"
//               className="text-white/55 text-[16px] leading-relaxed max-w-[540px] mb-9"
//             >
//               {description}
//             </motion.p>

//             {/* CTA buttons */}
//             <motion.div
//               variants={fadeUp(0.4)}
//               initial="hidden"
//               animate="visible"
//               className="flex flex-col sm:flex-row gap-3 mb-9"
//             >
//               <button
//                 onClick={() => { trackGetOffer(vehicle); scrollTo(offerSectionId); }}
//                 className="
//                   group flex items-center justify-center gap-2.5
//                   px-8 py-[16px] rounded-full
//                   bg-[#0055A5] hover:bg-[#1E7FE8]
//                   text-white font-bold text-[14px] tracking-[0.06em]
//                   shadow-[0_4px_24px_rgba(0,85,165,0.45)]
//                   hover:shadow-[0_8px_32px_rgba(30,127,232,0.55)]
//                   hover:-translate-y-0.5
//                   transition-all duration-250
//                 "
//               >
//                 GET MY OFFER
//                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
//               </button>

//               <button
//                 onClick={() => { trackTestDrive(); scrollTo("test-drive"); }}
//                 className="
//                   group flex items-center justify-center gap-2.5
//                   px-8 py-[16px] rounded-full
//                   bg-white/6 backdrop-blur-md
//                   border border-white/20 hover:border-white/40 hover:bg-white/10
//                   text-white font-medium text-[14px] tracking-[0.04em]
//                   hover:-translate-y-0.5
//                   transition-all duration-250
//                 "
//               >
//                 BOOK TEST DRIVE
//               </button>
//             </motion.div>

//             {/* Trust indicators */}
//             <motion.div
//               variants={fadeUp(0.48)}
//               initial="hidden"
//               animate="visible"
//               className="flex flex-wrap gap-x-6 gap-y-2"
//             >
//               {[
//                 "Authorized Tata Dealer",
//                 "Multiple Delhi Locations",
//                 "Easy Enquiry",
//               ].map(label => (
//                 <span key={label} className="flex items-center gap-1.5 text-[12px] text-white/45 font-medium">
//                   <CheckCircle2 size={13} className="text-[#0055A5] flex-shrink-0" />
//                   {label}
//                 </span>
//               ))}
//             </motion.div>
//           </div>

//           {/* RIGHT — Quick lead form (visible from xl, inline) */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
//             className="hidden xl:block"
//           >
//             <LeadForm
//               formData={formData}
//               setFormData={setFormData}
//               onSubmit={handleSubmit}
//               submitted={submitted}
//               loading={loading}
//               error={formError}
//               carModels={carModels}
//             />
//           </motion.div>
//         </div>

//         {/* ── Bottom gradient ───────────────────────────────────── */}
//         <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050A12] to-transparent z-10 pointer-events-none" />
//       </section>

//       {/* ════════════════════════════════════════════
//           TRUST STRIP
//       ════════════════════════════════════════════ */}
//       <TrustStrip />

//       {/* ════════════════════════════════════════════
//           MOBILE STICKY BOTTOM BAR
//       ════════════════════════════════════════════ */}
//       <div
//         className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
//         style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
//       >
//         <div className="bg-[#060B18]/96 backdrop-blur-xl border-t border-white/10 grid grid-cols-3 h-[72px]">
//           <a
//             href={`tel:${phone}`}
//             onClick={trackCall}
//             className="flex flex-col items-center justify-center gap-1 text-white/60 hover:text-white transition-colors"
//             aria-label={`Call ${phone}`}
//           >
//             <Phone size={19} strokeWidth={1.5} />
//             <span className="text-[9px] uppercase tracking-wider font-semibold">Call</span>
//           </a>
//           <a
//             href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             onClick={trackWhatsApp}
//             className="flex flex-col items-center justify-center gap-1 text-[#25D366]/70 hover:text-[#25D366] transition-colors"
//             aria-label="Chat on WhatsApp"
//           >
//             <MessageCircle size={19} strokeWidth={1.5} />
//             <span className="text-[9px] uppercase tracking-wider font-semibold">WhatsApp</span>
//           </a>
//           <button
//             onClick={() => { trackGetOffer(vehicle); scrollTo(offerSectionId); }}
//             className="flex flex-col items-center justify-center gap-1 bg-[#0055A5] active:bg-[#004494] text-white transition-colors"
//           >
//             <ArrowRight size={19} strokeWidth={1.8} />
//             <span className="text-[9px] uppercase tracking-wider font-bold">Get Offer</span>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// // ─── BACKGROUND — Sierra image as cinematic full-bleed background ─────────────
// function HeroBackground() {
//   return (
//     <div className="absolute inset-0 z-0 overflow-hidden">
//       {/* Dark base fallback */}
//       <div className="absolute inset-0 bg-[#050A12]" />

//       {/* Sierra hero image — full bleed, right-anchored so car is visible */}
//       <img
//         src="/images/vehicles/sierrakv-3.avif"
//         alt=""
//         aria-hidden="true"
//         className="
//           absolute inset-0 w-full h-full
//           object-cover object-center lg:object-[70%_center]
//           select-none pointer-events-none
//           opacity-60
//         "
//         fetchPriority="high"
//         decoding="async"
//       />

//       {/* Dark overlay — heavier on left so text stays legible */}
//       <div className="absolute inset-0 bg-gradient-to-r from-[#050A12] via-[#050A12]/75 to-[#050A12]/20 pointer-events-none" />

//       {/* Blue colour-grade over image — ties it to brand palette */}
//       <div className="absolute inset-0 bg-[#0055A5]/10 mix-blend-color pointer-events-none" />

//       {/* Subtle blue glow — centre-left, behind text */}
//       <div className="
//         absolute top-[10%] -left-[10%]
//         w-[60vw] h-[60vw] max-w-[700px] max-h-[700px]
//         rounded-full
//         bg-[#0055A5]/15 blur-[130px]
//         pointer-events-none
//       " />

//       {/* Top navbar fade */}
//       <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#050A12]/80 to-transparent pointer-events-none" />

//       {/* Bottom fade into next section */}
//       <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050A12] to-transparent pointer-events-none" />
//     </div>
//   );
// }

// // ─── LEAD FORM ────────────────────────────────────────────────────────────────
// interface LeadFormProps {
//   formData: { name: string; mobile: string; car: string };
//   setFormData: React.Dispatch<React.SetStateAction<{ name: string; mobile: string; car: string }>>;
//   onSubmit: (e: FormEvent) => void;
//   submitted: boolean;
//   loading: boolean;
//   error: string;
//   carModels: string[];
// }

// function LeadForm({ formData, setFormData, onSubmit, submitted, loading, error, carModels }: LeadFormProps) {
//   const inputCls = `
//     w-full bg-white/6 border border-white/12
//     rounded-xl px-4 py-3 text-white text-[13px]
//     placeholder:text-white/25
//     focus:outline-none focus:border-[#0055A5]/70 focus:bg-white/9
//     transition-colors duration-150
//   `;

//   return (
//     <div className="
//       bg-[#060C1A]/80 backdrop-blur-2xl
//       border border-white/10
//       rounded-2xl p-6
//       shadow-[0_20px_60px_rgba(0,0,0,0.5)]
//     ">
//       {submitted ? (
//         <div className="py-8 text-center">
//           <CheckCircle2 size={36} className="text-[#0055A5] mx-auto mb-3" />
//           <p className="text-white font-bold text-[16px]">We'll call you back!</p>
//           <p className="text-white/45 text-[13px] mt-1.5 leading-relaxed">
//             Our team will reach out within 24 hours.
//           </p>
//         </div>
//       ) : (
//         <form onSubmit={onSubmit} noValidate>
//           <p className="text-white font-bold text-[15px] tracking-[0.05em] mb-5">
//             GET YOUR OFFER
//           </p>

//           <div className="space-y-3.5 mb-5">
//             <div>
//               <label className="block text-[10px] text-white/35 mb-1.5 tracking-widest uppercase">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
//                 placeholder="Your full name"
//                 className={inputCls}
//               />
//             </div>

//             <div>
//               <label className="block text-[10px] text-white/35 mb-1.5 tracking-widest uppercase">
//                 Mobile
//               </label>
//               <input
//                 type="tel"
//                 required
//                 value={formData.mobile}
//                 onChange={e => setFormData(p => ({ ...p, mobile: e.target.value }))}
//                 placeholder="+91 00000 00000"
//                 className={inputCls}
//               />
//             </div>

//             <div>
//               <label className="block text-[10px] text-white/35 mb-1.5 tracking-widest uppercase">
//                 Car of Interest
//               </label>
//               <select
//                 value={formData.car}
//                 onChange={e => setFormData(p => ({ ...p, car: e.target.value }))}
//                 className={`${inputCls} appearance-none [&>option]:bg-[#060C1A] [&>option]:text-white`}
//               >
//                 <option value="">Choose a model</option>
//                 {carModels.map(m => (
//                   <option key={m} value={m}>{m}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {error && (
//             <p className="text-red-400 text-[12px] mb-3 leading-snug">{error}</p>
//           )}

//           <button
//             type="submit"
//             disabled={loading}
//             className="
//               w-full flex items-center justify-center gap-2
//               py-3.5 rounded-xl
//               bg-[#0055A5] hover:bg-[#1E7FE8]
//               disabled:opacity-60 disabled:cursor-not-allowed
//               text-white font-bold text-[13px] tracking-[0.06em]
//               shadow-[0_4px_18px_rgba(0,85,165,0.4)]
//               hover:shadow-[0_8px_24px_rgba(30,127,232,0.5)]
//               transition-all duration-200 group
//             "
//           >
//             {loading ? (
//               <Loader2 size={16} className="animate-spin" />
//             ) : (
//               <>
//                 GET MY OFFER
//                 <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//               </>
//             )}
//           </button>

//           <p className="text-[10px] text-white/20 mt-3.5 text-center leading-relaxed">
//             *T&C apply. Our team will contact you within 24 hrs.
//           </p>
//         </form>
//       )}
//     </div>
//   );
// }

// // ─── TRUST STRIP ─────────────────────────────────────────────────────────────
// function TrustStrip() {
//   const items = [
//     "Authorized Tata Dealer",
//     "Multiple Showrooms",
//     "Test Drive Available",
//     "Easy Enquiry",
//   ];
//   return (
//     <div className="bg-[#050A12] border-b border-white/6 py-4 px-5 overflow-x-auto">
//       <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-4 flex-wrap">
//         {items.map((item, i) => (
//           <span key={item} className="flex items-center gap-3 text-[11px] text-white/35 font-medium uppercase tracking-[0.14em] whitespace-nowrap">
//             {i > 0 && <span className="text-white/12">•</span>}
//             {item}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }





















"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type FormEvent,
} from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Phone, MessageCircle, Loader2 } from "lucide-react";

// ─── TRACKING ─────────────────────────────────────────────────────────────────
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
function track(event: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
}
const trackViewContent = (vehicle?: string) => track("ViewContent", { content_name: vehicle ?? "General Offer" });
const trackGetOffer    = (vehicle?: string) => track("Lead",         { content_name: vehicle ?? "General Offer", source: "GetOfferCTA" });
const trackTestDrive   = ()                 => track("Lead",         { source: "TestDriveCTA" });
const trackCall        = ()                 => track("Contact",      { source: "CallCTA" });
const trackWhatsApp    = ()                 => track("Contact",      { source: "WhatsAppCTA" });

// ─── TYPES ────────────────────────────────────────────────────────────────────
export interface OfferHeroProps {
  vehicle?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  description?: string;
  offerLabel?: string;
  offerValue?: string;
  phone?: string;
  whatsappNumber?: string;
  offerSectionId?: string;
  carModels?: string[];
  /**
   * Static image shown instantly while video loads (or as permanent fallback).
   * Defaults to the Sierra keyvisual.
   */
  backgroundImage?: string;
  /**
   * Optional looping promo video. Cross-fades in over the image once
   * the browser has buffered enough to play. Falls back to image on error.
   */
  backgroundVideo?: string;
}

const DEFAULT_MODELS = [
  "Tata Nexon",
  "Tata Punch",
  "Tata Harrier",
  "Tata Safari",
  "Tata Curvv",
  "Tata Altroz",
  "Tata Tiago",
];

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE, delay } },
});

const lineReveal = (delay = 0) => ({
  hidden:  { y: "108%" },
  visible: { y: "0%",   transition: { duration: 0.7, ease: EASE, delay } },
});

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function OfferHero({
  vehicle,
  headlineLine1,
  headlineLine2,
  description = "Explore exciting benefits on selected Tata cars at Garud Tata. Submit your details and our team will get in touch with you.",
  offerLabel,
  offerValue,
  phone = "+919876543210",
  whatsappNumber = "919876543210",
  offerSectionId = "offer-form",
  carModels = DEFAULT_MODELS,
  backgroundImage = "/images/vehicles/sierrakv-3.avif",
  backgroundVideo,
}: OfferHeroProps) {
  const displayVehicle = vehicle ? `Tata ${vehicle}` : undefined;
  const hl1 = headlineLine1 ?? (vehicle ? `Drive Home Your` : "Drive Home");
  const hl2 = headlineLine2 ?? (vehicle ? displayVehicle! : "Your Dream Tata.");
  const badgeLabel = offerLabel ?? (vehicle ? `EXCLUSIVE ${vehicle.toUpperCase()} OFFER` : "EXCLUSIVE OFFER");
  const waMessage = vehicle
    ? `Hi Garud Tata, I am interested in the Tata ${vehicle} offer. Please share the details.`
    : `Hi Garud Tata, I am interested in the latest Tata car offers. Please share the current offers.`;

  useEffect(() => { trackViewContent(vehicle); }, [vehicle]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // ── Quick lead form state ─────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    car: vehicle ? `Tata ${vehicle}` : "",
  });
  const [submitted, setSubmitted]   = useState(false);
  const [loading, setLoading]       = useState(false);
  const [formError, setFormError]   = useState("");

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name.trim()) { setFormError("Please enter your name."); return; }
    if (formData.mobile.replace(/\D/g, "").length < 10) { setFormError("Please enter a valid mobile number."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "hero-form" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Submission failed.");
      }
      trackGetOffer(vehicle);
      setSubmitted(true);
      setTimeout(() => scrollTo(offerSectionId), 400);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [formData, vehicle, offerSectionId, scrollTo]);

  return (
    <>
      {/* ════════════════════════════════════════════
          HERO SECTION — text-only, no vehicle image
      ════════════════════════════════════════════ */}
      <section
        id="hero"
        className="
          relative w-full overflow-hidden bg-[#050A12]
          min-h-[680px]
          flex items-center
        "
        aria-label="Hero — Garud Tata Exclusive Offers"
      >
        {/* ── Cinematic background: image → video crossfade ────── */}
        <HeroBackground image={backgroundImage} video={backgroundVideo} />

        {/* ── Content ──────────────────────────────────────────── */}
        <div className="
          relative z-10
          w-full max-w-[1440px] mx-auto
          px-5 lg:px-16
          py-[120px] lg:py-[140px]
          grid grid-cols-1 xl:grid-cols-[1fr_320px]
          gap-10 xl:gap-16
          items-center
        ">
          {/* LEFT — hero copy */}
          <div className="flex flex-col max-w-[720px]">

            {/* Badge row */}
            <motion.div
              variants={fadeUp(0.05)}
              initial="hidden"
              animate="visible"
              className="mb-6 flex items-center gap-3 flex-wrap"
            >
              <span className="text-[10px] font-bold tracking-[0.28em] text-white/40 uppercase">
                GARUD TATA · NEW DELHI
              </span>
              <span className="
                inline-flex items-center gap-2
                px-3.5 py-1.5 rounded-full
                bg-[#0055A5]/20 border border-[#0055A5]/40
                text-[#5BA3E8] text-[11px] font-semibold tracking-[0.16em] uppercase
              ">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8] animate-pulse" />
                {badgeLabel}
              </span>
            </motion.div>

            {/* Headline */}
            <div className="mb-7">
              <div className="overflow-hidden mb-1">
                <motion.h1
                  variants={lineReveal(0.1)}
                  initial="hidden"
                  animate="visible"
                  className="
                    font-extrabold tracking-tight leading-[1.0]
                    text-[clamp(3rem,6.5vw,6rem)]
                    text-white
                  "
                >
                  {hl1}
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  variants={lineReveal(0.18)}
                  initial="hidden"
                  animate="visible"
                  className="
                    font-extrabold tracking-tight leading-[1.0]
                    text-[clamp(3rem,6.5vw,6rem)]
                    bg-gradient-to-r from-white via-[#A8CAFF] to-[#5BA3E8]
                    bg-clip-text text-transparent
                  "
                >
                  {hl2}
                </motion.h1>
              </div>
            </div>

            {/* Offer value pill */}
            <motion.div variants={fadeUp(0.26)} initial="hidden" animate="visible" className="mb-6">
              {offerValue ? (
                <span className="
                  inline-block px-5 py-2.5 rounded-xl
                  bg-[#0055A5] text-white
                  text-[14px] font-bold tracking-[0.06em]
                  shadow-[0_4px_24px_rgba(0,85,165,0.5)]
                ">
                  BENEFITS UP TO {offerValue}*
                </span>
              ) : (
                <span className="
                  inline-block px-5 py-2.5 rounded-xl
                  bg-white/8 border border-white/15 text-white/70
                  text-[13px] font-semibold tracking-[0.06em]
                ">
                  SPECIAL BENEFITS AVAILABLE
                </span>
              )}
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeUp(0.32)}
              initial="hidden"
              animate="visible"
              className="text-white/55 text-[16px] leading-relaxed max-w-[540px] mb-9"
            >
              {description}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              variants={fadeUp(0.4)}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-3 mb-9"
            >
              <button
                onClick={() => { trackGetOffer(vehicle); scrollTo(offerSectionId); }}
                className="
                  group flex items-center justify-center gap-2.5
                  px-8 py-[16px] rounded-full
                  bg-[#0055A5] hover:bg-[#1E7FE8]
                  text-white font-bold text-[14px] tracking-[0.06em]
                  shadow-[0_4px_24px_rgba(0,85,165,0.45)]
                  hover:shadow-[0_8px_32px_rgba(30,127,232,0.55)]
                  hover:-translate-y-0.5
                  transition-all duration-250
                "
              >
                GET MY OFFER
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>

              <button
                onClick={() => { trackTestDrive(); scrollTo("test-drive"); }}
                className="
                  group flex items-center justify-center gap-2.5
                  px-8 py-[16px] rounded-full
                  bg-white/6 backdrop-blur-md
                  border border-white/20 hover:border-white/40 hover:bg-white/10
                  text-white font-medium text-[14px] tracking-[0.04em]
                  hover:-translate-y-0.5
                  transition-all duration-250
                "
              >
                BOOK TEST DRIVE
              </button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              variants={fadeUp(0.48)}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {[
                "Authorized Tata Dealer",
                "Multiple Delhi Locations",
                "Easy Enquiry",
              ].map(label => (
                <span key={label} className="flex items-center gap-1.5 text-[12px] text-white/45 font-medium">
                  <CheckCircle2 size={13} className="text-[#0055A5] flex-shrink-0" />
                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Quick lead form (visible from xl, inline) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
            className="hidden xl:block"
          >
            <LeadForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              submitted={submitted}
              loading={loading}
              error={formError}
              carModels={carModels}
            />
          </motion.div>
        </div>

        {/* ── Bottom gradient ───────────────────────────────────── */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#050A12] to-transparent z-10 pointer-events-none" />
      </section>

      {/* ════════════════════════════════════════════
          TRUST STRIP
      ════════════════════════════════════════════ */}
      <TrustStrip />

      {/* ════════════════════════════════════════════
          MOBILE STICKY BOTTOM BAR
      ════════════════════════════════════════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="bg-[#060B18]/96 backdrop-blur-xl border-t border-white/10 grid grid-cols-3 h-[72px]">
          <a
            href={`tel:${phone}`}
            onClick={trackCall}
            className="flex flex-col items-center justify-center gap-1 text-white/60 hover:text-white transition-colors"
            aria-label={`Call ${phone}`}
          >
            <Phone size={19} strokeWidth={1.5} />
            <span className="text-[9px] uppercase tracking-wider font-semibold">Call</span>
          </a>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={trackWhatsApp}
            className="flex flex-col items-center justify-center gap-1 text-[#25D366]/70 hover:text-[#25D366] transition-colors"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={19} strokeWidth={1.5} />
            <span className="text-[9px] uppercase tracking-wider font-semibold">WhatsApp</span>
          </a>
          <button
            onClick={() => { trackGetOffer(vehicle); scrollTo(offerSectionId); }}
            className="flex flex-col items-center justify-center gap-1 bg-[#0055A5] active:bg-[#004494] text-white transition-colors"
          >
            <ArrowRight size={19} strokeWidth={1.8} />
            <span className="text-[9px] uppercase tracking-wider font-bold">Get Offer</span>
          </button>
        </div>
      </div>
    </>
  );
}

// ─── BACKGROUND ───────────────────────────────────────────────────────────────
// Technique: image renders immediately (no layout shift, no blank flash).
// Video is stacked on top at opacity-0. Once the browser fires `canplay`
// we cross-fade the video in over ~1.2 s. If the video errors or isn't
// provided, the image stays visible forever — seamless fallback.
interface HeroBgProps {
  image: string;
  video?: string;
}

function HeroBackground({ image, video }: HeroBgProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !video) return;

    // Reset if src changes between campaigns
    setVideoReady(false);

    const onCanPlay = () => {
      el.play().catch(() => {/* autoplay blocked — image stays visible */});
      setVideoReady(true);
    };
    const onError = () => setVideoReady(false);

    el.addEventListener("canplay", onCanPlay, { once: true });
    el.addEventListener("error",   onError,   { once: true });
    return () => {
      el.removeEventListener("canplay", onCanPlay);
      el.removeEventListener("error",   onError);
    };
  }, [video]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">

      {/* ── Layer 0: dark base ─────────────────────────────────── */}
      <div className="absolute inset-0 bg-[#050A12]" />

      {/* ── Layer 1: static image — always present ─────────────
          Shows instantly. Acts as poster for the video.
          Fades out gently once video is playing.
      ───────────────────────────────────────────────────────── */}
      <img
        src={image}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="
          absolute inset-0 w-full h-full
          object-cover object-center lg:object-[68%_center]
          select-none pointer-events-none
          transition-opacity duration-[1200ms] ease-in-out
        "
        style={{ opacity: videoReady ? 0 : 0.62 }}
      />

      {/* ── Layer 2: looping video — cross-fades in over image ──
          Starts invisible, fades to opacity-0.68 once canplay fires.
          Shares the same object-position as the image so the
          composition doesn't jump on transition.
      ───────────────────────────────────────────────────────── */}
      {video && (
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="auto"
          className="
            absolute inset-0 w-full h-full
            object-cover object-center lg:object-[68%_center]
            select-none pointer-events-none
            transition-opacity duration-[1200ms] ease-in-out
          "
          style={{ opacity: videoReady ? 0.62 : 0 }}
        />
      )}

      {/* ── Layer 3: directional dark vignette ─────────────────
          Left-heavy so text column is always legible.
          Right side stays partially transparent to show the car.
      ───────────────────────────────────────────────────────── */}
      <div className="
        absolute inset-0 pointer-events-none
        bg-gradient-to-r
        from-[#050A12]
        via-[#050A12]/70
        to-[#050A12]/15
      " />

      {/* ── Layer 4: bottom scrim — blends into next section ─── */}
      <div className="
        absolute bottom-0 left-0 right-0 h-44
        bg-gradient-to-t from-[#050A12] to-transparent
        pointer-events-none
      " />

      {/* ── Layer 5: top scrim — blends under navbar ─────────── */}
      <div className="
        absolute top-0 left-0 right-0 h-36
        bg-gradient-to-b from-[#050A12]/70 to-transparent
        pointer-events-none
      " />

      {/* ── Layer 6: blue colour-grade — brands the imagery ──── */}
      <div className="
        absolute inset-0 pointer-events-none
        bg-[#0A1628]/30
        mix-blend-multiply
      " />

      {/* ── Layer 7: soft blue glow behind text column ────────── */}
      <div className="
        absolute top-[5%] -left-[8%]
        w-[55vw] h-[55vw] max-w-[680px] max-h-[680px]
        rounded-full
        bg-[#0055A5]/18 blur-[130px]
        pointer-events-none
      " />

    </div>
  );
}

// ─── LEAD FORM ────────────────────────────────────────────────────────────────
interface LeadFormProps {
  formData: { name: string; mobile: string; car: string };
  setFormData: React.Dispatch<React.SetStateAction<{ name: string; mobile: string; car: string }>>;
  onSubmit: (e: FormEvent) => void;
  submitted: boolean;
  loading: boolean;
  error: string;
  carModels: string[];
}

function LeadForm({ formData, setFormData, onSubmit, submitted, loading, error, carModels }: LeadFormProps) {
  const inputCls = `
    w-full bg-white/6 border border-white/12
    rounded-xl px-4 py-3 text-white text-[13px]
    placeholder:text-white/25
    focus:outline-none focus:border-[#0055A5]/70 focus:bg-white/9
    transition-colors duration-150
  `;

  return (
    <div className="
      bg-[#060C1A]/80 backdrop-blur-2xl
      border border-white/10
      rounded-2xl p-6
      shadow-[0_20px_60px_rgba(0,0,0,0.5)]
    ">
      {submitted ? (
        <div className="py-8 text-center">
          <CheckCircle2 size={36} className="text-[#0055A5] mx-auto mb-3" />
          <p className="text-white font-bold text-[16px]">We'll call you back!</p>
          <p className="text-white/45 text-[13px] mt-1.5 leading-relaxed">
            Our team will reach out within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate>
          <p className="text-white font-bold text-[15px] tracking-[0.05em] mb-5">
            GET YOUR OFFER
          </p>

          <div className="space-y-3.5 mb-5">
            <div>
              <label className="block text-[10px] text-white/35 mb-1.5 tracking-widest uppercase">
                Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                placeholder="Your full name"
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-[10px] text-white/35 mb-1.5 tracking-widest uppercase">
                Mobile
              </label>
              <input
                type="tel"
                required
                value={formData.mobile}
                onChange={e => setFormData(p => ({ ...p, mobile: e.target.value }))}
                placeholder="+91 00000 00000"
                className={inputCls}
              />
            </div>

            <div>
              <label className="block text-[10px] text-white/35 mb-1.5 tracking-widest uppercase">
                Car of Interest
              </label>
              <select
                value={formData.car}
                onChange={e => setFormData(p => ({ ...p, car: e.target.value }))}
                className={`${inputCls} appearance-none [&>option]:bg-[#060C1A] [&>option]:text-white`}
              >
                <option value="">Choose a model</option>
                {carModels.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-[12px] mb-3 leading-snug">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full flex items-center justify-center gap-2
              py-3.5 rounded-xl
              bg-[#0055A5] hover:bg-[#1E7FE8]
              disabled:opacity-60 disabled:cursor-not-allowed
              text-white font-bold text-[13px] tracking-[0.06em]
              shadow-[0_4px_18px_rgba(0,85,165,0.4)]
              hover:shadow-[0_8px_24px_rgba(30,127,232,0.5)]
              transition-all duration-200 group
            "
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                GET MY OFFER
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-[10px] text-white/20 mt-3.5 text-center leading-relaxed">
            *T&C apply. Our team will contact you within 24 hrs.
          </p>
        </form>
      )}
    </div>
  );
}

// ─── TRUST STRIP ─────────────────────────────────────────────────────────────
function TrustStrip() {
  const items = [
    "Authorized Tata Dealer",
    "Multiple Showrooms",
    "Test Drive Available",
    "Easy Enquiry",
  ];
  return (
    <div className="bg-[#050A12] border-b border-white/6 py-4 px-5 overflow-x-auto">
      <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-4 flex-wrap">
        {items.map((item, i) => (
          <span key={item} className="flex items-center gap-3 text-[11px] text-white/35 font-medium uppercase tracking-[0.14em] whitespace-nowrap">
            {i > 0 && <span className="text-white/12">•</span>}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}