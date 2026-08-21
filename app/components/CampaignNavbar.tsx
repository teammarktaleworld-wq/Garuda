


// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Phone, Menu, X, ArrowRight, Gift } from "lucide-react";

// // ─── CONFIG ────────────────────────────────────────────────────────────────────
// export interface CampaignNavbarProps {
//   /** Dealership phone number — displayed in UI */
//   phone?: string;
//   /**
//    * Vehicle name for campaign-specific WhatsApp message.
//    * Pass undefined on the root "/" page for a generic message.
//    */
//   vehicle?: string;
//   /** Path to your logo image. Falls back to wordmark text. */
//   logoSrc?: string;
//   /** ID of the offer / lead form section to scroll to on CTA click */
//   offerSectionId?: string;
// }

// const NAV_LINKS = [
//   { label: "Offers",    href: "#offers"    },
//   { label: "Cars",      href: "#cars"      },
//   { label: "Showrooms", href: "#showrooms" },
//   { label: "Service",   href: "#service"   },
//   { label: "Contact",   href: "#contact"   },
// ];

// // ─── COMPONENT ─────────────────────────────────────────────────────────────────
// export default function CampaignNavbar({
//   phone = "9217371205",
//   vehicle,
//   logoSrc = "/images/logo.jpg",
//   offerSectionId = "offer-form",
// }: CampaignNavbarProps) {
//   const [scrolled,    setScrolled]    = useState(false);
//   const [menuOpen,    setMenuOpen]    = useState(false);
//   const [activeLink,  setActiveLink]  = useState<string | null>(null);

//   // ── Scroll detection ──────────────────────────────────────────────────────
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // ── Lock body scroll when mobile menu is open ─────────────────────────────
//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [menuOpen]);

//   // ── Active link via IntersectionObserver ──────────────────────────────────
//   useEffect(() => {
//     const sections = NAV_LINKS.map(l => document.querySelector(l.href));
//     if (sections.every(s => !s)) return;

//     const observer = new IntersectionObserver(
//       entries => {
//         entries.forEach(entry => {
//           if (entry.isIntersecting) setActiveLink(`#${entry.target.id}`);
//         });
//       },
//       { threshold: 0.4 }
//     );

//     sections.forEach(s => s && observer.observe(s));
//     return () => observer.disconnect();
//   }, []);

//   // ── Smooth scroll helper ──────────────────────────────────────────────────
//   const scrollTo = useCallback((id: string) => {
//     const el = document.getElementById(id);
//     if (el) el.scrollIntoView({ behavior: "smooth" });
//     setMenuOpen(false);
//   }, []);

//   // Formatted display number
//   const displayPhone = phone.replace(/(\d{5})(\d{5})/, "$1 $2");

//   // ─── RENDER ────────────────────────────────────────────────────────────────
//   return (
//     <>
//       {/* ════════════════════════════════════════════
//           MAIN NAVBAR — light theme
//       ════════════════════════════════════════════ */}
//       <motion.nav
//         initial={{ y: -100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
//         aria-label="Primary navigation"
//         className={`
//           fixed top-0 left-0 right-0 z-50
//           transition-[height,background,border-color,box-shadow]
//           duration-300 ease-in-out
//           border-b
//           ${scrolled
//             ? "h-[64px] bg-white/95 backdrop-blur-xl border-gray-200/80 shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
//             : "h-[76px] bg-white/85 backdrop-blur-[14px] border-gray-200/50 shadow-[0_1px_0_rgba(0,0,0,0.06)]"
//           }
//         `}
//       >
//         <div className="max-w-[1440px] mx-auto px-5 lg:px-12 h-full flex items-center justify-between gap-6">

//           {/* ── Logo ────────────────────────────────────────────── */}
//           <a
//             href="#"
//             className="relative z-10 flex items-center gap-3 select-none group flex-shrink-0"
//             aria-label="Garud Tata — home"
//           >
//             {logoSrc ? (
//               <img
//                 src={logoSrc}
//                 alt="Garud Tata"
//                 className="
//                   h-[38px] lg:h-[42px]
//                   w-auto
//                   object-contain
//                   transition-opacity duration-300
//                   group-hover:opacity-80
//                 "
//               />
//             ) : (
//               /* Wordmark fallback */
//               <div className="flex flex-col leading-none">
//                 <span className="text-gray-900 font-extrabold tracking-[0.18em] text-[13px] lg:text-[15px]">
//                   GARUD
//                 </span>
//                 <span className="text-[#0055A5] font-bold tracking-[0.14em] text-[10px] lg:text-[11px] mt-[1px]">
//                   TATA MOTORS
//                 </span>
//               </div>
//             )}
//           </a>

//           {/* ── Desktop Navigation ──────────────────────────────── */}
//           <nav
//             aria-label="Site sections"
//             className="hidden lg:flex items-center gap-1 h-full flex-1 justify-center"
//           >
//             {NAV_LINKS.map(link => {
//               const isActive = activeLink === link.href;
//               return (
//                 <a
//                   key={link.label}
//                   href={link.href}
//                   onClick={e => { e.preventDefault(); scrollTo(link.href.slice(1)); }}
//                   className="relative h-full flex items-center px-4 group"
//                   aria-current={isActive ? "page" : undefined}
//                 >
//                   <span className={`
//                     text-[13px] font-medium tracking-[0.03em]
//                     transition-colors duration-200
//                     ${isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900"}
//                   `}>
//                     {link.label}
//                   </span>

//                   {/* Active underline */}
//                   <AnimatePresence>
//                     {isActive && (
//                       <motion.span
//                         layoutId="nav-underline"
//                         className="absolute bottom-[16px] left-4 right-4 h-[2px] rounded-full bg-[#0055A5]"
//                         initial={{ opacity: 0, scaleX: 0 }}
//                         animate={{ opacity: 1, scaleX: 1 }}
//                         exit={{ opacity: 0, scaleX: 0 }}
//                         transition={{ type: "spring", stiffness: 380, damping: 28 }}
//                       />
//                     )}
//                   </AnimatePresence>

