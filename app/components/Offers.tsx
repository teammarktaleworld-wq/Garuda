// "use client";

// import { useState, useCallback, type FormEvent } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { ArrowRight, Tag, RefreshCcw, Trash2, Heart, Zap, Fuel, Loader2, CheckCircle2 } from "lucide-react";

// // ─── CORRECTED OFFER DATA — MY25/MY24 (verified from official consumer offer sheets) ─────
// // Image 1: ICE models  |  Image 2: EV models

// type OfferRow = {
//   variant: string;
//   cash: number;
//   exchange: number;
//   scrappage: number;
//   loyalty: number;
//   maxOffer: number;
// };

// type ModelGroup = {
//   model: string;
//   type: "ICE" | "EV";
//   image: string;
//   variants: OfferRow[];
// };

// const OFFER_DATA: ModelGroup[] = [
//   // ══ ICE Models (Image 1) ══════════════════════════════════════════════════
//   {
//     model: "Tiago",
//     type: "ICE",
//     image: "/images/vehicles/tatatiago.webp",
//     variants: [
//       { variant: "Tiago Petrol", cash: 35000, exchange: 10000, scrappage: 15000, loyalty: 0, maxOffer: 50000 },
//       { variant: "Tiago CNG",    cash: 30000, exchange: 10000, scrappage: 15000, loyalty: 0, maxOffer: 45000 },
//     ],
//   },
//   {
//     model: "Tigor",
//     type: "ICE",
//     image: "/images/vehicles/tatatiago.webp",
//     variants: [
//       { variant: "Tigor", cash: 15000, exchange: 10000, scrappage: 15000, loyalty: 0, maxOffer: 30000 },
//     ],
//   },
//   {
//     model: "Altroz",
//     type: "ICE",
//     image: "/images/vehicles/altrozaltroz.webp",
//     variants: [
//       { variant: "Altroz Petrol",   cash: 35000,  exchange: 15000, scrappage: 20000, loyalty: 0,     maxOffer: 55000  },
//       { variant: "Altroz CNG",      cash: 35000,  exchange: 15000, scrappage: 20000, loyalty: 0,     maxOffer: 55000  },
//       { variant: "Altroz Diesel",   cash: 25000,  exchange: 15000, scrappage: 20000, loyalty: 0,     maxOffer: 45000  },
//       { variant: "Altroz Outgoing", cash: 110000, exchange: 40000, scrappage: 40000, loyalty: 25000, maxOffer: 175000 },
//     ],
//   },
//   {
//     model: "Punch",
//     type: "ICE",
//     image: "/images/vehicles/punchtata.webp",
//     variants: [
//       { variant: "Punch Petrol (Outgoing)", cash: 70000, exchange: 30000, scrappage: 30000, loyalty: 20000, maxOffer: 120000 },
//       { variant: "Punch CNG (Outgoing)",    cash: 70000, exchange: 30000, scrappage: 30000, loyalty: 20000, maxOffer: 120000 },
//     ],
//   },
//   {
//     model: "Nexon",
//     type: "ICE",
//     image: "/images/vehicles/tatanexon.webp",
//     variants: [
//       { variant: "Nexon Petrol", cash: 40000, exchange: 15000, scrappage: 20000, loyalty: 0, maxOffer: 60000 },
//       { variant: "Nexon CNG",    cash: 35000, exchange: 20000, scrappage: 25000, loyalty: 0, maxOffer: 60000 },
//       { variant: "Nexon Diesel", cash: 0,     exchange: 15000, scrappage: 20000, loyalty: 0, maxOffer: 20000 },
//     ],
//   },
//   {
//     model: "Curvv",
//     type: "ICE",
//     image: "/images/vehicles/tatacurvve.webp",
//     variants: [
//       { variant: "Curvv", cash: 30000, exchange: 40000, scrappage: 45000, loyalty: 50000, maxOffer: 125000 },
//     ],
//   },
//   {
//     model: "Harrier",
//     type: "ICE",
//     image: "/images/vehicles/harrier.webp",
//     variants: [
//       { variant: "Harrier D",              cash: 10000,  exchange: 25000, scrappage: 35000, loyalty: 0,     maxOffer: 45000  },
//       { variant: "Harrier D (without X)",  cash: 150000, exchange: 50000, scrappage: 50000, loyalty: 40000, maxOffer: 240000 },
//       { variant: "Harrier P",              cash: 40000,  exchange: 0,     scrappage: 0,     loyalty: 0,     maxOffer: 40000  },
//     ],
//   },
//   {
//     model: "Safari",
//     type: "ICE",
//     image: "/images/vehicles/tatasafari.webp",
//     variants: [
//       { variant: "Safari 2.0 D",             cash: 10000,  exchange: 25000, scrappage: 35000, loyalty: 0,     maxOffer: 45000  },
//       { variant: "Safari 2.0 D (without X)", cash: 150000, exchange: 50000, scrappage: 50000, loyalty: 40000, maxOffer: 240000 },
//       { variant: "Safari 2.0 P",             cash: 40000,  exchange: 0,     scrappage: 0,     loyalty: 0,     maxOffer: 40000  },
//     ],
//   },
//   // ══ EV Models (Image 2) ═══════════════════════════════════════════════════
//   {
//     model: "Tiago EV",
//     type: "EV",
//     image: "/images/vehicles/tatatiago.webp",
//     variants: [
//       { variant: "Tiago EV LR XT",      cash: 100000, exchange: 20000, scrappage: 25000, loyalty: 0, maxOffer: 125000 },
//       { variant: "Tiago EV LR XZ+ All", cash: 100000, exchange: 20000, scrappage: 25000, loyalty: 0, maxOffer: 125000 },
//       { variant: "Tiago EV MR All",     cash: 40000,  exchange: 20000, scrappage: 25000, loyalty: 0, maxOffer: 65000  }, // ← corrected: 65,000 per image 2
//     ],
//   },
//   {
//     model: "Punch EV",
//     type: "EV",
//     image: "/images/vehicles/punchtata.webp",
//     variants: [
//       { variant: "Punch EV All LR",                     cash: 110000, exchange: 30000, scrappage: 35000, loyalty: 0, maxOffer: 145000 },
//       { variant: "Punch EV All MR (Except Smart)",       cash: 90000,  exchange: 30000, scrappage: 35000, loyalty: 0, maxOffer: 125000 },
//       { variant: "Punch EV Smart & Smart+ Variant",      cash: 60000,  exchange: 30000, scrappage: 35000, loyalty: 0, maxOffer: 95000  }, // ← corrected: 95,000 per image 2
//     ],
//   },
//   {
//     model: "Nexon EV",
//     type: "EV",
//     image: "/images/vehicles/tatanexon.webp",
//     variants: [
//       { variant: "Nexon EV 3.0", cash: 15000, exchange: 25000, scrappage: 35000, loyalty: 0, maxOffer: 50000 },
//     ],
//   },
//   {
//     model: "Curvv EV",
//     type: "EV",
//     image: "/images/vehicles/tatacurvve.webp",
//     variants: [
//       { variant: "Curvv EV", cash: 300000, exchange: 30000, scrappage: 35000, loyalty: 0, maxOffer: 335000 },
//     ],
//   },
//   {
//     model: "Harrier EV",
//     type: "EV",
//     image: "/images/vehicles/harrier.webp",
//     variants: [
//       // ← corrected: loyalty = 100,000 per image 2
//       { variant: "Harrier EV", cash: 100000, exchange: 50000, scrappage: 75000, loyalty: 100000, maxOffer: 275000 },
//     ],
//   },
//   // Sierra EV intentionally omitted — no offer data in images
// ];

// // ─── HELPERS ─────────────────────────────────────────────────────────────────
// const fmt = (n: number) =>
//   n === 0 ? "—" : `₹${n.toLocaleString("en-IN")}`;

// const BENEFIT_ICONS = [
//   { key: "cash",      label: "Cash Discount",  Icon: Tag       },
//   { key: "exchange",  label: "Exchange Bonus",  Icon: RefreshCcw },
//   { key: "scrappage", label: "Scrappage Bonus", Icon: Trash2    },
//   { key: "loyalty",   label: "Loyalty Bonus",   Icon: Heart     },
// ] as const;

// const EASE = [0.16, 1, 0.3, 1] as const;

// // ─── DEFAULT CAR MODELS (for enquiry form) ────────────────────────────────────
// const DEFAULT_MODELS = OFFER_DATA.map(m => m.model);

// // ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
// export default function Offers() {
//   const [filter, setFilter]           = useState<"ALL" | "ICE" | "EV">("ALL");
//   const [selected, setSelected]       = useState<ModelGroup>(OFFER_DATA[0]);
//   const [activeVariant, setActiveVariant] = useState(0);

//   // Enquiry form state
//   const [formData, setFormData]       = useState({ name: "", mobile: "", car: selected.model });
//   const [submitted, setSubmitted]     = useState(false);
//   const [loading, setLoading]         = useState(false);
//   const [formError, setFormError]     = useState("");

//   const filtered = OFFER_DATA.filter(m => filter === "ALL" || m.type === filter);

//   const variant = selected.variants[activeVariant] ?? selected.variants[0];

//   const selectModel = useCallback((model: ModelGroup) => {
//     setSelected(model);
//     setActiveVariant(0);
//     setFormData(p => ({ ...p, car: model.model }));
//   }, []);

//   const scrollToForm = useCallback(() => {
//     document.getElementById("offer-form")?.scrollIntoView({ behavior: "smooth" });
//   }, []);

//   const handleSubmit = useCallback(async (e: FormEvent) => {
//     e.preventDefault();
//     setFormError("");

//     if (!formData.name.trim()) { setFormError("Please enter your name."); return; }
//     if (formData.mobile.replace(/\D/g, "").length < 10) { setFormError("Please enter a valid mobile number."); return; }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/enquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...formData, source: "offers-section" }),
//       });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error ?? "Submission failed.");
//       }
//       setSubmitted(true);
//     } catch (err: unknown) {
//       setFormError(err instanceof Error ? err.message : "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   }, [formData]);

//   return (
//     <section
//       id="offers"
//       className="relative bg-[#050A12] py-20 lg:py-28 overflow-hidden"
//     >
//       {/* Background glow */}
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#0055A5]/8 blur-[120px] rounded-full pointer-events-none" />

//       <div className="max-w-[1440px] mx-auto px-5 lg:px-12">

//         {/* ── Section header ──────────────────────────────────── */}
//         <div className="text-center mb-12">
//           <span className="text-[10px] font-bold tracking-[0.28em] text-[#5BA3E8] uppercase mb-3 block">
//             MY25 / MY24 Consumer Offer · All India · All Amounts in INR
//           </span>
//           <h2 className="text-white font-extrabold text-[clamp(2rem,4vw,3.2rem)] tracking-tight leading-tight mb-4">
//             Current Tata Offers
//           </h2>
//           <p className="text-white/50 text-[15px] max-w-xl mx-auto leading-relaxed">
//             Verified benefits available at Garud Tata. Exchange + scrappage + loyalty can be combined on eligible models.
//           </p>
//         </div>

//         {/* ── Filter tabs ─────────────────────────────────────── */}
//         <div className="flex justify-center gap-2 mb-10">
//           {(["ALL", "ICE", "EV"] as const).map(f => (
//             <button
//               key={f}
//               onClick={() => {
//                 setFilter(f);
//                 const first = OFFER_DATA.find(m => f === "ALL" || m.type === f);
//                 if (first) selectModel(first);
//               }}
//               className={`
//                 flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold
//                 transition-all duration-200
//                 ${filter === f
//                   ? "bg-[#0055A5] text-white shadow-[0_4px_16px_rgba(0,85,165,0.4)]"
//                   : "bg-white/6 border border-white/12 text-white/60 hover:text-white hover:bg-white/10"
//                 }
//               `}
//             >
//               {f === "EV"  && <Zap  size={13} />}
//               {f === "ICE" && <Fuel size={13} />}
//               {f}
//             </button>
//           ))}
//         </div>

//         {/* ── Main layout: model list + detail panel ──────────── */}
//         <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

//           {/* Model list */}
//           <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
//             {filtered.map(model => (
//               <button
//                 key={model.model}
//                 onClick={() => selectModel(model)}
//                 className={`
//                   flex-shrink-0 flex items-center gap-3
//                   px-4 py-3.5 rounded-xl text-left
//                   transition-all duration-200
//                   ${selected.model === model.model
//                     ? "bg-[#0055A5]/20 border border-[#0055A5]/50 text-white"
//                     : "bg-white/4 border border-white/8 text-white/60 hover:text-white hover:bg-white/8"
//                   }
//                 `}
//               >
//                 <img
//                   src={encodeURI(model.image)}
//                   alt={model.model}
//                   className="w-14 h-9 object-contain flex-shrink-0"
//                   onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
//                 />
//                 <div className="min-w-0">
//                   <p className="text-[13px] font-semibold leading-tight truncate">{model.model}</p>
//                   <p className="text-[10px] text-white/35 mt-0.5">
//                     {model.type === "EV" ? "Electric" : "Petrol / CNG / Diesel"}
//                   </p>
//                 </div>
//                 {model.type === "EV" && (
//                   <span className="ml-auto flex-shrink-0 text-[9px] font-bold text-[#5BA3E8] bg-[#0055A5]/20 px-2 py-0.5 rounded-full">
//                     EV
//                   </span>
//                 )}
//               </button>
//             ))}
//           </div>

