// "use client";

// import { useState, useRef } from "react";
// import { motion, useInView, AnimatePresence } from "framer-motion";
// import { ArrowRight, Zap, Fuel, Settings2 } from "lucide-react";
// import Image from "next/image";

// const allVehicles = [
//   {
//     name: "Tata Sierra",
//     cat: "SUV",
//     fuel: "Petrol / Diesel",
//     trans: "Manual / Auto",
//     price: "Price on Request",
//     img: "/images/vehicles/sierra.webp",
//     isEV: false,
//   },
//   {
//     name: "Tata Harrier",
//     cat: "SUV",
//     fuel: "Petrol / Diesel",
//     trans: "Manual / Auto",
//     price: "₹15.49 Lakh*",
//     img: "/images/vehicles/harrier.webp",
//     isEV: false,
//   },
//   {
//     name: "Tata Safari",
//     cat: "SUV",
//     fuel: "Petrol / Diesel",
//     trans: "Manual / Auto",
//     price: "₹16.19 Lakh*",
//     img: "/images/vehicles/tatasafari.webp",
//     isEV: false,
//   },
//   {
//     name: "Tata Curvv EV",
//     cat: "EV",
//     fuel: "Electric",
//     trans: "Automatic",
//     price: "Price on Request",
//     img: "/images/vehicles/tatacurvve.webp",
//     isEV: true,
//   },
//   {
//     name: "Tata Nexon",
//     cat: "SUV",
//     fuel: "Petrol / Diesel",
//     trans: "Manual / AMT",
//     price: "₹8.10 Lakh*",
//     img: "/images/vehicles/tatanexon.webp",
//     isEV: false,
//   },
//   {
//     name: "Tata Nexon EV",
//     cat: "EV",
//     fuel: "Electric",
//     trans: "Automatic",
//     price: "₹14.49 Lakh*",
//     img: "/images/vehicles/tatanexon.webp",
//     isEV: true,
//   },
//   {
//     name: "Tata Punch",
//     cat: "SUV",
//     fuel: "Petrol / CNG",
//     trans: "Manual / AMT",
//     price: "₹6.13 Lakh*",
//     img: "/images/vehicles/punchtata.webp",
//     isEV: false,
//   },
//   {
//     name: "Tata Altroz",
//     cat: "Hatchback",
//     fuel: "Petrol / Diesel / CNG",
//     trans: "Manual / DCT",
//     price: "₹6.60 Lakh*",
//     img: "/images/vehicles/altrozaltroz.webp",
//     isEV: false,
//   },
//   {
//     name: "Tata Tiago",
//     cat: "Hatchback",
//     fuel: "Petrol / CNG",
//     trans: "Manual / AMT",
//     price: "₹5.60 Lakh*",
//     img: "/images/vehicles/tatatiago.webp",
//     isEV: false,
//   },
// ];

// const categories = ["All Cars", "SUV", "Hatchback", "EV"];

// const testDriveBtnClass =
//   "flex items-center justify-center gap-2 px-5 py-3 bg-[#0055A5] rounded-xl text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1E7FE8] transition-all";

// export default function VehicleGrid() {
//   const [activeTab, setActiveTab] = useState("All Cars");
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-100px" });

//   const filtered =
//     activeTab === "All Cars"
//       ? allVehicles
//       : activeTab === "EV"
//       ? allVehicles.filter((v) => v.isEV)
//       : allVehicles.filter(
//           (v) => v.cat.toLowerCase() === activeTab.toLowerCase()
//         );

//   return (
//     <section
//       id="cars"
//       className="bg-[#080D16] py-20 lg:py-28 text-white relative overflow-hidden font-sans"
//     >
//       {/* Background Ambient Glow */}
//       <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0055A5]/10 blur-[140px] pointer-events-none rounded-full" />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

//         {/* Section Header */}
//         <div ref={ref} className="text-center mb-12">
//           <motion.span
//             initial={{ opacity: 0 }}
//             animate={inView ? { opacity: 1 } : {}}
//             className="text-[#1E7FE8] text-xs font-semibold uppercase tracking-[0.2em] mb-3 block"
//           >
//             Complete Range
//           </motion.span>
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.1 }}
//             className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
//           >
//             Choose Your Drive
//           </motion.h2>
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={inView ? { opacity: 1 } : {}}
//             transition={{ delay: 0.2 }}
//             className="text-white/50 max-w-xl mx-auto text-sm lg:text-base"
//           >
//             From city-ready hatchbacks to commanding SUVs, explore the complete
//             Tata Motors portfolio at Garud Tata.
//           </motion.p>
//         </div>

