// "use client";

// import { useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import { Zap, Gauge, Wind, Battery, Plug, Users, Fuel } from "lucide-react";
// import type { TataOffer, VehicleDetail } from "@/lib/tata-offers";

// interface VehicleSpecsProps {
//   offer: TataOffer;
//   detail: VehicleDetail;
// }

// type SpecItem = { label: string; value: string; Icon: React.ElementType };

// export default function VehicleSpecs({ offer, detail }: VehicleSpecsProps) {
//   const ref = useRef<HTMLDivElement>(null);
//   // ✅ amount: 0.1 — fires only when element is actually in viewport
//   const inView = useInView(ref, { once: true, amount: 0.1 });
//   const isEV = offer.category === "EV";
//   const specs = detail.specifications;

//   const items: SpecItem[] = [];

//   if (isEV) {
//     if (specs.range)     items.push({ label: "Range",    value: specs.range,     Icon: Gauge });
//     if (specs.battery)   items.push({ label: "Battery",  value: specs.battery,   Icon: Battery });
//     if (detail.charging) items.push({ label: "Charging", value: detail.charging, Icon: Plug });
//     if (specs.power)     items.push({ label: "Power",    value: specs.power,     Icon: Zap });
//     if (specs.torque)    items.push({ label: "Torque",   value: specs.torque,    Icon: Wind });
//     if (specs.seating)   items.push({ label: "Seating",  value: specs.seating,   Icon: Users });
//   } else {
//     if (specs.engine)       items.push({ label: "Engine",       value: specs.engine,                            Icon: Gauge });
//     if (specs.power)        items.push({ label: "Power",        value: specs.power,                             Icon: Zap });
//     if (specs.torque)       items.push({ label: "Torque",       value: specs.torque,                            Icon: Wind });
//     if (specs.fuelType || detail.fuelType)
//                             items.push({ label: "Fuel Type",    value: specs.fuelType ?? detail.fuelType ?? "", Icon: Fuel });
//     if (specs.transmission) items.push({ label: "Transmission", value: specs.transmission,                      Icon: Gauge });
//     if (specs.mileage)      items.push({ label: "Mileage",      value: specs.mileage,                           Icon: Gauge });
//     if (specs.seating)      items.push({ label: "Seating",      value: specs.seating,                           Icon: Users });
//   }

//   return (
//     <section ref={ref} className="bg-[#F8FAFC] py-14 sm:py-20 px-5 lg:px-12 text-slate-900 border-t border-slate-200/70">
//       <div className="max-w-[1200px] mx-auto">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={inView ? { opacity: 1 } : {}}
//           transition={{ duration: 0.5 }}
//           className="mb-8"
//         >
//           <span className="text-[11px] font-bold tracking-[0.22em] text-[#0055A5] uppercase mb-3 block">
//             SPECIFICATIONS
//           </span>
//           <h2 className="text-slate-900 font-extrabold text-[clamp(1.6rem,5vw,2.4rem)] tracking-tight">
//             About the {offer.model}
//           </h2>
//           {detail.description && (
//             <p className="text-slate-600 text-[14px] leading-relaxed mt-3 max-w-2xl">
//               {detail.description}
//             </p>
//           )}
//         </motion.div>

//         {/* Price Pill */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={inView ? { opacity: 1 } : {}}
//           transition={{ duration: 0.45, delay: 0.1 }}
//           className="inline-flex items-baseline gap-2.5 bg-[#0055A5]/[0.06] border border-[#0055A5]/20 rounded-xl px-5 py-3 mb-8 shadow-sm"
//         >
//           <span className="text-[11px] font-bold tracking-[0.18em] text-slate-500 uppercase">
//             Starting at
//           </span>
//           <span className="text-[#0055A5] font-extrabold text-[1.3rem] tabular-nums">
//             {detail.priceFrom}
//           </span>
//         </motion.div>

//         {/* Spec Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
//           {items.map(({ label, value, Icon }, i) => (
//             <motion.div
//               key={label}
//               initial={{ opacity: 0 }}
//               animate={inView ? { opacity: 1 } : {}}
//               transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
//               className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-[#0055A5]/40 hover:shadow transition-all duration-200"
//             >
//               <div className="w-8 h-8 rounded-lg bg-[#0055A5]/10 flex items-center justify-center mb-3">
//                 <Icon size={16} className="text-[#0055A5]" strokeWidth={2.2} />
//               </div>
//               <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-1">
//                 {label}
//               </p>
//               <p className="text-slate-900 font-semibold text-[13.5px] leading-snug">
//                 {value}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }













"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Gauge, Wind, Battery, Plug, Users, Fuel } from "lucide-react";
import type { TataOffer, VehicleDetail } from "@/lib/tata-offers";

interface VehicleSpecsProps {
  offer:  TataOffer;
  detail: VehicleDetail;
}

type SpecItem = { label: string; value: string; Icon: React.ElementType };

export default function VehicleSpecs({ offer, detail }: VehicleSpecsProps) {
  const ref = useRef<HTMLDivElement>(null);

  // ✅ amount: 0.1 — fires only when this section is actually in the viewport.
  //    once: true — no re-trigger as user scrolls back up.
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const isEV   = offer.category === "EV";
  const specs  = detail.specifications;
  const items: SpecItem[] = [];

  if (isEV) {
    if (specs.range)     items.push({ label: "Range",    value: specs.range,     Icon: Gauge   });
    if (specs.battery)   items.push({ label: "Battery",  value: specs.battery,   Icon: Battery });
    if (detail.charging) items.push({ label: "Charging", value: detail.charging, Icon: Plug    });
    if (specs.power)     items.push({ label: "Power",    value: specs.power,     Icon: Zap     });
    if (specs.torque)    items.push({ label: "Torque",   value: specs.torque,    Icon: Wind    });
    if (specs.seating)   items.push({ label: "Seating",  value: specs.seating,   Icon: Users   });
  } else {
    if (specs.engine)
      items.push({ label: "Engine",       value: specs.engine,                            Icon: Gauge });
    if (specs.power)
      items.push({ label: "Power",        value: specs.power,                             Icon: Zap   });
    if (specs.torque)
      items.push({ label: "Torque",       value: specs.torque,                            Icon: Wind  });
    if (specs.fuelType || detail.fuelType)
      items.push({ label: "Fuel Type",    value: specs.fuelType ?? detail.fuelType ?? "", Icon: Fuel  });
    if (specs.transmission)
      items.push({ label: "Transmission", value: specs.transmission,                      Icon: Gauge });
    if (specs.mileage)
      items.push({ label: "Mileage",      value: specs.mileage,                           Icon: Gauge });
    if (specs.seating)
      items.push({ label: "Seating",      value: specs.seating,                           Icon: Users });
  }

  return (
    // ✅ NO id attribute — prevents any href="#specifications" from causing a page jump.
    <section
      ref={ref}
      className="bg-[#F8FAFC] py-14 sm:py-20 px-5 lg:px-12 text-slate-900 border-t border-slate-200/70"
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <motion.div
          // ✅ opacity only — no y shift
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-[11px] font-bold tracking-[0.22em] text-[#0055A5] uppercase mb-3 block">
            SPECIFICATIONS
          </span>
          <h2 className="text-slate-900 font-extrabold text-[clamp(1.6rem,5vw,2.4rem)] tracking-tight">
            About the {offer.model}
          </h2>
          {detail.description && (
            <p className="text-slate-600 text-[14px] leading-relaxed mt-3 max-w-2xl">
              {detail.description}
            </p>
          )}
        </motion.div>

        {/* Price pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="inline-flex items-baseline gap-2.5 bg-[#0055A5]/[0.06] border border-[#0055A5]/20 rounded-xl px-5 py-3 mb-8 shadow-sm"
        >
          <span className="text-[11px] font-bold tracking-[0.18em] text-slate-500 uppercase">
            Starting at
          </span>
          <span className="text-[#0055A5] font-extrabold text-[1.3rem] tabular-nums">
            {detail.priceFrom}
          </span>
        </motion.div>

        {/* Spec grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {items.map(({ label, value, Icon }, i) => (
            <motion.div
              key={label}
              // ✅ opacity only — no y/x shift
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-[#0055A5]/40 hover:shadow transition-all duration-200"
            >
              <div className="w-8 h-8 rounded-lg bg-[#0055A5]/10 flex items-center justify-center mb-3">
                <Icon size={16} className="text-[#0055A5]" strokeWidth={2.2} />
              </div>
              <p className="text-[10px] font-bold tracking-[0.15em] text-slate-400 uppercase mb-1">
                {label}
              </p>
              <p className="text-slate-900 font-semibold text-[13.5px] leading-snug">
                {value}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
