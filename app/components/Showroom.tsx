



// "use client";

// import { useRef, useState, useCallback, useEffect } from "react";
// import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
// import {
//   MapPin, Phone, Clock, Navigation, Mail, ChevronLeft, ChevronRight,
//   Wrench, Building2, Zap, ExternalLink,
// } from "lucide-react";

// /* ── DATA ───────────────────────────────────────────────────────────── */
// type OutletType = "showroom" | "workshop";

// interface Outlet {
//   id: string;
//   name: string;
//   shortName: string;
//   type: OutletType;
//   address: string;
//   phone: string;
//   email: string;
//   hours: string;
//   /** Static map image URL (OpenStreetMap via staticmap or similar) */
//   staticMapUrl: string;
//   /** Google Maps link for directions */
//   mapsNav: string;
// }

// // Using OpenStreetMap's staticmap service — no API key, no quota, instant load
// // Format: https://staticmap.openstreetmap.de/staticmap.php?center=LAT,LNG&zoom=15&size=640x340&markers=LAT,LNG,red-pushpin
// const OUTLETS: Outlet[] = [
//   {
//     id: "palam",
//     name: "Garud Tata Palam",
//     shortName: "Palam",
//     type: "showroom",
//     address: "Sales – Garg Plaza, RZ A70, Dabri–Palam Rd, Main Shiv Market, Palam, New Delhi, Delhi 110045",
//     phone: "9217371204",
//     email: "sm.dwarka@garudtata.com",
//     hours: "10 AM – 7 PM · Mon – Sun",
//     staticMapUrl:
//       "https://staticmap.openstreetmap.de/staticmap.php?center=28.5927,77.0747&zoom=15&size=640x340&markers=28.5927,77.0747,red-pushpin",
//     mapsNav:
//       "https://maps.google.com/?q=Garg+Plaza+RZ+A70+Dabri+Palam+Rd+Main+Shiv+Market+Palam+New+Delhi+110045",
//   },
//   {
//     id: "narela",
//     name: "Garud Tata Narela",
//     shortName: "Narela",
//     type: "showroom",
//     address: "Sales – Khasra No 42/12, Narela, New Delhi, Delhi 110040",
//     phone: "9311083011",
//     email: "sm.narela@garudtata.com",
//     hours: "10 AM – 7 PM · Mon – Sun",
//     staticMapUrl:
//       "https://staticmap.openstreetmap.de/staticmap.php?center=28.8527,77.0930&zoom=15&size=640x340&markers=28.8527,77.0930,red-pushpin",
//     mapsNav:
//       "https://maps.google.com/?q=Khasra+No+42%2F12+Narela+New+Delhi+110040",
//   },
//   {
//     id: "najafgarh-show",
//     name: "Garud Tata Najafgarh",
//     shortName: "Najafgarh",
//     type: "showroom",
//     address:
//       "Sales – Plot No. 8–11, Najafgarh Rd, Near Sai Baba Mandir, Roshan Garden, Masudabad, Najafgarh, New Delhi, Delhi 110043",
//     phone: "9217371207",
//     email: "sm.najafgarh@garudtata.com",
//     hours: "10 AM – 7 PM · Mon – Sun",
//     staticMapUrl:
//       "https://staticmap.openstreetmap.de/staticmap.php?center=28.6100,76.9800&zoom=14&size=640x340&markers=28.6100,76.9800,red-pushpin",
//     mapsNav:
//       "https://maps.google.com/?q=Plot+No+8+to+11+Najafgarh+Rd+Near+Sai+Baba+Mandir+Najafgarh+New+Delhi+110043",
//   },
//   {
//     id: "service-dwarka",
//     name: "Garud Tata Service Centre, Matiala Dwarka",
//     shortName: "Dwarka Service",
//     type: "workshop",
//     address: "Service – Shanti Garden, Matiala Industrial Area, Dwarka, New Delhi, Delhi 110059",
//     phone: "9319198306",
//     email: "crmservice.matiala@garudtata.com",
//     hours: "9 AM – 7 PM · Mon – Sun",
//     staticMapUrl:
//       "https://staticmap.openstreetmap.de/staticmap.php?center=28.6020,77.0320&zoom=15&size=640x340&markers=28.6020,77.0320,red-pushpin",
//     mapsNav:
//       "https://maps.google.com/?q=Shanti+Garden+Matiala+Industrial+Area+Dwarka+New+Delhi+110059",
//   },
//   {
//     id: "service-najafgarh",
//     name: "Garud Tata Service Centre, Najafgarh",
//     shortName: "Najafgarh Service",
//     type: "workshop",
//     address:
//       "Service – Plot No. 8–11, Main Najafgarh Road, Near Sai Baba Mandir, Najafgarh, New Delhi, Delhi 110043",
//     phone: "9319198306",
//     email: "service@garudtata.com",
//     hours: "9 AM – 7 PM · Mon – Sun",
//     staticMapUrl:
//       "https://staticmap.openstreetmap.de/staticmap.php?center=28.6100,76.9800&zoom=14&size=640x340&markers=28.6100,76.9800,red-pushpin",
//     mapsNav:
//       "https://maps.google.com/?q=Plot+No+8+to+11+Main+Najafgarh+Road+Near+Sai+Baba+Mandir+Najafgarh+New+Delhi+110043",
//   },
// ];

