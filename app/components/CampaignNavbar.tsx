
// // garud-tata\app\components\Navbar.tsx

// "use client";

// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   Phone, 
//   Menu, 
//   X, 
//   ArrowRight, 
//   ChevronRight, 
//   Tag, 
//   Percent, 
//   RefreshCcw, 
//   Sparkles,
//   MapPin,
//   Car
// } from "lucide-react";

// const navLinks = [
//   { label: "Home", href: "#home" },
//   { label: "New Cars", href: "#cars", hasMegaMenu: true },
//   { label: "Offers", href: "#offers", hasDropdown: true },
//   { label: "About Us", href: "#about" },
//   { label: "Gallery", href: "#gallery" },
//   { label: "Contact", href: "#contact" },
// ];

// const suvModels = ["Tata Sierra", "Tata Harrier", "Tata Safari", "Tata Curvv", "Tata Nexon", "Tata Punch"];
// const hatchbackModels = ["Tata Altroz", "Tata Tiago"];

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [hoveredItem, setHoveredItem] = useState<string | null>(null);
//   const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Prevent background scroll when mobile menu is open
//   useEffect(() => {
//     if (menuOpen) document.body.style.overflow = "hidden";
//     else document.body.style.overflow = "unset";
//   }, [menuOpen]);

//   return (
//     <>
//       {/* 1. MAIN DESKTOP & MOBILE HEADER */}
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
//           scrolled
//             ? "bg-[#050810]/90 backdrop-blur-2xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.2)] h-[68px]"
//             : "bg-[rgba(10,15,25,0.20)] backdrop-blur-[16px] border-white/10 h-[84px]"
//         }`}
//         onMouseLeave={() => setActiveDropdown(null)}
//       >
//         <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
          
//           {/* Logo */}
//           <a href="#home" className="relative z-50 flex items-center gap-3 group">
//             {/* Replace with actual client logo image when available */}
//             <div className="flex flex-col justify-center">
//               <span className="font-bold text-lg lg:text-xl text-white tracking-widest leading-none group-hover:text-white/90 transition-colors">
//                 GARUD TATA
//               </span>
//             </div>
//           </a>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center h-full gap-8">
//             {navLinks.map((link) => (
//               <div 
//                 key={link.label}
//                 className="relative h-full flex items-center"
//                 onMouseEnter={() => {
//                   setHoveredItem(link.label);
//                   if (link.hasMegaMenu) setActiveDropdown("cars");
//                   else if (link.hasDropdown) setActiveDropdown("offers");
//                   else setActiveDropdown(null);
//                 }}
//                 onMouseLeave={() => setHoveredItem(null)}
//               >
//                 <a
//                   href={link.href}
//                   className="text-[14px] font-medium tracking-[0.02em] text-white/80 hover:text-white transition-colors py-2 flex items-center gap-1"
//                 >
//                   {link.label}
//                 </a>
                
//                 {/* Active/Hover Animated Underline */}
//                 {hoveredItem === link.label && (
//                   <motion.div
//                     layoutId="navbar-indicator"
//                     className="absolute bottom-[20px] left-0 right-0 h-[2px] bg-[#0055A5]"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ type: "spring", stiffness: 400, damping: 30 }}
//                   />
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Desktop Actions */}
//           <div className="hidden lg:flex items-center gap-5">
//             {/* Call Action - Hover to reveal number */}
//             <a
//               href="tel:+919876543210"
//               className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300 overflow-hidden backdrop-blur-md"
//             >
//               <Phone size={16} className="text-white/70 group-hover:text-white transition-colors" />
//               <div className="flex flex-col h-5 justify-center overflow-hidden relative w-[32px] group-hover:w-[115px] transition-all duration-300 ease-[0.16,1,0.3,1]">
//                 <span className="absolute left-0 transition-transform duration-300 group-hover:-translate-y-full opacity-100 group-hover:opacity-0">Call</span>
//                 <span className="absolute left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 tracking-wider whitespace-nowrap">+91 98765 43210</span>
//               </div>
//             </a>

