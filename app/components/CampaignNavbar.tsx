


// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { motion, AnimatePresence, type Variants } from "framer-motion";
// import { Phone, Menu, X, ArrowRight, Gift, ChevronRight } from "lucide-react";

// export interface CampaignNavbarProps {
//   phone?: string;
//   vehicle?: string;
//   logoSrc?: string;
//   offerSectionId?: string;
// }

// const NAV_LINKS = [
//   { label: "Home", href: "/", type: "route", hash: null },
//   { label: "New Cars", href: "#offers", type: "route", hash: null },
//   { label: "Offers", href: "#offers", type: "hash", hash: "offer-form" },
//   { label: "Showrooms", href: "#showrooms", type: "hash", hash: "showrooms" },
//   { label: "Service", href: "#showrooms", type: "hash", hash: "showrooms" },
//   { label: "Contact", href: "#contact", type: "hash", hash: "contact" },
// ];

// const navContainerVariants: Variants = {
//   hidden: { opacity: 0, y: -20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { staggerChildren: 0.1, delayChildren: 0.2 },
//   },
// };

// const navItemVariants: Variants = {
//   hidden: { opacity: 0, y: -10 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { type: "spring", stiffness: 300, damping: 24 },
//   },
// };

// export default function CampaignNavbar({
//   phone = "9217371204",
//   vehicle,
//   logoSrc = "/images/logo.jpg",
//   offerSectionId = "offer-form",
// }: CampaignNavbarProps) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activeLink, setActiveLink] = useState<string>("/");

//   // ── Scroll detection ────────────────────────────────────────────────────
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // ── Body scroll lock ────────────────────────────────────────────────────
//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [menuOpen]);

//   // ── Sync active link with URL hash on mount / hash change ───────────────
//   useEffect(() => {
//     const syncFromHash = () => {
//       const hash = window.location.hash; // e.g. "#contact"
//       if (hash) {
//         setActiveLink(hash);
//       } else if (pathname === "/") {
//         setActiveLink("/");
//       } else {
//         setActiveLink(pathname);
//       }
//     };
//     syncFromHash();
//     window.addEventListener("hashchange", syncFromHash);
//     return () => window.removeEventListener("hashchange", syncFromHash);
//   }, [pathname]);

//   // ── IntersectionObserver — hash sections only ───────────────────────────
//   useEffect(() => {
//     if (pathname !== "/") return; // only observe on home page

//     const hashLinks = NAV_LINKS.filter((l) => l.type === "hash" && l.hash);
//     const ids = Array.from(new Set(hashLinks.map((l) => l.hash!)));
//     const sections = ids
//       .map((id) => document.getElementById(id))
//       .filter(Boolean) as HTMLElement[];

//     if (sections.length === 0) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const matchedLink = NAV_LINKS.find((l) => l.hash === entry.target.id);
//             if (matchedLink) {
//               const newHash = matchedLink.href; // e.g. "#contact"
//               setActiveLink(newHash);
//               // Update browser URL without full navigation
//               history.replaceState(null, "", newHash);
//             }
//           }
//         });
//       },
//       { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
//     );

//     sections.forEach((s) => observer.observe(s));
//     return () => observer.disconnect();
//   }, [pathname]);

//   // ── Navigation handler ──────────────────────────────────────────────────
//   const handleNav = useCallback(
//     (link: (typeof NAV_LINKS)[number]) => {
//       setMenuOpen(false);

//       if (link.type === "route") {
//         // Pure route navigation (Home → /, New Cars → /offers)
//         setActiveLink(link.href);
//         router.push(link.href);
//         return;
//       }

//       // Hash navigation — always push hash to URL
//       if (pathname !== "/") {
//         // Navigate to home first, then scroll after load
//         router.push(`/${link.href}`);
//         setActiveLink(link.href);
//         return;
//       }

//       // Already on home — scroll + update URL
//       const targetId = link.hash ?? link.href.replace("#", "");
//       const el = document.getElementById(targetId);
//       if (el) {
//         el.scrollIntoView({ behavior: "smooth" });
//       }
//       history.pushState(null, "", link.href);
//       setActiveLink(link.href);
//     },
//     [pathname, router]
//   );

//   const displayPhone = phone.replace(/(\d{5})(\d{5})/, "$1 $2");

//   // ─── RENDER ─────────────────────────────────────────────────────────────
//   return (
//     <>
//       {/* ═══════════════════════════════
//           MAIN NAVBAR
//       ═══════════════════════════════ */}
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

//           {/* ── Logo ── */}
//           <a
//             href="/"
//             onClick={(e) => {
//               e.preventDefault();
//               handleNav({
//                 label: "Home",
//                 href: "/",
//                 type: "route",
//                 hash: null,
//               });
//             }}
//             className="relative z-10 flex items-center gap-3 select-none group flex-shrink-0"
//             aria-label="Garud Tata — home"
//           >
//             {/* Large Garud Tata Logo */}
//             <div className="h-[58px] w-[180px] sm:h-[64px] sm:w-[200px] lg:h-[76px] lg:w-[240px] flex items-center justify-start overflow-visible">
//               <img
//                 src={logoSrc}
//                 alt="Garud Tata"
//                 className="w-full h-full object-contain object-left transition-transform duration-500 group-hover:scale-105"
//               />
//             </div>
//           </a>

//           {/* ── Desktop Navigation ── */}
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
//                   onClick={(e) => { e.preventDefault(); handleNav(link); }}
//                   className="relative px-4 py-2 rounded-full group cursor-pointer"
//                   aria-current={isActive ? "page" : undefined}
//                 >
//                   {isActive && (
//                     <motion.span
//                       layoutId="nav-active-pill"
//                       className="absolute inset-0 bg-[#0055A5]/10 rounded-full z-0"
//                       transition={{ type: "spring", stiffness: 350, damping: 30 }}
//                     />
//                   )}
//                   <span
//                     className={`
//                       relative z-10 text-[13px] font-semibold tracking-[0.03em]
//                       transition-colors duration-300
//                       ${isActive ? "text-[#0055A5]" : "text-gray-600 group-hover:text-gray-900"}
//                     `}
//                   >
//                     {link.label}
//                   </span>
//                 </motion.a>
//               );
//             })}
//           </motion.nav>

//           {/* ── Desktop Action Group ── */}
//           <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
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

//             <a
//               href="#contact"
//               onClick={(e) => { e.preventDefault(); handleNav({ label: "Contact", href: "#contact", type: "hash", hash: "contact" }); }}
//               className="
//                 relative overflow-hidden group flex items-center gap-2 px-6 py-2.5 rounded-full
//                 bg-[#0055A5] hover:bg-[#004488] text-white text-[13px] font-bold tracking-[0.05em]
//                 shadow-[0_4px_16px_rgba(0,85,165,0.3)] hover:shadow-[0_6px_22px_rgba(0,85,165,0.45)]
//                 hover:-translate-y-px transition-all duration-300
//               "
//             >
//               <span className="relative z-10">GET OFFER</span>
//               <ArrowRight size={14} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
//               <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
//             </a>
//           </div>

//           {/* ── Mobile Icons ── */}
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