//         {/* Filter Tabs */}
//         <div className="flex gap-2 flex-wrap justify-center mb-12">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveTab(cat)}
//               className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
//                 activeTab === cat
//                   ? "bg-[#0055A5] text-white shadow-lg shadow-[#0055A5]/30"
//                   : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Vehicle Grid */}
//         <motion.div
//           layout
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
//         >
//           <AnimatePresence mode="popLayout">
//             {filtered.map((v) => (
//               <motion.div
//                 key={v.name}
//                 layout
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 transition={{ duration: 0.4 }}
//                 className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-[#0055A5]/50 transition-all duration-500 group flex flex-col justify-between"
//               >
//                 <div>
//                   {/* Vehicle Image */}
//                   <div className="relative h-56 overflow-hidden bg-gradient-to-b from-transparent via-white/[0.02] to-black/40 flex items-center justify-center p-6">
//                     <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-[15px] bg-black/80 blur-[12px] rounded-[100%]" />
//                     <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[40%] h-[10px] bg-[#0055A5]/30 blur-[15px] rounded-[100%]" />

//                     <Image
//                       src={v.img}
//                       alt={v.name}
//                       fill
//                       className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                     />

//                     {v.isEV && (
//                       <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-emerald-400 text-[10px] font-bold tracking-widest flex items-center gap-1 backdrop-blur-md">
//                         <Zap size={12} />
//                         ELECTRIC
//                       </div>
//                     )}
//                   </div>

//                   {/* Card Content */}
//                   <div className="p-6 pt-2">
//                     <div className="flex items-center gap-2 mb-2 text-white/40 text-xs font-medium">
//                       <Fuel size={13} className="text-[#0055A5]" />
//                       <span>{v.fuel}</span>
//                       <span>•</span>
//                       <Settings2 size={13} className="text-[#0055A5]" />
//                       <span>{v.trans}</span>
//                     </div>

//                     <h3 className="text-white font-bold text-2xl mb-1 tracking-tight">
//                       {v.name}
//                     </h3>

//                     <div className="text-white/50 text-xs mb-1">
//                       Starting from
//                     </div>
//                     <div className="text-[#1E7FE8] font-semibold text-lg mb-6">
//                       {v.price}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Buttons */}
//                 <div className="p-6 pt-0 flex gap-3">
//                   <button className="flex-1 py-3 text-xs font-semibold uppercase tracking-wider border border-white/15 rounded-xl text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all">
//                     Details
//                   </button>
//                   <a href="#testdrive" className={testDriveBtnClass}>
//                     Test Drive
//                     <ArrowRight size={14} />
//                   </a>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       </div>
//     </section>
//   );
// }














"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowRight, Zap, Fuel, Settings2, Car } from "lucide-react";
import Image from "next/image";

/* ════════════════════════════════════════════════════════════════════════
   PALETTE — identical to VehicleShowcase & CurrentTataOffers
   Base:    #0D1829
   Surface: #132035
   Raised:  #1A2D47
   Border:  white/7–12%
   Brand:   #0055A5
   Accent:  #5BA3E8 / #7DB8F7
════════════════════════════════════════════════════════════════════════ */

