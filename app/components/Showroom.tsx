// "use client";
// import { useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import { MapPin, Phone, Clock, Navigation } from "lucide-react";

// export default function Showroom() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });

//   return (
//     <section id="showroom" className="bg-[#07111F] py-20 lg:py-28">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div ref={ref} className="text-center mb-14">
//           <motion.span
//             initial={{ opacity: 0 }}
//             animate={inView ? { opacity: 1 } : {}}
//             className="text-[#1E7FE8] text-sm font-semibold uppercase tracking-widest block mb-3"
//           >
//             Find Us
//           </motion.span>
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.1 }}
//             className="text-4xl lg:text-5xl font-bold text-white"
//             style={{ fontFamily: "'Syne', sans-serif" }}
//           >
//             Visit Garud Tata
//           </motion.h2>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-10 items-center">
//           {/* Image */}
//           <motion.div
//             initial={{ opacity: 0, x: -20 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.7 }}
//             className="rounded-3xl overflow-hidden aspect-[4/3] relative"
//           >
//             <img
//               src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80"
//               alt="Garud Tata Showroom"
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/50 to-transparent" />
//             <div className="absolute bottom-5 left-5 glass rounded-xl px-4 py-3 border border-white/10">
//               <div className="text-white font-bold text-sm">Garud Tata – Palam</div>
//               <div className="text-white/50 text-xs">Authorized Tata Dealer</div>
//             </div>
//           </motion.div>

//           {/* Info */}
//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ duration: 0.7, delay: 0.1 }}
//             className="space-y-6"
//           >
//             <div>
//               <h3 className="text-white font-bold text-2xl mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
//                 Garud Tata – Palam
//               </h3>
//               <div className="text-[#1E7FE8] text-sm font-medium">Authorized Tata Motors Dealer</div>
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
//                 <MapPin size={20} className="text-[#1E7FE8] mt-0.5 flex-none" />
//                 <div>
//                   <div className="text-white font-medium text-sm mb-0.5">Address</div>
//                   <div className="text-white/50 text-sm leading-relaxed">
//                     Sales-Garg Plaza, RZ A70, Dabri - Palam Rd,<br />
//                     Main Shiv Market, Palam, New Delhi – 110045
//                   </div>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
//                 <Phone size={20} className="text-[#1E7FE8] mt-0.5 flex-none" />
//                 <div>
//                   <div className="text-white font-medium text-sm mb-0.5">Sales & Enquiries</div>
//                   <a href="tel:+91XXXXXXXXXX" className="text-white/50 text-sm hover:text-[#1E7FE8] transition-colors">+91 XXXX-XXXXXX</a>
//                 </div>
//               </div>

//               <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
//                 <Clock size={20} className="text-[#1E7FE8] mt-0.5 flex-none" />
//                 <div>
//                   <div className="text-white font-medium text-sm mb-1">Working Hours</div>
//                   <div className="text-white/50 text-sm">Mon – Sun: 9:30 AM – 7:30 PM</div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-4 pt-2">
//               <a
//                 href="https://maps.google.com/?q=Garg+Plaza+Palam+New+Delhi"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 px-6 py-3 bg-[#0055A5] rounded-full text-white font-semibold text-sm hover:bg-[#1E7FE8] transition-all"
//               >
//                 <Navigation size={16} />
//                 Get Directions
//               </a>
//               <a
//                 href="tel:+91XXXXXXXXXX"
//                 className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-white/70 font-semibold text-sm hover:bg-white/5 transition-all"
//               >
//                 <Phone size={16} />
//                 Call Now
//               </a>
//             </div>
//           </motion.div>
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
  Wrench, Building2, Zap,
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
  email?: string;
  hours: string;
  mapsEmbed: string;   // Google Maps embed src
  mapsNav: string;     // google.com/maps navigation link
}

