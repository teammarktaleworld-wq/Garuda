// "use client";

// import { motion } from "framer-motion";
// import { useInView } from "framer-motion";
// import { useRef } from "react";
// import { Tag, RefreshCcw, Trash2, Heart, Info } from "lucide-react";
// import type { TataOffer } from "@/lib/tata-offers";
// import { formatINR, BENEFIT_ROWS } from "@/lib/tata-offers";

// const ICONS = {
//   consumerOffer:    Tag,
//   exchangeBenefit:  RefreshCcw,
//   scrappageBenefit: Trash2,
//   loyaltyBenefit:   Heart,
// } as const;

// interface OfferBreakdownProps {
//   offer: TataOffer;
//   onGetOffer: () => void;
// }

// export default function OfferBreakdown({ offer, onGetOffer }: OfferBreakdownProps) {
//   const ref    = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });

//   const activeBenefits = BENEFIT_ROWS.filter(
//     r => typeof offer[r.key] === "number" && (offer[r.key] as number) > 0
//   );

//   return (
//     <section ref={ref} className="bg-[#0D1829] py-14 sm:py-20 px-5 lg:px-12">
//       <div className="max-w-[800px] mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.55 }}
//         >
//           <span className="text-[10px] font-bold tracking-[0.26em] text-[#7DB8F7] uppercase mb-3 block">
//             EXCLUSIVE OFFER · {offer.modelYear}
//           </span>
//           <h2 className="text-white font-extrabold text-[clamp(1.6rem,5vw,2.4rem)] tracking-tight mb-8">
//             Offer Breakdown
//           </h2>

//           <div className="bg-[#132035] border border-white/[0.08] rounded-2xl overflow-hidden mb-5">
//             {activeBenefits.map(({ key, label }, i) => {
//               const Icon = ICONS[key];
//               return (
//                 <motion.div
//                   key={key}
//                   initial={{ opacity: 0, x: -12 }}
//                   animate={inView ? { opacity: 1, x: 0 } : {}}
//                   transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
//                   className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] last:border-0"
//                 >
//                   <div className="flex items-center gap-3 text-white/60">
//                     <Icon size={15} className="text-[#0055A5] flex-shrink-0" strokeWidth={2} />
//                     <span className="text-[14px]">{label}</span>
//                   </div>
//                   <span className="text-white font-bold text-[15px] tabular-nums">{formatINR(offer[key] as number)}</span>
//                 </motion.div>
//               );
//             })}

//             {/* Total */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={inView ? { opacity: 1 } : {}}
//               transition={{ duration: 0.5, delay: 0.1 + activeBenefits.length * 0.07 }}
//               className="flex items-center justify-between px-5 py-5 bg-[#0055A5]/10 border-t border-[#0055A5]/20"
//             >
//               <span className="text-white font-extrabold text-[15px] tracking-tight">Maximum Benefits</span>
//               <span className="text-white font-extrabold text-[1.5rem] tabular-nums">{formatINR(offer.totalBenefit)}</span>
//             </motion.div>
//           </div>

//           {/* Eligibility note */}
//           <div className="flex items-start gap-2.5 bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3.5 mb-6">
//             <Info size={14} className="text-[#5BA3E8] mt-0.5 flex-shrink-0" />
//             <p className="text-white/38 text-[12px] leading-relaxed">
//               {offer.eligibility
//                 ? `${offer.eligibility}. `
//                 : ""}
//               Benefits are subject to model, variant, customer and campaign eligibility. Please confirm the applicable offer with Garud Tata.
//             </p>
//           </div>

//           <button
//             onClick={onGetOffer}
//             className="w-full py-4 rounded-xl bg-[#0055A5] hover:bg-[#1A70D4] text-white font-bold text-[13.5px] tracking-[0.07em] shadow-[0_6px_24px_rgba(0,85,165,0.38)] transition-colors duration-200 min-h-[52px]"
//           >
//             GET THIS OFFER
//           </button>
//         </motion.div>
//       </div>
//     </section>
//   );
// }