//           {/* Detail panel */}
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={selected.model}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -6 }}
//               transition={{ duration: 0.3, ease: EASE }}
//               className="bg-white/4 border border-white/10 rounded-2xl overflow-hidden"
//             >
//               {/* Panel header */}
//               <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 lg:p-7 border-b border-white/8">
//                 <img
//                   src={encodeURI(selected.image)}
//                   alt={selected.model}
//                   className="w-[160px] h-[90px] object-contain"
//                   onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
//                 />
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-1">
//                     <h3 className="text-white font-bold text-[1.4rem] tracking-tight">{selected.model}</h3>
//                     {selected.type === "EV" && (
//                       <span className="text-[10px] font-bold text-[#5BA3E8] bg-[#0055A5]/20 border border-[#0055A5]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
//                         <Zap size={9} /> ELECTRIC
//                       </span>
//                     )}
//                   </div>
//                   <p className="text-white/45 text-[13px]">
//                     Max benefit up to{" "}
//                     <span className="text-[#5BA3E8] font-bold text-[15px]">
//                       {fmt(Math.max(...selected.variants.map(v => v.maxOffer)))}
//                     </span>
//                     {" "}on select variants
//                   </p>
//                 </div>
//                 <button
//                   onClick={scrollToForm}
//                   className="
//                     flex items-center gap-2 px-5 py-2.5 rounded-full
//                     bg-[#0055A5] hover:bg-[#1E7FE8]
//                     text-white text-[13px] font-bold tracking-[0.04em]
//                     shadow-[0_4px_16px_rgba(0,85,165,0.35)]
//                     hover:-translate-y-px transition-all duration-200 group flex-shrink-0
//                   "
//                 >
//                   GET OFFER
//                   <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
//                 </button>
//               </div>

//               {/* Variant tabs */}
//               {selected.variants.length > 1 && (
//                 <div className="flex gap-2 p-4 lg:px-7 border-b border-white/8 overflow-x-auto">
//                   {selected.variants.map((v, i) => (
//                     <button
//                       key={v.variant}
//                       onClick={() => setActiveVariant(i)}
//                       className={`
//                         flex-shrink-0 px-3.5 py-1.5 rounded-lg text-[12px] font-medium
//                         transition-all duration-150
//                         ${activeVariant === i
//                           ? "bg-[#0055A5]/25 border border-[#0055A5]/50 text-white"
//                           : "bg-white/5 border border-white/10 text-white/50 hover:text-white"
//                         }
//                       `}
//                     >
//                       {v.variant}
//                     </button>
//                   ))}
//                 </div>
//               )}

//               {/* Benefit breakdown */}
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={variant.variant}
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="p-5 lg:p-7"
//                 >
//                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
//                     {BENEFIT_ICONS.map(({ key, label, Icon }) => {
//                       const val = variant[key as keyof OfferRow] as number;
//                       return (
//                         <div
//                           key={key}
//                           className={`
//                             rounded-xl p-4 border transition-all
//                             ${val > 0
//                               ? "bg-[#0055A5]/10 border-[#0055A5]/25"
//                               : "bg-white/3 border-white/8 opacity-50"
//                             }
//                           `}
//                         >
//                           <Icon size={16} className={val > 0 ? "text-[#5BA3E8] mb-2" : "text-white/30 mb-2"} />
//                           <p className="text-[10px] text-white/45 uppercase tracking-wider mb-1">{label}</p>
//                           <p className={`font-bold text-[17px] ${val > 0 ? "text-white" : "text-white/30"}`}>
//                             {fmt(val)}
//                           </p>
//                         </div>
//                       );
//                     })}
//                   </div>

//                   {/* Max offer highlight */}
//                   <div className="flex items-center justify-between bg-[#0055A5]/12 border border-[#0055A5]/25 rounded-xl px-5 py-4">
//                     <div>
//                       <p className="text-[10px] text-white/40 uppercase tracking-widest mb-0.5">Maximum Benefit</p>
//                       <p className="text-white font-extrabold text-[1.6rem] tracking-tight">
//                         {fmt(variant.maxOffer)}
//                       </p>
//                       <p className="text-white/35 text-[11px] mt-0.5">*T&C apply. Subject to eligibility.</p>
//                     </div>
//                     <button
//                       onClick={scrollToForm}
//                       className="
//                         flex items-center gap-2 px-6 py-3 rounded-full
//                         bg-[#0055A5] hover:bg-[#1E7FE8]
//                         text-white font-bold text-[14px]
//                         shadow-[0_4px_20px_rgba(0,85,165,0.4)]
//                         hover:shadow-[0_6px_28px_rgba(30,127,232,0.5)]
//                         hover:-translate-y-px transition-all duration-200 group
//                       "
//                     >
//                       CLAIM OFFER
//                       <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
//                     </button>
//                   </div>
//                 </motion.div>
//               </AnimatePresence>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         {/* ── Full offer table ─────────────────────────────────── */}
//         <div className="mt-14 overflow-x-auto">
//           <p className="text-[11px] text-white/30 uppercase tracking-widest mb-4 font-semibold">
//             Complete Offer Table · MY25/MY24 · All India
//           </p>
//           <table className="w-full text-[13px] border-collapse">
//             <thead>
//               <tr className="border-b border-white/10">
//                 {["Model", "Variant", "Cash", "Exchange**", "Scrappage**", "Loyalty", "Max Offer"].map(h => (
//                   <th key={h} className="text-left text-[10px] font-semibold text-white/35 uppercase tracking-widest px-4 py-3 whitespace-nowrap">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {OFFER_DATA.flatMap(m =>
//                 m.variants.map((v, i) => (
//                   <tr
//                     key={`${m.model}-${v.variant}`}
//                     className={`
//                       border-b border-white/5
//                       hover:bg-white/3 transition-colors cursor-pointer
//                       ${i === 0 ? "border-t border-white/8" : ""}
//                     `}
//                     onClick={() => {
//                       selectModel(m);
//                       setActiveVariant(i);
//                       document.getElementById("offers")?.scrollIntoView({ behavior: "smooth" });
//                     }}
//                   >
//                     {i === 0 ? (
//                       <td rowSpan={m.variants.length} className="px-4 py-3 font-semibold text-white/80 align-top whitespace-nowrap">
//                         <div className="flex items-center gap-1.5">
//                           {m.type === "EV" && <Zap size={11} className="text-[#5BA3E8]" />}
//                           {m.model}
//                         </div>
//                       </td>
//                     ) : null}
//                     <td className="px-4 py-3 text-white/60">{v.variant}</td>
//                     <td className="px-4 py-3 text-white/80 font-medium">{fmt(v.cash)}</td>
//                     <td className="px-4 py-3 text-white/80 font-medium">{fmt(v.exchange)}</td>
//                     <td className="px-4 py-3 text-white/80 font-medium">{fmt(v.scrappage)}</td>
//                     <td className="px-4 py-3 text-white/80 font-medium">{fmt(v.loyalty)}</td>
//                     <td className="px-4 py-3 font-bold text-[#5BA3E8] whitespace-nowrap">{fmt(v.maxOffer)}</td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//           <p className="text-[11px] text-white/25 mt-4 leading-relaxed">
//             ** Exchange and Scrappage benefits are subject to vehicle eligibility. Loyalty bonus applicable on select variants only.
//             Please ensure tagging the correct campaign ID for discounts while retail. Contact Garud Tata for final offer confirmation.
//           </p>
//         </div>

//         {/* ── Inline Enquiry Form ───────────────────────────────── */}
//         <div
//           id="offer-form"
//           className="mt-16 max-w-[480px] mx-auto"
//         >
//           <div className="text-center mb-8">
//             <h3 className="text-white font-bold text-[1.6rem] tracking-tight mb-2">
//               Claim Your Offer
//             </h3>
//             <p className="text-white/45 text-[14px]">
//               Fill in your details and our team will reach out within 24 hours.
//             </p>
//           </div>

//           <div className="bg-white/4 border border-white/10 rounded-2xl p-6 lg:p-8">
//             {submitted ? (
//               <div className="py-8 text-center">
//                 <CheckCircle2 size={40} className="text-[#0055A5] mx-auto mb-4" />
//                 <p className="text-white font-bold text-[18px] mb-2">Enquiry Received!</p>
//                 <p className="text-white/50 text-[14px] leading-relaxed">
//                   Our team will call you back within 24 hours with your personalised offer details.
//                 </p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} noValidate className="space-y-4">
//                 <div>
//                   <label className="block text-[10px] text-white/35 mb-1.5 tracking-widest uppercase">Name</label>
//                   <input
//                     type="text"
//                     required
//                     value={formData.name}
//                     onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
//                     placeholder="Your full name"
//                     className="
//                       w-full bg-white/6 border border-white/12 rounded-xl
//                       px-4 py-3.5 text-white text-[14px]
//                       placeholder:text-white/25
//                       focus:outline-none focus:border-[#0055A5]/70 focus:bg-white/9
//                       transition-colors
//                     "
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-[10px] text-white/35 mb-1.5 tracking-widest uppercase">Mobile Number</label>
//                   <input
//                     type="tel"
//                     required
//                     value={formData.mobile}
//                     onChange={e => setFormData(p => ({ ...p, mobile: e.target.value }))}
//                     placeholder="+91 00000 00000"
//                     className="
//                       w-full bg-white/6 border border-white/12 rounded-xl
//                       px-4 py-3.5 text-white text-[14px]
//                       placeholder:text-white/25
//                       focus:outline-none focus:border-[#0055A5]/70 focus:bg-white/9
//                       transition-colors
//                     "
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-[10px] text-white/35 mb-1.5 tracking-widest uppercase">Car of Interest</label>
//                   <select
//                     value={formData.car}
//                     onChange={e => setFormData(p => ({ ...p, car: e.target.value }))}
//                     className="
//                       w-full bg-white/6 border border-white/12 rounded-xl
//                       px-4 py-3.5 text-white text-[14px]
//                       focus:outline-none focus:border-[#0055A5]/70 focus:bg-white/9
//                       transition-colors appearance-none
//                       [&>option]:bg-[#060C1A] [&>option]:text-white
//                     "
//                   >
//                     <option value="">Select a model</option>
//                     {DEFAULT_MODELS.map(m => (
//                       <option key={m} value={m}>{m}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {formError && (
//                   <p className="text-red-400 text-[13px] leading-snug">{formError}</p>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="
//                     w-full flex items-center justify-center gap-2
//                     py-4 rounded-xl mt-2
//                     bg-[#0055A5] hover:bg-[#1E7FE8]
//                     disabled:opacity-60 disabled:cursor-not-allowed
//                     text-white font-bold text-[14px] tracking-[0.06em]
//                     shadow-[0_4px_20px_rgba(0,85,165,0.4)]
//                     hover:shadow-[0_8px_28px_rgba(30,127,232,0.5)]
//                     transition-all duration-200 group
//                   "
//                 >
//                   {loading ? (
//                     <Loader2 size={18} className="animate-spin" />
//                   ) : (
//                     <>
//                       GET MY OFFER
//                       <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//                     </>
//                   )}
//                 </button>

//                 <p className="text-[11px] text-white/20 text-center leading-relaxed pt-1">
//                   *T&C apply. Subject to eligibility. Our team will contact you within 24 hrs.
//                 </p>
//               </form>
//             )}
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }
















// "use client";

// import {
//   useState,
//   useRef,
//   useEffect,
//   useMemo,
//   useCallback,
//   type FormEvent,
// } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useInView,
//   useMotionValue,
//   useSpring,
//   useReducedMotion,
//   useTransform,
// } from "framer-motion";
// import {
//   ArrowRight,
//   Tag,
//   RefreshCcw,
//   Trash2,
//   Heart,
//   Zap,
//   Fuel,
//   Loader2,
//   CheckCircle2,
//   Info,
//   Scale,
//   X,
//   Car,
// } from "lucide-react";

// /* ════════════════════════════════════════════════════════════════════════
//    ANALYTICS — reusable, single source of truth
// ════════════════════════════════════════════════════════════════════════ */
// declare global {
//   interface Window {
//     fbq?: (...args: unknown[]) => void;
//   }
// }
// function track(event: string, params?: Record<string, string | number>) {
//   if (typeof window !== "undefined" && typeof window.fbq === "function") {
//     window.fbq("track", event, params);
//   }
// }
// const trackViewOffer     = (id: string) => track("ViewContent",  { content_name: id, source: "OfferCardInView" });
// const trackOfferCardClick = (id: string) => track("OfferCardClick", { content_name: id });
// const trackGetOfferClick = (id: string, model: string) => track("Lead", { content_name: model, offer_id: id, source: "GetOfferClick" });
// const trackTestDriveClick = (model: string) => track("Lead", { content_name: model, source: "TestDriveClick" });
// const trackCompareClick  = (ids: string) => track("Compare", { content_ids: ids });

// /* ════════════════════════════════════════════════════════════════════════
//    DATA CONTRACT — the offer sheet is the single source of truth.
//    No amount below is derived/calculated; every figure is copied verbatim
//    from the official MY25/MY24 consumer offer sheets supplied by the dealer.
// ════════════════════════════════════════════════════════════════════════ */
// type Category = "SUV" | "Hatchback" | "Sedan" | "EV";
// type ModelYear = "MY24" | "MY25";

// export type TataOffer = {
//   id: string;
//   model: string;
//   variantLabel?: string;
//   category: Category;
//   modelYear: ModelYear;
//   image: string;

//   consumerOffer?: number;
//   exchangeBenefit?: number;
//   scrappageBenefit?: number;
//   loyaltyBenefit?: number;

//   /** Maximum combined benefit as stated by the official offer sheet — never recalculated client-side. */
//   totalBenefit: number;

//   featured?: boolean;
//   eligibility?: string;
//   active: boolean;
// };

// const LAST_UPDATED = "20 August 2026";