// const SHOWROOMS = OUTLETS.filter((o) => o.type === "showroom");
// const WORKSHOPS = OUTLETS.filter((o) => o.type === "workshop");

// /* ── TAB BUTTON ─────────────────────────────────────────────────────── */
// type TabKey = "showroom" | "workshop";

// function TabBar({ active, onChange }: { active: TabKey; onChange: (t: TabKey) => void }) {
//   return (
//     <div className="inline-flex rounded-full bg-white/[0.05] border border-white/[0.08] p-1 gap-1">
//       {(["showroom", "workshop"] as TabKey[]).map((t) => (
//         <button
//           key={t}
//           onClick={() => onChange(t)}
//           className="relative px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-[12px] font-bold tracking-[0.07em] uppercase transition-colors duration-200 min-h-[36px]"
//         >
//           {active === t && (
//             <motion.span
//               layoutId="showroom-tab-pill"
//               transition={{ type: "spring", stiffness: 400, damping: 34 }}
//               className="absolute inset-0 rounded-full bg-[#0055A5] shadow-[0_4px_18px_rgba(0,85,165,0.4)]"
//             />
//           )}
//           <span
//             className={`relative z-10 flex items-center gap-1.5 sm:gap-2 ${
//               active === t ? "text-white" : "text-white/40 hover:text-white/70"
//             }`}
//           >
//             {t === "showroom" ? <Building2 size={12} /> : <Wrench size={12} />}
//             {t === "showroom" ? "Showrooms" : "Service"}
//           </span>
//         </button>
//       ))}
//     </div>
//   );
// }

// /* ── STATIC MAP (replaces heavy iframe) ─────────────────────────────── */
// function StaticMap({
//   src,
//   alt,
//   mapsNav,
// }: {
//   src: string;
//   alt: string;
//   mapsNav: string;
// }) {
//   const [imgError, setImgError] = useState(false);

//   return (
//     <a
//       href={mapsNav}
//       target="_blank"
//       rel="noopener noreferrer"
//       aria-label={`Open ${alt} in Google Maps`}
//       className="group relative block w-full h-full rounded-2xl overflow-hidden bg-[#0A1828] cursor-pointer"
//     >
//       {imgError ? (
//         /* Fallback when image fails */
//         <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/30">
//           <MapPin size={28} className="text-[#0055A5]/60" />
//           <span className="text-[11px] font-medium tracking-wide">View on Google Maps</span>
//         </div>
//       ) : (
//         <img
//           src={src}
//           alt={alt}
//           loading="lazy"
//           decoding="async"
//           onError={() => setImgError(true)}
//           className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
//           style={{
//             filter: "invert(90%) hue-rotate(180deg) saturate(0.55) brightness(0.82)",
//           }}
//         />
//       )}

//       {/* Overlay hint */}
//       <div className="absolute inset-0 bg-gradient-to-t from-[#0D1829]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
//         <span className="flex items-center gap-1.5 text-white text-[11px] font-semibold tracking-wide bg-[#0055A5]/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
//           <ExternalLink size={10} />
//           Open in Maps
//         </span>
//       </div>
//     </a>
//   );
// }