"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Tag, RefreshCcw, Trash2, Heart, Info, ArrowRight } from "lucide-react";
import type { TataOffer } from "@/lib/tata-offers";
import { formatINR, BENEFIT_ROWS, MODEL_GALLERY, resolveGalleryKey } from "@/lib/tata-offers";

const ICONS = {
  consumerOffer: Tag,
  exchangeBenefit: RefreshCcw,
  scrappageBenefit: Trash2,
  loyaltyBenefit: Heart,
} as const;

interface OfferBreakdownProps {
  offer: TataOffer;
  onGetOffer: () => void;
}

export default function OfferBreakdown({ offer, onGetOffer }: OfferBreakdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const activeBenefits = BENEFIT_ROWS.filter(
    (r) => typeof offer[r.key] === "number" && (offer[r.key] as number) > 0
  );

  const galleryKey = resolveGalleryKey(offer.id);
  const previewImage = MODEL_GALLERY[galleryKey]?.[0] ?? "/cars/tiago/tiago-1.webp";

  return (
    <section ref={ref} className="bg-[#F8FAFC] py-14 sm:py-20 px-5 lg:px-12 text-slate-900 border-t border-slate-200/60">
      <div className="max-w-[800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
        >
          {/* Header Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <span className="text-[11px] font-bold tracking-[0.22em] text-[#0055A5] uppercase">
              EXCLUSIVE OFFER · {offer.modelYear}
            </span>
            {offer.variantLabel && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-300">
                {offer.variantLabel}
              </span>
            )}
          </div>

          <h2 className="text-slate-900 font-extrabold text-[clamp(1.6rem,5vw,2.4rem)] tracking-tight mb-6">
            Offer Breakdown
          </h2>

          {/* Vehicle Snapshot Card */}
          <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden mb-6 border border-slate-200 bg-white shadow-sm">
            <Image
              src={previewImage}
              alt={offer.model}
              fill
              sizes="(max-width: 800px) 100vw, 800px"
              priority
              className="object-cover object-center transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
              <div>
                <p className="font-bold text-lg leading-tight">{offer.model}</p>
                <p className="text-white/80 text-xs font-medium">{offer.category} Edition</p>
              </div>
            </div>
          </div>

          {/* Benefit Items Container */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-5 shadow-sm">
            {activeBenefits.map(({ key, label }, i) => {
              const Icon = ICONS[key];
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                  className="flex items-center justify-between px-5 py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/80 transition-colors"
                >
                  <div className="flex items-center gap-3 text-slate-600">
                    <Icon size={16} className="text-[#0055A5] flex-shrink-0" strokeWidth={2.2} />
                    <span className="text-[14px] font-medium">{label}</span>
                  </div>
                  <span className="text-slate-900 font-bold text-[15px] tabular-nums">
                    {formatINR(offer[key] as number)}
                  </span>
                </motion.div>
              );
            })}

            {/* Total Benefit Highlight */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + activeBenefits.length * 0.07 }}
              className="flex items-center justify-between px-5 py-5 bg-[#0055A5]/[0.06] border-t border-[#0055A5]/20"
            >
              <span className="text-slate-900 font-bold text-[15px] tracking-tight">
                Maximum Total Benefits
              </span>
              <span className="text-[#0055A5] font-extrabold text-[1.6rem] tabular-nums">
                {formatINR(offer.totalBenefit)}
              </span>
            </motion.div>
          </div>

          {/* Eligibility Note */}
          <div className="flex items-start gap-2.5 bg-slate-100 border border-slate-200 rounded-xl px-4 py-3.5 mb-6">
            <Info size={15} className="text-[#0055A5] mt-0.5 flex-shrink-0" />
            <p className="text-slate-600 text-[12px] leading-relaxed">
              {offer.eligibility ? `${offer.eligibility}. ` : ""}
              Benefits are subject to model, variant, customer, and campaign eligibility. Please confirm final on-road offers with your local Garud Tata dealership.
            </p>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={onGetOffer}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#0055A5] hover:bg-[#004080] text-white font-bold text-[14px] tracking-[0.05em] shadow-[0_4px_16px_rgba(0,85,165,0.25)] transition-all duration-200 min-h-[52px]"
          >
            <span>CLAIM THIS OFFER</span>
            <ArrowRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}