











// "use client";

// // ─────────────────────────────────────────────────────────────────────────────
// // components/Offers.tsx
// // Offer list page. Card/button clicks navigate to /offers/[slug].
// // Data is imported from lib/tata-offers — do NOT duplicate here.
// //
// // SCROLL CONTRACT:
// // ✅ User has 100% control over page scroll position at all times.
// // ✅ No scrollIntoView(), window.scrollTo(), element.focus() that causes scroll,
// //    href="#..." anchors, or any other scroll API is used anywhere in this file.
// // ✅ router.push uses { scroll: false } so Next.js does not auto-scroll on nav.
// // ✅ EnquiryForm has no id="enquiry" and no auto-focus effect.
// // ✅ QuickOfferModal nameRef.current?.focus() is kept (it's inside a modal overlay,
// //    the body is scroll-locked so it cannot move the page).
// // ─────────────────────────────────────────────────────────────────────────────

// import {
//   useState, useRef, useEffect, useMemo, useCallback, memo,
//   type FormEvent, type ReactNode,
// } from "react";
// import {
//   motion, AnimatePresence, useInView, useMotionValue,
//   useSpring, useReducedMotion,
// } from "framer-motion";
// import {
//   ArrowRight, Tag, RefreshCcw, Trash2, Heart, Zap, Loader2,
//   CheckCircle2, Info, Car, Fuel, ChevronRight, ChevronDown, X,
// } from "lucide-react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// import {
//   OFFERS, CARS, SHOWROOMS, ENQUIRY_TYPES, LAST_UPDATED, formatINR, BENEFIT_ROWS,
//   type TataOffer, type EnquiryType,
// } from "@/lib/tata-offers";

// /* ── ANALYTICS ──────────────────────────────────────────────────────── */
// declare global { interface Window { fbq?: (...args: unknown[]) => void; } }
// function track(event: string, params?: Record<string, string | number>) {
//   if (typeof window !== "undefined" && typeof window.fbq === "function")
//     window.fbq("track", event, params);
// }
// const trackViewOffer      = (id: string)              => track("ViewContent", { content_name: id });
// const trackGetOfferClick  = (id: string, model: string) => track("Lead", { content_name: model, offer_id: id, source: "GetOfferClick" });
// const trackTestDriveClick = (model: string)           => track("Lead", { content_name: model, source: "TestDriveClick" });
// const trackQuickModalOpen = ()                        => track("Lead", { source: "QuickOfferModalOpen" });

// /* ── HELPERS ────────────────────────────────────────────────────────── */
// const BENEFIT_ROW_ICONS = {
//   consumerOffer:    Tag,
//   exchangeBenefit:  RefreshCcw,
//   scrappageBenefit: Trash2,
//   loyaltyBenefit:   Heart,
// } as const;

// const FILTERS = ["ALL", "SUV", "Hatchback", "EV", "MY25", "MY24"] as const;
// type FilterKey = (typeof FILTERS)[number];

// function matchesFilter(o: TataOffer, f: FilterKey) {
//   if (f === "ALL")              return true;
//   if (f === "MY25" || f === "MY24") return o.modelYear === f;
//   return o.category === f;
// }

// async function submitEnquiry(payload: {
//   name: string; mobile: string; car: string; source: string;
// }) {
//   const res = await fetch("/api/enquiry", {
//     method:  "POST",
//     headers: { "Content-Type": "application/json" },
//     body:    JSON.stringify(payload),
//   });
//   const data = await res.json().catch(() => ({}));
//   if (!res.ok) throw new Error(data?.error ?? "Submission failed. Please try again.");
//   return data as { success: true; id: string; message: string };
// }

// /* ── ANIMATED NUMBER ────────────────────────────────────────────────── */
// function AnimatedAmount({
//   value, active, className,
// }: { value: number; active: boolean; className?: string }) {
//   const prefersReduced = useReducedMotion();
//   const mv             = useMotionValue(0);
//   const spring         = useSpring(mv, { stiffness: 80, damping: 20 });
//   const [display, setDisplay] = useState(prefersReduced ? value : 0);

//   useEffect(() => {
//     if (prefersReduced) { setDisplay(value); return; }
//     mv.set(0);
//     if (active) mv.set(value);
//   }, [active, value, prefersReduced, mv]);

//   useEffect(() => {
//     if (prefersReduced) return;
//     return spring.on("change", v => setDisplay(Math.round(v)));
//   }, [spring, prefersReduced]);

//   return <span className={className}>{formatINR(display)}</span>;
// }

// /* ── COMBINABILITY TOOLTIP ──────────────────────────────────────────── */
// function CombineNote({ compact = false }: { compact?: boolean }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <div className="relative inline-flex">
//       <button
//         type="button"
//         onClick={() => setOpen(o => !o)}
//         onBlur={() => setTimeout(() => setOpen(false), 150)}
//         aria-expanded={open}
//         aria-label="Benefit combination details"
//         className={`flex items-center gap-1.5 rounded-full border border-[#0055A5]/30 bg-[#0055A5]/12 text-[#7DB8F7] hover:bg-[#0055A5]/20 transition-colors duration-150 ${compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-[11px]"}`}
//       >
//         <Info size={compact ? 10 : 11} strokeWidth={2.2} />
//         {compact ? "Combinable" : "+ Exchange + Scrappage + Loyalty"}
//       </button>
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             role="tooltip"
//             initial={{ opacity: 0, y: 4, scale: 0.97 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 4, scale: 0.97 }}
//             transition={{ duration: 0.13 }}
//             className="absolute z-40 top-full left-0 mt-2 w-64 bg-[#132035] border border-white/[0.12] rounded-xl p-3.5 text-[11px] leading-relaxed text-white/55 shadow-[0_16px_40px_rgba(0,0,0,0.55)]"
//           >
//             Benefits are subject to model, variant, customer and campaign eligibility.
//             Please confirm the applicable offer with Garud Tata.
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// /* ── CUSTOM DROPDOWN ────────────────────────────────────────────────── */
// function CustomSelect({
//   label, value, onChange, options, placeholder, fieldRef,
// }: {
//   label: string; value: string; onChange: (v: string) => void;
//   options: readonly string[]; placeholder: string;
//   fieldRef?: React.Ref<HTMLButtonElement>;
// }) {
//   const [open, setOpen]           = useState(false);
//   const [highlighted, setHigh]    = useState(0);
//   const wrapRef                   = useRef<HTMLDivElement>(null);
//   const listId                    = useRef(`listbox-${label.replace(/\s+/g, "-").toLowerCase()}`);

//   useEffect(() => {
//     if (!open) return;
//     function onDocClick(e: MouseEvent) {
//       if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
//     }
//     document.addEventListener("mousedown", onDocClick);
//     return () => document.removeEventListener("mousedown", onDocClick);
//   }, [open]);

//   useEffect(() => {
//     if (open) setHigh(Math.max(0, options.indexOf(value)));
//   }, [open, value, options]);

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
//       e.preventDefault(); setOpen(true); return;
//     }
//     if (!open) return;
//     if (e.key === "ArrowDown")        { e.preventDefault(); setHigh(i => Math.min(i + 1, options.length - 1)); }
//     else if (e.key === "ArrowUp")     { e.preventDefault(); setHigh(i => Math.max(i - 1, 0)); }
//     else if (e.key === "Enter")       { e.preventDefault(); onChange(options[highlighted]); setOpen(false); }
//     else if (e.key === "Escape")      { e.preventDefault(); setOpen(false); }
//     else if (e.key === "Tab")         { setOpen(false); }
//   };

//   return (
//     <div ref={wrapRef} className="relative">
//       <label className="block text-[10px] text-white/35 mb-1.5 tracking-[0.18em] uppercase font-bold">
//         {label}
//       </label>
//       <button
//         ref={fieldRef}
//         type="button"
//         onClick={() => setOpen(o => !o)}
//         onKeyDown={handleKeyDown}
//         aria-haspopup="listbox"
//         aria-expanded={open}
//         aria-controls={listId.current}
//         className="w-full flex items-center justify-between gap-2 bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3.5 min-h-[52px] text-left text-[16px] sm:text-[13.5px] focus:outline-none focus:border-[#0055A5]/65 focus:bg-[#0055A5]/[0.08] transition-colors duration-200"
//       >
//         <span className={`truncate ${value ? "text-white" : "text-white/25"}`}>
//           {value || placeholder}
//         </span>
//         <ChevronDown
//           size={16} strokeWidth={2.4}
//           className={`flex-shrink-0 text-white/35 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
//         />
//       </button>
//       <AnimatePresence>
//         {open && (
//           <motion.ul
//             id={listId.current}
//             role="listbox"
//             tabIndex={-1}
//             initial={{ opacity: 0, y: -6, scale: 0.98 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -6, scale: 0.98 }}
//             transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
//             className="absolute z-50 mt-2 w-full max-h-64 overflow-y-auto rounded-xl border border-white/[0.12] bg-[#132035] shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-1.5"
//           >
//             {options.map((opt, i) => (
//               <li
//                 key={opt}
//                 role="option"
//                 aria-selected={value === opt}
//                 onMouseEnter={() => setHigh(i)}
//                 onClick={() => { onChange(opt); setOpen(false); }}
//                 className={`flex items-center justify-between gap-2 px-3.5 py-3 sm:py-2.5 rounded-lg cursor-pointer select-none text-[15px] sm:text-[13.5px] transition-colors duration-100
//                   ${i === highlighted ? "bg-[#0055A5]/20" : ""}
//                   ${value === opt ? "text-[#7DB8F7] font-semibold" : "text-white/70"}`}
//               >
//                 {opt}
//                 {value === opt && <CheckCircle2 size={14} className="text-[#5BA3E8] flex-shrink-0" />}
//               </li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// /* ── FILTER BAR ─────────────────────────────────────────────────────── */
// function FilterBar({ active, onChange }: { active: FilterKey; onChange: (f: FilterKey) => void }) {
//   const icons: Partial<Record<FilterKey, ReactNode>> = {
//     EV: <Zap size={11} />, SUV: <Car size={11} />, Hatchback: <Fuel size={11} />,
//   };
//   return (
//     <div className="flex gap-2 overflow-x-auto pb-1 -mx-5 px-5 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//       {FILTERS.map(f => (
//         <button
//           key={f}
//           onClick={() => onChange(f)}
//           aria-pressed={active === f}
//           className="relative flex-shrink-0 px-5 py-2.5 rounded-full text-[12.5px] font-semibold whitespace-nowrap transition-colors duration-200 min-h-[40px]"
//         >
//           {active === f && (
//             <motion.span
//               layoutId="filter-pill"
//               transition={{ type: "spring", stiffness: 380, damping: 32 }}
//               className="absolute inset-0 rounded-full bg-[#0055A5] shadow-[0_4px_18px_rgba(0,85,165,0.45)]"
//             />
//           )}
//           <span className={`relative z-10 flex items-center gap-1.5 ${active === f ? "text-white" : "text-white/45 hover:text-white/80"}`}>
//             {icons[f]}{f}
//           </span>
//           {active !== f && (
//             <span className="absolute inset-0 rounded-full border border-white/[0.09] bg-white/[0.03]" />
//           )}
//         </button>
//       ))}
//     </div>
//   );
// }

// /* ── BADGES ─────────────────────────────────────────────────────────── */
// function ModelBadges({ offer }: { offer: TataOffer }) {
//   return (
//     <div className="flex items-center gap-1.5 flex-wrap">
//       <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-[0.14em] uppercase ${offer.modelYear === "MY25" ? "bg-[#0055A5]/25 text-[#7DB8F7] border border-[#0055A5]/35" : "bg-white/[0.07] text-white/50 border border-white/[0.12]"}`}>
//         {offer.modelYear}
//       </span>
//       {offer.category === "EV" && (
//         <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black tracking-[0.14em] uppercase bg-emerald-500/12 text-emerald-300 border border-emerald-400/25">
//           <Zap size={9} strokeWidth={2.5} /> EV
//         </span>
//       )}
//       {offer.eligibility && (
//         <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-[0.14em] uppercase bg-amber-500/10 text-amber-300 border border-amber-400/22">
//           LIMITED
//         </span>
//       )}
//     </div>
//   );
// }

// /* ── FEATURED CARD ──────────────────────────────────────────────────── */
// const FeaturedCard = memo(function FeaturedCard({
//   offer, onGetOffer, onTestDrive,
// }: {
//   offer: TataOffer;
//   onGetOffer:  (o: TataOffer) => void;
//   onTestDrive: (o: TataOffer) => void;
// }) {
//   const ref            = useRef<HTMLDivElement>(null);
//   const inView         = useInView(ref, { once: true, margin: "-60px" });
//   const prefersReduced = useReducedMotion();

//   useEffect(() => { if (inView) trackViewOffer(offer.id); }, [inView, offer.id]);

//   const activeBenefitRows = BENEFIT_ROWS.filter(
//     r => typeof offer[r.key] === "number" && (offer[r.key] as number) > 0
//   );

//   return (
//     <motion.div
//       ref={ref}
//       initial={prefersReduced ? false : { opacity: 0, y: 24 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//       className="relative overflow-hidden rounded-3xl mb-8 bg-gradient-to-br from-[#142238] via-[#0F1C30] to-[#0C1624] border border-white/[0.09]"
//     >
//       <div className="hidden sm:block absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#0055A5]/12 blur-[120px] pointer-events-none" />
//       <div className="hidden sm:block absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#1A70D4]/7 blur-[90px] pointer-events-none" />

//       <div className="relative z-10 p-5 sm:p-7 lg:p-10">
//         <div className="flex items-center gap-2 mb-6 flex-wrap">
//           <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0055A5]/22 border border-[#0055A5]/45 text-[#7DB8F7] text-[10px] font-bold tracking-[0.22em] uppercase">
//             <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8] animate-pulse" />
//             FEATURED OFFER
//           </span>
//           <ModelBadges offer={offer} />
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
//           <div>
//             <h3 className="text-white font-extrabold text-[1.9rem] sm:text-[2.2rem] lg:text-[2.8rem] tracking-[-0.02em] leading-[1.0] mb-1">
//               {offer.model}
//             </h3>
//             <p className="text-white/38 text-[13px] font-medium mb-6">
//               {offer.variantLabel ?? offer.category} · {offer.modelYear}
//             </p>

//             <p className="text-[9px] font-bold tracking-[0.22em] text-[#5BA3E8]/65 uppercase mb-2">
//               Maximum Eligible Benefits
//             </p>
//             <AnimatedAmount
//               value={offer.totalBenefit}
//               active={inView}
//               className="block text-white font-extrabold text-[2.6rem] sm:text-[3.4rem] lg:text-[4.2rem] tracking-[-0.03em] leading-none mb-2"
//             />
//             <p className="text-white/25 text-[11px] mb-6">Up to, on eligible variants*</p>

//             <div className="flex flex-wrap gap-3 mb-6">
//               <button
//                 onClick={() => onGetOffer(offer)}
//                 className="group/btn flex items-center gap-2.5 px-7 py-3.5 rounded-full min-h-[48px] bg-[#0055A5] hover:bg-[#1A70D4] text-white font-bold text-[12.5px] tracking-[0.07em] shadow-[0_6px_28px_rgba(0,85,165,0.45)] hover:-translate-y-0.5 transition-all duration-200"
//               >
//                 GET {offer.model.replace("Tata ", "").toUpperCase()} OFFER
//                 <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-150" />
//               </button>
//               <button
//                 onClick={() => onTestDrive(offer)}
//                 className="px-7 py-3.5 rounded-full min-h-[48px] bg-white/[0.06] border border-white/[0.15] hover:border-white/30 hover:bg-white/[0.10] text-white font-medium text-[12.5px] tracking-[0.05em] transition-all duration-200"
//               >
//                 TEST DRIVE
//               </button>
//             </div>
//           </div>

//           <div className="lg:min-w-[240px] bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
//             <p className="text-[9px] font-bold tracking-[0.18em] text-white/30 uppercase mb-4">
//               Benefit Breakdown
//             </p>
//             <div className="space-y-3">
//               {activeBenefitRows.map(({ key, label }) => {
//                 const Icon = BENEFIT_ROW_ICONS[key];
//                 return (
//                   <div key={key} className="flex items-center justify-between gap-6">
//                     <span className="flex items-center gap-2 text-white/42 text-[12.5px]">
//                       <Icon size={13} className="text-[#0055A5]/75 flex-shrink-0" strokeWidth={2} />
//                       {label}
//                     </span>
//                     <span className="text-white/80 text-[13px] font-bold tabular-nums whitespace-nowrap">
//                       {formatINR(offer[key] as number)}
//                     </span>
//                   </div>
//                 );
//               })}
//             </div>
//             {activeBenefitRows.length >= 2 && (
//               <div className="mt-4 pt-3 border-t border-white/[0.07]">
//                 <CombineNote />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// });

// /* ── DESKTOP TABLE ROW ──────────────────────────────────────────────── */
// const OfferTableRow = memo(function OfferTableRow({
//   offer, index, onGetOffer, onTestDrive,
// }: {
//   offer: TataOffer; index: number;
//   onGetOffer:  (o: TataOffer) => void;
//   onTestDrive: (o: TataOffer) => void;
// }) {
//   const ref            = useRef<HTMLDivElement>(null);
//   const inView         = useInView(ref, { once: true, margin: "-40px" });
//   const prefersReduced = useReducedMotion();

//   useEffect(() => { if (inView) trackViewOffer(offer.id); }, [inView, offer.id]);

//   const activeBenefitRows = BENEFIT_ROWS.filter(
//     r => typeof offer[r.key] === "number" && (offer[r.key] as number) > 0
//   );

//   return (
//     <Link href={`/offers/${offer.id}`} className="group block">
//       <motion.div
//         ref={ref}
//         initial={prefersReduced ? false : { opacity: 0, x: -16 }}
//         animate={inView ? { opacity: 1, x: 0 } : {}}
//         transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.05, 0.3) }}
//         className="relative grid items-center gap-5 px-5 py-4 border-b border-white/[0.05] last:border-0 hover:bg-white/[0.03] transition-colors duration-200"
//         style={{ gridTemplateColumns: "minmax(190px,1fr) 1fr minmax(130px,auto) auto" }}
//       >
//         <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#0055A5] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />

//         {/* Model info */}
//         <div className="min-w-0 pl-3">
//           <ModelBadges offer={offer} />
//           <p className="text-white/90 font-bold text-[14.5px] tracking-tight mt-1.5 group-hover:translate-x-0.5 transition-transform duration-200 truncate">
//             {offer.model}
//           </p>
//           <p className="text-white/32 text-[11px] font-medium truncate">
//             {offer.variantLabel ?? offer.category}
//           </p>
//         </div>

//         {/* Benefit breakdown */}
//         <div className="flex flex-wrap gap-x-4 gap-y-2">
//           {activeBenefitRows.length === 0 ? (
//             <span className="text-white/25 text-[11px] italic">Available on enquiry</span>
//           ) : activeBenefitRows.map(({ key, short }) => {
//             const Icon = BENEFIT_ROW_ICONS[key];
//             return (
//               <div key={key} className="flex flex-col gap-0.5 min-w-[68px]">
//                 <span className="flex items-center gap-1 text-[10px] text-white/32 font-medium">
//                   <Icon size={10} strokeWidth={2} className="text-[#0055A5]/65 flex-shrink-0" />
//                   {short}
//                 </span>
//                 <span className="text-white/70 text-[12.5px] font-bold tabular-nums">
//                   {formatINR(offer[key] as number)}
//                 </span>
//               </div>
//             );
//           })}
//         </div>

//         {/* Total */}
//         <div className="text-right">
//           <p className="text-[8.5px] font-bold tracking-[0.18em] text-white/28 uppercase mb-0.5">Total</p>
//           <AnimatedAmount
//             value={offer.totalBenefit}
//             active={inView}
//             className="block text-white/90 font-extrabold text-[1.3rem] tracking-tight leading-none group-hover:text-[#7DB8F7] transition-colors duration-300"
//           />
//           <p className="text-white/20 text-[9.5px] mt-0.5">Up to*</p>
//         </div>

//         {/* Action buttons — stopPropagation so Link doesn't fire */}
//         <div className="flex flex-col gap-1.5 items-end" onClick={e => e.preventDefault()}>
//           <button
//             onClick={e => { e.preventDefault(); onGetOffer(offer); }}
//             className="group/btn flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0055A5] hover:bg-[#1A70D4] text-white font-bold text-[11px] tracking-[0.07em] whitespace-nowrap shadow-[0_3px_14px_rgba(0,85,165,0.3)] transition-all duration-200"
//           >
//             GET OFFER <ChevronRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform duration-150" />
//           </button>
//           <button
//             onClick={e => { e.preventDefault(); onTestDrive(offer); }}
//             className="px-4 py-1.5 rounded-lg border border-white/[0.10] hover:border-white/25 text-white/40 hover:text-white/80 text-[10.5px] font-semibold tracking-[0.06em] whitespace-nowrap transition-all duration-150"
//           >
//             TEST DRIVE
//           </button>
//         </div>
//       </motion.div>
//     </Link>
//   );
// });

// /* ── MOBILE CARD ────────────────────────────────────────────────────── */
// const MobileOfferCard = memo(function MobileOfferCard({
//   offer, index, onGetOffer, onTestDrive,
// }: {
//   offer: TataOffer; index: number;
//   onGetOffer:  (o: TataOffer) => void;
//   onTestDrive: (o: TataOffer) => void;
// }) {
//   const ref            = useRef<HTMLDivElement>(null);
//   const inView         = useInView(ref, { once: true, margin: "-40px" });
//   const prefersReduced = useReducedMotion();

//   useEffect(() => { if (inView) trackViewOffer(offer.id); }, [inView, offer.id]);

//   const activeBenefitRows = BENEFIT_ROWS.filter(
//     r => typeof offer[r.key] === "number" && (offer[r.key] as number) > 0
//   );

//   return (
//     <motion.div
//       ref={ref}
//       initial={prefersReduced ? false : { opacity: 0, y: 16 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.04, 0.24) }}
//       className="bg-[#132035] border border-white/[0.08] rounded-2xl p-4 sm:p-5 mb-3 last:mb-0"
//     >
//       <Link href={`/offers/${offer.id}`} className="block">
//         <div className="flex items-start justify-between gap-3 mb-3">
//           <div className="min-w-0">
//             <ModelBadges offer={offer} />
//             <h3 className="text-white/90 font-extrabold text-[1.02rem] tracking-tight mt-1.5 truncate">
//               {offer.model}
//             </h3>
//             <p className="text-white/35 text-[11px] mt-0.5 truncate">
//               {offer.variantLabel ?? offer.category}
//             </p>
//           </div>
//           <div className="text-right flex-shrink-0">
//             <p className="text-[8.5px] font-bold tracking-[0.18em] text-white/28 uppercase mb-0.5">TOTAL</p>
//             <AnimatedAmount
//               value={offer.totalBenefit}
//               active={inView}
//               className="block text-white/90 font-extrabold text-[1.35rem] tracking-tight leading-none"
//             />
//             <p className="text-white/20 text-[9px] mt-0.5">Up to*</p>
//           </div>
//         </div>

//         {activeBenefitRows.length > 0 && (
//           <div className="space-y-2 border-t border-white/[0.06] pt-3 mb-4">
//             {activeBenefitRows.map(({ key, label }) => {
//               const Icon = BENEFIT_ROW_ICONS[key];
//               return (
//                 <div key={key} className="flex items-center justify-between">
//                   <span className="flex items-center gap-1.5 text-white/38 text-[11.5px]">
//                     <Icon size={11} className="text-[#0055A5]/65 flex-shrink-0" strokeWidth={2} />
//                     {label}
//                   </span>
//                   <span className="text-white/65 text-[12px] font-semibold tabular-nums">
//                     {formatINR(offer[key] as number)}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </Link>

//       <div className="flex gap-2">
//         <button
//           onClick={() => onGetOffer(offer)}
//           className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-lg min-h-[44px] bg-[#0055A5] active:bg-[#1A70D4] text-white font-bold text-[12px] tracking-[0.06em] transition-colors duration-150"
//         >
//           GET OFFER <ArrowRight size={12} />
//         </button>
//         <button
//           onClick={() => onTestDrive(offer)}
//           className="px-4 py-3 rounded-lg min-h-[44px] border border-white/[0.10] active:border-white/25 text-white/45 active:text-white text-[11px] font-semibold tracking-[0.06em] transition-colors duration-150"
//         >
//           TEST DRIVE
//         </button>
//       </div>
//     </motion.div>
//   );
// });

// /* ── BACKGROUND ─────────────────────────────────────────────────────── */
// function Background() {
//   const prefersReduced = useReducedMotion();
//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       <div
//         className="absolute inset-0 opacity-[0.025]"
//         style={{
//           backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
//           backgroundSize: "72px 72px",
//         }}
//       />
//       <motion.div
//         className="hidden sm:block absolute top-[8%] left-[10%] w-[700px] h-[700px] rounded-full bg-[#0055A5]/7 blur-[160px]"
//         animate={prefersReduced ? undefined : { x: [0, 50, -20, 0], y: [0, -40, 20, 0] }}
//         transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="hidden sm:block absolute bottom-[5%] right-[5%] w-[500px] h-[500px] rounded-full bg-[#1A70D4]/5 blur-[130px]"
//         animate={prefersReduced ? undefined : { x: [0, -35, 15, 0], y: [0, 25, -35, 0] }}
//         transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }}
//       />
//     </div>
//   );
// }

// /* ── QUICK MODAL FORM ────────────────────────────────────────────────── */
// const fieldClass = "w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3.5 min-h-[52px] text-white text-[16px] sm:text-[13.5px] placeholder:text-white/25 focus:outline-none focus:border-[#0055A5]/65 focus:bg-[#0055A5]/[0.07] transition-colors duration-200";

// function QuickOfferModal({
//   open, onClose, defaultCar,
// }: {
//   open: boolean; onClose: () => void; defaultCar?: string;
// }) {
//   const [form, setForm]       = useState({ name: "", mobile: "", car: defaultCar ?? "" });
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError]     = useState("");
//   const nameRef               = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (open) {
//       trackQuickModalOpen();
//       setSubmitted(false);
//       setError("");
//       setForm(p => ({ ...p, car: defaultCar ?? p.car }));
//       // ✅ focus() inside modal is safe — body scroll is locked,
//       //    so the browser cannot scroll the page to reach this input.
//       setTimeout(() => nameRef.current?.focus(), 250);
//       const prevOverflow = document.body.style.overflow;
//       document.body.style.overflow = "hidden";
//       return () => { document.body.style.overflow = prevOverflow; };
//     }
//   }, [open, defaultCar]);

//   useEffect(() => {
//     function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
//     if (open) document.addEventListener("keydown", onKey);
//     return () => document.removeEventListener("keydown", onKey);
//   }, [open, onClose]);

//   const handleSubmit = useCallback(async (e: FormEvent) => {
//     e.preventDefault();
//     if (loading) return;
//     setError("");
//     if (!form.name.trim())                          { setError("Please enter your name.");                       return; }
//     if (form.mobile.replace(/\D/g, "").length < 10) { setError("Please enter a valid 10-digit mobile number."); return; }
//     if (!form.car)                                  { setError("Please select a car.");                          return; }

//     setLoading(true);
//     try {
//       await submitEnquiry({ name: form.name, mobile: form.mobile, car: form.car, source: "quick-offer-modal" });
//       setSubmitted(true);
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [form, loading]);

//   return (
//     <AnimatePresence>
//       {open && (
//         <motion.div
//           className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
//           initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//           transition={{ duration: 0.18 }}
//         >
//           <motion.div
//             className="absolute inset-0 bg-black/65 backdrop-blur-sm"
//             onClick={onClose}
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//           />
//           <motion.div
//             role="dialog" aria-modal="true" aria-labelledby="quick-offer-title"
//             initial={{ opacity: 0, y: 40, scale: 0.98 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 40, scale: 0.98 }}
//             transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
//             className="relative z-10 w-full sm:max-w-[420px] bg-[#132035] border border-white/[0.10] rounded-t-3xl sm:rounded-3xl p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:p-7 shadow-[0_30px_80px_rgba(0,0,0,0.65)] max-h-[92vh] overflow-y-auto"
//           >
//             <button
//               type="button" onClick={onClose} aria-label="Close"
//               className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.10] text-white/45 active:text-white transition-colors"
//             >
//               <X size={16} />
//             </button>
//             {submitted ? (
//               <div className="py-6 text-center">
//                 <div className="w-12 h-12 rounded-full bg-[#0055A5]/18 border border-[#0055A5]/35 flex items-center justify-center mx-auto mb-4">
//                   <CheckCircle2 size={24} className="text-[#7DB8F7]" />
//                 </div>
//                 <h3 className="text-white font-extrabold text-[1.3rem] tracking-tight mb-2">Enquiry Received!</h3>
//                 <p className="text-white/42 text-[13.5px] leading-relaxed mb-6">Our team will get in touch shortly.</p>
//                 <button type="button" onClick={onClose} className="w-full py-3.5 min-h-[48px] rounded-xl bg-[#0055A5] text-white font-bold text-[12.5px] tracking-[0.06em]">
//                   DONE
//                 </button>
//               </div>
//             ) : (
//               <>
//                 <h3 id="quick-offer-title" className="text-white font-extrabold text-[1.35rem] tracking-tight mb-5 pr-8">
//                   Get Your Offer
//                 </h3>
//                 <form onSubmit={handleSubmit} noValidate className="space-y-4">
//                   <div>
//                     <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">Name</label>
//                     <input
//                       ref={nameRef} type="text" required autoComplete="name"
//                       value={form.name}
//                       onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
//                       placeholder="Your full name"
//                       className={fieldClass}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">Mobile</label>
//                     <input
//                       type="tel" required inputMode="numeric" autoComplete="tel" maxLength={15}
//                       value={form.mobile}
//                       onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))}
//                       placeholder="+91 00000 00000"
//                       className={fieldClass}
//                     />
//                   </div>
//                   <CustomSelect
//                     label="Car of Interest" value={form.car}
//                     onChange={v => setForm(p => ({ ...p, car: v }))}
//                     options={CARS} placeholder="Choose a model"
//                   />
//                   {error && <p role="alert" className="text-red-400 text-[12.5px]">{error}</p>}
//                   <button
//                     type="submit" disabled={loading}
//                     className="w-full flex items-center justify-center gap-2 py-3.5 min-h-[50px] rounded-xl bg-[#0055A5] disabled:opacity-55 text-white font-extrabold text-[13px] tracking-[0.07em] shadow-[0_6px_22px_rgba(0,85,165,0.38)]"
//                   >
//                     {loading ? <Loader2 size={17} className="animate-spin" /> : (<>GET MY OFFER <ArrowRight size={15} /></>)}
//                   </button>
//                   <p className="text-[10px] text-white/18 text-center">*T&C apply. Our team will contact you within 24 hrs.</p>
//                 </form>
//               </>
//             )}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// /* ── ENQUIRY FORM (in-page) ──────────────────────────────────────────── */
// /*
//  * SCROLL CONTRACT for EnquiryForm:
//  * ✅ NO id="enquiry" — prevents href="#enquiry" anywhere in the app from jumping here.
//  * ✅ NO nameRef.current?.focus() — auto-focus causes the browser to scroll to the input.
//  *    The preselectedCar / preselectedType useEffect only updates form state, not focus.
//  * ✅ The pre-fill banner is purely visual; it does not scroll or focus anything.
//  */
// interface EnquiryFormProps {
//   preselectedCar?:  string;
//   preselectedType?: EnquiryType;
// }

// function EnquiryForm({ preselectedCar, preselectedType }: EnquiryFormProps) {
//   const [form, setForm] = useState({
//     name:     "",
//     mobile:   "",
//     car:      preselectedCar ?? "",
//     type:     (preselectedType ?? "Get Offer") as EnquiryType,
//     showroom: "",
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading]     = useState(false);
//   const [error, setError]         = useState("");

//   // ✅ Only updates form state — no focus(), no scrollIntoView(), no scroll API.
//   useEffect(() => {
//     setForm(prev => ({
//       ...prev,
//       car:  preselectedCar  ?? prev.car,
//       type: preselectedType ?? prev.type,
//     }));
//   }, [preselectedCar, preselectedType]);

//   const handleSubmit = useCallback(async (e: FormEvent) => {
//     e.preventDefault();
//     if (loading) return;
//     setError("");
//     if (!form.name.trim())                          { setError("Please enter your name.");                       return; }
//     if (form.mobile.replace(/\D/g, "").length < 10) { setError("Please enter a valid 10-digit mobile number."); return; }
//     if (!form.car)                                  { setError("Please select a car.");                          return; }
//     if (!form.showroom)                             { setError("Please select a showroom.");                     return; }

//     setLoading(true);
//     try {
//       await submitEnquiry({
//         name:   form.name,
//         mobile: form.mobile,
//         car:    form.car,
//         source: `garud-tata-offers | type=${form.type} | showroom=${form.showroom}`,
//       });
//       setSubmitted(true);
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [form, loading]);

//   return (
//     /*
//      * ✅ NO id="enquiry" — the old id was a hash target that caused page jumps.
//      * ✅ NO scroll-mt — only relevant when used as a hash anchor target.
//      */
//     <section className="bg-[#0D1829] py-16 sm:py-20 lg:py-28 px-5 lg:px-12">
//       <div className="max-w-[600px] mx-auto">
//         <div className="text-center mb-8 sm:mb-10">
//           <span className="text-[10px] font-bold tracking-[0.26em] text-[#7DB8F7] uppercase mb-3 block">
//             GARUD TATA · ENQUIRY
//           </span>
//           <h2 className="text-white font-extrabold text-[clamp(1.7rem,6vw,2.8rem)] tracking-tight leading-[1.05] mb-3">
//             Let's Get You<br />Behind the Wheel
//           </h2>
//           <p className="text-white/42 text-[13.5px] sm:text-[14px] max-w-md mx-auto leading-relaxed">
//             Tell us what you're interested in and the Garud Tata team will get in touch.
//           </p>
//         </div>

//         <div className="bg-[#132035] border border-white/[0.08] rounded-3xl p-5 sm:p-6 lg:p-8">
//           {submitted ? (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.97 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="py-8 sm:py-10 text-center"
//             >
//               <div className="w-14 h-14 rounded-full bg-[#0055A5]/18 border border-[#0055A5]/35 flex items-center justify-center mx-auto mb-5">
//                 <CheckCircle2 size={28} className="text-[#7DB8F7]" />
//               </div>
//               <h3 className="text-white font-extrabold text-[1.4rem] sm:text-[1.5rem] tracking-tight mb-2">
//                 Enquiry Received!
//               </h3>
//               <p className="text-white/42 text-[13.5px] sm:text-[14px] leading-relaxed mb-8 max-w-xs mx-auto">
//                 Our Garud Tata team will be in touch shortly.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                 <a href="tel:+919217371204" className="flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full bg-[#0055A5] text-white font-bold text-[12.5px] tracking-[0.06em]">
//                   CALL NOW
//                 </a>
//                 <a href="https://wa.me/919217371204" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full bg-white/[0.06] border border-white/[0.15] text-white font-medium text-[12.5px] tracking-[0.04em]">
//                   WHATSAPP US
//                 </a>
//               </div>
//             </motion.div>
//           ) : (
//             <form onSubmit={handleSubmit} noValidate className="space-y-4">
//               {/* Pre-fill banner — purely visual, no focus/scroll side-effects */}
//               {(preselectedCar || preselectedType) && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="flex items-center gap-3 bg-[#0055A5]/10 border border-[#0055A5]/22 rounded-xl px-4 py-3"
//                 >
//                   <CheckCircle2 size={15} className="text-[#7DB8F7] flex-shrink-0" />
//                   <div className="min-w-0 text-[12px]">
//                     <span className="text-white font-semibold">{preselectedCar}</span>
//                     {preselectedType && <span className="text-white/42"> · {preselectedType}</span>}
//                     <span className="text-white/30"> — pre-filled</span>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Name — NO autoFocus */}
//               <div>
//                 <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">Name</label>
//                 <input
//                   type="text" required autoComplete="name"
//                   value={form.name}
//                   onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
//                   placeholder="Your full name"
//                   className={fieldClass}
//                   // ✅ No autoFocus — would cause the browser to scroll to this input
//                 />
//               </div>