// /* ── INFO ROW ───────────────────────────────────────────────────────── */
// function InfoRow({
//   icon: Icon,
//   label,
//   children,
// }: {
//   icon: typeof MapPin;
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-white/[0.04] border border-white/[0.07]">
//       <Icon size={15} className="text-[#5BA3E8] mt-0.5 flex-shrink-0" strokeWidth={2} />
//       <div className="min-w-0">
//         <p className="text-[9.5px] sm:text-[10px] font-bold tracking-[0.16em] text-white/30 uppercase mb-0.5">
//           {label}
//         </p>
//         <div className="text-white/70 text-[12.5px] sm:text-[13px] leading-relaxed">{children}</div>
//       </div>
//     </div>
//   );
// }

// /* ── OUTLET CARD ────────────────────────────────────────────────────── */
// function OutletCard({ outlet }: { outlet: Outlet }) {
//   const displayPhone = outlet.phone.replace(/(\d{5})(\d{5})/, "$1 $2");

//   return (
//     <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.1fr] gap-5 sm:gap-6">
//       {/* Static Map — fixed height on mobile, fills on desktop */}
//       <div className="rounded-2xl overflow-hidden h-48 sm:h-56 lg:h-full lg:min-h-[280px]">
//         <StaticMap src={outlet.staticMapUrl} alt={outlet.name} mapsNav={outlet.mapsNav} />
//       </div>

//       {/* Info */}
//       <div className="flex flex-col justify-between gap-4 sm:gap-5">
//         <div>
//           {/* Badge */}
//           <span
//             className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] sm:text-[9.5px] font-bold tracking-[0.16em] uppercase mb-3 border ${
//               outlet.type === "showroom"
//                 ? "bg-[#0055A5]/18 border-[#0055A5]/35 text-[#7DB8F7]"
//                 : "bg-amber-500/10 border-amber-400/25 text-amber-300"
//             }`}
//           >
//             {outlet.type === "showroom" ? (
//               <>
//                 <Building2 size={9} />
//                 Showroom
//               </>
//             ) : (
//               <>
//                 <Wrench size={9} />
//                 Workshop
//               </>
//             )}
//           </span>

//           <h3 className="text-white font-extrabold text-[1.1rem] sm:text-[1.25rem] lg:text-[1.35rem] tracking-tight leading-tight mb-3 sm:mb-4">
//             {outlet.name}
//           </h3>

//           <div className="space-y-2 sm:space-y-2.5">
//             <InfoRow icon={MapPin} label="Address">
//               {outlet.address}
//             </InfoRow>

//             <InfoRow icon={Phone} label="Phone">
//               <a
//                 href={`tel:+91${outlet.phone}`}
//                 className="hover:text-[#7DB8F7] transition-colors duration-150"
//               >
//                 +91 {displayPhone}
//               </a>
//             </InfoRow>

//             <InfoRow icon={Mail} label="Email">
//               <a
//                 href={`mailto:${outlet.email}`}
//                 className="hover:text-[#7DB8F7] transition-colors duration-150 break-all"
//               >
//                 {outlet.email}
//               </a>
//             </InfoRow>

//             <InfoRow icon={Clock} label="Working Hours">
//               {outlet.hours}
//             </InfoRow>
//           </div>
//         </div>

//         {/* CTAs */}
//         <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-1">
//           <a
//             href={outlet.mapsNav}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="group flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 min-h-[42px] sm:min-h-[44px] rounded-full bg-[#0055A5] hover:bg-[#1A70D4] text-white font-bold text-[11.5px] sm:text-[12px] tracking-[0.07em] shadow-[0_4px_18px_rgba(0,85,165,0.38)] transition-all duration-200"
//           >
//             <Navigation
//               size={13}
//               className="group-hover:-rotate-12 transition-transform duration-200"
//             />
//             Get Directions
//           </a>
//           <a
//             href={`tel:+91${outlet.phone}`}
//             className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 min-h-[42px] sm:min-h-[44px] rounded-full bg-white/[0.06] border border-white/[0.12] hover:border-white/[0.28] hover:bg-white/[0.10] text-white/65 hover:text-white font-medium text-[11.5px] sm:text-[12px] tracking-[0.05em] transition-all duration-200"
//           >
//             <Phone size={13} />
//             Call Now
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ── MAIN SECTION ───────────────────────────────────────────────────── */
// export default function Showroom() {
//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });
//   const prefersReduced = useReducedMotion();