const allVehicles = [
  {
    name: "Tata Sierra",
    cat: "SUV",
    fuel: "Petrol / Diesel",
    trans: "Manual / Auto",
    price: "Price on Request",
    img: "/images/vehicles/sierra.webp",
    isEV: false,
    badge: "NEW",
  },
  {
    name: "Tata Harrier",
    cat: "SUV",
    fuel: "Petrol / Diesel",
    trans: "Manual / Auto",
    price: "₹15.49 Lakh*",
    img: "/images/vehicles/harrier.webp",
    isEV: false,
    badge: "FLAGSHIP",
  },
  {
    name: "Tata Safari",
    cat: "SUV",
    fuel: "Petrol / Diesel",
    trans: "Manual / Auto",
    price: "₹16.19 Lakh*",
    img: "/images/vehicles/tatasafari.webp",
    isEV: false,
    badge: null,
  },
  {
    name: "Tata Curvv EV",
    cat: "EV",
    fuel: "Electric",
    trans: "Automatic",
    price: "Price on Request",
    img: "/images/vehicles/tatacurvve.webp",
    isEV: true,
    badge: "NEW",
  },
  {
    name: "Tata Nexon",
    cat: "SUV",
    fuel: "Petrol / Diesel",
    trans: "Manual / AMT",
    price: "₹8.10 Lakh*",
    img: "/images/vehicles/tatanexon.webp",
    isEV: false,
    badge: "BESTSELLER",
  },
  {
    name: "Tata Nexon EV",
    cat: "EV",
    fuel: "Electric",
    trans: "Automatic",
    price: "₹14.49 Lakh*",
    img: "/images/vehicles/tatanexon.webp",
    isEV: true,
    badge: null,
  },
  {
    name: "Tata Punch",
    cat: "SUV",
    fuel: "Petrol / CNG",
    trans: "Manual / AMT",
    price: "₹6.13 Lakh*",
    img: "/images/vehicles/punchtata.webp",
    isEV: false,
    badge: null,
  },
  {
    name: "Tata Altroz",
    cat: "Hatchback",
    fuel: "Petrol / Diesel / CNG",
    trans: "Manual / DCT",
    price: "₹6.60 Lakh*",
    img: "/images/vehicles/altrozaltroz.webp",
    isEV: false,
    badge: "5 STAR NCAP",
  },
  {
    name: "Tata Tiago",
    cat: "Hatchback",
    fuel: "Petrol / CNG",
    trans: "Manual / AMT",
    price: "₹5.60 Lakh*",
    img: "/images/vehicles/tatatiago.webp",
    isEV: false,
    badge: null,
  },
];

const categories = ["All Cars", "SUV", "Hatchback", "EV"] as const;
type Category = (typeof categories)[number];

const categoryIcons: Partial<Record<Category, React.ReactNode>> = {
  EV: <Zap size={11} />,
  SUV: <Car size={11} />,
  Hatchback: <Fuel size={11} />,
};

