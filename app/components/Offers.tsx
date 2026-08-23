




// "use client";

// import {
//   useState,
//   useRef,
//   useEffect,
//   useMemo,
//   useCallback,
//   memo,
//   type FormEvent,
//   type ReactNode,
// } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useInView,
//   useMotionValue,
//   useSpring,
//   useReducedMotion,
// } from "framer-motion";
// import {
//   ArrowRight, Tag, RefreshCcw, Trash2, Heart, Zap, Loader2,
//   CheckCircle2, Info, Car, Fuel, ChevronRight, ChevronDown, X,
// } from "lucide-react";

// /* ════════════════════════════════════════════════════════════════════════
//    PALETTE TOKENS (mid-tone steel-blue — not dark, not light)
//    Base:    #0D1829  (section bg)
//    Surface: #132035  (card / table bg)
//    Raised:  #1A2D47  (hover / raised card)
//    Border:  white/9–13%
//    Brand:   #0055A5  (Tata blue)
//    Accent:  #5BA3E8 / #7DB8F7  (text highlights)
// ════════════════════════════════════════════════════════════════════════ */

// /* ── ANALYTICS ──────────────────────────────────────────────────────── */
// declare global { interface Window { fbq?: (...args: unknown[]) => void; } }
// function track(event: string, params?: Record<string, string | number>) {
//   if (typeof window !== "undefined" && typeof window.fbq === "function") window.fbq("track", event, params);
// }
// const trackViewOffer      = (id: string)                   => track("ViewContent", { content_name: id });
// const trackGetOfferClick  = (id: string, model: string)    => track("Lead", { content_name: model, offer_id: id, source: "GetOfferClick" });
// const trackTestDriveClick = (model: string)                => track("Lead", { content_name: model, source: "TestDriveClick" });
// const trackQuickModalOpen = ()                             => track("Lead", { source: "QuickOfferModalOpen" });

// /* ── DATA CONTRACT ──────────────────────────────────────────────────── */
// type Category  = "SUV" | "Hatchback" | "Sedan" | "EV";
// type ModelYear = "MY24" | "MY25";

// export type TataOffer = {
//   id: string;
//   model: string;
//   variantLabel?: string;
//   category: Category;
//   modelYear: ModelYear;
//   consumerOffer?: number;
//   exchangeBenefit?: number;
//   scrappageBenefit?: number;
//   loyaltyBenefit?: number;
//   totalBenefit: number;
//   featured?: boolean;
//   eligibility?: string;
//   active: boolean;
// };

// const LAST_UPDATED = "20 August 2026";

// const OFFERS: TataOffer[] = [
//   { id: "tiago-petrol",    model: "Tata Tiago",   variantLabel: "Petrol",           category: "Hatchback", modelYear: "MY25", consumerOffer: 35000, exchangeBenefit: 10000, scrappageBenefit: 15000, totalBenefit: 50000,  active: true },
//   { id: "tiago-cng",       model: "Tata Tiago",   variantLabel: "CNG",              category: "Hatchback", modelYear: "MY25", consumerOffer: 30000, exchangeBenefit: 10000, scrappageBenefit: 15000, totalBenefit: 45000,  active: true },
//   { id: "tigor",           model: "Tata Tigor",   category: "Sedan",                modelYear: "MY25",     consumerOffer: 15000, exchangeBenefit: 10000, scrappageBenefit: 15000, totalBenefit: 30000,  active: true },
//   { id: "altroz-petrol",   model: "Tata Altroz",  variantLabel: "Petrol",           category: "Hatchback", modelYear: "MY25", consumerOffer: 35000, exchangeBenefit: 15000, scrappageBenefit: 20000, totalBenefit: 55000,  active: true },
//   { id: "altroz-cng",      model: "Tata Altroz",  variantLabel: "CNG",              category: "Hatchback", modelYear: "MY25", consumerOffer: 35000, exchangeBenefit: 15000, scrappageBenefit: 20000, totalBenefit: 55000,  active: true },
//   { id: "altroz-diesel",   model: "Tata Altroz",  variantLabel: "Diesel",           category: "Hatchback", modelYear: "MY25", consumerOffer: 25000, exchangeBenefit: 15000, scrappageBenefit: 20000, totalBenefit: 45000,  active: true },
//   { id: "altroz-outgoing", model: "Tata Altroz",  variantLabel: "Outgoing Stock",   category: "Hatchback", modelYear: "MY24", consumerOffer: 110000, exchangeBenefit: 40000, scrappageBenefit: 40000, loyaltyBenefit: 25000, totalBenefit: 175000, eligibility: "Limited outgoing stock — selected variants", active: true },
//   { id: "punch-petrol-out",model: "Tata Punch",   variantLabel: "Petrol · Outgoing",category: "SUV",       modelYear: "MY24", consumerOffer: 70000, exchangeBenefit: 30000, scrappageBenefit: 30000, loyaltyBenefit: 20000, totalBenefit: 120000, eligibility: "Limited outgoing stock", active: true },
//   { id: "punch-cng-out",   model: "Tata Punch",   variantLabel: "CNG · Outgoing",   category: "SUV",       modelYear: "MY24", consumerOffer: 70000, exchangeBenefit: 30000, scrappageBenefit: 30000, loyaltyBenefit: 20000, totalBenefit: 120000, eligibility: "Limited outgoing stock", active: true },
//   { id: "nexon-petrol",    model: "Tata Nexon",   variantLabel: "Petrol",           category: "SUV",       modelYear: "MY25", consumerOffer: 40000, exchangeBenefit: 15000, scrappageBenefit: 20000, totalBenefit: 60000,  active: true },
//   { id: "nexon-cng",       model: "Tata Nexon",   variantLabel: "CNG",              category: "SUV",       modelYear: "MY25", consumerOffer: 35000, exchangeBenefit: 20000, scrappageBenefit: 25000, totalBenefit: 60000,  active: true },
//   { id: "nexon-diesel",    model: "Tata Nexon",   variantLabel: "Diesel",           category: "SUV",       modelYear: "MY25", exchangeBenefit: 15000, scrappageBenefit: 20000, totalBenefit: 20000,   active: true },
//   { id: "curvv",           model: "Tata Curvv",   category: "SUV",                  modelYear: "MY25",     consumerOffer: 30000, exchangeBenefit: 40000, scrappageBenefit: 45000, loyaltyBenefit: 50000, totalBenefit: 125000, active: true },
//   { id: "harrier-d",       model: "Tata Harrier", variantLabel: "Diesel",           category: "SUV",       modelYear: "MY25", consumerOffer: 10000, exchangeBenefit: 25000, scrappageBenefit: 35000, totalBenefit: 45000,  active: true },
//   { id: "harrier-d-wox",   model: "Tata Harrier", variantLabel: "Diesel · w/o X",  category: "SUV",       modelYear: "MY24", consumerOffer: 150000, exchangeBenefit: 50000, scrappageBenefit: 50000, loyaltyBenefit: 40000, totalBenefit: 240000, eligibility: "Selected variants — excludes X trim", active: true },
//   { id: "harrier-p",       model: "Tata Harrier", variantLabel: "Petrol",           category: "SUV",       modelYear: "MY25", consumerOffer: 40000, totalBenefit: 40000,   active: true },
//   { id: "safari-d",        model: "Tata Safari",  variantLabel: "2.0 Diesel",       category: "SUV",       modelYear: "MY25", consumerOffer: 10000, exchangeBenefit: 25000, scrappageBenefit: 35000, totalBenefit: 45000,  active: true },
//   { id: "safari-d-wox",    model: "Tata Safari",  variantLabel: "2.0 Diesel · w/o X", category: "SUV",    modelYear: "MY24", consumerOffer: 150000, exchangeBenefit: 50000, scrappageBenefit: 50000, loyaltyBenefit: 40000, totalBenefit: 240000, eligibility: "Selected variants — excludes X trim", active: true },
//   { id: "safari-p",        model: "Tata Safari",  variantLabel: "2.0 Petrol",       category: "SUV",       modelYear: "MY25", consumerOffer: 40000, totalBenefit: 40000,   active: true },
//   { id: "tiago-ev-lr-xt",  model: "Tata Tiago EV",  variantLabel: "LR XT",             category: "EV", modelYear: "MY25", consumerOffer: 100000, exchangeBenefit: 20000, scrappageBenefit: 25000, totalBenefit: 125000, active: true },
//   { id: "tiago-ev-lr-xz",  model: "Tata Tiago EV",  variantLabel: "LR XZ+ & above",    category: "EV", modelYear: "MY25", consumerOffer: 100000, exchangeBenefit: 20000, scrappageBenefit: 25000, totalBenefit: 125000, active: true },
//   { id: "tiago-ev-mr",     model: "Tata Tiago EV",  variantLabel: "MR — all variants",  category: "EV", modelYear: "MY25", consumerOffer: 40000,  exchangeBenefit: 20000, scrappageBenefit: 25000, totalBenefit: 65000,  active: true },
//   { id: "punch-ev-lr",     model: "Tata Punch EV",  variantLabel: "LR — all variants",  category: "EV", modelYear: "MY25", consumerOffer: 110000, exchangeBenefit: 30000, scrappageBenefit: 35000, totalBenefit: 145000, active: true },
//   { id: "punch-ev-mr",     model: "Tata Punch EV",  variantLabel: "MR (excl. Smart)",   category: "EV", modelYear: "MY25", consumerOffer: 90000,  exchangeBenefit: 30000, scrappageBenefit: 35000, totalBenefit: 125000, active: true },
//   { id: "punch-ev-smart",  model: "Tata Punch EV",  variantLabel: "Smart & Smart+",     category: "EV", modelYear: "MY25", consumerOffer: 60000,  exchangeBenefit: 30000, scrappageBenefit: 35000, totalBenefit: 95000,  active: true },
//   { id: "nexon-ev",        model: "Tata Nexon EV",  variantLabel: "3.0",                category: "EV", modelYear: "MY25", consumerOffer: 15000,  exchangeBenefit: 25000, scrappageBenefit: 35000, totalBenefit: 50000,  active: true },
//   { id: "curvv-ev",        model: "Tata Curvv EV",  category: "EV",                     modelYear: "MY25", consumerOffer: 300000, exchangeBenefit: 30000, scrappageBenefit: 35000, totalBenefit: 335000, featured: true, active: true },
//   { id: "harrier-ev",      model: "Tata Harrier EV",category: "EV",                     modelYear: "MY25", consumerOffer: 100000, exchangeBenefit: 50000, scrappageBenefit: 75000, loyaltyBenefit: 100000, totalBenefit: 275000, active: true },
// ];