//   const [tab, setTab] = useState<TabKey>("showroom");
//   const [current, setCurrent] = useState(0);

//   const outlets = tab === "showroom" ? SHOWROOMS : WORKSHOPS;
//   const total = outlets.length;

//   // Reset index when tab changes
//   useEffect(() => setCurrent(0), [tab]);

//   const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
//   const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

//   // Swipe support
//   const touchStartX = useRef<number | null>(null);
//   const handleTouchStart = (e: React.TouchEvent) => {
//     touchStartX.current = e.touches[0].clientX;
//   };
//   const handleTouchEnd = (e: React.TouchEvent) => {
//     if (touchStartX.current === null) return;
//     const delta = e.changedTouches[0].clientX - touchStartX.current;
//     if (Math.abs(delta) > 50) {
//       delta < 0 ? next() : prev();
//     }
//     touchStartX.current = null;
//   };

//   return (
//     <section
//       id="showroom"
//       className="relative bg-[#0D1829] py-14 sm:py-20 lg:py-28 overflow-hidden"
//     >
//       {/* Background grid + glow */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div
//           className="absolute inset-0 opacity-[0.022]"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
//             backgroundSize: "72px 72px",
//           }}
//         />
//         <div className="hidden sm:block absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#0055A5]/7 blur-[150px]" />
//         <div className="hidden sm:block absolute bottom-[5%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#1A70D4]/5 blur-[120px]" />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Header */}
//         <div ref={ref} className="text-center mb-8 sm:mb-12">
//           <motion.span
//             initial={prefersReduced ? false : { opacity: 0 }}
//             animate={inView ? { opacity: 1 } : {}}
//             className="text-[10px] font-bold tracking-[0.28em] text-[#7DB8F7] uppercase mb-3 block"
//           >
//             GARUD TATA · LOCATIONS
//           </motion.span>
//           <motion.h2
//             initial={prefersReduced ? false : { opacity: 0, y: 20 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//             className="text-white font-extrabold text-[clamp(1.7rem,6vw,3.2rem)] tracking-[-0.02em] leading-[1.04] mb-4"
//           >
//             Visit Garud Tata
//           </motion.h2>
//           <motion.p
//             initial={prefersReduced ? false : { opacity: 0 }}
//             animate={inView ? { opacity: 1 } : {}}
//             transition={{ delay: 0.16 }}
//             className="text-white/40 text-[13.5px] sm:text-[15px] max-w-md mx-auto leading-relaxed mb-6 sm:mb-7"
//           >
//             3 showrooms and 2 service centres across Delhi NCR — find the one closest to you.
//           </motion.p>

//           {/* Tab */}
//           <motion.div
//             initial={prefersReduced ? false : { opacity: 0, y: 8 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.22 }}
//             className="flex justify-center"
//           >
//             <TabBar active={tab} onChange={setTab} />
//           </motion.div>
//         </div>

//         {/* Slide area */}
//         <motion.div
//           initial={prefersReduced ? false : { opacity: 0, y: 24 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.28, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
//           className="bg-[#102030] border border-white/[0.07] rounded-3xl p-4 sm:p-6 lg:p-8"
//           onTouchStart={handleTouchStart}
//           onTouchEnd={handleTouchEnd}
//         >
//           {/* Slide counter + arrows */}
//           <div className="flex items-center justify-between mb-5 sm:mb-6">
//             <div className="flex items-center gap-2">
//               {outlets.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrent(i)}
//                   aria-label={`Go to outlet ${i + 1}`}
//                   className={`rounded-full transition-all duration-300 ${
//                     i === current
//                       ? "w-5 h-1.5 bg-[#0055A5]"
//                       : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
//                   }`}
//                 />
//               ))}
//             </div>

//             {total > 1 && (
//               <div className="flex items-center gap-1.5 sm:gap-2">
//                 <span className="text-[10.5px] sm:text-[11px] text-white/25 font-medium tabular-nums mr-1">
//                   {current + 1} / {total}
//                 </span>
//                 <button
//                   onClick={prev}
//                   aria-label="Previous outlet"
//                   className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.12] hover:border-white/[0.22] flex items-center justify-center text-white/50 hover:text-white transition-all duration-150"
//                 >
//                   <ChevronLeft size={15} strokeWidth={2.5} />
//                 </button>
//                 <button
//                   onClick={next}
//                   aria-label="Next outlet"
//                   className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.12] hover:border-white/[0.22] flex items-center justify-center text-white/50 hover:text-white transition-all duration-150"
//                 >
//                   <ChevronRight size={15} strokeWidth={2.5} />
//                 </button>
//               </div>
//             )}
//           </div>