// const OFFERS: TataOffer[] = [
//   // ── Hatchback / Sedan (ICE) ──────────────────────────────────────────
//   { id: "tiago-petrol", model: "Tata Tiago", variantLabel: "Petrol", category: "Hatchback", modelYear: "MY25",
//     image: "/images/vehicles/tatatiago.webp", consumerOffer: 35000, exchangeBenefit: 10000, scrappageBenefit: 15000,
//     totalBenefit: 50000, active: true },
//   { id: "tiago-cng", model: "Tata Tiago", variantLabel: "CNG", category: "Hatchback", modelYear: "MY25",
//     image: "/images/vehicles/tatatiago.webp", consumerOffer: 30000, exchangeBenefit: 10000, scrappageBenefit: 15000,
//     totalBenefit: 45000, active: true },
//   { id: "tigor", model: "Tata Tigor", category: "Sedan", modelYear: "MY25",
//     image: "/images/vehicles/tatatiago.webp", consumerOffer: 15000, exchangeBenefit: 10000, scrappageBenefit: 15000,
//     totalBenefit: 30000, active: true },
//   { id: "altroz-petrol", model: "Tata Altroz", variantLabel: "Petrol", category: "Hatchback", modelYear: "MY25",
//     image: "/images/vehicles/altrozaltroz.webp", consumerOffer: 35000, exchangeBenefit: 15000, scrappageBenefit: 20000,
//     totalBenefit: 55000, active: true },
//   { id: "altroz-cng", model: "Tata Altroz", variantLabel: "CNG", category: "Hatchback", modelYear: "MY25",
//     image: "/images/vehicles/altrozaltroz.webp", consumerOffer: 35000, exchangeBenefit: 15000, scrappageBenefit: 20000,
//     totalBenefit: 55000, active: true },
//   { id: "altroz-diesel", model: "Tata Altroz", variantLabel: "Diesel", category: "Hatchback", modelYear: "MY25",
//     image: "/images/vehicles/altrozaltroz.webp", consumerOffer: 25000, exchangeBenefit: 15000, scrappageBenefit: 20000,
//     totalBenefit: 45000, active: true },
//   { id: "altroz-outgoing", model: "Tata Altroz", variantLabel: "Outgoing Stock", category: "Hatchback", modelYear: "MY24",
//     image: "/images/vehicles/altrozaltroz.webp", consumerOffer: 110000, exchangeBenefit: 40000, scrappageBenefit: 40000,
//     loyaltyBenefit: 25000, totalBenefit: 175000, eligibility: "Limited outgoing stock — selected variants", active: true },

//   // ── SUV (ICE) ─────────────────────────────────────────────────────────
//   { id: "punch-petrol-outgoing", model: "Tata Punch", variantLabel: "Petrol · Outgoing", category: "SUV", modelYear: "MY24",
//     image: "/images/vehicles/punchtata.webp", consumerOffer: 70000, exchangeBenefit: 30000, scrappageBenefit: 30000,
//     loyaltyBenefit: 20000, totalBenefit: 120000, eligibility: "Limited outgoing stock", active: true },
//   { id: "punch-cng-outgoing", model: "Tata Punch", variantLabel: "CNG · Outgoing", category: "SUV", modelYear: "MY24",
//     image: "/images/vehicles/punchtata.webp", consumerOffer: 70000, exchangeBenefit: 30000, scrappageBenefit: 30000,
//     loyaltyBenefit: 20000, totalBenefit: 120000, eligibility: "Limited outgoing stock", active: true },
//   { id: "nexon-petrol", model: "Tata Nexon", variantLabel: "Petrol", category: "SUV", modelYear: "MY25",
//     image: "/images/vehicles/tatanexon.webp", consumerOffer: 40000, exchangeBenefit: 15000, scrappageBenefit: 20000,
//     totalBenefit: 60000, active: true },
//   { id: "nexon-cng", model: "Tata Nexon", variantLabel: "CNG", category: "SUV", modelYear: "MY25",
//     image: "/images/vehicles/tatanexon.webp", consumerOffer: 35000, exchangeBenefit: 20000, scrappageBenefit: 25000,
//     totalBenefit: 60000, active: true },
//   { id: "nexon-diesel", model: "Tata Nexon", variantLabel: "Diesel", category: "SUV", modelYear: "MY25",
//     image: "/images/vehicles/tatanexon.webp", exchangeBenefit: 15000, scrappageBenefit: 20000,
//     totalBenefit: 20000, active: true },
//   { id: "curvv", model: "Tata Curvv", category: "SUV", modelYear: "MY25",
//     image: "/images/vehicles/tatacurvve.webp", consumerOffer: 30000, exchangeBenefit: 40000, scrappageBenefit: 45000,
//     loyaltyBenefit: 50000, totalBenefit: 125000, active: true },
//   { id: "harrier-d", model: "Tata Harrier", variantLabel: "Diesel", category: "SUV", modelYear: "MY25",
//     image: "/images/vehicles/harrier.webp", consumerOffer: 10000, exchangeBenefit: 25000, scrappageBenefit: 35000,
//     totalBenefit: 45000, active: true },
//   { id: "harrier-d-wox", model: "Tata Harrier", variantLabel: "Diesel · without X", category: "SUV", modelYear: "MY24",
//     image: "/images/vehicles/harrier.webp", consumerOffer: 150000, exchangeBenefit: 50000, scrappageBenefit: 50000,
//     loyaltyBenefit: 40000, totalBenefit: 240000, eligibility: "Selected variants — excludes X trim", active: true },
//   { id: "harrier-p", model: "Tata Harrier", variantLabel: "Petrol", category: "SUV", modelYear: "MY25",
//     image: "/images/vehicles/harrier.webp", consumerOffer: 40000, totalBenefit: 40000, active: true },
//   { id: "safari-d", model: "Tata Safari", variantLabel: "2.0 Diesel", category: "SUV", modelYear: "MY25",
//     image: "/images/vehicles/tatasafari.webp", consumerOffer: 10000, exchangeBenefit: 25000, scrappageBenefit: 35000,
//     totalBenefit: 45000, active: true },
//   { id: "safari-d-wox", model: "Tata Safari", variantLabel: "2.0 Diesel · without X", category: "SUV", modelYear: "MY24",
//     image: "/images/vehicles/tatasafari.webp", consumerOffer: 150000, exchangeBenefit: 50000, scrappageBenefit: 50000,
//     loyaltyBenefit: 40000, totalBenefit: 240000, eligibility: "Selected variants — excludes X trim", active: true },
//   { id: "safari-p", model: "Tata Safari", variantLabel: "2.0 Petrol", category: "SUV", modelYear: "MY25",
//     image: "/images/vehicles/tatasafari.webp", consumerOffer: 40000, totalBenefit: 40000, active: true },

//   // ── EV ────────────────────────────────────────────────────────────────
//   { id: "tiago-ev-lr-xt", model: "Tata Tiago EV", variantLabel: "LR XT", category: "EV", modelYear: "MY25",
//     image: "/images/vehicles/tatatiago.webp", consumerOffer: 100000, exchangeBenefit: 20000, scrappageBenefit: 25000,
//     totalBenefit: 125000, active: true },
//   { id: "tiago-ev-lr-xz", model: "Tata Tiago EV", variantLabel: "LR XZ+ & above", category: "EV", modelYear: "MY25",
//     image: "/images/vehicles/tatatiago.webp", consumerOffer: 100000, exchangeBenefit: 20000, scrappageBenefit: 25000,
//     totalBenefit: 125000, active: true },
//   { id: "tiago-ev-mr", model: "Tata Tiago EV", variantLabel: "MR — all variants", category: "EV", modelYear: "MY25",
//     image: "/images/vehicles/tatatiago.webp", consumerOffer: 40000, exchangeBenefit: 20000, scrappageBenefit: 25000,
//     totalBenefit: 65000, active: true },
//   { id: "punch-ev-lr", model: "Tata Punch EV", variantLabel: "LR — all variants", category: "EV", modelYear: "MY25",
//     image: "/images/vehicles/punchtata.webp", consumerOffer: 110000, exchangeBenefit: 30000, scrappageBenefit: 35000,
//     totalBenefit: 145000, active: true },
//   { id: "punch-ev-mr", model: "Tata Punch EV", variantLabel: "MR (excl. Smart)", category: "EV", modelYear: "MY25",
//     image: "/images/vehicles/punchtata.webp", consumerOffer: 90000, exchangeBenefit: 30000, scrappageBenefit: 35000,
//     totalBenefit: 125000, active: true },
//   { id: "punch-ev-smart", model: "Tata Punch EV", variantLabel: "Smart & Smart+", category: "EV", modelYear: "MY25",
//     image: "/images/vehicles/punchtata.webp", consumerOffer: 60000, exchangeBenefit: 30000, scrappageBenefit: 35000,
//     totalBenefit: 95000, active: true },
//   { id: "nexon-ev", model: "Tata Nexon EV", variantLabel: "3.0", category: "EV", modelYear: "MY25",
//     image: "/images/vehicles/tatanexon.webp", consumerOffer: 15000, exchangeBenefit: 25000, scrappageBenefit: 35000,
//     totalBenefit: 50000, active: true },
//   { id: "curvv-ev", model: "Tata Curvv EV", category: "EV", modelYear: "MY25",
//     image: "/images/vehicles/tatacurvve.webp", consumerOffer: 300000, exchangeBenefit: 30000, scrappageBenefit: 35000,
//     totalBenefit: 335000, featured: true, active: true },
//   { id: "harrier-ev", model: "Tata Harrier EV", category: "EV", modelYear: "MY25",
//     image: "/images/vehicles/harrier.webp", consumerOffer: 100000, exchangeBenefit: 50000, scrappageBenefit: 75000,
//     loyaltyBenefit: 100000, totalBenefit: 275000, active: true },
// ];

// /* ════════════════════════════════════════════════════════════════════════
//    HELPERS
// ════════════════════════════════════════════════════════════════════════ */
// const formatINR = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

// const BENEFIT_ROWS: {
//   key: keyof Pick<TataOffer, "consumerOffer" | "exchangeBenefit" | "scrappageBenefit" | "loyaltyBenefit">;
//   label: string;
//   Icon: typeof Tag;
// }[] = [
//   { key: "consumerOffer",   label: "Consumer Offer",   Icon: Tag },
//   { key: "exchangeBenefit", label: "Exchange Benefit", Icon: RefreshCcw },
//   { key: "scrappageBenefit",label: "Scrappage Benefit",Icon: Trash2 },
//   { key: "loyaltyBenefit",  label: "Loyalty Benefit",  Icon: Heart },
// ];

// const FILTERS = ["ALL", "SUV", "Hatchback", "EV", "MY25", "MY24"] as const;
// type FilterKey = (typeof FILTERS)[number];

// function matchesFilter(offer: TataOffer, filter: FilterKey) {
//   if (filter === "ALL") return true;
//   if (filter === "MY25" || filter === "MY24") return offer.modelYear === filter;
//   return offer.category === filter;
// }

// /* ════════════════════════════════════════════════════════════════════════
//    ANIMATED NUMBER — the section's signature moment
// ════════════════════════════════════════════════════════════════════════ */
// function AnimatedAmount({ value, active, className }: { value: number; active: boolean; className?: string }) {
//   const reduceMotion = useReducedMotion();
//   const mv = useMotionValue(0);
//   const spring = useSpring(mv, { stiffness: 90, damping: 22, mass: 0.9 });
//   const [display, setDisplay] = useState(reduceMotion ? value : 0);

//   useEffect(() => {
//     if (reduceMotion) { setDisplay(value); return; }
//     mv.set(0);
//     if (active) mv.set(value);
//   }, [active, value, reduceMotion, mv]);

//   useEffect(() => {
//     if (reduceMotion) return;
//     const unsub = spring.on("change", v => setDisplay(Math.round(v)));
//     return () => unsub();
//   }, [spring, reduceMotion]);

//   return <span className={className}>{formatINR(display)}</span>;
// }

// /* ════════════════════════════════════════════════════════════════════════
//    COMBINABILITY TOOLTIP
// ════════════════════════════════════════════════════════════════════════ */
// function CombinabilityNote({ compact = false }: { compact?: boolean }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="relative inline-flex">
//       <button
//         type="button"
//         onClick={() => setOpen(o => !o)}
//         onBlur={() => setOpen(false)}
//         aria-expanded={open}
//         aria-label="Benefit combinability details"
//         className={`
//           flex items-center gap-1.5 rounded-full
//           border border-[#0055A5]/30 bg-[#0055A5]/10
//           text-[#5BA3E8] hover:bg-[#0055A5]/18
//           transition-colors duration-150
//           ${compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-[11px]"}
//         `}
//       >
//         <Info size={compact ? 11 : 12} />
//         {compact ? "Combinable" : "Exchange + Scrappage + Loyalty combinable"}
//       </button>
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             role="tooltip"
//             initial={{ opacity: 0, y: 4, scale: 0.98 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 4, scale: 0.98 }}
//             transition={{ duration: 0.15 }}
//             className="
//               absolute z-30 top-full left-0 mt-2 w-64
//               bg-[#0B121F] border border-white/12 rounded-xl p-3.5
//               text-[11px] leading-relaxed text-white/65
//               shadow-[0_12px_32px_rgba(0,0,0,0.5)]
//             "
//           >
//             Benefits are subject to model, variant, customer and campaign eligibility.
//             Please confirm the applicable offer with Garud Tata.
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════
//    OFFER BADGE
// ════════════════════════════════════════════════════════════════════════ */
// function OfferBadge({ offer }: { offer: TataOffer }) {
//   return (
//     <div className="flex items-center gap-1.5 flex-wrap">
//       <span className={`
//         px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.1em]
//         ${offer.modelYear === "MY25"
//           ? "bg-[#0055A5]/25 border border-[#0055A5]/50 text-[#5BA3E8]"
//           : "bg-white/8 border border-white/18 text-white/70"
//         }
//       `}>
//         {offer.modelYear}
//       </span>
//       {offer.category === "EV" && (
//         <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-[0.1em] bg-emerald-500/15 border border-emerald-400/30 text-emerald-300">
//           <Zap size={10} /> ELECTRIC
//         </span>
//       )}
//       {offer.eligibility && (
//         <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[0.06em] bg-amber-500/12 border border-amber-400/25 text-amber-300">
//           LIMITED
//         </span>
//       )}
//     </div>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════
//    BENEFIT BREAKDOWN LIST — validated, zero/undefined rows hidden
// ════════════════════════════════════════════════════════════════════════ */
// function BenefitBreakdown({ offer, dense = false }: { offer: TataOffer; dense?: boolean }) {
//   const rows = BENEFIT_ROWS.filter(r => {
//     const v = offer[r.key];
//     return typeof v === "number" && v > 0;
//   });
//   if (rows.length === 0) {
//     return <p className="text-white/35 text-[12px] italic">Available on enquiry</p>;
//   }
//   return (
//     <div className={dense ? "space-y-2" : "space-y-2.5"}>
//       {rows.map(({ key, label, Icon }) => (
//         <div key={key} className="flex items-center justify-between">
//           <span className="flex items-center gap-2 text-white/50 text-[12.5px]">
//             <Icon size={13} className="text-[#5BA3E8]/80 flex-shrink-0" />
//             {label}
//           </span>
//           <span className="text-white/85 text-[13px] font-semibold whitespace-nowrap">
//             {formatINR(offer[key] as number)}
//           </span>
//         </div>
//       ))}
//     </div>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════
//    VEHICLE IMAGE — studio presentation
// ════════════════════════════════════════════════════════════════════════ */
// function VehicleStage({ offer, size = "md" }: { offer: TataOffer; size?: "md" | "lg" }) {
//   const h = size === "lg" ? "h-[220px] lg:h-[260px]" : "h-[150px]";
//   return (
//     <div className={`relative w-full ${h} flex items-center justify-center overflow-hidden`}>
//       {/* studio gradient */}
//       <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-black/40 pointer-events-none" />
//       {/* ambient blue glow */}
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//         <div className={`
//           rounded-full bg-[#0055A5]/25 blur-[60px]
//           ${size === "lg" ? "w-[65%] h-[65%]" : "w-[70%] h-[70%]"}
//         `} />
//       </div>
//       <motion.img
//         src={encodeURI(offer.image)}
//         alt={`${offer.model}${offer.variantLabel ? " " + offer.variantLabel : ""}`}
//         loading="lazy"
//         decoding="async"
//         className="relative z-10 max-h-full max-w-[92%] object-contain select-none"
//         onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
//         whileHover={{ scale: 1.04, y: -3 }}
//         transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
//       />
//       {/* ground shadow */}
//       <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[46%] h-[10px] bg-black/50 blur-[10px] rounded-full pointer-events-none" />
//     </div>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════
//    STANDARD OFFER CARD
// ════════════════════════════════════════════════════════════════════════ */
// function OfferCard({
//   offer,
//   index,
//   onGetOffer,
//   onTestDrive,
//   compareMode,
//   compareSelected,
//   onToggleCompare,
// }: {
//   offer: TataOffer;
//   index: number;
//   onGetOffer: (o: TataOffer) => void;
//   onTestDrive: (o: TataOffer) => void;
//   compareMode: boolean;
//   compareSelected: boolean;
//   onToggleCompare: (id: string) => void;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });
//   const reduceMotion = useReducedMotion();