//                   {/* Hover underline */}
//                   {!isActive && (
//                     <span className="
//                       absolute bottom-[16px] left-4 right-4 h-[2px] rounded-full
//                       bg-gray-300 scale-x-0 group-hover:scale-x-100
//                       transition-transform duration-200 origin-left
//                     " />
//                   )}
//                 </a>
//               );
//             })}
//           </nav>

//           {/* ── Desktop Action Group ────────────────────────────── */}
//           <div className="hidden lg:flex items-center gap-3 flex-shrink-0">

//             {/* Sales number */}
//             <a
//               href={`tel:${phone}`}
//               className="
//                 group flex items-center gap-2
//                 px-4 py-2.5 rounded-full
//                 border border-gray-200 bg-gray-50
//                 text-gray-700 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-100
//                 text-[13px] font-medium
//                 transition-all duration-200
//               "
//               aria-label={`Call Sales: ${displayPhone}`}
//             >
//               <Phone size={14} className="flex-shrink-0 text-[#0055A5]" strokeWidth={2} />
//               <span>
//                 <span className="text-gray-400 text-[11px] mr-1">Sales</span>
//                 {displayPhone}
//               </span>
//             </a>

//             {/* GET OFFER → */}
//             <button
//               onClick={() => scrollTo(offerSectionId)}
//               className="
//                 group flex items-center gap-2
//                 px-5 py-2.5 rounded-full
//                 bg-[#0055A5] hover:bg-[#1A70D4]
//                 text-white text-[13px] font-semibold tracking-[0.03em]
//                 shadow-[0_4px_16px_rgba(0,85,165,0.28)]
//                 hover:shadow-[0_6px_22px_rgba(0,85,165,0.38)]
//                 hover:-translate-y-px
//                 transition-all duration-200
//               "
//               aria-label="Get your offer"
//             >
//               GET OFFER
//               <ArrowRight
//                 size={14}
//                 className="group-hover:translate-x-1 transition-transform duration-200"
//               />
//             </button>
//           </div>

//           {/* ── Mobile Icons ─────────────────────────────────────── */}
//           <div className="flex lg:hidden items-center gap-1">
//             <a
//               href={`tel:${phone}`}
//               className="p-2.5 text-[#0055A5] hover:text-[#1A70D4] transition-colors"
//               aria-label={`Call Sales ${displayPhone}`}
//             >
//               <Phone size={20} strokeWidth={1.8} />
//             </a>
//             <button
//               onClick={() => setMenuOpen(true)}
//               className="p-2.5 text-gray-700 hover:text-gray-900 transition-colors"
//               aria-label="Open menu"
//               aria-expanded={menuOpen}
//             >
//               <Menu size={22} strokeWidth={1.8} />
//             </button>
//           </div>

//         </div>
//       </motion.nav>

//       {/* ════════════════════════════════════════════
//           MOBILE FULLSCREEN MENU — light theme
//       ════════════════════════════════════════════ */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             key="mobile-menu"
//             initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
//             animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
//             exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
//             transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
//             className="fixed inset-0 z-[80] bg-white flex flex-col lg:hidden overflow-y-auto"
//             role="dialog"
//             aria-modal="true"
//             aria-label="Site navigation"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between px-6 h-[64px] border-b border-gray-100 flex-shrink-0">
//               {logoSrc ? (
//                 <img
//                   src={logoSrc}
//                   alt="Garud Tata"
//                   className="h-[34px] w-auto object-contain"
//                 />
//               ) : (
//                 <span className="text-gray-900 font-extrabold tracking-[0.18em] text-[14px]">
//                   GARUD <span className="text-[#0055A5]">TATA</span>
//                 </span>
//               )}
//               <button
//                 onClick={() => setMenuOpen(false)}
//                 className="p-2 text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
//                 aria-label="Close menu"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             {/* Nav links */}
//             <nav className="flex-1 flex flex-col justify-center px-8 py-10" aria-label="Mobile navigation">
//               {NAV_LINKS.map((link, i) => (
//                 <motion.a
//                   key={link.label}
//                   href={link.href}
//                   onClick={e => { e.preventDefault(); scrollTo(link.href.slice(1)); }}
//                   initial={{ opacity: 0, x: -24 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: i * 0.07 + 0.12, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
//                   className="group flex items-center gap-5 py-4 border-b border-gray-100 last:border-0"
//                 >
//                   <span className="text-[11px] font-mono text-gray-300 group-hover:text-[#0055A5] transition-colors w-6 flex-shrink-0">
//                     0{i + 1}
//                   </span>
//                   <span className="text-[2.2rem] font-semibold text-gray-800 group-hover:text-gray-900 tracking-tight group-hover:translate-x-1.5 transition-all duration-250">
//                     {link.label}
//                   </span>
//                 </motion.a>
//               ))}
//             </nav>