//           {/* Animated outlet card */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={`${tab}-${current}`}
//               initial={prefersReduced ? false : { opacity: 0, x: 20 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -20 }}
//               transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
//             >
//               <OutletCard outlet={outlets[current]} />
//             </motion.div>
//           </AnimatePresence>
//         </motion.div>

//         {/* Quick-nav pill list — desktop only */}
//         <div className="hidden lg:flex items-center justify-center gap-3 mt-8 flex-wrap">
//           {OUTLETS.map((o) => {
//             const isActive = outlets[current]?.id === o.id && tab === o.type;
//             return (
//               <button
//                 key={o.id}
//                 onClick={() => {
//                   setTab(o.type);
//                   setCurrent(
//                     (o.type === "showroom" ? SHOWROOMS : WORKSHOPS).findIndex((x) => x.id === o.id)
//                   );
//                 }}
//                 className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[11.5px] font-semibold transition-all duration-200 ${
//                   isActive
//                     ? "bg-[#0055A5] border-[#0055A5] text-white shadow-[0_3px_14px_rgba(0,85,165,0.35)]"
//                     : "bg-white/[0.04] border-white/[0.09] text-white/40 hover:text-white/75 hover:border-white/20"
//                 }`}
//               >
//                 {o.type === "showroom" ? <Building2 size={11} /> : <Wrench size={11} />}
//                 {o.shortName}
//               </button>
//             );
//           })}
//         </div>

//         {/* Mobile quick-nav — scrollable pills */}
//         <div className="flex lg:hidden items-center gap-2 mt-6 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
//           {outlets.map((o, i) => (
//             <button
//               key={o.id}
//               onClick={() => setCurrent(i)}
//               className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-semibold transition-all duration-200 ${
//                 i === current
//                   ? "bg-[#0055A5] border-[#0055A5] text-white"
//                   : "bg-white/[0.04] border-white/[0.09] text-white/40"
//               }`}
//             >
//               {o.type === "showroom" ? <Building2 size={10} /> : <Wrench size={10} />}
//               {o.shortName}
//             </button>
//           ))}
//         </div>

//         {/* EV note */}
//         <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2 text-[11px] sm:text-[11.5px] text-white/25">
//           <Zap size={11} className="text-emerald-400" />
//           EV test drives available at all showroom locations
//         </div>
//       </div>
//     </section>
//   );
// }

















"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  MapPin, Phone, Clock, Navigation, Mail, ChevronLeft, ChevronRight,
  Wrench, Building2, Zap, ExternalLink,
} from "lucide-react";

/* ── DATA ───────────────────────────────────────────────────────────── */
type OutletType = "showroom" | "workshop";

interface Outlet {
  id: string;
  name: string;
  shortName: string;
  type: OutletType;
  address: string;
  phone: string;
  email: string;
  hours: string;
  /** Google Maps link for directions */
  mapsNav: string;
}