//       {/* ═══════════════════════════════
//           MOBILE FULLSCREEN MENU
//       ═══════════════════════════════ */}
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
//               <div className="h-[40px] w-[130px]">
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
//               {NAV_LINKS.map((link, i) => {
//                 const isActive = activeLink === link.href;
//                 return (
//                   <motion.a
//                     key={link.label}
//                     href={link.href}
//                     onClick={(e) => { e.preventDefault(); handleNav(link); }}
//                     initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
//                     animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
//                     transition={{ delay: i * 0.08 + 0.1, duration: 0.4, ease: "easeOut" }}
//                     className="group flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
//                   >
//                     <div className="flex items-center gap-4">
//                       <span className={`text-[10px] font-bold transition-colors ${isActive ? "text-[#0055A5]" : "text-[#0055A5]/40 group-hover:text-[#0055A5]"}`}>
//                         0{i + 1}
//                       </span>
//                       <span className={`text-[1.8rem] font-bold tracking-tight transition-all duration-300 ${isActive ? "text-[#0055A5]" : "text-gray-800 group-hover:text-[#0055A5] group-hover:translate-x-2"}`}>
//                         {link.label}
//                       </span>
//                     </div>
//                     <ChevronRight size={24} className={`transition-all ${isActive ? "text-[#0055A5]" : "text-gray-300 group-hover:text-[#0055A5] group-hover:translate-x-1"}`} />
//                   </motion.a>
//                 );
//               })}
//             </nav>

//             {/* Footer CTAs */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.4 }}
//               className="p-6 space-y-3 pb-[calc(100px+env(safe-area-inset-bottom,0px))] flex-shrink-0"
//             >
//               <a
//                 href="#contact"
//                 onClick={(e) => { e.preventDefault(); handleNav({ label: "Contact", href: "#contact", type: "hash", hash: "contact" }); }}
//                 className="w-full flex items-center justify-between px-6 py-4 bg-[#0055A5] hover:bg-[#004488] rounded-2xl text-white font-bold tracking-[0.05em] text-[15px] shadow-lg transition-all active:scale-[0.98]"
//               >
//                 GET YOUR OFFER
//                 <ArrowRight size={18} />
//               </a>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ═══════════════════════════════
//           MOBILE STICKY BOTTOM BAR
//       ═══════════════════════════════ */}
//       <div
//         className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
//         style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
//       >
//         <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 grid grid-cols-2 h-[72px] shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
//           <a
//             href={`tel:${phone}`}
//             className="flex flex-col items-center justify-center gap-1.5 text-gray-600 hover:text-[#0055A5] active:text-[#0055A5] transition-colors border-r border-gray-100"
//           >
//             <Phone size={20} strokeWidth={2} />
//             <span className="text-[10px] uppercase tracking-wider font-bold">Call Sales</span>
//           </a>

//           <a
//             href="#contact"
//             onClick={(e) => { e.preventDefault(); handleNav({ label: "Contact", href: "#contact", type: "hash", hash: "contact" }); }}
//             className="group flex flex-col items-center justify-center gap-1.5 bg-gradient-to-r from-[#0055A5] to-[#004488] active:opacity-90 text-white transition-all overflow-hidden relative"
//           >
//             <span className="absolute inset-0 bg-white/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
//             <Gift size={20} strokeWidth={2} className="relative z-10" />
//             <span className="text-[10px] uppercase tracking-wider font-bold relative z-10">Get Offer</span>
//           </a>
//         </div>
//       </div >
//     </>
//   );
// }












// // garud-tata\app\components\CampaignNavbar.tsx


// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { motion, AnimatePresence, type Variants } from "framer-motion";
// import { Phone, Menu, X, ArrowRight, Gift, ChevronRight, MapPin } from "lucide-react";
// import { showrooms, HOME_URL } from "@/app/config/showrooms";

// export interface CampaignNavbarProps {
//   phone?:          string;
//   vehicle?:        string;
//   logoSrc?:        string;
//   offerSectionId?: string;
//   gmbImage?:       string; // passed from config
// }

// const NAV_LINKS = [
//   { label: "Home",      href: "/",          type: "route", hash: null },
//   { label: "New Cars",  href: "#offers",    type: "route", hash: null },
//   { label: "Offers",    href: "#offers",    type: "hash",  hash: "offer-form" },
//   { label: "Showrooms", href: "#showrooms", type: "hash",  hash: "showrooms" },
//   { label: "Service",   href: "#showrooms", type: "hash",  hash: "showrooms" },
//   { label: "Contact",   href: "#contact",   type: "hash",  hash: "contact" },
// ];

// const navContainerVariants: Variants = {
//   hidden: { opacity: 0, y: -20 },
//   visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
// };
// const navItemVariants: Variants = {
//   hidden: { opacity: 0, y: -10 },
//   visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
// };

// // Derive city info from current pathname
// function useCityInfo() {
//   const pathname = usePathname();
//   const slug = pathname.split("/")[1] as keyof typeof showrooms;
//   if (slug && showrooms[slug]) {
//     const config   = showrooms[slug];
//     const cityName = config.name.split(" ").pop() ?? slug;
//     return { cityName, gmbImage: config.navbar.gmbImage };
//   }
//   return { cityName: null, gmbImage: null };
// }

// export default function CampaignNavbar({
//   phone          = "9217371204",
//   logoSrc        = "/images/logo.jpg",
//   offerSectionId = "offer-form",
//   gmbImage,
// }: CampaignNavbarProps) {
//   const router   = useRouter();
//   const pathname = usePathname();

//   const { cityName, gmbImage: configGmbImage } = useCityInfo();
//   // prop takes priority, fallback to config-derived
//   const resolvedGmbImage = gmbImage ?? configGmbImage;

//   const [scrolled,   setScrolled]  = useState(false);
//   const [menuOpen,   setMenuOpen]  = useState(false);
//   const [activeLink, setActiveLink] = useState<string>("/");

//   // ── Scroll detection ─────────────────────────────────────────────────
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // ── Body scroll lock ─────────────────────────────────────────────────
//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [menuOpen]);

//   // ── Sync active link with hash ───────────────────────────────────────
//   useEffect(() => {
//     const syncFromHash = () => {
//       const hash = window.location.hash;
//       if (hash)                setActiveLink(hash);
//       else if (pathname === "/") setActiveLink("/");
//       else                     setActiveLink(pathname);
//     };
//     syncFromHash();
//     window.addEventListener("hashchange", syncFromHash);
//     return () => window.removeEventListener("hashchange", syncFromHash);
//   }, [pathname]);

//   // ── IntersectionObserver ─────────────────────────────────────────────
//   useEffect(() => {
//     const hashLinks = NAV_LINKS.filter((l) => l.type === "hash" && l.hash);
//     const ids       = Array.from(new Set(hashLinks.map((l) => l.hash!)));
//     const sections  = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
//     if (!sections.length) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const matched = NAV_LINKS.find((l) => l.hash === entry.target.id);
//             if (matched) {
//               setActiveLink(matched.href);
//               history.replaceState(null, "", matched.href);
//             }
//           }
//         });
//       },
//       { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
//     );

//     sections.forEach((s) => observer.observe(s));
//     return () => observer.disconnect();
//   }, [pathname]);

//   // ── Navigation handler ───────────────────────────────────────────────
//   const handleNav = useCallback(
//     (link: (typeof NAV_LINKS)[number]) => {
//       setMenuOpen(false);

//       if (link.type === "route") {
//         setActiveLink(link.href);
//         router.push(link.href);
//         return;
//       }

//       const isOnCityPage = !!showrooms[pathname.split("/")[1] as keyof typeof showrooms];

//       if (isOnCityPage || pathname !== "/") {
//         // On a city page — scroll within same page
//         const targetId = link.hash ?? link.href.replace("#", "");
//         const el = document.getElementById(targetId);
//         if (el) el.scrollIntoView({ behavior: "smooth" });
//         history.pushState(null, "", link.href);
//         setActiveLink(link.href);
//         return;
//       }

//       const targetId = link.hash ?? link.href.replace("#", "");
//       const el = document.getElementById(targetId);
//       if (el) el.scrollIntoView({ behavior: "smooth" });
//       history.pushState(null, "", link.href);
//       setActiveLink(link.href);
//     },
//     [pathname, router]
//   );