//   useEffect(() => { if (inView) trackViewOffer(offer.id); }, [inView, offer.id]);

//   return (
//     <motion.div
//       ref={ref}
//       initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.98 }}
//       animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
//       transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.08, 0.4) }}
//       whileHover={reduceMotion ? undefined : { y: -8 }}
//       className="
//         group relative flex flex-col
//         bg-[#080F1A] border border-white/10
//         hover:border-[#0055A5]/60
//         rounded-2xl overflow-hidden
//         transition-colors duration-300
//       "
//     >
//       {compareMode && (
//         <button
//           type="button"
//           onClick={() => onToggleCompare(offer.id)}
//           aria-pressed={compareSelected}
//           aria-label={`${compareSelected ? "Remove" : "Add"} ${offer.model} to comparison`}
//           className={`
//             absolute top-3 right-3 z-20 w-7 h-7 rounded-lg
//             flex items-center justify-center transition-colors
//             ${compareSelected
//               ? "bg-[#0055A5] text-white"
//               : "bg-black/40 border border-white/25 text-white/60 hover:text-white"
//             }
//           `}
//         >
//           {compareSelected ? <CheckCircle2 size={14} /> : <Scale size={13} />}
//         </button>
//       )}

//       <div className="px-5 pt-5 flex items-start justify-between gap-3">
//         <OfferBadge offer={offer} />
//       </div>

//       <VehicleStage offer={offer} />

//       <div className="px-5 pb-5 flex flex-col flex-1">
//         <h3 className="text-white font-bold text-[1.1rem] tracking-tight leading-tight">
//           {offer.model}
//         </h3>
//         <p className="text-white/40 text-[12px] mt-0.5 mb-4">
//           {offer.variantLabel ?? offer.category}
//         </p>

//         <div className="h-px bg-white/8 mb-4" />

//         <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
//           Total Benefits
//         </p>
//         <AnimatedAmount
//           value={offer.totalBenefit}
//           active={inView}
//           className="block text-white font-extrabold text-[1.9rem] tracking-tight mb-1"
//         />
//         <p className="text-white/30 text-[11px] mb-4">Up to, on eligible variants*</p>

//         <BenefitBreakdown offer={offer} />

//         <div className="mt-5 flex flex-col gap-2">
//           <button
//             onClick={() => { trackOfferCardClick(offer.id); onGetOffer(offer); }}
//             className="
//               group/btn w-full flex items-center justify-center gap-2
//               px-5 py-3 rounded-xl
//               bg-[#0055A5] hover:bg-[#1E7FE8]
//               text-white font-bold text-[13px] tracking-[0.04em]
//               shadow-[0_4px_18px_rgba(0,85,165,0.35)]
//               transition-all duration-200
//             "
//           >
//             GET THIS OFFER
//             <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
//           </button>
//           <button
//             onClick={() => onTestDrive(offer)}
//             className="
//               w-full text-center px-5 py-2 rounded-xl
//               text-white/45 hover:text-white
//               text-[11px] font-semibold tracking-[0.06em]
//               transition-colors duration-150
//             "
//           >
//             BOOK TEST DRIVE
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════
//    FEATURED OFFER CARD — ~1.5× visual weight
// ════════════════════════════════════════════════════════════════════════ */
// function FeaturedOfferCard({
//   offer,
//   onGetOffer,
//   onTestDrive,
// }: {
//   offer: TataOffer;
//   onGetOffer: (o: TataOffer) => void;
//   onTestDrive: (o: TataOffer) => void;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });
//   const reduceMotion = useReducedMotion();

//   useEffect(() => { if (inView) trackViewOffer(offer.id); }, [inView, offer.id]);

//   return (
//     <motion.div
//       ref={ref}
//       initial={reduceMotion ? false : { opacity: 0, y: 30, scale: 0.98 }}
//       animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
//       transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//       className="
//         relative overflow-hidden rounded-3xl mb-6
//         bg-gradient-to-br from-[#0A1830] via-[#080F1A] to-[#080F1A]
//         border border-[#0055A5]/35
//       "
//     >
//       <div className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-[#0055A5]/20 blur-[110px] rounded-full pointer-events-none" />

//       <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-10 p-6 lg:p-10 items-center">
//         <div className="order-2 lg:order-1">
//           <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0055A5]/25 border border-[#0055A5]/50 text-[#5BA3E8] text-[10px] font-bold tracking-[0.22em] uppercase mb-4">
//             <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8] animate-pulse" />
//             Featured Offer
//           </span>

//           <div className="mb-1"><OfferBadge offer={offer} /></div>

//           <h3 className="text-white font-extrabold text-[2rem] lg:text-[2.4rem] tracking-tight leading-[1.05] mt-3 mb-1">
//             {offer.model}
//           </h3>
//           <p className="text-white/45 text-[13px] mb-6">
//             {offer.variantLabel ?? offer.category} · {offer.modelYear} Consumer Offer
//           </p>

//           <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">
//             Maximum Eligible Benefits
//           </p>
//           <AnimatedAmount
//             value={offer.totalBenefit}
//             active={inView}
//             className="block text-white font-extrabold text-[3rem] lg:text-[3.6rem] tracking-tight leading-none mb-5"
//           />

//           <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-6 max-w-sm">
//             <BenefitBreakdown offer={offer} />
//           </div>

//           <div className="mb-6"><CombinabilityNote /></div>

//           <div className="flex flex-col sm:flex-row gap-3">
//             <button
//               onClick={() => { trackOfferCardClick(offer.id); onGetOffer(offer); }}
//               className="
//                 group/btn flex items-center justify-center gap-2.5
//                 px-7 py-3.5 rounded-full
//                 bg-[#0055A5] hover:bg-[#1E7FE8]
//                 text-white font-bold text-[13px] tracking-[0.06em]
//                 shadow-[0_6px_24px_rgba(0,85,165,0.45)]
//                 hover:-translate-y-0.5 transition-all duration-200
//               "
//             >
//               GET {offer.model.replace("Tata ", "").toUpperCase()} OFFER
//               <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
//             </button>
//             <button
//               onClick={() => onTestDrive(offer)}
//               className="
//                 px-7 py-3.5 rounded-full
//                 bg-white/6 border border-white/20 hover:border-white/40 hover:bg-white/10
//                 text-white font-medium text-[13px] tracking-[0.04em]
//                 transition-all duration-200
//               "
//             >
//               BOOK TEST DRIVE
//             </button>
//           </div>
//         </div>

//         <div className="order-1 lg:order-2">
//           <VehicleStage offer={offer} size="lg" />
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════
//    FILTER BAR
// ════════════════════════════════════════════════════════════════════════ */
// function FilterBar({ active, onChange }: { active: FilterKey; onChange: (f: FilterKey) => void }) {
//   return (
//     <div className="flex gap-2 overflow-x-auto pb-1 mb-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//       {FILTERS.map(f => (
//         <button
//           key={f}
//           onClick={() => onChange(f)}
//           aria-pressed={active === f}
//           className="relative flex-shrink-0 px-5 py-2.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors duration-200"
//         >
//           {active === f && (
//             <motion.span
//               layoutId="filter-pill"
//               transition={{ type: "spring", stiffness: 380, damping: 32 }}
//               className="absolute inset-0 rounded-full bg-[#0055A5] shadow-[0_4px_16px_rgba(0,85,165,0.4)]"
//             />
//           )}
//           <span className={`relative z-10 flex items-center gap-1.5 ${active === f ? "text-white" : "text-white/55 hover:text-white"}`}>
//             {f === "EV" && <Zap size={12} />}
//             {f === "SUV" && <Car size={12} />}
//             {f === "Hatchback" && <Fuel size={12} />}
//             {f}
//           </span>
//           {active !== f && (
//             <span className="absolute inset-0 rounded-full bg-white/5 border border-white/10" />
//           )}
//         </button>
//       ))}
//     </div>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════
//    MOBILE CAROUSEL
// ════════════════════════════════════════════════════════════════════════ */
// function MobileCarousel({
//   offers,
//   onGetOffer,
//   onTestDrive,
// }: {
//   offers: TataOffer[];
//   onGetOffer: (o: TataOffer) => void;
//   onTestDrive: (o: TataOffer) => void;
// }) {
//   const scrollerRef = useRef<HTMLDivElement>(null);
//   const [active, setActive] = useState(0);

//   const onScroll = useCallback(() => {
//     const el = scrollerRef.current;
//     if (!el) return;
//     const idx = Math.round(el.scrollLeft / el.clientWidth);
//     setActive(Math.min(idx, offers.length - 1));
//   }, [offers.length]);

//   return (
//     <div className="lg:hidden">
//       <div
//         ref={scrollerRef}
//         onScroll={onScroll}
//         className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-2 -mx-5 px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
//       >
//         {offers.map((offer, i) => (
//           <div key={offer.id} className="snap-center flex-shrink-0 w-[86vw]">
//             <OfferCard
//               offer={offer}
//               index={i}
//               onGetOffer={onGetOffer}
//               onTestDrive={onTestDrive}
//               compareMode={false}
//               compareSelected={false}
//               onToggleCompare={() => {}}
//             />
//           </div>
//         ))}
//       </div>
//       {offers.length > 0 && (
//         <p className="text-center text-white/35 text-[11px] font-semibold tracking-widest mt-4">
//           {String(active + 1).padStart(2, "0")} / {String(offers.length).padStart(2, "0")}
//         </p>
//       )}
//     </div>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════
//    COMPARISON TABLE
// ════════════════════════════════════════════════════════════════════════ */
// function CompareTable({ offers, onClear }: { offers: TataOffer[]; onClear: () => void }) {
//   if (offers.length === 0) return null;
//   const rows: { label: string; key: keyof TataOffer }[] = [
//     { label: "Consumer Offer",   key: "consumerOffer" },
//     { label: "Exchange Benefit", key: "exchangeBenefit" },
//     { label: "Scrappage Benefit",key: "scrappageBenefit" },
//     { label: "Loyalty Benefit",  key: "loyaltyBenefit" },
//     { label: "Total Benefit",    key: "totalBenefit" },
//   ];
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 16 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: 16 }}
//       className="mt-10 bg-[#080F1A] border border-white/10 rounded-2xl p-5 lg:p-7 overflow-x-auto"
//     >
//       <div className="flex items-center justify-between mb-5">
//         <h4 className="text-white font-bold text-[15px] tracking-tight">Compare Offers</h4>
//         <button onClick={onClear} className="flex items-center gap-1 text-white/40 hover:text-white text-[12px]">
//           <X size={13} /> Clear
//         </button>
//       </div>
//       <table className="w-full text-[13px] border-collapse min-w-[420px]">
//         <thead>
//           <tr className="border-b border-white/10">
//             <th className="text-left text-[10px] text-white/35 uppercase tracking-widest px-3 py-2">Benefit</th>
//             {offers.map(o => (
//               <th key={o.id} className="text-left text-[12px] text-white font-semibold px-3 py-2 whitespace-nowrap">
//                 {o.model}{o.variantLabel ? ` — ${o.variantLabel}` : ""}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map(r => (
//             <tr key={r.label} className="border-b border-white/5">
//               <td className="px-3 py-2.5 text-white/45">{r.label}</td>
//               {offers.map(o => {
//                 const v = o[r.key] as number | undefined;
//                 return (
//                   <td key={o.id} className={`px-3 py-2.5 font-medium whitespace-nowrap ${r.key === "totalBenefit" ? "text-[#5BA3E8] font-bold" : "text-white/80"}`}>
//                     {typeof v === "number" && v > 0 ? formatINR(v) : "—"}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </motion.div>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════
//    BACKGROUND — very slow, near-imperceptible
// ════════════════════════════════════════════════════════════════════════ */
// function SectionBackground() {
//   const reduceMotion = useReducedMotion();
//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       <div
//         className="absolute inset-0 opacity-[0.04]"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
//           backgroundSize: "64px 64px",
//         }}
//       />
//       <motion.div
//         className="absolute top-[10%] left-[15%] w-[600px] h-[600px] rounded-full bg-[#0055A5]/10 blur-[140px]"
//         animate={reduceMotion ? undefined : { x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
//         transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute bottom-[5%] right-[10%] w-[500px] h-[500px] rounded-full bg-[#1E7FE8]/8 blur-[130px]"
//         animate={reduceMotion ? undefined : { x: [0, -30, 20, 0], y: [0, 20, -30, 0] }}
//         transition={{ duration: 48, repeat: Infinity, ease: "easeInOut" }}
//       />
//     </div>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════
//    INLINE OFFER LEAD FORM
// ════════════════════════════════════════════════════════════════════════ */
// function OfferLeadForm({ selectedOffer }: { selectedOffer: TataOffer | null }) {
//   const mobileRef = useRef<HTMLInputElement>(null);
//   const [formData, setFormData] = useState({ name: "", mobile: "" });
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (selectedOffer) {
//       const t = setTimeout(() => mobileRef.current?.focus(), 450);
//       return () => clearTimeout(t);
//     }
//   }, [selectedOffer]);

//   const handleSubmit = useCallback(async (e: FormEvent) => {
//     e.preventDefault();
//     setError("");
//     if (!formData.name.trim()) { setError("Please enter your name."); return; }
//     if (formData.mobile.replace(/\D/g, "").length < 10) { setError("Please enter a valid mobile number."); return; }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/enquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           car: selectedOffer?.model ?? "",
//           offer: selectedOffer ? `${selectedOffer.modelYear} Consumer Offer` : "",
//           source: "current-offers-section",
//         }),
//       });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error ?? "Submission failed.");
//       }
//       setSubmitted(true);
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   }, [formData, selectedOffer]);