//             {/* Primary CTA */}
//             <a
//               href="#testdrive"
//               className="group flex items-center gap-2 px-6 py-2.5 bg-[#0055A5] text-white text-sm font-medium rounded-full shadow-[0_4px_14px_rgba(0,85,165,0.2)] hover:shadow-[0_6px_20px_rgba(0,85,165,0.4)] hover:-translate-y-[1px] transition-all duration-300"
//             >
//               BOOK A TEST DRIVE
//               <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
//             </a>
//           </div>

//           {/* Mobile Hamburger & Call */}
//           <div className="flex lg:hidden items-center gap-4">
//             <a href="tel:+919876543210" className="p-2 text-white/80 hover:text-white transition-colors">
//               <Phone size={20} />
//             </a>
//             <button
//               onClick={() => setMenuOpen(true)}
//               className="p-2 text-white hover:text-white/80 transition-colors z-[60]"
//               aria-label="Open Menu"
//             >
//               <Menu size={24} />
//             </button>
//           </div>
//         </div>

//         {/* 2. MEGA MENU - NEW CARS */}
//         <AnimatePresence>
//           {activeDropdown === "cars" && (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 5 }}
//               transition={{ duration: 0.2, ease: "easeOut" }}
//               className="absolute top-full left-0 w-full bg-[#050810]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl overflow-hidden"
//               onMouseEnter={() => setActiveDropdown("cars")}
//               onMouseLeave={() => setActiveDropdown(null)}
//             >
//               <div className="max-w-[1440px] mx-auto px-12 py-10 flex gap-16">
                
//                 {/* Lists */}
//                 <div className="flex gap-16 flex-1">
//                   <div>
//                     <h3 className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase mb-6 border-b border-white/10 pb-4">SUV</h3>
//                     <ul className="space-y-4">
//                       {suvModels.map(model => (
//                         <li key={model}>
//                           <a href="#" className="text-[15px] font-medium text-white/80 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group">
//                             {model}
//                             {model === "Tata Sierra" && <span className="text-[9px] bg-[#0055A5] px-2 py-0.5 rounded-full text-white ml-2">NEW</span>}
//                           </a>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div>
//                     <h3 className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase mb-6 border-b border-white/10 pb-4">Hatchback & Sedan</h3>
//                     <ul className="space-y-4">
//                       {hatchbackModels.map(model => (
//                         <li key={model}>
//                           <a href="#" className="text-[15px] font-medium text-white/80 hover:text-white hover:translate-x-1 transition-all">
//                             {model}
//                           </a>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>

//                 {/* Featured Vehicle Card */}
//                 <div className="w-[400px] rounded-xl overflow-hidden relative group cursor-pointer bg-white/5 border border-white/10">
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
//                   <img 
//                     src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80" 
//                     alt="Featured Tata" 
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//                   />
//                   <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
//                     <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">Tata Sierra</h4>
//                     <p className="text-sm text-white/70 mb-4 leading-relaxed">Discover the new generation of adventure and technology.</p>
//                     <div className="flex items-center text-xs font-semibold text-white tracking-widest uppercase">
//                       Explore Vehicle <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
//                     </div>
//                   </div>
//                 </div>

//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* 3. DROPDOWN - OFFERS */}
//         <AnimatePresence>
//           {activeDropdown === "offers" && (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: 5 }}
//               transition={{ duration: 0.2, ease: "easeOut" }}
//               className="absolute top-[100%] left-[50%] -translate-x-[20%] mt-2 w-64 bg-[#0A0F19]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl p-2"
//               onMouseEnter={() => setActiveDropdown("offers")}
//               onMouseLeave={() => setActiveDropdown(null)}
//             >
//               {[
//                 { icon: Tag, label: "Current Offers" },
//                 { icon: Percent, label: "Finance Offers" },
//                 { icon: RefreshCcw, label: "Exchange Bonus" },
//                 { icon: Sparkles, label: "Corporate Deals" }
//               ].map((item) => (
//                 <a key={item.label} href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors group">
//                   <item.icon size={16} className="text-[#0055A5] group-hover:scale-110 transition-transform" />
//                   <span className="text-sm font-medium">{item.label}</span>
//                 </a>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>