//   const displayPhone = phone.replace(/(\d{5})(\d{5})/, "$1 $2");

//   // ── City Badge ───────────────────────────────────────────────────────
//   const CityBadge = ({ size = "md" }: { size?: "sm" | "md" }) => {
//     if (!cityName) return null;
//     const isSmall = size === "sm";
//     return (
//       <motion.div
//         initial={{ opacity: 0, scale: 0.85 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.3, duration: 0.4 }}
//         className={`flex items-center gap-2 rounded-full border border-[#0055A5]/20 bg-[#0055A5]/6 ${isSmall ? "px-2 py-1" : "px-3 py-1.5"}`}
//       >
//         {resolvedGmbImage ? (
//           <img
//             src={resolvedGmbImage}
//             alt={cityName}
//             className={`rounded-full object-cover flex-shrink-0 ${isSmall ? "w-5 h-5" : "w-6 h-6"}`}
//           />
//         ) : (
//           <MapPin size={isSmall ? 10 : 12} className="text-[#0055A5]" strokeWidth={2.5} />
//         )}
//         <span className={`font-bold text-[#0055A5] tracking-[0.06em] uppercase ${isSmall ? "text-[10px]" : "text-[11px]"}`}>
//           {cityName}
//         </span>
//       </motion.div>
//     );
//   };

//   return (
//     <>
//       {/* ── MAIN NAVBAR ─────────────────────────────────────────────── */}
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

//           {/* ── Logo — links to garudtata.com ── */}
//           <a
//             href={HOME_URL}
//             className="relative z-10 flex items-center gap-3 select-none group flex-shrink-0"
//             aria-label="Garud Tata — home"
//           >
//             <div className="h-[58px] w-[180px] sm:h-[64px] sm:w-[200px] lg:h-[76px] lg:w-[240px] flex items-center justify-start overflow-visible">
//               <img
//                 src={logoSrc}
//                 alt="Garud Tata"
//                 className="w-full h-full object-contain object-left transition-transform duration-500 group-hover:scale-105"
//               />
//             </div>
//           </a>

//           {/* ── City Badge (desktop) ── */}
//           <div className="hidden lg:block flex-shrink-0">
//             <CityBadge size="md" />
//           </div>

//           {/* ── Desktop Nav ── */}
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
//                   onClick={(e) => { e.preventDefault(); handleNav(link); }}
//                   className="relative px-4 py-2 rounded-full group cursor-pointer"
//                   aria-current={isActive ? "page" : undefined}
//                 >
//                   {isActive && (
//                     <motion.span
//                       layoutId="nav-active-pill"
//                       className="absolute inset-0 bg-[#0055A5]/10 rounded-full z-0"
//                       transition={{ type: "spring", stiffness: 350, damping: 30 }}
//                     />
//                   )}
//                   <span className={`relative z-10 text-[13px] font-semibold tracking-[0.03em] transition-colors duration-300 ${isActive ? "text-[#0055A5]" : "text-gray-600 group-hover:text-gray-900"}`}>
//                     {link.label}
//                   </span>
//                 </motion.a>
//               );
//             })}
//           </motion.nav>

//           {/* ── Desktop Actions ── */}
//           <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
//             <a
//               href={`tel:${phone}`}
//               className="group flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-700 hover:text-gray-900 text-[13px] font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md"
//             >
//               <Phone size={14} className="text-[#0055A5] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
//               <span>
//                 <span className="text-gray-400 text-[10px] uppercase tracking-wider mr-1.5 font-bold">Sales</span>
//                 {displayPhone}
//               </span>
//             </a>

//             <a
//               href="#contact"
//               onClick={(e) => { e.preventDefault(); handleNav({ label: "Contact", href: "#contact", type: "hash", hash: "contact" }); }}
//               className="relative overflow-hidden group flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0055A5] hover:bg-[#004488] text-white text-[13px] font-bold tracking-[0.05em] shadow-[0_4px_16px_rgba(0,85,165,0.3)] hover:shadow-[0_6px_22px_rgba(0,85,165,0.45)] hover:-translate-y-px transition-all duration-300"
//             >
//               <span className="relative z-10">GET OFFER</span>
//               <ArrowRight size={14} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
//               <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
//             </a>
//           </div>

//           {/* ── Mobile Icons ── */}
//           <div className="flex lg:hidden items-center gap-2">
//             <CityBadge size="sm" />
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

//       {/* ── MOBILE FULLSCREEN MENU ───────────────────────────────────── */}
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
//               <div className="flex items-center gap-3">
//                 <div className="h-[40px] w-[130px]">
//                   <img src={logoSrc} alt="Garud Tata" className="w-full h-full object-contain object-left" />
//                 </div>
//                 {/* GMB image + city name in menu header */}
//                 {cityName && resolvedGmbImage && (
//                   <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0055A5]/20 bg-[#0055A5]/6">
//                     <img
//                       src={resolvedGmbImage}
//                       alt={cityName}
//                       className="w-6 h-6 rounded-full object-cover flex-shrink-0"
//                     />
//                     <span className="text-[11px] font-bold text-[#0055A5] tracking-[0.06em] uppercase">
//                       {cityName}
//                     </span>
//                   </div>
//                 )}
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
//               {NAV_LINKS.map((link, i) => {
//                 const isActive = activeLink === link.href;
//                 return (
//                   <motion.a
//                     key={link.label}
//                     href={link.href}
//                     onClick={(e) => { e.preventDefault(); handleNav(link); }}
//                     initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
//                     animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
//                     transition={{ delay: i * 0.08 + 0.1, duration: 0.4, ease: "easeOut" }}
//                     className="group flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
//                   >
//                     <div className="flex items-center gap-4">
//                       <span className={`text-[10px] font-bold transition-colors ${isActive ? "text-[#0055A5]" : "text-[#0055A5]/40 group-hover:text-[#0055A5]"}`}>
//                         0{i + 1}
//                       </span>
//                       <span className={`text-[1.8rem] font-bold tracking-tight transition-all duration-300 ${isActive ? "text-[#0055A5]" : "text-gray-800 group-hover:text-[#0055A5] group-hover:translate-x-2"}`}>
//                         {link.label}
//                       </span>
//                     </div>
//                     <ChevronRight size={24} className={`transition-all ${isActive ? "text-[#0055A5]" : "text-gray-300 group-hover:text-[#0055A5] group-hover:translate-x-1"}`} />
//                   </motion.a>
//                 );
//               })}
//             </nav>

//             {/* Footer CTA */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.4 }}
//               className="p-6 space-y-3 pb-[calc(100px+env(safe-area-inset-bottom,0px))] flex-shrink-0"
//             >
//               <a
//                 href="#contact"
//                 onClick={(e) => { e.preventDefault(); handleNav({ label: "Contact", href: "#contact", type: "hash", hash: "contact" }); }}
//                 className="w-full flex items-center justify-between px-6 py-4 bg-[#0055A5] hover:bg-[#004488] rounded-2xl text-white font-bold tracking-[0.05em] text-[15px] shadow-lg transition-all active:scale-[0.98]"
//               >
//                 GET YOUR OFFER
//                 <ArrowRight size={18} />
//               </a>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ── MOBILE STICKY BOTTOM BAR ─────────────────────────────────── */}
//       <div
//         className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
//         style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
//       >
//         <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 grid grid-cols-2 h-[72px] shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
//           <a
//             href={`tel:${phone}`}
//             className="flex flex-col items-center justify-center gap-1.5 text-gray-600 hover:text-[#0055A5] active:text-[#0055A5] transition-colors border-r border-gray-100"
//           >
//             <Phone size={20} strokeWidth={2} />
//             <span className="text-[10px] uppercase tracking-wider font-bold">Call Sales</span>
//           </a>
//           <a
//             href="#contact"
//             onClick={(e) => { e.preventDefault(); handleNav({ label: "Contact", href: "#contact", type: "hash", hash: "contact" }); }}
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











// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { motion, AnimatePresence, type Variants } from "framer-motion";
// import { Phone, Menu, X, ArrowRight, Gift, ChevronRight, MapPin } from "lucide-react";
// import { showrooms, HOME_URL } from "@/app/config/showrooms";

// export interface CampaignNavbarProps {
//   phone?:          string;
//   vehicle?:        string;
//   logoSrc?:        string;
//   offerSectionId?: string;
//   gmbImage?:       string; // passed from config
// }

// const NAV_LINKS = [
//   { label: "Home",      href: "/",          type: "route", hash: null },
//   { label: "New Cars",  href: "#offers",    type: "route", hash: null },
//   { label: "Offers",    href: "#offers",    type: "hash",  hash: "offer-form" },
//   { label: "Showrooms", href: "#showrooms", type: "hash",  hash: "showrooms" },
//   { label: "Service",   href: "#showrooms", type: "hash",  hash: "showrooms" },
//   { label: "Contact",   href: "#contact",   type: "hash",  hash: "contact" },
// ];

// const navContainerVariants: Variants = {
//   hidden: { opacity: 0, y: -20 },
//   visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
// };
// const navItemVariants: Variants = {
//   hidden: { opacity: 0, y: -10 },
//   visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
// };

// // Derive city info from current pathname
// function useCityInfo() {
//   const pathname = usePathname();
//   const slug = pathname.split("/")[1] as keyof typeof showrooms;
//   if (slug && showrooms[slug]) {
//     const config   = showrooms[slug];
//     const cityName = config.name.split(" ").pop() ?? slug;
//     return { cityName, gmbImage: config.navbar.gmbImage };
//   }
//   return { cityName: null, gmbImage: null };
// }

// export default function CampaignNavbar({
//   phone          = "9217371204",
//   logoSrc        = "/images/logo.jpg",
//   offerSectionId = "offer-form",
//   gmbImage,
// }: CampaignNavbarProps) {
//   const router   = useRouter();
//   const pathname = usePathname();

//   const { cityName, gmbImage: configGmbImage } = useCityInfo();
//   // prop takes priority, fallback to config-derived
//   const resolvedGmbImage = gmbImage ?? configGmbImage;

//   const [scrolled,   setScrolled]  = useState(false);
//   const [menuOpen,   setMenuOpen]  = useState(false);
//   const [activeLink, setActiveLink] = useState<string>("/");

//   // ── Scroll detection ─────────────────────────────────────────────────
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // ── Body scroll lock ─────────────────────────────────────────────────
//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [menuOpen]);

//   // ── Sync active link with hash ───────────────────────────────────────
//   useEffect(() => {
//     const syncFromHash = () => {
//       const hash = window.location.hash;
//       if (hash)                setActiveLink(hash);
//       else if (pathname === "/") setActiveLink("/");
//       else                     setActiveLink(pathname);
//     };
//     syncFromHash();
//     window.addEventListener("hashchange", syncFromHash);
//     return () => window.removeEventListener("hashchange", syncFromHash);
//   }, [pathname]);

//   // ── IntersectionObserver ─────────────────────────────────────────────
//   useEffect(() => {
//     const hashLinks = NAV_LINKS.filter((l) => l.type === "hash" && l.hash);
//     const ids       = Array.from(new Set(hashLinks.map((l) => l.hash!)));
//     const sections  = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
//     if (!sections.length) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const matched = NAV_LINKS.find((l) => l.hash === entry.target.id);
//             if (matched) {
//               setActiveLink(matched.href);
//               history.replaceState(null, "", matched.href);
//             }
//           }
//         });
//       },
//       { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
//     );

//     sections.forEach((s) => observer.observe(s));
//     return () => observer.disconnect();
//   }, [pathname]);

//   // ── Navigation handler ───────────────────────────────────────────────
//   const handleNav = useCallback(
//     (link: (typeof NAV_LINKS)[number]) => {
//       setMenuOpen(false);

//       if (link.type === "route") {
//         setActiveLink(link.href);
//         router.push(link.href);
//         return;
//       }

//       const isOnCityPage = !!showrooms[pathname.split("/")[1] as keyof typeof showrooms];

//       if (isOnCityPage || pathname !== "/") {
//         // On a city page — scroll within same page
//         const targetId = link.hash ?? link.href.replace("#", "");
//         const el = document.getElementById(targetId);
//         if (el) el.scrollIntoView({ behavior: "smooth" });
//         history.pushState(null, "", link.href);
//         setActiveLink(link.href);
//         return;
//       }

//       const targetId = link.hash ?? link.href.replace("#", "");
//       const el = document.getElementById(targetId);
//       if (el) el.scrollIntoView({ behavior: "smooth" });
//       history.pushState(null, "", link.href);
//       setActiveLink(link.href);
//     },
//     [pathname, router]
//   );

//   const displayPhone = phone.replace(/(\d{5})(\d{5})/, "$1 $2");

//   // ── City Badge ───────────────────────────────────────────────────────
//   const CityBadge = ({ size = "md" }: { size?: "sm" | "md" }) => {
//     if (!cityName) return null;
//     const isSmall = size === "sm";
//     return (
//       <motion.div
//         initial={{ opacity: 0, scale: 0.85 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.3, duration: 0.4 }}
//         className={`flex items-center gap-2 rounded-full border border-[#0055A5]/20 bg-[#0055A5]/6 ${isSmall ? "px-2 py-1" : "px-3 py-1.5"}`}
//       >
//         {resolvedGmbImage ? (
//           <img
//             src={resolvedGmbImage}
//             alt={cityName}
//             className={`rounded-full object-cover flex-shrink-0 ${isSmall ? "w-5 h-5" : "w-6 h-6"}`}
//           />
//         ) : (
//           <MapPin size={isSmall ? 10 : 12} className="text-[#0055A5]" strokeWidth={2.5} />
//         )}
//         <span className={`font-bold text-[#0055A5] tracking-[0.06em] uppercase ${isSmall ? "text-[10px]" : "text-[11px]"}`}>
//           {cityName}
//         </span>
//       </motion.div>
//     );
//   };

//   return (
//     <>
//       {/* ── MAIN NAVBAR ─────────────────────────────────────────────── */}
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

//           {/* ── Logo — links to garudtata.com ── */}
          
//             href={HOME_URL}
//             className="relative z-10 flex items-center gap-3 select-none group flex-shrink-0"
//             aria-label="Garud Tata — home"
//           >
//             <div className="h-[58px] w-[180px] sm:h-[64px] sm:w-[200px] lg:h-[76px] lg:w-[240px] flex items-center justify-start overflow-visible">
//               <img
//                 src={logoSrc}
//                 alt="Garud Tata"
//                 className="w-full h-full object-contain object-left transition-transform duration-500 group-hover:scale-105"
//               />
//             </div>
//           </a>

//           {/* ── City Badge (desktop) ── */}
//           <div className="hidden lg:block flex-shrink-0">
//             <CityBadge size="md" />
//           </div>