//   return (
//     <div id="offer-form" className="mt-20 max-w-[480px] mx-auto scroll-mt-24">
//       <div className="text-center mb-8">
//         <h3 className="text-white font-bold text-[1.6rem] tracking-tight mb-2">Claim Your Offer</h3>
//         <p className="text-white/45 text-[14px]">
//           Fill in your details and our team will reach out within 24 hours.
//         </p>
//       </div>

//       <div className="bg-[#080F1A] border border-white/10 rounded-2xl p-6 lg:p-8">
//         {submitted ? (
//           <div className="py-8 text-center">
//             <CheckCircle2 size={40} className="text-[#0055A5] mx-auto mb-4" />
//             <p className="text-white font-bold text-[18px] mb-2">Enquiry Received!</p>
//             <p className="text-white/50 text-[14px] leading-relaxed">
//               Our team will call you back within 24 hours with your personalised offer details.
//             </p>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} noValidate className="space-y-4">
//             {selectedOffer && (
//               <div className="flex items-center gap-3 bg-[#0055A5]/10 border border-[#0055A5]/25 rounded-xl px-4 py-3">
//                 <CheckCircle2 size={16} className="text-[#5BA3E8] flex-shrink-0" />
//                 <div className="min-w-0">
//                   <p className="text-white text-[13px] font-semibold truncate">
//                     {selectedOffer.model}{selectedOffer.variantLabel ? ` — ${selectedOffer.variantLabel}` : ""}
//                   </p>
//                   <p className="text-white/45 text-[11px]">
//                     {selectedOffer.modelYear} Consumer Offer · Up to {formatINR(selectedOffer.totalBenefit)}
//                   </p>
//                 </div>
//               </div>
//             )}

//             <div>
//               <label className="block text-[10px] text-white/35 mb-1.5 tracking-widest uppercase">Name</label>
//               <input
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
//                 placeholder="Your full name"
//                 className="w-full bg-white/6 border border-white/12 rounded-xl px-4 py-3.5 text-white text-[14px] placeholder:text-white/25 focus:outline-none focus:border-[#0055A5]/70 focus:bg-white/9 transition-colors"
//               />
//             </div>

//             <div>
//               <label className="block text-[10px] text-white/35 mb-1.5 tracking-widest uppercase">Mobile Number</label>
//               <input
//                 ref={mobileRef}
//                 type="tel"
//                 required
//                 value={formData.mobile}
//                 onChange={e => setFormData(p => ({ ...p, mobile: e.target.value }))}
//                 placeholder="+91 00000 00000"
//                 className="w-full bg-white/6 border border-white/12 rounded-xl px-4 py-3.5 text-white text-[14px] placeholder:text-white/25 focus:outline-none focus:border-[#0055A5]/70 focus:bg-white/9 transition-colors"
//               />
//             </div>

//             {error && <p className="text-red-400 text-[13px] leading-snug">{error}</p>}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full flex items-center justify-center gap-2 py-4 rounded-xl mt-2 bg-[#0055A5] hover:bg-[#1E7FE8] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-[14px] tracking-[0.06em] shadow-[0_4px_20px_rgba(0,85,165,0.4)] transition-all duration-200 group"
//             >
//               {loading ? <Loader2 size={18} className="animate-spin" /> : (
//                 <>GET MY OFFER<ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
//               )}
//             </button>

//             <p className="text-[11px] text-white/20 text-center leading-relaxed pt-1">
//               *T&C apply. Subject to eligibility. Our team will contact you within 24 hrs.
//             </p>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ════════════════════════════════════════════════════════════════════════
//    MAIN COMPONENT
// ════════════════════════════════════════════════════════════════════════ */
// export default function CurrentTataOffers() {
//   const [filter, setFilter] = useState<FilterKey>("ALL");
//   const [selectedOffer, setSelectedOffer] = useState<TataOffer | null>(null);
//   const [compareMode, setCompareMode] = useState(false);
//   const [compareIds, setCompareIds] = useState<string[]>([]);

//   const active = useMemo(() => OFFERS.filter(o => o.active), []);
//   const filtered = useMemo(() => active.filter(o => matchesFilter(o, filter)), [active, filter]);
//   const featured = useMemo(
//     () => filtered.find(o => o.featured) ?? (filter === "ALL" ? active.find(o => o.featured) : undefined),
//     [filtered, active, filter]
//   );
//   const standard = useMemo(() => filtered.filter(o => o.id !== featured?.id), [filtered, featured]);

//   const scrollToForm = useCallback(() => {
//     document.getElementById("offer-form")?.scrollIntoView({ behavior: "smooth" });
//   }, []);

//   const handleGetOffer = useCallback((offer: TataOffer) => {
//     trackGetOfferClick(offer.id, offer.model);
//     setSelectedOffer(offer);
//     setTimeout(scrollToForm, 50);
//   }, [scrollToForm]);

//   const handleTestDrive = useCallback((offer: TataOffer) => {
//     trackTestDriveClick(offer.model);
//     setSelectedOffer(offer);
//     setTimeout(scrollToForm, 50);
//   }, [scrollToForm]);

//   const toggleCompare = useCallback((id: string) => {
//     setCompareIds(prev => {
//       if (prev.includes(id)) return prev.filter(x => x !== id);
//       if (prev.length >= 3) return prev;
//       return [...prev, id];
//     });
//   }, []);

//   const compareOffers = useMemo(
//     () => active.filter(o => compareIds.includes(o.id)),
//     [active, compareIds]
//   );

//   return (
//     <section id="offers" className="relative bg-[#050A12] py-20 lg:py-28 overflow-hidden">
//       <SectionBackground />

//       <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-12">

//         {/* ── Hero header ─────────────────────────────────── */}
//         <div className="text-center mb-4">
//           <span className="text-[10px] font-bold tracking-[0.28em] text-[#5BA3E8] uppercase mb-3 block">
//             GARUD TATA · CURRENT OFFERS
//           </span>
//           <h2 className="text-white font-extrabold text-[clamp(2.2rem,4.5vw,3.6rem)] tracking-tight leading-[1.03] mb-4">
//             Drive More.<br className="hidden sm:block" /> Save More.
//           </h2>
//           <p className="text-white/50 text-[15px] max-w-xl mx-auto leading-relaxed mb-3">
//             Explore verified benefits available across selected Tata models at Garud Tata.
//           </p>
//           <p className="text-white/30 text-[11px] tracking-wide">
//             Offers last updated: {LAST_UPDATED}
//           </p>
//         </div>

//         {/* ── Trust strip ─────────────────────────────────── */}
//         <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 mt-6">
//           {["Verified Offers", "Multiple Tata Models", "Exchange Benefits", "Test Drive Available"].map(t => (
//             <span key={t} className="flex items-center gap-1.5 text-[12px] text-white/45 font-medium">
//               <CheckCircle2 size={13} className="text-[#0055A5] flex-shrink-0" />
//               {t}
//             </span>
//           ))}
//         </div>

//         {/* ── Offer context note ──────────────────────────── */}
//         <p className="text-center text-white/35 text-[12px] max-w-xl mx-auto mb-14 leading-relaxed">
//           MY25 / MY24 Consumer Offer · All India · All Amounts in INR. Exchange, Scrappage and
//           Loyalty benefits can be combined on eligible models — eligible customers only, on selected variants.
//         </p>

//         {/* ── Filter bar ──────────────────────────────────── */}
//         <FilterBar active={filter} onChange={setFilter} />

//         {/* ── Desktop: featured + grid ─────────────────────── */}
//         <div className="hidden lg:block">
//           {featured && (
//             <FeaturedOfferCard offer={featured} onGetOffer={handleGetOffer} onTestDrive={handleTestDrive} />
//           )}
//           <div className="flex items-center justify-between mb-5">
//             <p className="text-white/35 text-[11px] uppercase tracking-widest font-semibold">
//               {standard.length} offer{standard.length === 1 ? "" : "s"} available
//             </p>
//             {standard.length >= 2 && (
//               <button
//                 onClick={() => { setCompareMode(m => !m); if (compareMode) setCompareIds([]); }}
//                 className={`
//                   flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold
//                   border transition-colors
//                   ${compareMode ? "bg-[#0055A5]/20 border-[#0055A5]/50 text-white" : "border-white/15 text-white/50 hover:text-white"}
//                 `}
//               >
//                 <Scale size={12} /> {compareMode ? "Comparing" : "Compare Offers"}
//               </button>
//             )}
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
//             <AnimatePresence mode="popLayout">
//               {standard.map((offer, i) => (
//                 <OfferCard
//                   key={offer.id}
//                   offer={offer}
//                   index={i}
//                   onGetOffer={handleGetOffer}
//                   onTestDrive={handleTestDrive}
//                   compareMode={compareMode}
//                   compareSelected={compareIds.includes(offer.id)}
//                   onToggleCompare={toggleCompare}
//                 />
//               ))}
//             </AnimatePresence>
//           </div>

//           <AnimatePresence>
//             {compareMode && compareOffers.length >= 2 && (
//               <>
//                 <CompareTable offers={compareOffers} onClear={() => setCompareIds([])} />
//                 {(() => { trackCompareClick(compareIds.join(",")); return null; })()}
//               </>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* ── Mobile: carousel ─────────────────────────────── */}
//         <MobileCarousel
//           offers={featured ? [featured, ...standard] : standard}
//           onGetOffer={handleGetOffer}
//           onTestDrive={handleTestDrive}
//         />

//         {/* ── Disclaimer ───────────────────────────────────── */}
//         <p className="text-[11px] text-white/25 mt-14 max-w-3xl mx-auto text-center leading-relaxed">
//           *Offers shown are subject to applicable model, variant, MY, customer and campaign eligibility.
//           Exchange, scrappage and loyalty benefits may be combined only where applicable. Benefits and
//           terms may change. Please confirm the applicable offer with Garud Tata at the time of enquiry.
//         </p>

//         {/* ── CTA strip ────────────────────────────────────── */}
//         <div className="mt-16 text-center bg-white/4 border border-white/10 rounded-2xl px-6 py-10 lg:py-12">
//           <h4 className="text-white font-bold text-[1.5rem] tracking-tight mb-2">
//             Want to know which offer applies to you?
//           </h4>
//           <p className="text-white/50 text-[14px] mb-6 max-w-md mx-auto">
//             Our Garud Tata team can help you understand the applicable benefits for your preferred model.
//           </p>
//           <button
//             onClick={scrollToForm}
//             className="
//               inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full
//               bg-[#0055A5] hover:bg-[#1E7FE8]
//               text-white font-bold text-[13px] tracking-[0.06em]
//               shadow-[0_4px_20px_rgba(0,85,165,0.4)]
//               hover:-translate-y-0.5 transition-all duration-200 group
//             "
//           >
//             GET MY OFFER
//             <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
//           </button>
//         </div>

//         {/* ── Lead form ────────────────────────────────────── */}
//         <OfferLeadForm selectedOffer={selectedOffer} />
//       </div>
//     </section>
//   );
// }











"use client";

import {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  type FormEvent,
} from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  Tag,
  RefreshCcw,
  Trash2,
  Heart,
  Zap,
  Loader2,
  CheckCircle2,
  Info,
  Car,
  Fuel,
  ChevronRight,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════════════════
   ANALYTICS
════════════════════════════════════════════════════════════════════════ */
declare global {
  interface Window { fbq?: (...args: unknown[]) => void; }
}
function track(event: string, params?: Record<string, string | number>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", event, params);
  }
}
const trackViewOffer      = (id: string) => track("ViewContent", { content_name: id });
const trackGetOfferClick  = (id: string, model: string) => track("Lead", { content_name: model, offer_id: id, source: "GetOfferClick" });
const trackTestDriveClick = (model: string) => track("Lead", { content_name: model, source: "TestDriveClick" });

/* ════════════════════════════════════════════════════════════════════════
   DATA CONTRACT
════════════════════════════════════════════════════════════════════════ */
type Category  = "SUV" | "Hatchback" | "Sedan" | "EV";
type ModelYear = "MY24" | "MY25";

export type TataOffer = {
  id: string;
  model: string;
  variantLabel?: string;
  category: Category;
  modelYear: ModelYear;
  consumerOffer?: number;
  exchangeBenefit?: number;
  scrappageBenefit?: number;
  loyaltyBenefit?: number;
  /** Maximum combined benefit — copied verbatim from official offer sheet. Never recalculated. */
  totalBenefit: number;
  featured?: boolean;
  eligibility?: string;
  active: boolean;
};

const LAST_UPDATED = "20 August 2026";