// /* ── HELPERS ────────────────────────────────────────────────────────── */
// const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

// const BENEFIT_ROWS: {
//   key: keyof Pick<TataOffer, "consumerOffer" | "exchangeBenefit" | "scrappageBenefit" | "loyaltyBenefit">;
//   label: string; short: string; Icon: typeof Tag;
// }[] = [
//   { key: "consumerOffer",    label: "Consumer Offer", short: "Consumer",  Icon: Tag },
//   { key: "exchangeBenefit",  label: "Exchange",       short: "Exchange",  Icon: RefreshCcw },
//   { key: "scrappageBenefit", label: "Scrappage",      short: "Scrappage", Icon: Trash2 },
//   { key: "loyaltyBenefit",   label: "Loyalty",        short: "Loyalty",   Icon: Heart },
// ];

// const FILTERS = ["ALL", "SUV", "Hatchback", "EV", "MY25", "MY24"] as const;
// type FilterKey = (typeof FILTERS)[number];

// function matchesFilter(o: TataOffer, f: FilterKey) {
//   if (f === "ALL") return true;
//   if (f === "MY25" || f === "MY24") return o.modelYear === f;
//   return o.category === f;
// }

// async function submitEnquiry(payload: { name: string; mobile: string; car: string; source: string }) {
//   const res = await fetch("/api/enquiry", {
//     method: "POST", headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });
//   const data = await res.json().catch(() => ({}));
//   if (!res.ok) throw new Error(data?.error ?? "Submission failed. Please try again.");
//   return data as { success: true; id: string; message: string };
// }

// /* ── ANIMATED NUMBER ────────────────────────────────────────────────── */
// function AnimatedAmount({ value, active, className }: { value: number; active: boolean; className?: string }) {
//   const prefersReduced = useReducedMotion();
//   const mv     = useMotionValue(0);
//   const spring = useSpring(mv, { stiffness: 80, damping: 20 });
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
//         aria-expanded={open} aria-label="Benefit combination details"
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
//             Benefits are subject to model, variant, customer and campaign eligibility. Please confirm the applicable offer with Garud Tata.
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
//   const [open, setOpen] = useState(false);
//   const [highlighted, setHighlighted] = useState(0);
//   const wrapRef = useRef<HTMLDivElement>(null);
//   const listId  = useRef(`listbox-${label.replace(/\s+/g, "-").toLowerCase()}`);

//   useEffect(() => {
//     if (!open) return;
//     function onDocClick(e: MouseEvent) {
//       if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
//     }
//     document.addEventListener("mousedown", onDocClick);
//     return () => document.removeEventListener("mousedown", onDocClick);
//   }, [open]);

//   useEffect(() => { if (open) setHighlighted(Math.max(0, options.indexOf(value))); }, [open, value, options]);

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) { e.preventDefault(); setOpen(true); return; }
//     if (!open) return;
//     if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted(i => Math.min(i + 1, options.length - 1)); }
//     else if (e.key === "ArrowUp") { e.preventDefault(); setHighlighted(i => Math.max(i - 1, 0)); }
//     else if (e.key === "Enter") { e.preventDefault(); onChange(options[highlighted]); setOpen(false); }
//     else if (e.key === "Escape") { e.preventDefault(); setOpen(false); }
//     else if (e.key === "Tab") { setOpen(false); }
//   };

//   return (
//     <div ref={wrapRef} className="relative">
//       <label className="block text-[10px] text-white/35 mb-1.5 tracking-[0.18em] uppercase font-bold">{label}</label>
//       <button
//         ref={fieldRef} type="button"
//         onClick={() => setOpen(o => !o)} onKeyDown={handleKeyDown}
//         aria-haspopup="listbox" aria-expanded={open} aria-controls={listId.current}
//         className="w-full flex items-center justify-between gap-2 bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3.5 min-h-[52px] text-left text-[16px] sm:text-[13.5px] focus:outline-none focus:border-[#0055A5]/65 focus:bg-[#0055A5]/[0.08] transition-colors duration-200"
//       >
//         <span className={`truncate ${value ? "text-white" : "text-white/25"}`}>{value || placeholder}</span>
//         <ChevronDown size={16} strokeWidth={2.4} className={`flex-shrink-0 text-white/35 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
//       </button>

//       <AnimatePresence>
//         {open && (
//           <motion.ul
//             id={listId.current} role="listbox" tabIndex={-1}
//             initial={{ opacity: 0, y: -6, scale: 0.98 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -6, scale: 0.98 }}
//             transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
//             className="absolute z-50 mt-2 w-full max-h-64 overflow-y-auto rounded-xl border border-white/[0.12] bg-[#132035] shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-1.5 [-webkit-overflow-scrolling:touch]"
//           >
//             {options.map((opt, i) => (
//               <li
//                 key={opt} role="option" aria-selected={value === opt}
//                 onMouseEnter={() => setHighlighted(i)}
//                 onClick={() => { onChange(opt); setOpen(false); }}
//                 className={`flex items-center justify-between gap-2 px-3.5 py-3 sm:py-2.5 rounded-lg cursor-pointer select-none text-[15px] sm:text-[13.5px] transition-colors duration-100 ${i === highlighted ? "bg-[#0055A5]/20" : ""} ${value === opt ? "text-[#7DB8F7] font-semibold" : "text-white/70"}`}
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
//           key={f} onClick={() => onChange(f)} aria-pressed={active === f}
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
// }: { offer: TataOffer; onGetOffer: (o: TataOffer) => void; onTestDrive: (o: TataOffer) => void }) {
//   const ref    = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-60px" });
//   const prefersReduced = useReducedMotion();

//   useEffect(() => { if (inView) trackViewOffer(offer.id); }, [inView, offer.id]);

//   const activeBenefitRows = BENEFIT_ROWS.filter(r => typeof offer[r.key] === "number" && (offer[r.key] as number) > 0);

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
//       <div
//         className="absolute inset-0 opacity-[0.022] pointer-events-none"
//         style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "48px 48px" }}
//       />

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
//             <h3 className="text-white font-extrabold text-[1.9rem] sm:text-[2.2rem] lg:text-[2.8rem] tracking-[-0.02em] leading-[1.0] mb-1">{offer.model}</h3>
//             <p className="text-white/38 text-[13px] font-medium mb-6">{offer.variantLabel ?? offer.category} · {offer.modelYear} Consumer Offer</p>

//             <p className="text-[9px] font-bold tracking-[0.22em] text-[#5BA3E8]/65 uppercase mb-2">Maximum Eligible Benefits</p>
//             <AnimatedAmount value={offer.totalBenefit} active={inView} className="block text-white font-extrabold text-[2.6rem] sm:text-[3.4rem] lg:text-[4.2rem] tracking-[-0.03em] leading-none mb-2" />
//             <p className="text-white/25 text-[11px] mb-6">Up to, on eligible variants*</p>

//             <div className="flex flex-wrap gap-3 mb-6">
//               <button
//                 onClick={() => { trackGetOfferClick(offer.id, offer.model); onGetOffer(offer); }}
//                 className="group/btn flex items-center gap-2.5 px-7 py-3.5 rounded-full min-h-[48px] bg-[#0055A5] hover:bg-[#1A70D4] active:bg-[#1A70D4] text-white font-bold text-[12.5px] tracking-[0.07em] shadow-[0_6px_28px_rgba(0,85,165,0.45)] hover:-translate-y-0.5 transition-all duration-200"
//               >
//                 GET {offer.model.replace("Tata ", "").toUpperCase()} OFFER
//                 <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-150" />
//               </button>
//               <button
//                 onClick={() => { trackTestDriveClick(offer.model); onTestDrive(offer); }}
//                 className="px-7 py-3.5 rounded-full min-h-[48px] bg-white/[0.06] border border-white/[0.15] hover:border-white/30 hover:bg-white/[0.10] text-white font-medium text-[12.5px] tracking-[0.05em] transition-all duration-200"
//               >
//                 TEST DRIVE
//               </button>
//             </div>
//           </div>

//           <div className="lg:min-w-[240px] bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
//             <p className="text-[9px] font-bold tracking-[0.18em] text-white/30 uppercase mb-4">Benefit Breakdown</p>
//             <div className="space-y-3">
//               {activeBenefitRows.map(({ key, label, Icon }) => (
//                 <div key={key} className="flex items-center justify-between gap-6">
//                   <span className="flex items-center gap-2 text-white/42 text-[12.5px]">
//                     <Icon size={13} className="text-[#0055A5]/75 flex-shrink-0" strokeWidth={2} />{label}
//                   </span>
//                   <span className="text-white/80 text-[13px] font-bold tabular-nums whitespace-nowrap">{formatINR(offer[key] as number)}</span>
//                 </div>
//               ))}
//             </div>
//             {activeBenefitRows.length >= 2 && (
//               <div className="mt-4 pt-3 border-t border-white/[0.07]"><CombineNote /></div>
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
// }: { offer: TataOffer; index: number; onGetOffer: (o: TataOffer) => void; onTestDrive: (o: TataOffer) => void }) {
//   const ref    = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-40px" });
//   const prefersReduced = useReducedMotion();

//   useEffect(() => { if (inView) trackViewOffer(offer.id); }, [inView, offer.id]);

//   const activeBenefitRows = BENEFIT_ROWS.filter(r => typeof offer[r.key] === "number" && (offer[r.key] as number) > 0);

//   return (
//     <motion.div
//       ref={ref}
//       initial={prefersReduced ? false : { opacity: 0, x: -16 }}
//       animate={inView ? { opacity: 1, x: 0 } : {}}
//       transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.05, 0.3) }}
//       className="group relative grid items-center gap-5 px-5 py-4 border-b border-white/[0.05] last:border-0 hover:bg-white/[0.03] transition-colors duration-200 cursor-default"
//       style={{ gridTemplateColumns: "minmax(190px,1fr) 1fr minmax(130px,auto) auto" }}
//     >
//       <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#0055A5] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />

//       <div className="min-w-0 pl-3">
//         <ModelBadges offer={offer} />
//         <p className="text-white/90 font-bold text-[14.5px] tracking-tight mt-1.5 group-hover:translate-x-0.5 transition-transform duration-200 truncate">{offer.model}</p>
//         <p className="text-white/32 text-[11px] font-medium truncate">{offer.variantLabel ?? offer.category}</p>
//       </div>

