


// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Phone, MessageCircle, Menu, X, ArrowRight, Gift } from "lucide-react";

// // ─── CONFIG ────────────────────────────────────────────────────────────────────
// // All configurable values live here so this component stays reusable across
// // campaign pages: /, /nexon, /punch, /harrier, /safari, etc.
// export interface CampaignNavbarProps {
//   /** Dealership phone number */
//   phone?: string;
//   /** WhatsApp number (digits only, with country code) */
//   whatsappNumber?: string;
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
//   { label: "Offers",     href: "#offers"     },
//   { label: "Cars",       href: "#cars"        },
//   { label: "Showrooms",  href: "#showrooms"   },
//   { label: "Service",    href: "#service"     },
//   { label: "Contact",    href: "#contact"     },
// ];

// // ─── HELPERS ───────────────────────────────────────────────────────────────────
// function buildWhatsAppUrl(number: string, vehicle?: string): string {
//   const message = vehicle
//     ? `Hi Garud Tata, I am interested in the Tata ${vehicle} offer. Please share the details.`
//     : `Hi Garud Tata, I am interested in the latest Tata car offers. Please share the current offers.`;
//   return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
// }

// // ─── COMPONENT ─────────────────────────────────────────────────────────────────
// export default function CampaignNavbar({
//   phone = "+919876543210",
//   whatsappNumber = "919876543210",
//   vehicle,
//   logoSrc,
//   offerSectionId = "offer-form",
// }: CampaignNavbarProps) {
//   const [scrolled, setScrolled]     = useState(false);
//   const [menuOpen, setMenuOpen]     = useState(false);
//   const [activeLink, setActiveLink] = useState<string | null>(null);

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

//   const waUrl = buildWhatsAppUrl(whatsappNumber, vehicle);

//   // ─── RENDER ────────────────────────────────────────────────────────────────
//   return (
//     <>
//       {/* ════════════════════════════════════════════
//           MAIN NAVBAR
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
//             ? "h-[68px] bg-[#060B18]/92 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.28)]"
//             : "h-[80px] bg-[rgba(5,10,18,0.18)] backdrop-blur-[14px] border-white/12"
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
//                   h-[36px] lg:h-[40px]
//                   w-auto
//                   object-contain
//                   transition-opacity duration-300
//                   group-hover:opacity-85
//                 "
//               />
//             ) : (
//               /* Wordmark fallback */
//               <div className="flex flex-col leading-none">
//                 <span className="
//                   text-white font-extrabold
//                   tracking-[0.18em] text-[13px] lg:text-[15px]
//                   drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]
//                   group-hover:text-white/90 transition-colors
//                 ">
//                   GARUD
//                 </span>
//                 <span className="
//                   text-[#1E7FE8] font-bold
//                   tracking-[0.14em] text-[10px] lg:text-[11px]
//                   mt-[1px]
//                 ">
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
//                   onClick={e => {
//                     e.preventDefault();
//                     scrollTo(link.href.slice(1));
//                   }}
//                   className="relative h-full flex items-center px-4 group"
//                   aria-current={isActive ? "page" : undefined}
//                 >
//                   <span className={`
//                     text-[13px] font-medium tracking-[0.04em]
//                     transition-colors duration-200
//                     ${isActive ? "text-white" : "text-white/70 group-hover:text-white"}
//                   `}>
//                     {link.label}
//                   </span>

//                   {/* Active underline */}
//                   <AnimatePresence>
//                     {isActive && (
//                       <motion.span
//                         layoutId="nav-underline"
//                         className="absolute bottom-[18px] left-4 right-4 h-[2px] rounded-full bg-[#0055A5]"
//                         initial={{ opacity: 0, scaleX: 0 }}
//                         animate={{ opacity: 1, scaleX: 1 }}
//                         exit={{ opacity: 0, scaleX: 0 }}
//                         transition={{ type: "spring", stiffness: 380, damping: 28 }}
//                       />
//                     )}
//                   </AnimatePresence>