const OFFERS: TataOffer[] = [
  // ── Hatchback / Sedan (ICE) ─────────────────────────────────────────
  { id: "tiago-petrol",       model: "Tata Tiago",   variantLabel: "Petrol",           category: "Hatchback", modelYear: "MY25", consumerOffer: 35000, exchangeBenefit: 10000, scrappageBenefit: 15000, totalBenefit: 50000,  active: true },
  { id: "tiago-cng",          model: "Tata Tiago",   variantLabel: "CNG",              category: "Hatchback", modelYear: "MY25", consumerOffer: 30000, exchangeBenefit: 10000, scrappageBenefit: 15000, totalBenefit: 45000,  active: true },
  { id: "tigor",              model: "Tata Tigor",   category: "Sedan",                modelYear: "MY25",     consumerOffer: 15000, exchangeBenefit: 10000, scrappageBenefit: 15000, totalBenefit: 30000,  active: true },
  { id: "altroz-petrol",      model: "Tata Altroz",  variantLabel: "Petrol",           category: "Hatchback", modelYear: "MY25", consumerOffer: 35000, exchangeBenefit: 15000, scrappageBenefit: 20000, totalBenefit: 55000,  active: true },
  { id: "altroz-cng",         model: "Tata Altroz",  variantLabel: "CNG",              category: "Hatchback", modelYear: "MY25", consumerOffer: 35000, exchangeBenefit: 15000, scrappageBenefit: 20000, totalBenefit: 55000,  active: true },
  { id: "altroz-diesel",      model: "Tata Altroz",  variantLabel: "Diesel",           category: "Hatchback", modelYear: "MY25", consumerOffer: 25000, exchangeBenefit: 15000, scrappageBenefit: 20000, totalBenefit: 45000,  active: true },
  { id: "altroz-outgoing",    model: "Tata Altroz",  variantLabel: "Outgoing Stock",   category: "Hatchback", modelYear: "MY24", consumerOffer: 110000, exchangeBenefit: 40000, scrappageBenefit: 40000, loyaltyBenefit: 25000, totalBenefit: 175000, eligibility: "Limited outgoing stock — selected variants", active: true },
  // ── SUV (ICE) ──────────────────────────────────────────────────────
  { id: "punch-petrol-out",   model: "Tata Punch",   variantLabel: "Petrol · Outgoing",category: "SUV",       modelYear: "MY24", consumerOffer: 70000, exchangeBenefit: 30000, scrappageBenefit: 30000, loyaltyBenefit: 20000, totalBenefit: 120000, eligibility: "Limited outgoing stock", active: true },
  { id: "punch-cng-out",      model: "Tata Punch",   variantLabel: "CNG · Outgoing",   category: "SUV",       modelYear: "MY24", consumerOffer: 70000, exchangeBenefit: 30000, scrappageBenefit: 30000, loyaltyBenefit: 20000, totalBenefit: 120000, eligibility: "Limited outgoing stock", active: true },
  { id: "nexon-petrol",       model: "Tata Nexon",   variantLabel: "Petrol",           category: "SUV",       modelYear: "MY25", consumerOffer: 40000, exchangeBenefit: 15000, scrappageBenefit: 20000, totalBenefit: 60000,  active: true },
  { id: "nexon-cng",          model: "Tata Nexon",   variantLabel: "CNG",              category: "SUV",       modelYear: "MY25", consumerOffer: 35000, exchangeBenefit: 20000, scrappageBenefit: 25000, totalBenefit: 60000,  active: true },
  { id: "nexon-diesel",       model: "Tata Nexon",   variantLabel: "Diesel",           category: "SUV",       modelYear: "MY25", exchangeBenefit: 15000, scrappageBenefit: 20000, totalBenefit: 20000,   active: true },
  { id: "curvv",              model: "Tata Curvv",   category: "SUV",                  modelYear: "MY25",     consumerOffer: 30000, exchangeBenefit: 40000, scrappageBenefit: 45000, loyaltyBenefit: 50000, totalBenefit: 125000, active: true },
  { id: "harrier-d",          model: "Tata Harrier", variantLabel: "Diesel",           category: "SUV",       modelYear: "MY25", consumerOffer: 10000, exchangeBenefit: 25000, scrappageBenefit: 35000, totalBenefit: 45000,  active: true },
  { id: "harrier-d-wox",      model: "Tata Harrier", variantLabel: "Diesel · w/o X",  category: "SUV",       modelYear: "MY24", consumerOffer: 150000, exchangeBenefit: 50000, scrappageBenefit: 50000, loyaltyBenefit: 40000, totalBenefit: 240000, eligibility: "Selected variants — excludes X trim", active: true },
  { id: "harrier-p",          model: "Tata Harrier", variantLabel: "Petrol",           category: "SUV",       modelYear: "MY25", consumerOffer: 40000, totalBenefit: 40000,   active: true },
  { id: "safari-d",           model: "Tata Safari",  variantLabel: "2.0 Diesel",       category: "SUV",       modelYear: "MY25", consumerOffer: 10000, exchangeBenefit: 25000, scrappageBenefit: 35000, totalBenefit: 45000,  active: true },
  { id: "safari-d-wox",       model: "Tata Safari",  variantLabel: "2.0 Diesel · w/o X", category: "SUV",    modelYear: "MY24", consumerOffer: 150000, exchangeBenefit: 50000, scrappageBenefit: 50000, loyaltyBenefit: 40000, totalBenefit: 240000, eligibility: "Selected variants — excludes X trim", active: true },
  { id: "safari-p",           model: "Tata Safari",  variantLabel: "2.0 Petrol",       category: "SUV",       modelYear: "MY25", consumerOffer: 40000, totalBenefit: 40000,   active: true },
  // ── EV ──────────────────────────────────────────────────────────────
  { id: "tiago-ev-lr-xt",     model: "Tata Tiago EV",  variantLabel: "LR XT",              category: "EV", modelYear: "MY25", consumerOffer: 100000, exchangeBenefit: 20000, scrappageBenefit: 25000, totalBenefit: 125000, active: true },
  { id: "tiago-ev-lr-xz",     model: "Tata Tiago EV",  variantLabel: "LR XZ+ & above",     category: "EV", modelYear: "MY25", consumerOffer: 100000, exchangeBenefit: 20000, scrappageBenefit: 25000, totalBenefit: 125000, active: true },
  { id: "tiago-ev-mr",        model: "Tata Tiago EV",  variantLabel: "MR — all variants",   category: "EV", modelYear: "MY25", consumerOffer: 40000,  exchangeBenefit: 20000, scrappageBenefit: 25000, totalBenefit: 65000,  active: true },
  { id: "punch-ev-lr",        model: "Tata Punch EV",  variantLabel: "LR — all variants",   category: "EV", modelYear: "MY25", consumerOffer: 110000, exchangeBenefit: 30000, scrappageBenefit: 35000, totalBenefit: 145000, active: true },
  { id: "punch-ev-mr",        model: "Tata Punch EV",  variantLabel: "MR (excl. Smart)",    category: "EV", modelYear: "MY25", consumerOffer: 90000,  exchangeBenefit: 30000, scrappageBenefit: 35000, totalBenefit: 125000, active: true },
  { id: "punch-ev-smart",     model: "Tata Punch EV",  variantLabel: "Smart & Smart+",      category: "EV", modelYear: "MY25", consumerOffer: 60000,  exchangeBenefit: 30000, scrappageBenefit: 35000, totalBenefit: 95000,  active: true },
  { id: "nexon-ev",           model: "Tata Nexon EV",  variantLabel: "3.0",                 category: "EV", modelYear: "MY25", consumerOffer: 15000,  exchangeBenefit: 25000, scrappageBenefit: 35000, totalBenefit: 50000,  active: true },
  { id: "curvv-ev",           model: "Tata Curvv EV",  category: "EV",                      modelYear: "MY25", consumerOffer: 300000, exchangeBenefit: 30000, scrappageBenefit: 35000, totalBenefit: 335000, featured: true, active: true },
  { id: "harrier-ev",         model: "Tata Harrier EV",category: "EV",                      modelYear: "MY25", consumerOffer: 100000, exchangeBenefit: 50000, scrappageBenefit: 75000, loyaltyBenefit: 100000, totalBenefit: 275000, active: true },
];

/* ════════════════════════════════════════════════════════════════════════
   HELPERS
════════════════════════════════════════════════════════════════════════ */
const formatINR = (n: number) =>
  `₹${n.toLocaleString("en-IN")}`;

const BENEFIT_ROWS: {
  key: keyof Pick<TataOffer, "consumerOffer" | "exchangeBenefit" | "scrappageBenefit" | "loyaltyBenefit">;
  label: string;
  short: string;
  Icon: typeof Tag;
}[] = [
  { key: "consumerOffer",    label: "Consumer Offer",   short: "Consumer",  Icon: Tag },
  { key: "exchangeBenefit",  label: "Exchange",         short: "Exchange",  Icon: RefreshCcw },
  { key: "scrappageBenefit", label: "Scrappage",        short: "Scrappage", Icon: Trash2 },
  { key: "loyaltyBenefit",   label: "Loyalty",          short: "Loyalty",   Icon: Heart },
];

const FILTERS = ["ALL", "SUV", "Hatchback", "EV", "MY25", "MY24"] as const;
type FilterKey = (typeof FILTERS)[number];

function matchesFilter(o: TataOffer, f: FilterKey) {
  if (f === "ALL") return true;
  if (f === "MY25" || f === "MY24") return o.modelYear === f;
  return o.category === f;
}

/* ════════════════════════════════════════════════════════════════════════
   ANIMATED NUMBER
════════════════════════════════════════════════════════════════════════ */
function AnimatedAmount({ value, active, className }: { value: number; active: boolean; className?: string }) {
  const prefersReduced = useReducedMotion();
  const mv    = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 80, damping: 20 });
  const [display, setDisplay] = useState(prefersReduced ? value : 0);

  useEffect(() => {
    if (prefersReduced) { setDisplay(value); return; }
    mv.set(0);
    if (active) mv.set(value);
  }, [active, value, prefersReduced, mv]);

  useEffect(() => {
    if (prefersReduced) return;
    return spring.on("change", v => setDisplay(Math.round(v)));
  }, [spring, prefersReduced]);

  return <span className={className}>{formatINR(display)}</span>;
}