//       <div className="flex flex-wrap gap-x-4 gap-y-2">
//         {activeBenefitRows.length === 0 ? (
//           <span className="text-white/25 text-[11px] italic">Available on enquiry</span>
//         ) : activeBenefitRows.map(({ key, label, short, Icon }) => (
//           <div key={key} className="flex flex-col gap-0.5 min-w-[68px]">
//             <span className="flex items-center gap-1 text-[10px] text-white/32 font-medium">
//               <Icon size={10} strokeWidth={2} className="text-[#0055A5]/65 flex-shrink-0" />{short}
//             </span>
//             <span className="text-white/70 text-[12.5px] font-bold tabular-nums">{formatINR(offer[key] as number)}</span>
//           </div>
//         ))}
//       </div>

//       <div className="text-right">
//         <p className="text-[8.5px] font-bold tracking-[0.18em] text-white/28 uppercase mb-0.5">Total</p>
//         <AnimatedAmount value={offer.totalBenefit} active={inView} className="block text-white/90 font-extrabold text-[1.3rem] tracking-tight leading-none group-hover:text-[#7DB8F7] transition-colors duration-300" />
//         <p className="text-white/20 text-[9.5px] mt-0.5">Up to*</p>
//       </div>

//       <div className="flex flex-col gap-1.5 items-end">
//         <button
//           onClick={() => { trackGetOfferClick(offer.id, offer.model); onGetOffer(offer); }}
//           className="group/btn flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0055A5] hover:bg-[#1A70D4] text-white font-bold text-[11px] tracking-[0.07em] whitespace-nowrap shadow-[0_3px_14px_rgba(0,85,165,0.3)] transition-all duration-200"
//         >
//           GET OFFER
//           <ChevronRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform duration-150" />
//         </button>
//         <button
//           onClick={() => { trackTestDriveClick(offer.model); onTestDrive(offer); }}
//           className="px-4 py-1.5 rounded-lg border border-white/[0.10] hover:border-white/25 text-white/40 hover:text-white/80 text-[10.5px] font-semibold tracking-[0.06em] whitespace-nowrap transition-all duration-150"
//         >
//           TEST DRIVE
//         </button>
//       </div>
//     </motion.div>
//   );
// });

// /* ── MOBILE CARD ────────────────────────────────────────────────────── */
// const MobileOfferCard = memo(function MobileOfferCard({
//   offer, index, onGetOffer, onTestDrive,
// }: { offer: TataOffer; index: number; onGetOffer: (o: TataOffer) => void; onTestDrive: (o: TataOffer) => void }) {
//   const ref    = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-40px" });
//   const prefersReduced = useReducedMotion();

//   useEffect(() => { if (inView) trackViewOffer(offer.id); }, [inView, offer.id]);

//   const activeBenefitRows = BENEFIT_ROWS.filter(r => typeof offer[r.key] === "number" && (offer[r.key] as number) > 0);

//   return (
//     <motion.div
//       ref={ref}
//       initial={prefersReduced ? false : { opacity: 0, y: 16 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.04, 0.24) }}
//       className="bg-[#132035] border border-white/[0.08] rounded-2xl p-4 sm:p-5 mb-3 last:mb-0"
//     >
//       <div className="flex items-start justify-between gap-3 mb-3">
//         <div className="min-w-0">
//           <ModelBadges offer={offer} />
//           <h3 className="text-white/90 font-extrabold text-[1.02rem] tracking-tight mt-1.5 truncate">{offer.model}</h3>
//           <p className="text-white/35 text-[11px] mt-0.5 truncate">{offer.variantLabel ?? offer.category}</p>
//         </div>
//         <div className="text-right flex-shrink-0">
//           <p className="text-[8.5px] font-bold tracking-[0.18em] text-white/28 uppercase mb-0.5">TOTAL</p>
//           <AnimatedAmount value={offer.totalBenefit} active={inView} className="block text-white/90 font-extrabold text-[1.35rem] tracking-tight leading-none" />
//           <p className="text-white/20 text-[9px] mt-0.5">Up to*</p>
//         </div>
//       </div>

//       {activeBenefitRows.length > 0 && (
//         <div className="space-y-2 border-t border-white/[0.06] pt-3 mb-4">
//           {activeBenefitRows.map(({ key, label, Icon }) => (
//             <div key={key} className="flex items-center justify-between">
//               <span className="flex items-center gap-1.5 text-white/38 text-[11.5px]">
//                 <Icon size={11} className="text-[#0055A5]/65 flex-shrink-0" strokeWidth={2} />{label}
//               </span>
//               <span className="text-white/65 text-[12px] font-semibold tabular-nums">{formatINR(offer[key] as number)}</span>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="flex gap-2">
//         <button
//           onClick={() => { trackGetOfferClick(offer.id, offer.model); onGetOffer(offer); }}
//           className="group/btn flex-1 flex items-center justify-center gap-1.5 py-3 rounded-lg min-h-[44px] bg-[#0055A5] active:bg-[#1A70D4] text-white font-bold text-[12px] tracking-[0.06em] transition-colors duration-150"
//         >
//           GET OFFER <ArrowRight size={12} />
//         </button>
//         <button
//           onClick={() => { trackTestDriveClick(offer.model); onTestDrive(offer); }}
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
//         style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "72px 72px" }}
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

// /* ── SHARED FORM CONSTANTS ──────────────────────────────────────────── */
// type EnquiryType = "Get Offer" | "Test Drive" | "Exchange" | "Finance" | "General Enquiry";

// const CARS = [
//   "Tata Sierra", "Tata Harrier", "Tata Safari", "Tata Curvv", "Tata Curvv EV",
//   "Tata Nexon", "Tata Nexon EV", "Tata Punch", "Tata Punch EV",
//   "Tata Altroz", "Tata Tiago", "Tata Tiago EV", "Tata Tigor",
// ] as const;

// const SHOWROOMS = ["Garud Tata Palam", "Garud Tata Narela", "Garud Tata Najafgarh"] as const;
// const ENQUIRY_TYPES: EnquiryType[] = ["Get Offer", "Test Drive", "Exchange", "Finance", "General Enquiry"];

// const fieldClass = "w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3.5 min-h-[52px] text-white text-[16px] sm:text-[13.5px] placeholder:text-white/25 focus:outline-none focus:border-[#0055A5]/65 focus:bg-[#0055A5]/[0.07] transition-colors duration-200";

// /* ── FULL ENQUIRY FORM ──────────────────────────────────────────────── */
// interface EnquiryFormProps { preselectedCar?: string; preselectedType?: EnquiryType; }

// function EnquiryForm({ preselectedCar, preselectedType }: EnquiryFormProps) {
//   const [form, setForm] = useState({
//     name: "", mobile: "",
//     car:      preselectedCar  ?? "",
//     type:     preselectedType ?? ("Get Offer" as EnquiryType),
//     showroom: "",
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [loading,   setLoading]   = useState(false);
//   const [error,     setError]     = useState("");
//   const nameRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     setForm(prev => ({ ...prev, car: preselectedCar ?? prev.car, type: preselectedType ?? prev.type }));
//   }, [preselectedCar, preselectedType]);

//   useEffect(() => {
//     if (preselectedCar || preselectedType) setTimeout(() => nameRef.current?.focus(), 400);
//   }, [preselectedCar, preselectedType]);

//   const handleSubmit = useCallback(async (e: FormEvent) => {
//     e.preventDefault();
//     if (loading) return;
//     setError("");
//     if (!form.name.trim())                          { setError("Please enter your name."); return; }
//     if (form.mobile.replace(/\D/g, "").length < 10)  { setError("Please enter a valid 10-digit mobile number."); return; }
//     if (!form.car)                                   { setError("Please select a car."); return; }
//     if (!form.showroom)                              { setError("Please select a showroom."); return; }

//     setLoading(true);
//     try {
//       await submitEnquiry({ name: form.name, mobile: form.mobile, car: form.car, source: `garud-tata-offers | type=${form.type} | showroom=${form.showroom}` });
//       setSubmitted(true);
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [form, loading]);

//   return (
//     <section id="enquiry" className="bg-[#0D1829] py-16 sm:py-20 lg:py-28 px-5 lg:px-12 scroll-mt-0">
//       <div className="max-w-[600px] mx-auto">
//         <div className="text-center mb-8 sm:mb-10">
//           <span className="text-[10px] font-bold tracking-[0.26em] text-[#7DB8F7] uppercase mb-3 block">GARUD TATA · ENQUIRY</span>
//           <h2 className="text-white font-extrabold text-[clamp(1.7rem,6vw,2.8rem)] tracking-tight leading-[1.05] mb-3">
//             Let's Get You<br />Behind the Wheel
//           </h2>
//           <p className="text-white/42 text-[13.5px] sm:text-[14px] max-w-md mx-auto leading-relaxed">
//             Tell us what you're interested in and the Garud Tata team will get in touch with you.
//           </p>
//         </div>

//         <div className="bg-[#132035] border border-white/[0.08] rounded-3xl p-5 sm:p-6 lg:p-8">
//           {submitted ? (
//             <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="py-8 sm:py-10 text-center">
//               <div className="w-14 h-14 rounded-full bg-[#0055A5]/18 border border-[#0055A5]/35 flex items-center justify-center mx-auto mb-5">
//                 <CheckCircle2 size={28} className="text-[#7DB8F7]" />
//               </div>
//               <h3 className="text-white font-extrabold text-[1.4rem] sm:text-[1.5rem] tracking-tight mb-2">Enquiry Received!</h3>
//               <p className="text-white/42 text-[13.5px] sm:text-[14px] leading-relaxed mb-8 max-w-xs mx-auto">
//                 Thank you for contacting Garud Tata. Our team will get in touch shortly. Your {form.type.toLowerCase()} enquiry has been received.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                 <a href="tel:+911234567890" className="flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full bg-[#0055A5] active:bg-[#1A70D4] text-white font-bold text-[12.5px] tracking-[0.06em] transition-colors duration-150">CALL NOW</a>
//                 <a href="https://wa.me/911234567890" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full bg-white/[0.06] border border-white/[0.15] active:border-white/30 text-white font-medium text-[12.5px] tracking-[0.04em] transition-colors duration-150">WHATSAPP US</a>
//               </div>
//             </motion.div>
//           ) : (
//             <form onSubmit={handleSubmit} noValidate className="space-y-4">
//               {(preselectedCar || preselectedType) && (
//                 <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 bg-[#0055A5]/10 border border-[#0055A5]/22 rounded-xl px-4 py-3">
//                   <CheckCircle2 size={15} className="text-[#7DB8F7] flex-shrink-0" />
//                   <div className="min-w-0 text-[12px]">
//                     <span className="text-white font-semibold">{preselectedCar}</span>
//                     {preselectedType && <span className="text-white/42"> · {preselectedType}</span>}
//                     <span className="text-white/30"> — pre-filled from your selection</span>
//                   </div>
//                 </motion.div>
//               )}