//           {/* ── Desktop Nav ── */}
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
//                   onClick={(e) => { e.preventDefault(); handleNav(link); }}
//                   className="relative px-4 py-2 rounded-full group cursor-pointer"
//                   aria-current={isActive ? "page" : undefined}
//                 >
//                   {isActive && (
//                     <motion.span
//                       layoutId="nav-active-pill"
//                       className="absolute inset-0 bg-[#0055A5]/10 rounded-full z-0"
//                       transition={{ type: "spring", stiffness: 350, damping: 30 }}
//                     />
//                   )}
//                   <span className={`relative z-10 text-[13px] font-semibold tracking-[0.03em] transition-colors duration-300 ${isActive ? "text-[#0055A5]" : "text-gray-600 group-hover:text-gray-900"}`}>
//                     {link.label}
//                   </span>
//                 </motion.a>
//               );
//             })}
//           </motion.nav>

//           {/* ── Desktop Actions ── */}
//           <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            
//               href={`tel:${phone}`}
//               className="group flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-700 hover:text-gray-900 text-[13px] font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md"
//             >
//               <Phone size={14} className="text-[#0055A5] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
//               <span>
//                 <span className="text-gray-400 text-[10px] uppercase tracking-wider mr-1.5 font-bold">Sales</span>
//                 {displayPhone}
//               </span>
//             </a>

            
//               href="#contact"
//               onClick={(e) => { e.preventDefault(); handleNav({ label: "Contact", href: "#contact", type: "hash", hash: "contact" }); }}
//               className="relative overflow-hidden group flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0055A5] hover:bg-[#004488] text-white text-[13px] font-bold tracking-[0.05em] shadow-[0_4px_16px_rgba(0,85,165,0.3)] hover:shadow-[0_6px_22px_rgba(0,85,165,0.45)] hover:-translate-y-px transition-all duration-300"
//             >
//               <span className="relative z-10">GET OFFER</span>
//               <ArrowRight size={14} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
//               <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
//             </a>
//           </div>

//           {/* ── Mobile Icons ── */}
//           <div className="flex lg:hidden items-center gap-2">
//             <CityBadge size="sm" />
            
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

//       {/* ── MOBILE FULLSCREEN MENU ───────────────────────────────────── */}
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
//               <div className="flex items-center gap-3">
//                 <div className="h-[40px] w-[130px]">
//                   <img src={logoSrc} alt="Garud Tata" className="w-full h-full object-contain object-left" />
//                 </div>
//                 {/* GMB image + city name in menu header */}
//                 {cityName && resolvedGmbImage && (
//                   <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0055A5]/20 bg-[#0055A5]/6">
//                     <img
//                       src={resolvedGmbImage}
//                       alt={cityName}
//                       className="w-6 h-6 rounded-full object-cover flex-shrink-0"
//                     />
//                     <span className="text-[11px] font-bold text-[#0055A5] tracking-[0.06em] uppercase">
//                       {cityName}
//                     </span>
//                   </div>
//                 )}
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
//               {NAV_LINKS.map((link, i) => {
//                 const isActive = activeLink === link.href;
//                 return (
//                   <motion.a
//                     key={link.label}
//                     href={link.href}
//                     onClick={(e) => { e.preventDefault(); handleNav(link); }}
//                     initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
//                     animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
//                     transition={{ delay: i * 0.08 + 0.1, duration: 0.4, ease: "easeOut" }}
//                     className="group flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
//                   >
//                     <div className="flex items-center gap-4">
//                       <span className={`text-[10px] font-bold transition-colors ${isActive ? "text-[#0055A5]" : "text-[#0055A5]/40 group-hover:text-[#0055A5]"}`}>
//                         0{i + 1}
//                       </span>
//                       <span className={`text-[1.8rem] font-bold tracking-tight transition-all duration-300 ${isActive ? "text-[#0055A5]" : "text-gray-800 group-hover:text-[#0055A5] group-hover:translate-x-2"}`}>
//                         {link.label}
//                       </span>
//                     </div>
//                     <ChevronRight size={24} className={`transition-all ${isActive ? "text-[#0055A5]" : "text-gray-300 group-hover:text-[#0055A5] group-hover:translate-x-1"}`} />
//                   </motion.a>
//                 );
//               })}
//             </nav>

//             {/* Footer CTA */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.4 }}
//               className="p-6 space-y-3 pb-[calc(100px+env(safe-area-inset-bottom,0px))] flex-shrink-0"
//             >
              
//                 href="#contact"
//                 onClick={(e) => { e.preventDefault(); handleNav({ label: "Contact", href: "#contact", type: "hash", hash: "contact" }); }}
//                 className="w-full flex items-center justify-between px-6 py-4 bg-[#0055A5] hover:bg-[#004488] rounded-2xl text-white font-bold tracking-[0.05em] text-[15px] shadow-lg transition-all active:scale-[0.98]"
//               >
//                 GET YOUR OFFER
//                 <ArrowRight size={18} />
//               </a>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ── MOBILE STICKY BOTTOM BAR ─────────────────────────────────── */}
//       <div
//         className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
//         style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
//       >
//         <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 grid grid-cols-2 h-[72px] shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
          
//             href={`tel:${phone}`}
//             className="flex flex-col items-center justify-center gap-1.5 text-gray-600 hover:text-[#0055A5] active:text-[#0055A5] transition-colors border-r border-gray-100"
//           >
//             <Phone size={20} strokeWidth={2} />
//             <span className="text-[10px] uppercase tracking-wider font-bold">Call Sales</span>
//           </a>
          
//             href="#contact"
//             onClick={(e) => { e.preventDefault(); handleNav({ label: "Contact", href: "#contact", type: "hash", hash: "contact" }); }}
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





















// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { motion, AnimatePresence, type Variants } from "framer-motion";
// import { Phone, Menu, X, ArrowRight, Gift, ChevronRight, MapPin } from "lucide-react";
// import { showrooms, HOME_URL } from "@/app/config/showrooms";

// export interface CampaignNavbarProps {
//   phone?:          string;
//   vehicle?:        string;
//   logoSrc?:        string;
//   offerSectionId?: string;
//   gmbImage?:       string;
// }

// const NAV_LINKS = [
//   { label: "Home",      href: "/",          type: "route", hash: null },
//   { label: "New Cars",  href: "#offers",    type: "route", hash: null },
//   { label: "Offers",    href: "#offers",    type: "hash",  hash: "offer-form" },
//   { label: "Showrooms", href: "#showrooms", type: "hash",  hash: "showrooms" },
//   { label: "Service",   href: "#showrooms", type: "hash",  hash: "showrooms" },
//   { label: "Contact",   href: "#contact",   type: "hash",  hash: "contact" },
// ];

// const navContainerVariants: Variants = {
//   hidden: { opacity: 0, y: -20 },
//   visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
// };
// const navItemVariants: Variants = {
//   hidden: { opacity: 0, y: -10 },
//   visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
// };

// // function useCityInfo() {
// //   const pathname = usePathname();
// //   const slug = pathname.split("/")[1] as keyof typeof showrooms;
// //   if (slug && showrooms[slug]) {
// //     const config   = showrooms[slug];
// //     const cityName = config.name.split(" ").pop() ?? slug;
// //     return { cityName, gmbImage: config.navbar.gmbImage };
// //   }
// //   return { cityName: null, gmbImage: null };
// // }







// function useCityInfo() {
//   const pathname = usePathname();
  
//   // Try slug from path first: /palam → "palam", /narela → "narela"
//   const pathSlug = pathname.split("/")[1] as keyof typeof showrooms;
  
//   // On root "/" default to palam (the main showroom)
//   const slug = (pathSlug && showrooms[pathSlug]) ? pathSlug : "palam";
  