/* ════════════════════════════════════════════════════════════════════════
   COMBINABILITY TOOLTIP
════════════════════════════════════════════════════════════════════════ */
function CombineNote({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const activeBenefits = compact
    ? "Combinable"
    : "+ Exchange + Scrappage + Loyalty";
  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        aria-expanded={open}
        aria-label="Benefit combination details"
        className={`
          flex items-center gap-1.5 rounded-full
          border border-[#0055A5]/30 bg-[#0055A5]/10 text-[#5BA3E8]
          hover:bg-[#0055A5]/18 transition-colors duration-150
          ${compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-[11px]"}
        `}
      >
        <Info size={compact ? 10 : 11} strokeWidth={2.2} />
        {activeBenefits}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="tooltip"
            initial={{ opacity: 0, y: 4, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.13 }}
            className="
              absolute z-40 top-full left-0 mt-2 w-64
              bg-[#0B1627] border border-white/12 rounded-xl p-3.5
              text-[11px] leading-relaxed text-white/60
              shadow-[0_16px_40px_rgba(0,0,0,0.6)]
            "
          >
            Benefits are subject to model, variant, customer and campaign eligibility.
            Please confirm the applicable offer with Garud Tata.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   FILTER BAR
════════════════════════════════════════════════════════════════════════ */
function FilterBar({ active, onChange }: { active: FilterKey; onChange: (f: FilterKey) => void }) {
  const icons: Partial<Record<FilterKey, React.ReactNode>> = {
    EV: <Zap size={11} />,
    SUV: <Car size={11} />,
    Hatchback: <Fuel size={11} />,
  };
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {FILTERS.map(f => (
        <button
          key={f}
          onClick={() => onChange(f)}
          aria-pressed={active === f}
          className="relative flex-shrink-0 px-5 py-2.5 rounded-full text-[12.5px] font-semibold whitespace-nowrap transition-colors duration-200"
        >
          {active === f && (
            <motion.span
              layoutId="filter-pill"
              transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="absolute inset-0 rounded-full bg-[#0055A5] shadow-[0_4px_18px_rgba(0,85,165,0.45)]"
            />
          )}
          <span className={`relative z-10 flex items-center gap-1.5 ${active === f ? "text-white" : "text-white/50 hover:text-white"}`}>
            {icons[f]}
            {f}
          </span>
          {active !== f && (
            <span className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.04]" />
          )}
        </button>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   YEAR + CATEGORY BADGES
════════════════════════════════════════════════════════════════════════ */
function ModelBadges({ offer }: { offer: TataOffer }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className={`
        px-2 py-0.5 rounded text-[9px] font-black tracking-[0.14em] uppercase
        ${offer.modelYear === "MY25"
          ? "bg-[#0055A5]/30 text-[#7DB8F7] border border-[#0055A5]/40"
          : "bg-white/8 text-white/55 border border-white/15"}
      `}>
        {offer.modelYear}
      </span>
      {offer.category === "EV" && (
        <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black tracking-[0.14em] uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
          <Zap size={9} strokeWidth={2.5} /> EV
        </span>
      )}
      {offer.eligibility && (
        <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-[0.14em] uppercase bg-amber-500/12 text-amber-300 border border-amber-400/25">
          LIMITED
        </span>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   STANDARD OFFER CARD — no image, pure data dashboard
════════════════════════════════════════════════════════════════════════ */
function OfferCard({
  offer,
  index,
  onGetOffer,
  onTestDrive,
}: {
  offer: TataOffer;
  index: number;
  onGetOffer: (o: TataOffer) => void;
  onTestDrive: (o: TataOffer) => void;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReduced = useReducedMotion();

  useEffect(() => { if (inView) trackViewOffer(offer.id); }, [inView, offer.id]);

  const activeBenefitRows = BENEFIT_ROWS.filter(r => {
    const v = offer[r.key];
    return typeof v === "number" && v > 0;
  });

  const hasMultipleBenefits = activeBenefitRows.length >= 2;

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.07, 0.35) }}
      whileHover={prefersReduced ? undefined : { y: -5 }}
      className="
        group relative flex flex-col
        bg-[#070D1A] border border-white/[0.08]
        hover:border-[#0055A5]/55
        rounded-2xl overflow-hidden
        transition-[border-color,box-shadow] duration-300
        hover:shadow-[0_0_0_1px_rgba(0,85,165,0.2),0_20px_48px_rgba(0,0,0,0.5)]
      "
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#0055A5]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="p-5 flex flex-col flex-1 gap-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <ModelBadges offer={offer} />
            <h3 className="text-white font-extrabold text-[1.15rem] tracking-tight leading-tight mt-2 group-hover:translate-x-0.5 transition-transform duration-200">
              {offer.model}
            </h3>
            <p className="text-white/38 text-[11.5px] mt-0.5 font-medium">
              {offer.variantLabel ?? offer.category}
            </p>
          </div>
        </div>

        {/* Total benefit — the hero number */}
        <div className="bg-white/[0.035] rounded-xl px-4 py-3.5 border border-white/[0.06] group-hover:border-[#0055A5]/20 group-hover:bg-[#0055A5]/[0.06] transition-colors duration-300">
          <p className="text-[9px] font-bold tracking-[0.2em] text-white/35 uppercase mb-1">
            Maximum Eligible Benefits
          </p>
          <AnimatedAmount
            value={offer.totalBenefit}
            active={inView}
            className="block text-white font-extrabold text-[1.75rem] tracking-tight leading-none group-hover:text-[#7DB8F7] transition-colors duration-300"
          />
          <p className="text-[10px] text-white/28 mt-1">Up to, on eligible variants*</p>
        </div>

        {/* Benefit breakdown */}
        {activeBenefitRows.length > 0 && (
          <div className="space-y-2">
            <div className="h-px bg-white/[0.06]" />
            {activeBenefitRows.map(({ key, label, Icon }) => (
              <div key={key} className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-1.5 text-white/42 text-[12px]">
                  <Icon size={12} className="text-[#0055A5]/80 flex-shrink-0" strokeWidth={2} />
                  {label}
                </span>
                <span className="text-white/75 text-[12.5px] font-semibold tabular-nums">
                  {formatINR(offer[key] as number)}
                </span>
              </div>
            ))}
            {hasMultipleBenefits && (
              <div className="pt-1">
                <CombineNote compact />
              </div>
            )}
          </div>
        )}

        {/* CTAs */}
        <div className="mt-auto pt-1 flex flex-col gap-2">
          <button
            onClick={() => { trackGetOfferClick(offer.id, offer.model); onGetOffer(offer); }}
            className="
              group/btn w-full flex items-center justify-center gap-2
              px-4 py-3 rounded-xl
              bg-[#0055A5] hover:bg-[#1A70D4]
              text-white font-bold text-[12.5px] tracking-[0.06em]
              shadow-[0_4px_18px_rgba(0,85,165,0.32)]
              transition-all duration-200
            "
          >
            GET OFFER
            <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform duration-150" />
          </button>
          <button
            onClick={() => { trackTestDriveClick(offer.model); onTestDrive(offer); }}
            className="
              w-full px-4 py-2.5 rounded-xl
              border border-white/12 hover:border-white/28 hover:bg-white/[0.05]
              text-white/50 hover:text-white
              text-[11.5px] font-semibold tracking-[0.06em]
              transition-all duration-200
            "
          >
            TEST DRIVE
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   FEATURED OFFER CARD — large typographic hero, no image
════════════════════════════════════════════════════════════════════════ */
function FeaturedCard({
  offer,
  onGetOffer,
  onTestDrive,
}: {
  offer: TataOffer;
  onGetOffer: (o: TataOffer) => void;
  onTestDrive: (o: TataOffer) => void;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();

  useEffect(() => { if (inView) trackViewOffer(offer.id); }, [inView, offer.id]);

  const activeBenefitRows = BENEFIT_ROWS.filter(r => {
    const v = offer[r.key];
    return typeof v === "number" && v > 0;
  });

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="
        relative overflow-hidden rounded-3xl mb-8
        bg-gradient-to-br from-[#08152B] via-[#060E1C] to-[#060C18]
        border border-[#0055A5]/30
      "
    >
      {/* Ambient glow */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#0055A5]/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#1A70D4]/8 blur-[90px] pointer-events-none" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 p-7 lg:p-10">
        {/* Featured badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0055A5]/25 border border-[#0055A5]/50 text-[#5BA3E8] text-[10px] font-bold tracking-[0.22em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8] animate-pulse" />
            FEATURED OFFER
          </span>
          <ModelBadges offer={offer} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
          {/* Left: model + total */}
          <div>
            <h3 className="text-white font-extrabold text-[2.2rem] lg:text-[2.8rem] tracking-[-0.02em] leading-[1.0] mb-1">
              {offer.model}
            </h3>
            <p className="text-white/40 text-[13px] font-medium mb-6">
              {offer.variantLabel ?? offer.category} · {offer.modelYear} Consumer Offer
            </p>

            <p className="text-[9px] font-bold tracking-[0.22em] text-[#5BA3E8]/70 uppercase mb-2">
              Maximum Eligible Benefits
            </p>
            <AnimatedAmount
              value={offer.totalBenefit}
              active={inView}
              className="block text-white font-extrabold text-[3.4rem] lg:text-[4.2rem] tracking-[-0.03em] leading-none mb-2"
            />
            <p className="text-white/28 text-[11px] mb-6">Up to, on eligible variants*</p>

            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => { trackGetOfferClick(offer.id, offer.model); onGetOffer(offer); }}
                className="
                  group/btn flex items-center gap-2.5
                  px-7 py-3.5 rounded-full
                  bg-[#0055A5] hover:bg-[#1A70D4]
                  text-white font-bold text-[12.5px] tracking-[0.07em]
                  shadow-[0_6px_28px_rgba(0,85,165,0.48)]
                  hover:-translate-y-0.5 transition-all duration-200
                "
              >
                GET {offer.model.replace("Tata ", "").toUpperCase()} OFFER
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-150" />
              </button>
              <button
                onClick={() => { trackTestDriveClick(offer.model); onTestDrive(offer); }}
                className="
                  px-7 py-3.5 rounded-full
                  bg-white/5 border border-white/18 hover:border-white/35 hover:bg-white/9
                  text-white font-medium text-[12.5px] tracking-[0.05em]
                  transition-all duration-200
                "
              >
                TEST DRIVE
              </button>
            </div>
          </div>

          {/* Right: benefit table */}
          <div className="lg:min-w-[240px] bg-white/[0.04] border border-white/8 rounded-2xl p-5">
            <p className="text-[9px] font-bold tracking-[0.18em] text-white/35 uppercase mb-4">
              Benefit Breakdown
            </p>
            <div className="space-y-3">
              {activeBenefitRows.map(({ key, label, Icon }) => (
                <div key={key} className="flex items-center justify-between gap-6">
                  <span className="flex items-center gap-2 text-white/45 text-[12.5px]">
                    <Icon size={13} className="text-[#0055A5]/80 flex-shrink-0" strokeWidth={2} />
                    {label}
                  </span>
                  <span className="text-white/85 text-[13px] font-bold tabular-nums whitespace-nowrap">
                    {formatINR(offer[key] as number)}
                  </span>
                </div>
              ))}
            </div>
            {activeBenefitRows.length >= 2 && (
              <div className="mt-4 pt-3 border-t border-white/8">
                <CombineNote />
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   DESKTOP OFFER TABLE ROW — ultra-compact premium table view
════════════════════════════════════════════════════════════════════════ */
function OfferTableRow({
  offer,
  index,
  onGetOffer,
  onTestDrive,
}: {
  offer: TataOffer;
  index: number;
  onGetOffer: (o: TataOffer) => void;
  onTestDrive: (o: TataOffer) => void;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();

  useEffect(() => { if (inView) trackViewOffer(offer.id); }, [inView, offer.id]);

  const activeBenefitRows = BENEFIT_ROWS.filter(r => {
    const v = offer[r.key];
    return typeof v === "number" && v > 0;
  });

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? false : { opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.05, 0.3) }}
      className="
        group relative grid items-center gap-5
        grid-cols-[minmax(180px,1fr)_1fr_minmax(130px,auto)_auto]
        px-5 py-4
        border-b border-white/[0.06] last:border-0
        hover:bg-white/[0.025]
        transition-colors duration-200
        cursor-default
      "
      style={{ gridTemplateColumns: "minmax(190px,1fr) 1fr minmax(130px,auto) auto" }}
    >
      {/* Hover left border */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#0055A5] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />

      {/* Column 1 — Model */}
      <div className="min-w-0 pl-3">
        <ModelBadges offer={offer} />
        <p className="text-white font-bold text-[14.5px] tracking-tight mt-1.5 group-hover:translate-x-0.5 transition-transform duration-200 truncate">
          {offer.model}
        </p>
        <p className="text-white/35 text-[11px] font-medium truncate">
          {offer.variantLabel ?? offer.category}
        </p>
      </div>

      {/* Column 2 — Benefit breakdown chips */}
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {activeBenefitRows.length === 0 ? (
          <span className="text-white/28 text-[11px] italic">Available on enquiry</span>
        ) : activeBenefitRows.map(({ key, label, short, Icon }) => (
          <div key={key} className="flex flex-col gap-0.5 min-w-[68px]">
            <span className="flex items-center gap-1 text-[10px] text-white/35 font-medium">
              <Icon size={10} strokeWidth={2} className="text-[#0055A5]/70 flex-shrink-0" />
              {short}
            </span>
            <span className="text-white/75 text-[12.5px] font-bold tabular-nums">
              {formatINR(offer[key] as number)}
            </span>
          </div>
        ))}
      </div>

      {/* Column 3 — Total */}
      <div className="text-right">
        <p className="text-[8.5px] font-bold tracking-[0.18em] text-white/30 uppercase mb-0.5">Total</p>
        <AnimatedAmount
          value={offer.totalBenefit}
          active={inView}
          className="block text-white font-extrabold text-[1.3rem] tracking-tight leading-none group-hover:text-[#7DB8F7] transition-colors duration-300"
        />
        <p className="text-white/22 text-[9.5px] mt-0.5">Up to*</p>
      </div>

      {/* Column 4 — CTAs */}
      <div className="flex flex-col gap-1.5 items-end">
        <button
          onClick={() => { trackGetOfferClick(offer.id, offer.model); onGetOffer(offer); }}
          className="
            group/btn flex items-center gap-1.5
            px-4 py-2 rounded-lg
            bg-[#0055A5] hover:bg-[#1A70D4]
            text-white font-bold text-[11px] tracking-[0.07em] whitespace-nowrap
            shadow-[0_3px_14px_rgba(0,85,165,0.32)]
            transition-all duration-200
          "
        >
          GET OFFER
          <ChevronRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform duration-150" />
        </button>
        <button
          onClick={() => { trackTestDriveClick(offer.model); onTestDrive(offer); }}
          className="
            px-4 py-1.5 rounded-lg
            border border-white/12 hover:border-white/28
            text-white/45 hover:text-white
            text-[10.5px] font-semibold tracking-[0.06em] whitespace-nowrap
            transition-all duration-150
          "
        >
          TEST DRIVE
        </button>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   MOBILE CARD — stacked, no image
════════════════════════════════════════════════════════════════════════ */
function MobileOfferCard({
  offer,
  index,
  onGetOffer,
  onTestDrive,
}: {
  offer: TataOffer;
  index: number;
  onGetOffer: (o: TataOffer) => void;
  onTestDrive: (o: TataOffer) => void;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();

  useEffect(() => { if (inView) trackViewOffer(offer.id); }, [inView, offer.id]);

  const activeBenefitRows = BENEFIT_ROWS.filter(r => {
    const v = offer[r.key];
    return typeof v === "number" && v > 0;
  });

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? false : { opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.06, 0.3) }}
      className="bg-[#07101E] border border-white/[0.08] rounded-2xl p-5 mb-3 last:mb-0"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <ModelBadges offer={offer} />
          <h3 className="text-white font-extrabold text-[1.05rem] tracking-tight mt-1.5">
            {offer.model}
          </h3>
          <p className="text-white/38 text-[11px] mt-0.5">{offer.variantLabel ?? offer.category}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-[8.5px] font-bold tracking-[0.18em] text-white/30 uppercase mb-0.5">TOTAL</p>
          <AnimatedAmount
            value={offer.totalBenefit}
            active={inView}
            className="block text-white font-extrabold text-[1.45rem] tracking-tight leading-none"
          />
          <p className="text-white/22 text-[9px] mt-0.5">Up to*</p>
        </div>
      </div>

      {activeBenefitRows.length > 0 && (
        <div className="space-y-2 border-t border-white/[0.06] pt-3 mb-4">
          {activeBenefitRows.map(({ key, label, Icon }) => (
            <div key={key} className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-white/40 text-[11.5px]">
                <Icon size={11} className="text-[#0055A5]/70 flex-shrink-0" strokeWidth={2} />
                {label}
              </span>
              <span className="text-white/70 text-[12px] font-semibold tabular-nums">
                {formatINR(offer[key] as number)}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => { trackGetOfferClick(offer.id, offer.model); onGetOffer(offer); }}
          className="
            group/btn flex-1 flex items-center justify-center gap-1.5
            py-2.5 rounded-lg
            bg-[#0055A5] hover:bg-[#1A70D4]
            text-white font-bold text-[12px] tracking-[0.06em]
            transition-all duration-200
          "
        >
          GET OFFER
          <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
        </button>
        <button
          onClick={() => { trackTestDriveClick(offer.model); onTestDrive(offer); }}
          className="
            px-4 py-2.5 rounded-lg
            border border-white/12 hover:border-white/28
            text-white/50 hover:text-white
            text-[11px] font-semibold tracking-[0.06em]
            transition-all duration-150
          "
        >
          TEST DRIVE
        </button>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   BACKGROUND ATMOSPHERE
════════════════════════════════════════════════════════════════════════ */
function Background() {
  const prefersReduced = useReducedMotion();
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <motion.div
        className="absolute top-[8%] left-[10%] w-[700px] h-[700px] rounded-full bg-[#0055A5]/8 blur-[160px]"
        animate={prefersReduced ? undefined : { x: [0, 50, -20, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[5%] right-[5%] w-[500px] h-[500px] rounded-full bg-[#1A70D4]/6 blur-[130px]"
        animate={prefersReduced ? undefined : { x: [0, -35, 15, 0], y: [0, 25, -35, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   ENQUIRY FORM
════════════════════════════════════════════════════════════════════════ */
type EnquiryType = "Get Offer" | "Test Drive" | "Exchange" | "Finance" | "General Enquiry";

const CARS = [
  "Tata Sierra", "Tata Harrier", "Tata Safari", "Tata Curvv", "Tata Curvv EV",
  "Tata Nexon", "Tata Nexon EV", "Tata Punch", "Tata Punch EV",
  "Tata Altroz", "Tata Tiago", "Tata Tiago EV", "Tata Tigor",
] as const;

const SHOWROOMS = [
  "Garud Tata Palam",
  "Garud Tata Narela",
  "Garud Tata Najafgarh",
] as const;

const ENQUIRY_TYPES: EnquiryType[] = [
  "Get Offer", "Test Drive", "Exchange", "Finance", "General Enquiry",
];

interface EnquiryFormProps {
  preselectedCar?: string;
  preselectedType?: EnquiryType;
}

function EnquiryForm({ preselectedCar, preselectedType }: EnquiryFormProps) {
  const [form, setForm]       = useState({
    name:      "",
    mobile:    "",
    car:       preselectedCar   ?? "",
    type:      preselectedType  ?? ("Get Offer" as EnquiryType),
    showroom:  "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  // Keep in sync when parent changes preselection
  useEffect(() => {
    setForm(prev => ({
      ...prev,
      car:  preselectedCar  ?? prev.car,
      type: preselectedType ?? prev.type,
    }));
  }, [preselectedCar, preselectedType]);

  const nameRef   = useRef<HTMLInputElement>(null);
  const mobileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (preselectedCar || preselectedType) {
      setTimeout(() => nameRef.current?.focus(), 400);
    }
  }, [preselectedCar, preselectedType]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name.trim())                            { setError("Please enter your name."); return; }
    if (form.mobile.replace(/\D/g, "").length < 10)  { setError("Please enter a valid 10-digit mobile number."); return; }
    if (!form.car)                                    { setError("Please select a car."); return; }
    if (!form.showroom)                               { setError("Please select a showroom."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "garud-tata-offers" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Submission failed.");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [form]);

  const field = "w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3.5 text-white text-[13.5px] placeholder:text-white/25 focus:outline-none focus:border-[#0055A5]/65 focus:bg-[#0055A5]/[0.07] transition-colors duration-200";

  return (
    <section id="enquiry" className="bg-[#050A12] py-20 lg:py-28 px-5 lg:px-12 scroll-mt-0">
      <div className="max-w-[600px] mx-auto">
        <div className="text-center mb-10">
          <span className="text-[10px] font-bold tracking-[0.26em] text-[#5BA3E8] uppercase mb-3 block">
            GARUD TATA · ENQUIRY
          </span>
          <h2 className="text-white font-extrabold text-[clamp(1.8rem,4vw,2.8rem)] tracking-tight leading-[1.05] mb-3">
            Let's Get You<br />Behind the Wheel
          </h2>
          <p className="text-white/45 text-[14px] max-w-md mx-auto leading-relaxed">
            Tell us what you're interested in and the Garud Tata team will get in touch with you.
          </p>
        </div>

        <div className="bg-[#07101E] border border-white/[0.08] rounded-3xl p-6 lg:p-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#0055A5]/20 border border-[#0055A5]/40 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={28} className="text-[#5BA3E8]" />
              </div>
              <h3 className="text-white font-extrabold text-[1.5rem] tracking-tight mb-2">
                Enquiry Received!
              </h3>
              <p className="text-white/45 text-[14px] leading-relaxed mb-8 max-w-xs mx-auto">
                Thank you for contacting Garud Tata. Our team will get in touch with you shortly.
                Your {form.type.toLowerCase()} enquiry has been received.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:+911234567890"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0055A5] hover:bg-[#1A70D4] text-white font-bold text-[12.5px] tracking-[0.06em] transition-all duration-200"
                >
                  CALL NOW
                </a>
                <a
                  href="https://wa.me/911234567890"
                  target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/6 border border-white/18 hover:border-white/35 text-white font-medium text-[12.5px] tracking-[0.04em] transition-all duration-200"
                >
                  WHATSAPP US
                </a>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Pre-fill indicator */}
              {(preselectedCar || preselectedType) && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-[#0055A5]/10 border border-[#0055A5]/25 rounded-xl px-4 py-3"
                >
                  <CheckCircle2 size={15} className="text-[#5BA3E8] flex-shrink-0" />
                  <div className="min-w-0 text-[12px]">
                    <span className="text-white font-semibold">{preselectedCar}</span>
                    {preselectedType && <span className="text-white/45"> · {preselectedType}</span>}
                    <span className="text-white/35"> — pre-filled from your selection</span>
                  </div>
                </motion.div>
              )}

              {/* Name */}
              <div>
                <label className="block text-[10px] text-white/35 mb-1.5 tracking-[0.18em] uppercase font-bold">Name</label>
                <input
                  ref={nameRef}
                  type="text" required
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  placeholder="Your full name"
                  className={field}
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-[10px] text-white/35 mb-1.5 tracking-[0.18em] uppercase font-bold">Mobile Number</label>
                <input
                  ref={mobileRef}
                  type="tel" required
                  value={form.mobile}
                  onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))}
                  placeholder="+91 00000 00000"
                  className={field}
                />
              </div>

              {/* Car */}
              <div>
                <label className="block text-[10px] text-white/35 mb-1.5 tracking-[0.18em] uppercase font-bold">Interested Car</label>
                <select
                  required
                  value={form.car}
                  onChange={e => setForm(p => ({ ...p, car: e.target.value }))}
                  className={`${field} appearance-none`}
                >
                  <option value="" disabled>Select a model</option>
                  {CARS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Enquiry Type */}
              <div>
                <label className="block text-[10px] text-white/35 mb-1.5 tracking-[0.18em] uppercase font-bold">Enquiry Type</label>
                <div className="flex flex-wrap gap-2">
                  {ENQUIRY_TYPES.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm(p => ({ ...p, type: t }))}
                      className={`
                        px-3.5 py-2 rounded-lg text-[12px] font-semibold tracking-[0.04em]
                        border transition-all duration-150
                        ${form.type === t
                          ? "bg-[#0055A5] border-[#0055A5] text-white"
                          : "bg-white/[0.04] border-white/10 text-white/50 hover:text-white hover:border-white/25"}
                      `}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Showroom */}
              <div>
                <label className="block text-[10px] text-white/35 mb-1.5 tracking-[0.18em] uppercase font-bold">Preferred Showroom</label>
                <select
                  required
                  value={form.showroom}
                  onChange={e => setForm(p => ({ ...p, showroom: e.target.value }))}
                  className={`${field} appearance-none`}
                >
                  <option value="" disabled>Select a showroom</option>
                  {SHOWROOMS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {error && (
                <p className="text-red-400 text-[13px] leading-snug">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full flex items-center justify-center gap-2
                  py-4 rounded-xl mt-1
                  bg-[#0055A5] hover:bg-[#1A70D4]
                  disabled:opacity-55 disabled:cursor-not-allowed
                  text-white font-extrabold text-[13.5px] tracking-[0.08em]
                  shadow-[0_6px_24px_rgba(0,85,165,0.4)]
                  hover:-translate-y-0.5 transition-all duration-200
                  group
                "
              >
                {loading
                  ? <Loader2 size={18} className="animate-spin" />
                  : (
                    <>
                      SUBMIT ENQUIRY
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-150" />
                    </>
                  )
                }
              </button>

              <p className="text-[10.5px] text-white/20 text-center leading-relaxed pt-0.5">
                *T&C apply. Subject to eligibility. Our team will contact you within 24 hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   MAIN EXPORT
════════════════════════════════════════════════════════════════════════ */
export default function CurrentTataOffers() {
  const [filter,          setFilter]          = useState<FilterKey>("ALL");
  const [preselectedCar,  setPreselectedCar]  = useState<string | undefined>();
  const [preselectedType, setPreselectedType] = useState<EnquiryType | undefined>();

  const active   = useMemo(() => OFFERS.filter(o => o.active), []);
  const filtered = useMemo(() => active.filter(o => matchesFilter(o, filter)), [active, filter]);
  const featured = useMemo(
    () => filtered.find(o => o.featured) ?? (filter === "ALL" ? active.find(o => o.featured) : undefined),
    [filtered, active, filter]
  );
  const standard = useMemo(() => filtered.filter(o => o.id !== featured?.id), [filtered, featured]);

  const enquiryRef = useRef<HTMLDivElement>(null);

  const scrollToEnquiry = useCallback(() => {
    document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleGetOffer = useCallback((offer: TataOffer) => {
    trackGetOfferClick(offer.id, offer.model);
    setPreselectedCar(offer.model);
    setPreselectedType("Get Offer");
    setTimeout(scrollToEnquiry, 60);
  }, [scrollToEnquiry]);

  const handleTestDrive = useCallback((offer: TataOffer) => {
    trackTestDriveClick(offer.model);
    setPreselectedCar(offer.model);
    setPreselectedType("Test Drive");
    setTimeout(scrollToEnquiry, 60);
  }, [scrollToEnquiry]);

  return (
    <>
      {/* ══════════════ OFFERS SECTION ══════════════ */}
      <section id="offers" className="relative bg-[#050A12] pt-20 pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
        <Background />

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-12">

          {/* Header */}
          <div className="text-center mb-5">
            <span className="text-[10px] font-bold tracking-[0.28em] text-[#5BA3E8] uppercase mb-3 block">
              GARUD TATA · CURRENT OFFERS
            </span>
            <h2 className="text-white font-extrabold text-[clamp(2.1rem,4.5vw,3.4rem)] tracking-[-0.02em] leading-[1.04] mb-4">
              Exclusive Tata Offers
            </h2>
            <p className="text-white/50 text-[14.5px] max-w-lg mx-auto leading-relaxed mb-2">
              Explore verified MY25 and MY24 consumer benefits available at Garud Tata.
            </p>
            <p className="text-white/30 text-[12px] mb-2">
              Exchange + Scrappage + Loyalty benefits can be combined on eligible models.
            </p>
            <p className="text-white/22 text-[11px]">Offers Last Updated: {LAST_UPDATED}</p>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-12 mt-7">
            {["Verified Offers", "MY25 & MY24 Models", "Exchange Benefits", "Test Drive Available"].map(t => (
              <span key={t} className="flex items-center gap-1.5 text-[11.5px] text-white/40 font-medium">
                <CheckCircle2 size={12} className="text-[#0055A5]" />
                {t}
              </span>
            ))}
          </div>

          {/* Filter bar */}
          <div className="mb-10">
            <FilterBar active={filter} onChange={setFilter} />
          </div>

          {/* Featured */}
          {featured && (
            <FeaturedCard offer={featured} onGetOffer={handleGetOffer} onTestDrive={handleTestDrive} />
          )}

          {/* ── Desktop: table layout ─────────────────── */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold tracking-[0.2em] text-white/30 uppercase">
                {standard.length} offer{standard.length !== 1 ? "s" : ""} available
              </p>
              <p className="text-[10px] text-white/20">MY25 / MY24 · All India · All amounts in INR</p>
            </div>

            {/* Table shell */}
            <div className="bg-[#070D1A] border border-white/[0.07] rounded-2xl overflow-hidden">
              {/* Table header */}
              <div
                className="grid px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]"
                style={{ gridTemplateColumns: "minmax(190px,1fr) 1fr minmax(130px,auto) auto" }}
              >
                {["Model", "Benefit Breakdown", "Total Benefits", ""].map((h, i) => (
                  <p key={i} className={`text-[9.5px] font-bold tracking-[0.2em] text-white/28 uppercase ${i >= 2 ? "text-right" : ""} ${i === 0 ? "pl-3" : ""}`}>
                    {h}
                  </p>
                ))}
              </div>

              <AnimatePresence mode="popLayout">
                {standard.length === 0 && (
                  <motion.p
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center text-white/30 py-12 text-[13px]"
                  >
                    No offers found for this filter.
                  </motion.p>
                )}
                {standard.map((offer, i) => (
                  <OfferTableRow
                    key={offer.id}
                    offer={offer}
                    index={i}
                    onGetOffer={handleGetOffer}
                    onTestDrive={handleTestDrive}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* ── Mobile: stacked cards ─────────────────── */}
          <div className="lg:hidden">
            <AnimatePresence mode="popLayout">
              {(featured ? [featured, ...standard] : standard).map((offer, i) => (
                <MobileOfferCard
                  key={offer.id}
                  offer={offer}
                  index={i}
                  onGetOffer={handleGetOffer}
                  onTestDrive={handleTestDrive}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* CTA strip */}
          <div className="mt-14 text-center bg-white/[0.03] border border-white/[0.07] rounded-2xl px-6 py-10 lg:py-12">
            <h4 className="text-white font-bold text-[1.35rem] tracking-tight mb-2">
              Want to know which offer applies to you?
            </h4>
            <p className="text-white/42 text-[13.5px] mb-6 max-w-sm mx-auto leading-relaxed">
              Our Garud Tata team can help you confirm the applicable benefits for your model and variant.
            </p>
            <button
              onClick={scrollToEnquiry}
              className="
                inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full
                bg-[#0055A5] hover:bg-[#1A70D4]
                text-white font-bold text-[12.5px] tracking-[0.07em]
                shadow-[0_5px_22px_rgba(0,85,165,0.42)]
                hover:-translate-y-0.5 transition-all duration-200 group
              "
            >
              GET MY OFFER
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-150" />
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-[10.5px] text-white/20 mt-10 max-w-3xl mx-auto text-center leading-relaxed">
            *Offers are subject to applicable model, variant, MY, customer and campaign eligibility. Exchange,
            scrappage and loyalty benefits may be combined only where applicable. Benefits and terms may change.
            Please confirm the applicable offer with Garud Tata at the time of enquiry. All India · All amounts in INR · MY25/MY24 Consumer Offer.
          </p>
        </div>
      </section>

      {/* ══════════════ ENQUIRY SECTION ══════════════ */}
      <div ref={enquiryRef}>
        <EnquiryForm
          preselectedCar={preselectedCar}
          preselectedType={preselectedType}
        />
      </div>
    </>
  );
}