const OUTLETS: Outlet[] = [
  {
    id: "palam",
    name: "Garud Tata Palam",
    shortName: "Palam",
    type: "showroom",
    address: "Sales – Garg Plaza, RZ A70, Dabri–Palam Rd, Main Shiv Market, Palam, New Delhi, Delhi 110045",
    phone: "9217371204",
    email: "sm.dwarka@garudtata.com",
    hours: "10 AM – 7 PM · Mon – Sun",
    mapsNav: "https://maps.google.com/?q=Garg+Plaza+RZ+A70+Dabri+Palam+Rd+Main+Shiv+Market+Palam+New+Delhi+110045",
  },
  {
    id: "narela",
    name: "Garud Tata Narela",
    shortName: "Narela",
    type: "showroom",
    address: "Sales – Khasra No 42/12, Narela, New Delhi, Delhi 110040",
    phone: "9311083011",
    email: "sm.narela@garudtata.com",
    hours: "10 AM – 7 PM · Mon – Sun",
    mapsNav: "https://maps.google.com/?q=Khasra+No+42%2F12+Narela+New+Delhi+110040",
  },
  {
    id: "najafgarh-show",
    name: "Garud Tata Najafgarh",
    shortName: "Najafgarh",
    type: "showroom",
    address: "Sales – Plot No. 8–11, Najafgarh Rd, Near Sai Baba Mandir, Roshan Garden, Masudabad, Najafgarh, New Delhi, Delhi 110043",
    phone: "9217371207",
    email: "sm.najafgarh@garudtata.com",
    hours: "10 AM – 7 PM · Mon – Sun",
    mapsNav: "https://maps.google.com/?q=Plot+No+8+to+11+Najafgarh+Rd+Near+Sai+Baba+Mandir+Najafgarh+New+Delhi+110043",
  },
  {
    id: "service-dwarka",
    name: "Garud Tata Service Centre, Matiala Dwarka",
    shortName: "Dwarka Service",
    type: "workshop",
    address: "Service – Shanti Garden, Matiala Industrial Area, Dwarka, New Delhi, Delhi 110059",
    phone: "9319198306",
    email: "crmservice.matiala@garudtata.com",
    hours: "9 AM – 7 PM · Mon – Sun",
    mapsNav: "https://maps.google.com/?q=Shanti+Garden+Matiala+Industrial+Area+Dwarka+New+Delhi+110059",
  },
  {
    id: "service-najafgarh",
    name: "Garud Tata Service Centre, Najafgarh",
    shortName: "Najafgarh Service",
    type: "workshop",
    address: "Service – Plot No. 8–11, Main Najafgarh Road, Near Sai Baba Mandir, Najafgarh, New Delhi, Delhi 110043",
    phone: "9319198306",
    email: "service@garudtata.com",
    hours: "9 AM – 7 PM · Mon – Sun",
    mapsNav: "https://maps.google.com/?q=Plot+No+8+to+11+Main+Najafgarh+Road+Near+Sai+Baba+Mandir+Najafgarh+New+Delhi+110043",
  },
];

const SHOWROOMS = OUTLETS.filter((o) => o.type === "showroom");
const WORKSHOPS = OUTLETS.filter((o) => o.type === "workshop");

/* ── TAB BUTTON ─────────────────────────────────────────────────────── */
type TabKey = "showroom" | "workshop";