//   const config   = showrooms[slug];
//   const cityName = config.name.split(" ").pop() ?? slug;
//   return { cityName, gmbImage: config.navbar.gmbImage };
// }
// export default function CampaignNavbar({
//   phone          = "9217371204",
//   logoSrc        = "/images/logo.jpg",
//   offerSectionId = "offer-form",
//   gmbImage,
// }: CampaignNavbarProps) {
//   const router   = useRouter();
//   const pathname = usePathname();

//   const { cityName, gmbImage: configGmbImage } = useCityInfo();
//   const resolvedGmbImage = gmbImage ?? configGmbImage;

//   const [scrolled,    setScrolled]   = useState(false);
//   const [menuOpen,    setMenuOpen]   = useState(false);
//   const [activeLink,  setActiveLink] = useState<string>("/");

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [menuOpen]);

//   useEffect(() => {
//     const syncFromHash = () => {
//       const hash = window.location.hash;
//       if (hash)              setActiveLink(hash);
//       else if (pathname === "/") setActiveLink("/");
//       else                   setActiveLink(pathname);
//     };
//     syncFromHash();
//     window.addEventListener("hashchange", syncFromHash);
//     return () => window.removeEventListener("hashchange", syncFromHash);
//   }, [pathname]);

//   useEffect(() => {
//     const hashLinks = NAV_LINKS.filter((l) => l.type === "hash" && l.hash);
//     const ids       = Array.from(new Set(hashLinks.map((l) => l.hash!)));
//     const sections  = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
//     if (!sections.length) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             const matched = NAV_LINKS.find((l) => l.hash === entry.target.id);
//             if (matched) {
//               setActiveLink(matched.href);
//               history.replaceState(null, "", matched.href);
//             }
//           }
//         });
//       },
//       { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
//     );

//     sections.forEach((s) => observer.observe(s));
//     return () => observer.disconnect();
//   }, [pathname]);

//   const handleNav = useCallback(
//     (link: (typeof NAV_LINKS)[number]) => {
//       setMenuOpen(false);

//       if (link.type === "route") {
//         setActiveLink(link.href);
//         router.push(link.href);
//         return;
//       }

//       const targetId = link.hash ?? link.href.replace("#", "");
//       const el = document.getElementById(targetId);
//       if (el) el.scrollIntoView({ behavior: "smooth" });
//       history.pushState(null, "", link.href);
//       setActiveLink(link.href);
//     },
//     [pathname, router]
//   );

//   const displayPhone = phone.replace(/(\d{5})(\d{5})/, "$1 $2");

//   const CityBadge = ({ size = "md" }: { size?: "sm" | "md" }) => {
//     if (!cityName) return null;
//     const isSmall = size === "sm";
//     return (
//       <motion.div
//         initial={{ opacity: 0, scale: 0.85 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 0.3, duration: 0.4 }}
//         className={`flex items-center gap-2 rounded-full border border-[#0055A5]/20 bg-[#0055A5]/6 ${isSmall ? "px-2 py-1" : "px-3 py-1.5"}`}
//       >
//         {resolvedGmbImage ? (
//           <img
//             src={resolvedGmbImage}
//             alt={cityName}
//             className={`rounded-full object-cover flex-shrink-0 ${isSmall ? "w-5 h-5" : "w-6 h-6"}`}
//           />
//         ) : (
//           <MapPin size={isSmall ? 10 : 12} className="text-[#0055A5]" strokeWidth={2.5} />
//         )}
//         <span className={`font-bold text-[#0055A5] tracking-[0.06em] uppercase ${isSmall ? "text-[10px]" : "text-[11px]"}`}>
//           {cityName}
//         </span>
//       </motion.div>
//     );
//   };

//   return (
//     <>
//       {/* ── MAIN NAVBAR ── */}
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

//           {/* ── Logo ── */}
//           <a
//             href={HOME_URL}
//             className="relative z-10 flex items-center gap-3 select-none group flex-shrink-0"
//             aria-label="Garud Tata — home"
//           >
//             <div className="h-[58px] w-[180px] sm:h-[64px] sm:w-[200px] lg:h-[76px] lg:w-[240px] flex items-center justify-start overflow-visible">
//               <img
//                 src={logoSrc}
//                 alt="Garud Tata"
//                 className="w-full h-full object-contain object-left transition-transform duration-500 group-hover:scale-105"
//               />
//             </div>
//           </a>

//           {/* ── City Badge (desktop) ── */}
//           <div className="hidden lg:block flex-shrink-0">
//             <CityBadge size="md" />
//           </div>

//           {/* ── Desktop Nav ── */}
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
//                   onClick={(e) => { e.preventDefault(); handleNav(link); }}
//                   className="relative px-4 py-2 rounded-full group cursor-pointer"
//                   aria-current={isActive ? "page" : undefined}
//                 >
//                   {isActive && (
//                     <motion.span
//                       layoutId="nav-active-pill"
//                       className="absolute inset-0 bg-[#0055A5]/10 rounded-full z-0"
//                       transition={{ type: "spring", stiffness: 350, damping: 30 }}
//                     />
//                   )}
//                   <span className={`relative z-10 text-[13px] font-semibold tracking-[0.03em] transition-colors duration-300 ${isActive ? "text-[#0055A5]" : "text-gray-600 group-hover:text-gray-900"}`}>
//                     {link.label}
//                   </span>
//                 </motion.a>
//               );
//             })}
//           </motion.nav>

//           {/* ── Desktop Actions ── */}
//           <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
//             <a
//               href={`tel:${phone}`}
//               className="group flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:border-gray-300 text-gray-700 hover:text-gray-900 text-[13px] font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md"
//             >
//               <Phone size={14} className="text-[#0055A5] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
//               <span>
//                 <span className="text-gray-400 text-[10px] uppercase tracking-wider mr-1.5 font-bold">Sales</span>
//                 {displayPhone}
//               </span>
//             </a>

//             <a
//               href="#contact"
//               onClick={(e) => { e.preventDefault(); handleNav({ label: "Contact", href: "#contact", type: "hash", hash: "contact" }); }}
//               className="relative overflow-hidden group flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0055A5] hover:bg-[#004488] text-white text-[13px] font-bold tracking-[0.05em] shadow-[0_4px_16px_rgba(0,85,165,0.3)] hover:shadow-[0_6px_22px_rgba(0,85,165,0.45)] hover:-translate-y-px transition-all duration-300"
//             >
//               <span className="relative z-10">GET OFFER</span>
//               <ArrowRight size={14} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
//               <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
//             </a>
//           </div>

//           {/* ── Mobile Icons ── */}
//           <div className="flex lg:hidden items-center gap-2">
//             <CityBadge size="sm" />
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

//       {/* ── MOBILE FULLSCREEN MENU ── */}
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
//               <div className="flex items-center gap-3">
//                 <div className="h-[40px] w-[130px]">
//                   <img src={logoSrc} alt="Garud Tata" className="w-full h-full object-contain object-left" />
//                 </div>
//                 {cityName && resolvedGmbImage && (
//                   <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0055A5]/20 bg-[#0055A5]/6">
//                     <img
//                       src={resolvedGmbImage}
//                       alt={cityName}
//                       className="w-6 h-6 rounded-full object-cover flex-shrink-0"
//                     />
//                     <span className="text-[11px] font-bold text-[#0055A5] tracking-[0.06em] uppercase">
//                       {cityName}
//                     </span>
//                   </div>
//                 )}
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
//               {NAV_LINKS.map((link, i) => {
//                 const isActive = activeLink === link.href;
//                 return (
//                   <motion.a
//                     key={link.label}
//                     href={link.href}
//                     onClick={(e) => { e.preventDefault(); handleNav(link); }}
//                     initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
//                     animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
//                     transition={{ delay: i * 0.08 + 0.1, duration: 0.4, ease: "easeOut" }}
//                     className="group flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
//                   >
//                     <div className="flex items-center gap-4">
//                       <span className={`text-[10px] font-bold transition-colors ${isActive ? "text-[#0055A5]" : "text-[#0055A5]/40 group-hover:text-[#0055A5]"}`}>
//                         0{i + 1}
//                       </span>
//                       <span className={`text-[1.8rem] font-bold tracking-tight transition-all duration-300 ${isActive ? "text-[#0055A5]" : "text-gray-800 group-hover:text-[#0055A5] group-hover:translate-x-2"}`}>
//                         {link.label}
//                       </span>
//                     </div>
//                     <ChevronRight size={24} className={`transition-all ${isActive ? "text-[#0055A5]" : "text-gray-300 group-hover:text-[#0055A5] group-hover:translate-x-1"}`} />
//                   </motion.a>
//                 );
//               })}
//             </nav>

