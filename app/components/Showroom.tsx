// garud-tata\app\components\Showroom.tsx

"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  MapPin, Phone, Clock, Navigation, Mail, ChevronLeft, ChevronRight,
  Wrench, Building2, Zap, ExternalLink,
} from "lucide-react";
import type { OutletData, ShowroomConfig } from "@/app/config/showrooms";

type TabKey = "showroom" | "workshop";

interface ShowroomProps {
  outlets:  OutletData[];
  cityName: string;
}

/* ── TAB BAR ────────────────────────────────────────────────────────── */
function TabBar({ active, onChange }: { active: TabKey; onChange: (t: TabKey) => void }) {
  return (
    <div className="inline-flex rounded-full bg-white border border-gray-200 p-1 gap-1 shadow-sm">
      {(["showroom", "workshop"] as TabKey[]).map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className="relative px-4 sm:px-6 py-2 rounded-full text-[11px] sm:text-[12px] font-bold tracking-[0.07em] uppercase transition-colors duration-200 min-h-[36px]"
        >
          {active === t && (
            <motion.span
              layoutId="showroom-tab-pill"
              transition={{ type: "spring", stiffness: 400, damping: 34 }}
              className="absolute inset-0 rounded-full bg-[#004b8d] shadow-md shadow-[#004b8d]/20"
            />
          )}
          <span className={`relative z-10 flex items-center gap-1.5 sm:gap-2 ${active === t ? "text-white" : "text-gray-500 hover:text-gray-900"}`}>
            {t === "showroom" ? <Building2 size={14} /> : <Wrench size={14} />}
            {t === "showroom" ? "Showrooms" : "Service"}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ── GOOGLE MAP PREVIEW ─────────────────────────────────────────────── */
function GoogleMapPreview({ address, alt, mapsNav }: { address: string; alt: string; mapsNav: string }) {
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=m&z=14&output=embed&iwloc=near`;

  return (
    <a
      href={mapsNav}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${alt} in Google Maps`}
      className="group relative block w-full h-full rounded-2xl overflow-hidden bg-gray-100 cursor-pointer border border-gray-200"
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400 z-0 bg-gray-50">
        <MapPin size={28} className="text-[#004b8d]/60" />
        <span className="text-[11px] font-semibold tracking-wide">View on Google Maps</span>
      </div>
      <iframe
        title={alt}
        src={mapUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="relative z-10 w-full h-full border-0 object-cover pointer-events-none transition-transform duration-500 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-gray-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
        <span className="flex items-center gap-1.5 text-white text-[11px] font-bold tracking-wide bg-[#004b8d] px-3.5 py-1.5 rounded-full shadow-lg">
          <ExternalLink size={12} />
          Open in Maps
        </span>
      </div>
    </a>
  );
}

/* ── INFO ROW ───────────────────────────────────────────────────────── */
function InfoRow({ icon: Icon, label, children }: { icon: typeof MapPin; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-gray-50 border border-gray-100 transition-colors hover:bg-gray-100/50">
      <Icon size={16} className="text-[#004b8d] mt-0.5 flex-shrink-0" strokeWidth={2.5} />
      <div className="min-w-0">
        <p className="text-[9.5px] sm:text-[10px] font-bold tracking-[0.16em] text-gray-400 uppercase mb-0.5">{label}</p>
        <div className="text-gray-700 text-[12.5px] sm:text-[13px] font-medium leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

/* ── OUTLET CARD ────────────────────────────────────────────────────── */
function OutletCard({ outlet }: { outlet: OutletData }) {
  const displayPhone = outlet.phone.replace(/(\d{5})(\d{5})/, "$1 $2");

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.1fr] gap-5 sm:gap-6">
      <div className="rounded-2xl overflow-hidden h-48 sm:h-56 lg:h-full lg:min-h-[280px]">
        <GoogleMapPreview address={outlet.address} alt={outlet.name} mapsNav={outlet.mapsNav} />
      </div>
      <div className="flex flex-col justify-between gap-4 sm:gap-5">
        <div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] sm:text-[9.5px] font-black tracking-[0.16em] uppercase mb-3 border ${
            outlet.type === "showroom"
              ? "bg-[#004b8d]/10 border-[#004b8d]/20 text-[#004b8d]"
              : "bg-amber-100 border-amber-200 text-amber-700"
          }`}>
            {outlet.type === "showroom"
              ? <><Building2 size={10} />Showroom</>
              : <><Wrench size={10} />Workshop</>
            }
          </span>

          <h3 className="text-gray-900 font-black text-[1.25rem] sm:text-[1.35rem] lg:text-[1.5rem] tracking-tight leading-tight mb-4">
            {outlet.name}
          </h3>

          <div className="space-y-2.5">
            <InfoRow icon={MapPin} label="Address">{outlet.address}</InfoRow>
            <InfoRow icon={Phone} label="Phone">
              <a href={`tel:+91${outlet.phone}`} className="hover:text-[#004b8d] transition-colors duration-150">
                +91 {displayPhone}
              </a>
            </InfoRow>
            <InfoRow icon={Mail} label="Email">
              <a href={`mailto:${outlet.email}`} className="hover:text-[#004b8d] transition-colors duration-150 break-all">
                {outlet.email}
              </a>
            </InfoRow>
            <InfoRow icon={Clock} label="Working Hours">{outlet.hours}</InfoRow>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href={outlet.mapsNav}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-[#004b8d] hover:bg-[#00386b] text-white font-bold text-[12px] tracking-[0.05em] shadow-md shadow-[#004b8d]/20 transition-all duration-200"
          >
            <Navigation size={14} className="group-hover:-rotate-12 transition-transform duration-200" />
            Get Directions
          </a>
          <a
            href={`tel:+91${outlet.phone}`}
            className="flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-white border border-gray-200 hover:border-[#004b8d]/40 hover:bg-gray-50 text-gray-700 hover:text-[#004b8d] font-bold text-[12px] tracking-[0.05em] shadow-sm transition-all duration-200"
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
export default function Showroom({ outlets, cityName }: ShowroomProps) {
  const ref            = useRef<HTMLDivElement>(null);
  const inView         = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  // Derive showrooms/workshops from the config outlets
  const showroomOutlets = outlets.filter((o) => o.type === "showroom");
  const workshopOutlets = outlets.filter((o) => o.type === "workshop");
  const hasWorkshops    = workshopOutlets.length > 0;

  const [tab,     setTab]     = useState<TabKey>("showroom");
  const [current, setCurrent] = useState(0);

  const activeOutlets = tab === "showroom" ? showroomOutlets : workshopOutlets;
  const total         = activeOutlets.length;

  useEffect(() => setCurrent(0), [tab]);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) delta < 0 ? next() : prev();
    touchStartX.current = null;
  };

  // City label — last word e.g. "Garud Tata Indore" → "Indore"
  const cityLabel = cityName.split(" ").pop();

  return (
    <section id="showroom" className="relative bg-gray-50 py-16 sm:py-20 lg:py-28 overflow-hidden font-sans">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="hidden sm:block absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#004b8d]/5 blur-[120px]" />
        <div className="hidden sm:block absolute bottom-[5%] right-[5%] w-[400px] h-[400px] rounded-full bg-blue-400/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={ref} className="text-center mb-10 sm:mb-14">
          <motion.span
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="inline-block text-[10px] sm:text-xs font-black tracking-[0.2em] text-[#004b8d] bg-[#004b8d]/10 border border-[#004b8d]/20 px-4 py-1.5 rounded-full mb-4 shadow-sm"
          >
            GARUD TATA · {cityLabel?.toUpperCase()}
          </motion.span>

          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-gray-900 font-black text-[clamp(1.7rem,6vw,3.2rem)] tracking-tight leading-[1.1] mb-4"
          >
            Visit Us in {cityLabel}
          </motion.h2>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.16 }}
            className="text-gray-500 font-medium text-[13.5px] sm:text-[15px] max-w-md mx-auto leading-relaxed mb-8"
          >
            {hasWorkshops
              ? `${showroomOutlets.length} showroom${showroomOutlets.length > 1 ? "s" : ""} and ${workshopOutlets.length} service centre${workshopOutlets.length > 1 ? "s" : ""} in ${cityLabel}.`
              : `Your authorised Tata Motors showroom in ${cityLabel}.`
            }
          </motion.p>

          {/* Only show tabs if there are workshops too */}
          {hasWorkshops && (
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.22 }}
              className="flex justify-center"
            >
              <TabBar active={tab} onChange={setTab} />
            </motion.div>
          )}
        </div>

        {/* Card */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.28, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-gray-200 rounded-3xl p-5 sm:p-6 lg:p-8 shadow-xl shadow-gray-200/50"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Dots + arrows — only when multiple outlets in current tab */}
          {total > 1 && (
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                {activeOutlets.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to outlet ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2 bg-[#004b8d]" : "w-2 h-2 bg-gray-200 hover:bg-gray-300"}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-400 font-bold tabular-nums mr-2 uppercase tracking-widest">
                  {current + 1} of {total}
                </span>
                <button onClick={prev} aria-label="Previous outlet" className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center text-gray-500 hover:text-[#004b8d] transition-all duration-200 shadow-sm">
                  <ChevronLeft size={16} strokeWidth={2.5} />
                </button>
                <button onClick={next} aria-label="Next outlet" className="w-9 h-9 rounded-full bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300 flex items-center justify-center text-gray-500 hover:text-[#004b8d] transition-all duration-200 shadow-sm">
                  <ChevronRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={`${tab}-${current}`}
              initial={prefersReduced ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <OutletCard outlet={activeOutlets[current]} />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Bottom outlet switcher — desktop */}
        {outlets.length > 1 && (
          <div className="hidden lg:flex items-center justify-center gap-3 mt-10 flex-wrap">
            {outlets.map((o) => {
              const isActive = activeOutlets[current]?.id === o.id && tab === o.type;
              return (
                <button
                  key={o.id}
                  onClick={() => {
                    setTab(o.type);
                    setCurrent((o.type === "showroom" ? showroomOutlets : workshopOutlets).findIndex((x) => x.id === o.id));
                  }}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-[12px] font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-[#004b8d] border-[#004b8d] text-white shadow-md shadow-[#004b8d]/20"
                      : "bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {o.type === "showroom" ? <Building2 size={12} /> : <Wrench size={12} />}
                  {o.shortName}
                </button>
              );
            })}
          </div>
        )}

        {/* Bottom outlet switcher — mobile */}
        {activeOutlets.length > 1 && (
          <div className="flex lg:hidden items-center gap-2.5 mt-8 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
            {activeOutlets.map((o, i) => (
              <button
                key={o.id}
                onClick={() => setCurrent(i)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full border text-[11px] font-bold transition-all duration-200 shadow-sm ${
                  i === current ? "bg-[#004b8d] border-[#004b8d] text-white" : "bg-white border-gray-200 text-gray-500"
                }`}
              >
                {o.type === "showroom" ? <Building2 size={12} /> : <Wrench size={12} />}
                {o.shortName}
              </button>
            ))}
          </div>
        )}

        <div className="mt-10 sm:mt-12 flex items-center justify-center gap-2 text-[11px] sm:text-[12px] font-semibold text-gray-500">
          <Zap size={14} className="text-[#004b8d]" fill="currentColor" />
          EV test drives available at all showroom locations
        </div>
      </div>
    </section>
  );
}