const OUTLETS: Outlet[] = [
  {
    id: "palam",
    name: "Garud Tata Palam",
    shortName: "Palam",
    type: "showroom",
    address: "Sales – Garg Plaza, RZ A70, Dabri - Palam Rd, Main Shiv Market, Palam, New Delhi – 110045",
    phone: "+91 93191 98306",
    hours: "10 AM – 7 PM · Mon – Sun",
    mapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.5!2d77.07!3d28.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM1JzI0LjAiTiA3N8KwMDQnMTIuMCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin",
    mapsNav:
      "https://maps.google.com/?q=Garg+Plaza+RZ+A70+Dabri+Palam+Rd+Main+Shiv+Market+Palam+New+Delhi+110045",
  },
  {
    id: "narela",
    name: "Garud Tata Narela",
    shortName: "Narela",
    type: "showroom",
    address: "Sales – Khasra No 42/12, Narela, New Delhi – 110040",
    phone: "+91 93191 98306",
    hours: "10 AM – 7 PM · Mon – Sun",
    mapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.0!2d77.09!3d28.85!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDUxJzAwLjAiTiA3N8KwMDUnMjQuMCJF!5e0!3m2!1sen!2sin!4v1600000000001!5m2!1sen!2sin",
    mapsNav:
      "https://maps.google.com/?q=Khasra+No+42%2F12+Narela+New+Delhi+110040",
  },
  {
    id: "najafgarh-show",
    name: "Garud Tata Najafgarh",
    shortName: "Najafgarh",
    type: "showroom",
    address:
      "Sales – Plot No. 8 to 11, Najafgarh Rd, near Sai Baba Mandir, Roshan Garden, Block A1, Masudabad, Najafgarh, New Delhi – 110043",
    phone: "+91 93191 98306",
    hours: "10 AM – 7 PM · Mon – Sun",
    mapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.0!2d76.98!3d28.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzM2LjAiTiA3NsKwNTgnNDguMCJF!5e0!3m2!1sen!2sin!4v1600000000002!5m2!1sen!2sin",
    mapsNav:
      "https://maps.google.com/?q=Plot+No+8+to+11+Najafgarh+Rd+near+Sai+Baba+Mandir+Najafgarh+New+Delhi+110043",
  },
  {
    id: "service-dwarka",
    name: "Garud Tata Service Centre, Matiala Dwarka",
    shortName: "Dwarka Service",
    type: "workshop",
    address: "Service – Shanti Garden, Matiala Indl. Area, Dwarka, New Delhi – 110059",
    phone: "+91 93191 98306",
    email: "service@garudtata.com",
    hours: "9 AM – 7 PM · Mon – Sun",
    mapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.0!2d77.03!3d28.60!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzAwLjAiTiA3N8KwMDEnNDguMCJF!5e0!3m2!1sen!2sin!4v1600000000003!5m2!1sen!2sin",
    mapsNav:
      "https://maps.google.com/?q=Shanti+Garden+Matiala+Indl+Area+Dwarka+New+Delhi+110059",
  },
  {
    id: "service-najafgarh",
    name: "Garud Tata Service Centre, Najafgarh",
    shortName: "Najafgarh Service",
    type: "workshop",
    address:
      "Service – Plot No. 8 to 11, Main Najafgarh Road, Near Sai Baba Mandir, Najafgarh, New Delhi – 110043",
    phone: "+91 93191 98306",
    email: "service@garudtata.com",
    hours: "9 AM – 7 PM · Mon – Sun",
    mapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.0!2d76.98!3d28.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzM2LjAiTiA3NsKwNTgnNDguMCJF!5e0!3m2!1sen!2sin!4v1600000000004!5m2!1sen!2sin",
    mapsNav:
      "https://maps.google.com/?q=Plot+No+8+to+11+Main+Najafgarh+Road+Near+Sai+Baba+Mandir+Najafgarh+New+Delhi+110043",
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
          className="relative px-5 py-2 rounded-full text-[12px] font-bold tracking-[0.07em] uppercase transition-colors duration-200 min-h-[36px]"
        >
          {active === t && (
            <motion.span
              layoutId="showroom-tab-pill"
              transition={{ type: "spring", stiffness: 400, damping: 34 }}
              className="absolute inset-0 rounded-full bg-[#0055A5] shadow-[0_4px_18px_rgba(0,85,165,0.4)]"
            />
          )}
          <span
            className={`relative z-10 flex items-center gap-2 ${
              active === t ? "text-white" : "text-white/40 hover:text-white/70"
            }`}
          >
            {t === "showroom" ? <Building2 size={13} /> : <Wrench size={13} />}
            {t === "showroom" ? "Showrooms" : "Service"}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ── MAP EMBED (lazy) ───────────────────────────────────────────────── */
function MapEmbed({ src, title }: { src: string; title: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-full bg-[#0A1828] rounded-2xl overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-[#0055A5] border-t-transparent animate-spin" />
        </div>
      )}
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full border-0 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{ filter: "invert(90%) hue-rotate(180deg) saturate(0.6) brightness(0.85)" }}
      />
    </div>
  );
}