/* ── Same cross-component prefill helper as VehicleShowcase ─────────── */
function dispatchPrefill(carName: string, type: "Get Offer" | "Test Drive") {
  window.dispatchEvent(
    new CustomEvent("garud:prefill", { detail: { car: carName, type } })
  );
  setTimeout(() => {
    document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 80);
}

export default function VehicleGrid() {
  const [activeTab, setActiveTab] = useState<Category>("All Cars");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const filtered =
    activeTab === "All Cars"
      ? allVehicles
      : activeTab === "EV"
      ? allVehicles.filter((v) => v.isEV)
      : allVehicles.filter(
          (v) => v.cat.toLowerCase() === activeTab.toLowerCase()
        );

  return (
    <section
      id="cars"
      className="relative bg-[#0D1829] py-24 lg:py-32 overflow-hidden font-sans"
    >
      {/* ── BACKGROUND — mirrors VehicleShowcase exactly ─────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        {/* Ambient glows */}
        <div className="hidden sm:block absolute top-[8%] left-[10%] w-[700px] h-[700px] rounded-full bg-[#0055A5]/7 blur-[160px]" />
        <div className="hidden sm:block absolute bottom-[5%] right-[5%] w-[500px] h-[500px] rounded-full bg-[#1A70D4]/5 blur-[130px]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[60vw] h-[35vh] bg-[#0055A5]/8 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">

        {/* ── HEADER ──────────────────────────────────────────────── */}
        <div ref={ref} className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="h-[1px] w-8 bg-[#0055A5]" />
            <span className="text-[10px] font-bold tracking-[0.28em] text-[#7DB8F7] uppercase">
              GARUD TATA · COMPLETE RANGE
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold text-white leading-[1.04] tracking-tight mb-4"
              >
                Choose Your Drive
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-white/45 text-base lg:text-lg max-w-md"
              >
                From city-ready hatchbacks to commanding SUVs, explore the
                complete Tata Motors portfolio at Garud Tata.
              </motion.p>
            </div>

            {/* ── Filter pills — same spring layoutId pattern ──────── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  aria-pressed={activeTab === cat}
                  className="relative flex-shrink-0 px-5 py-2.5 rounded-full text-[12.5px] font-semibold whitespace-nowrap transition-colors duration-200 min-h-[40px]"
                >
                  {activeTab === cat && (
                    <motion.span
                      layoutId="grid-filter-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-[#0055A5] shadow-[0_4px_18px_rgba(0,85,165,0.45)]"
                    />
                  )}
                  <span
                    className={`relative z-10 flex items-center gap-1.5 ${
                      activeTab === cat
                        ? "text-white"
                        : "text-white/45 hover:text-white/80"
                    }`}
                  >
                    {categoryIcons[cat as keyof typeof categoryIcons]}
                    {cat}
                  </span>
                  {activeTab !== cat && (
                    <span className="absolute inset-0 rounded-full border border-white/[0.09] bg-white/[0.03]" />
                  )}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* ── VEHICLE GRID ────────────────────────────────────────── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((v, i) => (
              <motion.div
                key={v.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.3), ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-[#132035] border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col hover:-translate-y-1 hover:border-[#0055A5]/30 transition-all duration-300"
              >
                {/* ── Car image ───────────────────────────────────── */}
                <div className="relative h-52 w-full flex items-center justify-center overflow-hidden">
                  {/* Ground shadow */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[65%] h-[18px] bg-black/70 blur-[14px] rounded-[100%]" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[38%] h-[10px] bg-[#0055A5]/20 blur-[20px] rounded-[100%]" />

                  <Image
                    src={v.img}
                    alt={v.name}
                    fill
                    className="object-contain p-5 group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* EV badge — top-left */}
                  {v.isEV && (
                    <div className="absolute top-4 left-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/12 border border-emerald-400/25 text-emerald-300 text-[9px] font-black tracking-[0.14em] uppercase backdrop-blur-sm">
                      <Zap size={9} strokeWidth={2.5} /> ELECTRIC
                    </div>
                  )}

                  {/* Model badge — top-right (mirrors VehicleShowcase badge style) */}
                  {v.badge && (
                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0055A5]/22 border border-[#0055A5]/40 text-[#7DB8F7] text-[9px] font-bold tracking-[0.18em] uppercase backdrop-blur-sm">
                        {v.badge === "NEW" && (
                          <span className="w-1 h-1 rounded-full bg-[#1E7FE8] animate-pulse" />
                        )}
                        {v.badge}
                      </span>
                    </div>
                  )}
                </div>

                {/* ── Card body ───────────────────────────────────── */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Fuel + transmission specs */}
                  <div className="flex items-center gap-2 text-white/35 text-[11px] font-medium mb-3">
                    <Fuel size={11} className="text-[#0055A5]/75 flex-shrink-0" strokeWidth={2} />
                    <span>{v.fuel}</span>
                    <span className="text-white/15">·</span>
                    <Settings2 size={11} className="text-[#0055A5]/75 flex-shrink-0" strokeWidth={2} />
                    <span>{v.trans}</span>
                  </div>

                  {/* Name */}
                  <h3 className="text-white font-extrabold text-[1.35rem] tracking-tight leading-tight mb-1 group-hover:translate-x-0.5 transition-transform duration-200">
                    {v.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-auto pt-4 border-t border-white/[0.06]">
                    <div className="text-white/28 text-[10px] font-bold tracking-[0.18em] uppercase mb-0.5">
                      Starting from
                    </div>
                    <div className="text-white font-bold text-[1.1rem] tracking-tight">
                      {v.price}
                    </div>
                  </div>
                </div>

                {/* ── Buttons — same style as VehicleShowcase mobile cards ── */}
                <div className="px-5 pb-5 flex gap-2">
                  <button
                    onClick={() => dispatchPrefill(v.name, "Get Offer")}
                    className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-lg min-h-[44px] bg-[#0055A5] hover:bg-[#1A70D4] active:bg-[#1A70D4] text-white text-[12px] font-bold tracking-[0.06em] shadow-[0_3px_14px_rgba(0,85,165,0.3)] transition-colors duration-150 group/btn"
                  >
                    EXPLORE
                    <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform duration-150" />
                  </button>
                  <button
                    onClick={() => dispatchPrefill(v.name, "Test Drive")}
                    className="px-4 py-3 rounded-lg min-h-[44px] border border-white/[0.10] hover:border-white/25 hover:bg-white/[0.05] text-white/45 hover:text-white text-[11px] font-semibold tracking-[0.06em] transition-all duration-150"
                  >
                    TEST DRIVE
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* ── BOTTOM TRANSITION — same fade as VehicleShowcase ────── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-[#0D1829] pointer-events-none" />
    </section>
  );
}