//             {/* Footer CTA */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.4, duration: 0.4 }}
//               className="p-6 space-y-3 pb-[calc(100px+env(safe-area-inset-bottom,0px))] flex-shrink-0"
//             >
//               <a
//                 href="#contact"
//                 onClick={(e) => { e.preventDefault(); handleNav({ label: "Contact", href: "#contact", type: "hash", hash: "contact" }); }}
//                 className="w-full flex items-center justify-between px-6 py-4 bg-[#0055A5] hover:bg-[#004488] rounded-2xl text-white font-bold tracking-[0.05em] text-[15px] shadow-lg transition-all active:scale-[0.98]"
//               >
//                 GET YOUR OFFER
//                 <ArrowRight size={18} />
//               </a>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ── MOBILE STICKY BOTTOM BAR ── */}
//       <div
//         className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
//         style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
//       >
//         <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 grid grid-cols-2 h-[72px] shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
//           <a
//             href={`tel:${phone}`}
//             className="flex flex-col items-center justify-center gap-1.5 text-gray-600 hover:text-[#0055A5] active:text-[#0055A5] transition-colors border-r border-gray-100"
//           >
//             <Phone size={20} strokeWidth={2} />
//             <span className="text-[10px] uppercase tracking-wider font-bold">Call Sales</span>
//           </a>
//           <a
//             href="#contact"
//             onClick={(e) => { e.preventDefault(); handleNav({ label: "Contact", href: "#contact", type: "hash", hash: "contact" }); }}
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
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Phone, Menu, X, ArrowRight, Gift, ChevronRight, MapPin, MessageCircle, Copy, Check } from "lucide-react";
import { showrooms, HOME_URL } from "@/app/config/showrooms";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export interface CampaignNavbarProps {
  phone?:          string;
  vehicle?:        string;
  logoSrc?:        string;
  offerSectionId?: string;
  gmbImage?:       string;
}

const NAV_LINKS = [
  { label: "Home",      href: "/",          type: "route", hash: null },
  { label: "New Cars",  href: "#offers",    type: "route", hash: null },
  { label: "Offers",    href: "#offers",    type: "hash",  hash: "offer-form" },
  { label: "Showrooms", href: "#showrooms", type: "hash",  hash: "showrooms" },
  { label: "Service",   href: "#showrooms", type: "hash",  hash: "showrooms" },
  { label: "Contact",   href: "#contact",   type: "hash",  hash: "contact" },
];

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello! I would like to enquire about a new Tata car at Garud Tata. Could you please share details about availability, pricing, and current offers?"
);

const navContainerVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

function useCityInfo() {
  const pathname = usePathname();
  const pathSlug = pathname.split("/")[1] as keyof typeof showrooms;
  const slug = (pathSlug && showrooms[pathSlug]) ? pathSlug : "palam";
  const config   = showrooms[slug];
  const cityName = config.name.split(" ").pop() ?? slug;
  return { cityName, gmbImage: config.navbar.gmbImage };
}

/** Fire Google Ads conversion for phone/whatsapp clicks */
function fireCallConversion() {
  window.gtag?.("event", "conversion", {
    send_to: "AW-18209967669/FeICCNezs-gcELWcmOtD",
  });
}