//             {/* Footer CTAs */}
//             <motion.div
//               initial={{ opacity: 0, y: 16 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.45, duration: 0.35 }}
//               className="p-6 space-y-3 pb-[calc(80px+env(safe-area-inset-bottom,0px))] flex-shrink-0"
//             >
//               <button
//                 onClick={() => scrollTo(offerSectionId)}
//                 className="
//                   w-full flex items-center justify-between
//                   px-5 py-4 bg-[#0055A5] hover:bg-[#1A70D4]
//                   rounded-2xl text-white font-semibold tracking-[0.05em] text-[15px]
//                   shadow-[0_4px_16px_rgba(0,85,165,0.3)]
//                   transition-all duration-200
//                 "
//               >
//                 GET YOUR OFFER
//                 <ArrowRight size={18} />
//               </button>
//               <a
//                 href={`tel:${phone}`}
//                 className="
//                   w-full flex items-center justify-between
//                   px-5 py-4 border border-gray-200 bg-gray-50
//                   rounded-2xl text-gray-800 font-medium text-[15px]
//                   hover:bg-gray-100 transition-all duration-200
//                 "
//               >
//                 <span>
//                   <span className="text-gray-400 text-[12px] block leading-none mb-0.5">Sales</span>
//                   {displayPhone}
//                 </span>
//                 <Phone size={18} className="text-[#0055A5]" />
//               </a>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ════════════════════════════════════════════
//           MOBILE STICKY BOTTOM BAR — light theme
//       ════════════════════════════════════════════ */}
//       <div
//         className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
//         style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
//       >
//         <div className="
//           bg-white/97 backdrop-blur-xl
//           border-t border-gray-200
//           grid grid-cols-2
//           h-[68px]
//           shadow-[0_-4px_20px_rgba(0,0,0,0.08)]
//         ">
//           {/* Call */}
//           <a
//             href={`tel:${phone}`}
//             className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-[#0055A5] active:text-[#0055A5] transition-colors border-r border-gray-100"
//             aria-label={`Call Sales ${displayPhone}`}
//           >
//             <Phone size={19} strokeWidth={1.6} />
//             <span className="text-[9px] uppercase tracking-wider font-semibold">{displayPhone}</span>
//           </a>

//           {/* GET OFFER */}
//           <button
//             onClick={() => scrollTo(offerSectionId)}
//             className="
//               flex flex-col items-center justify-center gap-1
//               bg-[#0055A5] active:bg-[#004494]
//               text-white
//               transition-colors duration-150
//             "
//             aria-label="Get your offer"
//           >
//             <Gift size={19} strokeWidth={1.6} />
//             <span className="text-[9px] uppercase tracking-wider font-bold">Get Offer</span>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }












// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Phone, Menu, X, ArrowRight, Gift, ChevronRight } from "lucide-react";

// // ─── CONFIG ────────────────────────────────────────────────────────────────────
// export interface CampaignNavbarProps {
//   /** Dealership phone number — displayed in UI */
//   phone?: string;
//   /** Vehicle name for campaign-specific WhatsApp message. */
//   vehicle?: string;
//   /** Path to your logo image. */
//   logoSrc?: string;
//   /** ID of the offer / lead form section to scroll to on CTA click */
//   offerSectionId?: string;
// }

// const NAV_LINKS = [
//   { label: "New Cars", href: "#cars" },
//   { label: "Offers", href: "#offers" },
//   { label: "Showrooms", href: "#showroom" }, // Points to Showroom section
//   { label: "Service", href: "#showroom" }, // Also points to Showroom section
//   { label: "Contact", href: "#contact" },
// ];

// // ─── ANIMATION VARIANTS ────────────────────────────────────────────────────────
// const navContainerVariants = {
//   hidden: { opacity: 0, y: -20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { staggerChildren: 0.1, delayChildren: 0.2 },
//   },
// };

// const navItemVariants = {
//   hidden: { opacity: 0, y: -10 },
//   visible: { 
//     opacity: 1, 
//     y: 0, 
//     transition: { type: "spring", stiffness: 300, damping: 24 } 
//   },
// };

// // ─── COMPONENT ─────────────────────────────────────────────────────────────────
// export default function CampaignNavbar({
//   phone = "9876543210",
//   vehicle,
//   logoSrc = "/images/logo.jpg",
//   offerSectionId = "offer-form",
// }: CampaignNavbarProps) {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activeLink, setActiveLink] = useState<string | null>(null);

//   // ── Scroll detection ──────────────────────────────────────────────────────
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // ── Lock body scroll when mobile menu is open ─────────────────────────────
//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [menuOpen]);

//   // ── Premium Active Link Tracking (IntersectionObserver) ───────────────────
//   useEffect(() => {
//     // Collect all unique IDs from NAV_LINKS to track
//     const uniqueIds = Array.from(new Set(NAV_LINKS.map((l) => l.href)));
//     const sections = uniqueIds.map((href) => document.querySelector(href)).filter(Boolean);

//     if (sections.length === 0) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         // Find the section that is most visible
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveLink(`#${entry.target.id}`);
//           }
//         });
//       },
//       // Root margin tuned so the link switches precisely when the section hits the middle of the viewport
//       { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
//     );

//     sections.forEach((s) => s && observer.observe(s));
//     return () => observer.disconnect();
//   }, []);

//   // ── Smooth scroll helper ──────────────────────────────────────────────────
//   const scrollTo = useCallback((id: string) => {
//     const el = document.querySelector(id.startsWith("#") ? id : `#${id}`);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth" });
//     }
//     setMenuOpen(false);
//   }, []);

//   // Formatted display number
//   const displayPhone = phone.replace(/(\d{5})(\d{5})/, "$1 $2");

//   // ─── RENDER ────────────────────────────────────────────────────────────────
//   return (
//     <>
//       {/* ════════════════════════════════════════════
//           MAIN NAVBAR — Desktop & Mobile Header
//       ════════════════════════════════════════════ */}
//       <motion.nav
//         initial={{ y: -100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//         aria-label="Primary navigation"
//         className={`
//           fixed top-0 left-0 right-0 z-50
//           transition-all duration-500 ease-in-out border-b
//           ${scrolled
//             ? "h-[68px] bg-white/90 backdrop-blur-xl border-gray-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.04)]"
//             : "h-[80px] bg-white/80 backdrop-blur-md border-transparent shadow-none"
//           }
//         `}
//       >
//         <div className="max-w-[1440px] mx-auto px-5 lg:px-12 h-full flex items-center justify-between gap-6">