//               {/* Mobile */}
//               <div>
//                 <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">Mobile Number</label>
//                 <input
//                   type="tel" required inputMode="numeric" autoComplete="tel" maxLength={15}
//                   value={form.mobile}
//                   onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))}
//                   placeholder="+91 00000 00000"
//                   className={fieldClass}
//                 />
//               </div>

//               <CustomSelect
//                 label="Interested Car"
//                 value={form.car}
//                 onChange={v => setForm(p => ({ ...p, car: v }))}
//                 options={CARS}
//                 placeholder="Select a model"
//               />

//               {/* Enquiry type pills */}
//               <div>
//                 <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">Enquiry Type</label>
//                 <div className="flex flex-wrap gap-2">
//                   {ENQUIRY_TYPES.map(t => (
//                     <button
//                       key={t} type="button"
//                       onClick={() => setForm(p => ({ ...p, type: t }))}
//                       className={`px-3.5 py-2.5 rounded-lg text-[12px] font-semibold tracking-[0.04em] min-h-[40px] border transition-colors duration-150
//                         ${form.type === t
//                           ? "bg-[#0055A5] border-[#0055A5] text-white"
//                           : "bg-white/[0.04] border-white/[0.09] text-white/45 active:text-white"
//                         }`}
//                     >
//                       {t}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <CustomSelect
//                 label="Preferred Showroom"
//                 value={form.showroom}
//                 onChange={v => setForm(p => ({ ...p, showroom: v }))}
//                 options={SHOWROOMS}
//                 placeholder="Select a showroom"
//               />

//               {error && <p role="alert" className="text-red-400 text-[13px]">{error}</p>}

//               <button
//                 type="submit" disabled={loading}
//                 className="w-full flex items-center justify-center gap-2 py-4 rounded-xl mt-1 min-h-[52px] bg-[#0055A5] disabled:opacity-55 text-white font-extrabold text-[13.5px] tracking-[0.08em] shadow-[0_6px_24px_rgba(0,85,165,0.38)] group"
//               >
//                 {loading
//                   ? <Loader2 size={18} className="animate-spin" />
//                   : (<>SUBMIT ENQUIRY <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-150" /></>)
//                 }
//               </button>
//               <p className="text-[10.5px] text-white/18 text-center leading-relaxed pt-0.5">
//                 *T&C apply. Subject to eligibility.
//               </p>
//             </form>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ── MAIN EXPORT ────────────────────────────────────────────────────── */
// export default function CurrentTataOffers() {
//   const router = useRouter();

//   const [filter, setFilter]               = useState<FilterKey>("ALL");
//   const [preselectedCar, setPreselectedCar]   = useState<string | undefined>();
//   const [preselectedType, setPreselectedType] = useState<EnquiryType | undefined>();
//   const [quickModalOpen, setQuickModalOpen]   = useState(false);

//   const active   = useMemo(() => OFFERS.filter(o => o.active), []);
//   const filtered = useMemo(() => active.filter(o => matchesFilter(o, filter)), [active, filter]);
//   const featured = useMemo(
//     () => filtered.find(o => o.featured) ?? (filter === "ALL" ? active.find(o => o.featured) : undefined),
//     [filtered, active, filter]
//   );
//   const standard = useMemo(() => filtered.filter(o => o.id !== featured?.id), [filtered, featured]);

//   /*
//    * ✅ handleGetOffer — navigates to the detail page.
//    *    { scroll: false } tells Next.js NOT to scroll at all after navigation.
//    *    The detail page renders from the top (CarGallery is the first component).
//    *    No hash, no query param, no scrollIntoView.
//    */
// const handleGetOffer = useCallback((offer: TataOffer) => {
//   trackGetOfferClick(offer.id, offer.model);

//   // New dynamic offer page should always start at the top.
//   router.push(`/offers/${offer.id}`);
// }, [router]);
//   /*
//    * ✅ handleTestDrive — same as above.
//    *    Navigates to the detail page from the top.
//    *    The enquiry type can be pre-selected there via defaultType prop,
//    *    but no scrolling happens — user scrolls to the form themselves.
//    */
// const handleTestDrive = useCallback((offer: TataOffer) => {
//   trackTestDriveClick(offer.model);

//   router.push(`/offers/${offer.id}`);
// }, [router]);

//   const openQuickModal  = useCallback(() => setQuickModalOpen(true),  []);
//   const closeQuickModal = useCallback(() => setQuickModalOpen(false), []);

//   // ✅ Cross-component prefill via custom event — only updates state, no scroll.
//   useEffect(() => {
//     function onPrefill(e: Event) {
//       const { car, type } = (e as CustomEvent<{ car: string; type: EnquiryType }>).detail;
//       setPreselectedCar(car);
//       setPreselectedType(type);
//       // ✅ No scrollIntoView / scrollToEnquiry call here.
//       //    The in-page form updates its dropdowns silently.
//       //    User scrolls to see the pre-filled form themselves.
//     }
//     window.addEventListener("garud:prefill", onPrefill);
//     return () => window.removeEventListener("garud:prefill", onPrefill);
//   }, []);

//   return (
//     <>
//       {/* ── Offers section ── */}
//       <section
//         id="offers"
//         className="relative bg-[#0D1829] pt-16 pb-24 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-20 overflow-hidden"
//       >
//         <Background />
//         <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-12">

//           {/* Heading */}
//           <div className="text-center mb-5">
//             <span className="text-[10px] font-bold tracking-[0.28em] text-[#7DB8F7] uppercase mb-3 block">
//               GARUD TATA · CURRENT OFFERS
//             </span>
//             <h2 className="text-white font-extrabold text-[clamp(1.9rem,7vw,3.4rem)] tracking-[-0.02em] leading-[1.04] mb-4">
//               Exclusive Tata Offers
//             </h2>
//             <p className="text-white/45 text-[13.5px] sm:text-[14.5px] max-w-lg mx-auto leading-relaxed mb-2">
//               Explore verified MY25 and MY24 consumer benefits available at Garud Tata.
//             </p>
//             <p className="text-white/28 text-[11.5px] sm:text-[12px] mb-2">
//               Exchange + Scrappage + Loyalty benefits can be combined on eligible models.
//             </p>
//             <p className="text-white/20 text-[11px]">Offers Last Updated: {LAST_UPDATED}</p>
//           </div>

//           {/* Trust badges */}
//           <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 sm:mb-12 mt-7">
//             {["Verified Offers", "MY25 & MY24 Models", "Exchange Benefits", "Test Drive Available"].map(t => (
//               <span key={t} className="flex items-center gap-1.5 text-[11px] sm:text-[11.5px] text-white/38 font-medium">
//                 <CheckCircle2 size={12} className="text-[#0055A5]" />{t}
//               </span>
//             ))}
//           </div>

//           {/* Filter bar */}
//           <div className="mb-8 sm:mb-10">
//             <FilterBar active={filter} onChange={setFilter} />
//           </div>

//           {/* Featured card */}
//           {featured && (
//             <FeaturedCard
//               offer={featured}
//               onGetOffer={handleGetOffer}
//               onTestDrive={handleTestDrive}
//             />
//           )}

//           {/* Desktop table */}
//           <div className="hidden lg:block">
//             <div className="flex items-center justify-between mb-3">
//               <p className="text-[10px] font-bold tracking-[0.2em] text-white/28 uppercase">
//                 {standard.length} offer{standard.length !== 1 ? "s" : ""} available
//               </p>
//               <p className="text-[10px] text-white/18">MY25 / MY24 · All India · All amounts in INR</p>
//             </div>
//             <div className="bg-[#102030] border border-white/[0.07] rounded-2xl overflow-hidden">
//               <div
//                 className="grid px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]"
//                 style={{ gridTemplateColumns: "minmax(190px,1fr) 1fr minmax(130px,auto) auto" }}
//               >
//                 {["Model", "Benefit Breakdown", "Total Benefits", ""].map((h, i) => (
//                   <p
//                     key={i}
//                     className={`text-[9.5px] font-bold tracking-[0.2em] text-white/25 uppercase ${i >= 2 ? "text-right" : ""} ${i === 0 ? "pl-3" : ""}`}
//                   >
//                     {h}
//                   </p>
//                 ))}
//               </div>
//               <AnimatePresence mode="popLayout">
//                 {standard.length === 0 && (
//                   <motion.p
//                     key="empty"
//                     initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                     className="text-center text-white/28 py-12 text-[13px]"
//                   >
//                     No offers found for this filter.
//                   </motion.p>
//                 )}
//                 {standard.map((offer, i) => (
//                   <OfferTableRow
//                     key={offer.id}
//                     offer={offer}
//                     index={i}
//                     onGetOffer={handleGetOffer}
//                     onTestDrive={handleTestDrive}
//                   />
//                 ))}
//               </AnimatePresence>
//             </div>
//           </div>

//           {/* Mobile cards */}
//           <div className="lg:hidden">
//             <AnimatePresence mode="popLayout">
//               {(featured ? [featured, ...standard] : standard).map((offer, i) => (
//                 <MobileOfferCard
//                   key={offer.id}
//                   offer={offer}
//                   index={i}
//                   onGetOffer={handleGetOffer}
//                   onTestDrive={handleTestDrive}
//                 />
//               ))}
//             </AnimatePresence>
//           </div>

//           {/* Bottom CTA box */}
//           <div className="mt-12 sm:mt-14 text-center bg-[#132035] border border-white/[0.07] rounded-2xl px-5 sm:px-6 py-9 sm:py-10 lg:py-12">
//             <h4 className="text-white font-bold text-[1.2rem] sm:text-[1.35rem] tracking-tight mb-2">
//               Want to know which offer applies to you?
//             </h4>
//             <p className="text-white/38 text-[13px] sm:text-[13.5px] mb-6 max-w-sm mx-auto leading-relaxed">
//               Our Garud Tata team can help you confirm the applicable benefits for your model and variant.
//             </p>
//             <button
//               onClick={openQuickModal}
//               className="inline-flex items-center gap-2.5 px-8 py-3.5 min-h-[48px] rounded-full bg-[#0055A5] text-white font-bold text-[12.5px] tracking-[0.07em] shadow-[0_5px_22px_rgba(0,85,165,0.40)] group"
//             >
//               GET MY OFFER <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-150" />
//             </button>
//           </div>

//           {/* Disclaimer */}
//           <p className="text-[10.5px] text-white/18 mt-10 max-w-3xl mx-auto text-center leading-relaxed">
//             *Offers are subject to applicable model, variant, MY, customer and campaign eligibility.
//             Exchange, scrappage and loyalty benefits may be combined only where applicable.
//             Benefits and terms may change. Please confirm the applicable offer with Garud Tata at the
//             time of enquiry. All India · All amounts in INR · MY25/MY24 Consumer Offer.
//           </p>
//         </div>
//       </section>

//       {/* ── In-page enquiry form (no id, no auto-scroll) ── */}
//       <EnquiryForm
//         preselectedCar={preselectedCar}
//         preselectedType={preselectedType}
//       />

//       {/* ── Quick modal ── */}
//       <QuickOfferModal
//         open={quickModalOpen}
//         onClose={closeQuickModal}
//       />

//       {/* ── Mobile sticky CTA bar ── */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-gradient-to-t from-[#0D1829] via-[#0D1829]/95 to-transparent">
//         <button
//           onClick={openQuickModal}
//           className="w-full flex items-center justify-center gap-2 py-3.5 min-h-[52px] rounded-full bg-[#0055A5] text-white font-bold text-[13px] tracking-[0.06em] shadow-[0_8px_28px_rgba(0,85,165,0.48)]"
//         >
//           GET MY OFFER <ArrowRight size={15} />
//         </button>
//       </div>
//     </>
//   );
// }

















// "use client";

// import React, { useState, useMemo, useEffect } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useReducedMotion,
//   animate,
// } from "framer-motion";
// import {
//   OFFERS,
//   TataOffer,
//   Powertrain,
// } from "@/lib/tata-offers";

// // ============================================================================
// // LOCAL HELPERS & TYPES
// // ============================================================================
// type EnquiryType = "Offer Enquiry" | "Test Drive";

// const SHOWROOMS = ["Garud Tata Dealership"];

// const LAST_UPDATED = new Date().toLocaleDateString("en-IN", {
//   month: "long",
//   year: "numeric",
// });

// const formatINR = (amount: number) => {
//   return new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(amount);
// };

// // ============================================================================
// // CAR METADATA & IMAGES
// // ============================================================================
// const CAR_BODY_TYPES: Record<string, string> = {
//   Tiago: "Hatchback",
//   Punch: "Compact SUV",
//   Altroz: "Premium Hatchback",
//   Nexon: "Compact SUV",
//   Curvv: "SUV Coupé",
//   Harrier: "Premium SUV",
//   Safari: "Flagship 7-Seater SUV",
// };

// // Image mappings based on user provided data
// const CAR_IMAGES: Record<string, string[]> = {
//   tiago: [
//     "/Car images/Tata tiago/image1.jpg",
//     "/Car images/Tata tiago/image2.jpg",
//     "/Car images/Tata tiago/image3.jpg",
//     "/Car images/Tata tiago/image4.jpg",
//     "/Car images/Tata tiago/image5.jpg",
//     "/Car images/Tata tiago/image6.jpg",
//   ],
//   "tiago-ev": [
//     "/Car images/Tata tiago/image1.jpg",
//     "/Car images/Tata tiago/image2.jpg",
//     "/Car images/Tata tiago/image3.jpg",
//     "/Car images/Tata tiago/image4.jpg",
//     "/Car images/Tata tiago/image5.jpg",
//     "/Car images/Tata tiago/image6.jpg",
//   ],
//   tigor: [
//     "/Car images/Tata tigor/image1.avif",
//     "/Car images/Tata tigor/image2.avif",
//     "/Car images/Tata tigor/image3.avif",
//     "/Car images/Tata tigor/image4.avif",
//     "/Car images/Tata tigor/image5.avif",
//   ],
//   altroz: [
//     "/Car images/Tata altroz/image1.avif",
//     "/Car images/Tata altroz/image2.avif",
//     "/Car images/Tata altroz/image3.avif",
//     "/Car images/Tata altroz/image4.avif",
//     "/Car images/Tata altroz/image5.avif",
//     "/Car images/Tata altroz/image6.avif",
//     "/Car images/Tata altroz/image7.avif",
//   ],
//   punch: [
//     "/Car images/Tata punch/image1.jpg",
//     "/Car images/Tata punch/image2.jpg",
//     "/Car images/Tata punch/image3.jpg",
//     "/Car images/Tata punch/image4.jpg",
//     "/Car images/Tata punch/image5.jpg",
//   ],
//   "punch-ev": [
//     "/Car images/Tata punch/image1.jpg",
//     "/Car images/Tata punch/image2.jpg",
//     "/Car images/Tata punch/image3.jpg",
//     "/Car images/Tata punch/image4.jpg",
//     "/Car images/Tata punch/image5.jpg",
//   ],
//   nexon: [
//     "/Car images/Tata nexon/image1.avif",
//     "/Car images/Tata nexon/image2.avif",
//     "/Car images/Tata nexon/image3.avif",
//     "/Car images/Tata nexon/image4.avif",
//     "/Car images/Tata nexon/image5.avif",
//     "/Car images/Tata nexon/image6.avif",
//   ],
//   "nexon-ev": [
//     "/Car images/Tata nexon/image1.avif",
//     "/Car images/Tata nexon/image2.avif",
//     "/Car images/Tata nexon/image3.avif",
//     "/Car images/Tata nexon/image4.avif",
//     "/Car images/Tata nexon/image5.avif",
//     "/Car images/Tata nexon/image6.avif",
//   ],
//   curvv: [
//     "/Car images/Tata curv/image1.avif",
//     "/Car images/Tata curv/image2.avif",
//     "/Car images/Tata curv/image3.avif",
//     "/Car images/Tata curv/image4.avif",
//     "/Car images/Tata curv/image5.avif",
//     "/Car images/Tata curv/image6.avif",
//     "/Car images/Tata curv/image7.avif",
//   ],
//   "curvv-ev": [
//     "/Car images/Tata curv/image1.avif",
//     "/Car images/Tata curv/image2.avif",
//     "/Car images/Tata curv/image3.avif",
//     "/Car images/Tata curv/image4.avif",
//     "/Car images/Tata curv/image5.avif",
//     "/Car images/Tata curv/image6.avif",
//     "/Car images/Tata curv/image7.avif",
//   ],
//   harrier: [
//     "/Car images/Tata harrier/image1.avif",
//     "/Car images/Tata harrier/image2.avif",
//     "/Car images/Tata harrier/image3.avif",
//     "/Car images/Tata harrier/image4.avif",
//     "/Car images/Tata harrier/image5.avif",
//     "/Car images/Tata harrier/image6.avif",
//     "/Car images/Tata harrier/image7.avif",
//   ],
//   "harrier-ev": [
//     "/Car images/Tata harrier/image1.avif",
//     "/Car images/Tata harrier/image2.avif",
//     "/Car images/Tata harrier/image3.avif",
//     "/Car images/Tata harrier/image4.avif",
//     "/Car images/Tata harrier/image5.avif",
//     "/Car images/Tata harrier/image6.avif",
//     "/Car images/Tata harrier/image7.avif",
//   ],
//   safari: [
//     "/Car images/Tata safari/image1.avif",
//     "/Car images/Tata safari/image2.avif",
//     "/Car images/Tata safari/image3.avif",
//     "/Car images/Tata safari/image4.avif",
//     "/Car images/Tata safari/image5.avif",
//     "/Car images/Tata safari/image7.avif",
//     "/Car images/Tata safari/image8.avif",
//   ],
// };

// const getCarImage = (model: string, isEV: boolean = false) => {
//   const baseKey = model.toLowerCase();
//   const key = isEV ? `${baseKey}-ev` : baseKey;
//   return (
//     CAR_IMAGES[key]?.[0] ||
//     CAR_IMAGES[baseKey]?.[0] ||
//     "/placeholder-car.jpg"
//   );
// };

// // ============================================================================
// // ANIMATED COUNTER COMPONENT
// // ============================================================================
// function AnimatedCounter({ value }: { value: number }) {
//   const prefersReduced = useReducedMotion();
//   const [displayValue, setDisplayValue] = useState(prefersReduced ? value : 0);

//   useEffect(() => {
//     if (prefersReduced) {
//       setDisplayValue(value);
//       return;
//     }

//     const controls = animate(0, value, {
//       duration: 0.9,
//       ease: [0.16, 1, 0.3, 1],
//       onUpdate: (latest) => setDisplayValue(Math.round(latest)),
//     });

//     return () => controls.stop();
//   }, [value, prefersReduced]);

//   return <span>{formatINR(displayValue)}</span>;
// }

// // ============================================================================
// // INTERNAL ENQUIRY MODAL
// // ============================================================================
// interface EnquiryModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   selectedCar: string;
//   enquiryType: EnquiryType;
//   offerDetails?: TataOffer | null;
// }

