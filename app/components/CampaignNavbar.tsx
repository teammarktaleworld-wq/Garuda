
// // garud-tata\app\components\CampaignNavbar.tsx

// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence, type Variants } from "framer-motion";
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
//     transition: { type: "spring", stiffness: 300, damping: 24 } 
//   },
// };

// // ─── COMPONENT ─────────────────────────────────────────────────────────────────
// export default function CampaignNavbar({
//   phone = "9876543210",
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
//          MAIN NAVBAR — Desktop & Mobile Header
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
//          MOBILE FULLSCREEN MENU
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
//          MOBILE STICKY BOTTOM BAR
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
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Phone, Menu, X, ArrowRight, Gift, ChevronRight } from "lucide-react";

export interface CampaignNavbarProps {
  phone?: string;
  vehicle?: string;
  logoSrc?: string;
  offerSectionId?: string;
}

const NAV_LINKS = [
  { label: "Home", href: "/", type: "route", hash: null },
  { label: "New Cars", href: "#offers", type: "route", hash: null },
  { label: "Offers", href: "#offers", type: "hash", hash: "offer-form" },
  { label: "Showrooms", href: "#showrooms", type: "hash", hash: "showrooms" },
  { label: "Service", href: "#showrooms", type: "hash", hash: "showrooms" },
  { label: "Contact", href: "#contact", type: "hash", hash: "contact" },
];

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
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function CampaignNavbar({
  phone = "9217371204",
  vehicle,
  logoSrc = "/images/logo.jpg",
  offerSectionId = "offer-form",
}: CampaignNavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("/");

  // ── Scroll detection ────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Body scroll lock ────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Sync active link with URL hash on mount / hash change ───────────────
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash; // e.g. "#contact"
      if (hash) {
        setActiveLink(hash);
      } else if (pathname === "/") {
        setActiveLink("/");
      } else {
        setActiveLink(pathname);
      }
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [pathname]);

  // ── IntersectionObserver — hash sections only ───────────────────────────
  useEffect(() => {
    if (pathname !== "/") return; // only observe on home page

    const hashLinks = NAV_LINKS.filter((l) => l.type === "hash" && l.hash);
    const ids = Array.from(new Set(hashLinks.map((l) => l.hash!)));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matchedLink = NAV_LINKS.find((l) => l.hash === entry.target.id);
            if (matchedLink) {
              const newHash = matchedLink.href; // e.g. "#contact"
              setActiveLink(newHash);
              // Update browser URL without full navigation
              history.replaceState(null, "", newHash);
            }
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  // ── Navigation handler ──────────────────────────────────────────────────
  const handleNav = useCallback(
    (link: (typeof NAV_LINKS)[number]) => {
      setMenuOpen(false);

      if (link.type === "route") {
        // Pure route navigation (Home → /, New Cars → /offers)
        setActiveLink(link.href);
        router.push(link.href);
        return;
      }

      // Hash navigation — always push hash to URL
      if (pathname !== "/") {
        // Navigate to home first, then scroll after load
        router.push(`/${link.href}`);
        setActiveLink(link.href);
        return;
      }

      // Already on home — scroll + update URL
      const targetId = link.hash ?? link.href.replace("#", "");
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      history.pushState(null, "", link.href);
      setActiveLink(link.href);
    },
    [pathname, router]
  );

  const displayPhone = phone.replace(/(\d{5})(\d{5})/, "$1 $2");

  // ─── RENDER ─────────────────────────────────────────────────────────────
  return (
    <>
      {/* ═══════════════════════════════
          MAIN NAVBAR
      ═══════════════════════════════ */}
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
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNav({
                label: "Home",
                href: "/",
                type: "route",
                hash: null,
              });
            }}
            className="relative z-10 flex items-center gap-3 select-none group flex-shrink-0"
            aria-label="Garud Tata — home"
          >
            {/* Large Garud Tata Logo */}
            <div className="h-[58px] w-[180px] sm:h-[64px] sm:w-[200px] lg:h-[76px] lg:w-[240px] flex items-center justify-start overflow-visible">
              <img
                src={logoSrc}
                alt="Garud Tata"
                className="w-full h-full object-contain object-left transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </a>

          {/* ── Desktop Navigation ── */}
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
                  <span
                    className={`
                      relative z-10 text-[13px] font-semibold tracking-[0.03em]
                      transition-colors duration-300
                      ${isActive ? "text-[#0055A5]" : "text-gray-600 group-hover:text-gray-900"}
                    `}
                  >
                    {link.label}
                  </span>
                </motion.a>
              );
            })}
          </motion.nav>

          {/* ── Desktop Action Group ── */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
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

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNav({ label: "Contact", href: "#contact", type: "hash", hash: "contact" }); }}
              className="
                relative overflow-hidden group flex items-center gap-2 px-6 py-2.5 rounded-full
                bg-[#0055A5] hover:bg-[#004488] text-white text-[13px] font-bold tracking-[0.05em]
                shadow-[0_4px_16px_rgba(0,85,165,0.3)] hover:shadow-[0_6px_22px_rgba(0,85,165,0.45)]
                hover:-translate-y-px transition-all duration-300
              "
            >
              <span className="relative z-10">GET OFFER</span>
              <ArrowRight size={14} strokeWidth={2.5} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
            </a>
          </div>

          {/* ── Mobile Icons ── */}
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

      {/* ═══════════════════════════════
          MOBILE FULLSCREEN MENU
      ═══════════════════════════════ */}
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
              <div className="h-[40px] w-[130px]">
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

            {/* Footer CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="p-6 space-y-3 pb-[calc(100px+env(safe-area-inset-bottom,0px))] flex-shrink-0"
            >
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

      {/* ═══════════════════════════════
          MOBILE STICKY BOTTOM BAR
      ═══════════════════════════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 grid grid-cols-2 h-[72px] shadow-[0_-8px_30px_rgba(0,0,0,0.06)]">
          <a
            href={`tel:${phone}`}
            className="flex flex-col items-center justify-center gap-1.5 text-gray-600 hover:text-[#0055A5] active:text-[#0055A5] transition-colors border-r border-gray-100"
          >
            <Phone size={20} strokeWidth={2} />
            <span className="text-[10px] uppercase tracking-wider font-bold">Call Sales</span>
          </a>

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
      </div >
    </>
  );
}