//           {/* ── Logo ────────────────────────────────────────────── */}
//           <a
//             href="#"
//             className="relative z-10 flex items-center gap-3 select-none group flex-shrink-0"
//             aria-label="Garud Tata — home"
//           >
//             <div className="h-[40px] w-[120px] lg:h-[46px] lg:w-[140px] flex items-center justify-start overflow-hidden">
//               <img
//                 src={logoSrc}
//                 alt="Garud Tata"
//                 className="w-full h-full object-contain object-left transition-transform duration-500 group-hover:scale-105"
//               />
//             </div>
//             <div className="hidden sm:flex flex-col border-l border-gray-300 pl-3">
//               <span className="text-gray-900 font-extrabold tracking-[0.18em] text-[12px] lg:text-[14px] leading-tight">
//                 GARUD TATA
//               </span>
//               <span className="text-[#0055A5] font-semibold tracking-[0.14em] text-[9px] lg:text-[10px]">
//                 AUTHORIZED DEALER
//               </span>
//             </div>
//           </a>

//           {/* ── Desktop Navigation ──────────────────────────────── */}
//           <motion.nav
//             variants={navContainerVariants}
//             initial="hidden"
//             animate="visible"
//             aria-label="Site sections"
//             className="hidden lg:flex items-center gap-2 h-full flex-1 justify-center"
//           >
//             {NAV_LINKS.map((link) => {
//               const isActive = activeLink === link.href;
//               return (
//                 <motion.a
//                   key={link.label}
//                   variants={navItemVariants}
//                   href={link.href}
//                   onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
//                   className="relative px-4 py-2 rounded-full group"
//                   aria-current={isActive ? "page" : undefined}
//                 >
//                   {/* Premium fluid background for active state */}
//                   {isActive && (
//                     <motion.span
//                       layoutId="nav-active-pill"
//                       className="absolute inset-0 bg-[#0055A5]/10 rounded-full z-0"
//                       transition={{ type: "spring", stiffness: 350, damping: 30 }}
//                     />
//                   )}
                  
//                   <span className={`
//                     relative z-10 text-[13px] font-semibold tracking-[0.03em]
//                     transition-colors duration-300
//                     ${isActive ? "text-[#0055A5]" : "text-gray-600 group-hover:text-gray-900"}
//                   `}>
//                     {link.label}
//                   </span>
//                 </motion.a>
//               );
//             })}
//           </motion.nav>

//           {/* ── Desktop Action Group ────────────────────────────── */}
//           <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
//             {/* Sales number */}
//             <a
//               href={`tel:${phone}`}
//               className="
//                 group flex items-center gap-2 px-4 py-2.5 rounded-full
//                 border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300
//                 text-gray-700 hover:text-gray-900
//                 text-[13px] font-semibold tracking-wide
//                 transition-all duration-300 shadow-sm hover:shadow-md
//               "
//             >
//               <Phone size={14} className="text-[#0055A5] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
//               <span>
//                 <span className="text-gray-400 text-[10px] uppercase tracking-wider mr-1.5 font-bold">Sales</span>
//                 {displayPhone}
//               </span>
//             </a>

//             {/* GET OFFER → */}
//             <button
//               onClick={() => scrollTo(offerSectionId)}
//               className="
//                 relative overflow-hidden group flex items-center gap-2 px-6 py-2.5 rounded-full
//                 bg-[#0055A5] hover:bg-[#004488] text-white text-[13px] font-bold tracking-[0.05em]
//                 shadow-[0_4px_16px_rgba(0,85,165,0.3)] hover:shadow-[0_6px_22px_rgba(0,85,165,0.45)]
//                 hover:-translate-y-px transition-all duration-300
//               "
//             >
//               <span className="relative z-10">GET OFFER</span>
//               <ArrowRight size={14} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              
//               {/* Shine effect */}
//               <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
//             </button>
//           </div>

//           {/* ── Mobile Icons ─────────────────────────────────────── */}
//           <div className="flex lg:hidden items-center gap-2">
//             <a
//               href={`tel:${phone}`}
//               className="p-2 text-[#0055A5] bg-[#0055A5]/10 rounded-full hover:bg-[#0055A5]/20 transition-colors"
//               aria-label={`Call Sales ${displayPhone}`}
//             >
//               <Phone size={18} strokeWidth={2} />
//             </a>
//             <button
//               onClick={() => setMenuOpen(true)}
//               className="p-2 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 hover:text-gray-900 transition-colors"
//               aria-label="Open menu"
//             >
//               <Menu size={20} strokeWidth={2} />
//             </button>
//           </div>

//         </div>
//       </motion.nav>

//       {/* ════════════════════════════════════════════
//           MOBILE FULLSCREEN MENU
//       ════════════════════════════════════════════ */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             key="mobile-menu"
//             initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
//             animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
//             exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
//             transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
//             className="fixed inset-0 z-[80] bg-white/95 flex flex-col lg:hidden overflow-y-auto"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between px-6 h-[80px] border-b border-gray-200/50 flex-shrink-0">
//               <div className="h-[36px] w-[110px]">
//                 <img src={logoSrc} alt="Garud Tata" className="w-full h-full object-contain object-left" />
//               </div>
//               <button
//                 onClick={() => setMenuOpen(false)}
//                 className="p-2.5 text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
//               >
//                 <X size={20} strokeWidth={2.5} />
//               </button>
//             </div>

//             {/* Nav links */}
//             <nav className="flex-1 flex flex-col justify-center px-8 py-10 gap-2">
//               {NAV_LINKS.map((link, i) => (
//                 <motion.a
//                   key={link.label}
//                   href={link.href}
//                   onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
//                   initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
//                   animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
//                   transition={{ delay: i * 0.08 + 0.1, duration: 0.4, ease: "easeOut" }}
//                   className="group flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
//                 >
//                   <div className="flex items-center gap-4">
//                     <span className="text-[10px] font-bold text-[#0055A5]/40 group-hover:text-[#0055A5] transition-colors">
//                       0{i + 1}
//                     </span>
//                     <span className="text-[1.8rem] font-bold text-gray-800 group-hover:text-[#0055A5] tracking-tight group-hover:translate-x-2 transition-all duration-300">
//                       {link.label}
//                     </span>
//                   </div>
//                   <ChevronRight size={24} className="text-gray-300 group-hover:text-[#0055A5] group-hover:translate-x-1 transition-all" />
//                 </motion.a>
//               ))}
//             </nav>