//                   {/* Hover underline (non-active) */}
//                   {!isActive && (
//                     <span className="
//                       absolute bottom-[18px] left-4 right-4 h-[2px] rounded-full
//                       bg-white/30 scale-x-0 group-hover:scale-x-100
//                       transition-transform duration-200 origin-left
//                     " />
//                   )}
//                 </a>
//               );
//             })}
//           </nav>

//           {/* ── Desktop Action Group ────────────────────────────── */}
//           <div className="hidden lg:flex items-center gap-3 flex-shrink-0">

//             {/* Call Now */}
//             <a
//               href={`tel:${phone}`}
//               className="
//                 group flex items-center gap-2
//                 px-4 py-2 rounded-full
//                 border border-white/15 bg-white/5
//                 text-white/80 hover:text-white hover:border-white/30 hover:bg-white/10
//                 text-[13px] font-medium
//                 transition-all duration-250
//                 backdrop-blur-md
//               "
//               aria-label={`Call ${phone}`}
//             >
//               <Phone size={14} className="flex-shrink-0 transition-colors" />
//               <span>Call Now</span>
//             </a>

//             {/* WhatsApp */}
//             <a
//               href={waUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="
//                 group flex items-center gap-2
//                 px-4 py-2 rounded-full
//                 border border-[#25D366]/30 bg-[#25D366]/8
//                 text-[#25D366] hover:bg-[#25D366]/15 hover:border-[#25D366]/50
//                 text-[13px] font-medium
//                 transition-all duration-250
//               "
//               aria-label="Chat on WhatsApp"
//             >
//               {/* WhatsApp icon (inline SVG — no extra dep) */}
//               <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
//                 <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
//               </svg>
//               <span>WhatsApp</span>
//             </a>

//             {/* GET OFFER → */}
//             <button
//               onClick={() => scrollTo(offerSectionId)}
//               className="
//                 group flex items-center gap-2
//                 px-5 py-2.5 rounded-full
//                 bg-[#0055A5] hover:bg-[#1E7FE8]
//                 text-white text-[13px] font-semibold tracking-[0.03em]
//                 shadow-[0_4px_16px_rgba(0,85,165,0.35)]
//                 hover:shadow-[0_6px_22px_rgba(30,127,232,0.45)]
//                 hover:-translate-y-px
//                 transition-all duration-250
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
//               className="p-2.5 text-white/75 hover:text-white transition-colors"
//               aria-label={`Call ${phone}`}
//             >
//               <Phone size={20} strokeWidth={1.6} />
//             </a>
//             <a
//               href={waUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-2.5 text-[#25D366]/80 hover:text-[#25D366] transition-colors"
//               aria-label="Chat on WhatsApp"
//             >
//               <MessageCircle size={20} strokeWidth={1.6} />
//             </a>
//             <button
//               onClick={() => setMenuOpen(true)}
//               className="p-2.5 text-white hover:text-white/80 transition-colors"
//               aria-label="Open menu"
//               aria-expanded={menuOpen}
//             >
//               <Menu size={22} strokeWidth={1.8} />
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
//             initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
//             animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
//             exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
//             transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
//             className="fixed inset-0 z-[80] bg-[#050A12] flex flex-col lg:hidden overflow-y-auto"
//             role="dialog"
//             aria-modal="true"
//             aria-label="Site navigation"
//           >
//             {/* Header */}
//             <div className="flex items-center justify-between px-6 h-[68px] border-b border-white/10 flex-shrink-0">
//               <span className="text-white font-extrabold tracking-[0.18em] text-[14px]">
//                 GARUD <span className="text-[#1E7FE8]">TATA</span>
//               </span>
//               <button
//                 onClick={() => setMenuOpen(false)}
//                 className="p-2 text-white/60 hover:text-white bg-white/8 rounded-full transition-colors"
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
//                   className="group flex items-center gap-5 py-4 border-b border-white/6 last:border-0"
//                 >
//                   <span className="text-[11px] font-mono text-white/25 group-hover:text-[#0055A5] transition-colors w-6 flex-shrink-0">
//                     0{i + 1}
//                   </span>
//                   <span className="text-[2.2rem] font-semibold text-white/85 group-hover:text-white tracking-tight group-hover:translate-x-1.5 transition-all duration-250">
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
//               className="p-6 space-y-3 pb-[calc(88px+env(safe-area-inset-bottom,0px))] flex-shrink-0"
//             >
//               <button
//                 onClick={() => scrollTo(offerSectionId)}
//                 className="
//                   w-full flex items-center justify-between
//                   px-5 py-4 bg-[#0055A5] hover:bg-[#1E7FE8]
//                   rounded-2xl text-white font-semibold tracking-[0.05em] text-[15px]
//                   shadow-[0_4px_16px_rgba(0,85,165,0.4)]
//                   transition-all duration-250
//                 "
//               >
//                 GET YOUR OFFER
//                 <ArrowRight size={18} />
//               </button>
//               <a
//                 href={`tel:${phone}`}
//                 className="
//                   w-full flex items-center justify-between
//                   px-5 py-4 border border-white/15 bg-white/5
//                   rounded-2xl text-white font-medium text-[15px]
//                   hover:bg-white/10 transition-all duration-250
//                 "
//               >
//                 CALL GARUD TATA
//                 <Phone size={18} />
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
//         <div className="
//           bg-[#060B18]/96 backdrop-blur-xl
//           border-t border-white/10
//           grid grid-cols-3
//           h-[72px]
//         ">
//           {/* Call */}
//           <a
//             href={`tel:${phone}`}
//             className="flex flex-col items-center justify-center gap-1 text-white/60 hover:text-white active:text-white transition-colors"
//             aria-label={`Call ${phone}`}
//           >
//             <Phone size={19} strokeWidth={1.5} />
//             <span className="text-[9px] uppercase tracking-wider font-semibold">Call</span>
//           </a>