// function OfferEnquiryModal({
//   isOpen,
//   onClose,
//   selectedCar,
//   enquiryType,
//   offerDetails,
// }: EnquiryModalProps) {
//   const [fullName, setFullName] = useState("");
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [selectedShowroom, setSelectedShowroom] = useState(
//     SHOWROOMS[0] || "Garud Tata Dealership"
//   );
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   if (!isOpen) return null;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (mobileNumber.trim().length < 10) {
//       setErrorMsg("Please enter a valid 10-digit mobile number.");
//       return;
//     }

//     setIsSubmitting(true);
//     setErrorMsg("");

//     try {
//       if (
//         typeof window !== "undefined" &&
//         (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq
//       ) {
//         (window as unknown as { fbq: (...args: unknown[]) => void }).fbq(
//           "track",
//           "Lead",
//           {
//             content_name: selectedCar,
//             content_category: enquiryType,
//             value: offerDetails?.maxOffer || 0,
//             currency: "INR",
//           }
//         );
//       }

//       const response = await fetch("/api/enquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           fullName,
//           phone: mobileNumber,
//           model: selectedCar,
//           enquiryType,
//           showroom: selectedShowroom,
//           variant: offerDetails?.variant || "General",
//           maxBenefit: offerDetails?.maxOffer || 0,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to submit enquiry");
//       }

//       setIsSuccess(true);
//     } catch {
//       setIsSuccess(true);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#004b8d]/30 backdrop-blur-sm">
//       <div
//         role="dialog"
//         aria-modal="true"
//         className="w-full max-w-lg bg-white border border-[#004b8d]/20 rounded-2xl p-6 sm:p-8 text-gray-900 shadow-2xl relative"
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-[#004b8d] text-2xl leading-none p-2 focus:outline-none transition-colors"
//           aria-label="Close Modal"
//         >
//           &times;
//         </button>

//         {isSuccess ? (
//           <div className="text-center py-8">
//             <div className="w-16 h-16 rounded-full bg-[#004b8d]/10 border-2 border-[#004b8d] flex items-center justify-center mx-auto mb-4 text-[#004b8d] text-3xl font-bold shadow-[0_0_15px_rgba(0,75,141,0.2)]">
//               ✓
//             </div>
//             <h3 className="text-2xl font-bold tracking-tight mb-2 text-[#004b8d]">
//               Enquiry Received!
//             </h3>
//             <p className="text-gray-600 text-sm mb-6">
//               Our Garud Tata sales executive will reach out to you shortly with
//               the best deal for your <strong className="text-gray-900">{selectedCar}</strong>.
//             </p>
//             <button
//               onClick={onClose}
//               className="w-full min-h-[44px] bg-[#004b8d] hover:bg-[#00386b] font-semibold rounded-xl text-white transition-all shadow-md shadow-[#004b8d]/30"
//             >
//               Done
//             </button>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <span className="text-xs font-bold tracking-widest uppercase text-[#004b8d] block">
//                 Garud Tata Dealership
//               </span>
//               <h3 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 mt-1">
//                 {enquiryType === "Test Drive"
//                   ? "Book a Test Drive"
//                   : "Claim Your Tata Offer"}
//               </h3>
//               <p className="text-xs sm:text-sm text-gray-500 mt-1">
//                 Selected: <strong className="text-[#004b8d]">{selectedCar}</strong>{" "}
//                 {offerDetails?.variant ? `(${offerDetails.variant})` : ""}
//               </p>
//             </div>

//             {errorMsg && (
//               <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 p-2.5 rounded-lg font-medium">
//                 {errorMsg}
//               </p>
//             )}

//             <div>
//               <label className="block text-xs uppercase tracking-wider text-[#004b8d] font-bold mb-1">
//                 Your Full Name
//               </label>
//               <input
//                 type="text"
//                 required
//                 value={fullName}
//                 onChange={(e) => setFullName(e.target.value)}
//                 placeholder="Enter your name"
//                 className="w-full bg-gray-50 border border-gray-200 focus:border-[#004b8d] focus:ring-1 focus:ring-[#004b8d] rounded-xl px-4 py-3 text-sm text-gray-900 transition-colors outline-none font-medium"
//               />
//             </div>

//             <div>
//               <label className="block text-xs uppercase tracking-wider text-[#004b8d] font-bold mb-1">
//                 Mobile Number
//               </label>
//               <input
//                 type="tel"
//                 required
//                 maxLength={10}
//                 value={mobileNumber}
//                 onChange={(e) =>
//                   setMobileNumber(e.target.value.replace(/\D/g, ""))
//                 }
//                 placeholder="10-digit mobile number"
//                 className="w-full bg-gray-50 border border-gray-200 focus:border-[#004b8d] focus:ring-1 focus:ring-[#004b8d] rounded-xl px-4 py-3 text-sm text-gray-900 transition-colors outline-none font-medium"
//               />
//             </div>

//             {SHOWROOMS.length > 0 && (
//               <div>
//                 <label className="block text-xs uppercase tracking-wider text-[#004b8d] font-bold mb-1">
//                   Preferred Showroom
//                 </label>
//                 <select
//                   value={selectedShowroom}
//                   onChange={(e) => setSelectedShowroom(e.target.value)}
//                   className="w-full bg-gray-50 border border-gray-200 focus:border-[#004b8d] focus:ring-1 focus:ring-[#004b8d] rounded-xl px-4 py-3 text-sm text-gray-900 transition-colors outline-none font-medium"
//                 >
//                   {SHOWROOMS.map((s) => (
//                     <option key={s} value={s}>
//                       {s}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full min-h-[48px] bg-[#004b8d] hover:bg-[#00386b] disabled:opacity-50 text-white font-bold rounded-xl transition-all shadow-lg shadow-[#004b8d]/30 mt-2"
//             >
//               {isSubmitting
//                 ? "Submitting..."
//                 : enquiryType === "Test Drive"
//                 ? "Confirm Test Drive Booking"
//                 : "Get Best Price & Offer →"}
//             </button>

//             <p className="text-[11px] text-center text-gray-500 leading-relaxed">
//               By submitting, you agree to receive official offer details via Call
//               or WhatsApp from Garud Tata.
//             </p>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }

// // ============================================================================
// // MAIN OFFERS COMPONENT
// // ============================================================================
// export default function Offers() {
//   const prefersReduced = useReducedMotion();

//   const [selectedCar, setSelectedCar] = useState<string | null>(null);
//   const [selectedPowertrain, setSelectedPowertrain] =
//     useState<Powertrain | null>(null);
//   const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
//     null
//   );

//   const [modalState, setModalState] = useState<{
//     isOpen: boolean;
//     enquiryType: EnquiryType;
//   }>({
//     isOpen: false,
//     enquiryType: "Offer Enquiry",
//   });

//   const availableCars = useMemo(() => {
//     const list: string[] = [];
//     OFFERS.forEach((o) => {
//       if (o.active && !list.includes(o.model)) {
//         list.push(o.model);
//       }
//     });
//     return list;
//   }, []);

//   const availablePowertrains = useMemo(() => {
//     if (!selectedCar) return [];
//     const set = new Set<Powertrain>();
//     OFFERS.filter((o) => o.active && o.model === selectedCar).forEach((o) => {
//       set.add(o.powertrain);
//     });
//     return Array.from(set);
//   }, [selectedCar]);

//   const matchingOffers = useMemo(() => {
//     if (!selectedCar || !selectedPowertrain) return [];
//     return OFFERS.filter(
//       (o) =>
//         o.active &&
//         o.model === selectedCar &&
//         o.powertrain === selectedPowertrain
//     );
//   }, [selectedCar, selectedPowertrain]);

//   const needsVariantSelection = matchingOffers.length > 1;

//   const finalOffer: TataOffer | null = useMemo(() => {
//     if (!selectedCar || !selectedPowertrain) return null;
//     if (matchingOffers.length === 0) return null;
//     if (matchingOffers.length === 1) return matchingOffers[0];
//     if (selectedVariantId) {
//       return matchingOffers.find((o) => o.id === selectedVariantId) || null;
//     }
//     return null;
//   }, [selectedCar, selectedPowertrain, matchingOffers, selectedVariantId]);

//   const handleSelectCar = (car: string) => {
//     setSelectedCar(car);
//     setSelectedPowertrain(null);
//     setSelectedVariantId(null);
//   };

//   const handleSelectPowertrain = (pt: Powertrain) => {
//     setSelectedPowertrain(pt);
//     setSelectedVariantId(null);
//   };

//   const handleSelectVariant = (id: string) => {
//     setSelectedVariantId(id);
//   };

//   const handleStartOver = () => {
//     setSelectedCar(null);
//     setSelectedPowertrain(null);
//     setSelectedVariantId(null);
//   };

//   const handleChangeSelection = () => {
//     if (needsVariantSelection && selectedVariantId) {
//       setSelectedVariantId(null);
//     } else if (selectedPowertrain) {
//       setSelectedPowertrain(null);
//     } else {
//       setSelectedCar(null);
//     }
//   };

//   const currentStepNumber = useMemo(() => {
//     if (!selectedCar) return 1;
//     if (!selectedPowertrain) return 2;
//     if (needsVariantSelection && !selectedVariantId) return 3;
//     return needsVariantSelection ? 4 : 3;
//   }, [
//     selectedCar,
//     selectedPowertrain,
//     needsVariantSelection,
//     selectedVariantId,
//   ]);

//   const totalSteps = needsVariantSelection ? 4 : 3;

//   const stepVariants = {
//     initial: prefersReduced ? { opacity: 1 } : { opacity: 0, y: 15 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
//     exit: prefersReduced
//       ? { opacity: 1 }
//       : { opacity: 0, y: -10, transition: { duration: 0.2 } },
//   };

//   return (
//     <section className="min-h-screen bg-gray-50 text-gray-900 py-12 px-4 sm:px-6 lg:px-8 font-sans">
//       {/* ============================================================
//           HERO SECTION
//          ============================================================ */}
//       <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
//         <span className="inline-block text-xs font-black uppercase tracking-[0.2em] text-[#004b8d] bg-[#004b8d]/10 border border-[#004b8d]/20 px-4 py-1.5 rounded-full mb-4 shadow-sm">
//           Garud Tata · Current Offers
//         </span>
//         <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#004b8d] mb-4">
//           Find Your Tata Offer
//         </h1>
//         <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto font-medium">
//           Select your Tata car and discover the exclusive benefits available for your model.
//         </p>
//       </div>

//       {/* ============================================================
//           MAIN OFFER FINDER CARD
//          ============================================================ */}
//       <div className="max-w-[1000px] mx-auto bg-white border border-gray-200 rounded-3xl shadow-xl shadow-[#004b8d]/5 overflow-hidden">
//         {/* PROGRESS INDICATOR */}
//         <div className="bg-gray-50/80 border-b border-gray-200 px-6 py-4">
//           {/* Desktop Progress */}
//           <div className="hidden sm:flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400">
//             <div
//               className={`flex items-center gap-2 ${
//                 currentStepNumber >= 1 ? "text-[#004b8d]" : ""
//               }`}
//             >
//               <span
//                 className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all ${
//                   currentStepNumber >= 1
//                     ? "bg-[#004b8d] text-white shadow-md shadow-[#004b8d]/30"
//                     : "bg-gray-200 text-gray-500"
//                 }`}
//               >
//                 1
//               </span>
//               <span>Car</span>
//             </div>

//             <span className="text-gray-300">━━━━</span>

//             <div
//               className={`flex items-center gap-2 ${
//                 currentStepNumber >= 2 ? "text-[#004b8d]" : ""
//               }`}
//             >
//               <span
//                 className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all ${
//                   currentStepNumber >= 2
//                     ? "bg-[#004b8d] text-white shadow-md shadow-[#004b8d]/30"
//                     : "bg-gray-200 text-gray-500"
//                 }`}
//               >
//                 2
//               </span>
//               <span>Version</span>
//             </div>

//             {needsVariantSelection && (
//               <>
//                 <span className="text-gray-300">━━━━</span>
//                 <div
//                   className={`flex items-center gap-2 ${
//                     currentStepNumber >= 3 ? "text-[#004b8d]" : ""
//                   }`}
//                 >
//                   <span
//                     className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all ${
//                       currentStepNumber >= 3
//                         ? "bg-[#004b8d] text-white shadow-md shadow-[#004b8d]/30"
//                         : "bg-gray-200 text-gray-500"
//                     }`}
//                   >
//                     3
//                   </span>
//                   <span>Variant</span>
//                 </div>
//               </>
//             )}

//             <span className="text-gray-300">━━━━</span>

//             <div
//               className={`flex items-center gap-2 ${
//                 currentStepNumber === totalSteps ? "text-[#004b8d]" : ""
//               }`}
//             >
//               <span
//                 className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all ${
//                   currentStepNumber === totalSteps
//                     ? "bg-[#004b8d] text-white shadow-md shadow-[#004b8d]/30"
//                     : "bg-gray-200 text-gray-500"
//                 }`}
//               >
//                 {totalSteps}
//               </span>
//               <span>Offer</span>
//             </div>
//           </div>

//           {/* Mobile Progress */}
//           <div className="flex sm:hidden items-center justify-between text-xs">
//             <span className="font-black text-[#004b8d] uppercase tracking-wider">
//               Step {currentStepNumber} of {totalSteps}
//             </span>
//             <span className="text-gray-500 font-bold">
//               {!selectedCar
//                 ? "Choose Your Car"
//                 : !selectedPowertrain
//                 ? "Choose Powertrain"
//                 : needsVariantSelection && !selectedVariantId
//                 ? "Choose Variant"
//                 : "Applicable Offer"}
//             </span>
//           </div>
//         </div>

//         {/* STEP CONTENT CONTAINER */}
//         <div className="p-6 sm:p-10">
//           <AnimatePresence mode="wait">
//             {/* ============================================================
//                 STEP 1: SELECT CAR (WITH IMAGES)
//                ============================================================ */}
//             {!selectedCar && (
//               <motion.div
//                 key="step-car"
//                 variants={stepVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 <div className="text-center mb-8">
//                   <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900">
//                     Which Tata car are you interested in?
//                   </h2>
//                 </div>

//                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//                   {availableCars.map((car) => {
//                     const isSelected = selectedCar === car;
//                     return (
//                       <button
//                         key={car}
//                         onClick={() => handleSelectCar(car)}
//                         className={`group relative text-left rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col bg-white shadow-sm hover:shadow-xl ${
//                           isSelected
//                             ? "border-[#004b8d] ring-2 ring-[#004b8d] ring-offset-2 scale-[1.02]"
//                             : "border-gray-200 hover:border-[#004b8d]/50"
//                         }`}
//                       >
//                         <div className="relative w-full h-32 sm:h-36 bg-gray-100 overflow-hidden flex items-center justify-center">
//                           <img
//                             src={getCarImage(car)}
//                             alt={`Tata ${car}`}
//                             className={`w-full h-full object-cover transition-transform duration-700 ${
//                               isSelected ? "scale-110" : "group-hover:scale-110"
//                             }`}
//                             loading="lazy"
//                           />
//                           {isSelected && (
//                             <div className="absolute inset-0 bg-[#004b8d]/10 mix-blend-overlay" />
//                           )}
//                         </div>
//                         <div
//                           className={`p-4 transition-colors ${
//                             isSelected
//                               ? "bg-[#004b8d] text-white"
//                               : "bg-white text-gray-900 group-hover:bg-gray-50"
//                           }`}
//                         >
//                           <div className="flex items-start justify-between w-full">
//                             <h3
//                               className={`text-base font-black tracking-wide uppercase ${
//                                 isSelected ? "text-white" : "text-[#004b8d]"
//                               }`}
//                             >
//                               {car}
//                             </h3>
//                             {isSelected && (
//                               <span className="w-5 h-5 rounded-full bg-white text-[#004b8d] flex items-center justify-center text-xs font-black shadow-sm">
//                                 ✓
//                               </span>
//                             )}
//                           </div>
//                           <p
//                             className={`text-[11px] sm:text-xs font-semibold mt-1 ${
//                               isSelected ? "text-white/80" : "text-gray-500"
//                             }`}
//                           >
//                             {CAR_BODY_TYPES[car] || "Tata Vehicle"}
//                           </p>
//                         </div>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </motion.div>
//             )}

//             {/* ============================================================
//                 STEP 2: SELECT POWERTRAIN
//                ============================================================ */}
//             {selectedCar && !selectedPowertrain && (
//               <motion.div
//                 key="step-powertrain"
//                 variants={stepVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//               >
//                 <div className="text-center mb-8">
//                   <span className="text-xs uppercase tracking-[0.2em] text-[#004b8d] font-black bg-[#004b8d]/10 px-3 py-1 rounded-full">
//                     {selectedCar}
//                   </span>
//                   <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 mt-4">
//                     What are you looking for?
//                   </h2>
//                   <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
//                     Choose your preferred fuel or powertrain type
//                   </p>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
//                   {availablePowertrains.map((pt) => (
//                     <button
//                       key={pt}
//                       onClick={() => handleSelectPowertrain(pt)}
//                       className="group p-5 rounded-2xl bg-white border border-gray-200 hover:border-[#004b8d] hover:bg-[#004b8d]/5 transition-all flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md"
//                     >
//                       <span className="text-lg sm:text-xl font-black text-[#004b8d] block mb-1">
//                         {pt}
//                       </span>
//                       <span className="text-xs font-semibold text-gray-500">
//                         {pt === "Electric"
//                           ? "Zero Emission"
//                           : "Available in Stock"}
//                       </span>
//                     </button>
//                   ))}
//                 </div>

//                 <div className="mt-8 text-center">
//                   <button
//                     onClick={handleChangeSelection}
//                     className="text-xs font-bold text-gray-400 hover:text-[#004b8d] transition-colors underline-offset-4 hover:underline"
//                   >
//                     ← Choose a different car
//                   </button>
//                 </div>
//               </motion.div>
//             )}

//             {/* ============================================================
//                 STEP 3: SELECT VARIANT (CONDITIONAL)
//                ============================================================ */}
//             {selectedCar &&
//               selectedPowertrain &&
//               needsVariantSelection &&
//               !selectedVariantId && (
//                 <motion.div
//                   key="step-variant"
//                   variants={stepVariants}
//                   initial="initial"
//                   animate="animate"
//                   exit="exit"
//                 >
//                   <div className="text-center mb-8">
//                     <span className="text-xs uppercase tracking-[0.1em] text-[#004b8d] font-black bg-[#004b8d]/10 px-3 py-1 rounded-full">
//                       {selectedCar} · {selectedPowertrain}
//                     </span>
//                     <h2 className="text-xl sm:text-2xl font-black tracking-tight text-gray-900 mt-4">
//                       Choose your variant
//                     </h2>
//                     <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
//                       Select specific edition to check exact eligible benefits
//                     </p>
//                   </div>

//                   <div className="space-y-3 max-w-xl mx-auto">
//                     {matchingOffers.map((offer) => (
//                       <button
//                         key={offer.id}
//                         onClick={() => handleSelectVariant(offer.id)}
//                         className="w-full p-4 sm:p-5 rounded-2xl bg-white border border-gray-200 hover:border-[#004b8d] hover:bg-[#004b8d]/5 transition-all flex items-center justify-between text-left group shadow-sm hover:shadow-md"
//                       >
//                         <div>
//                           <h3 className="text-sm sm:text-base font-bold text-gray-900 group-hover:text-[#004b8d] transition-colors">
//                             {offer.variant}
//                           </h3>
//                           <span className="text-xs font-semibold text-gray-500 block mt-0.5">
//                             {offer.modelYear} Edition
//                           </span>
//                         </div>
//                         <div className="text-right">
//                           <span className="text-[10px] uppercase font-bold tracking-wider text-[#004b8d]/60 block">
//                             Up to
//                           </span>
//                           <span className="text-base sm:text-lg font-black text-[#004b8d]">
//                             {formatINR(offer.maxOffer)}
//                           </span>
//                         </div>
//                       </button>
//                     ))}
//                   </div>

//                   <div className="mt-8 text-center">
//                     <button
//                       onClick={handleChangeSelection}
//                       className="text-xs font-bold text-gray-400 hover:text-[#004b8d] transition-colors underline-offset-4 hover:underline"
//                     >
//                       ← Back to Powertrain Selection
//                     </button>
//                   </div>
//                 </motion.div>
//               )}

//             {/* ============================================================
//                 STEP 4: FINAL OFFER RESULT (PREMIUM VOUCHER STYLE)
//                ============================================================ */}
//             {finalOffer && (
//               <motion.div
//                 key="step-result"
//                 variants={stepVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 className="max-w-2xl mx-auto"
//               >
//                 <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
//                   {/* Hero Banner with Car Image */}
//                   <div className="relative h-48 sm:h-64 bg-[#004b8d] flex items-end justify-center overflow-hidden">
//                     <div className="absolute inset-0 bg-gradient-to-t from-[#004b8d] via-[#004b8d]/80 to-transparent z-10" />
//                     <img
//                       src={getCarImage(
//                         finalOffer.model,
//                         finalOffer.powertrain === "Electric"
//                       )}
//                       alt={finalOffer.model}
//                       className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
//                     />
//                     <div className="relative z-20 text-center pb-6 text-white w-full px-4">
//                       <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80 block mb-1">
//                         Your Garud Tata Offer
//                       </span>
//                       <h2 className="text-3xl sm:text-4xl font-black text-white">
//                         Tata {finalOffer.model}{" "}
//                         {finalOffer.category === "EV" &&
//                         !finalOffer.model.includes("EV")
//                           ? "EV"
//                           : ""}
//                       </h2>
//                       <p className="text-xs sm:text-sm text-white/90 mt-1 font-semibold">
//                         {finalOffer.variant} · {finalOffer.powertrain} ·{" "}
//                         {finalOffer.modelYear}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Body of Voucher */}
//                   <div className="p-6 sm:p-8">
//                     {/* Main Highlight Amount */}
//                     <div className="text-center mb-8">
//                       <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mb-1">
//                         Maximum Eligible Benefits
//                       </span>
//                       <div className="text-4xl sm:text-5xl font-black text-[#004b8d] tracking-tight">
//                         <span className="text-sm text-[#004b8d]/70 font-bold uppercase mr-1.5 align-middle">
//                           UP TO
//                         </span>
//                         <AnimatedCounter value={finalOffer.maxOffer} />
//                       </div>
//                     </div>

//                     {/* Itemized Benefit Breakdown */}
//                     <div className="space-y-3 mb-8">
//                       <span className="text-xs uppercase tracking-widest text-[#004b8d] font-bold block px-1 text-center">
//                         Benefit Breakdown
//                       </span>

//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                         {finalOffer.cash > 0 && (
//                           <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-sm">
//                             <span className="text-gray-600 font-semibold">
//                               Consumer
//                             </span>
//                             <span className="font-black text-gray-900">
//                               {formatINR(finalOffer.cash)}
//                             </span>
//                           </div>
//                         )}

//                         {finalOffer.exchangeBenefit > 0 && (
//                           <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-sm">
//                             <span className="text-gray-600 font-semibold">
//                               Exchange
//                             </span>
//                             <span className="font-black text-gray-900">
//                               {formatINR(finalOffer.exchangeBenefit)}
//                             </span>
//                           </div>
//                         )}

//                         {finalOffer.scrappageBenefit > 0 && (
//                           <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-sm">
//                             <span className="text-gray-600 font-semibold">
//                               Scrappage
//                             </span>
//                             <span className="font-black text-gray-900">
//                               {formatINR(finalOffer.scrappageBenefit)}
//                             </span>
//                           </div>
//                         )}

//                         {finalOffer.loyaltyBenefit > 0 && (
//                           <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-sm">
//                             <span className="text-gray-600 font-semibold">
//                               Loyalty
//                             </span>
//                             <span className="font-black text-gray-900">
//                               {formatINR(finalOffer.loyaltyBenefit)}
//                             </span>
//                           </div>
//                         )}
//                       </div>

//                       <div className="mt-4 flex items-center justify-between p-4 rounded-xl bg-[#004b8d] text-white shadow-lg shadow-[#004b8d]/20">
//                         <span className="font-bold text-sm sm:text-base">
//                           Total Maximum Benefits
//                         </span>
//                         <span className="font-black text-lg sm:text-xl">
//                           {formatINR(finalOffer.maxOffer)}
//                         </span>
//                       </div>
//                     </div>

//                     <p className="text-[10px] text-gray-400 font-medium leading-relaxed mb-8 text-center">
//                       *Benefits are subject to model, variant, customer and
//                       campaign eligibility. Exchange, scrappage and loyalty
//                       benefits may be combined only where applicable. Please
//                       confirm the applicable offer with Garud Tata.
//                     </p>

//                     {/* Result Action Buttons */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       <button
//                         onClick={() =>
//                           setModalState({
//                             isOpen: true,
//                             enquiryType: "Offer Enquiry",
//                           })
//                         }
//                         className="w-full min-h-[52px] bg-[#004b8d] hover:bg-[#00386b] active:scale-[0.99] font-black text-sm sm:text-base rounded-xl text-white transition-all shadow-xl shadow-[#004b8d]/20 flex items-center justify-center gap-2"
//                       >
//                         <span>GET MY OFFER</span>
//                         <span>→</span>
//                       </button>

//                       <button
//                         onClick={() =>
//                           setModalState({
//                             isOpen: true,
//                             enquiryType: "Test Drive",
//                           })
//                         }
//                         className="w-full min-h-[52px] bg-white hover:bg-gray-50 active:scale-[0.99] border-2 border-[#004b8d] font-black text-sm sm:text-base rounded-xl text-[#004b8d] transition-all flex items-center justify-center"
//                       >
//                         BOOK TEST DRIVE
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Back / Start Over Controls */}
//                 <div className="flex items-center justify-center gap-6 mt-6 text-xs text-gray-400 font-bold">
//                   <button
//                     onClick={handleChangeSelection}
//                     className="hover:text-[#004b8d] transition-colors underline-offset-4 hover:underline"
//                   >
//                     ← Change Selection
//                   </button>
//                   <span className="text-gray-300">|</span>
//                   <button
//                     onClick={handleStartOver}
//                     className="hover:text-[#004b8d] transition-colors underline-offset-4 hover:underline"
//                   >
//                     Start Over
//                   </button>
//                 </div>
//               </motion.div>
//             )}

//             {/* ============================================================
//                 NO MATCH FALLBACK
//                ============================================================ */}
//             {selectedCar && selectedPowertrain && !finalOffer && (
//               <motion.div
//                 key="step-nomatch"
//                 variants={stepVariants}
//                 initial="initial"
//                 animate="animate"
//                 exit="exit"
//                 className="text-center py-12 max-w-md mx-auto"
//               >
//                 <div className="w-16 h-16 rounded-full bg-[#004b8d]/10 flex items-center justify-center mx-auto mb-4 text-[#004b8d] text-2xl font-black">
//                   ?
//                 </div>
//                 <h3 className="text-xl font-black text-[#004b8d] mb-2">
//                   No specific offer found
//                 </h3>
//                 <p className="text-sm text-gray-500 mb-8 font-medium leading-relaxed">
//                   Our Garud Tata team can check the latest applicable benefits
//                   for your exact requirement.
//                 </p>
//                 <button
//                   onClick={() =>
//                     setModalState({
//                       isOpen: true,
//                       enquiryType: "Offer Enquiry",
//                     })
//                   }
//                   className="w-full min-h-[48px] bg-[#004b8d] hover:bg-[#00386b] font-black rounded-xl text-white transition-all text-sm mb-4 shadow-lg shadow-[#004b8d]/20"
//                 >
//                   TALK TO GARUD TATA
//                 </button>
//                 <button
//                   onClick={handleStartOver}
//                   className="text-xs text-gray-400 hover:text-[#004b8d] font-bold underline-offset-4 hover:underline"
//                 >
//                   Start Over
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* ============================================================
//           TRUST INFORMATION & FOOTER
//          ============================================================ */}
//       <div className="max-w-3xl mx-auto mt-12 text-center">
//         <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-6 text-xs font-bold text-gray-500">
//           <span className="flex items-center gap-1.5">
//             <span className="text-[#004b8d] text-sm">✓</span> Verified Garud
//             Offers
//           </span>
//           <span className="flex items-center gap-1.5">
//             <span className="text-[#004b8d] text-sm">✓</span> MY25 / MY24
//             Benefits
//           </span>
//           <span className="flex items-center gap-1.5">
//             <span className="text-[#004b8d] text-sm">✓</span> Exchange &
//             Scrappage
//           </span>
//           <span className="flex items-center gap-1.5">
//             <span className="text-[#004b8d] text-sm">✓</span> Test Drive
//             Available
//           </span>
//         </div>

//         <p className="text-[10px] text-gray-400 font-semibold mt-6 tracking-widest uppercase">
//           Offers Last Updated: {LAST_UPDATED}
//         </p>
//       </div>

//       {/* ============================================================
//           ENQUIRY MODAL (Pre-filled with selected vehicle)
//          ============================================================ */}
//       <OfferEnquiryModal
//         isOpen={modalState.isOpen}
//         onClose={() => setModalState((prev) => ({ ...prev, isOpen: false }))}
//         selectedCar={selectedCar || "Tata Car"}
//         enquiryType={modalState.enquiryType}
//         offerDetails={finalOffer}
//       />
//     </section>
//   );
// }
















// "use client";

// import React, { useState, useMemo, useEffect } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useReducedMotion,
//   animate,
// } from "framer-motion";
// import {
//   OFFERS,
//   TataOffer,
//   Powertrain,
// } from "@/lib/offersdata";

// // ============================================================================
// // LOCAL HELPERS & TYPES
// // ============================================================================
// type EnquiryType = "Offer Enquiry" | "Test Drive";

// // ✅ 3 showrooms as requested
// const SHOWROOMS = [
//   "Garud Tata Palam",
//   "Garud Tata Narela",
//   "Garud Tata Najafgarh",
// ];

// // Showroom location details for display
// const SHOWROOM_META: Record<string, { area: string; city: string }> = {
//   "Garud Tata Palam":      { area: "Palam",      city: "South-West Delhi" },
//   "Garud Tata Narela":     { area: "Narela",     city: "North Delhi" },
//   "Garud Tata Najafgarh":  { area: "Najafgarh",  city: "West Delhi" },
// };

// const LAST_UPDATED = new Date().toLocaleDateString("en-IN", {
//   month: "long",
//   year: "numeric",
// });

// const formatINR = (amount: number) =>
//   new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(amount);

// // ============================================================================
// // CAR METADATA & IMAGES
// // ============================================================================
// const CAR_BODY_TYPES: Record<string, string> = {
//   Tiago:   "Hatchback",
//   Punch:   "Compact SUV",
//   Altroz:  "Premium Hatchback",
//   Nexon:   "Compact SUV",
//   Curvv:   "SUV Coupé",
//   Harrier: "Premium SUV",
//   Safari:  "Flagship 7-Seater SUV",
// };

// const CAR_IMAGES: Record<string, string[]> = {
//   tiago:      ["/Car images/Tata tiago/image1.jpg","/Car images/Tata tiago/image2.jpg","/Car images/Tata tiago/image3.jpg"],
//   "tiago-ev": ["/Car images/Tata tiago/image1.jpg","/Car images/Tata tiago/image2.jpg","/Car images/Tata tiago/image3.jpg"],
//   tigor:      ["/Car images/Tata tigor/image1.avif","/Car images/Tata tigor/image2.avif"],
//   altroz:     ["/Car images/Tata altroz/image1.avif","/Car images/Tata altroz/image2.avif"],
//   punch:      ["/Car images/Tata punch/image1.jpg","/Car images/Tata punch/image2.jpg"],
//   "punch-ev": ["/Car images/Tata punch/image1.jpg","/Car images/Tata punch/image2.jpg"],
//   nexon:      ["/Car images/Tata nexon/image1.avif","/Car images/Tata nexon/image2.avif"],
//   "nexon-ev": ["/Car images/Tata nexon/image1.avif","/Car images/Tata nexon/image2.avif"],
//   curvv:      ["/Car images/Tata curv/image1.avif","/Car images/Tata curv/image2.avif"],
//   "curvv-ev": ["/Car images/Tata curv/image1.avif","/Car images/Tata curv/image2.avif"],
//   harrier:    ["/Car images/Tata harrier/image1.avif","/Car images/Tata harrier/image2.avif"],
//   "harrier-ev":["/Car images/Tata harrier/image1.avif","/Car images/Tata harrier/image2.avif"],
//   safari:     ["/Car images/Tata safari/image1.avif","/Car images/Tata safari/image2.avif"],
// };

// const getCarImage = (model: string, isEV = false) => {
//   const key = isEV ? `${model.toLowerCase()}-ev` : model.toLowerCase();
//   return CAR_IMAGES[key]?.[0] || CAR_IMAGES[model.toLowerCase()]?.[0] || "/placeholder-car.jpg";
// };

// // ============================================================================
// // ANIMATED COUNTER
// // ============================================================================
// function AnimatedCounter({ value }: { value: number }) {
//   const prefersReduced = useReducedMotion();
//   const [display, setDisplay] = useState(prefersReduced ? value : 0);

//   useEffect(() => {
//     if (prefersReduced) { setDisplay(value); return; }
//     const c = animate(0, value, {
//       duration: 1.1,
//       ease: [0.16, 1, 0.3, 1],
//       onUpdate: (v) => setDisplay(Math.round(v)),
//     });
//     return () => c.stop();
//   }, [value, prefersReduced]);

//   return <span>{formatINR(display)}</span>;
// }

// // ============================================================================
// // ENQUIRY MODAL  — fixed: sends `name` + `mobile` to match the API contract
// // ============================================================================
// interface EnquiryModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   selectedCar: string;
//   enquiryType: EnquiryType;
//   offerDetails?: TataOffer | null;
// }

// function OfferEnquiryModal({
//   isOpen,
//   onClose,
//   selectedCar,
//   enquiryType,
//   offerDetails,
// }: EnquiryModalProps) {
//   const [name, setName]               = useState("");
//   const [mobile, setMobile]           = useState("");
//   const [showroom, setShowroom]       = useState(SHOWROOMS[0]);
//   const [isSubmitting, setSubmitting] = useState(false);
//   const [isSuccess, setSuccess]       = useState(false);
//   const [error, setError]             = useState("");

//   if (!isOpen) return null;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (mobile.replace(/\D/g, "").length < 10) {
//       setError("Please enter a valid 10-digit mobile number.");
//       return;
//     }
//     setSubmitting(true);
//     setError("");

//     try {
//       // Fire Meta pixel if present
//       const w = window as unknown as { fbq?: (...a: unknown[]) => void };
//       w.fbq?.("track", "Lead", {
//         content_name: selectedCar,
//         content_category: enquiryType,
//         value: offerDetails?.maxOffer ?? 0,
//         currency: "INR",
//       });

//       // ✅ API expects `name` and `mobile`, not `fullName` and `phone`
//       await fetch("/api/enquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           mobile,
//           car: selectedCar,
//           variant: offerDetails?.variant ?? "General",
//           type: enquiryType,
//           showroom,
//           source: "offers-page",
//         }),
//       });

//       setSuccess(true);
//     } catch {
//       setSuccess(true); // graceful fail
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
//       <div
//         role="dialog"
//         aria-modal="true"
//         className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden"
//       >
//         {/* Modal header strip */}
//         <div className="bg-[#004b8d] px-6 py-4 flex items-center justify-between">
//           <div>
//             <p className="text-[10px] uppercase tracking-widest font-bold text-blue-200">
//               {enquiryType === "Test Drive" ? "Book a Test Drive" : "Claim Your Offer"}
//             </p>
//             <p className="text-white font-black text-base leading-tight">
//               Tata {selectedCar}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
//             aria-label="Close"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="p-6">
//           {isSuccess ? (
//             <div className="text-center py-6">
//               <div className="w-14 h-14 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-4 text-emerald-600 text-2xl font-black">
//                 ✓
//               </div>
//               <h3 className="text-xl font-black text-slate-800 mb-2">We'll Be In Touch!</h3>
//               <p className="text-sm text-slate-500 mb-6 leading-relaxed">
//                 Our <strong className="text-slate-700">{showroom}</strong> team will call you shortly
//                 with the best deal on your <strong className="text-[#004b8d]">{selectedCar}</strong>.
//               </p>
//               <button
//                 onClick={onClose}
//                 className="w-full min-h-[48px] bg-[#004b8d] hover:bg-[#00366e] font-bold rounded-xl text-white transition-colors"
//               >
//                 Done
//               </button>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {error && (
//                 <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5 font-medium">
//                   {error}
//                 </p>
//               )}

//               {/* Name */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter your full name"
//                   className="w-full bg-slate-50 border border-slate-200 focus:border-[#004b8d] focus:ring-2 focus:ring-[#004b8d]/20 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-all font-medium"
//                 />
//               </div>

//               {/* Mobile */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Mobile Number
//                 </label>
//                 <input
//                   type="tel"
//                   required
//                   maxLength={10}
//                   value={mobile}
//                   onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
//                   placeholder="10-digit mobile number"
//                   className="w-full bg-slate-50 border border-slate-200 focus:border-[#004b8d] focus:ring-2 focus:ring-[#004b8d]/20 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-all font-medium"
//                 />
//               </div>

//               {/* Showroom — ✅ all 3 with area info */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Nearest Showroom
//                 </label>
//                 <div className="space-y-2">
//                   {SHOWROOMS.map((s) => {
//                     const meta = SHOWROOM_META[s];
//                     return (
//                       <button
//                         key={s}
//                         type="button"
//                         onClick={() => setShowroom(s)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
//                           showroom === s
//                             ? "border-[#004b8d] bg-[#004b8d]/5 ring-2 ring-[#004b8d]/20"
//                             : "border-slate-200 hover:border-[#004b8d]/40 bg-white"
//                         }`}
//                       >
//                         <div>
//                           <p className={`text-sm font-bold ${showroom === s ? "text-[#004b8d]" : "text-slate-700"}`}>
//                             {s}
//                           </p>
//                           <p className="text-[11px] text-slate-400 font-medium mt-0.5">{meta.city}</p>
//                         </div>
//                         <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
//                           showroom === s
//                             ? "border-[#004b8d] bg-[#004b8d]"
//                             : "border-slate-300"
//                         }`}>
//                           {showroom === s && <span className="w-2 h-2 rounded-full bg-white block" />}
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full min-h-[52px] bg-[#004b8d] hover:bg-[#00366e] disabled:opacity-60 text-white font-black rounded-xl transition-colors shadow-lg shadow-[#004b8d]/25 mt-2 text-sm"
//               >
//                 {isSubmitting
//                   ? "Submitting…"
//                   : enquiryType === "Test Drive"
//                   ? "Confirm Test Drive →"
//                   : "Get Best Price & Offer →"}
//               </button>

//               <p className="text-[10px] text-center text-slate-400 leading-relaxed">
//                 By submitting, you agree to be contacted via call or WhatsApp by Garud Tata.
//               </p>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================================
// // STEP PROGRESS BAR
// // ============================================================================
// function StepProgress({
//   current,
//   total,
//   labels,
// }: {
//   current: number;
//   total: number;
//   labels: string[];
// }) {
//   return (
//     <div className="px-5 sm:px-8 py-4 border-b border-slate-200 bg-white">
//       {/* Mobile */}
//       <div className="flex sm:hidden items-center justify-between text-xs">
//         <div className="flex items-center gap-2">
//           <span className="w-6 h-6 rounded-full bg-[#004b8d] text-white flex items-center justify-center text-[11px] font-black">
//             {current}
//           </span>
//           <span className="font-bold text-slate-700">{labels[current - 1]}</span>
//         </div>
//         <span className="text-slate-400 font-semibold">{current} / {total}</span>
//       </div>

//       {/* Desktop */}
//       <div className="hidden sm:flex items-center justify-between relative">
//         {/* Track */}
//         <div className="absolute top-3.5 left-0 right-0 h-0.5 bg-slate-200 z-0" />
//         <div
//           className="absolute top-3.5 left-0 h-0.5 bg-[#004b8d] z-0 transition-all duration-500"
//           style={{ width: `${((current - 1) / (total - 1)) * 100}%` }}
//         />

//         {labels.map((label, i) => {
//           const step = i + 1;
//           const done = step < current;
//           const active = step === current;
//           return (
//             <div key={label} className="relative z-10 flex flex-col items-center gap-1.5">
//               <span
//                 className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-300 ${
//                   done
//                     ? "bg-[#004b8d] text-white"
//                     : active
//                     ? "bg-[#004b8d] text-white ring-4 ring-[#004b8d]/20"
//                     : "bg-slate-100 text-slate-400 border border-slate-200"
//                 }`}
//               >
//                 {done ? "✓" : step}
//               </span>
//               <span
//                 className={`text-[10px] font-bold uppercase tracking-wider ${
//                   active ? "text-[#004b8d]" : done ? "text-slate-500" : "text-slate-300"
//                 }`}
//               >
//                 {label}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // ============================================================================
// // MAIN OFFERS COMPONENT
// // ============================================================================
// export default function Offers() {
//   const prefersReduced = useReducedMotion();

//   const [selectedCar, setSelectedCar]           = useState<string | null>(null);
//   const [selectedPowertrain, setSelectedPowertrain] = useState<Powertrain | null>(null);
//   const [selectedVariantId, setSelectedVariantId]   = useState<string | null>(null);
//   const [modal, setModal] = useState<{ open: boolean; type: EnquiryType }>({
//     open: false,
//     type: "Offer Enquiry",
//   });

//   const availableCars = useMemo(() => {
//     const list: string[] = [];
//     OFFERS.forEach((o) => { if (o.active && !list.includes(o.model)) list.push(o.model); });
//     return list;
//   }, []);

//   const availablePowertrains = useMemo(() => {
//     if (!selectedCar) return [];
//     return Array.from(
//       new Set(OFFERS.filter((o) => o.active && o.model === selectedCar).map((o) => o.powertrain))
//     );
//   }, [selectedCar]);

//   const matchingOffers = useMemo(() => {
//     if (!selectedCar || !selectedPowertrain) return [];
//     return OFFERS.filter((o) => o.active && o.model === selectedCar && o.powertrain === selectedPowertrain);
//   }, [selectedCar, selectedPowertrain]);

//   const needsVariant = matchingOffers.length > 1;

//   const finalOffer = useMemo<TataOffer | null>(() => {
//     if (!selectedCar || !selectedPowertrain || !matchingOffers.length) return null;
//     if (matchingOffers.length === 1) return matchingOffers[0];
//     return matchingOffers.find((o) => o.id === selectedVariantId) ?? null;
//   }, [selectedCar, selectedPowertrain, matchingOffers, selectedVariantId]);

//   const stepLabels = needsVariant
//     ? ["Car", "Powertrain", "Variant", "Offer"]
//     : ["Car", "Powertrain", "Offer"];

//   const currentStep = useMemo(() => {
//     if (!selectedCar) return 1;
//     if (!selectedPowertrain) return 2;
//     if (needsVariant && !selectedVariantId) return 3;
//     return stepLabels.length;
//   }, [selectedCar, selectedPowertrain, needsVariant, selectedVariantId, stepLabels.length]);

//   const goBack = () => {
//     if (needsVariant && selectedVariantId) { setSelectedVariantId(null); return; }
//     if (selectedPowertrain) { setSelectedPowertrain(null); return; }
//     setSelectedCar(null);
//   };

//   const reset = () => {
//     setSelectedCar(null);
//     setSelectedPowertrain(null);
//     setSelectedVariantId(null);
//   };

//   const motion_step = {
//     initial: prefersReduced ? {} : { opacity: 0, y: 16 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
//     exit:    prefersReduced ? {} : { opacity: 0, y: -10, transition: { duration: 0.2 } },
//   };

//   return (
//     <section className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 font-sans">
//       {/* ── HERO ─────────────────────────────────────────────────── */}
//       <div className="max-w-4xl mx-auto text-center mb-8">
//         <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#004b8d] bg-white border border-[#004b8d]/20 px-4 py-1.5 rounded-full mb-4 shadow-sm">
//           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//           Garud Tata · Live Offers
//         </span>
//         <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black tracking-tight text-slate-800 leading-[1.15]">
//           Find Your Tata Offer
//         </h1>
//         <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto mt-3 font-medium leading-relaxed">
//           Select your model and discover exclusive benefits available this month.
//         </p>
//       </div>

//       {/* ── MAIN CARD ─────────────────────────────────────────────── */}
//       <div className="max-w-[960px] mx-auto bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/80 overflow-hidden">
//         <StepProgress current={currentStep} total={stepLabels.length} labels={stepLabels} />

//         <div className="p-5 sm:p-8 md:p-10">
//           <AnimatePresence mode="wait">

//             {/* ── STEP 1 : CAR GRID ─────────────────────────────── */}
//             {!selectedCar && (
//               <motion.div key="step-car" {...motion_step}>
//                 <h2 className="text-lg sm:text-xl font-black text-slate-800 mb-6 text-center">
//                   Which Tata are you interested in?
//                 </h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
//                   {availableCars.map((car) => (
//                     <button
//                       key={car}
//                       onClick={() => { setSelectedCar(car); setSelectedPowertrain(null); setSelectedVariantId(null); }}
//                       className="group relative text-left rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#004b8d]"
//                     >
//                       {/* Image */}
//                       <div className="relative h-28 sm:h-32 bg-slate-100 overflow-hidden">
//                         <img
//                           src={getCarImage(car)}
//                           alt={`Tata ${car}`}
//                           loading="lazy"
//                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                         />
//                         {/* Subtle gradient footer on image */}
//                         <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/50 to-transparent" />
//                       </div>
//                       {/* Label */}
//                       <div className="px-3.5 py-3">
//                         <p className="text-sm font-black text-slate-800 uppercase tracking-wide leading-none group-hover:text-[#004b8d] transition-colors">
//                           {car}
//                         </p>
//                         <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
//                           {CAR_BODY_TYPES[car] ?? "Tata Vehicle"}
//                         </p>
//                       </div>
//                       {/* Hover accent bar */}
//                       <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#004b8d] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
//                     </button>
//                   ))}
//                 </div>
//               </motion.div>
//             )}

//             {/* ── STEP 2 : POWERTRAIN ───────────────────────────── */}
//             {selectedCar && !selectedPowertrain && (
//               <motion.div key="step-pt" {...motion_step}>
//                 <div className="text-center mb-8">
//                   <span className="inline-block text-xs font-black uppercase tracking-wider bg-[#004b8d]/8 text-[#004b8d] px-3 py-1 rounded-full mb-3">
//                     {selectedCar}
//                   </span>
//                   <h2 className="text-lg sm:text-xl font-black text-slate-800">
//                     Fuel or powertrain type?
//                   </h2>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
//                   {availablePowertrains.map((pt) => (
//                     <button
//                       key={pt}
//                       onClick={() => handleSelectPowertrain(pt)}
//                       className="group flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white hover:bg-[#004b8d]/4 transition-all shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#004b8d]"
//                     >
//                       <span className="text-2xl">
//                         {pt === "Electric" ? "⚡" : pt === "Petrol" ? "⛽" : pt === "Diesel" ? "🔧" : "🔋"}
//                       </span>
//                       <span className="text-sm font-black text-slate-800 group-hover:text-[#004b8d] transition-colors">
//                         {pt}
//                       </span>
//                       <span className="text-[10px] text-slate-400 font-semibold">
//                         {pt === "Electric" ? "Zero Emissions" : "Available Now"}
//                       </span>
//                     </button>
//                   ))}
//                 </div>

//                 <p className="text-center mt-8">
//                   <button onClick={goBack} className="text-xs text-slate-400 hover:text-[#004b8d] font-bold transition-colors underline-offset-4 hover:underline">
//                     ← Back to car selection
//                   </button>
//                 </p>
//               </motion.div>
//             )}

//             {/* ── STEP 3 : VARIANT (conditional) ───────────────── */}
//             {selectedCar && selectedPowertrain && needsVariant && !selectedVariantId && (
//               <motion.div key="step-var" {...motion_step}>
//                 <div className="text-center mb-8">
//                   <span className="inline-block text-xs font-black uppercase tracking-wider bg-[#004b8d]/8 text-[#004b8d] px-3 py-1 rounded-full mb-3">
//                     {selectedCar} · {selectedPowertrain}
//                   </span>
//                   <h2 className="text-lg sm:text-xl font-black text-slate-800">
//                     Choose your variant
//                   </h2>
//                   <p className="text-xs text-slate-400 mt-1 font-medium">
//                     Different variants have different eligible benefits
//                   </p>
//                 </div>

//                 <div className="space-y-3 max-w-lg mx-auto">
//                   {matchingOffers.map((offer) => (
//                     <button
//                       key={offer.id}
//                       onClick={() => setSelectedVariantId(offer.id)}
//                       className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white hover:bg-[#004b8d]/4 transition-all shadow-sm hover:shadow-md text-left group focus-visible:ring-2 focus-visible:ring-[#004b8d]"
//                     >
//                       <div>
//                         <p className="text-sm font-bold text-slate-800 group-hover:text-[#004b8d] transition-colors">
//                           {offer.variant}
//                         </p>
//                         <p className="text-xs text-slate-400 font-semibold mt-0.5">{offer.modelYear} Edition</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-[10px] uppercase font-bold tracking-wider text-[#004b8d]/50">Up to</p>
//                         <p className="text-base font-black text-[#004b8d]">{formatINR(offer.maxOffer)}</p>
//                       </div>
//                     </button>
//                   ))}
//                 </div>

//                 <p className="text-center mt-8">
//                   <button onClick={goBack} className="text-xs text-slate-400 hover:text-[#004b8d] font-bold transition-colors underline-offset-4 hover:underline">
//                     ← Back to powertrain
//                   </button>
//                 </p>
//               </motion.div>
//             )}

//             {/* ── STEP 4 : OFFER RESULT ─────────────────────────── */}
//             {finalOffer && (
//               <motion.div key="step-result" {...motion_step} className="max-w-xl mx-auto">
//                 {/* ── Offer Hero Card ── */}
//                 <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/60">

//                   {/* Hero Banner: deep navy with diagonal accent, car image overlay */}
//                   <div className="relative h-52 sm:h-60 overflow-hidden bg-[#003570]">
//                     {/* Geometric accent – adds depth without muddiness */}
//                     <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#0059a8]/50" />
//                     <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-[#002a58]/60" />

//                     {/* Car image — subtle, not overwhelming */}
//                     <img
//                       src={getCarImage(finalOffer.model, finalOffer.powertrain === "Electric")}
//                       alt={`Tata ${finalOffer.model}`}
//                       className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
//                     />

//                     {/* Content overlay */}
//                     <div className="absolute inset-0 flex flex-col justify-end p-6">
//                       <p className="text-[10px] uppercase font-black tracking-[0.25em] text-blue-300/80 mb-1">
//                         Your Garud Tata Offer
//                       </p>
//                       <h2 className="text-3xl sm:text-4xl font-black text-white leading-none">
//                         Tata {finalOffer.model}
//                         {finalOffer.category === "EV" && !finalOffer.model.includes("EV") ? " EV" : ""}
//                       </h2>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {[finalOffer.variant, finalOffer.powertrain, finalOffer.modelYear].map((tag) => (
//                           <span
//                             key={tag}
//                             className="text-[10px] font-bold uppercase tracking-wider bg-white/15 text-white/90 px-2.5 py-1 rounded-full"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Offer body */}
//                   <div className="p-6 sm:p-8 bg-white">
//                     {/* Max benefit highlight */}
//                     <div className="text-center mb-7 py-5 rounded-2xl bg-slate-50 border border-slate-100">
//                       <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">
//                         Maximum Eligible Benefits
//                       </p>
//                       <p className="text-4xl sm:text-5xl font-black text-[#004b8d] leading-none">
//                         <span className="text-lg align-middle font-bold text-[#004b8d]/60 mr-1">UP TO</span>
//                         <AnimatedCounter value={finalOffer.maxOffer} />
//                       </p>
//                     </div>

//                     {/* Breakdown grid */}
//                     <div className="mb-6">
//                       <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 text-center mb-3">
//                         Benefit Breakdown
//                       </p>
//                       <div className="grid grid-cols-2 gap-2.5">
//                         {finalOffer.cash > 0 && (
//                           <BenefitChip label="Consumer Discount" value={finalOffer.cash} />
//                         )}
//                         {finalOffer.exchangeBenefit > 0 && (
//                           <BenefitChip label="Exchange Bonus" value={finalOffer.exchangeBenefit} />
//                         )}
//                         {finalOffer.scrappageBenefit > 0 && (
//                           <BenefitChip label="Scrappage Bonus" value={finalOffer.scrappageBenefit} />
//                         )}
//                         {finalOffer.loyaltyBenefit > 0 && (
//                           <BenefitChip label="Loyalty Reward" value={finalOffer.loyaltyBenefit} />
//                         )}
//                       </div>

//                       {/* Total row */}
//                       <div className="flex items-center justify-between mt-3 px-4 py-3.5 rounded-xl bg-[#004b8d] text-white shadow-lg shadow-[#004b8d]/20">
//                         <span className="font-bold text-sm">Total Benefits</span>
//                         <span className="font-black text-lg">{formatINR(finalOffer.maxOffer)}</span>
//                       </div>
//                     </div>

//                     <p className="text-[10px] text-slate-400 leading-relaxed text-center mb-6">
//                       *Benefits are subject to variant, customer, and campaign eligibility. Exchange,
//                       scrappage, and loyalty benefits may be combined only where applicable.
//                     </p>

//                     {/* CTA buttons */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                       <button
//                         onClick={() => setModal({ open: true, type: "Offer Enquiry" })}
//                         className="w-full min-h-[52px] bg-[#004b8d] hover:bg-[#00366e] active:scale-[0.98] text-white font-black text-sm rounded-xl shadow-lg shadow-[#004b8d]/25 transition-all"
//                       >
//                         GET MY OFFER →
//                       </button>
//                       <button
//                         onClick={() => setModal({ open: true, type: "Test Drive" })}
//                         className="w-full min-h-[52px] border-2 border-[#004b8d] text-[#004b8d] hover:bg-[#004b8d]/5 active:scale-[0.98] font-black text-sm rounded-xl transition-all"
//                       >
//                         BOOK TEST DRIVE
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Back / Reset */}
//                 <div className="flex items-center justify-center gap-5 mt-5 text-xs font-bold text-slate-400">
//                   <button onClick={goBack} className="hover:text-[#004b8d] transition-colors hover:underline underline-offset-4">
//                     ← Change Selection
//                   </button>
//                   <span className="text-slate-300">|</span>
//                   <button onClick={reset} className="hover:text-[#004b8d] transition-colors hover:underline underline-offset-4">
//                     Start Over
//                   </button>
//                 </div>
//               </motion.div>
//             )}

//             {/* ── NO MATCH ──────────────────────────────────────── */}
//             {selectedCar && selectedPowertrain && !finalOffer && matchingOffers.length === 0 && (
//               <motion.div key="no-match" {...motion_step} className="text-center py-14 max-w-sm mx-auto">
//                 <div className="w-14 h-14 rounded-2xl bg-[#004b8d]/8 flex items-center justify-center mx-auto mb-4 text-2xl">
//                   🔍
//                 </div>
//                 <h3 className="text-lg font-black text-slate-800 mb-2">No Specific Offer Found</h3>
//                 <p className="text-sm text-slate-500 mb-7 leading-relaxed font-medium">
//                   Our team can verify the latest applicable benefits for your exact requirement.
//                 </p>
//                 <button
//                   onClick={() => setModal({ open: true, type: "Offer Enquiry" })}
//                   className="w-full min-h-[48px] bg-[#004b8d] hover:bg-[#00366e] font-black text-sm rounded-xl text-white transition-colors shadow-lg shadow-[#004b8d]/20 mb-4"
//                 >
//                   Talk to Garud Tata
//                 </button>
//                 <button onClick={reset} className="text-xs text-slate-400 hover:text-[#004b8d] font-bold hover:underline underline-offset-4 transition-colors">
//                   Start Over
//                 </button>
//               </motion.div>
//             )}

//           </AnimatePresence>
//         </div>
//       </div>

//       {/* ── TRUST BAR ──────────────────────────────────────────────── */}
//       <div className="max-w-3xl mx-auto mt-10 text-center">
//         <div className="flex flex-wrap items-center justify-center gap-y-2.5 gap-x-5 text-[11px] font-bold text-slate-400">
//           {[
//             "Verified Garud Offers",
//             "MY25 / MY24 Benefits",
//             "Exchange & Scrappage",
//             "Test Drive Available",
//           ].map((t) => (
//             <span key={t} className="flex items-center gap-1.5">
//               <span className="text-emerald-500">✓</span> {t}
//             </span>
//           ))}
//         </div>
//         <p className="text-[10px] text-slate-400 font-semibold mt-5 uppercase tracking-widest">
//           Offers Last Updated: {LAST_UPDATED}
//         </p>
//       </div>

//       {/* ── MODAL ─────────────────────────────────────────────────── */}
//       <OfferEnquiryModal
//         isOpen={modal.open}
//         onClose={() => setModal((p) => ({ ...p, open: false }))}
//         selectedCar={selectedCar ?? "Tata Car"}
//         enquiryType={modal.type}
//         offerDetails={finalOffer}
//       />
//     </section>
//   );

//   function handleSelectPowertrain(pt: Powertrain) {
//     setSelectedPowertrain(pt);
//     setSelectedVariantId(null);
//   }
// }

// // ── Small reusable benefit chip ───────────────────────────────────────────────
// function BenefitChip({ label, value }: { label: string; value: number }) {
//   return (
//     <div className="flex flex-col px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-100">
//       <span className="text-[10px] text-slate-500 font-semibold leading-tight">{label}</span>
//       <span className="text-sm font-black text-slate-800 mt-0.5">{formatINR(value)}</span>
//     </div>
//   );
// }














// "use client";

// import React, { useState, useMemo, useEffect } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useReducedMotion,
//   animate,
//   type Easing,
// } from "framer-motion";
// import {
//   OFFERS,
//   TataOffer,
//   Powertrain,
// } from "@/lib/offersdata";

// // ============================================================================
// // LOCAL HELPERS & TYPES
// // ============================================================================
// type EnquiryType = "Offer Enquiry" | "Test Drive";

// // ✅ 3 showrooms as requested
// const SHOWROOMS = [
//   "Garud Tata Palam",
//   "Garud Tata Narela",
//   "Garud Tata Najafgarh",
// ];

// // Showroom location details for display
// const SHOWROOM_META: Record<string, { area: string; city: string }> = {
//   "Garud Tata Palam":      { area: "Palam",      city: "South-West Delhi" },
//   "Garud Tata Narela":     { area: "Narela",     city: "North Delhi" },
//   "Garud Tata Najafgarh":  { area: "Najafgarh",  city: "West Delhi" },
// };

// const LAST_UPDATED = new Date().toLocaleDateString("en-IN", {
//   month: "long",
//   year: "numeric",
// });

// const formatINR = (amount: number) =>
//   new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(amount);

// // ============================================================================
// // CAR METADATA & IMAGES
// // ============================================================================
// const CAR_BODY_TYPES: Record<string, string> = {
//   Tiago:   "Hatchback",
//   Punch:   "Compact SUV",
//   Altroz:  "Premium Hatchback",
//   Nexon:   "Compact SUV",
//   Curvv:   "SUV Coupé",
//   Harrier: "Premium SUV",
//   Safari:  "Flagship 7-Seater SUV",
// };

// const CAR_IMAGES: Record<string, string[]> = {
//   tiago:      ["/Car images/Tata tiago/image1.jpg","/Car images/Tata tiago/image2.jpg","/Car images/Tata tiago/image3.jpg"],
//   "tiago-ev": ["/Car images/Tata tiago/image1.jpg","/Car images/Tata tiago/image2.jpg","/Car images/Tata tiago/image3.jpg"],
//   tigor:      ["/Car images/Tata tigor/image1.avif","/Car images/Tata tigor/image2.avif"],
//   altroz:     ["/Car images/Tata altroz/image1.avif","/Car images/Tata altroz/image2.avif"],
//   punch:      ["/Car images/Tata punch/image1.jpg","/Car images/Tata punch/image2.jpg"],
//   "punch-ev": ["/Car images/Tata punch/image1.jpg","/Car images/Tata punch/image2.jpg"],
//   nexon:      ["/Car images/Tata nexon/image1.avif","/Car images/Tata nexon/image2.avif"],
//   "nexon-ev": ["/Car images/Tata nexon/image1.avif","/Car images/Tata nexon/image2.avif"],
//   curvv:      ["/Car images/Tata curv/image1.avif","/Car images/Tata curv/image2.avif"],
//   "curvv-ev": ["/Car images/Tata curv/image1.avif","/Car images/Tata curv/image2.avif"],
//   harrier:    ["/Car images/Tata harrier/image1.avif","/Car images/Tata harrier/image2.avif"],
//   "harrier-ev":["/Car images/Tata harrier/image1.avif","/Car images/Tata harrier/image2.avif"],
//   safari:     ["/Car images/Tata safari/image1.avif","/Car images/Tata safari/image2.avif"],
// };

// const getCarImage = (model: string, isEV = false) => {
//   const key = isEV ? `${model.toLowerCase()}-ev` : model.toLowerCase();
//   return CAR_IMAGES[key]?.[0] || CAR_IMAGES[model.toLowerCase()]?.[0] || "/placeholder-car.jpg";
// };

// // ============================================================================
// // ANIMATED COUNTER
// // ============================================================================
// function AnimatedCounter({ value }: { value: number }) {
//   const prefersReduced = useReducedMotion();
//   const [display, setDisplay] = useState(prefersReduced ? value : 0);

//   useEffect(() => {
//     if (prefersReduced) { setDisplay(value); return; }
//     const c = animate(0, value, {
//       duration: 1.1,
//       ease: [0.16, 1, 0.3, 1],
//       onUpdate: (v) => setDisplay(Math.round(v)),
//     });
//     return () => c.stop();
//   }, [value, prefersReduced]);

//   return <span>{formatINR(display)}</span>;
// }

// // ============================================================================
// // ENQUIRY MODAL  — fixed: sends `name` + `mobile` to match the API contract
// // ============================================================================
// interface EnquiryModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   selectedCar: string;
//   enquiryType: EnquiryType;
//   offerDetails?: TataOffer | null;
// }

// function OfferEnquiryModal({
//   isOpen,
//   onClose,
//   selectedCar,
//   enquiryType,
//   offerDetails,
// }: EnquiryModalProps) {
//   const [name, setName]               = useState("");
//   const [mobile, setMobile]           = useState("");
//   const [showroom, setShowroom]       = useState(SHOWROOMS[0]);
//   const [isSubmitting, setSubmitting] = useState(false);
//   const [isSuccess, setSuccess]       = useState(false);
//   const [error, setError]             = useState("");

//   if (!isOpen) return null;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (mobile.replace(/\D/g, "").length < 10) {
//       setError("Please enter a valid 10-digit mobile number.");
//       return;
//     }
//     setSubmitting(true);
//     setError("");

//     try {
//       // Fire Meta pixel if present
//       const w = window as unknown as { fbq?: (...a: unknown[]) => void };
//       w.fbq?.("track", "Lead", {
//         content_name: selectedCar,
//         content_category: enquiryType,
//         value: offerDetails?.maxOffer ?? 0,
//         currency: "INR",
//       });

//       // ✅ API expects `name` and `mobile`, not `fullName` and `phone`
//       await fetch("/api/enquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           mobile,
//           car: selectedCar,
//           variant: offerDetails?.variant ?? "General",
//           type: enquiryType,
//           showroom,
//           source: "offers-page",
//         }),
//       });

//       setSuccess(true);
//     } catch {
//       setSuccess(true); // graceful fail
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
//       <div
//         role="dialog"
//         aria-modal="true"
//         className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden"
//       >
//         {/* Modal header strip */}
//         <div className="bg-[#004b8d] px-6 py-4 flex items-center justify-between">
//           <div>
//             <p className="text-[10px] uppercase tracking-widest font-bold text-blue-200">
//               {enquiryType === "Test Drive" ? "Book a Test Drive" : "Claim Your Offer"}
//             </p>
//             <p className="text-white font-black text-base leading-tight">
//               Tata {selectedCar}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors"
//             aria-label="Close"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="p-6">
//           {isSuccess ? (
//             <div className="text-center py-6">
//               <div className="w-14 h-14 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-4 text-emerald-600 text-2xl font-black">
//                 ✓
//               </div>
//               <h3 className="text-xl font-black text-slate-800 mb-2">We'll Be In Touch!</h3>
//               <p className="text-sm text-slate-500 mb-6 leading-relaxed">
//                 Our <strong className="text-slate-700">{showroom}</strong> team will call you shortly
//                 with the best deal on your <strong className="text-[#004b8d]">{selectedCar}</strong>.
//               </p>
//               <button
//                 onClick={onClose}
//                 className="w-full min-h-[48px] bg-[#004b8d] hover:bg-[#00366e] font-bold rounded-xl text-white transition-colors"
//               >
//                 Done
//               </button>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-4">
//               {error && (
//                 <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5 font-medium">
//                   {error}
//                 </p>
//               )}

//               {/* Name */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter your full name"
//                   className="w-full bg-slate-50 border border-slate-200 focus:border-[#004b8d] focus:ring-2 focus:ring-[#004b8d]/20 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-all font-medium"
//                 />
//               </div>

//               {/* Mobile */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Mobile Number
//                 </label>
//                 <input
//                   type="tel"
//                   required
//                   maxLength={10}
//                   value={mobile}
//                   onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
//                   placeholder="10-digit mobile number"
//                   className="w-full bg-slate-50 border border-slate-200 focus:border-[#004b8d] focus:ring-2 focus:ring-[#004b8d]/20 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-all font-medium"
//                 />
//               </div>

//               {/* Showroom — ✅ all 3 with area info */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Nearest Showroom
//                 </label>
//                 <div className="space-y-2">
//                   {SHOWROOMS.map((s) => {
//                     const meta = SHOWROOM_META[s];
//                     return (
//                       <button
//                         key={s}
//                         type="button"
//                         onClick={() => setShowroom(s)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
//                           showroom === s
//                             ? "border-[#004b8d] bg-[#004b8d]/5 ring-2 ring-[#004b8d]/20"
//                             : "border-slate-200 hover:border-[#004b8d]/40 bg-white"
//                         }`}
//                       >
//                         <div>
//                           <p className={`text-sm font-bold ${showroom === s ? "text-[#004b8d]" : "text-slate-700"}`}>
//                             {s}
//                           </p>
//                           <p className="text-[11px] text-slate-400 font-medium mt-0.5">{meta.city}</p>
//                         </div>
//                         <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
//                           showroom === s
//                             ? "border-[#004b8d] bg-[#004b8d]"
//                             : "border-slate-300"
//                         }`}>
//                           {showroom === s && <span className="w-2 h-2 rounded-full bg-white block" />}
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full min-h-[52px] bg-[#004b8d] hover:bg-[#00366e] disabled:opacity-60 text-white font-black rounded-xl transition-colors shadow-lg shadow-[#004b8d]/25 mt-2 text-sm"
//               >
//                 {isSubmitting
//                   ? "Submitting…"
//                   : enquiryType === "Test Drive"
//                   ? "Confirm Test Drive →"
//                   : "Get Best Price & Offer →"}
//               </button>

//               <p className="text-[10px] text-center text-slate-400 leading-relaxed">
//                 By submitting, you agree to be contacted via call or WhatsApp by Garud Tata.
//               </p>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================================
// // STEP PROGRESS BAR
// // ============================================================================
// function StepProgress({
//   current,
//   total,
//   labels,
// }: {
//   current: number;
//   total: number;
//   labels: string[];
// }) {
//   return (
//     <div className="px-5 sm:px-8 py-4 border-b border-slate-200 bg-white">
//       {/* Mobile */}
//       <div className="flex sm:hidden items-center justify-between text-xs">
//         <div className="flex items-center gap-2">
//           <span className="w-6 h-6 rounded-full bg-[#004b8d] text-white flex items-center justify-center text-[11px] font-black">
//             {current}
//           </span>
//           <span className="font-bold text-slate-700">{labels[current - 1]}</span>
//         </div>
//         <span className="text-slate-400 font-semibold">{current} / {total}</span>
//       </div>

//       {/* Desktop */}
//       <div className="hidden sm:flex items-center justify-between relative">
//         {/* Track */}
//         <div className="absolute top-3.5 left-0 right-0 h-0.5 bg-slate-200 z-0" />
//         <div
//           className="absolute top-3.5 left-0 h-0.5 bg-[#004b8d] z-0 transition-all duration-500"
//           style={{ width: `${((current - 1) / (total - 1)) * 100}%` }}
//         />

//         {labels.map((label, i) => {
//           const step = i + 1;
//           const done = step < current;
//           const active = step === current;
//           return (
//             <div key={label} className="relative z-10 flex flex-col items-center gap-1.5">
//               <span
//                 className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-300 ${
//                   done
//                     ? "bg-[#004b8d] text-white"
//                     : active
//                     ? "bg-[#004b8d] text-white ring-4 ring-[#004b8d]/20"
//                     : "bg-slate-100 text-slate-400 border border-slate-200"
//                 }`}
//               >
//                 {done ? "✓" : step}
//               </span>
//               <span
//                 className={`text-[10px] font-bold uppercase tracking-wider ${
//                   active ? "text-[#004b8d]" : done ? "text-slate-500" : "text-slate-300"
//                 }`}
//               >
//                 {label}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // ============================================================================
// // MAIN OFFERS COMPONENT
// // ============================================================================
// export default function Offers() {
//   const prefersReduced = useReducedMotion();

//   const [selectedCar, setSelectedCar]           = useState<string | null>(null);
//   const [selectedPowertrain, setSelectedPowertrain] = useState<Powertrain | null>(null);
//   const [selectedVariantId, setSelectedVariantId]   = useState<string | null>(null);
//   const [modal, setModal] = useState<{ open: boolean; type: EnquiryType }>({
//     open: false,
//     type: "Offer Enquiry",
//   });

//   const availableCars = useMemo(() => {
//     const list: string[] = [];
//     OFFERS.forEach((o) => { if (o.active && !list.includes(o.model)) list.push(o.model); });
//     return list;
//   }, []);

//   const availablePowertrains = useMemo(() => {
//     if (!selectedCar) return [];
//     return Array.from(
//       new Set(OFFERS.filter((o) => o.active && o.model === selectedCar).map((o) => o.powertrain))
//     );
//   }, [selectedCar]);

//   const matchingOffers = useMemo(() => {
//     if (!selectedCar || !selectedPowertrain) return [];
//     return OFFERS.filter((o) => o.active && o.model === selectedCar && o.powertrain === selectedPowertrain);
//   }, [selectedCar, selectedPowertrain]);

//   const needsVariant = matchingOffers.length > 1;

//   const finalOffer = useMemo<TataOffer | null>(() => {
//     if (!selectedCar || !selectedPowertrain || !matchingOffers.length) return null;
//     if (matchingOffers.length === 1) return matchingOffers[0];
//     return matchingOffers.find((o) => o.id === selectedVariantId) ?? null;
//   }, [selectedCar, selectedPowertrain, matchingOffers, selectedVariantId]);

//   const stepLabels = needsVariant
//     ? ["Car", "Powertrain", "Variant", "Offer"]
//     : ["Car", "Powertrain", "Offer"];

//   const currentStep = useMemo(() => {
//     if (!selectedCar) return 1;
//     if (!selectedPowertrain) return 2;
//     if (needsVariant && !selectedVariantId) return 3;
//     return stepLabels.length;
//   }, [selectedCar, selectedPowertrain, needsVariant, selectedVariantId, stepLabels.length]);

//   const goBack = () => {
//     if (needsVariant && selectedVariantId) { setSelectedVariantId(null); return; }
//     if (selectedPowertrain) { setSelectedPowertrain(null); return; }
//     setSelectedCar(null);
//   };

//   const reset = () => {
//     setSelectedCar(null);
//     setSelectedPowertrain(null);
//     setSelectedVariantId(null);
//   };

//   const motion_step = {
//     initial: prefersReduced ? {} : { opacity: 0, y: 16 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as Easing } },
//     exit:    prefersReduced ? {} : { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" as Easing } },
//   };

//   return (
//     <section className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 font-sans">
//       {/* ── HERO ─────────────────────────────────────────────────── */}
//       <div className="max-w-4xl mx-auto text-center mb-8">
//         <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#004b8d] bg-white border border-[#004b8d]/20 px-4 py-1.5 rounded-full mb-4 shadow-sm">
//           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//           Garud Tata · Live Offers
//         </span>
//         <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black tracking-tight text-slate-800 leading-[1.15]">
//           Find Your Tata Offer
//         </h1>
//         <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto mt-3 font-medium leading-relaxed">
//           Select your model and discover exclusive benefits available this month.
//         </p>
//       </div>

//       {/* ── MAIN CARD ─────────────────────────────────────────────── */}
//       <div className="max-w-[960px] mx-auto bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/80 overflow-hidden">
//         <StepProgress current={currentStep} total={stepLabels.length} labels={stepLabels} />

//         <div className="p-5 sm:p-8 md:p-10">
//           <AnimatePresence mode="wait">

//             {/* ── STEP 1 : CAR GRID ─────────────────────────────── */}
//             {!selectedCar && (
//               <motion.div key="step-car" {...motion_step}>
//                 <h2 className="text-lg sm:text-xl font-black text-slate-800 mb-6 text-center">
//                   Which Tata are you interested in?
//                 </h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
//                   {availableCars.map((car) => (
//                     <button
//                       key={car}
//                       onClick={() => { setSelectedCar(car); setSelectedPowertrain(null); setSelectedVariantId(null); }}
//                       className="group relative text-left rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#004b8d]"
//                     >
//                       {/* Image */}
//                       <div className="relative h-28 sm:h-32 bg-slate-100 overflow-hidden">
//                         <img
//                           src={getCarImage(car)}
//                           alt={`Tata ${car}`}
//                           loading="lazy"
//                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                         />
//                         {/* Subtle gradient footer on image */}
//                         <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/50 to-transparent" />
//                       </div>
//                       {/* Label */}
//                       <div className="px-3.5 py-3">
//                         <p className="text-sm font-black text-slate-800 uppercase tracking-wide leading-none group-hover:text-[#004b8d] transition-colors">
//                           {car}
//                         </p>
//                         <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
//                           {CAR_BODY_TYPES[car] ?? "Tata Vehicle"}
//                         </p>
//                       </div>
//                       {/* Hover accent bar */}
//                       <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#004b8d] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
//                     </button>
//                   ))}
//                 </div>
//               </motion.div>
//             )}

//             {/* ── STEP 2 : POWERTRAIN ───────────────────────────── */}
//             {selectedCar && !selectedPowertrain && (
//               <motion.div key="step-pt" {...motion_step}>
//                 <div className="text-center mb-8">
//                   <span className="inline-block text-xs font-black uppercase tracking-wider bg-[#004b8d]/8 text-[#004b8d] px-3 py-1 rounded-full mb-3">
//                     {selectedCar}
//                   </span>
//                   <h2 className="text-lg sm:text-xl font-black text-slate-800">
//                     Fuel or powertrain type?
//                   </h2>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
//                   {availablePowertrains.map((pt) => (
//                     <button
//                       key={pt}
//                       onClick={() => handleSelectPowertrain(pt)}
//                       className="group flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white hover:bg-[#004b8d]/4 transition-all shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#004b8d]"
//                     >
//                       <span className="text-2xl">
//                         {pt === "Electric" ? "⚡" : pt === "Petrol" ? "⛽" : pt === "Diesel" ? "🔧" : "🔋"}
//                       </span>
//                       <span className="text-sm font-black text-slate-800 group-hover:text-[#004b8d] transition-colors">
//                         {pt}
//                       </span>
//                       <span className="text-[10px] text-slate-400 font-semibold">
//                         {pt === "Electric" ? "Zero Emissions" : "Available Now"}
//                       </span>
//                     </button>
//                   ))}
//                 </div>

//                 <p className="text-center mt-8">
//                   <button onClick={goBack} className="text-xs text-slate-400 hover:text-[#004b8d] font-bold transition-colors underline-offset-4 hover:underline">
//                     ← Back to car selection
//                   </button>
//                 </p>
//               </motion.div>
//             )}

//             {/* ── STEP 3 : VARIANT (conditional) ───────────────── */}
//             {selectedCar && selectedPowertrain && needsVariant && !selectedVariantId && (
//               <motion.div key="step-var" {...motion_step}>
//                 <div className="text-center mb-8">
//                   <span className="inline-block text-xs font-black uppercase tracking-wider bg-[#004b8d]/8 text-[#004b8d] px-3 py-1 rounded-full mb-3">
//                     {selectedCar} · {selectedPowertrain}
//                   </span>
//                   <h2 className="text-lg sm:text-xl font-black text-slate-800">
//                     Choose your variant
//                   </h2>
//                   <p className="text-xs text-slate-400 mt-1 font-medium">
//                     Different variants have different eligible benefits
//                   </p>
//                 </div>

//                 <div className="space-y-3 max-w-lg mx-auto">
//                   {matchingOffers.map((offer) => (
//                     <button
//                       key={offer.id}
//                       onClick={() => setSelectedVariantId(offer.id)}
//                       className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white hover:bg-[#004b8d]/4 transition-all shadow-sm hover:shadow-md text-left group focus-visible:ring-2 focus-visible:ring-[#004b8d]"
//                     >
//                       <div>
//                         <p className="text-sm font-bold text-slate-800 group-hover:text-[#004b8d] transition-colors">
//                           {offer.variant}
//                         </p>
//                         <p className="text-xs text-slate-400 font-semibold mt-0.5">{offer.modelYear} Edition</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-[10px] uppercase font-bold tracking-wider text-[#004b8d]/50">Up to</p>
//                         <p className="text-base font-black text-[#004b8d]">{formatINR(offer.maxOffer)}</p>
//                       </div>
//                     </button>
//                   ))}
//                 </div>

//                 <p className="text-center mt-8">
//                   <button onClick={goBack} className="text-xs text-slate-400 hover:text-[#004b8d] font-bold transition-colors underline-offset-4 hover:underline">
//                     ← Back to powertrain
//                   </button>
//                 </p>
//               </motion.div>
//             )}

//             {/* ── STEP 4 : OFFER RESULT ─────────────────────────── */}
//             {finalOffer && (
//               <motion.div key="step-result" {...motion_step} className="max-w-xl mx-auto">
//                 {/* ── Offer Hero Card ── */}
//                 <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/60">

//                   {/* Hero Banner: deep navy with diagonal accent, car image overlay */}
//                   <div className="relative h-52 sm:h-60 overflow-hidden bg-[#003570]">
//                     {/* Geometric accent – adds depth without muddiness */}
//                     <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#0059a8]/50" />
//                     <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-[#002a58]/60" />

//                     {/* Car image — subtle, not overwhelming */}
//                     <img
//                       src={getCarImage(finalOffer.model, finalOffer.powertrain === "Electric")}
//                       alt={`Tata ${finalOffer.model}`}
//                       className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
//                     />

//                     {/* Content overlay */}
//                     <div className="absolute inset-0 flex flex-col justify-end p-6">
//                       <p className="text-[10px] uppercase font-black tracking-[0.25em] text-blue-300/80 mb-1">
//                         Your Garud Tata Offer
//                       </p>
//                       <h2 className="text-3xl sm:text-4xl font-black text-white leading-none">
//                         Tata {finalOffer.model}
//                         {finalOffer.category === "EV" && !finalOffer.model.includes("EV") ? " EV" : ""}
//                       </h2>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {[finalOffer.variant, finalOffer.powertrain, finalOffer.modelYear].map((tag) => (
//                           <span
//                             key={tag}
//                             className="text-[10px] font-bold uppercase tracking-wider bg-white/15 text-white/90 px-2.5 py-1 rounded-full"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Offer body */}
//                   <div className="p-6 sm:p-8 bg-white">
//                     {/* Max benefit highlight */}
//                     <div className="text-center mb-7 py-5 rounded-2xl bg-slate-50 border border-slate-100">
//                       <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">
//                         Maximum Eligible Benefits
//                       </p>
//                       <p className="text-4xl sm:text-5xl font-black text-[#004b8d] leading-none">
//                         <span className="text-lg align-middle font-bold text-[#004b8d]/60 mr-1">UP TO</span>
//                         <AnimatedCounter value={finalOffer.maxOffer} />
//                       </p>
//                     </div>

//                     {/* Breakdown grid */}
//                     <div className="mb-6">
//                       <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 text-center mb-3">
//                         Benefit Breakdown
//                       </p>
//                       <div className="grid grid-cols-2 gap-2.5">
//                         {finalOffer.cash > 0 && (
//                           <BenefitChip label="Consumer Discount" value={finalOffer.cash} />
//                         )}
//                         {finalOffer.exchangeBenefit > 0 && (
//                           <BenefitChip label="Exchange Bonus" value={finalOffer.exchangeBenefit} />
//                         )}
//                         {finalOffer.scrappageBenefit > 0 && (
//                           <BenefitChip label="Scrappage Bonus" value={finalOffer.scrappageBenefit} />
//                         )}
//                         {finalOffer.loyaltyBenefit > 0 && (
//                           <BenefitChip label="Loyalty Reward" value={finalOffer.loyaltyBenefit} />
//                         )}
//                       </div>

//                       {/* Total row */}
//                       <div className="flex items-center justify-between mt-3 px-4 py-3.5 rounded-xl bg-[#004b8d] text-white shadow-lg shadow-[#004b8d]/20">
//                         <span className="font-bold text-sm">Total Benefits</span>
//                         <span className="font-black text-lg">{formatINR(finalOffer.maxOffer)}</span>
//                       </div>
//                     </div>

//                     <p className="text-[10px] text-slate-400 leading-relaxed text-center mb-6">
//                       *Benefits are subject to variant, customer, and campaign eligibility. Exchange,
//                       scrappage, and loyalty benefits may be combined only where applicable.
//                     </p>

//                     {/* CTA buttons */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                       <button
//                         onClick={() => setModal({ open: true, type: "Offer Enquiry" })}
//                         className="w-full min-h-[52px] bg-[#004b8d] hover:bg-[#00366e] active:scale-[0.98] text-white font-black text-sm rounded-xl shadow-lg shadow-[#004b8d]/25 transition-all"
//                       >
//                         GET MY OFFER →
//                       </button>
//                       <button
//                         onClick={() => setModal({ open: true, type: "Test Drive" })}
//                         className="w-full min-h-[52px] border-2 border-[#004b8d] text-[#004b8d] hover:bg-[#004b8d]/5 active:scale-[0.98] font-black text-sm rounded-xl transition-all"
//                       >
//                         BOOK TEST DRIVE
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Back / Reset */}
//                 <div className="flex items-center justify-center gap-5 mt-5 text-xs font-bold text-slate-400">
//                   <button onClick={goBack} className="hover:text-[#004b8d] transition-colors hover:underline underline-offset-4">
//                     ← Change Selection
//                   </button>
//                   <span className="text-slate-300">|</span>
//                   <button onClick={reset} className="hover:text-[#004b8d] transition-colors hover:underline underline-offset-4">
//                     Start Over
//                   </button>
//                 </div>
//               </motion.div>
//             )}

//             {/* ── NO MATCH ──────────────────────────────────────── */}
//             {selectedCar && selectedPowertrain && !finalOffer && matchingOffers.length === 0 && (
//               <motion.div key="no-match" {...motion_step} className="text-center py-14 max-w-sm mx-auto">
//                 <div className="w-14 h-14 rounded-2xl bg-[#004b8d]/8 flex items-center justify-center mx-auto mb-4 text-2xl">
//                   🔍
//                 </div>
//                 <h3 className="text-lg font-black text-slate-800 mb-2">No Specific Offer Found</h3>
//                 <p className="text-sm text-slate-500 mb-7 leading-relaxed font-medium">
//                   Our team can verify the latest applicable benefits for your exact requirement.
//                 </p>
//                 <button
//                   onClick={() => setModal({ open: true, type: "Offer Enquiry" })}
//                   className="w-full min-h-[48px] bg-[#004b8d] hover:bg-[#00366e] font-black text-sm rounded-xl text-white transition-colors shadow-lg shadow-[#004b8d]/20 mb-4"
//                 >
//                   Talk to Garud Tata
//                 </button>
//                 <button onClick={reset} className="text-xs text-slate-400 hover:text-[#004b8d] font-bold hover:underline underline-offset-4 transition-colors">
//                   Start Over
//                 </button>
//               </motion.div>
//             )}

//           </AnimatePresence>
//         </div>
//       </div>

//       {/* ── TRUST BAR ──────────────────────────────────────────────── */}
//       <div className="max-w-3xl mx-auto mt-10 text-center">
//         <div className="flex flex-wrap items-center justify-center gap-y-2.5 gap-x-5 text-[11px] font-bold text-slate-400">
//           {[
//             "Verified Garud Offers",
//             "MY25 / MY24 Benefits",
//             "Exchange & Scrappage",
//             "Test Drive Available",
//           ].map((t) => (
//             <span key={t} className="flex items-center gap-1.5">
//               <span className="text-emerald-500">✓</span> {t}
//             </span>
//           ))}
//         </div>
//         <p className="text-[10px] text-slate-400 font-semibold mt-5 uppercase tracking-widest">
//           Offers Last Updated: {LAST_UPDATED}
//         </p>
//       </div>

//       {/* ── MODAL ─────────────────────────────────────────────────── */}
//       <OfferEnquiryModal
//         isOpen={modal.open}
//         onClose={() => setModal((p) => ({ ...p, open: false }))}
//         selectedCar={selectedCar ?? "Tata Car"}
//         enquiryType={modal.type}
//         offerDetails={finalOffer}
//       />
//     </section>
//   );

//   function handleSelectPowertrain(pt: Powertrain) {
//     setSelectedPowertrain(pt);
//     setSelectedVariantId(null);
//   }
// }

// // ── Small reusable benefit chip ───────────────────────────────────────────────
// function BenefitChip({ label, value }: { label: string; value: number }) {
//   return (
//     <div className="flex flex-col px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-100">
//       <span className="text-[10px] text-slate-500 font-semibold leading-tight">{label}</span>
//       <span className="text-sm font-black text-slate-800 mt-0.5">{formatINR(value)}</span>
//     </div>
//   );
// }


















// "use client";

// import React, { useState, useMemo, useEffect } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useReducedMotion,
//   animate,
//   type Easing,
// } from "framer-motion";
// import {
//   OFFERS,
//   TataOffer,
//   Powertrain,
// } from "@/lib/offersdata";

// // ============================================================================
// // LOCAL HELPERS & TYPES
// // ============================================================================
// type EnquiryType = "Offer Enquiry" | "Test Drive";

// // ✅ 3 showrooms as requested
// const SHOWROOMS = [
//   "Garud Tata Palam",
//   "Garud Tata Narela",
//   "Garud Tata Najafgarh",
// ];

// // Showroom location details for display
// const SHOWROOM_META: Record<string, { area: string; city: string }> = {
//   "Garud Tata Palam":      { area: "Palam",      city: "South-West Delhi" },
//   "Garud Tata Narela":     { area: "Narela",     city: "North Delhi" },
//   "Garud Tata Najafgarh":  { area: "Najafgarh",  city: "West Delhi" },
// };

// const LAST_UPDATED = new Date().toLocaleDateString("en-IN", {
//   month: "long",
//   year: "numeric",
// });

// const formatINR = (amount: number) =>
//   new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(amount);

// // ============================================================================
// // CAR METADATA & IMAGES
// // ============================================================================
// const CAR_BODY_TYPES: Record<string, string> = {
//   Tiago:   "Hatchback",
//   Punch:   "Compact SUV",
//   Altroz:  "Premium Hatchback",
//   Nexon:   "Compact SUV",
//   Curvv:   "SUV Coupé",
//   Harrier: "Premium SUV",
//   Safari:  "Flagship 7-Seater SUV",
// };

// const CAR_IMAGES: Record<string, string[]> = {
//   tiago:      ["/Car images/Tata tiago/image1.jpg","/Car images/Tata tiago/image2.jpg","/Car images/Tata tiago/image3.jpg"],
//   "tiago-ev": ["/Car images/Tata tiago/image1.jpg","/Car images/Tata tiago/image2.jpg","/Car images/Tata tiago/image3.jpg"],
//   tigor:      ["/Car images/Tata tigor/image1.avif","/Car images/Tata tigor/image2.avif"],
//   altroz:     ["/Car images/Tata altroz/image1.avif","/Car images/Tata altroz/image2.avif"],
//   punch:      ["/Car images/Tata punch/image1.jpg","/Car images/Tata punch/image2.jpg"],
//   "punch-ev": ["/Car images/Tata punch/image1.jpg","/Car images/Tata punch/image2.jpg"],
//   nexon:      ["/Car images/Tata nexon/image1.avif","/Car images/Tata nexon/image2.avif"],
//   "nexon-ev": ["/Car images/Tata nexon/image1.avif","/Car images/Tata nexon/image2.avif"],
//   curvv:      ["/Car images/Tata curv/image1.avif","/Car images/Tata curv/image2.avif"],
//   "curvv-ev": ["/Car images/Tata curv/image1.avif","/Car images/Tata curv/image2.avif"],
//   harrier:    ["/Car images/Tata harrier/image1.avif","/Car images/Tata harrier/image2.avif"],
//   "harrier-ev":["/Car images/Tata harrier/image1.avif","/Car images/Tata harrier/image2.avif"],
//   safari:     ["/Car images/Tata safari/image1.avif","/Car images/Tata safari/image2.avif"],
// };

// const getCarImage = (model: string, isEV = false) => {
//   const key = isEV ? `${model.toLowerCase()}-ev` : model.toLowerCase();
//   return CAR_IMAGES[key]?.[0] || CAR_IMAGES[model.toLowerCase()]?.[0] || "/placeholder-car.jpg";
// };

// // ============================================================================
// // ANIMATED COUNTER
// // ============================================================================
// function AnimatedCounter({ value }: { value: number }) {
//   const prefersReduced = useReducedMotion();
//   const [display, setDisplay] = useState(prefersReduced ? value : 0);

//   useEffect(() => {
//     if (prefersReduced) { setDisplay(value); return; }
//     const c = animate(0, value, {
//       duration: 1.1,
//       ease: [0.16, 1, 0.3, 1],
//       onUpdate: (v) => setDisplay(Math.round(v)),
//     });
//     return () => c.stop();
//   }, [value, prefersReduced]);

//   return <span>{formatINR(display)}</span>;
// }

// // ============================================================================
// // ENQUIRY MODAL
// // — Car/variant summary card with inline car-change picker
// // — Location (city) field, auto-detected via Geolocation API
// // — Sends `name` + `mobile` to match the API contract
// // ============================================================================
// interface EnquiryModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   /** The car the user arrived with (pre-fill). They can change it inside the modal. */
//   initialCar: string;
//   enquiryType: EnquiryType;
//   offerDetails?: TataOffer | null;
//   /** Full list of available car names so the user can switch */
//   availableCars: string[];
//   /** Called when user picks a different car inside the modal — parent should update offer details */
//   onCarChange?: (car: string) => void;
// }

// function OfferEnquiryModal({
//   isOpen,
//   onClose,
//   initialCar,
//   enquiryType,
//   offerDetails,
//   availableCars,
//   onCarChange,
// }: EnquiryModalProps) {
//   const [name, setName]               = useState("");
//   const [mobile, setMobile]           = useState("");
//   const [location, setLocation]       = useState("");
//   const [locationLoading, setLocLoad] = useState(false);
//   const [showroom, setShowroom]       = useState(SHOWROOMS[0]);
//   const [isSubmitting, setSubmitting] = useState(false);
//   const [isSuccess, setSuccess]       = useState(false);
//   const [error, setError]             = useState("");
//   const [showCarPicker, setShowCarPicker] = useState(false);
//   // Local selected car — starts with whatever the parent passed, user can change
//   const [activeCar, setActiveCar]     = useState(initialCar);

//   // Keep activeCar in sync if parent reopens modal with a different car
//   useEffect(() => { setActiveCar(initialCar); }, [initialCar]);

//   // Auto-detect city via reverse-geocode when modal first opens
//   useEffect(() => {
//     if (!isOpen || location) return;
//     if (!navigator.geolocation) return;
//     setLocLoad(true);
//     navigator.geolocation.getCurrentPosition(
//       async ({ coords }) => {
//         try {
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
//           );
//           const data = await res.json();
//           const city =
//             data.address?.city ||
//             data.address?.town ||
//             data.address?.village ||
//             data.address?.county ||
//             "";
//           if (city) setLocation(city);
//         } catch { /* silent */ }
//         setLocLoad(false);
//       },
//       () => setLocLoad(false),
//       { timeout: 6000 }
//     );
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleCarSelect = (car: string) => {
//     setActiveCar(car);
//     setShowCarPicker(false);
//     onCarChange?.(car);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (mobile.replace(/\D/g, "").length < 10) {
//       setError("Please enter a valid 10-digit mobile number.");
//       return;
//     }
//     setSubmitting(true);
//     setError("");

//     try {
//       const w = window as unknown as { fbq?: (...a: unknown[]) => void };
//       w.fbq?.("track", "Lead", {
//         content_name: activeCar,
//         content_category: enquiryType,
//         value: offerDetails?.maxOffer ?? 0,
//         currency: "INR",
//       });

//       await fetch("/api/enquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           mobile,
//           car: activeCar,
//           variant: offerDetails?.variant ?? "General",
//           type: enquiryType,
//           showroom,
//           location: location || null,
//           source: "offers-page",
//         }),
//       });

//       setSuccess(true);
//     } catch {
//       setSuccess(true);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
//       <div
//         role="dialog"
//         aria-modal="true"
//         className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[90vh]"
//       >
//         {/* ── Fixed header ── */}
//         <div className="bg-[#004b8d] px-5 py-4 flex items-center justify-between shrink-0 rounded-t-3xl sm:rounded-t-2xl">
//           <div>
//             <p className="text-[10px] uppercase tracking-widest font-bold text-blue-200">
//               {enquiryType === "Test Drive" ? "Book a Test Drive" : "Claim Your Offer"}
//             </p>
//             <p className="text-white font-black text-base leading-tight">
//               Tata {activeCar}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors shrink-0"
//             aria-label="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {/* ── Scrollable body ── */}
//         <div className="overflow-y-auto flex-1 p-5">
//           {isSuccess ? (
//             <div className="text-center py-8">
//               <div className="w-14 h-14 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-4 text-emerald-600 text-2xl font-black">
//                 ✓
//               </div>
//               <h3 className="text-xl font-black text-slate-800 mb-2">We'll Be In Touch!</h3>
//               <p className="text-sm text-slate-500 mb-6 leading-relaxed">
//                 Our <strong className="text-slate-700">{showroom}</strong> team will call you shortly
//                 with the best deal on your{" "}
//                 <strong className="text-[#004b8d]">Tata {activeCar}</strong>.
//               </p>
//               <button
//                 onClick={onClose}
//                 className="w-full min-h-[48px] bg-[#004b8d] hover:bg-[#00366e] font-bold rounded-xl text-white transition-colors"
//               >
//                 Done
//               </button>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-4">

//               {/* ── Car & Variant summary card ── */}
//               <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
//                 <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-white">
//                   <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
//                     Selected Vehicle
//                   </p>
//                   <button
//                     type="button"
//                     onClick={() => setShowCarPicker((v) => !v)}
//                     className="text-[11px] font-bold text-[#004b8d] hover:underline underline-offset-2 flex items-center gap-1"
//                   >
//                     {showCarPicker ? "Cancel" : "Change Car"}
//                     {!showCarPicker && <span className="text-[10px]">↓</span>}
//                   </button>
//                 </div>

//                 {/* Car picker (inline dropdown) */}
//                 {showCarPicker ? (
//                   <div className="grid grid-cols-3 gap-2 p-3">
//                     {availableCars.map((car) => (
//                       <button
//                         key={car}
//                         type="button"
//                         onClick={() => handleCarSelect(car)}
//                         className={`flex flex-col items-center py-2.5 px-1 rounded-xl border text-center transition-all text-xs font-bold ${
//                           activeCar === car
//                             ? "border-[#004b8d] bg-[#004b8d]/8 text-[#004b8d]"
//                             : "border-slate-200 bg-white text-slate-600 hover:border-[#004b8d]/50"
//                         }`}
//                       >
//                         <img
//                           src={getCarImage(car)}
//                           alt={car}
//                           className="w-14 h-9 object-cover rounded mb-1"
//                         />
//                         {car}
//                       </button>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-3 px-4 py-3">
//                     <img
//                       src={getCarImage(activeCar, offerDetails?.powertrain === "Electric")}
//                       alt={activeCar}
//                       className="w-16 h-11 object-cover rounded-lg border border-slate-200 shrink-0"
//                     />
//                     <div className="min-w-0">
//                       <p className="text-sm font-black text-slate-800">
//                         Tata {activeCar}
//                         {offerDetails?.category === "EV" && !activeCar.includes("EV") ? " EV" : ""}
//                       </p>
//                       {offerDetails ? (
//                         <>
//                           <p className="text-[11px] text-slate-500 font-semibold truncate">
//                             {offerDetails.variant}
//                           </p>
//                           <p className="text-[11px] font-black text-[#004b8d] mt-0.5">
//                             Up to {formatINR(offerDetails.maxOffer)}
//                           </p>
//                         </>
//                       ) : (
//                         <p className="text-[11px] text-slate-400 font-medium">General Enquiry</p>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {error && (
//                 <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5 font-medium">
//                   {error}
//                 </p>
//               )}

//               {/* ── Name ── */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter your full name"
//                   className="w-full bg-slate-50 border border-slate-200 focus:border-[#004b8d] focus:ring-2 focus:ring-[#004b8d]/20 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-all font-medium"
//                 />
//               </div>

//               {/* ── Mobile ── */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Mobile Number
//                 </label>
//                 <input
//                   type="tel"
//                   required
//                   maxLength={10}
//                   value={mobile}
//                   onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
//                   placeholder="10-digit mobile number"
//                   className="w-full bg-slate-50 border border-slate-200 focus:border-[#004b8d] focus:ring-2 focus:ring-[#004b8d]/20 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-all font-medium"
//                 />
//               </div>

//               {/* ── Location ── */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Your City / Location
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     placeholder={locationLoading ? "Detecting your location…" : "e.g. New Delhi, Gurugram"}
//                     className="w-full bg-slate-50 border border-slate-200 focus:border-[#004b8d] focus:ring-2 focus:ring-[#004b8d]/20 rounded-xl px-4 py-3 pr-10 text-sm text-slate-800 outline-none transition-all font-medium"
//                   />
//                   {/* Location pin icon / spinner */}
//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">
//                     {locationLoading ? (
//                       <span className="inline-block w-4 h-4 border-2 border-slate-300 border-t-[#004b8d] rounded-full animate-spin" />
//                     ) : (
//                       "📍"
//                     )}
//                   </span>
//                 </div>
//                 <p className="text-[10px] text-slate-400 mt-1 font-medium">
//                   Helps us assign the closest Garud Tata team to you.
//                 </p>
//               </div>

//               {/* ── Showroom picker ── */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Preferred Showroom
//                 </label>
//                 <div className="space-y-2">
//                   {SHOWROOMS.map((s) => {
//                     const meta = SHOWROOM_META[s];
//                     return (
//                       <button
//                         key={s}
//                         type="button"
//                         onClick={() => setShowroom(s)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
//                           showroom === s
//                             ? "border-[#004b8d] bg-[#004b8d]/5 ring-2 ring-[#004b8d]/20"
//                             : "border-slate-200 hover:border-[#004b8d]/40 bg-white"
//                         }`}
//                       >
//                         <div>
//                           <p className={`text-sm font-bold ${showroom === s ? "text-[#004b8d]" : "text-slate-700"}`}>
//                             {s}
//                           </p>
//                           <p className="text-[11px] text-slate-400 font-medium mt-0.5">{meta.city}</p>
//                         </div>
//                         <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
//                           showroom === s ? "border-[#004b8d] bg-[#004b8d]" : "border-slate-300"
//                         }`}>
//                           {showroom === s && <span className="w-2 h-2 rounded-full bg-white block" />}
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* ── Submit ── */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full min-h-[52px] bg-[#004b8d] hover:bg-[#00366e] disabled:opacity-60 text-white font-black rounded-xl transition-colors shadow-lg shadow-[#004b8d]/25 text-sm"
//               >
//                 {isSubmitting
//                   ? "Submitting…"
//                   : enquiryType === "Test Drive"
//                   ? "Confirm Test Drive →"
//                   : "Get Best Price & Offer →"}
//               </button>

//               <p className="text-[10px] text-center text-slate-400 leading-relaxed pb-1">
//                 By submitting, you agree to be contacted via call or WhatsApp by Garud Tata.
//               </p>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================================
// // STEP PROGRESS BAR
// // ============================================================================
// function StepProgress({
//   current,
//   total,
//   labels,
// }: {
//   current: number;
//   total: number;
//   labels: string[];
// }) {
//   return (
//     <div className="px-5 sm:px-8 py-4 border-b border-slate-200 bg-white">
//       {/* Mobile */}
//       <div className="flex sm:hidden items-center justify-between text-xs">
//         <div className="flex items-center gap-2">
//           <span className="w-6 h-6 rounded-full bg-[#004b8d] text-white flex items-center justify-center text-[11px] font-black">
//             {current}
//           </span>
//           <span className="font-bold text-slate-700">{labels[current - 1]}</span>
//         </div>
//         <span className="text-slate-400 font-semibold">{current} / {total}</span>
//       </div>

//       {/* Desktop */}
//       <div className="hidden sm:flex items-center justify-between relative">
//         {/* Track */}
//         <div className="absolute top-3.5 left-0 right-0 h-0.5 bg-slate-200 z-0" />
//         <div
//           className="absolute top-3.5 left-0 h-0.5 bg-[#004b8d] z-0 transition-all duration-500"
//           style={{ width: `${((current - 1) / (total - 1)) * 100}%` }}
//         />

//         {labels.map((label, i) => {
//           const step = i + 1;
//           const done = step < current;
//           const active = step === current;
//           return (
//             <div key={label} className="relative z-10 flex flex-col items-center gap-1.5">
//               <span
//                 className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-300 ${
//                   done
//                     ? "bg-[#004b8d] text-white"
//                     : active
//                     ? "bg-[#004b8d] text-white ring-4 ring-[#004b8d]/20"
//                     : "bg-slate-100 text-slate-400 border border-slate-200"
//                 }`}
//               >
//                 {done ? "✓" : step}
//               </span>
//               <span
//                 className={`text-[10px] font-bold uppercase tracking-wider ${
//                   active ? "text-[#004b8d]" : done ? "text-slate-500" : "text-slate-300"
//                 }`}
//               >
//                 {label}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // ============================================================================
// // MAIN OFFERS COMPONENT
// // ============================================================================
// export default function Offers() {
//   const prefersReduced = useReducedMotion();

//   const [selectedCar, setSelectedCar]           = useState<string | null>(null);
//   const [selectedPowertrain, setSelectedPowertrain] = useState<Powertrain | null>(null);
//   const [selectedVariantId, setSelectedVariantId]   = useState<string | null>(null);
//   const [modal, setModal] = useState<{ open: boolean; type: EnquiryType }>({
//     open: false,
//     type: "Offer Enquiry",
//   });

//   const availableCars = useMemo(() => {
//     const list: string[] = [];
//     OFFERS.forEach((o) => { if (o.active && !list.includes(o.model)) list.push(o.model); });
//     return list;
//   }, []);

//   const availablePowertrains = useMemo(() => {
//     if (!selectedCar) return [];
//     return Array.from(
//       new Set(OFFERS.filter((o) => o.active && o.model === selectedCar).map((o) => o.powertrain))
//     );
//   }, [selectedCar]);

//   const matchingOffers = useMemo(() => {
//     if (!selectedCar || !selectedPowertrain) return [];
//     return OFFERS.filter((o) => o.active && o.model === selectedCar && o.powertrain === selectedPowertrain);
//   }, [selectedCar, selectedPowertrain]);

//   const needsVariant = matchingOffers.length > 1;

//   const finalOffer = useMemo<TataOffer | null>(() => {
//     if (!selectedCar || !selectedPowertrain || !matchingOffers.length) return null;
//     if (matchingOffers.length === 1) return matchingOffers[0];
//     return matchingOffers.find((o) => o.id === selectedVariantId) ?? null;
//   }, [selectedCar, selectedPowertrain, matchingOffers, selectedVariantId]);

//   const stepLabels = needsVariant
//     ? ["Car", "Powertrain", "Variant", "Offer"]
//     : ["Car", "Powertrain", "Offer"];

//   const currentStep = useMemo(() => {
//     if (!selectedCar) return 1;
//     if (!selectedPowertrain) return 2;
//     if (needsVariant && !selectedVariantId) return 3;
//     return stepLabels.length;
//   }, [selectedCar, selectedPowertrain, needsVariant, selectedVariantId, stepLabels.length]);

//   const goBack = () => {
//     if (needsVariant && selectedVariantId) { setSelectedVariantId(null); return; }
//     if (selectedPowertrain) { setSelectedPowertrain(null); return; }
//     setSelectedCar(null);
//   };

//   const reset = () => {
//     setSelectedCar(null);
//     setSelectedPowertrain(null);
//     setSelectedVariantId(null);
//   };

//   const motion_step = {
//     initial: prefersReduced ? {} : { opacity: 0, y: 16 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as Easing } },
//     exit:    prefersReduced ? {} : { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" as Easing } },
//   };

//   return (
//     <section className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 font-sans">
//       {/* ── HERO ─────────────────────────────────────────────────── */}
//       <div className="max-w-4xl mx-auto text-center mb-8">
//         <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#004b8d] bg-white border border-[#004b8d]/20 px-4 py-1.5 rounded-full mb-4 shadow-sm">
//           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//           Garud Tata · Live Offers
//         </span>
//         <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black tracking-tight text-slate-800 leading-[1.15]">
//           Find Your Tata Offer
//         </h1>
//         <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto mt-3 font-medium leading-relaxed">
//           Select your model and discover exclusive benefits available this month.
//         </p>
//       </div>

//       {/* ── MAIN CARD ─────────────────────────────────────────────── */}
//       <div className="max-w-[960px] mx-auto bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/80 overflow-hidden">
//         <StepProgress current={currentStep} total={stepLabels.length} labels={stepLabels} />

//         <div className="p-5 sm:p-8 md:p-10">
//           <AnimatePresence mode="wait">

//             {/* ── STEP 1 : CAR GRID ─────────────────────────────── */}
//             {!selectedCar && (
//               <motion.div key="step-car" {...motion_step}>
//                 <h2 className="text-lg sm:text-xl font-black text-slate-800 mb-6 text-center">
//                   Which Tata are you interested in?
//                 </h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
//                   {availableCars.map((car) => (
//                     <button
//                       key={car}
//                       onClick={() => { setSelectedCar(car); setSelectedPowertrain(null); setSelectedVariantId(null); }}
//                       className="group relative text-left rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#004b8d]"
//                     >
//                       {/* Image */}
//                       <div className="relative h-28 sm:h-32 bg-slate-100 overflow-hidden">
//                         <img
//                           src={getCarImage(car)}
//                           alt={`Tata ${car}`}
//                           loading="lazy"
//                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                         />
//                         {/* Subtle gradient footer on image */}
//                         <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/50 to-transparent" />
//                       </div>
//                       {/* Label */}
//                       <div className="px-3.5 py-3">
//                         <p className="text-sm font-black text-slate-800 uppercase tracking-wide leading-none group-hover:text-[#004b8d] transition-colors">
//                           {car}
//                         </p>
//                         <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
//                           {CAR_BODY_TYPES[car] ?? "Tata Vehicle"}
//                         </p>
//                       </div>
//                       {/* Hover accent bar */}
//                       <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#004b8d] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
//                     </button>
//                   ))}
//                 </div>
//               </motion.div>
//             )}

//             {/* ── STEP 2 : POWERTRAIN ───────────────────────────── */}
//             {selectedCar && !selectedPowertrain && (
//               <motion.div key="step-pt" {...motion_step}>
//                 <div className="text-center mb-8">
//                   <span className="inline-block text-xs font-black uppercase tracking-wider bg-[#004b8d]/8 text-[#004b8d] px-3 py-1 rounded-full mb-3">
//                     {selectedCar}
//                   </span>
//                   <h2 className="text-lg sm:text-xl font-black text-slate-800">
//                     Fuel or powertrain type?
//                   </h2>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
//                   {availablePowertrains.map((pt) => (
//                     <button
//                       key={pt}
//                       onClick={() => handleSelectPowertrain(pt)}
//                       className="group flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white hover:bg-[#004b8d]/4 transition-all shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#004b8d]"
//                     >
//                       <span className="text-2xl">
//                         {pt === "Electric" ? "⚡" : pt === "Petrol" ? "⛽" : pt === "Diesel" ? "🔧" : "🔋"}
//                       </span>
//                       <span className="text-sm font-black text-slate-800 group-hover:text-[#004b8d] transition-colors">
//                         {pt}
//                       </span>
//                       <span className="text-[10px] text-slate-400 font-semibold">
//                         {pt === "Electric" ? "Zero Emissions" : "Available Now"}
//                       </span>
//                     </button>
//                   ))}
//                 </div>

//                 <p className="text-center mt-8">
//                   <button onClick={goBack} className="text-xs text-slate-400 hover:text-[#004b8d] font-bold transition-colors underline-offset-4 hover:underline">
//                     ← Back to car selection
//                   </button>
//                 </p>
//               </motion.div>
//             )}

//             {/* ── STEP 3 : VARIANT (conditional) ───────────────── */}
//             {selectedCar && selectedPowertrain && needsVariant && !selectedVariantId && (
//               <motion.div key="step-var" {...motion_step}>
//                 <div className="text-center mb-8">
//                   <span className="inline-block text-xs font-black uppercase tracking-wider bg-[#004b8d]/8 text-[#004b8d] px-3 py-1 rounded-full mb-3">
//                     {selectedCar} · {selectedPowertrain}
//                   </span>
//                   <h2 className="text-lg sm:text-xl font-black text-slate-800">
//                     Choose your variant
//                   </h2>
//                   <p className="text-xs text-slate-400 mt-1 font-medium">
//                     Different variants have different eligible benefits
//                   </p>
//                 </div>

//                 <div className="space-y-3 max-w-lg mx-auto">
//                   {matchingOffers.map((offer) => (
//                     <button
//                       key={offer.id}
//                       onClick={() => setSelectedVariantId(offer.id)}
//                       className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white hover:bg-[#004b8d]/4 transition-all shadow-sm hover:shadow-md text-left group focus-visible:ring-2 focus-visible:ring-[#004b8d]"
//                     >
//                       <div>
//                         <p className="text-sm font-bold text-slate-800 group-hover:text-[#004b8d] transition-colors">
//                           {offer.variant}
//                         </p>
//                         <p className="text-xs text-slate-400 font-semibold mt-0.5">{offer.modelYear} Edition</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-[10px] uppercase font-bold tracking-wider text-[#004b8d]/50">Up to</p>
//                         <p className="text-base font-black text-[#004b8d]">{formatINR(offer.maxOffer)}</p>
//                       </div>
//                     </button>
//                   ))}
//                 </div>

//                 <p className="text-center mt-8">
//                   <button onClick={goBack} className="text-xs text-slate-400 hover:text-[#004b8d] font-bold transition-colors underline-offset-4 hover:underline">
//                     ← Back to powertrain
//                   </button>
//                 </p>
//               </motion.div>
//             )}

//             {/* ── STEP 4 : OFFER RESULT ─────────────────────────── */}
//             {finalOffer && (
//               <motion.div key="step-result" {...motion_step} className="max-w-xl mx-auto">
//                 {/* ── Offer Hero Card ── */}
//                 <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/60">

//                   {/* Hero Banner: deep navy with diagonal accent, car image overlay */}
//                   <div className="relative h-52 sm:h-60 overflow-hidden bg-[#003570]">
//                     {/* Geometric accent – adds depth without muddiness */}
//                     <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#0059a8]/50" />
//                     <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-[#002a58]/60" />

//                     {/* Car image — subtle, not overwhelming */}
//                     <img
//                       src={getCarImage(finalOffer.model, finalOffer.powertrain === "Electric")}
//                       alt={`Tata ${finalOffer.model}`}
//                       className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
//                     />

//                     {/* Content overlay */}
//                     <div className="absolute inset-0 flex flex-col justify-end p-6">
//                       <p className="text-[10px] uppercase font-black tracking-[0.25em] text-blue-300/80 mb-1">
//                         Your Garud Tata Offer
//                       </p>
//                       <h2 className="text-3xl sm:text-4xl font-black text-white leading-none">
//                         Tata {finalOffer.model}
//                         {finalOffer.category === "EV" && !finalOffer.model.includes("EV") ? " EV" : ""}
//                       </h2>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {[finalOffer.variant, finalOffer.powertrain, finalOffer.modelYear].map((tag) => (
//                           <span
//                             key={tag}
//                             className="text-[10px] font-bold uppercase tracking-wider bg-white/15 text-white/90 px-2.5 py-1 rounded-full"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Offer body */}
//                   <div className="p-6 sm:p-8 bg-white">
//                     {/* Max benefit highlight */}
//                     <div className="text-center mb-7 py-5 rounded-2xl bg-slate-50 border border-slate-100">
//                       <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">
//                         Maximum Eligible Benefits
//                       </p>
//                       <p className="text-4xl sm:text-5xl font-black text-[#004b8d] leading-none">
//                         <span className="text-lg align-middle font-bold text-[#004b8d]/60 mr-1">UP TO</span>
//                         <AnimatedCounter value={finalOffer.maxOffer} />
//                       </p>
//                     </div>

//                     {/* Breakdown grid */}
//                     <div className="mb-6">
//                       <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 text-center mb-3">
//                         Benefit Breakdown
//                       </p>
//                       <div className="grid grid-cols-2 gap-2.5">
//                         {finalOffer.cash > 0 && (
//                           <BenefitChip label="Consumer Discount" value={finalOffer.cash} />
//                         )}
//                         {finalOffer.exchangeBenefit > 0 && (
//                           <BenefitChip label="Exchange Bonus" value={finalOffer.exchangeBenefit} />
//                         )}
//                         {finalOffer.scrappageBenefit > 0 && (
//                           <BenefitChip label="Scrappage Bonus" value={finalOffer.scrappageBenefit} />
//                         )}
//                         {finalOffer.loyaltyBenefit > 0 && (
//                           <BenefitChip label="Loyalty Reward" value={finalOffer.loyaltyBenefit} />
//                         )}
//                       </div>

//                       {/* Total row */}
//                       <div className="flex items-center justify-between mt-3 px-4 py-3.5 rounded-xl bg-[#004b8d] text-white shadow-lg shadow-[#004b8d]/20">
//                         <span className="font-bold text-sm">Total Benefits</span>
//                         <span className="font-black text-lg">{formatINR(finalOffer.maxOffer)}</span>
//                       </div>
//                     </div>

//                     <p className="text-[10px] text-slate-400 leading-relaxed text-center mb-6">
//                       *Benefits are subject to variant, customer, and campaign eligibility. Exchange,
//                       scrappage, and loyalty benefits may be combined only where applicable.
//                     </p>

//                     {/* CTA buttons */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                       <button
//                         onClick={() => setModal({ open: true, type: "Offer Enquiry" })}
//                         className="w-full min-h-[52px] bg-[#004b8d] hover:bg-[#00366e] active:scale-[0.98] text-white font-black text-sm rounded-xl shadow-lg shadow-[#004b8d]/25 transition-all"
//                       >
//                         GET MY OFFER →
//                       </button>
//                       <button
//                         onClick={() => setModal({ open: true, type: "Test Drive" })}
//                         className="w-full min-h-[52px] border-2 border-[#004b8d] text-[#004b8d] hover:bg-[#004b8d]/5 active:scale-[0.98] font-black text-sm rounded-xl transition-all"
//                       >
//                         BOOK TEST DRIVE
//                       </button>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Back / Reset */}
//                 <div className="flex items-center justify-center gap-5 mt-5 text-xs font-bold text-slate-400">
//                   <button onClick={goBack} className="hover:text-[#004b8d] transition-colors hover:underline underline-offset-4">
//                     ← Change Selection
//                   </button>
//                   <span className="text-slate-300">|</span>
//                   <button onClick={reset} className="hover:text-[#004b8d] transition-colors hover:underline underline-offset-4">
//                     Start Over
//                   </button>
//                 </div>
//               </motion.div>
//             )}

//             {/* ── NO MATCH ──────────────────────────────────────── */}
//             {selectedCar && selectedPowertrain && !finalOffer && matchingOffers.length === 0 && (
//               <motion.div key="no-match" {...motion_step} className="text-center py-14 max-w-sm mx-auto">
//                 <div className="w-14 h-14 rounded-2xl bg-[#004b8d]/8 flex items-center justify-center mx-auto mb-4 text-2xl">
//                   🔍
//                 </div>
//                 <h3 className="text-lg font-black text-slate-800 mb-2">No Specific Offer Found</h3>
//                 <p className="text-sm text-slate-500 mb-7 leading-relaxed font-medium">
//                   Our team can verify the latest applicable benefits for your exact requirement.
//                 </p>
//                 <button
//                   onClick={() => setModal({ open: true, type: "Offer Enquiry" })}
//                   className="w-full min-h-[48px] bg-[#004b8d] hover:bg-[#00366e] font-black text-sm rounded-xl text-white transition-colors shadow-lg shadow-[#004b8d]/20 mb-4"
//                 >
//                   Talk to Garud Tata
//                 </button>
//                 <button onClick={reset} className="text-xs text-slate-400 hover:text-[#004b8d] font-bold hover:underline underline-offset-4 transition-colors">
//                   Start Over
//                 </button>
//               </motion.div>
//             )}

//           </AnimatePresence>
//         </div>
//       </div>

//       {/* ── TRUST BAR ──────────────────────────────────────────────── */}
//       <div className="max-w-3xl mx-auto mt-10 text-center">
//         <div className="flex flex-wrap items-center justify-center gap-y-2.5 gap-x-5 text-[11px] font-bold text-slate-400">
//           {[
//             "Verified Garud Offers",
//             "MY25 / MY24 Benefits",
//             "Exchange & Scrappage",
//             "Test Drive Available",
//           ].map((t) => (
//             <span key={t} className="flex items-center gap-1.5">
//               <span className="text-emerald-500">✓</span> {t}
//             </span>
//           ))}
//         </div>
//         <p className="text-[10px] text-slate-400 font-semibold mt-5 uppercase tracking-widest">
//           Offers Last Updated: {LAST_UPDATED}
//         </p>
//       </div>

//       {/* ── MODAL ─────────────────────────────────────────────────── */}
//       <OfferEnquiryModal
//         isOpen={modal.open}
//         onClose={() => setModal((p) => ({ ...p, open: false }))}
//         initialCar={selectedCar ?? availableCars[0] ?? "Tata Car"}
//         enquiryType={modal.type}
//         offerDetails={finalOffer}
//         availableCars={availableCars}
//         onCarChange={(car) => {
//           setSelectedCar(car);
//           setSelectedPowertrain(null);
//           setSelectedVariantId(null);
//         }}
//       />
//     </section>
//   );

//   function handleSelectPowertrain(pt: Powertrain) {
//     setSelectedPowertrain(pt);
//     setSelectedVariantId(null);
//   }
// }

// // ── Small reusable benefit chip ───────────────────────────────────────────────
// function BenefitChip({ label, value }: { label: string; value: number }) {
//   return (
//     <div className="flex flex-col px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-100">
//       <span className="text-[10px] text-slate-500 font-semibold leading-tight">{label}</span>
//       <span className="text-sm font-black text-slate-800 mt-0.5">{formatINR(value)}</span>
//     </div>
//   );
// }
















// // garud-tata\app\components\Offers.tsx


// "use client";

// import React, { useState, useMemo, useEffect } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useReducedMotion,
//   animate,
//   type Easing,
// } from "framer-motion";
// import Link from "next/link";
// import {
//   OFFERS,
//   TataOffer,
//   Powertrain,
// } from "@/lib/offersdata";

// // ============================================================================
// // LOCAL HELPERS & TYPES
// // ============================================================================
// type EnquiryType = "Offer Enquiry" | "Test Drive";

// // ✅ 3 showrooms as requested
// const SHOWROOMS = [
//   "Garud Tata Palam",
//   "Garud Tata Narela",
//   "Garud Tata Najafgarh",
// ];

// // Showroom location details for display
// const SHOWROOM_META: Record<string, { area: string; city: string }> = {
//   "Garud Tata Palam":      { area: "Palam",      city: "South-West Delhi" },
//   "Garud Tata Narela":     { area: "Narela",     city: "North Delhi" },
//   "Garud Tata Najafgarh":  { area: "Najafgarh",  city: "West Delhi" },
// };

// const LAST_UPDATED = new Date().toLocaleDateString("en-IN", {
//   month: "long",
//   year: "numeric",
// });

// const formatINR = (amount: number) =>
//   new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(amount);

// // ============================================================================
// // CAR METADATA & IMAGES
// // ============================================================================
// const CAR_BODY_TYPES: Record<string, string> = {
//   Tiago:   "Hatchback",
//   Punch:   "Compact SUV",
//   Altroz:  "Premium Hatchback",
//   Nexon:   "Compact SUV",
//   Curvv:   "SUV Coupé",
//   Harrier: "Premium SUV",
//   Safari:  "Flagship 7-Seater SUV",
// };

// const CAR_IMAGES: Record<string, string[]> = {
//   tiago:      ["/Car images/Tata tiago/image1.jpg","/Car images/Tata tiago/image2.jpg","/Car images/Tata tiago/image3.jpg"],
//   "tiago-ev": ["/Car images/Tata tiago/image1.jpg","/Car images/Tata tiago/image2.jpg","/Car images/Tata tiago/image3.jpg"],
//   tigor:      ["/Car images/Tata tigor/image1.avif","/Car images/Tata tigor/image2.avif"],
//   altroz:     ["/Car images/Tata altroz/image1.avif","/Car images/Tata altroz/image2.avif"],
//   punch:      ["/Car images/Tata punch/image1.jpg","/Car images/Tata punch/image2.jpg"],
//   "punch-ev": ["/Car images/Tata punch/image1.jpg","/Car images/Tata punch/image2.jpg"],
//   nexon:      ["/Car images/Tata nexon/image1.avif","/Car images/Tata nexon/image2.avif"],
//   "nexon-ev": ["/Car images/Tata nexon/image1.avif","/Car images/Tata nexon/image2.avif"],
//   curvv:      ["/Car images/Tata curv/image1.avif","/Car images/Tata curv/image2.avif"],
//   "curvv-ev": ["/Car images/Tata curv/image1.avif","/Car images/Tata curv/image2.avif"],
//   harrier:    ["/Car images/Tata harrier/image1.avif","/Car images/Tata harrier/image2.avif"],
//   "harrier-ev":["/Car images/Tata harrier/image1.avif","/Car images/Tata harrier/image2.avif"],
//   safari:     ["/Car images/Tata safari/image1.avif","/Car images/Tata safari/image2.avif"],
// };

// const getCarImage = (model: string, isEV = false) => {
//   const key = isEV ? `${model.toLowerCase()}-ev` : model.toLowerCase();
//   return CAR_IMAGES[key]?.[0] || CAR_IMAGES[model.toLowerCase()]?.[0] || "/placeholder-car.jpg";
// };

// // Resolve the best detail-page slug for a given car model name.
// // Uses the first active ICE offer for that model, falling back to any active offer.
// const getCarSlug = (model: string): string | null => {
//   const ice = OFFERS.find((o) => o.active && o.model === model && o.category === "ICE");
//   const any = OFFERS.find((o) => o.active && o.model === model);
//   return (ice ?? any)?.id ?? null;
// };

// // ============================================================================
// // ANIMATED COUNTER
// // ============================================================================
// function AnimatedCounter({ value }: { value: number }) {
//   const prefersReduced = useReducedMotion();
//   const [display, setDisplay] = useState(prefersReduced ? value : 0);

//   useEffect(() => {
//     if (prefersReduced) { setDisplay(value); return; }
//     const c = animate(0, value, {
//       duration: 1.1,
//       ease: [0.16, 1, 0.3, 1],
//       onUpdate: (v) => setDisplay(Math.round(v)),
//     });
//     return () => c.stop();
//   }, [value, prefersReduced]);

//   return <span>{formatINR(display)}</span>;
// }

// // ============================================================================
// // ENQUIRY MODAL
// // — Car/variant summary card with inline car-change picker
// // — Location (city) field, auto-detected via Geolocation API
// // — Sends `name` + `mobile` to match the API contract
// // ============================================================================
// interface EnquiryModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   /** The car the user arrived with (pre-fill). They can change it inside the modal. */
//   initialCar: string;
//   enquiryType: EnquiryType;
//   offerDetails?: TataOffer | null;
//   /** Full list of available car names so the user can switch */
//   availableCars: string[];
//   /** Called when user picks a different car inside the modal — parent should update offer details */
//   onCarChange?: (car: string) => void;
// }

// function OfferEnquiryModal({
//   isOpen,
//   onClose,
//   initialCar,
//   enquiryType,
//   offerDetails,
//   availableCars,
//   onCarChange,
// }: EnquiryModalProps) {
//   const [name, setName]               = useState("");
//   const [mobile, setMobile]           = useState("");
//   const [location, setLocation]       = useState("");
//   const [locationLoading, setLocLoad] = useState(false);
//   const [showroom, setShowroom]       = useState(SHOWROOMS[0]);
//   const [isSubmitting, setSubmitting] = useState(false);
//   const [isSuccess, setSuccess]       = useState(false);
//   const [error, setError]             = useState("");
//   const [showCarPicker, setShowCarPicker] = useState(false);
//   // Local selected car — starts with whatever the parent passed, user can change
//   const [activeCar, setActiveCar]     = useState(initialCar);

//   // Keep activeCar in sync if parent reopens modal with a different car
//   useEffect(() => { setActiveCar(initialCar); }, [initialCar]);

//   // Auto-detect city via reverse-geocode when modal first opens
//   useEffect(() => {
//     if (!isOpen || location) return;
//     if (!navigator.geolocation) return;
//     setLocLoad(true);
//     navigator.geolocation.getCurrentPosition(
//       async ({ coords }) => {
//         try {
//           const res = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
//           );
//           const data = await res.json();
//           const city =
//             data.address?.city ||
//             data.address?.town ||
//             data.address?.village ||
//             data.address?.county ||
//             "";
//           if (city) setLocation(city);
//         } catch { /* silent */ }
//         setLocLoad(false);
//       },
//       () => setLocLoad(false),
//       { timeout: 6000 }
//     );
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleCarSelect = (car: string) => {
//     setActiveCar(car);
//     setShowCarPicker(false);
//     onCarChange?.(car);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (mobile.replace(/\D/g, "").length < 10) {
//       setError("Please enter a valid 10-digit mobile number.");
//       return;
//     }
//     setSubmitting(true);
//     setError("");

//     try {
//       const w = window as unknown as { fbq?: (...a: unknown[]) => void };
//       w.fbq?.("track", "Lead", {
//         content_name: activeCar,
//         content_category: enquiryType,
//         value: offerDetails?.maxOffer ?? 0,
//         currency: "INR",
//       });

//       await fetch("/api/enquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           mobile,
//           car: activeCar,
//           variant: offerDetails?.variant ?? "General",
//           type: enquiryType,
//           showroom,
//           location: location || null,
//           source: "offers-page",
//         }),
//       });

//       setSuccess(true);
//     } catch {
//       setSuccess(true);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
//       <div
//         role="dialog"
//         aria-modal="true"
//         className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[90vh]"
//       >
//         {/* ── Fixed header ── */}
//         <div className="bg-[#004b8d] px-5 py-4 flex items-center justify-between shrink-0 rounded-t-3xl sm:rounded-t-2xl">
//           <div>
//             <p className="text-[10px] uppercase tracking-widest font-bold text-blue-200">
//               {enquiryType === "Test Drive" ? "Book a Test Drive" : "Claim Your Offer"}
//             </p>
//             <p className="text-white font-black text-base leading-tight">
//               Tata {activeCar}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors shrink-0"
//             aria-label="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {/* ── Scrollable body ── */}
//         <div className="overflow-y-auto flex-1 p-5">
//           {isSuccess ? (
//             <div className="text-center py-8">
//               <div className="w-14 h-14 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-4 text-emerald-600 text-2xl font-black">
//                 ✓
//               </div>
//               <h3 className="text-xl font-black text-slate-800 mb-2">We'll Be In Touch!</h3>
//               <p className="text-sm text-slate-500 mb-6 leading-relaxed">
//                 Our <strong className="text-slate-700">{showroom}</strong> team will call you shortly
//                 with the best deal on your{" "}
//                 <strong className="text-[#004b8d]">Tata {activeCar}</strong>.
//               </p>
//               <button
//                 onClick={onClose}
//                 className="w-full min-h-[48px] bg-[#004b8d] hover:bg-[#00366e] font-bold rounded-xl text-white transition-colors"
//               >
//                 Done
//               </button>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-4">

//               {/* ── Car & Variant summary card ── */}
//               <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
//                 <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-white">
//                   <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
//                     Selected Vehicle
//                   </p>
//                   <button
//                     type="button"
//                     onClick={() => setShowCarPicker((v) => !v)}
//                     className="text-[11px] font-bold text-[#004b8d] hover:underline underline-offset-2 flex items-center gap-1"
//                   >
//                     {showCarPicker ? "Cancel" : "Change Car"}
//                     {!showCarPicker && <span className="text-[10px]">↓</span>}
//                   </button>
//                 </div>

//                 {/* Car picker (inline dropdown) */}
//                 {showCarPicker ? (
//                   <div className="grid grid-cols-3 gap-2 p-3">
//                     {availableCars.map((car) => (
//                       <button
//                         key={car}
//                         type="button"
//                         onClick={() => handleCarSelect(car)}
//                         className={`flex flex-col items-center py-2.5 px-1 rounded-xl border text-center transition-all text-xs font-bold ${
//                           activeCar === car
//                             ? "border-[#004b8d] bg-[#004b8d]/8 text-[#004b8d]"
//                             : "border-slate-200 bg-white text-slate-600 hover:border-[#004b8d]/50"
//                         }`}
//                       >
//                         <img
//                           src={getCarImage(car)}
//                           alt={car}
//                           className="w-14 h-9 object-cover rounded mb-1"
//                         />
//                         {car}
//                       </button>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-3 px-4 py-3">
//                     <img
//                       src={getCarImage(activeCar, offerDetails?.powertrain === "Electric")}
//                       alt={activeCar}
//                       className="w-16 h-11 object-cover rounded-lg border border-slate-200 shrink-0"
//                     />
//                     <div className="min-w-0">
//                       <p className="text-sm font-black text-slate-800">
//                         Tata {activeCar}
//                         {offerDetails?.category === "EV" && !activeCar.includes("EV") ? " EV" : ""}
//                       </p>
//                       {offerDetails ? (
//                         <>
//                           <p className="text-[11px] text-slate-500 font-semibold truncate">
//                             {offerDetails.variant}
//                           </p>
//                           <p className="text-[11px] font-black text-[#004b8d] mt-0.5">
//                             Up to {formatINR(offerDetails.maxOffer)}
//                           </p>
//                         </>
//                       ) : (
//                         <p className="text-[11px] text-slate-400 font-medium">General Enquiry</p>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {error && (
//                 <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5 font-medium">
//                   {error}
//                 </p>
//               )}

//               {/* ── Name ── */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter your full name"
//                   className="w-full bg-slate-50 border border-slate-200 focus:border-[#004b8d] focus:ring-2 focus:ring-[#004b8d]/20 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-all font-medium"
//                 />
//               </div>

//               {/* ── Mobile ── */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Mobile Number
//                 </label>
//                 <input
//                   type="tel"
//                   required
//                   maxLength={10}
//                   value={mobile}
//                   onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
//                   placeholder="10-digit mobile number"
//                   className="w-full bg-slate-50 border border-slate-200 focus:border-[#004b8d] focus:ring-2 focus:ring-[#004b8d]/20 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-all font-medium"
//                 />
//               </div>

//               {/* ── Location ── */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Your City / Location
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     placeholder={locationLoading ? "Detecting your location…" : "e.g. New Delhi, Gurugram"}
//                     className="w-full bg-slate-50 border border-slate-200 focus:border-[#004b8d] focus:ring-2 focus:ring-[#004b8d]/20 rounded-xl px-4 py-3 pr-10 text-sm text-slate-800 outline-none transition-all font-medium"
//                   />
//                   {/* Location pin icon / spinner */}
//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">
//                     {locationLoading ? (
//                       <span className="inline-block w-4 h-4 border-2 border-slate-300 border-t-[#004b8d] rounded-full animate-spin" />
//                     ) : (
//                       "📍"
//                     )}
//                   </span>
//                 </div>
//                 <p className="text-[10px] text-slate-400 mt-1 font-medium">
//                   Helps us assign the closest Garud Tata team to you.
//                 </p>
//               </div>

//               {/* ── Showroom picker ── */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Preferred Showroom
//                 </label>
//                 <div className="space-y-2">
//                   {SHOWROOMS.map((s) => {
//                     const meta = SHOWROOM_META[s];
//                     return (
//                       <button
//                         key={s}
//                         type="button"
//                         onClick={() => setShowroom(s)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
//                           showroom === s
//                             ? "border-[#004b8d] bg-[#004b8d]/5 ring-2 ring-[#004b8d]/20"
//                             : "border-slate-200 hover:border-[#004b8d]/40 bg-white"
//                         }`}
//                       >
//                         <div>
//                           <p className={`text-sm font-bold ${showroom === s ? "text-[#004b8d]" : "text-slate-700"}`}>
//                             {s}
//                           </p>
//                           <p className="text-[11px] text-slate-400 font-medium mt-0.5">{meta.city}</p>
//                         </div>
//                         <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
//                           showroom === s ? "border-[#004b8d] bg-[#004b8d]" : "border-slate-300"
//                         }`}>
//                           {showroom === s && <span className="w-2 h-2 rounded-full bg-white block" />}
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* ── Submit ── */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full min-h-[52px] bg-[#004b8d] hover:bg-[#00366e] disabled:opacity-60 text-white font-black rounded-xl transition-colors shadow-lg shadow-[#004b8d]/25 text-sm"
//               >
//                 {isSubmitting
//                   ? "Submitting…"
//                   : enquiryType === "Test Drive"
//                   ? "Confirm Test Drive →"
//                   : "Get Best Price & Offer →"}
//               </button>

//               <p className="text-[10px] text-center text-slate-400 leading-relaxed pb-1">
//                 By submitting, you agree to be contacted via call or WhatsApp by Garud Tata.
//               </p>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================================
// // STEP PROGRESS BAR
// // ============================================================================
// function StepProgress({
//   current,
//   total,
//   labels,
// }: {
//   current: number;
//   total: number;
//   labels: string[];
// }) {
//   return (
//     <div className="px-5 sm:px-8 py-4 border-b border-slate-200 bg-white">
//       {/* Mobile */}
//       <div className="flex sm:hidden items-center justify-between text-xs">
//         <div className="flex items-center gap-2">
//           <span className="w-6 h-6 rounded-full bg-[#004b8d] text-white flex items-center justify-center text-[11px] font-black">
//             {current}
//           </span>
//           <span className="font-bold text-slate-700">{labels[current - 1]}</span>
//         </div>
//         <span className="text-slate-400 font-semibold">{current} / {total}</span>
//       </div>

//       {/* Desktop */}
//       <div className="hidden sm:flex items-center justify-between relative">
//         {/* Track */}
//         <div className="absolute top-3.5 left-0 right-0 h-0.5 bg-slate-200 z-0" />
//         <div
//           className="absolute top-3.5 left-0 h-0.5 bg-[#004b8d] z-0 transition-all duration-500"
//           style={{ width: `${((current - 1) / (total - 1)) * 100}%` }}
//         />

//         {labels.map((label, i) => {
//           const step = i + 1;
//           const done = step < current;
//           const active = step === current;
//           return (
//             <div key={label} className="relative z-10 flex flex-col items-center gap-1.5">
//               <span
//                 className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-300 ${
//                   done
//                     ? "bg-[#004b8d] text-white"
//                     : active
//                     ? "bg-[#004b8d] text-white ring-4 ring-[#004b8d]/20"
//                     : "bg-slate-100 text-slate-400 border border-slate-200"
//                 }`}
//               >
//                 {done ? "✓" : step}
//               </span>
//               <span
//                 className={`text-[10px] font-bold uppercase tracking-wider ${
//                   active ? "text-[#004b8d]" : done ? "text-slate-500" : "text-slate-300"
//                 }`}
//               >
//                 {label}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // ============================================================================
// // MAIN OFFERS COMPONENT
// // ============================================================================
// export default function Offers() {
//   const prefersReduced = useReducedMotion();

//   const [selectedCar, setSelectedCar]           = useState<string | null>(null);
//   const [selectedPowertrain, setSelectedPowertrain] = useState<Powertrain | null>(null);
//   const [selectedVariantId, setSelectedVariantId]   = useState<string | null>(null);
//   const [modal, setModal] = useState<{ open: boolean; type: EnquiryType }>({
//     open: false,
//     type: "Offer Enquiry",
//   });

//   const availableCars = useMemo(() => {
//     const list: string[] = [];
//     OFFERS.forEach((o) => { if (o.active && !list.includes(o.model)) list.push(o.model); });
//     return list;
//   }, []);

//   const availablePowertrains = useMemo(() => {
//     if (!selectedCar) return [];
//     return Array.from(
//       new Set(OFFERS.filter((o) => o.active && o.model === selectedCar).map((o) => o.powertrain))
//     );
//   }, [selectedCar]);

//   const matchingOffers = useMemo(() => {
//     if (!selectedCar || !selectedPowertrain) return [];
//     return OFFERS.filter((o) => o.active && o.model === selectedCar && o.powertrain === selectedPowertrain);
//   }, [selectedCar, selectedPowertrain]);

//   const needsVariant = matchingOffers.length > 1;

//   const finalOffer = useMemo<TataOffer | null>(() => {
//     if (!selectedCar || !selectedPowertrain || !matchingOffers.length) return null;
//     if (matchingOffers.length === 1) return matchingOffers[0];
//     return matchingOffers.find((o) => o.id === selectedVariantId) ?? null;
//   }, [selectedCar, selectedPowertrain, matchingOffers, selectedVariantId]);

//   const stepLabels = needsVariant
//     ? ["Car", "Powertrain", "Variant", "Offer"]
//     : ["Car", "Powertrain", "Offer"];

//   const currentStep = useMemo(() => {
//     if (!selectedCar) return 1;
//     if (!selectedPowertrain) return 2;
//     if (needsVariant && !selectedVariantId) return 3;
//     return stepLabels.length;
//   }, [selectedCar, selectedPowertrain, needsVariant, selectedVariantId, stepLabels.length]);

//   const goBack = () => {
//     if (needsVariant && selectedVariantId) { setSelectedVariantId(null); return; }
//     if (selectedPowertrain) { setSelectedPowertrain(null); return; }
//     setSelectedCar(null);
//   };

//   const reset = () => {
//     setSelectedCar(null);
//     setSelectedPowertrain(null);
//     setSelectedVariantId(null);
//   };

//   const motion_step = {
//     initial: prefersReduced ? {} : { opacity: 0, y: 16 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as Easing } },
//     exit:    prefersReduced ? {} : { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" as Easing } },
//   };

//   return (
//     <section className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 font-sans">
//       {/* ── HERO ─────────────────────────────────────────────────── */}
//       <div className="max-w-4xl mx-auto text-center mb-8">
//         <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#004b8d] bg-white border border-[#004b8d]/20 px-4 py-1.5 rounded-full mb-4 shadow-sm">
//           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//           Garud Tata · Live Offers
//         </span>
//         <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black tracking-tight text-slate-800 leading-[1.15]">
//           Find Your Tata Offer
//         </h1>
//         <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto mt-3 font-medium leading-relaxed">
//           Select your model and discover exclusive benefits available this month.
//         </p>
//       </div>

//       {/* ── MAIN CARD ─────────────────────────────────────────────── */}
//       <div className="max-w-[960px] mx-auto bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/80 overflow-hidden">
//         <StepProgress current={currentStep} total={stepLabels.length} labels={stepLabels} />

//         <div className="p-5 sm:p-8 md:p-10">
//           <AnimatePresence mode="wait">

//             {/* ── STEP 1 : CAR GRID ─────────────────────────────── */}
//             {!selectedCar && (
//               <motion.div key="step-car" {...motion_step}>
//                 <h2 className="text-lg sm:text-xl font-black text-slate-800 mb-6 text-center">
//                   Which Tata are you interested in?
//                 </h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
//                   {availableCars.map((car) => {
//                     const slug = getCarSlug(car);
//                     return (
//                       <div
//                         key={car}
//                         className="group relative rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
//                       >
//                         {/* Clickable image + label area → selects car in wizard */}
//                         <button
//                           onClick={() => { setSelectedCar(car); setSelectedPowertrain(null); setSelectedVariantId(null); }}
//                           className="text-left flex-1 focus-visible:ring-2 focus-visible:ring-[#004b8d] focus-visible:outline-none rounded-t-2xl"
//                         >
//                           {/* Image */}
//                           <div className="relative h-28 sm:h-32 bg-slate-100 overflow-hidden">
//                             <img
//                               src={getCarImage(car)}
//                               alt={`Tata ${car}`}
//                               loading="lazy"
//                               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                             />
//                             <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/50 to-transparent" />
//                           </div>
//                           {/* Label */}
//                           <div className="px-3.5 pt-3 pb-2">
//                             <p className="text-sm font-black text-slate-800 uppercase tracking-wide leading-none group-hover:text-[#004b8d] transition-colors">
//                               {car}
//                             </p>
//                             <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
//                               {CAR_BODY_TYPES[car] ?? "Tata Vehicle"}
//                             </p>
//                           </div>
//                         </button>

//                         {/* Bottom action row: Check Offer + Explore */}
//                         <div className="flex items-center border-t border-slate-100 divide-x divide-slate-100">
//                           <button
//                             onClick={() => { setSelectedCar(car); setSelectedPowertrain(null); setSelectedVariantId(null); }}
//                             className="flex-1 py-2 text-[11px] font-black text-[#004b8d] hover:bg-[#004b8d]/5 transition-colors text-center"
//                           >
//                             Check Offer
//                           </button>
//                           {slug ? (
//                             <Link
//                               href={`/offers/${slug}`}
//                               className="flex-1 py-2 text-[11px] font-bold text-slate-500 hover:text-[#004b8d] hover:bg-slate-50 transition-colors text-center"
//                               onClick={(e) => e.stopPropagation()}
//                             >
//                               Explore ↗
//                             </Link>
//                           ) : (
//                             <span className="flex-1 py-2 text-[11px] text-slate-300 text-center">—</span>
//                           )}
//                         </div>

//                         {/* Hover accent bar */}
//                         <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#004b8d] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
//                       </div>
//                     );
//                   })}
//                 </div>
//               </motion.div>
//             )}

//             {/* ── STEP 2 : POWERTRAIN ───────────────────────────── */}
//             {selectedCar && !selectedPowertrain && (
//               <motion.div key="step-pt" {...motion_step}>
//                 <div className="text-center mb-8">
//                   <span className="inline-block text-xs font-black uppercase tracking-wider bg-[#004b8d]/8 text-[#004b8d] px-3 py-1 rounded-full mb-3">
//                     {selectedCar}
//                   </span>
//                   <h2 className="text-lg sm:text-xl font-black text-slate-800">
//                     Fuel or powertrain type?
//                   </h2>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
//                   {availablePowertrains.map((pt) => (
//                     <button
//                       key={pt}
//                       onClick={() => handleSelectPowertrain(pt)}
//                       className="group flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white hover:bg-[#004b8d]/4 transition-all shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#004b8d]"
//                     >
//                       <span className="text-2xl">
//                         {pt === "Electric" ? "⚡" : pt === "Petrol" ? "⛽" : pt === "Diesel" ? "🔧" : "🔋"}
//                       </span>
//                       <span className="text-sm font-black text-slate-800 group-hover:text-[#004b8d] transition-colors">
//                         {pt}
//                       </span>
//                       <span className="text-[10px] text-slate-400 font-semibold">
//                         {pt === "Electric" ? "Zero Emissions" : "Available Now"}
//                       </span>
//                     </button>
//                   ))}
//                 </div>

//                 <p className="text-center mt-8">
//                   <button onClick={goBack} className="text-xs text-slate-400 hover:text-[#004b8d] font-bold transition-colors underline-offset-4 hover:underline">
//                     ← Back to car selection
//                   </button>
//                 </p>
//               </motion.div>
//             )}

//             {/* ── STEP 3 : VARIANT (conditional) ───────────────── */}
//             {selectedCar && selectedPowertrain && needsVariant && !selectedVariantId && (
//               <motion.div key="step-var" {...motion_step}>
//                 <div className="text-center mb-8">
//                   <span className="inline-block text-xs font-black uppercase tracking-wider bg-[#004b8d]/8 text-[#004b8d] px-3 py-1 rounded-full mb-3">
//                     {selectedCar} · {selectedPowertrain}
//                   </span>
//                   <h2 className="text-lg sm:text-xl font-black text-slate-800">
//                     Choose your variant
//                   </h2>
//                   <p className="text-xs text-slate-400 mt-1 font-medium">
//                     Different variants have different eligible benefits
//                   </p>
//                 </div>

//                 <div className="space-y-3 max-w-lg mx-auto">
//                   {matchingOffers.map((offer) => (
//                     <button
//                       key={offer.id}
//                       onClick={() => setSelectedVariantId(offer.id)}
//                       className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white hover:bg-[#004b8d]/4 transition-all shadow-sm hover:shadow-md text-left group focus-visible:ring-2 focus-visible:ring-[#004b8d]"
//                     >
//                       <div>
//                         <p className="text-sm font-bold text-slate-800 group-hover:text-[#004b8d] transition-colors">
//                           {offer.variant}
//                         </p>
//                         <p className="text-xs text-slate-400 font-semibold mt-0.5">{offer.modelYear} Edition</p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-[10px] uppercase font-bold tracking-wider text-[#004b8d]/50">Up to</p>
//                         <p className="text-base font-black text-[#004b8d]">{formatINR(offer.maxOffer)}</p>
//                       </div>
//                     </button>
//                   ))}
//                 </div>

//                 <p className="text-center mt-8">
//                   <button onClick={goBack} className="text-xs text-slate-400 hover:text-[#004b8d] font-bold transition-colors underline-offset-4 hover:underline">
//                     ← Back to powertrain
//                   </button>
//                 </p>
//               </motion.div>
//             )}

//             {/* ── STEP 4 : OFFER RESULT ─────────────────────────── */}
//             {finalOffer && (
//               <motion.div key="step-result" {...motion_step} className="max-w-xl mx-auto">
//                 {/* ── Offer Hero Card ── */}
//                 <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/60">

//                   {/* Hero Banner: deep navy with diagonal accent, car image overlay */}
//                   <div className="relative h-52 sm:h-60 overflow-hidden bg-[#003570]">
//                     {/* Geometric accent – adds depth without muddiness */}
//                     <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#0059a8]/50" />
//                     <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-[#002a58]/60" />

//                     {/* Car image — subtle, not overwhelming */}
//                     <img
//                       src={getCarImage(finalOffer.model, finalOffer.powertrain === "Electric")}
//                       alt={`Tata ${finalOffer.model}`}
//                       className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
//                     />

//                     {/* Content overlay */}
//                     <div className="absolute inset-0 flex flex-col justify-end p-6">
//                       <p className="text-[10px] uppercase font-black tracking-[0.25em] text-blue-300/80 mb-1">
//                         Your Garud Tata Offer
//                       </p>
//                       <h2 className="text-3xl sm:text-4xl font-black text-white leading-none">
//                         Tata {finalOffer.model}
//                         {finalOffer.category === "EV" && !finalOffer.model.includes("EV") ? " EV" : ""}
//                       </h2>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {[finalOffer.variant, finalOffer.powertrain, finalOffer.modelYear].map((tag) => (
//                           <span
//                             key={tag}
//                             className="text-[10px] font-bold uppercase tracking-wider bg-white/15 text-white/90 px-2.5 py-1 rounded-full"
//                           >
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Offer body */}
//                   <div className="p-6 sm:p-8 bg-white">
//                     {/* Max benefit highlight */}
//                     <div className="text-center mb-7 py-5 rounded-2xl bg-slate-50 border border-slate-100">
//                       <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">
//                         Maximum Eligible Benefits
//                       </p>
//                       <p className="text-4xl sm:text-5xl font-black text-[#004b8d] leading-none">
//                         <span className="text-lg align-middle font-bold text-[#004b8d]/60 mr-1">UP TO</span>
//                         <AnimatedCounter value={finalOffer.maxOffer} />
//                       </p>
//                     </div>

//                     {/* Breakdown grid */}
//                     <div className="mb-6">
//                       <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 text-center mb-3">
//                         Benefit Breakdown
//                       </p>
//                       <div className="grid grid-cols-2 gap-2.5">
//                         {finalOffer.cash > 0 && (
//                           <BenefitChip label="Consumer Discount" value={finalOffer.cash} />
//                         )}
//                         {finalOffer.exchangeBenefit > 0 && (
//                           <BenefitChip label="Exchange Bonus" value={finalOffer.exchangeBenefit} />
//                         )}
//                         {finalOffer.scrappageBenefit > 0 && (
//                           <BenefitChip label="Scrappage Bonus" value={finalOffer.scrappageBenefit} />
//                         )}
//                         {finalOffer.loyaltyBenefit > 0 && (
//                           <BenefitChip label="Loyalty Reward" value={finalOffer.loyaltyBenefit} />
//                         )}
//                       </div>

//                       {/* Total row */}
//                       <div className="flex items-center justify-between mt-3 px-4 py-3.5 rounded-xl bg-[#004b8d] text-white shadow-lg shadow-[#004b8d]/20">
//                         <span className="font-bold text-sm">Total Benefits</span>
//                         <span className="font-black text-lg">{formatINR(finalOffer.maxOffer)}</span>
//                       </div>
//                     </div>

//                     <p className="text-[10px] text-slate-400 leading-relaxed text-center mb-6">
//                       *Benefits are subject to variant, customer, and campaign eligibility. Exchange,
//                       scrappage, and loyalty benefits may be combined only where applicable.
//                     </p>

//                     {/* CTA buttons */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                       <button
//                         onClick={() => setModal({ open: true, type: "Offer Enquiry" })}
//                         className="w-full min-h-[52px] bg-[#004b8d] hover:bg-[#00366e] active:scale-[0.98] text-white font-black text-sm rounded-xl shadow-lg shadow-[#004b8d]/25 transition-all"
//                       >
//                         GET MY OFFER →
//                       </button>
//                       <button
//                         onClick={() => setModal({ open: true, type: "Test Drive" })}
//                         className="w-full min-h-[52px] border-2 border-[#004b8d] text-[#004b8d] hover:bg-[#004b8d]/5 active:scale-[0.98] font-black text-sm rounded-xl transition-all"
//                       >
//                         BOOK TEST DRIVE
//                       </button>
//                     </div>

//                     {/* Explore Detail Page link */}
//                     <div className="mt-3">
//                       <Link
//                         href={`/offers/${finalOffer.id}`}
//                         className="flex items-center justify-center gap-2 w-full min-h-[44px] rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-[#004b8d] text-sm font-bold transition-all group"
//                       >
//                         <span>Explore {finalOffer.model} in Detail</span>
//                         <span className="text-base group-hover:translate-x-0.5 transition-transform">↗</span>
//                       </Link>
//                       <p className="text-[10px] text-slate-400 text-center mt-1.5 font-medium">
//                         Gallery · Specs · Highlights · Full Offer Breakdown
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Back / Reset */}
//                 <div className="flex items-center justify-center gap-5 mt-5 text-xs font-bold text-slate-400">
//                   <button onClick={goBack} className="hover:text-[#004b8d] transition-colors hover:underline underline-offset-4">
//                     ← Change Selection
//                   </button>
//                   <span className="text-slate-300">|</span>
//                   <button onClick={reset} className="hover:text-[#004b8d] transition-colors hover:underline underline-offset-4">
//                     Start Over
//                   </button>
//                 </div>
//               </motion.div>
//             )}

//             {/* ── NO MATCH ──────────────────────────────────────── */}
//             {selectedCar && selectedPowertrain && !finalOffer && matchingOffers.length === 0 && (
//               <motion.div key="no-match" {...motion_step} className="text-center py-14 max-w-sm mx-auto">
//                 <div className="w-14 h-14 rounded-2xl bg-[#004b8d]/8 flex items-center justify-center mx-auto mb-4 text-2xl">
//                   🔍
//                 </div>
//                 <h3 className="text-lg font-black text-slate-800 mb-2">No Specific Offer Found</h3>
//                 <p className="text-sm text-slate-500 mb-7 leading-relaxed font-medium">
//                   Our team can verify the latest applicable benefits for your exact requirement.
//                 </p>
//                 <button
//                   onClick={() => setModal({ open: true, type: "Offer Enquiry" })}
//                   className="w-full min-h-[48px] bg-[#004b8d] hover:bg-[#00366e] font-black text-sm rounded-xl text-white transition-colors shadow-lg shadow-[#004b8d]/20 mb-4"
//                 >
//                   Talk to Garud Tata
//                 </button>
//                 <button onClick={reset} className="text-xs text-slate-400 hover:text-[#004b8d] font-bold hover:underline underline-offset-4 transition-colors">
//                   Start Over
//                 </button>
//               </motion.div>
//             )}

//           </AnimatePresence>
//         </div>
//       </div>

//       {/* ── TRUST BAR ──────────────────────────────────────────────── */}
//       <div className="max-w-3xl mx-auto mt-10 text-center">
//         <div className="flex flex-wrap items-center justify-center gap-y-2.5 gap-x-5 text-[11px] font-bold text-slate-400">
//           {[
//             "Verified Garud Offers",
//             "MY25 / MY24 Benefits",
//             "Exchange & Scrappage",
//             "Test Drive Available",
//           ].map((t) => (
//             <span key={t} className="flex items-center gap-1.5">
//               <span className="text-emerald-500">✓</span> {t}
//             </span>
//           ))}
//         </div>
//         <p className="text-[10px] text-slate-400 font-semibold mt-5 uppercase tracking-widest">
//           Offers Last Updated: {LAST_UPDATED}
//         </p>
//       </div>

//       {/* ── MODAL ─────────────────────────────────────────────────── */}
//       <OfferEnquiryModal
//         isOpen={modal.open}
//         onClose={() => setModal((p) => ({ ...p, open: false }))}
//         initialCar={selectedCar ?? availableCars[0] ?? "Tata Car"}
//         enquiryType={modal.type}
//         offerDetails={finalOffer}
//         availableCars={availableCars}
//         onCarChange={(car) => {
//           setSelectedCar(car);
//           setSelectedPowertrain(null);
//           setSelectedVariantId(null);
//         }}
//       />
//     </section>
//   );

//   function handleSelectPowertrain(pt: Powertrain) {
//     setSelectedPowertrain(pt);
//     setSelectedVariantId(null);
//   }
// }

// // ── Small reusable benefit chip ───────────────────────────────────────────────
// function BenefitChip({ label, value }: { label: string; value: number }) {
//   return (
//     <div className="flex flex-col px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-100">
//       <span className="text-[10px] text-slate-500 font-semibold leading-tight">{label}</span>
//       <span className="text-sm font-black text-slate-800 mt-0.5">{formatINR(value)}</span>
//     </div>
//   );
// }














// "use client";

// import React, { useState, useMemo, useEffect } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useReducedMotion,
//   animate,
//   type Easing,
// } from "framer-motion";
// import Link from "next/link";
// import {
//   OFFERS,
//   TataOffer,
//   Powertrain,
// } from "@/lib/tata-offers";

// // ============================================================================
// // LOCAL HELPERS & TYPES
// // ============================================================================
// type EnquiryType = "Offer Enquiry" | "Test Drive";

// const SHOWROOMS = [
//   "Garud Tata Palam",
//   "Garud Tata Narela",
//   "Garud Tata Najafgarh",
// ];

// const SHOWROOM_META: Record<string, { area: string; city: string }> = {
//   "Garud Tata Palam":     { area: "Palam",     city: "South-West Delhi" },
//   "Garud Tata Narela":    { area: "Narela",    city: "North Delhi"      },
//   "Garud Tata Najafgarh": { area: "Najafgarh", city: "West Delhi"       },
// };

// const LAST_UPDATED = new Date().toLocaleDateString("en-IN", {
//   month: "long",
//   year: "numeric",
// });

// const formatINR = (amount: number) =>
//   new Intl.NumberFormat("en-IN", {
//     style: "currency",
//     currency: "INR",
//     maximumFractionDigits: 0,
//   }).format(amount);

// // ============================================================================
// // CAR METADATA & IMAGES
// // ============================================================================
// const CAR_BODY_TYPES: Record<string, string> = {
//   Tiago:   "Hatchback",
//   Tigor:   "Compact Sedan",
//   Punch:   "Compact SUV",
//   Altroz:  "Premium Hatchback",
//   Nexon:   "Compact SUV",
//   Curvv:   "SUV Coupé",
//   Harrier: "Premium SUV",
//   Safari:  "Flagship 7-Seater SUV",
// };

// const CAR_IMAGES: Record<string, string[]> = {
//   tiago:       ["/Car images/Tata tiago/image1.jpg",   "/Car images/Tata tiago/image2.jpg",   "/Car images/Tata tiago/image3.jpg"  ],
//   "tiago-ev":  ["/Car images/Tata tiago/image1.jpg",   "/Car images/Tata tiago/image2.jpg",   "/Car images/Tata tiago/image3.jpg"  ],
//   tigor:       ["/Car images/Tata tigor/image1.avif",  "/Car images/Tata tigor/image2.avif"                                        ],
//   altroz:      ["/Car images/Tata altroz/image1.avif", "/Car images/Tata altroz/image2.avif"                                       ],
//   punch:       ["/Car images/Tata punch/image1.jpg",   "/Car images/Tata punch/image2.jpg"                                         ],
//   "punch-ev":  ["/Car images/Tata punch/image1.jpg",   "/Car images/Tata punch/image2.jpg"                                         ],
//   nexon:       ["/Car images/Tata nexon/image1.avif",  "/Car images/Tata nexon/image2.avif"                                        ],
//   "nexon-ev":  ["/Car images/Tata nexon/image1.avif",  "/Car images/Tata nexon/image2.avif"                                        ],
//   curvv:       ["/Car images/Tata curv/image1.avif",   "/Car images/Tata curv/image2.avif"                                         ],
//   "curvv-ev":  ["/Car images/Tata curv/image1.avif",   "/Car images/Tata curv/image2.avif"                                         ],
//   harrier:     ["/Car images/Tata harrier/image1.avif","/Car images/Tata harrier/image2.avif"                                      ],
//   "harrier-ev":["/Car images/Tata harrier/image1.avif","/Car images/Tata harrier/image2.avif"                                      ],
//   safari:      ["/Car images/Tata safari/image1.avif", "/Car images/Tata safari/image2.avif"                                       ],
// };

// const getCarImage = (model: string, isEV = false) => {
//   const key = isEV ? `${model.toLowerCase()}-ev` : model.toLowerCase();
//   return CAR_IMAGES[key]?.[0] ?? CAR_IMAGES[model.toLowerCase()]?.[0] ?? "/placeholder-car.jpg";
// };

// // Returns the slug of the first active non-EV offer for this model,
// // falling back to any active offer — used for the "Explore ↗" link.
// const getCarSlug = (model: string): string | null => {
//   const ice = OFFERS.find((o) => o.active && o.model === model && o.category !== "EV");
//   const any = OFFERS.find((o) => o.active && o.model === model);
//   return (ice ?? any)?.id ?? null;
// };

// // ============================================================================
// // ANIMATED COUNTER
// // ============================================================================
// function AnimatedCounter({ value }: { value: number }) {
//   const prefersReduced = useReducedMotion();
//   const [display, setDisplay] = useState(prefersReduced ? value : 0);

//   useEffect(() => {
//     if (prefersReduced) { setDisplay(value); return; }
//     const c = animate(0, value, {
//       duration: 1.1,
//       ease: [0.16, 1, 0.3, 1],
//       onUpdate: (v) => setDisplay(Math.round(v)),
//     });
//     return () => c.stop();
//   }, [value, prefersReduced]);

//   return <span>{formatINR(display)}</span>;
// }

// // ============================================================================
// // ENQUIRY MODAL
// // ============================================================================
// interface EnquiryModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   initialCar: string;
//   enquiryType: EnquiryType;
//   offerDetails?: TataOffer | null;
//   availableCars: string[];
//   onCarChange?: (car: string) => void;
// }

// function OfferEnquiryModal({
//   isOpen,
//   onClose,
//   initialCar,
//   enquiryType,
//   offerDetails,
//   availableCars,
//   onCarChange,
// }: EnquiryModalProps) {
//   const [name, setName]                   = useState("");
//   const [mobile, setMobile]               = useState("");
//   const [location, setLocation]           = useState("");
//   const [locationLoading, setLocLoad]     = useState(false);
//   const [showroom, setShowroom]           = useState(SHOWROOMS[0]);
//   const [isSubmitting, setSubmitting]     = useState(false);
//   const [isSuccess, setSuccess]           = useState(false);
//   const [error, setError]                 = useState("");
//   const [showCarPicker, setShowCarPicker] = useState(false);
//   const [activeCar, setActiveCar]         = useState(initialCar);

//   useEffect(() => { setActiveCar(initialCar); }, [initialCar]);

//   useEffect(() => {
//     if (!isOpen || location) return;
//     if (!navigator.geolocation) return;
//     setLocLoad(true);
//     navigator.geolocation.getCurrentPosition(
//       async ({ coords }) => {
//         try {
//           const res  = await fetch(
//             `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
//           );
//           const data = await res.json();
//           const city =
//             data.address?.city    ||
//             data.address?.town    ||
//             data.address?.village ||
//             data.address?.county  ||
//             "";
//           if (city) setLocation(city);
//         } catch { /* silent */ }
//         setLocLoad(false);
//       },
//       () => setLocLoad(false),
//       { timeout: 6000 }
//     );
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleCarSelect = (car: string) => {
//     setActiveCar(car);
//     setShowCarPicker(false);
//     onCarChange?.(car);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (mobile.replace(/\D/g, "").length < 10) {
//       setError("Please enter a valid 10-digit mobile number.");
//       return;
//     }
//     setSubmitting(true);
//     setError("");

//     try {
//       const w = window as unknown as { fbq?: (...a: unknown[]) => void };
//       w.fbq?.("track", "Lead", {
//         content_name:     activeCar,
//         content_category: enquiryType,
//         value:            offerDetails?.totalBenefit ?? 0,
//         currency:         "INR",
//       });

//       await fetch("/api/enquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           mobile,
//           car:      activeCar,
//           variant:  offerDetails?.variantLabel ?? "General",
//           type:     enquiryType,
//           showroom,
//           location: location || null,
//           source:   "offers-page",
//         }),
//       });

//       setSuccess(true);
//     } catch {
//       setSuccess(true);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
//       <div
//         role="dialog"
//         aria-modal="true"
//         className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[90vh]"
//       >
//         {/* Fixed header */}
//         <div className="bg-[#004b8d] px-5 py-4 flex items-center justify-between shrink-0 rounded-t-3xl sm:rounded-t-2xl">
//           <div>
//             <p className="text-[10px] uppercase tracking-widest font-bold text-blue-200">
//               {enquiryType === "Test Drive" ? "Book a Test Drive" : "Claim Your Offer"}
//             </p>
//             <p className="text-white font-black text-base leading-tight">
//               Tata {activeCar}
//             </p>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors shrink-0"
//             aria-label="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Scrollable body */}
//         <div className="overflow-y-auto flex-1 p-5">
//           {isSuccess ? (
//             <div className="text-center py-8">
//               <div className="w-14 h-14 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-4 text-emerald-600 text-2xl font-black">
//                 ✓
//               </div>
//               <h3 className="text-xl font-black text-slate-800 mb-2">We'll Be In Touch!</h3>
//               <p className="text-sm text-slate-500 mb-6 leading-relaxed">
//                 Our <strong className="text-slate-700">{showroom}</strong> team will call you shortly
//                 with the best deal on your{" "}
//                 <strong className="text-[#004b8d]">Tata {activeCar}</strong>.
//               </p>
//               <button
//                 onClick={onClose}
//                 className="w-full min-h-[48px] bg-[#004b8d] hover:bg-[#00366e] font-bold rounded-xl text-white transition-colors"
//               >
//                 Done
//               </button>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="space-y-4">

//               {/* Car & Variant summary card */}
//               <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
//                 <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-white">
//                   <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
//                     Selected Vehicle
//                   </p>
//                   <button
//                     type="button"
//                     onClick={() => setShowCarPicker((v) => !v)}
//                     className="text-[11px] font-bold text-[#004b8d] hover:underline underline-offset-2 flex items-center gap-1"
//                   >
//                     {showCarPicker ? "Cancel" : "Change Car"}
//                     {!showCarPicker && <span className="text-[10px]">↓</span>}
//                   </button>
//                 </div>

//                 {showCarPicker ? (
//                   <div className="grid grid-cols-3 gap-2 p-3">
//                     {availableCars.map((car) => (
//                       <button
//                         key={car}
//                         type="button"
//                         onClick={() => handleCarSelect(car)}
//                         className={`flex flex-col items-center py-2.5 px-1 rounded-xl border text-center transition-all text-xs font-bold ${
//                           activeCar === car
//                             ? "border-[#004b8d] bg-[#004b8d]/8 text-[#004b8d]"
//                             : "border-slate-200 bg-white text-slate-600 hover:border-[#004b8d]/50"
//                         }`}
//                       >
//                         <img
//                           src={getCarImage(car)}
//                           alt={car}
//                           className="w-14 h-9 object-cover rounded mb-1"
//                         />
//                         {car}
//                       </button>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-3 px-4 py-3">
//                     <img
//                       src={getCarImage(activeCar, offerDetails?.powertrain === "Electric")}
//                       alt={activeCar}
//                       className="w-16 h-11 object-cover rounded-lg border border-slate-200 shrink-0"
//                     />
//                     <div className="min-w-0">
//                       <p className="text-sm font-black text-slate-800">
//                         Tata {activeCar}
//                         {offerDetails?.category === "EV" && !activeCar.includes("EV") ? " EV" : ""}
//                       </p>
//                       {offerDetails ? (
//                         <>
//                           <p className="text-[11px] text-slate-500 font-semibold truncate">
//                             {offerDetails.variantLabel}
//                           </p>
//                           <p className="text-[11px] font-black text-[#004b8d] mt-0.5">
//                             Up to {formatINR(offerDetails.totalBenefit)}
//                           </p>
//                         </>
//                       ) : (
//                         <p className="text-[11px] text-slate-400 font-medium">General Enquiry</p>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {error && (
//                 <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5 font-medium">
//                   {error}
//                 </p>
//               )}

//               {/* Name */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Your Name
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   placeholder="Enter your full name"
//                   className="w-full bg-slate-50 border border-slate-200 focus:border-[#004b8d] focus:ring-2 focus:ring-[#004b8d]/20 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-all font-medium"
//                 />
//               </div>

//               {/* Mobile */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Mobile Number
//                 </label>
//                 <input
//                   type="tel"
//                   required
//                   maxLength={10}
//                   value={mobile}
//                   onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
//                   placeholder="10-digit mobile number"
//                   className="w-full bg-slate-50 border border-slate-200 focus:border-[#004b8d] focus:ring-2 focus:ring-[#004b8d]/20 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-all font-medium"
//                 />
//               </div>

//               {/* Location */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Your City / Location
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     placeholder={locationLoading ? "Detecting your location…" : "e.g. New Delhi, Gurugram"}
//                     className="w-full bg-slate-50 border border-slate-200 focus:border-[#004b8d] focus:ring-2 focus:ring-[#004b8d]/20 rounded-xl px-4 py-3 pr-10 text-sm text-slate-800 outline-none transition-all font-medium"
//                   />
//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">
//                     {locationLoading ? (
//                       <span className="inline-block w-4 h-4 border-2 border-slate-300 border-t-[#004b8d] rounded-full animate-spin" />
//                     ) : (
//                       "📍"
//                     )}
//                   </span>
//                 </div>
//                 <p className="text-[10px] text-slate-400 mt-1 font-medium">
//                   Helps us assign the closest Garud Tata team to you.
//                 </p>
//               </div>

//               {/* Showroom picker */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Preferred Showroom
//                 </label>
//                 <div className="space-y-2">
//                   {SHOWROOMS.map((s) => {
//                     const meta = SHOWROOM_META[s];
//                     return (
//                       <button
//                         key={s}
//                         type="button"
//                         onClick={() => setShowroom(s)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
//                           showroom === s
//                             ? "border-[#004b8d] bg-[#004b8d]/5 ring-2 ring-[#004b8d]/20"
//                             : "border-slate-200 hover:border-[#004b8d]/40 bg-white"
//                         }`}
//                       >
//                         <div>
//                           <p className={`text-sm font-bold ${showroom === s ? "text-[#004b8d]" : "text-slate-700"}`}>
//                             {s}
//                           </p>
//                           <p className="text-[11px] text-slate-400 font-medium mt-0.5">{meta.city}</p>
//                         </div>
//                         <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
//                           showroom === s ? "border-[#004b8d] bg-[#004b8d]" : "border-slate-300"
//                         }`}>
//                           {showroom === s && <span className="w-2 h-2 rounded-full bg-white block" />}
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="w-full min-h-[52px] bg-[#004b8d] hover:bg-[#00366e] disabled:opacity-60 text-white font-black rounded-xl transition-colors shadow-lg shadow-[#004b8d]/25 text-sm"
//               >
//                 {isSubmitting
//                   ? "Submitting…"
//                   : enquiryType === "Test Drive"
//                   ? "Confirm Test Drive →"
//                   : "Get Best Price & Offer →"}
//               </button>

//               <p className="text-[10px] text-center text-slate-400 leading-relaxed pb-1">
//                 By submitting, you agree to be contacted via call or WhatsApp by Garud Tata.
//               </p>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// // ============================================================================
// // STEP PROGRESS BAR
// // ============================================================================
// function StepProgress({
//   current,
//   total,
//   labels,
// }: {
//   current: number;
//   total: number;
//   labels: string[];
// }) {
//   return (
//     <div className="px-5 sm:px-8 py-4 border-b border-slate-200 bg-white">
//       {/* Mobile */}
//       <div className="flex sm:hidden items-center justify-between text-xs">
//         <div className="flex items-center gap-2">
//           <span className="w-6 h-6 rounded-full bg-[#004b8d] text-white flex items-center justify-center text-[11px] font-black">
//             {current}
//           </span>
//           <span className="font-bold text-slate-700">{labels[current - 1]}</span>
//         </div>
//         <span className="text-slate-400 font-semibold">{current} / {total}</span>
//       </div>

//       {/* Desktop */}
//       <div className="hidden sm:flex items-center justify-between relative">
//         <div className="absolute top-3.5 left-0 right-0 h-0.5 bg-slate-200 z-0" />
//         <div
//           className="absolute top-3.5 left-0 h-0.5 bg-[#004b8d] z-0 transition-all duration-500"
//           style={{ width: `${((current - 1) / (total - 1)) * 100}%` }}
//         />
//         {labels.map((label, i) => {
//           const step   = i + 1;
//           const done   = step < current;
//           const active = step === current;
//           return (
//             <div key={label} className="relative z-10 flex flex-col items-center gap-1.5">
//               <span
//                 className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-300 ${
//                   done
//                     ? "bg-[#004b8d] text-white"
//                     : active
//                     ? "bg-[#004b8d] text-white ring-4 ring-[#004b8d]/20"
//                     : "bg-slate-100 text-slate-400 border border-slate-200"
//                 }`}
//               >
//                 {done ? "✓" : step}
//               </span>
//               <span
//                 className={`text-[10px] font-bold uppercase tracking-wider ${
//                   active ? "text-[#004b8d]" : done ? "text-slate-500" : "text-slate-300"
//                 }`}
//               >
//                 {label}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// // ============================================================================
// // MAIN OFFERS COMPONENT
// // ============================================================================
// export default function Offers() {
//   const prefersReduced = useReducedMotion();

//   const [selectedCar, setSelectedCar]               = useState<string | null>(null);
//   const [selectedPowertrain, setSelectedPowertrain] = useState<Powertrain | null>(null);
//   const [selectedVariantId, setSelectedVariantId]   = useState<string | null>(null);
//   const [modal, setModal] = useState<{ open: boolean; type: EnquiryType }>({
//     open: false,
//     type: "Offer Enquiry",
//   });

//   // Unique model names across all active offers
//   const availableCars = useMemo(() => {
//     const seen = new Set<string>();
//     return OFFERS.filter((o) => o.active && !seen.has(o.model) && seen.add(o.model)).map((o) => o.model);
//   }, []);

//   // Unique powertrains for the selected car
//   const availablePowertrains = useMemo(() => {
//     if (!selectedCar) return [];
//     return Array.from(
//       new Set(
//         OFFERS.filter((o) => o.active && o.model === selectedCar).map((o) => o.powertrain)
//       )
//     );
//   }, [selectedCar]);

//   // All offers matching car + powertrain
//   const matchingOffers = useMemo(() => {
//     if (!selectedCar || !selectedPowertrain) return [];
//     return OFFERS.filter(
//       (o) => o.active && o.model === selectedCar && o.powertrain === selectedPowertrain
//     );
//   }, [selectedCar, selectedPowertrain]);

//   const needsVariant = matchingOffers.length > 1;

//   const finalOffer = useMemo<TataOffer | null>(() => {
//     if (!selectedCar || !selectedPowertrain || !matchingOffers.length) return null;
//     if (matchingOffers.length === 1) return matchingOffers[0];
//     return matchingOffers.find((o) => o.id === selectedVariantId) ?? null;
//   }, [selectedCar, selectedPowertrain, matchingOffers, selectedVariantId]);

//   const stepLabels = needsVariant
//     ? ["Car", "Powertrain", "Variant", "Offer"]
//     : ["Car", "Powertrain", "Offer"];

//   const currentStep = useMemo(() => {
//     if (!selectedCar)                             return 1;
//     if (!selectedPowertrain)                      return 2;
//     if (needsVariant && !selectedVariantId)       return 3;
//     return stepLabels.length;
//   }, [selectedCar, selectedPowertrain, needsVariant, selectedVariantId, stepLabels.length]);

//   const goBack = () => {
//     if (needsVariant && selectedVariantId) { setSelectedVariantId(null); return; }
//     if (selectedPowertrain)               { setSelectedPowertrain(null); return; }
//     setSelectedCar(null);
//   };

//   const reset = () => {
//     setSelectedCar(null);
//     setSelectedPowertrain(null);
//     setSelectedVariantId(null);
//   };

//   const handleSelectPowertrain = (pt: Powertrain) => {
//     setSelectedPowertrain(pt);
//     setSelectedVariantId(null);
//   };

//   const motion_step = {
//     initial: prefersReduced ? {} : { opacity: 0, y: 16 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as Easing } },
//     exit:    prefersReduced ? {} : { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" as Easing } },
//   };

//   return (
//     <section className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 font-sans">

//       {/* ── HERO ─────────────────────────────────────────────────── */}
//       <div className="max-w-4xl mx-auto text-center mb-8">
//         <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#004b8d] bg-white border border-[#004b8d]/20 px-4 py-1.5 rounded-full mb-4 shadow-sm">
//           <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//           Garud Tata · Live Offers
//         </span>
//         <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black tracking-tight text-slate-800 leading-[1.15]">
//           Find Your Tata Offer
//         </h1>
//         <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto mt-3 font-medium leading-relaxed">
//           Select your model and discover exclusive benefits available this month.
//         </p>
//       </div>

//       {/* ── MAIN CARD ─────────────────────────────────────────────── */}
//       <div className="max-w-[960px] mx-auto bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/80 overflow-hidden">
//         <StepProgress current={currentStep} total={stepLabels.length} labels={stepLabels} />

//         <div className="p-5 sm:p-8 md:p-10">
//           <AnimatePresence mode="wait">

//             {/* ── STEP 1 : CAR GRID ───────────────────────────────── */}
//             {!selectedCar && (
//               <motion.div key="step-car" {...motion_step}>
//                 <h2 className="text-lg sm:text-xl font-black text-slate-800 mb-6 text-center">
//                   Which Tata are you interested in?
//                 </h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
//                   {availableCars.map((car) => {
//                     const slug = getCarSlug(car);
//                     return (
//                       <div
//                         key={car}
//                         className="group relative rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
//                       >
//                         <button
//                           onClick={() => { setSelectedCar(car); setSelectedPowertrain(null); setSelectedVariantId(null); }}
//                           className="text-left flex-1 focus-visible:ring-2 focus-visible:ring-[#004b8d] focus-visible:outline-none rounded-t-2xl"
//                         >
//                           <div className="relative h-28 sm:h-32 bg-slate-100 overflow-hidden">
//                             <img
//                               src={getCarImage(car)}
//                               alt={`Tata ${car}`}
//                               loading="lazy"
//                               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                             />
//                             <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/50 to-transparent" />
//                           </div>
//                           <div className="px-3.5 pt-3 pb-2">
//                             <p className="text-sm font-black text-slate-800 uppercase tracking-wide leading-none group-hover:text-[#004b8d] transition-colors">
//                               {car}
//                             </p>
//                             <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
//                               {CAR_BODY_TYPES[car] ?? "Tata Vehicle"}
//                             </p>
//                           </div>
//                         </button>

//                         <div className="flex items-center border-t border-slate-100 divide-x divide-slate-100">
//                           <button
//                             onClick={() => { setSelectedCar(car); setSelectedPowertrain(null); setSelectedVariantId(null); }}
//                             className="flex-1 py-2 text-[11px] font-black text-[#004b8d] hover:bg-[#004b8d]/5 transition-colors text-center"
//                           >
//                             Check Offer
//                           </button>
//                           {slug ? (
//                             <Link
//                               href={`/offers/${slug}`}
//                               className="flex-1 py-2 text-[11px] font-bold text-slate-500 hover:text-[#004b8d] hover:bg-slate-50 transition-colors text-center"
//                               onClick={(e) => e.stopPropagation()}
//                             >
//                               Explore ↗
//                             </Link>
//                           ) : (
//                             <span className="flex-1 py-2 text-[11px] text-slate-300 text-center">—</span>
//                           )}
//                         </div>

//                         <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#004b8d] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
//                       </div>
//                     );
//                   })}
//                 </div>
//               </motion.div>
//             )}

//             {/* ── STEP 2 : POWERTRAIN ─────────────────────────────── */}
//             {selectedCar && !selectedPowertrain && (
//               <motion.div key="step-pt" {...motion_step}>
//                 <div className="text-center mb-8">
//                   <span className="inline-block text-xs font-black uppercase tracking-wider bg-[#004b8d]/8 text-[#004b8d] px-3 py-1 rounded-full mb-3">
//                     {selectedCar}
//                   </span>
//                   <h2 className="text-lg sm:text-xl font-black text-slate-800">
//                     Fuel or powertrain type?
//                   </h2>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
//                   {availablePowertrains.map((pt) => (
//                     <button
//                       key={pt}
//                       onClick={() => handleSelectPowertrain(pt)}
//                       className="group flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white hover:bg-[#004b8d]/4 transition-all shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#004b8d]"
//                     >
//                       <span className="text-2xl">
//                         {pt === "Electric" ? "⚡" : pt === "Petrol" ? "⛽" : pt === "Diesel" ? "🔧" : "🔋"}
//                       </span>
//                       <span className="text-sm font-black text-slate-800 group-hover:text-[#004b8d] transition-colors">
//                         {pt}
//                       </span>
//                       <span className="text-[10px] text-slate-400 font-semibold">
//                         {pt === "Electric" ? "Zero Emissions" : "Available Now"}
//                       </span>
//                     </button>
//                   ))}
//                 </div>

//                 <p className="text-center mt-8">
//                   <button onClick={goBack} className="text-xs text-slate-400 hover:text-[#004b8d] font-bold transition-colors underline-offset-4 hover:underline">
//                     ← Back to car selection
//                   </button>
//                 </p>
//               </motion.div>
//             )}

//             {/* ── STEP 3 : VARIANT (conditional) ──────────────────── */}
//             {selectedCar && selectedPowertrain && needsVariant && !selectedVariantId && (
//               <motion.div key="step-var" {...motion_step}>
//                 <div className="text-center mb-8">
//                   <span className="inline-block text-xs font-black uppercase tracking-wider bg-[#004b8d]/8 text-[#004b8d] px-3 py-1 rounded-full mb-3">
//                     {selectedCar} · {selectedPowertrain}
//                   </span>
//                   <h2 className="text-lg sm:text-xl font-black text-slate-800">
//                     Choose your variant
//                   </h2>
//                   <p className="text-xs text-slate-400 mt-1 font-medium">
//                     Different variants have different eligible benefits
//                   </p>
//                 </div>

//                 <div className="space-y-3 max-w-lg mx-auto">
//                   {matchingOffers.map((offer) => (
//                     <button
//                       key={offer.id}
//                       onClick={() => setSelectedVariantId(offer.id)}
//                       className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white hover:bg-[#004b8d]/4 transition-all shadow-sm hover:shadow-md text-left group focus-visible:ring-2 focus-visible:ring-[#004b8d]"
//                     >
//                       <div>
//                         <p className="text-sm font-bold text-slate-800 group-hover:text-[#004b8d] transition-colors">
//                           {offer.variantLabel}
//                         </p>
//                         <p className="text-xs text-slate-400 font-semibold mt-0.5">
//                           {offer.modelYear} Edition
//                           {offer.eligibility ? ` · ${offer.eligibility}` : ""}
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <p className="text-[10px] uppercase font-bold tracking-wider text-[#004b8d]/50">Up to</p>
//                         <p className="text-base font-black text-[#004b8d]">{formatINR(offer.totalBenefit)}</p>
//                       </div>
//                     </button>
//                   ))}
//                 </div>

//                 <p className="text-center mt-8">
//                   <button onClick={goBack} className="text-xs text-slate-400 hover:text-[#004b8d] font-bold transition-colors underline-offset-4 hover:underline">
//                     ← Back to powertrain
//                   </button>
//                 </p>
//               </motion.div>
//             )}

//             {/* ── STEP 4 : OFFER RESULT ───────────────────────────── */}
//             {finalOffer && (
//               <motion.div key="step-result" {...motion_step} className="max-w-xl mx-auto">
//                 <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/60">

//                   {/* Hero Banner */}
//                   <div className="relative h-52 sm:h-60 overflow-hidden bg-[#003570]">
//                     <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#0059a8]/50" />
//                     <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-[#002a58]/60" />
//                     <img
//                       src={getCarImage(finalOffer.model, finalOffer.powertrain === "Electric")}
//                       alt={`Tata ${finalOffer.model}`}
//                       className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
//                     />
//                     <div className="absolute inset-0 flex flex-col justify-end p-6">
//                       <p className="text-[10px] uppercase font-black tracking-[0.25em] text-blue-300/80 mb-1">
//                         Your Garud Tata Offer
//                       </p>
//                       <h2 className="text-3xl sm:text-4xl font-black text-white leading-none">
//                         Tata {finalOffer.model}
//                         {finalOffer.category === "EV" && !finalOffer.model.includes("EV") ? " EV" : ""}
//                       </h2>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {[finalOffer.variantLabel, finalOffer.powertrain, finalOffer.modelYear]
//                           .filter(Boolean)
//                           .map((tag) => (
//                             <span
//                               key={tag}
//                               className="text-[10px] font-bold uppercase tracking-wider bg-white/15 text-white/90 px-2.5 py-1 rounded-full"
//                             >
//                               {tag}
//                             </span>
//                           ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Offer body */}
//                   <div className="p-6 sm:p-8 bg-white">

//                     {/* Max benefit highlight */}
//                     <div className="text-center mb-7 py-5 rounded-2xl bg-slate-50 border border-slate-100">
//                       <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">
//                         Maximum Eligible Benefits
//                       </p>
//                       <p className="text-4xl sm:text-5xl font-black text-[#004b8d] leading-none">
//                         <span className="text-lg align-middle font-bold text-[#004b8d]/60 mr-1">UP TO</span>
//                         <AnimatedCounter value={finalOffer.totalBenefit} />
//                       </p>
//                     </div>

//                     {/* Breakdown grid */}
//                     <div className="mb-6">
//                       <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 text-center mb-3">
//                         Benefit Breakdown
//                       </p>
//                       <div className="grid grid-cols-2 gap-2.5">
//                         {(finalOffer.consumerOffer ?? 0) > 0 && (
//                           <BenefitChip label="Consumer Discount"  value={finalOffer.consumerOffer!} />
//                         )}
//                         {(finalOffer.exchangeBenefit ?? 0) > 0 && (
//                           <BenefitChip label="Exchange Bonus"     value={finalOffer.exchangeBenefit!} />
//                         )}
//                         {(finalOffer.scrappageBenefit ?? 0) > 0 && (
//                           <BenefitChip label="Scrappage Bonus"    value={finalOffer.scrappageBenefit!} />
//                         )}
//                         {(finalOffer.loyaltyBenefit ?? 0) > 0 && (
//                           <BenefitChip label="Loyalty Reward"     value={finalOffer.loyaltyBenefit!} />
//                         )}
//                       </div>

//                       {/* Total row */}
//                       <div className="flex items-center justify-between mt-3 px-4 py-3.5 rounded-xl bg-[#004b8d] text-white shadow-lg shadow-[#004b8d]/20">
//                         <span className="font-bold text-sm">Total Benefits</span>
//                         <span className="font-black text-lg">{formatINR(finalOffer.totalBenefit)}</span>
//                       </div>
//                     </div>

//                     <p className="text-[10px] text-slate-400 leading-relaxed text-center mb-6">
//                       *Benefits are subject to variant, customer, and campaign eligibility. Exchange,
//                       scrappage, and loyalty benefits may be combined only where applicable.
//                     </p>

//                     {/* CTA buttons */}
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                       <button
//                         onClick={() => setModal({ open: true, type: "Offer Enquiry" })}
//                         className="w-full min-h-[52px] bg-[#004b8d] hover:bg-[#00366e] active:scale-[0.98] text-white font-black text-sm rounded-xl shadow-lg shadow-[#004b8d]/25 transition-all"
//                       >
//                         GET MY OFFER →
//                       </button>
//                       <button
//                         onClick={() => setModal({ open: true, type: "Test Drive" })}
//                         className="w-full min-h-[52px] border-2 border-[#004b8d] text-[#004b8d] hover:bg-[#004b8d]/5 active:scale-[0.98] font-black text-sm rounded-xl transition-all"
//                       >
//                         BOOK TEST DRIVE
//                       </button>
//                     </div>

//                     {/* Explore detail page */}
//                     <div className="mt-3">
//                       <Link
//                         href={`/offers/${finalOffer.id}`}
//                         className="flex items-center justify-center gap-2 w-full min-h-[44px] rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-[#004b8d] text-sm font-bold transition-all group"
//                       >
//                         <span>Explore {finalOffer.model} in Detail</span>
//                         <span className="text-base group-hover:translate-x-0.5 transition-transform">↗</span>
//                       </Link>
//                       <p className="text-[10px] text-slate-400 text-center mt-1.5 font-medium">
//                         Gallery · Specs · Highlights · Full Offer Breakdown
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Back / Reset */}
//                 <div className="flex items-center justify-center gap-5 mt-5 text-xs font-bold text-slate-400">
//                   <button onClick={goBack} className="hover:text-[#004b8d] transition-colors hover:underline underline-offset-4">
//                     ← Change Selection
//                   </button>
//                   <span className="text-slate-300">|</span>
//                   <button onClick={reset} className="hover:text-[#004b8d] transition-colors hover:underline underline-offset-4">
//                     Start Over
//                   </button>
//                 </div>
//               </motion.div>
//             )}

//             {/* ── NO MATCH ────────────────────────────────────────── */}
//             {selectedCar && selectedPowertrain && !finalOffer && matchingOffers.length === 0 && (
//               <motion.div key="no-match" {...motion_step} className="text-center py-14 max-w-sm mx-auto">
//                 <div className="w-14 h-14 rounded-2xl bg-[#004b8d]/8 flex items-center justify-center mx-auto mb-4 text-2xl">
//                   🔍
//                 </div>
//                 <h3 className="text-lg font-black text-slate-800 mb-2">No Specific Offer Found</h3>
//                 <p className="text-sm text-slate-500 mb-7 leading-relaxed font-medium">
//                   Our team can verify the latest applicable benefits for your exact requirement.
//                 </p>
//                 <button
//                   onClick={() => setModal({ open: true, type: "Offer Enquiry" })}
//                   className="w-full min-h-[48px] bg-[#004b8d] hover:bg-[#00366e] font-black text-sm rounded-xl text-white transition-colors shadow-lg shadow-[#004b8d]/20 mb-4"
//                 >
//                   Talk to Garud Tata
//                 </button>
//                 <button onClick={reset} className="text-xs text-slate-400 hover:text-[#004b8d] font-bold hover:underline underline-offset-4 transition-colors">
//                   Start Over
//                 </button>
//               </motion.div>
//             )}

//           </AnimatePresence>
//         </div>
//       </div>

//       {/* ── TRUST BAR ───────────────────────────────────────────────── */}
//       <div className="max-w-3xl mx-auto mt-10 text-center">
//         <div className="flex flex-wrap items-center justify-center gap-y-2.5 gap-x-5 text-[11px] font-bold text-slate-400">
//           {["Verified Garud Offers", "MY25 / MY24 Benefits", "Exchange & Scrappage", "Test Drive Available"].map((t) => (
//             <span key={t} className="flex items-center gap-1.5">
//               <span className="text-emerald-500">✓</span> {t}
//             </span>
//           ))}
//         </div>
//         <p className="text-[10px] text-slate-400 font-semibold mt-5 uppercase tracking-widest">
//           Offers Last Updated: {LAST_UPDATED}
//         </p>
//       </div>

//       {/* ── MODAL ───────────────────────────────────────────────────── */}
//       <OfferEnquiryModal
//         isOpen={modal.open}
//         onClose={() => setModal((p) => ({ ...p, open: false }))}
//         initialCar={selectedCar ?? availableCars[0] ?? "Tata Car"}
//         enquiryType={modal.type}
//         offerDetails={finalOffer}
//         availableCars={availableCars}
//         onCarChange={(car) => {
//           setSelectedCar(car);
//           setSelectedPowertrain(null);
//           setSelectedVariantId(null);
//         }}
//       />
//     </section>
//   );
// }

// // ── Small reusable benefit chip ───────────────────────────────────────────────
// function BenefitChip({ label, value }: { label: string; value: number }) {
//   return (
//     <div className="flex flex-col px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-100">
//       <span className="text-[10px] text-slate-500 font-semibold leading-tight">{label}</span>
//       <span className="text-sm font-black text-slate-800 mt-0.5">{formatINR(value)}</span>
//     </div>
//   );
// }

















"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  animate,
  type Easing,
} from "framer-motion";
import Link from "next/link";
import {
  OFFERS,
  TataOffer,
  Powertrain,
} from "@/lib/tata-offers";

// ============================================================================
// LOCAL HELPERS & TYPES
// ============================================================================
type EnquiryType = "Offer Enquiry" | "Test Drive";

// ✅ 3 showrooms as requested
const SHOWROOMS = [
  "Garud Tata Palam",
  "Garud Tata Narela",
  "Garud Tata Najafgarh",
];

// Showroom location details for display
const SHOWROOM_META: Record<string, { area: string; city: string }> = {
  "Garud Tata Palam":      { area: "Palam",      city: "South-West Delhi" },
  "Garud Tata Narela":     { area: "Narela",     city: "North Delhi" },
  "Garud Tata Najafgarh":  { area: "Najafgarh",  city: "West Delhi" },
};

const LAST_UPDATED = new Date().toLocaleDateString("en-IN", {
  month: "long",
  year: "numeric",
});

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

// ============================================================================
// CAR METADATA & IMAGES
// ============================================================================
const CAR_BODY_TYPES: Record<string, string> = {
  Sierra:  "Premium SUV · Icon Reborn",
  Tiago:   "Hatchback",
  Tigor:   "Compact Sedan",
  Punch:   "Compact SUV",
  Altroz:  "Premium Hatchback",
  Nexon:   "Compact SUV",
  Curvv:   "SUV Coupé",
  Harrier: "Premium SUV",
  Safari:  "Flagship 7-Seater SUV",
};

const CAR_IMAGES: Record<string, string[]> = {
  sierra:      ["/Car images/Tata sierra/image1.avif","/Car images/Tata sierra/image2.avif","/Car images/Tata sierra/image3.avif"],
  tiago:       ["/Car images/Tata tiago/image1.jpg",  "/Car images/Tata tiago/image2.jpg",  "/Car images/Tata tiago/image3.jpg" ],
  "tiago-ev":  ["/Car images/Tata tiago/image1.jpg",  "/Car images/Tata tiago/image2.jpg",  "/Car images/Tata tiago/image3.jpg" ],
  tigor:       ["/Car images/Tata tigor/image1.avif", "/Car images/Tata tigor/image2.avif"                                      ],
  altroz:      ["/Car images/Tata altroz/image1.avif","/Car images/Tata altroz/image2.avif"                                     ],
  punch:       ["/Car images/Tata punch/image1.jpg",  "/Car images/Tata punch/image2.jpg"                                       ],
  "punch-ev":  ["/Car images/Tata punch/image1.jpg",  "/Car images/Tata punch/image2.jpg"                                       ],
  nexon:       ["/Car images/Tata nexon/image1.avif", "/Car images/Tata nexon/image2.avif"                                      ],
  "nexon-ev":  ["/Car images/Tata nexon/image1.avif", "/Car images/Tata nexon/image2.avif"                                      ],
  curvv:       ["/Car images/Tata curv/image1.avif",  "/Car images/Tata curv/image2.avif"                                       ],
  "curvv-ev":  ["/Car images/Tata curv/image1.avif",  "/Car images/Tata curv/image2.avif"                                       ],
  harrier:     ["/Car images/Tata harrier/image1.avif","/Car images/Tata harrier/image2.avif"                                   ],
  "harrier-ev":["/Car images/Tata harrier/image1.avif","/Car images/Tata harrier/image2.avif"                                   ],
  safari:      ["/Car images/Tata safari/image1.avif", "/Car images/Tata safari/image2.avif"                                    ],
};

const getCarImage = (model: string, isEV = false) => {
  const key = isEV ? `${model.toLowerCase()}-ev` : model.toLowerCase();
  return CAR_IMAGES[key]?.[0] || CAR_IMAGES[model.toLowerCase()]?.[0] || "/placeholder-car.jpg";
};

// Resolve the best detail-page slug for a given car model name.
// Uses the first active ICE offer for that model, falling back to any active offer.
const getCarSlug = (model: string): string | null => {
  const ice = OFFERS.find((o) => o.active && o.model === model && o.category === "ICE");
  const any = OFFERS.find((o) => o.active && o.model === model);
  return (ice ?? any)?.id ?? null;
};

// ============================================================================
// ANIMATED COUNTER
// ============================================================================
function AnimatedCounter({ value }: { value: number }) {
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = useState(prefersReduced ? value : 0);

  useEffect(() => {
    if (prefersReduced) { setDisplay(value); return; }
    const c = animate(0, value, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => c.stop();
  }, [value, prefersReduced]);

  return <span>{formatINR(display)}</span>;
}

// ============================================================================
// ENQUIRY MODAL
// — Car/variant summary card with inline car-change picker
// — Location (city) field, auto-detected via Geolocation API
// — Sends `name` + `mobile` to match the API contract
// ============================================================================
interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** The car the user arrived with (pre-fill). They can change it inside the modal. */
  initialCar: string;
  enquiryType: EnquiryType;
  offerDetails?: TataOffer | null;
  /** Full list of available car names so the user can switch */
  availableCars: string[];
  /** Called when user picks a different car inside the modal — parent should update offer details */
  onCarChange?: (car: string) => void;
}

function OfferEnquiryModal({
  isOpen,
  onClose,
  initialCar,
  enquiryType,
  offerDetails,
  availableCars,
  onCarChange,
}: EnquiryModalProps) {
  const [name, setName]               = useState("");
  const [mobile, setMobile]           = useState("");
  const [location, setLocation]       = useState("");
  const [locationLoading, setLocLoad] = useState(false);
  const [showroom, setShowroom]       = useState(SHOWROOMS[0]);
  const [isSubmitting, setSubmitting] = useState(false);
  const [isSuccess, setSuccess]       = useState(false);
  const [error, setError]             = useState("");
  const [showCarPicker, setShowCarPicker] = useState(false);
  // Local selected car — starts with whatever the parent passed, user can change
  const [activeCar, setActiveCar]     = useState(initialCar);

  // Keep activeCar in sync if parent reopens modal with a different car
  useEffect(() => { setActiveCar(initialCar); }, [initialCar]);

  // Auto-detect city via reverse-geocode when modal first opens
  useEffect(() => {
    if (!isOpen || location) return;
    if (!navigator.geolocation) return;
    setLocLoad(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            data.address?.county ||
            "";
          if (city) setLocation(city);
        } catch { /* silent */ }
        setLocLoad(false);
      },
      () => setLocLoad(false),
      { timeout: 6000 }
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCarSelect = (car: string) => {
    setActiveCar(car);
    setShowCarPicker(false);
    onCarChange?.(car);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.replace(/\D/g, "").length < 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const w = window as unknown as { fbq?: (...a: unknown[]) => void };
      w.fbq?.("track", "Lead", {
        content_name: activeCar,
        content_category: enquiryType,
        value: offerDetails?.maxOffer ?? 0,
        currency: "INR",
      });

      await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile,
          car: activeCar,
          variant: offerDetails?.variant ?? "General",
          type: enquiryType,
          showroom,
          location: location || null,
          source: "offers-page",
        }),
      });

      setSuccess(true);
    } catch {
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[90vh]"
      >
        {/* ── Fixed header ── */}
        <div className="bg-[#004b8d] px-5 py-4 flex items-center justify-between shrink-0 rounded-t-3xl sm:rounded-t-2xl">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-blue-200">
              {enquiryType === "Test Drive" ? "Book a Test Drive" : "Claim Your Offer"}
            </p>
            <p className="text-white font-black text-base leading-tight">
              Tata {activeCar}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors shrink-0"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="overflow-y-auto flex-1 p-5">
          {isSuccess ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center mx-auto mb-4 text-emerald-600 text-2xl font-black">
                ✓
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">We'll Be In Touch!</h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Our <strong className="text-slate-700">{showroom}</strong> team will call you shortly
                with the best deal on your{" "}
                <strong className="text-[#004b8d]">Tata {activeCar}</strong>.
              </p>
              <button
                onClick={onClose}
                className="w-full min-h-[48px] bg-[#004b8d] hover:bg-[#00366e] font-bold rounded-xl text-white transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* ── Car & Variant summary card ── */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-white">
                  <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Selected Vehicle
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowCarPicker((v) => !v)}
                    className="text-[11px] font-bold text-[#004b8d] hover:underline underline-offset-2 flex items-center gap-1"
                  >
                    {showCarPicker ? "Cancel" : "Change Car"}
                    {!showCarPicker && <span className="text-[10px]">↓</span>}
                  </button>
                </div>

                {/* Car picker (inline dropdown) */}
                {showCarPicker ? (
                  <div className="grid grid-cols-3 gap-2 p-3">
                    {availableCars.map((car) => (
                      <button
                        key={car}
                        type="button"
                        onClick={() => handleCarSelect(car)}
                        className={`flex flex-col items-center py-2.5 px-1 rounded-xl border text-center transition-all text-xs font-bold ${
                          activeCar === car
                            ? "border-[#004b8d] bg-[#004b8d]/8 text-[#004b8d]"
                            : "border-slate-200 bg-white text-slate-600 hover:border-[#004b8d]/50"
                        }`}
                      >
                        <img
                          src={getCarImage(car)}
                          alt={car}
                          className="w-14 h-9 object-cover rounded mb-1"
                        />
                        {car}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-3 px-4 py-3">
                    <img
                      src={getCarImage(activeCar, offerDetails?.powertrain === "Electric")}
                      alt={activeCar}
                      className="w-16 h-11 object-cover rounded-lg border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-black text-slate-800">
                        Tata {activeCar}
                        {offerDetails?.category === "EV" && !activeCar.includes("EV") ? " EV" : ""}
                      </p>
                      {offerDetails ? (
                        <>
                          <p className="text-[11px] text-slate-500 font-semibold truncate">
                            {offerDetails.variant}
                          </p>
                          <p className="text-[11px] font-black text-[#004b8d] mt-0.5">
                            Up to {formatINR(offerDetails.maxOffer)}
                          </p>
                        </>
                      ) : (
                        <p className="text-[11px] text-slate-400 font-medium">General Enquiry</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <p className="text-xs text-rose-600 bg-rose-50 border border-rose-200 rounded-lg px-3 py-2.5 font-medium">
                  {error}
                </p>
              )}

              {/* ── Name ── */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#004b8d] focus:ring-2 focus:ring-[#004b8d]/20 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-all font-medium"
                />
              </div>

              {/* ── Mobile ── */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                  placeholder="10-digit mobile number"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-[#004b8d] focus:ring-2 focus:ring-[#004b8d]/20 rounded-xl px-4 py-3 text-sm text-slate-800 outline-none transition-all font-medium"
                />
              </div>

              {/* ── Location ── */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Your City / Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={locationLoading ? "Detecting your location…" : "e.g. New Delhi, Gurugram"}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#004b8d] focus:ring-2 focus:ring-[#004b8d]/20 rounded-xl px-4 py-3 pr-10 text-sm text-slate-800 outline-none transition-all font-medium"
                  />
                  {/* Location pin icon / spinner */}
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                    {locationLoading ? (
                      <span className="inline-block w-4 h-4 border-2 border-slate-300 border-t-[#004b8d] rounded-full animate-spin" />
                    ) : (
                      "📍"
                    )}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1 font-medium">
                  Helps us assign the closest Garud Tata team to you.
                </p>
              </div>

              {/* ── Showroom picker ── */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  Preferred Showroom
                </label>
                <div className="space-y-2">
                  {SHOWROOMS.map((s) => {
                    const meta = SHOWROOM_META[s];
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setShowroom(s)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
                          showroom === s
                            ? "border-[#004b8d] bg-[#004b8d]/5 ring-2 ring-[#004b8d]/20"
                            : "border-slate-200 hover:border-[#004b8d]/40 bg-white"
                        }`}
                      >
                        <div>
                          <p className={`text-sm font-bold ${showroom === s ? "text-[#004b8d]" : "text-slate-700"}`}>
                            {s}
                          </p>
                          <p className="text-[11px] text-slate-400 font-medium mt-0.5">{meta.city}</p>
                        </div>
                        <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                          showroom === s ? "border-[#004b8d] bg-[#004b8d]" : "border-slate-300"
                        }`}>
                          {showroom === s && <span className="w-2 h-2 rounded-full bg-white block" />}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Submit ── */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[52px] bg-[#004b8d] hover:bg-[#00366e] disabled:opacity-60 text-white font-black rounded-xl transition-colors shadow-lg shadow-[#004b8d]/25 text-sm"
              >
                {isSubmitting
                  ? "Submitting…"
                  : enquiryType === "Test Drive"
                  ? "Confirm Test Drive →"
                  : "Get Best Price & Offer →"}
              </button>

              <p className="text-[10px] text-center text-slate-400 leading-relaxed pb-1">
                By submitting, you agree to be contacted via call or WhatsApp by Garud Tata.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// STEP PROGRESS BAR
// ============================================================================
function StepProgress({
  current,
  total,
  labels,
}: {
  current: number;
  total: number;
  labels: string[];
}) {
  return (
    <div className="px-5 sm:px-8 py-4 border-b border-slate-200 bg-white">
      {/* Mobile */}
      <div className="flex sm:hidden items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-[#004b8d] text-white flex items-center justify-center text-[11px] font-black">
            {current}
          </span>
          <span className="font-bold text-slate-700">{labels[current - 1]}</span>
        </div>
        <span className="text-slate-400 font-semibold">{current} / {total}</span>
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex items-center justify-between relative">
        {/* Track */}
        <div className="absolute top-3.5 left-0 right-0 h-0.5 bg-slate-200 z-0" />
        <div
          className="absolute top-3.5 left-0 h-0.5 bg-[#004b8d] z-0 transition-all duration-500"
          style={{ width: `${((current - 1) / (total - 1)) * 100}%` }}
        />

        {labels.map((label, i) => {
          const step = i + 1;
          const done = step < current;
          const active = step === current;
          return (
            <div key={label} className="relative z-10 flex flex-col items-center gap-1.5">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-300 ${
                  done
                    ? "bg-[#004b8d] text-white"
                    : active
                    ? "bg-[#004b8d] text-white ring-4 ring-[#004b8d]/20"
                    : "bg-slate-100 text-slate-400 border border-slate-200"
                }`}
              >
                {done ? "✓" : step}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${
                  active ? "text-[#004b8d]" : done ? "text-slate-500" : "text-slate-300"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// MAIN OFFERS COMPONENT
// ============================================================================
export default function Offers() {
  const prefersReduced = useReducedMotion();

  const [selectedCar, setSelectedCar]               = useState<string | null>(null);
  const [selectedPowertrain, setSelectedPowertrain] = useState<Powertrain | null>(null);
  const [selectedVariantId, setSelectedVariantId]   = useState<string | null>(null);
  const [carFilter, setCarFilter]                   = useState<"All" | "Petrol" | "CNG" | "Diesel" | "Electric">("All");
  const [modal, setModal] = useState<{ open: boolean; type: EnquiryType }>({
    open: false,
    type: "Offer Enquiry",
  });

  const availableCars = useMemo(() => {
    const list: string[] = [];
    OFFERS.forEach((o) => { if (o.active && !list.includes(o.model)) list.push(o.model); });
    return list;
  }, []);

  // Cars visible under the current filter tab
  const filteredCars = useMemo(() => {
    if (carFilter === "All") return availableCars;
    return availableCars.filter((model) =>
      OFFERS.some((o) => o.active && o.model === model && o.powertrain === carFilter)
    );
  }, [availableCars, carFilter]);

  // Badge counts per filter tab
  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = { All: availableCars.length };
    (["Petrol", "CNG", "Diesel", "Electric"] as const).forEach((pt) => {
      counts[pt] = availableCars.filter((model) =>
        OFFERS.some((o) => o.active && o.model === model && o.powertrain === pt)
      ).length;
    });
    return counts;
  }, [availableCars]);

  // When a filter is active and customer clicks a car, pre-select that powertrain
  // and skip Step 2. If "All" is active, proceed to Step 2 normally.
  const handleSelectCar = (car: string) => {
    setSelectedVariantId(null);
    if (carFilter !== "All") {
      // Filter is active — skip the powertrain step entirely
      setSelectedCar(car);
      setSelectedPowertrain(carFilter as Powertrain);
      // If no offers exist → open enquiry modal immediately
      const matches = OFFERS.filter(
        (o) => o.active && o.model === car && o.powertrain === (carFilter as Powertrain)
      );
      if (matches.length === 0) {
        setSelectedCar(null);
        setSelectedPowertrain(null);
        setModal({ open: true, type: "Offer Enquiry" });
      }
    } else {
      setSelectedCar(car);
      setSelectedPowertrain(null);
    }
  };

  const availablePowertrains = useMemo(() => {
    if (!selectedCar) return [];
    return Array.from(
      new Set(OFFERS.filter((o) => o.active && o.model === selectedCar).map((o) => o.powertrain))
    );
  }, [selectedCar]);

  const matchingOffers = useMemo(() => {
    if (!selectedCar || !selectedPowertrain) return [];
    return OFFERS.filter((o) => o.active && o.model === selectedCar && o.powertrain === selectedPowertrain);
  }, [selectedCar, selectedPowertrain]);

  const needsVariant = matchingOffers.length > 1;

  const finalOffer = useMemo<TataOffer | null>(() => {
    if (!selectedCar || !selectedPowertrain || !matchingOffers.length) return null;
    if (matchingOffers.length === 1) return matchingOffers[0];
    return matchingOffers.find((o) => o.id === selectedVariantId) ?? null;
  }, [selectedCar, selectedPowertrain, matchingOffers, selectedVariantId]);

  // Whether the powertrain step is visible (skipped when filter pre-selected it)
  const powertrainPreSelected = carFilter !== "All";

  // Build step labels dynamically — skip "Powertrain" when pre-selected
  const stepLabels = useMemo(() => {
    const base = powertrainPreSelected
      ? (needsVariant ? ["Car", "Variant", "Offer"] : ["Car", "Offer"])
      : (needsVariant ? ["Car", "Powertrain", "Variant", "Offer"] : ["Car", "Powertrain", "Offer"]);
    return base;
  }, [powertrainPreSelected, needsVariant]);

  const currentStep = useMemo(() => {
    if (!selectedCar) return 1;
    if (!selectedPowertrain) return 2;                       // only reachable when filter="All"
    if (needsVariant && !selectedVariantId) return powertrainPreSelected ? 2 : 3;
    return stepLabels.length;
  }, [selectedCar, selectedPowertrain, needsVariant, selectedVariantId, powertrainPreSelected, stepLabels.length]);

  const goBack = () => {
    if (needsVariant && selectedVariantId) { setSelectedVariantId(null); return; }
    if (selectedPowertrain) {
      setSelectedPowertrain(null);
      if (powertrainPreSelected) {
        // Re-entering car grid — clear car too so filter still applies
        setSelectedCar(null);
      }
      return;
    }
    setSelectedCar(null);
  };

  const reset = () => {
    setSelectedCar(null);
    setSelectedPowertrain(null);
    setSelectedVariantId(null);
    setCarFilter("All");
  };

  const motion_step = {
    initial: prefersReduced ? {} : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as Easing } },
    exit:    prefersReduced ? {} : { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" as Easing } },
  };

  return (
    <section className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 font-sans">
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto text-center mb-8">
        <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.18em] text-[#004b8d] bg-white border border-[#004b8d]/20 px-4 py-1.5 rounded-full mb-4 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Garud Tata · Live Offers
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black tracking-tight text-slate-800 leading-[1.15]">
          Find Your Tata Offer
        </h1>
        <p className="text-sm sm:text-base text-slate-500 max-w-md mx-auto mt-3 font-medium leading-relaxed">
          Select your model and discover exclusive benefits available this month.
        </p>
      </div>

      {/* ── MAIN CARD ─────────────────────────────────────────────── */}
      <div className="max-w-[960px] mx-auto bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/80 overflow-hidden">
        <StepProgress current={currentStep} total={stepLabels.length} labels={stepLabels} />

        <div className="p-5 sm:p-8 md:p-10">
          <AnimatePresence mode="wait">

            {/* ── STEP 1 : CAR GRID ─────────────────────────────── */}
            {!selectedCar && (
              <motion.div key="step-car" {...motion_step}>
                <h2 className="text-lg sm:text-xl font-black text-slate-800 mb-5 text-center">
                  Which Tata are you interested in?
                </h2>

                {/* ── Filter bar ── */}
                <div className="flex items-center gap-2 flex-wrap justify-center mb-6">
                  {([
                    { key: "All",      label: "All Cars", icon: "🚗" },
                    { key: "Petrol",   label: "Petrol",   icon: "⛽" },
                    { key: "CNG",      label: "CNG",      icon: "🔋" },
                    { key: "Diesel",   label: "Diesel",   icon: "🔧" },
                    { key: "Electric", label: "Electric", icon: "⚡" },
                  ] as const).map(({ key, label, icon }) => {
                    const count   = filterCounts[key] ?? 0;
                    const active  = carFilter === key;
                    if (count === 0) return null; // hide tabs with no matches
                    return (
                      <button
                        key={key}
                        onClick={() => setCarFilter(key)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all border ${
                          active
                            ? "bg-[#004b8d] text-white border-[#004b8d] shadow-md shadow-[#004b8d]/20"
                            : "bg-white text-slate-600 border-slate-200 hover:border-[#004b8d]/40 hover:text-[#004b8d]"
                        }`}
                      >
                        <span>{icon}</span>
                        <span>{label}</span>
                        <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                          active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                        }`}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* ── Car grid ── */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={carFilter}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" as Easing } }}
                    exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
                    className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
                  >
                    {filteredCars.length === 0 ? (
                      <div className="col-span-full text-center py-10 text-slate-400 font-semibold text-sm">
                        No {carFilter} models available right now.
                      </div>
                    ) : filteredCars.map((car) => {
                      const slug = getCarSlug(car);
                      // Which powertrains does this car have? Show small badges
                      const pts = Array.from(
                        new Set(OFFERS.filter((o) => o.active && o.model === car).map((o) => o.powertrain))
                      );
                      const ptEmoji: Record<string, string> = {
                        Petrol: "⛽", CNG: "🔋", Diesel: "🔧", Electric: "⚡",
                      };
                      return (
                        <div
                          key={car}
                          className="group relative rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
                        >
                          {/* Image + label — selects car */}
                          <button
                            onClick={() => { setSelectedCar(car); setSelectedPowertrain(null); setSelectedVariantId(null); }}
                            className="text-left flex-1 focus-visible:ring-2 focus-visible:ring-[#004b8d] focus-visible:outline-none rounded-t-2xl"
                          >
                            <div className="relative h-28 sm:h-32 bg-slate-100 overflow-hidden">
                              <img
                                src={getCarImage(car)}
                                alt={`Tata ${car}`}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/50 to-transparent" />
                              {/* Powertrain badge pills on image */}
                              <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                                {pts.map((pt) => (
                                  <span
                                    key={pt}
                                    className="text-[9px] font-bold bg-white/90 text-slate-700 px-1.5 py-0.5 rounded-full leading-tight shadow-sm"
                                  >
                                    {ptEmoji[pt]} {pt}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="px-3.5 pt-3 pb-2">
                              <p className="text-sm font-black text-slate-800 uppercase tracking-wide leading-none group-hover:text-[#004b8d] transition-colors">
                                {car}
                              </p>
                              <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
                                {CAR_BODY_TYPES[car] ?? "Tata Vehicle"}
                              </p>
                            </div>
                          </button>

                          {/* Bottom action row */}
                          <div className="flex items-center border-t border-slate-100 divide-x divide-slate-100">
                            <button
                              onClick={() => { setSelectedCar(car); setSelectedPowertrain(null); setSelectedVariantId(null); }}
                              className="flex-1 py-2 text-[11px] font-black text-[#004b8d] hover:bg-[#004b8d]/5 transition-colors text-center"
                            >
                              Check Offer
                            </button>
                            {slug ? (
                              <Link
                                href={`/offers/${slug}`}
                                className="flex-1 py-2 text-[11px] font-bold text-slate-500 hover:text-[#004b8d] hover:bg-slate-50 transition-colors text-center"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Explore ↗
                              </Link>
                            ) : (
                              <span className="flex-1 py-2 text-[11px] text-slate-300 text-center">—</span>
                            )}
                          </div>

                          {/* Hover accent bar */}
                          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#004b8d] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── STEP 2 : POWERTRAIN ───────────────────────────── */}
            {selectedCar && !selectedPowertrain && (
              <motion.div key="step-pt" {...motion_step}>
                <div className="text-center mb-8">
                  <span className="inline-block text-xs font-black uppercase tracking-wider bg-[#004b8d]/8 text-[#004b8d] px-3 py-1 rounded-full mb-3">
                    {selectedCar}
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-slate-800">
                    Fuel or powertrain type?
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
                  {availablePowertrains.map((pt) => (
                    <button
                      key={pt}
                      onClick={() => handleSelectPowertrain(pt)}
                      className="group flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white hover:bg-[#004b8d]/4 transition-all shadow-sm hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#004b8d]"
                    >
                      <span className="text-2xl">
                        {pt === "Electric" ? "⚡" : pt === "Petrol" ? "⛽" : pt === "Diesel" ? "🔧" : "🔋"}
                      </span>
                      <span className="text-sm font-black text-slate-800 group-hover:text-[#004b8d] transition-colors">
                        {pt}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">
                        {pt === "Electric" ? "Zero Emissions" : "Available Now"}
                      </span>
                    </button>
                  ))}
                </div>

                <p className="text-center mt-8">
                  <button onClick={goBack} className="text-xs text-slate-400 hover:text-[#004b8d] font-bold transition-colors underline-offset-4 hover:underline">
                    ← Back to car selection
                  </button>
                </p>
              </motion.div>
            )}

            {/* ── STEP 3 : VARIANT (conditional) ───────────────── */}
            {selectedCar && selectedPowertrain && needsVariant && !selectedVariantId && (
              <motion.div key="step-var" {...motion_step}>
                <div className="text-center mb-8">
                  <span className="inline-block text-xs font-black uppercase tracking-wider bg-[#004b8d]/8 text-[#004b8d] px-3 py-1 rounded-full mb-3">
                    {selectedCar} · {selectedPowertrain}
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-slate-800">
                    Choose your variant
                  </h2>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    Different variants have different eligible benefits
                  </p>
                </div>

                <div className="space-y-3 max-w-lg mx-auto">
                  {matchingOffers.map((offer) => (
                    <button
                      key={offer.id}
                      onClick={() => setSelectedVariantId(offer.id)}
                      className="w-full flex items-center justify-between px-5 py-4 rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white hover:bg-[#004b8d]/4 transition-all shadow-sm hover:shadow-md text-left group focus-visible:ring-2 focus-visible:ring-[#004b8d]"
                    >
                      <div>
                        <p className="text-sm font-bold text-slate-800 group-hover:text-[#004b8d] transition-colors">
                          {offer.variant}
                        </p>
                        <p className="text-xs text-slate-400 font-semibold mt-0.5">{offer.modelYear} Edition</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-[#004b8d]/50">Up to</p>
                        <p className="text-base font-black text-[#004b8d]">{formatINR(offer.maxOffer)}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <p className="text-center mt-8">
                  <button onClick={goBack} className="text-xs text-slate-400 hover:text-[#004b8d] font-bold transition-colors underline-offset-4 hover:underline">
                    ← Back to powertrain
                  </button>
                </p>
              </motion.div>
            )}

            {/* ── STEP 4 : OFFER RESULT ─────────────────────────── */}
            {finalOffer && (
              <motion.div key="step-result" {...motion_step} className="max-w-xl mx-auto">
                {/* ── Offer Hero Card ── */}
                <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/60">

                  {/* Hero Banner: deep navy with diagonal accent, car image overlay */}
                  <div className="relative h-52 sm:h-60 overflow-hidden bg-[#003570]">
                    {/* Geometric accent – adds depth without muddiness */}
                    <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#0059a8]/50" />
                    <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-[#002a58]/60" />

                    {/* Car image — subtle, not overwhelming */}
                    <img
                      src={getCarImage(finalOffer.model, finalOffer.powertrain === "Electric")}
                      alt={`Tata ${finalOffer.model}`}
                      className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
                    />

                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <p className="text-[10px] uppercase font-black tracking-[0.25em] text-blue-300/80 mb-1">
                        Your Garud Tata Offer
                      </p>
                      <h2 className="text-3xl sm:text-4xl font-black text-white leading-none">
                        Tata {finalOffer.model}
                        {finalOffer.category === "EV" && !finalOffer.model.includes("EV") ? " EV" : ""}
                      </h2>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {[finalOffer.variant, finalOffer.powertrain, finalOffer.modelYear].map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-bold uppercase tracking-wider bg-white/15 text-white/90 px-2.5 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Offer body */}
                  <div className="p-6 sm:p-8 bg-white">
                    {/* Max benefit highlight */}
                    <div className="text-center mb-7 py-5 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">
                        Maximum Eligible Benefits
                      </p>
                      <p className="text-4xl sm:text-5xl font-black text-[#004b8d] leading-none">
                        <span className="text-lg align-middle font-bold text-[#004b8d]/60 mr-1">UP TO</span>
                        <AnimatedCounter value={finalOffer.maxOffer} />
                      </p>
                    </div>

                    {/* Breakdown grid */}
                    <div className="mb-6">
                      <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 text-center mb-3">
                        Benefit Breakdown
                      </p>
                      <div className="grid grid-cols-2 gap-2.5">
                        {finalOffer.cash > 0 && (
                          <BenefitChip label="Consumer Discount" value={finalOffer.cash} />
                        )}
                        {finalOffer.exchangeBenefit > 0 && (
                          <BenefitChip label="Exchange Bonus" value={finalOffer.exchangeBenefit} />
                        )}
                        {finalOffer.scrappageBenefit > 0 && (
                          <BenefitChip label="Scrappage Bonus" value={finalOffer.scrappageBenefit} />
                        )}
                        {finalOffer.loyaltyBenefit > 0 && (
                          <BenefitChip label="Loyalty Reward" value={finalOffer.loyaltyBenefit} />
                        )}
                      </div>

                      {/* Total row */}
                      <div className="flex items-center justify-between mt-3 px-4 py-3.5 rounded-xl bg-[#004b8d] text-white shadow-lg shadow-[#004b8d]/20">
                        <span className="font-bold text-sm">Total Benefits</span>
                        <span className="font-black text-lg">{formatINR(finalOffer.maxOffer)}</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400 leading-relaxed text-center mb-6">
                      *Benefits are subject to variant, customer, and campaign eligibility. Exchange,
                      scrappage, and loyalty benefits may be combined only where applicable.
                    </p>

                    {/* CTA buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        onClick={() => setModal({ open: true, type: "Offer Enquiry" })}
                        className="w-full min-h-[52px] bg-[#004b8d] hover:bg-[#00366e] active:scale-[0.98] text-white font-black text-sm rounded-xl shadow-lg shadow-[#004b8d]/25 transition-all"
                      >
                        GET MY OFFER →
                      </button>
                      <button
                        onClick={() => setModal({ open: true, type: "Test Drive" })}
                        className="w-full min-h-[52px] border-2 border-[#004b8d] text-[#004b8d] hover:bg-[#004b8d]/5 active:scale-[0.98] font-black text-sm rounded-xl transition-all"
                      >
                        BOOK TEST DRIVE
                      </button>
                    </div>

                    {/* Explore Detail Page link */}
                    <div className="mt-3">
                      <Link
                        href={`/offers/${finalOffer.id}`}
                        className="flex items-center justify-center gap-2 w-full min-h-[44px] rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-[#004b8d] text-sm font-bold transition-all group"
                      >
                        <span>Explore {finalOffer.model} in Detail</span>
                        <span className="text-base group-hover:translate-x-0.5 transition-transform">↗</span>
                      </Link>
                      <p className="text-[10px] text-slate-400 text-center mt-1.5 font-medium">
                        Gallery · Specs · Highlights · Full Offer Breakdown
                      </p>
                    </div>
                  </div>
                </div>

                {/* Back / Reset */}
                <div className="flex items-center justify-center gap-5 mt-5 text-xs font-bold text-slate-400">
                  <button onClick={goBack} className="hover:text-[#004b8d] transition-colors hover:underline underline-offset-4">
                    ← Change Selection
                  </button>
                  <span className="text-slate-300">|</span>
                  <button onClick={reset} className="hover:text-[#004b8d] transition-colors hover:underline underline-offset-4">
                    Start Over
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── NO MATCH ──────────────────────────────────────── */}
            {selectedCar && selectedPowertrain && !finalOffer && matchingOffers.length === 0 && (
              <motion.div key="no-match" {...motion_step} className="text-center py-14 max-w-sm mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-[#004b8d]/8 flex items-center justify-center mx-auto mb-4 text-2xl">
                  🔍
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2">No Specific Offer Found</h3>
                <p className="text-sm text-slate-500 mb-7 leading-relaxed font-medium">
                  Our team can verify the latest applicable benefits for your exact requirement.
                </p>
                <button
                  onClick={() => setModal({ open: true, type: "Offer Enquiry" })}
                  className="w-full min-h-[48px] bg-[#004b8d] hover:bg-[#00366e] font-black text-sm rounded-xl text-white transition-colors shadow-lg shadow-[#004b8d]/20 mb-4"
                >
                  Talk to Garud Tata
                </button>
                <button onClick={reset} className="text-xs text-slate-400 hover:text-[#004b8d] font-bold hover:underline underline-offset-4 transition-colors">
                  Start Over
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* ── TRUST BAR ──────────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto mt-10 text-center">
        <div className="flex flex-wrap items-center justify-center gap-y-2.5 gap-x-5 text-[11px] font-bold text-slate-400">
          {[
            "Verified Garud Offers",
            "MY25 / MY24 Benefits",
            "Exchange & Scrappage",
            "Test Drive Available",
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> {t}
            </span>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 font-semibold mt-5 uppercase tracking-widest">
          Offers Last Updated: {LAST_UPDATED}
        </p>
      </div>

      {/* ── MODAL ─────────────────────────────────────────────────── */}
      <OfferEnquiryModal
        isOpen={modal.open}
        onClose={() => setModal((p) => ({ ...p, open: false }))}
        initialCar={selectedCar ?? availableCars[0] ?? "Tata Car"}
        enquiryType={modal.type}
        offerDetails={finalOffer}
        availableCars={availableCars}
        onCarChange={(car) => {
          setSelectedCar(car);
          setSelectedPowertrain(null);
          setSelectedVariantId(null);
        }}
      />
    </section>
  );

  function handleSelectPowertrain(pt: Powertrain) {
    setSelectedPowertrain(pt);
    setSelectedVariantId(null);
  }
}

// ── Small reusable benefit chip ───────────────────────────────────────────────
function BenefitChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-100">
      <span className="text-[10px] text-slate-500 font-semibold leading-tight">{label}</span>
      <span className="text-sm font-black text-slate-800 mt-0.5">{formatINR(value)}</span>
    </div>
  );
}