//             {/* Footer CTAs */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.4 }}
//               className="p-6 space-y-3 pb-[calc(100px+env(safe-area-inset-bottom,0px))] flex-shrink-0"
//             >
//               <button
//                 onClick={() => scrollTo(offerSectionId)}
//                 className="w-full flex items-center justify-between px-6 py-4 bg-[#0055A5] hover:bg-[#004488] rounded-2xl text-white font-bold tracking-[0.05em] text-[15px] shadow-lg transition-all active:scale-[0.98]"
//               >
//                 GET YOUR OFFER
//                 <ArrowRight size={18} />
//               </button>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ════════════════════════════════════════════
//           MOBILE STICKY BOTTOM BAR
//       ════════════════════════════════════════════ */}
//       <div
//         className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
//         style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
//       >
//         <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 grid grid-cols-2 h-[72px] shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
//           {/* Call */}
//           <a
//             href={`tel:${phone}`}
//             className="flex flex-col items-center justify-center gap-1.5 text-gray-600 hover:text-[#0055A5] active:text-[#0055A5] transition-colors border-r border-gray-100"
//           >
//             <Phone size={20} strokeWidth={2} />
//             <span className="text-[10px] uppercase tracking-wider font-bold">Call Sales</span>
//           </a>

//           {/* GET OFFER */}
//           <button
//             onClick={() => scrollTo(offerSectionId)}
//             className="group flex flex-col items-center justify-center gap-1.5 bg-gradient-to-r from-[#0055A5] to-[#004488] active:opacity-90 text-white transition-all overflow-hidden relative"
//           >
//             {/* Ambient Pulse Effect */}
//             <span className="absolute inset-0 bg-white/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
//             <Gift size={20} strokeWidth={2} className="relative z-10" />
//             <span className="text-[10px] uppercase tracking-wider font-bold relative z-10">Get Offer</span>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }














// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Phone, Menu, X, ArrowRight, Gift, ChevronRight } from "lucide-react";

// // ─── CONFIG ────────────────────────────────────────────────────────────────────
// export interface CampaignNavbarProps {
//   /** Dealership phone number — displayed in UI */
//   phone?: string;
//   /** Vehicle name for campaign-specific WhatsApp message. */
//   vehicle?: string;
//   /** Path to your logo image. */
//   logoSrc?: string;
//   /** ID of the offer / lead form section to scroll to on CTA click */
//   offerSectionId?: string;
// }

// const NAV_LINKS = [
//   { label: "New Cars", href: "#cars" },
//   { label: "Offers", href: "#offers" },
//   { label: "Showrooms", href: "#showroom" }, // Points to Showroom section
//   { label: "Service", href: "#showroom" }, // Also points to Showroom section
//   { label: "Contact", href: "#contact" },
// ];

// // ─── ANIMATION VARIANTS ────────────────────────────────────────────────────────
// const navContainerVariants = {
//   hidden: { opacity: 0, y: -20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { staggerChildren: 0.1, delayChildren: 0.2 },
//   },
// };

// const navItemVariants = {
//   hidden: { opacity: 0, y: -10 },
//   visible: { 
//     opacity: 1, 
//     y: 0, 
//     transition: { type: "spring", stiffness: 300, damping: 24 } 
//   },
// };

// // ─── COMPONENT ─────────────────────────────────────────────────────────────────
// export default function CampaignNavbar({
//   phone = "9876543210",
//   vehicle,
//   logoSrc = "/images/logo.jpg",
//   offerSectionId = "offer-form",
// }: CampaignNavbarProps) {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activeLink, setActiveLink] = useState<string | null>(null);

//   // ── Scroll detection ──────────────────────────────────────────────────────
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // ── Lock body scroll when mobile menu is open ─────────────────────────────
//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [menuOpen]);

//   // ── Premium Active Link Tracking (IntersectionObserver) ───────────────────
//   useEffect(() => {
//     // Collect all unique IDs from NAV_LINKS to track
//     const uniqueIds = Array.from(new Set(NAV_LINKS.map((l) => l.href)));
//     const sections = uniqueIds.map((href) => document.querySelector(href)).filter(Boolean);

//     if (sections.length === 0) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         // Find the section that is most visible
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActiveLink(`#${entry.target.id}`);
//           }
//         });
//       },
//       // Root margin tuned so the link switches precisely when the section hits the middle of the viewport
//       { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
//     );

//     sections.forEach((s) => s && observer.observe(s));
//     return () => observer.disconnect();
//   }, []);

//   // ── Smooth scroll helper ──────────────────────────────────────────────────
//   const scrollTo = useCallback((id: string) => {
//     const el = document.querySelector(id.startsWith("#") ? id : `#${id}`);
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth" });
//     }
//     setMenuOpen(false);
//   }, []);

//   // Formatted display number
//   const displayPhone = phone.replace(/(\d{5})(\d{5})/, "$1 $2");

//   // ─── RENDER ────────────────────────────────────────────────────────────────
//   return (
//     <>
//       {/* ════════════════════════════════════════════
//           MAIN NAVBAR — Desktop & Mobile Header
//       ════════════════════════════════════════════ */}
//       <motion.nav
//         initial={{ y: -100, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//         aria-label="Primary navigation"
//         className={`
//           fixed top-0 left-0 right-0 z-50
//           transition-all duration-500 ease-in-out border-b
//           ${scrolled
//             ? "h-[68px] bg-white/90 backdrop-blur-xl border-gray-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.04)]"
//             : "h-[80px] bg-white/80 backdrop-blur-md border-transparent shadow-none"
//           }
//         `}
//       >
//         <div className="max-w-[1440px] mx-auto px-5 lg:px-12 h-full flex items-center justify-between gap-6">