//           {/* WhatsApp */}
//           <a
//             href={waUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="flex flex-col items-center justify-center gap-1 text-[#25D366]/70 hover:text-[#25D366] active:text-[#25D366] transition-colors"
//             aria-label="Chat on WhatsApp"
//           >
//             <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
//               <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
//             </svg>
//             <span className="text-[9px] uppercase tracking-wider font-semibold">WhatsApp</span>
//           </a>

//           {/* GET OFFER — visually dominant */}
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
//             <Gift size={19} strokeWidth={1.5} />
//             <span className="text-[9px] uppercase tracking-wider font-bold">Get Offer</span>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }












"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X, ArrowRight, Gift } from "lucide-react";

// ─── CONFIG ────────────────────────────────────────────────────────────────────
export interface CampaignNavbarProps {
  /** Dealership phone number — displayed in UI */
  phone?: string;
  /**
   * Vehicle name for campaign-specific WhatsApp message.
   * Pass undefined on the root "/" page for a generic message.
   */
  vehicle?: string;
  /** Path to your logo image. Falls back to wordmark text. */
  logoSrc?: string;
  /** ID of the offer / lead form section to scroll to on CTA click */
  offerSectionId?: string;
}

const NAV_LINKS = [
  { label: "Offers",    href: "#offers"    },
  { label: "Cars",      href: "#cars"      },
  { label: "Showrooms", href: "#showrooms" },
  { label: "Service",   href: "#service"   },
  { label: "Contact",   href: "#contact"   },
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────────
export default function CampaignNavbar({
  phone = "9217371205",
  vehicle,
  logoSrc = "/images/logo.jpg",
  offerSectionId = "offer-form",
}: CampaignNavbarProps) {
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [activeLink,  setActiveLink]  = useState<string | null>(null);

  // ── Scroll detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Lock body scroll when mobile menu is open ─────────────────────────────
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // ── Active link via IntersectionObserver ──────────────────────────────────
  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href));
    if (sections.every(s => !s)) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveLink(`#${entry.target.id}`);
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // ── Smooth scroll helper ──────────────────────────────────────────────────
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  // Formatted display number
  const displayPhone = phone.replace(/(\d{5})(\d{5})/, "$1 $2");

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ════════════════════════════════════════════
          MAIN NAVBAR — light theme
      ════════════════════════════════════════════ */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Primary navigation"
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-[height,background,border-color,box-shadow]
          duration-300 ease-in-out
          border-b
          ${scrolled
            ? "h-[64px] bg-white/95 backdrop-blur-xl border-gray-200/80 shadow-[0_2px_20px_rgba(0,0,0,0.08)]"
            : "h-[76px] bg-white/85 backdrop-blur-[14px] border-gray-200/50 shadow-[0_1px_0_rgba(0,0,0,0.06)]"
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
            {logoSrc ? (
              <img
                src={logoSrc}
                alt="Garud Tata"
                className="
                  h-[38px] lg:h-[42px]
                  w-auto
                  object-contain
                  transition-opacity duration-300
                  group-hover:opacity-80
                "
              />
            ) : (
              /* Wordmark fallback */
              <div className="flex flex-col leading-none">
                <span className="text-gray-900 font-extrabold tracking-[0.18em] text-[13px] lg:text-[15px]">
                  GARUD
                </span>
                <span className="text-[#0055A5] font-bold tracking-[0.14em] text-[10px] lg:text-[11px] mt-[1px]">
                  TATA MOTORS
                </span>
              </div>
            )}
          </a>

          {/* ── Desktop Navigation ──────────────────────────────── */}
          <nav
            aria-label="Site sections"
            className="hidden lg:flex items-center gap-1 h-full flex-1 justify-center"
          >
            {NAV_LINKS.map(link => {
              const isActive = activeLink === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={e => { e.preventDefault(); scrollTo(link.href.slice(1)); }}
                  className="relative h-full flex items-center px-4 group"
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className={`
                    text-[13px] font-medium tracking-[0.03em]
                    transition-colors duration-200
                    ${isActive ? "text-gray-900" : "text-gray-500 group-hover:text-gray-900"}
                  `}>
                    {link.label}
                  </span>

                  {/* Active underline */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-[16px] left-4 right-4 h-[2px] rounded-full bg-[#0055A5]"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Hover underline */}
                  {!isActive && (
                    <span className="
                      absolute bottom-[16px] left-4 right-4 h-[2px] rounded-full
                      bg-gray-300 scale-x-0 group-hover:scale-x-100
                      transition-transform duration-200 origin-left
                    " />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ── Desktop Action Group ────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">

            {/* Sales number */}
            <a
              href={`tel:${phone}`}
              className="
                group flex items-center gap-2
                px-4 py-2.5 rounded-full
                border border-gray-200 bg-gray-50
                text-gray-700 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-100
                text-[13px] font-medium
                transition-all duration-200
              "
              aria-label={`Call Sales: ${displayPhone}`}
            >
              <Phone size={14} className="flex-shrink-0 text-[#0055A5]" strokeWidth={2} />
              <span>
                <span className="text-gray-400 text-[11px] mr-1">Sales</span>
                {displayPhone}
              </span>
            </a>

            {/* GET OFFER → */}
            <button
              onClick={() => scrollTo(offerSectionId)}
              className="
                group flex items-center gap-2
                px-5 py-2.5 rounded-full
                bg-[#0055A5] hover:bg-[#1A70D4]
                text-white text-[13px] font-semibold tracking-[0.03em]
                shadow-[0_4px_16px_rgba(0,85,165,0.28)]
                hover:shadow-[0_6px_22px_rgba(0,85,165,0.38)]
                hover:-translate-y-px
                transition-all duration-200
              "
              aria-label="Get your offer"
            >
              GET OFFER
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </button>
          </div>

          {/* ── Mobile Icons ─────────────────────────────────────── */}
          <div className="flex lg:hidden items-center gap-1">
            <a
              href={`tel:${phone}`}
              className="p-2.5 text-[#0055A5] hover:text-[#1A70D4] transition-colors"
              aria-label={`Call Sales ${displayPhone}`}
            >
              <Phone size={20} strokeWidth={1.8} />
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2.5 text-gray-700 hover:text-gray-900 transition-colors"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu size={22} strokeWidth={1.8} />
            </button>
          </div>

        </div>
      </motion.nav>

      {/* ════════════════════════════════════════════
          MOBILE FULLSCREEN MENU — light theme
      ════════════════════════════════════════════ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[80] bg-white flex flex-col lg:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-[64px] border-b border-gray-100 flex-shrink-0">
              {logoSrc ? (
                <img
                  src={logoSrc}
                  alt="Garud Tata"
                  className="h-[34px] w-auto object-contain"
                />
              ) : (
                <span className="text-gray-900 font-extrabold tracking-[0.18em] text-[14px]">
                  GARUD <span className="text-[#0055A5]">TATA</span>
                </span>
              )}
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-8 py-10" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={e => { e.preventDefault(); scrollTo(link.href.slice(1)); }}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.12, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex items-center gap-5 py-4 border-b border-gray-100 last:border-0"
                >
                  <span className="text-[11px] font-mono text-gray-300 group-hover:text-[#0055A5] transition-colors w-6 flex-shrink-0">
                    0{i + 1}
                  </span>
                  <span className="text-[2.2rem] font-semibold text-gray-800 group-hover:text-gray-900 tracking-tight group-hover:translate-x-1.5 transition-all duration-250">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Footer CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.35 }}
              className="p-6 space-y-3 pb-[calc(80px+env(safe-area-inset-bottom,0px))] flex-shrink-0"
            >
              <button
                onClick={() => scrollTo(offerSectionId)}
                className="
                  w-full flex items-center justify-between
                  px-5 py-4 bg-[#0055A5] hover:bg-[#1A70D4]
                  rounded-2xl text-white font-semibold tracking-[0.05em] text-[15px]
                  shadow-[0_4px_16px_rgba(0,85,165,0.3)]
                  transition-all duration-200
                "
              >
                GET YOUR OFFER
                <ArrowRight size={18} />
              </button>
              <a
                href={`tel:${phone}`}
                className="
                  w-full flex items-center justify-between
                  px-5 py-4 border border-gray-200 bg-gray-50
                  rounded-2xl text-gray-800 font-medium text-[15px]
                  hover:bg-gray-100 transition-all duration-200
                "
              >
                <span>
                  <span className="text-gray-400 text-[12px] block leading-none mb-0.5">Sales</span>
                  {displayPhone}
                </span>
                <Phone size={18} className="text-[#0055A5]" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════
          MOBILE STICKY BOTTOM BAR — light theme
      ════════════════════════════════════════════ */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="
          bg-white/97 backdrop-blur-xl
          border-t border-gray-200
          grid grid-cols-2
          h-[68px]
          shadow-[0_-4px_20px_rgba(0,0,0,0.08)]
        ">
          {/* Call */}
          <a
            href={`tel:${phone}`}
            className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-[#0055A5] active:text-[#0055A5] transition-colors border-r border-gray-100"
            aria-label={`Call Sales ${displayPhone}`}
          >
            <Phone size={19} strokeWidth={1.6} />
            <span className="text-[9px] uppercase tracking-wider font-semibold">{displayPhone}</span>
          </a>

          {/* GET OFFER */}
          <button
            onClick={() => scrollTo(offerSectionId)}
            className="
              flex flex-col items-center justify-center gap-1
              bg-[#0055A5] active:bg-[#004494]
              text-white
              transition-colors duration-150
            "
            aria-label="Get your offer"
          >
            <Gift size={19} strokeWidth={1.6} />
            <span className="text-[9px] uppercase tracking-wider font-bold">Get Offer</span>
          </button>
        </div>
      </div>
    </>
  );
}













