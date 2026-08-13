"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Fuel, Settings2 } from "lucide-react";
import Image from "next/image";

const allVehicles = [
  {
    name: "Tata Sierra",
    cat: "SUV",
    fuel: "Petrol / Diesel",
    trans: "Manual / Auto",
    price: "Price on Request",
    img: "/images/vehicles/sierra.webp",
    isEV: false,
  },
  {
    name: "Tata Harrier",
    cat: "SUV",
    fuel: "Petrol / Diesel",
    trans: "Manual / Auto",
    price: "₹15.49 Lakh*",
    img: "/images/vehicles/harrier.webp",
    isEV: false,
  },
  {
    name: "Tata Safari",
    cat: "SUV",
    fuel: "Petrol / Diesel",
    trans: "Manual / Auto",
    price: "₹16.19 Lakh*",
    img: "/images/vehicles/tatasafari.webp",
    isEV: false,
  },
  {
    name: "Tata Curvv EV",
    cat: "EV",
    fuel: "Electric",
    trans: "Automatic",
    price: "Price on Request",
    img: "/images/vehicles/tatacurvve.webp",
    isEV: true,
  },
  {
    name: "Tata Nexon",
    cat: "SUV",
    fuel: "Petrol / Diesel",
    trans: "Manual / AMT",
    price: "₹8.10 Lakh*",
    img: "/images/vehicles/tatanexon.webp",
    isEV: false,
  },
  {
    name: "Tata Nexon EV",
    cat: "EV",
    fuel: "Electric",
    trans: "Automatic",
    price: "₹14.49 Lakh*",
    img: "/images/vehicles/tatanexon.webp",
    isEV: true,
  },
  {
    name: "Tata Punch",
    cat: "SUV",
    fuel: "Petrol / CNG",
    trans: "Manual / AMT",
    price: "₹6.13 Lakh*",
    img: "/images/vehicles/punchtata.webp",
    isEV: false,
  },
  {
    name: "Tata Altroz",
    cat: "Hatchback",
    fuel: "Petrol / Diesel / CNG",
    trans: "Manual / DCT",
    price: "₹6.60 Lakh*",
    img: "/images/vehicles/altrozaltroz.webp",
    isEV: false,
  },
  {
    name: "Tata Tiago",
    cat: "Hatchback",
    fuel: "Petrol / CNG",
    trans: "Manual / AMT",
    price: "₹5.60 Lakh*",
    img: "/images/vehicles/tatatiago.webp",
    isEV: false,
  },
];

const categories = ["All Cars", "SUV", "Hatchback", "EV"];

const testDriveBtnClass =
  "flex items-center justify-center gap-2 px-5 py-3 bg-[#0055A5] rounded-xl text-white text-xs font-semibold uppercase tracking-wider hover:bg-[#1E7FE8] transition-all";

export default function VehicleGrid() {
  const [activeTab, setActiveTab] = useState("All Cars");
  const ref = useRef(null);
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
      className="bg-[#080D16] py-20 lg:py-28 text-white relative overflow-hidden font-sans"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0055A5]/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div ref={ref} className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#1E7FE8] text-xs font-semibold uppercase tracking-[0.2em] mb-3 block"
          >
            Complete Range
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Choose Your Drive
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-white/50 max-w-xl mx-auto text-sm lg:text-base"
          >
            From city-ready hatchbacks to commanding SUVs, explore the complete
            Tata Motors portfolio at Garud Tata.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 flex-wrap justify-center mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeTab === cat
                  ? "bg-[#0055A5] text-white shadow-lg shadow-[#0055A5]/30"
                  : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vehicle Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((v) => (
              <motion.div
                key={v.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-[#0055A5]/50 transition-all duration-500 group flex flex-col justify-between"
              >
                <div>
                  {/* Vehicle Image */}
                  <div className="relative h-56 overflow-hidden bg-gradient-to-b from-transparent via-white/[0.02] to-black/40 flex items-center justify-center p-6">
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-[15px] bg-black/80 blur-[12px] rounded-[100%]" />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[40%] h-[10px] bg-[#0055A5]/30 blur-[15px] rounded-[100%]" />

                    <Image
                      src={v.img}
                      alt={v.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {v.isEV && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-emerald-400 text-[10px] font-bold tracking-widest flex items-center gap-1 backdrop-blur-md">
                        <Zap size={12} />
                        ELECTRIC
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6 pt-2">
                    <div className="flex items-center gap-2 mb-2 text-white/40 text-xs font-medium">
                      <Fuel size={13} className="text-[#0055A5]" />
                      <span>{v.fuel}</span>
                      <span>•</span>
                      <Settings2 size={13} className="text-[#0055A5]" />
                      <span>{v.trans}</span>
                    </div>

                    <h3 className="text-white font-bold text-2xl mb-1 tracking-tight">
                      {v.name}
                    </h3>

                    <div className="text-white/50 text-xs mb-1">
                      Starting from
                    </div>
                    <div className="text-[#1E7FE8] font-semibold text-lg mb-6">
                      {v.price}
                    </div>
                  </div>
                </div>

                {/* Buttons */}
                <div className="p-6 pt-0 flex gap-3">
                  <button className="flex-1 py-3 text-xs font-semibold uppercase tracking-wider border border-white/15 rounded-xl text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all">
                    Details
                  </button>
                  <a href="#testdrive" className={testDriveBtnClass}>
                    Test Drive
                    <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}