//           {/* ── Logo ────────────────────────────────────────────── */}
//           <a
//             href="#"
//             className="relative z-10 flex items-center gap-3 select-none group flex-shrink-0"
//             aria-label="Garud Tata — home"
//           >
//             <div className="h-[40px] w-[120px] lg:h-[46px] lg:w-[140px] flex items-center justify-start overflow-hidden">
//               <img
//                 src={logoSrc}
//                 alt="Garud Tata"
//                 className="w-full h-full object-contain object-left transition-transform duration-500 group-hover:scale-105"
//               />
//             </div>
//             <div className="hidden sm:flex flex-col border-l border-gray-300 pl-3">
//               <span className="text-gray-900 font-extrabold tracking-[0.18em] text-[12px] lg:text-[14px] leading-tight">
//                 GARUD TATA
//               </span>
//               <span className="text-[#0055A5] font-semibold tracking-[0.14em] text-[9px] lg:text-[10px]">
//                 AUTHORIZED DEALER
//               </span>
//             </div>
//           </a>

//           {/* ── Desktop Navigation ──────────────────────────────── */}
//           <motion.nav
//             variants={navContainerVariants}
//             initial="hidden"
//             animate="visible"
//             aria-label="Site sections"
//             className="hidden lg:flex items-center gap-2 h-full flex-1 justify-center"
//           >
//             {NAV_LINKS.map((link) => {
//               const isActive = activeLink === link.href;
//               return (
//                 <motion.a
//                   key={link.label}
//                   variants={navItemVariants}
//                   href={link.href}
//                   onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
//                   className="relative px-4 py-2 rounded-full group"
//                   aria-current={isActive ? "page" : undefined}
//                 >
//                   {/* Premium fluid background for active state */}
//                   {isActive && (
//                     <motion.span
//                       layoutId="nav-active-pill"
//                       className="absolute inset-0 bg-[#0055A5]/10 rounded-full z-0"
//                       transition={{ type: "spring", stiffness: 350, damping: 30 }}
//                     />
//                   )}
                  
//                   <span className={`
//                     relative z-10 text-[13px] font-semibold tracking-[0.03em]
//                     transition-colors duration-300
//                     ${isActive ? "text-[#0055A5]" : "text-gray-600 group-hover:text-gray-900"}
//                   `}>
//                     {link.label}
//                   </span>
//                 </motion.a>
//               );
//             })}
//           </motion.nav>

//           {/* ── Desktop Action Group ────────────────────────────── */}
//           <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
//             {/* Sales number */}
//             <a
//               href={`tel:${phone}`}
//               className="
//                 group flex items-center gap-2 px-4 py-2.5 rounded-full
//                 border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300
//                 text-gray-700 hover:text-gray-900
//                 text-[13px] font-semibold tracking-wide
//                 transition-all duration-300 shadow-sm hover:shadow-md
//               "
//             >
//               <Phone size={14} className="text-[#0055A5] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
//               <span>
//                 <span className="text-gray-400 text-[10px] uppercase tracking-wider mr-1.5 font-bold">Sales</span>
//                 {displayPhone}
//               </span>
//             </a>

//             {/* GET OFFER → (Converted to native anchor) */}
//             <a
//               href="#contact"
//               className="
//                 relative overflow-hidden group flex items-center gap-2 px-6 py-2.5 rounded-full
//                 bg-[#0055A5] hover:bg-[#004488] text-white text-[13px] font-bold tracking-[0.05em]
//                 shadow-[0_4px_16px_rgba(0,85,165,0.3)] hover:shadow-[0_6px_22px_rgba(0,85,165,0.45)]
//                 hover:-translate-y-px transition-all duration-300
//               "
//             >
//               <span className="relative z-10">GET OFFER</span>
//               <ArrowRight size={14} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              
//               {/* Shine effect */}
//               <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
//             </a>
//           </div>

//           {/* ── Mobile Icons ─────────────────────────────────────── */}
//           <div className="flex lg:hidden items-center gap-2">
//             <a
//               href={`tel:${phone}`}
//               className="p-2 text-[#0055A5] bg-[#0055A5]/10 rounded-full hover:bg-[#0055A5]/20 transition-colors"
//               aria-label={`Call Sales ${displayPhone}`}
//             >
//               <Phone size={18} strokeWidth={2} />
//             </a>
//             <button
//               onClick={() => setMenuOpen(true)}
//               className="p-2 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 hover:text-gray-900 transition-colors"
//               aria-label="Open menu"
//             >
//               <Menu size={20} strokeWidth={2} />
//             </button>
//           </div>

//         </div>
//       </motion.nav>

//       {/* ════════════════════════════════════════════
//           MOBILE FULLSCREEN MENU
//       ════════════════════════════════════════════ */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             key="mobile-menu"
//             initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
//             animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
//             exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
//             transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
//             className="fixed inset-0 z-[80] bg-white/95 flex flex-col lg:hidden overflow-y-auto"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between px-6 h-[80px] border-b border-gray-200/50 flex-shrink-0">
//               <div className="h-[36px] w-[110px]">
//                 <img src={logoSrc} alt="Garud Tata" className="w-full h-full object-contain object-left" />
//               </div>
//               <button
//                 onClick={() => setMenuOpen(false)}
//                 className="p-2.5 text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
//               >
//                 <X size={20} strokeWidth={2.5} />
//               </button>
//             </div>