//       {/* 4. MOBILE FULLSCREEN MENU */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.4 }}
//             className="fixed inset-0 z-[70] bg-[#050505] flex flex-col lg:hidden overflow-y-auto"
//           >
//             {/* Mobile Menu Header */}
//             <div className="flex items-center justify-between px-6 h-[84px] border-b border-white/10 shrink-0">
//               <span className="font-bold text-lg text-white tracking-widest leading-none">
//                 GARUD TATA
//               </span>
//               <button 
//                 onClick={() => setMenuOpen(false)}
//                 className="p-2 text-white/70 hover:text-white bg-white/5 rounded-full"
//               >
//                 <X size={20} />
//               </button>
//             </div>

//             {/* Mobile Menu Links */}
//             <div className="flex-1 px-6 py-8 flex flex-col justify-center">
//               <nav className="space-y-6">
//                 {navLinks.map((link, index) => (
//                   <motion.a
//                     key={link.label}
//                     href={link.href}
//                     onClick={() => setMenuOpen(false)}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: index * 0.1 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
//                     className="group flex items-center gap-6 text-white"
//                   >
//                     <span className="text-sm font-mono text-white/30 group-hover:text-[#0055A5] transition-colors">
//                       0{index + 1}
//                     </span>
//                     <span className="text-[2.5rem] font-medium tracking-tight group-hover:translate-x-2 transition-transform duration-300">
//                       {link.label}
//                     </span>
//                   </motion.a>
//                 ))}
//               </nav>
//             </div>

//             {/* Mobile Menu Footer Links */}
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6, duration: 0.4 }}
//               className="p-6 space-y-4 shrink-0 pb-28" // pb-28 to account for bottom fixed bar
//             >
//               <a href="#testdrive" onClick={() => setMenuOpen(false)} className="flex items-center justify-between w-full p-4 bg-[#0055A5] rounded-xl text-white font-medium hover:bg-[#004488] transition-colors">
//                 BOOK A TEST DRIVE
//                 <ArrowRight size={20} />
//               </a>
//               <a href="tel:+919876543210" className="flex items-center justify-between w-full p-4 border border-white/20 rounded-xl text-white font-medium hover:bg-white/5 transition-colors">
//                 CALL GARUD TATA
//                 <Phone size={20} />
//               </a>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* 5. MOBILE BOTTOM ACTION BAR */}
//       <div className="fixed bottom-0 left-0 right-0 z-[65] lg:hidden">
//         <div className="bg-[#050810]/95 backdrop-blur-xl border-t border-white/10 grid grid-cols-3 h-[72px] pb-safe">
//           <a href="tel:+919876543210" className="flex flex-col items-center justify-center gap-1 text-white/70 hover:text-white transition-colors">
//             <Phone size={20} strokeWidth={1.5} />
//             <span className="text-[10px] uppercase tracking-wider font-medium">Call</span>
//           </a>
//           <a href="#testdrive" className="flex flex-col items-center justify-center bg-[#0055A5] text-white">
//             <Car size={22} strokeWidth={1.5} className="mb-1" />
//             <span className="text-[10px] uppercase tracking-widest font-bold">Test Drive</span>
//           </a>
//           <a href="#showroom" className="flex flex-col items-center justify-center gap-1 text-white/70 hover:text-white transition-colors">
//             <MapPin size={20} strokeWidth={1.5} />
//             <span className="text-[10px] uppercase tracking-wider font-medium">Map</span>
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }



















"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Menu, X, ArrowRight, Gift } from "lucide-react";