/* ── INFO ROW ───────────────────────────────────────────────────────── */
function InfoRow({
  icon: Icon, label, children,
}: {
  icon: typeof MapPin;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3.5 p-4 rounded-xl bg-white/[0.04] border border-white/[0.07]">
      <Icon size={16} className="text-[#5BA3E8] mt-0.5 flex-shrink-0" strokeWidth={2} />
      <div className="min-w-0">
        <p className="text-[10px] font-bold tracking-[0.16em] text-white/30 uppercase mb-0.5">{label}</p>
        <div className="text-white/70 text-[13px] leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

/* ── OUTLET CARD ────────────────────────────────────────────────────── */
function OutletCard({ outlet }: { outlet: Outlet }) {
  return (
    <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 h-full">
      {/* Map */}
      <div className="rounded-2xl overflow-hidden h-64 lg:h-full min-h-[260px]">
        <MapEmbed src={outlet.mapsEmbed} title={outlet.name} />
      </div>

      {/* Info */}
      <div className="flex flex-col justify-between gap-5">
        <div>
          {/* Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9.5px] font-bold tracking-[0.16em] uppercase mb-3 border ${
              outlet.type === "showroom"
                ? "bg-[#0055A5]/18 border-[#0055A5]/35 text-[#7DB8F7]"
                : "bg-amber-500/10 border-amber-400/25 text-amber-300"
            }`}
          >
            {outlet.type === "showroom" ? (
              <><Building2 size={9} />Showroom</>
            ) : (
              <><Wrench size={9} />Workshop</>
            )}
          </span>

          <h3 className="text-white font-extrabold text-[1.2rem] sm:text-[1.35rem] tracking-tight leading-tight mb-4">
            {outlet.name}
          </h3>

          <div className="space-y-2.5">
            <InfoRow icon={MapPin} label="Address">
              {outlet.address}
            </InfoRow>

            <InfoRow icon={Phone} label="Phone">
              <a
                href={`tel:${outlet.phone.replace(/\s/g, "")}`}
                className="hover:text-[#7DB8F7] transition-colors duration-150"
              >
                {outlet.phone}
              </a>
            </InfoRow>

            {outlet.email && (
              <InfoRow icon={Mail} label="Email">
                <a
                  href={`mailto:${outlet.email}`}
                  className="hover:text-[#7DB8F7] transition-colors duration-150 break-all"
                >
                  {outlet.email}
                </a>
              </InfoRow>
            )}

            <InfoRow icon={Clock} label="Working Hours">
              {outlet.hours}
            </InfoRow>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href={outlet.mapsNav}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-full bg-[#0055A5] hover:bg-[#1A70D4] text-white font-bold text-[12px] tracking-[0.07em] shadow-[0_4px_18px_rgba(0,85,165,0.38)] transition-all duration-200"
          >
            <Navigation size={14} className="group-hover:-rotate-12 transition-transform duration-200" />
            Get Directions
          </a>
          <a
            href={`tel:${outlet.phone.replace(/\s/g, "")}`}
            className="flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-full bg-white/[0.06] border border-white/[0.12] hover:border-white/[0.28] hover:bg-white/[0.10] text-white/65 hover:text-white font-medium text-[12px] tracking-[0.05em] transition-all duration-200"
          >
            <Phone size={14} />
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── MAIN SECTION ───────────────────────────────────────────────────── */
export default function Showroom() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  const [tab,     setTab]     = useState<TabKey>("showroom");
  const [current, setCurrent] = useState(0);

  const outlets = tab === "showroom" ? SHOWROOMS : WORKSHOPS;
  const total   = outlets.length;

  // Reset index when tab changes
  useEffect(() => setCurrent(0), [tab]);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  return (
    <section id="showroom" className="relative bg-[#0D1829] py-16 sm:py-20 lg:py-28 overflow-hidden">
      {/* Background grid + glow */}
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

        {/* Header */}
        <div ref={ref} className="text-center mb-10 sm:mb-12">
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
            className="text-white font-extrabold text-[clamp(1.9rem,7vw,3.2rem)] tracking-[-0.02em] leading-[1.04] mb-4"
          >
            Visit Garud Tata
          </motion.h2>
          <motion.p
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.16 }}
            className="text-white/40 text-[14px] sm:text-[15px] max-w-md mx-auto leading-relaxed mb-7"
          >
            3 showrooms and 2 service centres across Delhi NCR — find the one closest to you.
          </motion.p>

          {/* Tab */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.22 }}
            className="flex justify-center"
          >
            <TabBar active={tab} onChange={setTab} />
          </motion.div>
        </div>

        {/* Slide area */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.28, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#102030] border border-white/[0.07] rounded-3xl p-5 sm:p-6 lg:p-8"
        >
          {/* Slide counter + arrows */}
          <div className="flex items-center justify-between mb-6">
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
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-white/25 font-medium tabular-nums mr-1">
                  {current + 1} / {total}
                </span>
                <button
                  onClick={prev}
                  aria-label="Previous outlet"
                  className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.12] hover:border-white/[0.22] flex items-center justify-center text-white/50 hover:text-white transition-all duration-150"
                >
                  <ChevronLeft size={16} strokeWidth={2.5} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next outlet"
                  className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.10] hover:bg-white/[0.12] hover:border-white/[0.22] flex items-center justify-center text-white/50 hover:text-white transition-all duration-150"
                >
                  <ChevronRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>

          {/* Animated outlet card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${tab}-${current}`}
              initial={prefersReduced ? false : { opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <OutletCard outlet={outlets[current]} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Quick-nav pill list — desktop only */}
        <div className="hidden lg:flex items-center justify-center gap-3 mt-8 flex-wrap">
          {OUTLETS.map((o, i) => {
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
                {o.type === "showroom" ? (
                  <Building2 size={11} />
                ) : (
                  <Wrench size={11} />
                )}
                {o.shortName}
              </button>
            );
          })}
        </div>

        {/* EV note */}
        <div className="mt-10 flex items-center justify-center gap-2 text-[11.5px] text-white/25">
          <Zap size={12} className="text-emerald-400" />
          EV test drives available at all showroom locations
        </div>
      </div>
    </section>
  );
}