export default function CampaignNavbar({
  phone          = "919217371211",
  logoSrc        = "/images/logo.jpg",
  offerSectionId = "offer-form",
  gmbImage,
}: CampaignNavbarProps) {
  const router   = useRouter();
  const pathname = usePathname();

  const { cityName, gmbImage: configGmbImage } = useCityInfo();
  const resolvedGmbImage = gmbImage ?? configGmbImage;

  const [scrolled,    setScrolled]   = useState(false);
  const [menuOpen,    setMenuOpen]   = useState(false);
  const [activeLink,  setActiveLink] = useState<string>("/");
  const [copied,      setCopied]     = useState(false);

  // Raw digits only for tel: and WhatsApp links
  const rawPhone      = phone.replace(/\D/g, "");           // "919217371211"
  const displayPhone  = "+91 92173 71211";
  const whatsappHref  = `https://wa.me/${rawPhone}?text=${WHATSAPP_MESSAGE}`;
  const telHref       = `tel:+${rawPhone}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash)              setActiveLink(hash);
      else if (pathname === "/") setActiveLink("/");
      else                   setActiveLink(pathname);
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [pathname]);

  useEffect(() => {
    const hashLinks = NAV_LINKS.filter((l) => l.type === "hash" && l.hash);
    const ids       = Array.from(new Set(hashLinks.map((l) => l.hash!)));
    const sections  = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matched = NAV_LINKS.find((l) => l.hash === entry.target.id);
            if (matched) {
              setActiveLink(matched.href);
              history.replaceState(null, "", matched.href);
            }
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  const handleNav = useCallback(
    (link: (typeof NAV_LINKS)[number]) => {
      setMenuOpen(false);
      if (link.type === "route") {
        setActiveLink(link.href);
        router.push(link.href);
        return;
      }
      const targetId = link.hash ?? link.href.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", link.href);
      setActiveLink(link.href);
    },
    [pathname, router]
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(displayPhone).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [displayPhone]);

  const CityBadge = ({ size = "md" }: { size?: "sm" | "md" }) => {
    if (!cityName) return null;
    const isSmall = size === "sm";
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className={`flex items-center gap-2 rounded-full border border-[#0055A5]/20 bg-[#0055A5]/6 ${isSmall ? "px-2 py-1" : "px-3 py-1.5"}`}
      >
        {resolvedGmbImage ? (
          <img
            src={resolvedGmbImage}
            alt={cityName}
            className={`rounded-full object-cover flex-shrink-0 ${isSmall ? "w-5 h-5" : "w-6 h-6"}`}
          />
        ) : (
          <MapPin size={isSmall ? 10 : 12} className="text-[#0055A5]" strokeWidth={2.5} />
        )}
        <span className={`font-bold text-[#0055A5] tracking-[0.06em] uppercase ${isSmall ? "text-[10px]" : "text-[11px]"}`}>
          {cityName}
        </span>
      </motion.div>
    );
  };

  return (
    <>
      {/* ── MAIN NAVBAR ── */}
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

          {/* ── Logo ── */}
          <a
            href={HOME_URL}
            className="relative z-10 flex items-center gap-3 select-none group flex-shrink-0"
            aria-label="Garud Tata — home"
          >
            <div className="h-[58px] w-[180px] sm:h-[64px] sm:w-[200px] lg:h-[76px] lg:w-[240px] flex items-center justify-start overflow-visible">
              <img
                src={logoSrc}
                alt="Garud Tata"
                className="w-full h-full object-contain object-left transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </a>

          {/* ── City Badge (desktop) ── */}
          <div className="hidden lg:block flex-shrink-0">
            <CityBadge size="md" />
          </div>

          {/* ── Desktop Nav ── */}
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
                  onClick={(e) => { e.preventDefault(); handleNav(link); }}
                  className="relative px-4 py-2 rounded-full group cursor-pointer"
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-[#0055A5]/10 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 text-[13px] font-semibold tracking-[0.03em] transition-colors duration-300 ${isActive ? "text-[#0055A5]" : "text-gray-600 group-hover:text-gray-900"}`}>
                    {link.label}
                  </span>
                </motion.a>
              );
            })}
          </motion.nav>

          {/* ── Desktop Actions ── */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">

            {/* Phone number — click to call + copy */}
            <div className="flex items-center rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden">
              {/* Call */}
              <a
                href={telHref}
                onClick={fireCallConversion}
                className="group flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-gray-700 hover:text-gray-900 text-[13px] font-semibold tracking-wide transition-all duration-200 border-r border-gray-100"
                aria-label={`Call ${displayPhone}`}
              >
                <Phone size={14} className="text-[#0055A5] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                <span>
                  <span className="text-gray-400 text-[10px] uppercase tracking-wider mr-1.5 font-bold">Sales</span>
                  {displayPhone}
                </span>
              </a>
              {/* Copy */}
              <button
                onClick={handleCopy}
                title="Copy number"
                className="px-3 py-2.5 hover:bg-gray-50 text-gray-400 hover:text-[#0055A5] transition-colors"
                aria-label="Copy phone number"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.span key="check" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}>
                      <Check size={13} className="text-green-500" strokeWidth={2.5} />
                    </motion.span>
                  ) : (
                    <motion.span key="copy" initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}>
                      <Copy size={13} strokeWidth={2.5} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* WhatsApp */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={fireCallConversion}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full border border-green-200 bg-green-50 hover:bg-green-100 text-green-700 text-[13px] font-semibold tracking-wide transition-all duration-200 shadow-sm hover:shadow-md"
              aria-label="WhatsApp enquiry"
            >
              <MessageCircle size={14} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
              <span>WhatsApp</span>
            </a>

            {/* Get Offer CTA */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNav({ label: "Contact", href: "#contact", type: "hash", hash: "contact" }); }}
              className="relative overflow-hidden group flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0055A5] hover:bg-[#004488] text-white text-[13px] font-bold tracking-[0.05em] shadow-[0_4px_16px_rgba(0,85,165,0.3)] hover:shadow-[0_6px_22px_rgba(0,85,165,0.45)] hover:-translate-y-px transition-all duration-300"
            >
              <span className="relative z-10">GET OFFER</span>
              <ArrowRight size={14} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
            </a>
          </div>

          {/* ── Mobile Icons ── */}
          <div className="flex lg:hidden items-center gap-2">
            <CityBadge size="sm" />
            {/* WhatsApp */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={fireCallConversion}
              className="p-2 text-green-600 bg-green-50 rounded-full hover:bg-green-100 transition-colors"
              aria-label="WhatsApp enquiry"
            >
              <MessageCircle size={18} strokeWidth={2} />
            </a>
            {/* Call */}
            <a
              href={telHref}
              onClick={fireCallConversion}
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

      {/* ── MOBILE FULLSCREEN MENU ── */}
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
              <div className="flex items-center gap-3">
                <div className="h-[40px] w-[130px]">
                  <img src={logoSrc} alt="Garud Tata" className="w-full h-full object-contain object-left" />
                </div>
                {cityName && resolvedGmbImage && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#0055A5]/20 bg-[#0055A5]/6">
                    <img
                      src={resolvedGmbImage}
                      alt={cityName}
                      className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                    />
                    <span className="text-[11px] font-bold text-[#0055A5] tracking-[0.06em] uppercase">
                      {cityName}
                    </span>
                  </div>
                )}
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
              {NAV_LINKS.map((link, i) => {
                const isActive = activeLink === link.href;
                return (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link); }}
                    initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{ delay: i * 0.08 + 0.1, duration: 0.4, ease: "easeOut" }}
                    className="group flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-bold transition-colors ${isActive ? "text-[#0055A5]" : "text-[#0055A5]/40 group-hover:text-[#0055A5]"}`}>
                        0{i + 1}
                      </span>
                      <span className={`text-[1.8rem] font-bold tracking-tight transition-all duration-300 ${isActive ? "text-[#0055A5]" : "text-gray-800 group-hover:text-[#0055A5] group-hover:translate-x-2"}`}>
                        {link.label}
                      </span>
                    </div>
                    <ChevronRight size={24} className={`transition-all ${isActive ? "text-[#0055A5]" : "text-gray-300 group-hover:text-[#0055A5] group-hover:translate-x-1"}`} />
                  </motion.a>
                );
              })}
            </nav>

            {/* Mobile menu footer — Call + Copy + WhatsApp + Get Offer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="p-6 space-y-3 pb-[calc(100px+env(safe-area-inset-bottom,0px))] flex-shrink-0"
            >
              {/* Number row */}
              <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                <Phone size={16} className="text-[#0055A5] flex-shrink-0" strokeWidth={2.5} />
                <a
                  href={telHref}
                  onClick={fireCallConversion}
                  className="flex-1 text-[15px] font-bold text-gray-800"
                >
                  {displayPhone}
                </a>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-[#0055A5] transition-colors"
                  aria-label="Copy number"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span key="check" initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }}>
                        <Check size={15} className="text-green-500" strokeWidth={2.5} />
                      </motion.span>
                    ) : (
                      <motion.span key="copy" initial={{ scale: 0.7 }} animate={{ scale: 1 }} exit={{ scale: 0.7 }}>
                        <Copy size={15} strokeWidth={2.5} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              {/* WhatsApp */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={fireCallConversion}
                className="w-full flex items-center justify-between px-6 py-4 bg-green-500 hover:bg-green-600 rounded-2xl text-white font-bold tracking-[0.05em] text-[15px] shadow-lg transition-all active:scale-[0.98]"
              >
                <span className="flex items-center gap-2">
                  <MessageCircle size={18} strokeWidth={2} />
                  WHATSAPP ENQUIRY
                </span>
                <ArrowRight size={18} />
              </a>

              {/* Get Offer */}
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNav({ label: "Contact", href: "#contact", type: "hash", hash: "contact" }); }}
                className="w-full flex items-center justify-between px-6 py-4 bg-[#0055A5] hover:bg-[#004488] rounded-2xl text-white font-bold tracking-[0.05em] text-[15px] shadow-lg transition-all active:scale-[0.98]"
              >
                GET YOUR OFFER
                <ArrowRight size={18} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MOBILE STICKY BOTTOM BAR ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 grid grid-cols-3 h-[72px] shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
          {/* Call */}
          <a
            href={telHref}
            onClick={fireCallConversion}
            className="flex flex-col items-center justify-center gap-1.5 text-gray-600 hover:text-[#0055A5] active:text-[#0055A5] transition-colors border-r border-gray-100"
          >
            <Phone size={20} strokeWidth={2} />
            <span className="text-[10px] uppercase tracking-wider font-bold">Call Sales</span>
          </a>
          {/* WhatsApp */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={fireCallConversion}
            className="flex flex-col items-center justify-center gap-1.5 text-green-600 hover:text-green-700 active:text-green-700 transition-colors border-r border-gray-100"
          >
            <MessageCircle size={20} strokeWidth={2} />
            <span className="text-[10px] uppercase tracking-wider font-bold">WhatsApp</span>
          </a>
          {/* Get Offer */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNav({ label: "Contact", href: "#contact", type: "hash", hash: "contact" }); }}
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