//               <div>
//                 <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">Name</label>
//                 <input ref={nameRef} type="text" required autoComplete="name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" className={fieldClass} />
//               </div>

//               <div>
//                 <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">Mobile Number</label>
//                 <input type="tel" required inputMode="numeric" autoComplete="tel" maxLength={15} value={form.mobile} onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))} placeholder="+91 00000 00000" className={fieldClass} />
//               </div>

//               <CustomSelect label="Interested Car" value={form.car} onChange={v => setForm(p => ({ ...p, car: v }))} options={CARS} placeholder="Select a model" />

//               <div>
//                 <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">Enquiry Type</label>
//                 <div className="flex flex-wrap gap-2">
//                   {ENQUIRY_TYPES.map(t => (
//                     <button
//                       key={t} type="button" onClick={() => setForm(p => ({ ...p, type: t }))}
//                       className={`px-3.5 py-2.5 rounded-lg text-[12px] font-semibold tracking-[0.04em] min-h-[40px] border transition-colors duration-150 ${form.type === t ? "bg-[#0055A5] border-[#0055A5] text-white" : "bg-white/[0.04] border-white/[0.09] text-white/45 active:text-white active:border-white/22"}`}
//                     >
//                       {t}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <CustomSelect label="Preferred Showroom" value={form.showroom} onChange={v => setForm(p => ({ ...p, showroom: v }))} options={SHOWROOMS} placeholder="Select a showroom" />

//               {error && <p role="alert" className="text-red-400 text-[13px] leading-snug">{error}</p>}

//               <button
//                 type="submit" disabled={loading}
//                 className="w-full flex items-center justify-center gap-2 py-4 rounded-xl mt-1 min-h-[52px] bg-[#0055A5] active:bg-[#1A70D4] disabled:opacity-55 disabled:cursor-not-allowed text-white font-extrabold text-[13.5px] tracking-[0.08em] shadow-[0_6px_24px_rgba(0,85,165,0.38)] transition-colors duration-150 group"
//               >
//                 {loading ? <Loader2 size={18} className="animate-spin" /> : (<>SUBMIT ENQUIRY <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-150" /></>)}
//               </button>

//               <p className="text-[10.5px] text-white/18 text-center leading-relaxed pt-0.5">
//                 *T&C apply. Subject to eligibility. Our team will contact you within 24 hours.
//               </p>
//             </form>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ── QUICK OFFER MODAL ──────────────────────────────────────────────── */
// function QuickOfferModal({ open, onClose, defaultCar }: { open: boolean; onClose: () => void; defaultCar?: string }) {
//   const [form, setForm] = useState({ name: "", mobile: "", car: defaultCar ?? "" });
//   const [submitted, setSubmitted] = useState(false);
//   const [loading,   setLoading]   = useState(false);
//   const [error,     setError]     = useState("");
//   const nameRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (open) {
//       trackQuickModalOpen();
//       setSubmitted(false); setError("");
//       setForm(p => ({ ...p, car: defaultCar ?? p.car }));
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
//     if (!form.name.trim())                          { setError("Please enter your name."); return; }
//     if (form.mobile.replace(/\D/g, "").length < 10)  { setError("Please enter a valid 10-digit mobile number."); return; }
//     if (!form.car)                                   { setError("Please select a car."); return; }

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
//           initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
//         >
//           <motion.div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />

//           <motion.div
//             role="dialog" aria-modal="true" aria-labelledby="quick-offer-title"
//             initial={{ opacity: 0, y: 40, scale: 0.98 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 40, scale: 0.98 }}
//             transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
//             className="relative z-10 w-full sm:max-w-[420px] bg-[#132035] border border-white/[0.10] rounded-t-3xl sm:rounded-3xl p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:p-7 shadow-[0_30px_80px_rgba(0,0,0,0.65)] max-h-[92vh] overflow-y-auto"
//           >
//             <button type="button" onClick={onClose} aria-label="Close" className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.10] text-white/45 active:text-white active:bg-white/[0.10] transition-colors">
//               <X size={16} />
//             </button>

//             {submitted ? (
//               <div className="py-6 text-center">
//                 <div className="w-12 h-12 rounded-full bg-[#0055A5]/18 border border-[#0055A5]/35 flex items-center justify-center mx-auto mb-4">
//                   <CheckCircle2 size={24} className="text-[#7DB8F7]" />
//                 </div>
//                 <h3 className="text-white font-extrabold text-[1.3rem] tracking-tight mb-2">Enquiry Received!</h3>
//                 <p className="text-white/42 text-[13.5px] leading-relaxed mb-6">Our team will get in touch with you shortly.</p>
//                 <button type="button" onClick={onClose} className="w-full py-3.5 min-h-[48px] rounded-xl bg-[#0055A5] active:bg-[#1A70D4] text-white font-bold text-[12.5px] tracking-[0.06em] transition-colors">DONE</button>
//               </div>
//             ) : (
//               <>
//                 <h3 id="quick-offer-title" className="text-white font-extrabold text-[1.35rem] tracking-tight mb-5 pr-8">Get Your Offer</h3>
//                 <form onSubmit={handleSubmit} noValidate className="space-y-4">
//                   <div>
//                     <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">Name</label>
//                     <input ref={nameRef} type="text" required autoComplete="name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" className={fieldClass} />
//                   </div>
//                   <div>
//                     <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">Mobile</label>
//                     <input type="tel" required inputMode="numeric" autoComplete="tel" maxLength={15} value={form.mobile} onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))} placeholder="+91 00000 00000" className={fieldClass} />
//                   </div>
//                   <CustomSelect label="Car of Interest" value={form.car} onChange={v => setForm(p => ({ ...p, car: v }))} options={CARS} placeholder="Choose a model" />

//                   {error && <p role="alert" className="text-red-400 text-[12.5px] leading-snug">{error}</p>}

//                   <button
//                     type="submit" disabled={loading}
//                     className="w-full flex items-center justify-center gap-2 py-3.5 min-h-[50px] rounded-xl bg-[#0055A5] active:bg-[#1A70D4] disabled:opacity-55 disabled:cursor-not-allowed text-white font-extrabold text-[13px] tracking-[0.07em] shadow-[0_6px_22px_rgba(0,85,165,0.38)] transition-colors duration-150"
//                   >
//                     {loading ? <Loader2 size={17} className="animate-spin" /> : (<>GET MY OFFER <ArrowRight size={15} /></>)}
//                   </button>
//                   <p className="text-[10px] text-white/18 text-center leading-relaxed">*T&C apply. Our team will contact you within 24 hrs.</p>
//                 </form>
//               </>
//             )}
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }

// /* ── MAIN EXPORT ────────────────────────────────────────────────────── */
// export default function CurrentTataOffers() {
//   const [filter,          setFilter]          = useState<FilterKey>("ALL");
//   const [preselectedCar,  setPreselectedCar]  = useState<string | undefined>();
//   const [preselectedType, setPreselectedType] = useState<EnquiryType | undefined>();
//   const [quickModalOpen,  setQuickModalOpen]  = useState(false);

//   const active   = useMemo(() => OFFERS.filter(o => o.active), []);
//   const filtered = useMemo(() => active.filter(o => matchesFilter(o, filter)), [active, filter]);
//   const featured = useMemo(
//     () => filtered.find(o => o.featured) ?? (filter === "ALL" ? active.find(o => o.featured) : undefined),
//     [filtered, active, filter]
//   );
//   const standard = useMemo(() => filtered.filter(o => o.id !== featured?.id), [filtered, featured]);

//   const scrollToEnquiry = useCallback(() => {
//     document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
//   }, []);

//   const handleGetOffer  = useCallback((offer: TataOffer) => { setPreselectedCar(offer.model); setPreselectedType("Get Offer");  setTimeout(scrollToEnquiry, 60); }, [scrollToEnquiry]);
//   const handleTestDrive = useCallback((offer: TataOffer) => { setPreselectedCar(offer.model); setPreselectedType("Test Drive"); setTimeout(scrollToEnquiry, 60); }, [scrollToEnquiry]);
//   const openQuickModal  = useCallback(() => setQuickModalOpen(true),  []);
//   const closeQuickModal = useCallback(() => setQuickModalOpen(false), []);

//   /* ── Listen for cross-component prefill events from VehicleShowcase ── */
//   useEffect(() => {
//     function onPrefill(e: Event) {
//       const { car, type } = (e as CustomEvent<{ car: string; type: EnquiryType }>).detail;
//       setPreselectedCar(car);
//       setPreselectedType(type);
//       // Scroll is handled by VehicleShowcase after dispatch, but we ensure
//       // state is set first so the form is already populated when it arrives.
//     }
//     window.addEventListener("garud:prefill", onPrefill);
//     return () => window.removeEventListener("garud:prefill", onPrefill);
//   }, []);

//   return (
//     <>
//       {/* ── OFFERS SECTION ──────────────────────────────────────── */}
//       <section id="offers" className="relative bg-[#0D1829] pt-16 pb-24 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
//         <Background />

//         <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-12">

//           <div className="text-center mb-5">
//             <span className="text-[10px] font-bold tracking-[0.28em] text-[#7DB8F7] uppercase mb-3 block">GARUD TATA · CURRENT OFFERS</span>
//             <h2 className="text-white font-extrabold text-[clamp(1.9rem,7vw,3.4rem)] tracking-[-0.02em] leading-[1.04] mb-4">Exclusive Tata Offers</h2>
//             <p className="text-white/45 text-[13.5px] sm:text-[14.5px] max-w-lg mx-auto leading-relaxed mb-2">
//               Explore verified MY25 and MY24 consumer benefits available at Garud Tata.
//             </p>
//             <p className="text-white/28 text-[11.5px] sm:text-[12px] mb-2">Exchange + Scrappage + Loyalty benefits can be combined on eligible models.</p>
//             <p className="text-white/20 text-[11px]">Offers Last Updated: {LAST_UPDATED}</p>
//           </div>

