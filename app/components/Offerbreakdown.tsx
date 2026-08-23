






// "use client";

// import Image from "next/image";
// import { useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import { Tag, RefreshCcw, Trash2, Heart, Info, ArrowRight } from "lucide-react";
// import type { TataOffer } from "@/lib/tata-offers";
// import { formatINR, BENEFIT_ROWS, MODEL_GALLERY, resolveGalleryKey } from "@/lib/tata-offers";

// const ICONS = {
//   consumerOffer: Tag,
//   exchangeBenefit: RefreshCcw,
//   scrappageBenefit: Trash2,
//   loyaltyBenefit: Heart,
// } as const;

// interface OfferBreakdownProps {
//   offer: TataOffer;
//   onGetOffer: () => void;
// }

// export default function OfferBreakdown({ offer, onGetOffer }: OfferBreakdownProps) {
//   const ref = useRef<HTMLDivElement>(null);
//   // ✅ amount: 0.1 instead of margin: "-60px" — fires only when element is actually visible
//   const inView = useInView(ref, { once: true, amount: 0.1 });

//   const activeBenefits = BENEFIT_ROWS.filter(
//     (r) => typeof offer[r.key] === "number" && (offer[r.key] as number) > 0
//   );

//   const galleryKey = resolveGalleryKey(offer.id);
//   const previewImage = MODEL_GALLERY[galleryKey]?.[0] ?? "/cars/tiago/tiago-1.webp";

//   return (
//     <section ref={ref} className="bg-[#F8FAFC] py-14 sm:py-20 px-5 lg:px-12 text-slate-900 border-t border-slate-200/60">
//       <div className="max-w-[800px] mx-auto">
//         <motion.div
//           // ✅ opacity only — no y shift that could cause layout reflow during scroll
//           initial={{ opacity: 0 }}
//           animate={inView ? { opacity: 1 } : {}}
//           transition={{ duration: 0.55 }}
//         >
//           {/* Header Metadata */}
//           <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
//             <span className="text-[11px] font-bold tracking-[0.22em] text-[#0055A5] uppercase">
//               EXCLUSIVE OFFER · {offer.modelYear}
//             </span>
//             {offer.variantLabel && (
//               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-300">
//                 {offer.variantLabel}
//               </span>
//             )}
//           </div>

//           <h2 className="text-slate-900 font-extrabold text-[clamp(1.6rem,5vw,2.4rem)] tracking-tight mb-6">
//             Offer Breakdown
//           </h2>

//           {/* Vehicle Snapshot Card */}
//           <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden mb-6 border border-slate-200 bg-white shadow-sm">
//             <Image
//               src={previewImage}
//               alt={offer.model}
//               fill
//               sizes="(max-width: 800px) 100vw, 800px"
//               // ✅ priority removed — was causing late reflow that snapped scroll position
//               className="object-cover object-center transition-transform duration-700 hover:scale-105"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
//             <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white">
//               <div>
//                 <p className="font-bold text-lg leading-tight">{offer.model}</p>
//                 <p className="text-white/80 text-xs font-medium">{offer.category} Edition</p>
//               </div>
//             </div>
//           </div>

//           {/* Benefit Items */}
//           <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-5 shadow-sm">
//             {activeBenefits.map(({ key, label }, i) => {
//               const Icon = ICONS[key];
//               return (
//                 <motion.div
//                   key={key}
//                   // ✅ opacity only — x: -12 was shifting layout width during scroll
//                   initial={{ opacity: 0 }}
//                   animate={inView ? { opacity: 1 } : {}}
//                   transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
//                   className="flex items-center justify-between px-5 py-4 border-b border-slate-100 last:border-0 hover:bg-slate-50/80 transition-colors"
//                 >
//                   <div className="flex items-center gap-3 text-slate-600">
//                     <Icon size={16} className="text-[#0055A5] flex-shrink-0" strokeWidth={2.2} />
//                     <span className="text-[14px] font-medium">{label}</span>
//                   </div>
//                   <span className="text-slate-900 font-bold text-[15px] tabular-nums">
//                     {formatINR(offer[key] as number)}
//                   </span>
//                 </motion.div>
//               );
//             })}