//             {/* Nav links */}
//             <nav className="flex-1 flex flex-col justify-center px-8 py-10 gap-2">
//               {NAV_LINKS.map((link, i) => (
//                 <motion.a
//                   key={link.label}
//                   href={link.href}
//                   onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
//                   initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
//                   animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
//                   transition={{ delay: i * 0.08 + 0.1, duration: 0.4, ease: "easeOut" }}
//                   className="group flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
//                 >
//                   <div className="flex items-center gap-4">
//                     <span className="text-[10px] font-bold text-[#0055A5]/40 group-hover:text-[#0055A5] transition-colors">
//                       0{i + 1}
//                     </span>
//                     <span className="text-[1.8rem] font-bold text-gray-800 group-hover:text-[#0055A5] tracking-tight group-hover:translate-x-2 transition-all duration-300">
//                       {link.label}
//                     </span>
//                   </div>
//                   <ChevronRight size={24} className="text-gray-300 group-hover:text-[#0055A5] group-hover:translate-x-1 transition-all" />
//                 </motion.a>
//               ))}
//             </nav>

//             {/* Footer CTAs */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.4 }}
//               className="p-6 space-y-3 pb-[calc(100px+env(safe-area-inset-bottom,0px))] flex-shrink-0"
//             >
//               {/* GET OFFER - Mobile Fullscreen (Converted to native anchor) */}
//               <a 
//                 href="#contact" 
//                 onClick={() => setMenuOpen(false)} 
//                 className="w-full flex items-center justify-between px-6 py-4 bg-[#0055A5] hover:bg-[#004488] rounded-2xl text-white font-bold tracking-[0.05em] text-[15px] shadow-lg transition-all active:scale-[0.98]"
//               >
//                 GET YOUR OFFER
//                 <ArrowRight size={18} />
//               </a>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ════════════════════════════════════════════
//           MOBILE STICKY BOTTOM BAR
//       ════════════════════════════════════════════ */}
//       <div
//         className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
//         style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
//       >
//         <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 grid grid-cols-2 h-[72px] shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
//           {/* Call */}
//           <a
//             href={`tel:${phone}`}
//             className="flex flex-col items-center justify-center gap-1.5 text-gray-600 hover:text-[#0055A5] active:text-[#0055A5] transition-colors border-r border-gray-100"
//           >
//             <Phone size={20} strokeWidth={2} />
//             <span className="text-[10px] uppercase tracking-wider font-bold">Call Sales</span>
//           </a>

//           {/* GET OFFER - Mobile Sticky (Converted to native anchor) */}
//           <a 
//             href="#contact" 
//             className="group flex flex-col items-center justify-center gap-1.5 bg-gradient-to-r from-[#0055A5] to-[#004488] active:opacity-90 text-white transition-all overflow-hidden relative"
//           >
//             <span className="absolute inset-0 bg-white/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
//             <Gift size={20} strokeWidth={2} className="relative z-10" />
//             <span className="text-[10px] uppercase tracking-wider font-bold relative z-10">Get Offer</span>
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }













"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Phone, Menu, X, ArrowRight, Gift, ChevronRight } from "lucide-react";

// ─── CONFIG ────────────────────────────────────────────────────────────────────
export interface CampaignNavbarProps {
  /** Dealership phone number — displayed in UI */
  phone?: string;
  /** Vehicle name for campaign-specific WhatsApp message. */
  vehicle?: string;
  /** Path to your logo image. */
  logoSrc?: string;
  /** ID of the offer / lead form section to scroll to on CTA click */
  offerSectionId?: string;
}

const NAV_LINKS = [
  { label: "New Cars", href: "#cars" },
  { label: "Offers", href: "#offers" },
  { label: "Showrooms", href: "#showroom" }, // Points to Showroom section
  { label: "Service", href: "#showroom" }, // Also points to Showroom section
  { label: "Contact", href: "#contact" },
];

// ─── ANIMATION VARIANTS ────────────────────────────────────────────────────────
const navContainerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 300, damping: 24 } 
  },
};

