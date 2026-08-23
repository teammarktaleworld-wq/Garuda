// "use client";

// import { motion, useInView } from "framer-motion";
// import { useRef } from "react";
// import { CheckCircle2 } from "lucide-react";
// import type { TataOffer } from "@/lib/tata-offers";

// interface VehicleHighlightsProps {
//   offer: TataOffer;
//   highlights: string[];
// }

// export default function VehicleHighlights({ offer, highlights }: VehicleHighlightsProps) {
//   const ref = useRef<HTMLDivElement>(null);
//   // ✅ amount: 0.1 — fires only when element is actually in viewport
//   const inView = useInView(ref, { once: true, amount: 0.1 });

//   if (!highlights?.length) return null;

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
//             WHY CHOOSE
//           </span>
//           <h2 className="text-slate-900 font-extrabold text-[clamp(1.6rem,5vw,2.4rem)] tracking-tight">
//             Why the {offer.model}?
//           </h2>
//         </motion.div>

//         {/* Highlights Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
//           {highlights.map((h, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0 }}
//               animate={inView ? { opacity: 1 } : {}}
//               transition={{ duration: 0.4, delay: i * 0.06 }}
//               className="flex items-start gap-3.5 bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-[#0055A5]/40 hover:shadow transition-all duration-200"
//             >
//               <div className="w-6 h-6 rounded-full bg-[#0055A5]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
//                 <CheckCircle2 size={16} className="text-[#0055A5]" strokeWidth={2.4} />
//               </div>
//               <p className="text-slate-800 text-[13.5px] leading-snug font-medium">{h}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }










"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import type { TataOffer } from "@/lib/tata-offers";

interface VehicleHighlightsProps {
  offer:      TataOffer;
  highlights: string[];
}

export default function VehicleHighlights({ offer, highlights }: VehicleHighlightsProps) {
  const ref = useRef<HTMLDivElement>(null);

  // ✅ amount: 0.1 — fires only when this section is actually in the viewport.
  //    once: true — no re-trigger as user scrolls back up.
  const inView = useInView(ref, { once: true, amount: 0.1 });

  if (!highlights?.length) return null;

  return (
    // ✅ NO id attribute — prevents any href="#highlights" from causing a page jump.
    <section
      ref={ref}
      className="bg-[#F8FAFC] py-14 sm:py-20 px-5 lg:px-12 text-slate-900 border-t border-slate-200/70"
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <motion.div
          // ✅ opacity only — no y shift that could cause layout reflow during scroll
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="text-[11px] font-bold tracking-[0.22em] text-[#0055A5] uppercase mb-3 block">
            WHY CHOOSE
          </span>
          <h2 className="text-slate-900 font-extrabold text-[clamp(1.6rem,5vw,2.4rem)] tracking-tight">
            Why the {offer.model}?
          </h2>
        </motion.div>

        {/* Highlights grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              // ✅ opacity only — no x/y shift
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-start gap-3.5 bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:border-[#0055A5]/40 hover:shadow transition-all duration-200"
            >
              <div className="w-6 h-6 rounded-full bg-[#0055A5]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 size={16} className="text-[#0055A5]" strokeWidth={2.4} />
              </div>
              <p className="text-slate-800 text-[13.5px] leading-snug font-medium">{h}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}