//             {/* Total */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={inView ? { opacity: 1 } : {}}
//               transition={{ duration: 0.5, delay: 0.1 + activeBenefits.length * 0.07 }}
//               className="flex items-center justify-between px-5 py-5 bg-[#0055A5]/[0.06] border-t border-[#0055A5]/20"
//             >
//               <span className="text-slate-900 font-bold text-[15px] tracking-tight">
//                 Maximum Total Benefits
//               </span>
//               <span className="text-[#0055A5] font-extrabold text-[1.6rem] tabular-nums">
//                 {formatINR(offer.totalBenefit)}
//               </span>
//             </motion.div>
//           </div>

//           {/* Eligibility Note */}
//           <div className="flex items-start gap-2.5 bg-slate-100 border border-slate-200 rounded-xl px-4 py-3.5 mb-6">
//             <Info size={15} className="text-[#0055A5] mt-0.5 flex-shrink-0" />
//             <p className="text-slate-600 text-[12px] leading-relaxed">
//               {offer.eligibility ? `${offer.eligibility}. ` : ""}
//               Benefits are subject to model, variant, customer, and campaign eligibility. Please confirm final on-road offers with your local Garud Tata dealership.
//             </p>
//           </div>

//           {/* CTA */}
//           <motion.button
//             whileHover={{ scale: 1.01 }}
//             whileTap={{ scale: 0.99 }}
//             onClick={onGetOffer}
//             className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#0055A5] hover:bg-[#004080] text-white font-bold text-[14px] tracking-[0.05em] shadow-[0_4px_16px_rgba(0,85,165,0.25)] transition-all duration-200 min-h-[52px]"
//           >
//             <span>CLAIM THIS OFFER</span>
//             <ArrowRight size={16} />
//           </motion.button>
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
  consumerOffer:    Tag,
  exchangeBenefit:  RefreshCcw,
  scrappageBenefit: Trash2,
  loyaltyBenefit:   Heart,
} as const;

interface OfferBreakdownProps {
  offer:      TataOffer;
  onGetOffer: () => void;
}

export default function OfferBreakdown({ offer, onGetOffer }: OfferBreakdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  // ✅ amount: 0.1 — only fires when this element is actually in the viewport.
  //    once: true — fires once and stays animated; no re-trigger on scroll back.
  const inView = useInView(ref, { once: true, amount: 0.1 });

  const activeBenefits = BENEFIT_ROWS.filter(
    (r) => typeof offer[r.key] === "number" && (offer[r.key] as number) > 0
  );

  const galleryKey   = resolveGalleryKey(offer.id);
  const previewImage = MODEL_GALLERY[galleryKey]?.[0] ?? "/cars/tiago/tiago-1.webp";

  return (
    // ✅ NO id attribute — prevents any href="#offer-breakdown" from causing a page jump.
    <section
      ref={ref}
      className="bg-[#F8FAFC] py-14 sm:py-20 px-5 lg:px-12 text-slate-900 border-t border-slate-200/60"
    >
      <div className="max-w-[800px] mx-auto">
        <motion.div
          // ✅ opacity only — no y/x shift that could cause layout reflow during scroll
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.55 }}
        >

          {/* Header metadata */}
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

          {/* Vehicle snapshot */}
          <div className="relative h-48 sm:h-56 w-full rounded-2xl overflow-hidden mb-6 border border-slate-200 bg-white shadow-sm">
            <Image
              src={previewImage}
              alt={offer.model}
              fill
              sizes="(max-width: 800px) 100vw, 800px"
              // ✅ priority intentionally NOT set — was causing a late reflow that
              //    snapped the scroll position when the image loaded eagerly.
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

          {/* Benefit rows */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden mb-5 shadow-sm">
            {activeBenefits.map(({ key, label }, i) => {
              const Icon = ICONS[key];
              return (
                <motion.div
                  key={key}
                  // ✅ opacity only — no x shift that widens the layout during scroll
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
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

            {/* Total row */}
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

          {/* Eligibility note */}
          <div className="flex items-start gap-2.5 bg-slate-100 border border-slate-200 rounded-xl px-4 py-3.5 mb-6">
            <Info size={15} className="text-[#0055A5] mt-0.5 flex-shrink-0" />
            <p className="text-slate-600 text-[12px] leading-relaxed">
              {offer.eligibility ? `${offer.eligibility}. ` : ""}
              Benefits are subject to model, variant, customer, and campaign eligibility.
              Please confirm final on-road offers with your local Garud Tata dealership.
            </p>
          </div>

          {/* CTA
              ✅ onGetOffer must ONLY update state in the parent (e.g. setEnquiryType).
                 It must NOT call scrollIntoView, window.scrollTo, or router.push with a hash.
                 The user scrolls to the form themselves. */}
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