// ─── COMPONENT ─────────────────────────────────────────────────────────────────
export default function CampaignNavbar({
  phone = "9876543210",
  vehicle,
  logoSrc = "/images/logo.jpg",
  offerSectionId = "offer-form",
}: CampaignNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Lock body scroll when mobile menu is open ─────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Premium Active Link Tracking (IntersectionObserver) ───────────────────
  useEffect(() => {
    // Collect all unique IDs from NAV_LINKS to track
    const uniqueIds = Array.from(new Set(NAV_LINKS.map((l) => l.href)));
    const sections = uniqueIds.map((href) => document.querySelector(href)).filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the section that is most visible
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveLink(`#${entry.target.id}`);
          }
        });
      },
      // Root margin tuned so the link switches precisely when the section hits the middle of the viewport
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // ── Smooth scroll helper ──────────────────────────────────────────────────
  const scrollTo = useCallback((id: string) => {
    const el = document.querySelector(id.startsWith("#") ? id : `#${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMenuOpen(false);
  }, []);

  // Formatted display number
  const displayPhone = phone.replace(/(\d{5})(\d{5})/, "$1 $2");

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ════════════════════════════════════════════
         MAIN NAVBAR — Desktop & Mobile Header
      ════════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Primary navigation"
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-in-out border-b
          ${scrolled
            ? "h-[68px] bg-white/90 backdrop-blur-xl border-gray-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.04)]"
            : "h-[80px] bg-white/80 backdrop-blur-md border-transparent shadow-none"
          }
        `}
      >
        <div className="max-w-[1440px] mx-auto px-5 lg:px-12 h-full flex items-center justify-between gap-6">

          {/* ── Logo ────────────────────────────────────────────── */}
          <a
            href="#"
            className="relative z-10 flex items-center gap-3 select-none group flex-shrink-0"
            aria-label="Garud Tata — home"
          >
            <div className="h-[40px] w-[120px] lg:h-[46px] lg:w-[140px] flex items-center justify-start overflow-hidden">
              <img
                src={logoSrc}
                alt="Garud Tata"
                className="w-full h-full object-contain object-left transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="hidden sm:flex flex-col border-l border-gray-300 pl-3">
              <span className="text-gray-900 font-extrabold tracking-[0.18em] text-[12px] lg:text-[14px] leading-tight">
                GARUD TATA
              </span>
              <span className="text-[#0055A5] font-semibold tracking-[0.14em] text-[9px] lg:text-[10px]">
                AUTHORIZED DEALER
              </span>
            </div>
          </a>

          {/* ── Desktop Navigation ──────────────────────────────── */}
          <motion.nav
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            aria-label="Site sections"
            className="hidden lg:flex items-center gap-2 h-full flex-1 justify-center"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <motion.a
                  key={link.label}
                  variants={navItemVariants}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="relative px-4 py-2 rounded-full group"
                  aria-current={isActive ? "page" : undefined}
                >
                  {/* Premium fluid background for active state */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-[#0055A5]/10 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  
                  <span className={`
                    relative z-10 text-[13px] font-semibold tracking-[0.03em]
                    transition-colors duration-300
                    ${isActive ? "text-[#0055A5]" : "text-gray-600 group-hover:text-gray-900"}
                  `}>
                    {link.label}
                  </span>
                </motion.a>
              );
            })}
          </motion.nav>

          {/* ── Desktop Action Group ────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {/* Sales number */}
            <a
              href={`tel:${phone}`}
              className="
                group flex items-center gap-2 px-4 py-2.5 rounded-full
                border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300
                text-gray-700 hover:text-gray-900
                text-[13px] font-semibold tracking-wide
                transition-all duration-300 shadow-sm hover:shadow-md
              "
            >
              <Phone size={14} className="text-[#0055A5] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
              <span>
                <span className="text-gray-400 text-[10px] uppercase tracking-wider mr-1.5 font-bold">Sales</span>
                {displayPhone}
              </span>
            </a>

            {/* GET OFFER → (Converted to native anchor) */}
            <a
              href="#contact"
              className="
                relative overflow-hidden group flex items-center gap-2 px-6 py-2.5 rounded-full
                bg-[#0055A5] hover:bg-[#004488] text-white text-[13px] font-bold tracking-[0.05em]
                shadow-[0_4px_16px_rgba(0,85,165,0.3)] hover:shadow-[0_6px_22px_rgba(0,85,165,0.45)]
                hover:-translate-y-px transition-all duration-300
              "
            >
              <span className="relative z-10">GET OFFER</span>
              <ArrowRight size={14} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
            </a>
          </div>

          {/* ── Mobile Icons ─────────────────────────────────────── */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href={`tel:${phone}`}
              className="p-2 text-[#0055A5] bg-[#0055A5]/10 rounded-full hover:bg-[#0055A5]/20 transition-colors"
              aria-label={`Call Sales ${displayPhone}`}
            >
              <Phone size={18} strokeWidth={2} />
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 hover:text-gray-900 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={2} />
            </button>
          </div>

        </div>
      </motion.nav>

      {/* ════════════════════════════════════════════
         MOBILE FULLSCREEN MENU
      ════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[80] bg-white/95 flex flex-col lg:hidden overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-[80px] border-b border-gray-200/50 flex-shrink-0">
              <div className="h-[36px] w-[110px]">
                <img src={logoSrc} alt="Garud Tata" className="w-full h-full object-contain object-left" />
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2.5 text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-8 py-10 gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{ delay: i * 0.08 + 0.1, duration: 0.4, ease: "easeOut" }}
                  className="group flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-bold text-[#0055A5]/40 group-hover:text-[#0055A5] transition-colors">
                      0{i + 1}
                    </span>
                    <span className="text-[1.8rem] font-bold text-gray-800 group-hover:text-[#0055A5] tracking-tight group-hover:translate-x-2 transition-all duration-300">
                      {link.label}
                    </span>
                  </div>
                  <ChevronRight size={24} className="text-gray-300 group-hover:text-[#0055A5] group-hover:translate-x-1 transition-all" />
                </motion.a>
              ))}
            </nav>

            {/* Footer CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="p-6 space-y-3 pb-[calc(100px+env(safe-area-inset-bottom,0px))] flex-shrink-0"
            >
              {/* GET OFFER - Mobile Fullscreen (Converted to native anchor) */}
              <a 
                href="#contact" 
                onClick={() => setMenuOpen(false)} 
                className="w-full flex items-center justify-between px-6 py-4 bg-[#0055A5] hover:bg-[#004488] rounded-2xl text-white font-bold tracking-[0.05em] text-[15px] shadow-lg transition-all active:scale-[0.98]"
              >
                GET YOUR OFFER
                <ArrowRight size={18} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════
         MOBILE STICKY BOTTOM BAR
      ════════════════════════════════════════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 grid grid-cols-2 h-[72px] shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
          {/* Call */}
          <a
            href={`tel:${phone}`}
            className="flex flex-col items-center justify-center gap-1.5 text-gray-600 hover:text-[#0055A5] active:text-[#0055A5] transition-colors border-r border-gray-100"
          >
            <Phone size={20} strokeWidth={2} />
            <span className="text-[10px] uppercase tracking-wider font-bold">Call Sales</span>
          </a>

          {/* GET OFFER - Mobile Sticky (Converted to native anchor) */}
          <a 
            href="#contact" 
            className="group flex flex-col items-center justify-center gap-1.5 bg-gradient-to-r from-[#0055A5] to-[#004488] active:opacity-90 text-white transition-all overflow-hidden relative"
          >
            <span className="absolute inset-0 bg-white/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
            <Gift size={20} strokeWidth={2} className="relative z-10" />
            <span className="text-[10px] uppercase tracking-wider font-bold relative z-10">Get Offer</span>
          </a>
        </div>
      </div>
    </>
  );
}