function TabBar({ active, onChange }: { active: TabKey; onChange: (t: TabKey) => void }) {
  return (
    <div className="inline-flex rounded-full bg-white/[0.05] border border-white/[0.08] p-1 gap-1">
      {(["showroom", "workshop"] as TabKey[]).map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className="relative px-4 sm:px-5 py-2 rounded-full text-[11px] sm:text-[12px] font-bold tracking-[0.07em] uppercase transition-colors duration-200 min-h-[36px]"
        >
          {active === t && (
            <motion.span
              layoutId="showroom-tab-pill"
              transition={{ type: "spring", stiffness: 400, damping: 34 }}
              className="absolute inset-0 rounded-full bg-[#0055A5] shadow-[0_4px_18px_rgba(0,85,165,0.4)]"
            />
          )}
          <span
            className={`relative z-10 flex items-center gap-1.5 sm:gap-2 ${
              active === t ? "text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            {t === "showroom" ? <Building2 size={12} /> : <Wrench size={12} />}
            {t === "showroom" ? "Showrooms" : "Service"}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ── KEYLESS GOOGLE MAP PREVIEW ─────────────────────────────────────── */
function GoogleMapPreview({
  address,
  alt,
  mapsNav,
}: {
  address: string;
  alt: string;
  mapsNav: string;
}) {
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=m&z=14&output=embed&iwloc=near`;

  return (
    <a
      href={mapsNav}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${alt} in Google Maps`}
      className="group relative block w-full h-full rounded-2xl overflow-hidden bg-[#0A1828] cursor-pointer"
    >
      {/* Fallback / Loading Background */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white/30 z-0">
        <MapPin size={28} className="text-[#0055A5]/60" />
        <span className="text-[11px] font-medium tracking-wide">View on Google Maps</span>
      </div>

      {/* Embedded Iframe */}
      <iframe
        title={alt}
        src={mapUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        /* pointer-events-none prevents scrolling/clicking inside the iframe, 
           ensuring the <a> tag receives the click to open Google Maps, matching your original design */
        className="relative z-10 w-full h-full border-0 object-cover pointer-events-none transition-transform duration-500 group-hover:scale-[1.03]"
        style={{
          /* Keeps your beautiful dark-mode aesthetic */
          filter: "invert(90%) hue-rotate(180deg) saturate(0.55) brightness(0.82)",
        }}
      />

      {/* Overlay hint */}
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#0D1829]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
        <span className="flex items-center gap-1.5 text-white text-[11px] font-semibold tracking-wide bg-[#0055A5]/80 px-3 py-1.5 rounded-full backdrop-blur-sm">
          <ExternalLink size={10} />
          Open in Maps
        </span>
      </div>
    </a>
  );
}

/* ── INFO ROW ───────────────────────────────────────────────────────── */
function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-white/[0.04] border border-white/[0.07]">
      <Icon size={15} className="text-[#5BA3E8] mt-0.5 flex-shrink-0" strokeWidth={2} />
      <div className="min-w-0">
        <p className="text-[9.5px] sm:text-[10px] font-bold tracking-[0.16em] text-white/30 uppercase mb-0.5">
          {label}
        </p>
        <div className="text-white/70 text-[12.5px] sm:text-[13px] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

/* ── OUTLET CARD ────────────────────────────────────────────────────── */
function OutletCard({ outlet }: { outlet: Outlet }) {
  const displayPhone = outlet.phone.replace(/(\d{5})(\d{5})/, "$1 $2");

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.1fr] gap-5 sm:gap-6">
      {/* Map Preview — fixed height on mobile, fills on desktop */}
      <div className="rounded-2xl overflow-hidden h-48 sm:h-56 lg:h-full lg:min-h-[280px]">
        <GoogleMapPreview address={outlet.address} alt={outlet.name} mapsNav={outlet.mapsNav} />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between gap-4 sm:gap-5">
        <div>
          {/* Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] sm:text-[9.5px] font-bold tracking-[0.16em] uppercase mb-3 border ${
              outlet.type === "showroom"
                ? "bg-[#0055A5]/18 border-[#0055A5]/35 text-[#7DB8F7]"
                : "bg-amber-500/10 border-amber-400/25 text-amber-300"
            }`}
          >
            {outlet.type === "showroom" ? (
              <>
                <Building2 size={9} />
                Showroom
              </>
            ) : (
              <>
                <Wrench size={9} />
                Workshop
              </>
            )}
          </span>

          <h3 className="text-white font-extrabold text-[1.1rem] sm:text-[1.25rem] lg:text-[1.35rem] tracking-tight leading-tight mb-3 sm:mb-4">
            {outlet.name}
          </h3>

          <div className="space-y-2 sm:space-y-2.5">
            <InfoRow icon={MapPin} label="Address">
              {outlet.address}
            </InfoRow>

            <InfoRow icon={Phone} label="Phone">
              <a
                href={`tel:+91${outlet.phone}`}
                className="hover:text-[#7DB8F7] transition-colors duration-150"
              >
                +91 {displayPhone}
              </a>
            </InfoRow>

            <InfoRow icon={Mail} label="Email">
              <a
                href={`mailto:${outlet.email}`}
                className="hover:text-[#7DB8F7] transition-colors duration-150 break-all"
              >
                {outlet.email}
              </a>
            </InfoRow>

            <InfoRow icon={Clock} label="Working Hours">
              {outlet.hours}
            </InfoRow>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 pt-1">
          <a
            href={outlet.mapsNav}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 min-h-[42px] sm:min-h-[44px] rounded-full bg-[#0055A5] hover:bg-[#1A70D4] text-white font-bold text-[11.5px] sm:text-[12px] tracking-[0.07em] shadow-[0_4px_18px_rgba(0,85,165,0.38)] transition-all duration-200"
          >
            <Navigation
              size={13}
              className="group-hover:-rotate-12 transition-transform duration-200"
            />
            Get Directions
          </a>
          <a
            href={`tel:+91${outlet.phone}`}
            className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 min-h-[42px] sm:min-h-[44px] rounded-full bg-white/[0.06] border border-white/[0.12] hover:border-white/[0.28] hover:bg-white/[0.10] text-white/65 hover:text-white font-medium text-[11.5px] sm:text-[12px] tracking-[0.05em] transition-all duration-200"
          >
            <Phone size={13} />
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── MAIN SECTION ───────────────────────────────────────────────────── */
export default function Showroom() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  const [tab, setTab] = useState<TabKey>("showroom");
  const [current, setCurrent] = useState(0);

  const outlets = tab === "showroom" ? SHOWROOMS : WORKSHOPS;
  const total = outlets.length;

  useEffect(() => setCurrent(0), [tab]);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      delta < 0 ? next() : prev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="showroom"
      className="relative bg-[#0D1829] py-14 sm:py-20 lg:py-28 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="hidden sm:block absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#0055A5]/7 blur-[150px]" />
        <div className="hidden sm:block absolute bottom-[5%] right-[5%] w-[400px] h-[400px] rounded-full bg-[#1A70D4]/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-8 sm:mb-12">
          <motion.span
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[10px] font-bold tracking-[0.28em] text-[#7DB8F7] uppercase mb-3 block"
          >
            GARUD TATA · LOCATIONS
          </motion.span>
          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-white font-extrabold text-[clamp(1.7rem,6vw,3.2rem)] tracking-[-0.02em] leading-[1.04] mb-4"
          >
            Visit Garud Tata
          </motion.h2>
          <motion.p
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.16 }}
            className="text-white/40 text-[13.5px] sm:text-[15px] max-w-md mx-auto leading-relaxed mb-6 sm:mb-7"
          >
            3 showrooms and 2 service centres across Delhi NCR — find the one closest to you.
          </motion.p>
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22 }}
            className="flex justify-center"
          >
            <TabBar active={tab} onChange={setTab} />
          </motion.div>
        </div>

        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.28, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#102030] border border-white/[0.07] rounded-3xl p-4 sm:p-6 lg:p-8"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex items-center justify-between mb-5 sm:mb-6">
            <div className="flex items-center gap-2">
              {outlets.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to outlet ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-5 h-1.5 bg-[#0055A5]"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            {total > 1 && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[10.5px] sm:text-[11px] text-white/25 font-medium tabular-nums mr-1">
                  {current + 1} / {total}
                </span>
                <button
                  onClick={prev}
                  aria-label="Previous outlet"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.12] hover:border-white/[0.22] flex items-center justify-center text-white/50 hover:text-white transition-all duration-150"
                >
                  <ChevronLeft size={15} strokeWidth={2.5} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next outlet"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.12] hover:border-white/[0.22] flex items-center justify-center text-white/50 hover:text-white transition-all duration-150"
                >
                  <ChevronRight size={15} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${tab}-${current}`}
              initial={prefersReduced ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <OutletCard outlet={outlets[current]} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="hidden lg:flex items-center justify-center gap-3 mt-8 flex-wrap">
          {OUTLETS.map((o) => {
            const isActive = outlets[current]?.id === o.id && tab === o.type;
            return (
              <button
                key={o.id}
                onClick={() => {
                  setTab(o.type);
                  setCurrent(
                    (o.type === "showroom" ? SHOWROOMS : WORKSHOPS).findIndex((x) => x.id === o.id)
                  );
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[11.5px] font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-[#0055A5] border-[#0055A5] text-white shadow-[0_3px_14px_rgba(0,85,165,0.35)]"
                    : "bg-white/[0.04] border-white/[0.09] text-white/40 hover:text-white/75 hover:border-white/20"
                }`}
              >
                {o.type === "showroom" ? <Building2 size={11} /> : <Wrench size={11} />}
                {o.shortName}
              </button>
            );
          })}
        </div>

        <div className="flex lg:hidden items-center gap-2 mt-6 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-none">
          {outlets.map((o, i) => (
            <button
              key={o.id}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-semibold transition-all duration-200 ${
                i === current
                  ? "bg-[#0055A5] border-[#0055A5] text-white"
                  : "bg-white/[0.04] border-white/[0.09] text-white/40"
              }`}
            >
              {o.type === "showroom" ? <Building2 size={10} /> : <Wrench size={10} />}
              {o.shortName}
            </button>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2 text-[11px] sm:text-[11.5px] text-white/25">
          <Zap size={11} className="text-emerald-400" />
          EV test drives available at all showroom locations
        </div>
      </div>
    </section>
  );
}