//           <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 sm:mb-12 mt-7">
//             {["Verified Offers", "MY25 & MY24 Models", "Exchange Benefits", "Test Drive Available"].map(t => (
//               <span key={t} className="flex items-center gap-1.5 text-[11px] sm:text-[11.5px] text-white/38 font-medium">
//                 <CheckCircle2 size={12} className="text-[#0055A5]" />{t}
//               </span>
//             ))}
//           </div>

//           <div className="mb-8 sm:mb-10">
//             <FilterBar active={filter} onChange={setFilter} />
//           </div>

//           {featured && <FeaturedCard offer={featured} onGetOffer={handleGetOffer} onTestDrive={handleTestDrive} />}

//           <div className="hidden lg:block">
//             <div className="flex items-center justify-between mb-3">
//               <p className="text-[10px] font-bold tracking-[0.2em] text-white/28 uppercase">{standard.length} offer{standard.length !== 1 ? "s" : ""} available</p>
//               <p className="text-[10px] text-white/18">MY25 / MY24 · All India · All amounts in INR</p>
//             </div>

//             <div className="bg-[#102030] border border-white/[0.07] rounded-2xl overflow-hidden">
//               <div className="grid px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]" style={{ gridTemplateColumns: "minmax(190px,1fr) 1fr minmax(130px,auto) auto" }}>
//                 {["Model", "Benefit Breakdown", "Total Benefits", ""].map((h, i) => (
//                   <p key={i} className={`text-[9.5px] font-bold tracking-[0.2em] text-white/25 uppercase ${i >= 2 ? "text-right" : ""} ${i === 0 ? "pl-3" : ""}`}>{h}</p>
//                 ))}
//               </div>

//               <AnimatePresence mode="popLayout">
//                 {standard.length === 0 && (
//                   <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-white/28 py-12 text-[13px]">
//                     No offers found for this filter.
//                   </motion.p>
//                 )}
//                 {standard.map((offer, i) => (
//                   <OfferTableRow key={offer.id} offer={offer} index={i} onGetOffer={handleGetOffer} onTestDrive={handleTestDrive} />
//                 ))}
//               </AnimatePresence>
//             </div>
//           </div>

//           <div className="lg:hidden">
//             <AnimatePresence mode="popLayout">
//               {(featured ? [featured, ...standard] : standard).map((offer, i) => (
//                 <MobileOfferCard key={offer.id} offer={offer} index={i} onGetOffer={handleGetOffer} onTestDrive={handleTestDrive} />
//               ))}
//             </AnimatePresence>
//           </div>

//           <div className="mt-12 sm:mt-14 text-center bg-[#132035] border border-white/[0.07] rounded-2xl px-5 sm:px-6 py-9 sm:py-10 lg:py-12">
//             <h4 className="text-white font-bold text-[1.2rem] sm:text-[1.35rem] tracking-tight mb-2">Want to know which offer applies to you?</h4>
//             <p className="text-white/38 text-[13px] sm:text-[13.5px] mb-6 max-w-sm mx-auto leading-relaxed">Our Garud Tata team can help you confirm the applicable benefits for your model and variant.</p>
//             <button
//               onClick={openQuickModal}
//               className="inline-flex items-center gap-2.5 px-8 py-3.5 min-h-[48px] rounded-full bg-[#0055A5] active:bg-[#1A70D4] text-white font-bold text-[12.5px] tracking-[0.07em] shadow-[0_5px_22px_rgba(0,85,165,0.40)] transition-colors duration-150 group"
//             >
//               GET MY OFFER
//               <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-150" />
//             </button>
//           </div>

//           <p className="text-[10.5px] text-white/18 mt-10 max-w-3xl mx-auto text-center leading-relaxed">
//             *Offers are subject to applicable model, variant, MY, customer and campaign eligibility. Exchange, scrappage and loyalty benefits may be combined only where applicable. Benefits and terms may change. Please confirm the applicable offer with Garud Tata at the time of enquiry. All India · All amounts in INR · MY25/MY24 Consumer Offer.
//           </p>
//         </div>
//       </section>

//       {/* ── ENQUIRY SECTION ─────────────────────────────────────── */}
//       <EnquiryForm preselectedCar={preselectedCar} preselectedType={preselectedType} />

//       {/* ── QUICK MODAL ──────────────────────────────────────────── */}
//       <QuickOfferModal open={quickModalOpen} onClose={closeQuickModal} />

//       {/* ── MOBILE STICKY CTA ────────────────────────────────────── */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-gradient-to-t from-[#0D1829] via-[#0D1829]/95 to-transparent">
//         <button
//           onClick={openQuickModal}
//           className="w-full flex items-center justify-center gap-2 py-3.5 min-h-[52px] rounded-full bg-[#0055A5] active:bg-[#1A70D4] text-white font-bold text-[13px] tracking-[0.06em] shadow-[0_8px_28px_rgba(0,85,165,0.48)] transition-colors duration-150"
//         >
//           GET MY OFFER
//           <ArrowRight size={15} />
//         </button>
//       </div>
//     </>
//   );
// }


















"use client";

// ─────────────────────────────────────────────────────────────────────────────
// components/Offers.tsx
// Offer list page. Card/button clicks navigate to /offers/[slug].
// Data is imported from lib/tata-offers — do NOT duplicate here.
// ─────────────────────────────────────────────────────────────────────────────