// ─── CONFIG ────────────────────────────────────────────────────────────────────
// All configurable values live here so this component stays reusable across
// campaign pages: /, /nexon, /punch, /harrier, /safari, etc.
export interface CampaignNavbarProps {
  /** Dealership phone number */
  phone?: string;
  /** WhatsApp number (digits only, with country code) */
  whatsappNumber?: string;
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
  { label: "Offers",     href: "#offers"     },
  { label: "Cars",       href: "#cars"        },
  { label: "Showrooms",  href: "#showrooms"   },
  { label: "Service",    href: "#service"     },
  { label: "Contact",    href: "#contact"     },
];

// ─── HELPERS ───────────────────────────────────────────────────────────────────
function buildWhatsAppUrl(number: string, vehicle?: string): string {
  const message = vehicle
    ? `Hi Garud Tata, I am interested in the Tata ${vehicle} offer. Please share the details.`
    : `Hi Garud Tata, I am interested in the latest Tata car offers. Please share the current offers.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// ─── COMPONENT ─────────────────────────────────────────────────────────────────
export default function CampaignNavbar({
  phone = "+919876543210",
  whatsappNumber = "919876543210",
  vehicle,
  logoSrc,
  offerSectionId = "offer-form",
}: CampaignNavbarProps) {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);

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

  const waUrl = buildWhatsAppUrl(whatsappNumber, vehicle);

  // ─── RENDER ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ════════════════════════════════════════════
          MAIN NAVBAR
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
            ? "h-[68px] bg-[#060B18]/92 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.28)]"
            : "h-[80px] bg-[rgba(5,10,18,0.18)] backdrop-blur-[14px] border-white/12"
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
                  h-[36px] lg:h-[40px]
                  w-auto
                  object-contain
                  transition-opacity duration-300
                  group-hover:opacity-85
                "
              />
            ) : (
              /* Wordmark fallback */
              <div className="flex flex-col leading-none">
                <span className="
                  text-white font-extrabold
                  tracking-[0.18em] text-[13px] lg:text-[15px]
                  drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]
                  group-hover:text-white/90 transition-colors
                ">
                  GARUD
                </span>
                <span className="
                  text-[#1E7FE8] font-bold
                  tracking-[0.14em] text-[10px] lg:text-[11px]
                  mt-[1px]
                ">
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
                  onClick={e => {
                    e.preventDefault();
                    scrollTo(link.href.slice(1));
                  }}
                  className="relative h-full flex items-center px-4 group"
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className={`
                    text-[13px] font-medium tracking-[0.04em]
                    transition-colors duration-200
                    ${isActive ? "text-white" : "text-white/70 group-hover:text-white"}
                  `}>
                    {link.label}
                  </span>

                  {/* Active underline */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-[18px] left-4 right-4 h-[2px] rounded-full bg-[#0055A5]"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        exit={{ opacity: 0, scaleX: 0 }}
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Hover underline (non-active) */}
                  {!isActive && (
                    <span className="
                      absolute bottom-[18px] left-4 right-4 h-[2px] rounded-full
                      bg-white/30 scale-x-0 group-hover:scale-x-100
                      transition-transform duration-200 origin-left
                    " />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ── Desktop Action Group ────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">

            {/* Call Now */}
            <a
              href={`tel:${phone}`}
              className="
                group flex items-center gap-2
                px-4 py-2 rounded-full
                border border-white/15 bg-white/5
                text-white/80 hover:text-white hover:border-white/30 hover:bg-white/10
                text-[13px] font-medium
                transition-all duration-250
                backdrop-blur-md
              "
              aria-label={`Call ${phone}`}
            >
              <Phone size={14} className="flex-shrink-0 transition-colors" />
              <span>Call Now</span>
            </a>

            {/* WhatsApp */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group flex items-center gap-2
                px-4 py-2 rounded-full
                border border-[#25D366]/30 bg-[#25D366]/8
                text-[#25D366] hover:bg-[#25D366]/15 hover:border-[#25D366]/50
                text-[13px] font-medium
                transition-all duration-250
              "
              aria-label="Chat on WhatsApp"
            >
              {/* WhatsApp icon (inline SVG — no extra dep) */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
              <span>WhatsApp</span>
            </a>

            {/* GET OFFER → */}
            <button
              onClick={() => scrollTo(offerSectionId)}
              className="
                group flex items-center gap-2
                px-5 py-2.5 rounded-full
                bg-[#0055A5] hover:bg-[#1E7FE8]
                text-white text-[13px] font-semibold tracking-[0.03em]
                shadow-[0_4px_16px_rgba(0,85,165,0.35)]
                hover:shadow-[0_6px_22px_rgba(30,127,232,0.45)]
                hover:-translate-y-px
                transition-all duration-250
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
              className="p-2.5 text-white/75 hover:text-white transition-colors"
              aria-label={`Call ${phone}`}
            >
              <Phone size={20} strokeWidth={1.6} />
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 text-[#25D366]/80 hover:text-[#25D366] transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={20} strokeWidth={1.6} />
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2.5 text-white hover:text-white/80 transition-colors"
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              <Menu size={22} strokeWidth={1.8} />
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
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[80] bg-[#050A12] flex flex-col lg:hidden overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-[68px] border-b border-white/10 flex-shrink-0">
              <span className="text-white font-extrabold tracking-[0.18em] text-[14px]">
                GARUD <span className="text-[#1E7FE8]">TATA</span>
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-white/60 hover:text-white bg-white/8 rounded-full transition-colors"
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
                  className="group flex items-center gap-5 py-4 border-b border-white/6 last:border-0"
                >
                  <span className="text-[11px] font-mono text-white/25 group-hover:text-[#0055A5] transition-colors w-6 flex-shrink-0">
                    0{i + 1}
                  </span>
                  <span className="text-[2.2rem] font-semibold text-white/85 group-hover:text-white tracking-tight group-hover:translate-x-1.5 transition-all duration-250">
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
              className="p-6 space-y-3 pb-[calc(88px+env(safe-area-inset-bottom,0px))] flex-shrink-0"
            >
              <button
                onClick={() => scrollTo(offerSectionId)}
                className="
                  w-full flex items-center justify-between
                  px-5 py-4 bg-[#0055A5] hover:bg-[#1E7FE8]
                  rounded-2xl text-white font-semibold tracking-[0.05em] text-[15px]
                  shadow-[0_4px_16px_rgba(0,85,165,0.4)]
                  transition-all duration-250
                "
              >
                GET YOUR OFFER
                <ArrowRight size={18} />
              </button>
              <a
                href={`tel:${phone}`}
                className="
                  w-full flex items-center justify-between
                  px-5 py-4 border border-white/15 bg-white/5
                  rounded-2xl text-white font-medium text-[15px]
                  hover:bg-white/10 transition-all duration-250
                "
              >
                CALL GARUD TATA
                <Phone size={18} />
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
        <div className="
          bg-[#060B18]/96 backdrop-blur-xl
          border-t border-white/10
          grid grid-cols-3
          h-[72px]
        ">
          {/* Call */}
          <a
            href={`tel:${phone}`}
            className="flex flex-col items-center justify-center gap-1 text-white/60 hover:text-white active:text-white transition-colors"
            aria-label={`Call ${phone}`}
          >
            <Phone size={19} strokeWidth={1.5} />
            <span className="text-[9px] uppercase tracking-wider font-semibold">Call</span>
          </a>

          {/* WhatsApp */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 text-[#25D366]/70 hover:text-[#25D366] active:text-[#25D366] transition-colors"
            aria-label="Chat on WhatsApp"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            <span className="text-[9px] uppercase tracking-wider font-semibold">WhatsApp</span>
          </a>

          {/* GET OFFER — visually dominant */}
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
            <Gift size={19} strokeWidth={1.5} />
            <span className="text-[9px] uppercase tracking-wider font-bold">Get Offer</span>
          </button>
        </div>
      </div>
    </>
  );
}