import {
  useState, useRef, useEffect, useMemo, useCallback, memo,
  type FormEvent, type ReactNode,
} from "react";
import {
  motion, AnimatePresence, useInView, useMotionValue,
  useSpring, useReducedMotion,
} from "framer-motion";
import {
  ArrowRight, Tag, RefreshCcw, Trash2, Heart, Zap, Loader2,
  CheckCircle2, Info, Car, Fuel, ChevronRight, ChevronDown, X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

// ── Import everything from the shared data file ───────────────────────────────
import {
  OFFERS, CARS, SHOWROOMS, ENQUIRY_TYPES, LAST_UPDATED, formatINR, BENEFIT_ROWS,
  type TataOffer, type EnquiryType,
} from "@/lib/tata-offers";

/* ── ANALYTICS ──────────────────────────────────────────────────────── */
declare global { interface Window { fbq?: (...args: unknown[]) => void; } }
function track(event: string, params?: Record<string, string | number>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") window.fbq("track", event, params);
}
const trackViewOffer      = (id: string)                => track("ViewContent", { content_name: id });
const trackGetOfferClick  = (id: string, model: string) => track("Lead", { content_name: model, offer_id: id, source: "GetOfferClick" });
const trackTestDriveClick = (model: string)             => track("Lead", { content_name: model, source: "TestDriveClick" });
const trackQuickModalOpen = ()                          => track("Lead", { source: "QuickOfferModalOpen" });

/* ── HELPERS ────────────────────────────────────────────────────────── */
const BENEFIT_ROW_ICONS = {
  consumerOffer:    Tag,
  exchangeBenefit:  RefreshCcw,
  scrappageBenefit: Trash2,
  loyaltyBenefit:   Heart,
} as const;

const FILTERS = ["ALL", "SUV", "Hatchback", "EV", "MY25", "MY24"] as const;
type FilterKey = (typeof FILTERS)[number];

function matchesFilter(o: TataOffer, f: FilterKey) {
  if (f === "ALL") return true;
  if (f === "MY25" || f === "MY24") return o.modelYear === f;
  return o.category === f;
}

async function submitEnquiry(payload: { name: string; mobile: string; car: string; source: string }) {
  const res = await fetch("/api/enquiry", {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error ?? "Submission failed. Please try again.");
  return data as { success: true; id: string; message: string };
}

/* ── ANIMATED NUMBER ────────────────────────────────────────────────── */
function AnimatedAmount({ value, active, className }: { value: number; active: boolean; className?: string }) {
  const prefersReduced = useReducedMotion();
  const mv     = useMotionValue(0);
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

/* ── COMBINABILITY TOOLTIP ──────────────────────────────────────────── */
function CombineNote({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-flex">
      <button
        type="button" onClick={() => setOpen(o => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        aria-expanded={open} aria-label="Benefit combination details"
        className={`flex items-center gap-1.5 rounded-full border border-[#0055A5]/30 bg-[#0055A5]/12 text-[#7DB8F7] hover:bg-[#0055A5]/20 transition-colors duration-150 ${compact ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-[11px]"}`}
      >
        <Info size={compact ? 10 : 11} strokeWidth={2.2} />
        {compact ? "Combinable" : "+ Exchange + Scrappage + Loyalty"}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div role="tooltip" initial={{ opacity: 0, y: 4, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 4, scale: 0.97 }} transition={{ duration: 0.13 }}
            className="absolute z-40 top-full left-0 mt-2 w-64 bg-[#132035] border border-white/[0.12] rounded-xl p-3.5 text-[11px] leading-relaxed text-white/55 shadow-[0_16px_40px_rgba(0,0,0,0.55)]">
            Benefits are subject to model, variant, customer and campaign eligibility. Please confirm the applicable offer with Garud Tata.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── CUSTOM DROPDOWN ────────────────────────────────────────────────── */
function CustomSelect({ label, value, onChange, options, placeholder, fieldRef }: {
  label: string; value: string; onChange: (v: string) => void;
  options: readonly string[]; placeholder: string; fieldRef?: React.Ref<HTMLButtonElement>;
}) {
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId  = useRef(`listbox-${label.replace(/\s+/g, "-").toLowerCase()}`);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  useEffect(() => { if (open) setHighlighted(Math.max(0, options.indexOf(value))); }, [open, value, options]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) { e.preventDefault(); setOpen(true); return; }
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted(i => Math.min(i + 1, options.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHighlighted(i => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); onChange(options[highlighted]); setOpen(false); }
    else if (e.key === "Escape") { e.preventDefault(); setOpen(false); }
    else if (e.key === "Tab") { setOpen(false); }
  };

  return (
    <div ref={wrapRef} className="relative">
      <label className="block text-[10px] text-white/35 mb-1.5 tracking-[0.18em] uppercase font-bold">{label}</label>
      <button ref={fieldRef} type="button" onClick={() => setOpen(o => !o)} onKeyDown={handleKeyDown}
        aria-haspopup="listbox" aria-expanded={open} aria-controls={listId.current}
        className="w-full flex items-center justify-between gap-2 bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3.5 min-h-[52px] text-left text-[16px] sm:text-[13.5px] focus:outline-none focus:border-[#0055A5]/65 focus:bg-[#0055A5]/[0.08] transition-colors duration-200">
        <span className={`truncate ${value ? "text-white" : "text-white/25"}`}>{value || placeholder}</span>
        <ChevronDown size={16} strokeWidth={2.4} className={`flex-shrink-0 text-white/35 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul id={listId.current} role="listbox" tabIndex={-1}
            initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 mt-2 w-full max-h-64 overflow-y-auto rounded-xl border border-white/[0.12] bg-[#132035] shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-1.5">
            {options.map((opt, i) => (
              <li key={opt} role="option" aria-selected={value === opt}
                onMouseEnter={() => setHighlighted(i)} onClick={() => { onChange(opt); setOpen(false); }}
                className={`flex items-center justify-between gap-2 px-3.5 py-3 sm:py-2.5 rounded-lg cursor-pointer select-none text-[15px] sm:text-[13.5px] transition-colors duration-100 ${i === highlighted ? "bg-[#0055A5]/20" : ""} ${value === opt ? "text-[#7DB8F7] font-semibold" : "text-white/70"}`}>
                {opt}
                {value === opt && <CheckCircle2 size={14} className="text-[#5BA3E8] flex-shrink-0" />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── FILTER BAR ─────────────────────────────────────────────────────── */
function FilterBar({ active, onChange }: { active: FilterKey; onChange: (f: FilterKey) => void }) {
  const icons: Partial<Record<FilterKey, ReactNode>> = {
    EV: <Zap size={11} />, SUV: <Car size={11} />, Hatchback: <Fuel size={11} />,
  };
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-5 px-5 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {FILTERS.map(f => (
        <button key={f} onClick={() => onChange(f)} aria-pressed={active === f}
          className="relative flex-shrink-0 px-5 py-2.5 rounded-full text-[12.5px] font-semibold whitespace-nowrap transition-colors duration-200 min-h-[40px]">
          {active === f && (
            <motion.span layoutId="filter-pill" transition={{ type: "spring", stiffness: 380, damping: 32 }}
              className="absolute inset-0 rounded-full bg-[#0055A5] shadow-[0_4px_18px_rgba(0,85,165,0.45)]" />
          )}
          <span className={`relative z-10 flex items-center gap-1.5 ${active === f ? "text-white" : "text-white/45 hover:text-white/80"}`}>
            {icons[f]}{f}
          </span>
          {active !== f && <span className="absolute inset-0 rounded-full border border-white/[0.09] bg-white/[0.03]" />}
        </button>
      ))}
    </div>
  );
}

/* ── BADGES ─────────────────────────────────────────────────────────── */
function ModelBadges({ offer }: { offer: TataOffer }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className={`px-2 py-0.5 rounded text-[9px] font-black tracking-[0.14em] uppercase ${offer.modelYear === "MY25" ? "bg-[#0055A5]/25 text-[#7DB8F7] border border-[#0055A5]/35" : "bg-white/[0.07] text-white/50 border border-white/[0.12]"}`}>
        {offer.modelYear}
      </span>
      {offer.category === "EV" && (
        <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-black tracking-[0.14em] uppercase bg-emerald-500/12 text-emerald-300 border border-emerald-400/25">
          <Zap size={9} strokeWidth={2.5} /> EV
        </span>
      )}
      {offer.eligibility && (
        <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-[0.14em] uppercase bg-amber-500/10 text-amber-300 border border-amber-400/22">
          LIMITED
        </span>
      )}
    </div>
  );
}

/* ── FEATURED CARD ──────────────────────────────────────────────────── */
const FeaturedCard = memo(function FeaturedCard({
  offer, onGetOffer, onTestDrive,
}: { offer: TataOffer; onGetOffer: (o: TataOffer) => void; onTestDrive: (o: TataOffer) => void }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReduced = useReducedMotion();

  useEffect(() => { if (inView) trackViewOffer(offer.id); }, [inView, offer.id]);

  const activeBenefitRows = BENEFIT_ROWS.filter(r => typeof offer[r.key] === "number" && (offer[r.key] as number) > 0);

  return (
    <motion.div ref={ref}
      initial={prefersReduced ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-3xl mb-8 bg-gradient-to-br from-[#142238] via-[#0F1C30] to-[#0C1624] border border-white/[0.09]"
    >
      <div className="hidden sm:block absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#0055A5]/12 blur-[120px] pointer-events-none" />
      <div className="hidden sm:block absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#1A70D4]/7 blur-[90px] pointer-events-none" />

      <div className="relative z-10 p-5 sm:p-7 lg:p-10">
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0055A5]/22 border border-[#0055A5]/45 text-[#7DB8F7] text-[10px] font-bold tracking-[0.22em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8] animate-pulse" />FEATURED OFFER
          </span>
          <ModelBadges offer={offer} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-start">
          <div>
            <h3 className="text-white font-extrabold text-[1.9rem] sm:text-[2.2rem] lg:text-[2.8rem] tracking-[-0.02em] leading-[1.0] mb-1">{offer.model}</h3>
            <p className="text-white/38 text-[13px] font-medium mb-6">{offer.variantLabel ?? offer.category} · {offer.modelYear}</p>

            <p className="text-[9px] font-bold tracking-[0.22em] text-[#5BA3E8]/65 uppercase mb-2">Maximum Eligible Benefits</p>
            <AnimatedAmount value={offer.totalBenefit} active={inView} className="block text-white font-extrabold text-[2.6rem] sm:text-[3.4rem] lg:text-[4.2rem] tracking-[-0.03em] leading-none mb-2" />
            <p className="text-white/25 text-[11px] mb-6">Up to, on eligible variants*</p>

            <div className="flex flex-wrap gap-3 mb-6">
              {/* Navigate to detail page */}
              <button
                onClick={() => { trackGetOfferClick(offer.id, offer.model); onGetOffer(offer); }}
                className="group/btn flex items-center gap-2.5 px-7 py-3.5 rounded-full min-h-[48px] bg-[#0055A5] hover:bg-[#1A70D4] text-white font-bold text-[12.5px] tracking-[0.07em] shadow-[0_6px_28px_rgba(0,85,165,0.45)] hover:-translate-y-0.5 transition-all duration-200"
              >
                GET {offer.model.replace("Tata ", "").toUpperCase()} OFFER
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform duration-150" />
              </button>
              <button
                onClick={() => { trackTestDriveClick(offer.model); onTestDrive(offer); }}
                className="px-7 py-3.5 rounded-full min-h-[48px] bg-white/[0.06] border border-white/[0.15] hover:border-white/30 hover:bg-white/[0.10] text-white font-medium text-[12.5px] tracking-[0.05em] transition-all duration-200"
              >
                TEST DRIVE
              </button>
            </div>
          </div>

          <div className="lg:min-w-[240px] bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
            <p className="text-[9px] font-bold tracking-[0.18em] text-white/30 uppercase mb-4">Benefit Breakdown</p>
            <div className="space-y-3">
              {activeBenefitRows.map(({ key, label }) => {
                const Icon = BENEFIT_ROW_ICONS[key];
                return (
                  <div key={key} className="flex items-center justify-between gap-6">
                    <span className="flex items-center gap-2 text-white/42 text-[12.5px]">
                      <Icon size={13} className="text-[#0055A5]/75 flex-shrink-0" strokeWidth={2} />{label}
                    </span>
                    <span className="text-white/80 text-[13px] font-bold tabular-nums whitespace-nowrap">{formatINR(offer[key] as number)}</span>
                  </div>
                );
              })}
            </div>
            {activeBenefitRows.length >= 2 && (
              <div className="mt-4 pt-3 border-t border-white/[0.07]"><CombineNote /></div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

/* ── DESKTOP TABLE ROW ──────────────────────────────────────────────── */
const OfferTableRow = memo(function OfferTableRow({
  offer, index, onGetOffer, onTestDrive,
}: { offer: TataOffer; index: number; onGetOffer: (o: TataOffer) => void; onTestDrive: (o: TataOffer) => void }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();

  useEffect(() => { if (inView) trackViewOffer(offer.id); }, [inView, offer.id]);

  const activeBenefitRows = BENEFIT_ROWS.filter(r => typeof offer[r.key] === "number" && (offer[r.key] as number) > 0);

  return (
    <Link href={`/offers/${offer.id}`} className="group block">
      <motion.div ref={ref}
        initial={prefersReduced ? false : { opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.05, 0.3) }}
        className="relative grid items-center gap-5 px-5 py-4 border-b border-white/[0.05] last:border-0 hover:bg-white/[0.03] transition-colors duration-200"
        style={{ gridTemplateColumns: "minmax(190px,1fr) 1fr minmax(130px,auto) auto" }}
        onClick={e => {
          // Allow test drive button click without navigating via Link
        }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#0055A5] opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-full" />

        <div className="min-w-0 pl-3">
          <ModelBadges offer={offer} />
          <p className="text-white/90 font-bold text-[14.5px] tracking-tight mt-1.5 group-hover:translate-x-0.5 transition-transform duration-200 truncate">{offer.model}</p>
          <p className="text-white/32 text-[11px] font-medium truncate">{offer.variantLabel ?? offer.category}</p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2">
          {activeBenefitRows.length === 0 ? (
            <span className="text-white/25 text-[11px] italic">Available on enquiry</span>
          ) : activeBenefitRows.map(({ key, short }) => {
            const Icon = BENEFIT_ROW_ICONS[key];
            return (
              <div key={key} className="flex flex-col gap-0.5 min-w-[68px]">
                <span className="flex items-center gap-1 text-[10px] text-white/32 font-medium">
                  <Icon size={10} strokeWidth={2} className="text-[#0055A5]/65 flex-shrink-0" />{short}
                </span>
                <span className="text-white/70 text-[12.5px] font-bold tabular-nums">{formatINR(offer[key] as number)}</span>
              </div>
            );
          })}
        </div>

        <div className="text-right">
          <p className="text-[8.5px] font-bold tracking-[0.18em] text-white/28 uppercase mb-0.5">Total</p>
          <AnimatedAmount value={offer.totalBenefit} active={inView} className="block text-white/90 font-extrabold text-[1.3rem] tracking-tight leading-none group-hover:text-[#7DB8F7] transition-colors duration-300" />
          <p className="text-white/20 text-[9.5px] mt-0.5">Up to*</p>
        </div>

        <div className="flex flex-col gap-1.5 items-end" onClick={e => e.preventDefault()}>
          <button
            onClick={e => { e.preventDefault(); trackGetOfferClick(offer.id, offer.model); onGetOffer(offer); }}
            className="group/btn flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0055A5] hover:bg-[#1A70D4] text-white font-bold text-[11px] tracking-[0.07em] whitespace-nowrap shadow-[0_3px_14px_rgba(0,85,165,0.3)] transition-all duration-200"
          >
            GET OFFER <ChevronRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform duration-150" />
          </button>
          <button
            onClick={e => { e.preventDefault(); trackTestDriveClick(offer.model); onTestDrive(offer); }}
            className="px-4 py-1.5 rounded-lg border border-white/[0.10] hover:border-white/25 text-white/40 hover:text-white/80 text-[10.5px] font-semibold tracking-[0.06em] whitespace-nowrap transition-all duration-150"
          >
            TEST DRIVE
          </button>
        </div>
      </motion.div>
    </Link>
  );
});

/* ── MOBILE CARD ────────────────────────────────────────────────────── */
const MobileOfferCard = memo(function MobileOfferCard({
  offer, index, onGetOffer, onTestDrive,
}: { offer: TataOffer; index: number; onGetOffer: (o: TataOffer) => void; onTestDrive: (o: TataOffer) => void }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();

  useEffect(() => { if (inView) trackViewOffer(offer.id); }, [inView, offer.id]);

  const activeBenefitRows = BENEFIT_ROWS.filter(r => typeof offer[r.key] === "number" && (offer[r.key] as number) > 0);

  return (
    <motion.div ref={ref}
      initial={prefersReduced ? false : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: Math.min(index * 0.04, 0.24) }}
      className="bg-[#132035] border border-white/[0.08] rounded-2xl p-4 sm:p-5 mb-3 last:mb-0"
    >
      <Link href={`/offers/${offer.id}`} className="block">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="min-w-0">
            <ModelBadges offer={offer} />
            <h3 className="text-white/90 font-extrabold text-[1.02rem] tracking-tight mt-1.5 truncate">{offer.model}</h3>
            <p className="text-white/35 text-[11px] mt-0.5 truncate">{offer.variantLabel ?? offer.category}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-[8.5px] font-bold tracking-[0.18em] text-white/28 uppercase mb-0.5">TOTAL</p>
            <AnimatedAmount value={offer.totalBenefit} active={inView} className="block text-white/90 font-extrabold text-[1.35rem] tracking-tight leading-none" />
            <p className="text-white/20 text-[9px] mt-0.5">Up to*</p>
          </div>
        </div>

        {activeBenefitRows.length > 0 && (
          <div className="space-y-2 border-t border-white/[0.06] pt-3 mb-4">
            {activeBenefitRows.map(({ key, label }) => {
              const Icon = BENEFIT_ROW_ICONS[key];
              return (
                <div key={key} className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-white/38 text-[11.5px]">
                    <Icon size={11} className="text-[#0055A5]/65 flex-shrink-0" strokeWidth={2} />{label}
                  </span>
                  <span className="text-white/65 text-[12px] font-semibold tabular-nums">{formatINR(offer[key] as number)}</span>
                </div>
              );
            })}
          </div>
        )}
      </Link>

      <div className="flex gap-2">
        <button
          onClick={() => { trackGetOfferClick(offer.id, offer.model); onGetOffer(offer); }}
          className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-lg min-h-[44px] bg-[#0055A5] active:bg-[#1A70D4] text-white font-bold text-[12px] tracking-[0.06em] transition-colors duration-150"
        >
          GET OFFER <ArrowRight size={12} />
        </button>
        <button
          onClick={() => { trackTestDriveClick(offer.model); onTestDrive(offer); }}
          className="px-4 py-3 rounded-lg min-h-[44px] border border-white/[0.10] active:border-white/25 text-white/45 active:text-white text-[11px] font-semibold tracking-[0.06em] transition-colors duration-150"
        >
          TEST DRIVE
        </button>
      </div>
    </motion.div>
  );
});

/* ── BACKGROUND ─────────────────────────────────────────────────────── */
function Background() {
  const prefersReduced = useReducedMotion();
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
      <motion.div className="hidden sm:block absolute top-[8%] left-[10%] w-[700px] h-[700px] rounded-full bg-[#0055A5]/7 blur-[160px]"
        animate={prefersReduced ? undefined : { x: [0, 50, -20, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="hidden sm:block absolute bottom-[5%] right-[5%] w-[500px] h-[500px] rounded-full bg-[#1A70D4]/5 blur-[130px]"
        animate={prefersReduced ? undefined : { x: [0, -35, 15, 0], y: [0, 25, -35, 0] }}
        transition={{ duration: 60, repeat: Infinity, ease: "easeInOut" }} />
    </div>
  );
}

/* ── QUICK MODAL FORM ────────────────────────────────────────────────── */
const fieldClass = "w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3.5 min-h-[52px] text-white text-[16px] sm:text-[13.5px] placeholder:text-white/25 focus:outline-none focus:border-[#0055A5]/65 focus:bg-[#0055A5]/[0.07] transition-colors duration-200";

function QuickOfferModal({ open, onClose, defaultCar }: { open: boolean; onClose: () => void; defaultCar?: string }) {
  const [form, setForm] = useState({ name: "", mobile: "", car: defaultCar ?? "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      trackQuickModalOpen();
      setSubmitted(false); setError("");
      setForm(p => ({ ...p, car: defaultCar ?? p.car }));
      setTimeout(() => nameRef.current?.focus(), 250);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prevOverflow; };
    }
  }, [open, defaultCar]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    if (!form.name.trim())                         { setError("Please enter your name."); return; }
    if (form.mobile.replace(/\D/g, "").length < 10) { setError("Please enter a valid 10-digit mobile number."); return; }
    if (!form.car)                                  { setError("Please select a car."); return; }

    setLoading(true);
    try {
      await submitEnquiry({ name: form.name, mobile: form.mobile, car: form.car, source: "quick-offer-modal" });
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [form, loading]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>
          <motion.div className="absolute inset-0 bg-black/65 backdrop-blur-sm" onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
          <motion.div role="dialog" aria-modal="true" aria-labelledby="quick-offer-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full sm:max-w-[420px] bg-[#132035] border border-white/[0.10] rounded-t-3xl sm:rounded-3xl p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] sm:p-7 shadow-[0_30px_80px_rgba(0,0,0,0.65)] max-h-[92vh] overflow-y-auto">
            <button type="button" onClick={onClose} aria-label="Close"
              className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.10] text-white/45 active:text-white transition-colors">
              <X size={16} />
            </button>
            {submitted ? (
              <div className="py-6 text-center">
                <div className="w-12 h-12 rounded-full bg-[#0055A5]/18 border border-[#0055A5]/35 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={24} className="text-[#7DB8F7]" />
                </div>
                <h3 className="text-white font-extrabold text-[1.3rem] tracking-tight mb-2">Enquiry Received!</h3>
                <p className="text-white/42 text-[13.5px] leading-relaxed mb-6">Our team will get in touch shortly.</p>
                <button type="button" onClick={onClose} className="w-full py-3.5 min-h-[48px] rounded-xl bg-[#0055A5] text-white font-bold text-[12.5px] tracking-[0.06em]">DONE</button>
              </div>
            ) : (
              <>
                <h3 id="quick-offer-title" className="text-white font-extrabold text-[1.35rem] tracking-tight mb-5 pr-8">Get Your Offer</h3>
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">Name</label>
                    <input ref={nameRef} type="text" required autoComplete="name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" className={fieldClass} />
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">Mobile</label>
                    <input type="tel" required inputMode="numeric" autoComplete="tel" maxLength={15} value={form.mobile} onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))} placeholder="+91 00000 00000" className={fieldClass} />
                  </div>
                  <CustomSelect label="Car of Interest" value={form.car} onChange={v => setForm(p => ({ ...p, car: v }))} options={CARS} placeholder="Choose a model" />
                  {error && <p role="alert" className="text-red-400 text-[12.5px]">{error}</p>}
                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3.5 min-h-[50px] rounded-xl bg-[#0055A5] disabled:opacity-55 text-white font-extrabold text-[13px] tracking-[0.07em] shadow-[0_6px_22px_rgba(0,85,165,0.38)]">
                    {loading ? <Loader2 size={17} className="animate-spin" /> : (<>GET MY OFFER <ArrowRight size={15} /></>)}
                  </button>
                  <p className="text-[10px] text-white/18 text-center">*T&C apply. Our team will contact you within 24 hrs.</p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── ENQUIRY FORM (in-page, for cross-component prefill) ────────────── */
interface EnquiryFormProps { preselectedCar?: string; preselectedType?: EnquiryType; }
function EnquiryForm({ preselectedCar, preselectedType }: EnquiryFormProps) {
  const [form, setForm] = useState({ name: "", mobile: "", car: preselectedCar ?? "", type: preselectedType ?? ("Get Offer" as EnquiryType), showroom: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setForm(prev => ({ ...prev, car: preselectedCar ?? prev.car, type: preselectedType ?? prev.type })); }, [preselectedCar, preselectedType]);
  useEffect(() => { if (preselectedCar || preselectedType) setTimeout(() => nameRef.current?.focus(), 400); }, [preselectedCar, preselectedType]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    if (!form.name.trim())                         { setError("Please enter your name."); return; }
    if (form.mobile.replace(/\D/g, "").length < 10) { setError("Please enter a valid 10-digit mobile number."); return; }
    if (!form.car)                                  { setError("Please select a car."); return; }
    if (!form.showroom)                             { setError("Please select a showroom."); return; }
    setLoading(true);
    try {
      await submitEnquiry({ name: form.name, mobile: form.mobile, car: form.car, source: `garud-tata-offers | type=${form.type} | showroom=${form.showroom}` });
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [form, loading]);

  return (
    <section id="enquiry" className="bg-[#0D1829] py-16 sm:py-20 lg:py-28 px-5 lg:px-12 scroll-mt-0">
      <div className="max-w-[600px] mx-auto">
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-[10px] font-bold tracking-[0.26em] text-[#7DB8F7] uppercase mb-3 block">GARUD TATA · ENQUIRY</span>
          <h2 className="text-white font-extrabold text-[clamp(1.7rem,6vw,2.8rem)] tracking-tight leading-[1.05] mb-3">Let's Get You<br />Behind the Wheel</h2>
          <p className="text-white/42 text-[13.5px] sm:text-[14px] max-w-md mx-auto leading-relaxed">Tell us what you're interested in and the Garud Tata team will get in touch.</p>
        </div>
        <div className="bg-[#132035] border border-white/[0.08] rounded-3xl p-5 sm:p-6 lg:p-8">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="py-8 sm:py-10 text-center">
              <div className="w-14 h-14 rounded-full bg-[#0055A5]/18 border border-[#0055A5]/35 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={28} className="text-[#7DB8F7]" />
              </div>
              <h3 className="text-white font-extrabold text-[1.4rem] sm:text-[1.5rem] tracking-tight mb-2">Enquiry Received!</h3>
              <p className="text-white/42 text-[13.5px] sm:text-[14px] leading-relaxed mb-8 max-w-xs mx-auto">Our Garud Tata team will be in touch shortly.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="tel:+919217371204" className="flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full bg-[#0055A5] text-white font-bold text-[12.5px] tracking-[0.06em]">CALL NOW</a>
                <a href="https://wa.me/919217371204" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full bg-white/[0.06] border border-white/[0.15] text-white font-medium text-[12.5px] tracking-[0.04em]">WHATSAPP US</a>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {(preselectedCar || preselectedType) && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 bg-[#0055A5]/10 border border-[#0055A5]/22 rounded-xl px-4 py-3">
                  <CheckCircle2 size={15} className="text-[#7DB8F7] flex-shrink-0" />
                  <div className="min-w-0 text-[12px]">
                    <span className="text-white font-semibold">{preselectedCar}</span>
                    {preselectedType && <span className="text-white/42"> · {preselectedType}</span>}
                    <span className="text-white/30"> — pre-filled</span>
                  </div>
                </motion.div>
              )}
              <div>
                <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">Name</label>
                <input ref={nameRef} type="text" required autoComplete="name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" className={fieldClass} />
              </div>
              <div>
                <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">Mobile Number</label>
                <input type="tel" required inputMode="numeric" autoComplete="tel" maxLength={15} value={form.mobile} onChange={e => setForm(p => ({ ...p, mobile: e.target.value }))} placeholder="+91 00000 00000" className={fieldClass} />
              </div>
              <CustomSelect label="Interested Car" value={form.car} onChange={v => setForm(p => ({ ...p, car: v }))} options={CARS} placeholder="Select a model" />
              <div>
                <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">Enquiry Type</label>
                <div className="flex flex-wrap gap-2">
                  {ENQUIRY_TYPES.map(t => (
                    <button key={t} type="button" onClick={() => setForm(p => ({ ...p, type: t }))}
                      className={`px-3.5 py-2.5 rounded-lg text-[12px] font-semibold tracking-[0.04em] min-h-[40px] border transition-colors duration-150 ${form.type === t ? "bg-[#0055A5] border-[#0055A5] text-white" : "bg-white/[0.04] border-white/[0.09] text-white/45 active:text-white"}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <CustomSelect label="Preferred Showroom" value={form.showroom} onChange={v => setForm(p => ({ ...p, showroom: v }))} options={SHOWROOMS} placeholder="Select a showroom" />
              {error && <p role="alert" className="text-red-400 text-[13px]">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl mt-1 min-h-[52px] bg-[#0055A5] disabled:opacity-55 text-white font-extrabold text-[13.5px] tracking-[0.08em] shadow-[0_6px_24px_rgba(0,85,165,0.38)] group">
                {loading ? <Loader2 size={18} className="animate-spin" /> : (<>SUBMIT ENQUIRY <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-150" /></>)}
              </button>
              <p className="text-[10.5px] text-white/18 text-center leading-relaxed pt-0.5">*T&C apply. Subject to eligibility.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── MAIN EXPORT ────────────────────────────────────────────────────── */
export default function CurrentTataOffers() {
  const router = useRouter();
  const [filter,          setFilter]          = useState<FilterKey>("ALL");
  const [preselectedCar,  setPreselectedCar]  = useState<string | undefined>();
  const [preselectedType, setPreselectedType] = useState<EnquiryType | undefined>();
  const [quickModalOpen,  setQuickModalOpen]  = useState(false);

  const active   = useMemo(() => OFFERS.filter(o => o.active), []);
  const filtered = useMemo(() => active.filter(o => matchesFilter(o, filter)), [active, filter]);
  const featured = useMemo(
    () => filtered.find(o => o.featured) ?? (filter === "ALL" ? active.find(o => o.featured) : undefined),
    [filtered, active, filter]
  );
  const standard = useMemo(() => filtered.filter(o => o.id !== featured?.id), [filtered, featured]);

  const scrollToEnquiry = useCallback(() => {
    document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Navigate to detail page for Get Offer
  const handleGetOffer = useCallback((offer: TataOffer) => {
    trackGetOfferClick(offer.id, offer.model);
    router.push(`/offers/${offer.id}`);
  }, [router]);

  // Navigate to detail page with test-drive type
  const handleTestDrive = useCallback((offer: TataOffer) => {
    trackTestDriveClick(offer.model);
    router.push(`/offers/${offer.id}?type=test-drive`);
  }, [router]);

  const openQuickModal  = useCallback(() => setQuickModalOpen(true),  []);
  const closeQuickModal = useCallback(() => setQuickModalOpen(false), []);

  // Cross-component prefill event (from VehicleShowcase)
  useEffect(() => {
    function onPrefill(e: Event) {
      const { car, type } = (e as CustomEvent<{ car: string; type: EnquiryType }>).detail;
      setPreselectedCar(car);
      setPreselectedType(type);
    }
    window.addEventListener("garud:prefill", onPrefill);
    return () => window.removeEventListener("garud:prefill", onPrefill);
  }, []);

  return (
    <>
      <section id="offers" className="relative bg-[#0D1829] pt-16 pb-24 sm:pt-20 sm:pb-16 lg:pt-28 lg:pb-20 overflow-hidden">
        <Background />
        <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-12">

          <div className="text-center mb-5">
            <span className="text-[10px] font-bold tracking-[0.28em] text-[#7DB8F7] uppercase mb-3 block">GARUD TATA · CURRENT OFFERS</span>
            <h2 className="text-white font-extrabold text-[clamp(1.9rem,7vw,3.4rem)] tracking-[-0.02em] leading-[1.04] mb-4">Exclusive Tata Offers</h2>
            <p className="text-white/45 text-[13.5px] sm:text-[14.5px] max-w-lg mx-auto leading-relaxed mb-2">
              Explore verified MY25 and MY24 consumer benefits available at Garud Tata.
            </p>
            <p className="text-white/28 text-[11.5px] sm:text-[12px] mb-2">Exchange + Scrappage + Loyalty benefits can be combined on eligible models.</p>
            <p className="text-white/20 text-[11px]">Offers Last Updated: {LAST_UPDATED}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10 sm:mb-12 mt-7">
            {["Verified Offers", "MY25 & MY24 Models", "Exchange Benefits", "Test Drive Available"].map(t => (
              <span key={t} className="flex items-center gap-1.5 text-[11px] sm:text-[11.5px] text-white/38 font-medium">
                <CheckCircle2 size={12} className="text-[#0055A5]" />{t}
              </span>
            ))}
          </div>

          <div className="mb-8 sm:mb-10"><FilterBar active={filter} onChange={setFilter} /></div>

          {featured && <FeaturedCard offer={featured} onGetOffer={handleGetOffer} onTestDrive={handleTestDrive} />}

          {/* Desktop table */}
          <div className="hidden lg:block">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold tracking-[0.2em] text-white/28 uppercase">{standard.length} offer{standard.length !== 1 ? "s" : ""} available</p>
              <p className="text-[10px] text-white/18">MY25 / MY24 · All India · All amounts in INR</p>
            </div>
            <div className="bg-[#102030] border border-white/[0.07] rounded-2xl overflow-hidden">
              <div className="grid px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]" style={{ gridTemplateColumns: "minmax(190px,1fr) 1fr minmax(130px,auto) auto" }}>
                {["Model", "Benefit Breakdown", "Total Benefits", ""].map((h, i) => (
                  <p key={i} className={`text-[9.5px] font-bold tracking-[0.2em] text-white/25 uppercase ${i >= 2 ? "text-right" : ""} ${i === 0 ? "pl-3" : ""}`}>{h}</p>
                ))}
              </div>
              <AnimatePresence mode="popLayout">
                {standard.length === 0 && (
                  <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-white/28 py-12 text-[13px]">
                    No offers found for this filter.
                  </motion.p>
                )}
                {standard.map((offer, i) => (
                  <OfferTableRow key={offer.id} offer={offer} index={i} onGetOffer={handleGetOffer} onTestDrive={handleTestDrive} />
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile cards */}
          <div className="lg:hidden">
            <AnimatePresence mode="popLayout">
              {(featured ? [featured, ...standard] : standard).map((offer, i) => (
                <MobileOfferCard key={offer.id} offer={offer} index={i} onGetOffer={handleGetOffer} onTestDrive={handleTestDrive} />
              ))}
            </AnimatePresence>
          </div>

          <div className="mt-12 sm:mt-14 text-center bg-[#132035] border border-white/[0.07] rounded-2xl px-5 sm:px-6 py-9 sm:py-10 lg:py-12">
            <h4 className="text-white font-bold text-[1.2rem] sm:text-[1.35rem] tracking-tight mb-2">Want to know which offer applies to you?</h4>
            <p className="text-white/38 text-[13px] sm:text-[13.5px] mb-6 max-w-sm mx-auto leading-relaxed">Our Garud Tata team can help you confirm the applicable benefits for your model and variant.</p>
            <button onClick={openQuickModal}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 min-h-[48px] rounded-full bg-[#0055A5] text-white font-bold text-[12.5px] tracking-[0.07em] shadow-[0_5px_22px_rgba(0,85,165,0.40)] group">
              GET MY OFFER <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-150" />
            </button>
          </div>

          <p className="text-[10.5px] text-white/18 mt-10 max-w-3xl mx-auto text-center leading-relaxed">
            *Offers are subject to applicable model, variant, MY, customer and campaign eligibility. Exchange, scrappage and loyalty benefits may be combined only where applicable. Benefits and terms may change. Please confirm the applicable offer with Garud Tata at the time of enquiry. All India · All amounts in INR · MY25/MY24 Consumer Offer.
          </p>
        </div>
      </section>

      <EnquiryForm preselectedCar={preselectedCar} preselectedType={preselectedType} />

      <QuickOfferModal open={quickModalOpen} onClose={closeQuickModal} />

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-gradient-to-t from-[#0D1829] via-[#0D1829]/95 to-transparent">
        <button onClick={openQuickModal}
          className="w-full flex items-center justify-center gap-2 py-3.5 min-h-[52px] rounded-full bg-[#0055A5] text-white font-bold text-[13px] tracking-[0.06em] shadow-[0_8px_28px_rgba(0,85,165,0.48)]">
          GET MY OFFER <ArrowRight size={15} />
        </button>
      </div>
    </>
  );
}