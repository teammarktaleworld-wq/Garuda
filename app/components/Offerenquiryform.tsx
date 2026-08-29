




// // garud-tata\app\components\Offerenquiryform.tsx





// "use client";

// import {
//   useState,
//   useCallback,
//   useRef,
//   useEffect,
//   type FormEvent,
// } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   CheckCircle2,
//   ArrowRight,
//   Loader2,
//   ChevronDown,
//   MapPin,
// } from "lucide-react";
// import type { TataOffer, EnquiryType } from "@/lib/tata-offers";
// import { OFFERS, SHOWROOMS, ENQUIRY_TYPES } from "@/lib/tata-offers";

// declare global {
//   interface Window { fbq?: (...a: unknown[]) => void; }
// }
// function fbTrack(event: string, params?: Record<string, unknown>) {
//   if (typeof window !== "undefined" && typeof window.fbq === "function")
//     window.fbq("track", event, params);
// }

// // ─── Image map (mirrors Offers.tsx) ──────────────────────────────────────────
// const CAR_IMAGES: Record<string, string> = {
//   tiago:        "/Car images/Tata tiago/image1.jpg",
//   "tiago-ev":   "/Car images/Tata tiago/image1.jpg",
//   tigor:        "/Car images/Tata tigor/image1.avif",
//   altroz:       "/Car images/Tata altroz/image1.avif",
//   punch:        "/Car images/Tata punch/image1.jpg",
//   "punch-ev":   "/Car images/Tata punch/image1.jpg",
//   nexon:        "/Car images/Tata nexon/image1.avif",
//   "nexon-ev":   "/Car images/Tata nexon/image1.avif",
//   curvv:        "/Car images/Tata curv/image1.avif",
//   "curvv-ev":   "/Car images/Tata curv/image1.avif",
//   harrier:      "/Car images/Tata harrier/image1.avif",
//   "harrier-ev": "/Car images/Tata harrier/image1.avif",
//   safari:       "/Car images/Tata safari/image1.avif",
//   sierra:       "/Car images/Tata sierra/image1.avif",
// };

// function getCarImage(model: string, isEV = false) {
//   const key = isEV ? `${model.toLowerCase()}-ev` : model.toLowerCase();
//   return CAR_IMAGES[key] ?? CAR_IMAGES[model.toLowerCase()] ?? "/placeholder-car.jpg";
// }

// // All unique active model names (same order as Offers.tsx wizard)
// const ALL_CARS: string[] = (() => {
//   const seen = new Set<string>();
//   return OFFERS.filter((o) => o.active && !seen.has(o.model) && seen.add(o.model)).map((o) => o.model);
// })();

// // ─── Showroom meta ────────────────────────────────────────────────────────────
// const SHOWROOM_META: Record<string, string> = {
//   "Garud Tata Palam":     "South-West Delhi",
//   "Garud Tata Narela":    "North Delhi",
//   "Garud Tata Najafgarh": "West Delhi",
// };

// // ─── Reusable field class ─────────────────────────────────────────────────────
// const fieldCls =
//   "w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 min-h-[52px] text-slate-900 text-[16px] sm:text-[13.5px] placeholder:text-slate-400 font-medium focus:outline-none focus:border-[#0055A5] focus:bg-white transition-all duration-150";

// // ─── Accessible custom select ─────────────────────────────────────────────────
// function Select({
//   label,
//   value,
//   onChange,
//   options,
//   placeholder,
// }: {
//   label: string;
//   value: string;
//   onChange: (v: string) => void;
//   options: readonly string[];
//   placeholder: string;
// }) {
//   const [open, setOpen] = useState(false);
//   const [hi, setHi]     = useState(0);
//   const wrapRef         = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!open) return;
//     const handler = (e: MouseEvent) => {
//       if (wrapRef.current && !wrapRef.current.contains(e.target as Node))
//         setOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [open]);

//   useEffect(() => {
//     if (open) setHi(Math.max(0, options.indexOf(value)));
//   }, [open, value, options]);

//   const onKey = (e: React.KeyboardEvent) => {
//     if (!open && ["Enter", " ", "ArrowDown"].includes(e.key)) {
//       e.preventDefault(); setOpen(true); return;
//     }
//     if (!open) return;
//     if (e.key === "ArrowDown")              { e.preventDefault(); setHi(i => Math.min(i + 1, options.length - 1)); }
//     else if (e.key === "ArrowUp")           { e.preventDefault(); setHi(i => Math.max(i - 1, 0)); }
//     else if (e.key === "Enter")             { e.preventDefault(); onChange(options[hi]); setOpen(false); }
//     else if (e.key === "Escape" || e.key === "Tab") { setOpen(false); }
//   };

//   return (
//     <div ref={wrapRef} className="relative">
//       <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">
//         {label}
//       </label>
//       <button
//         type="button"
//         onClick={() => setOpen(o => !o)}
//         onKeyDown={onKey}
//         aria-haspopup="listbox"
//         aria-expanded={open}
//         className="w-full flex items-center justify-between gap-2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 min-h-[52px] text-left focus:outline-none focus:border-[#0055A5] focus:bg-white transition-all duration-150"
//       >
//         <span className={`text-[15px] sm:text-[13.5px] truncate font-medium ${value ? "text-slate-900" : "text-slate-400"}`}>
//           {value || placeholder}
//         </span>
//         <ChevronDown
//           size={16}
//           className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180 text-[#0055A5]" : ""}`}
//         />
//       </button>

//       <AnimatePresence>
//         {open && (
//           <motion.ul
//             role="listbox"
//             initial={{ opacity: 0, y: -6 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -6 }}
//             transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
//             className="absolute z-50 mt-2 w-full max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-1.5"
//             style={{ scrollbarWidth: "thin" }}
//           >
//             {options.map((opt, i) => (
//               <li
//                 key={opt}
//                 role="option"
//                 aria-selected={value === opt}
//                 onMouseEnter={() => setHi(i)}
//                 onClick={() => { onChange(opt); setOpen(false); }}
//                 className={`flex items-center justify-between gap-2 px-3.5 py-3 sm:py-2.5 rounded-lg cursor-pointer text-[15px] sm:text-[13.5px] transition-colors duration-100
//                   ${i === hi ? "bg-slate-100" : ""}
//                   ${value === opt ? "text-[#0055A5] font-semibold bg-[#0055A5]/[0.08]" : "text-slate-700"}`}
//               >
//                 {opt}
//                 {value === opt && <CheckCircle2 size={15} className="text-[#0055A5]" />}
//               </li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // ─── Car + Variant picker panel ───────────────────────────────────────────────
// function CarVariantPicker({
//   selectedCar,
//   selectedVariantId,
//   onCarChange,
//   onVariantChange,
// }: {
//   selectedCar: string;
//   selectedVariantId: string;
//   onCarChange: (car: string) => void;
//   onVariantChange: (id: string) => void;
// }) {
//   const [showPicker, setShowPicker] = useState(false);

//   // Variants available for the currently selected car
//   const variants = OFFERS.filter((o) => o.active && o.model === selectedCar);
//   const selectedOffer = OFFERS.find((o) => o.id === selectedVariantId);

//   const handleCarSelect = (car: string) => {
//     onCarChange(car);
//     // Auto-select the first variant of the new car
//     const firstVariant = OFFERS.find((o) => o.active && o.model === car);
//     if (firstVariant) onVariantChange(firstVariant.id);
//     setShowPicker(false);
//   };

//   return (
//     <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
//       {/* Header */}
//       <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-white">
//         <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">
//           Selected Vehicle
//         </p>
//         <button
//           type="button"
//           onClick={() => setShowPicker(v => !v)}
//           className="text-[11px] font-bold text-[#0055A5] hover:underline underline-offset-2 flex items-center gap-1"
//         >
//           {showPicker ? "Cancel" : "Change Car"}
//           {!showPicker && <ChevronDown size={12} />}
//         </button>
//       </div>

//       {/* Car grid picker */}
//       {showPicker ? (
//         <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-3">
//           {ALL_CARS.map((car) => (
//             <button
//               key={car}
//               type="button"
//               onClick={() => handleCarSelect(car)}
//               className={`flex flex-col items-center py-2.5 px-1 rounded-xl border text-center transition-all text-xs font-bold ${
//                 selectedCar === car
//                   ? "border-[#0055A5] bg-[#0055A5]/8 text-[#0055A5]"
//                   : "border-slate-200 bg-white text-slate-600 hover:border-[#0055A5]/50"
//               }`}
//             >
//               <img
//                 src={getCarImage(car)}
//                 alt={car}
//                 className="w-14 h-9 object-cover rounded mb-1"
//               />
//               {car}
//             </button>
//           ))}
//         </div>
//       ) : (
//         /* Summary row */
//         <div className="flex items-center gap-3 px-4 py-3">
//           <img
//             src={getCarImage(selectedCar, selectedOffer?.powertrain === "Electric")}
//             alt={selectedCar}
//             className="w-16 h-11 object-cover rounded-lg border border-slate-200 shrink-0"
//           />
//           <div className="min-w-0">
//             <p className="text-sm font-black text-slate-800">
//               Tata {selectedCar}
//               {selectedOffer?.category === "EV" && !selectedCar.includes("EV") ? " EV" : ""}
//             </p>
//             {selectedOffer ? (
//               <>
//                 <p className="text-[11px] text-slate-500 font-semibold truncate">
//                   {selectedOffer.variantLabel ?? "—"}
//                 </p>
//                 <p className="text-[11px] font-black text-[#0055A5] mt-0.5">
//                   Up to ₹{selectedOffer.totalBenefit.toLocaleString("en-IN")}
//                 </p>
//               </>
//             ) : (
//               <p className="text-[11px] text-slate-400">Select a variant below</p>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Variant selector — always visible when picker is closed */}
//       {!showPicker && variants.length > 1 && (
//         <div className="border-t border-slate-100 px-3 pb-3 pt-2 space-y-1.5">
//           <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1 mb-1">
//             Variant
//           </p>
//           {variants.map((v) => (
//             <button
//               key={v.id}
//               type="button"
//               onClick={() => onVariantChange(v.id)}
//               className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all text-[12.5px] font-semibold ${
//                 selectedVariantId === v.id
//                   ? "border-[#0055A5] bg-[#0055A5]/6 text-[#0055A5]"
//                   : "border-slate-200 bg-white text-slate-700 hover:border-[#0055A5]/40"
//               }`}
//             >
//               <span>{v.variantLabel ?? v.id}</span>
//               <span className={`font-black text-[12px] ${selectedVariantId === v.id ? "text-[#0055A5]" : "text-slate-500"}`}>
//                 ₹{v.totalBenefit.toLocaleString("en-IN")}
//               </span>
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Main component ───────────────────────────────────────────────────────────
// interface OfferEnquiryFormProps {
//   offer: TataOffer;
//   defaultType?: EnquiryType;
// }

// export default function OfferEnquiryForm({
//   offer,
//   defaultType = "Get Offer",
// }: OfferEnquiryFormProps) {
//   // ── Selected car / variant (starts from the offer passed by the page) ──────
//   const [selectedCar, setSelectedCar]           = useState(offer.model);
//   const [selectedVariantId, setSelectedVariantId] = useState(offer.id);

//   // The "live" offer shown in the form — updates when variant changes
//   const activeOffer =
//     OFFERS.find((o) => o.id === selectedVariantId) ?? offer;

//   // ── Form fields ───────────────────────────────────────────────────────────
//   const [form, setForm] = useState({
//     name:     "",
//     mobile:   "",
//     location: "",
//     type:     defaultType,
//     showroom: "",
//   });
//   const [locLoading, setLocLoading] = useState(false);
//   const [submitted, setSubmitted]   = useState(false);
//   const [loading, setLoading]       = useState(false);
//   const [error, setError]           = useState("");

//   // Sync enquiry type when parent CTA changes it (Test Drive vs Get Offer)
//   useEffect(() => {
//     setForm(f => ({ ...f, type: defaultType }));
//   }, [defaultType]);

//   // Auto-detect city once on mount
//   useEffect(() => {
//     if (!navigator.geolocation) return;
//     setLocLoading(true);
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
//           if (city) setForm(f => ({ ...f, location: city }));
//         } catch { /* silent */ }
//         setLocLoading(false);
//       },
//       () => setLocLoading(false),
//       { timeout: 6000 }
//     );
//   }, []);

//   const handleCarChange = useCallback((car: string) => {
//     setSelectedCar(car);
//   }, []);

//   const handleVariantChange = useCallback((id: string) => {
//     setSelectedVariantId(id);
//   }, []);

//   // ── Submit ────────────────────────────────────────────────────────────────
//   const handleSubmit = useCallback(async (e: FormEvent) => {
//     e.preventDefault();
//     if (loading) return;
//     setError("");

//     if (!form.name.trim())                           { setError("Please enter your name.");                      return; }
//     if (form.mobile.replace(/\D/g, "").length < 10)  { setError("Please enter a valid 10-digit mobile number."); return; }
//     if (!form.showroom)                              { setError("Please select a preferred showroom.");           return; }

//     setLoading(true);
//     fbTrack("OfferEnquirySubmit", {
//       content_name: activeOffer.model,
//       offer_id:     activeOffer.id,
//       type:         form.type,
//     });

//     try {
//       const res = await fetch("/api/enquiry", {
//         method:  "POST",
//         headers: { "Content-Type": "application/json" },
//         body:    JSON.stringify({
//           name:     form.name,
//           mobile:   form.mobile,
//           location: form.location || null,
//           car:      activeOffer.model,
//           variant:  activeOffer.variantLabel ?? "",
//           type:     form.type,
//           showroom: form.showroom,
//           source:   `garud-tata-offer-detail | ${activeOffer.id}`,
//         }),
//       });
//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(data?.error ?? "Submission failed. Please try again.");
//       setSubmitted(true);
//       fbTrack("Lead", { content_name: activeOffer.model, offer_id: activeOffer.id });
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [form, loading, activeOffer]);

//   const submitLabel = form.type === "Test Drive" ? "BOOK TEST DRIVE" : "GET MY OFFER";

//   return (
//     <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-28 px-5 lg:px-12 text-slate-900 border-t border-slate-200/70">
//       <div className="max-w-[640px] mx-auto">

//         {/* Heading */}
//         <div className="text-center mb-10">
//           <span className="text-[11px] font-bold tracking-[0.22em] text-[#0055A5] uppercase mb-3 block">
//             GARUD TATA · ENQUIRY
//           </span>
//           <h2 className="text-slate-900 font-extrabold text-[clamp(1.6rem,5vw,2.5rem)] tracking-tight leading-[1.05] mb-3">
//             Interested in the {selectedCar}?
//           </h2>
//           <p className="text-slate-600 text-[13.5px] leading-relaxed">
//             Get the latest offer breakdown or book a test drive at Garud Tata.
//           </p>
//         </div>

//         {/* Card */}
//         <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 lg:p-8 shadow-sm">

//           {/* ── Success state ── */}
//           {submitted ? (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.97 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="py-10 text-center"
//             >
//               <div className="w-14 h-14 rounded-full bg-[#0055A5]/10 border border-[#0055A5]/25 flex items-center justify-center mx-auto mb-5">
//                 <CheckCircle2 size={28} className="text-[#0055A5]" />
//               </div>
//               <h3 className="text-slate-900 font-extrabold text-[1.4rem] tracking-tight mb-2">
//                 Enquiry Received!
//               </h3>
//               <p className="text-slate-600 text-[13.5px] leading-relaxed mb-8 max-w-xs mx-auto">
//                 Thank you for your interest in the {activeOffer.model}. Our{" "}
//                 <strong className="text-slate-800">{form.showroom}</strong> team will contact you shortly.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                 <a
//                   href="tel:+919217371204"
//                   className="flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] rounded-full bg-[#0055A5] text-white font-bold text-[12.5px] tracking-[0.06em] transition-colors hover:bg-[#004080] shadow-sm"
//                 >
//                   CALL NOW
//                 </a>
//                 <a
//                   href="https://wa.me/919217371204"
//                   target="_blank"
//                   rel="noreferrer"
//                   className="flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] rounded-full bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-[12.5px] tracking-[0.04em] transition-colors hover:bg-slate-200"
//                 >
//                   WHATSAPP US
//                 </a>
//               </div>
//             </motion.div>

//           ) : (
//             <form onSubmit={handleSubmit} noValidate className="space-y-5">

//               {/* ── Car + Variant picker ── */}
//               <CarVariantPicker
//                 selectedCar={selectedCar}
//                 selectedVariantId={selectedVariantId}
//                 onCarChange={handleCarChange}
//                 onVariantChange={handleVariantChange}
//               />

//               {/* ── Name ── */}
//               <div>
//                 <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">
//                   Name *
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   autoComplete="name"
//                   value={form.name}
//                   onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
//                   placeholder="Your full name"
//                   className={fieldCls}
//                 />
//               </div>

//               {/* ── Mobile ── */}
//               <div>
//                 <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">
//                   Mobile Number *
//                 </label>
//                 <input
//                   type="tel"
//                   required
//                   inputMode="numeric"
//                   autoComplete="tel"
//                   maxLength={15}
//                   value={form.mobile}
//                   onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))}
//                   placeholder="+91 00000 00000"
//                   className={fieldCls}
//                 />
//               </div>

//               {/* ── Location ── */}
//               <div>
//                 <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">
//                   Your City / Location
//                 </label>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     value={form.location}
//                     onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
//                     placeholder={locLoading ? "Detecting your location…" : "e.g. New Delhi, Gurugram"}
//                     className={`${fieldCls} pr-10`}
//                   />
//                   <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
//                     {locLoading ? (
//                       <span className="inline-block w-4 h-4 border-2 border-slate-300 border-t-[#0055A5] rounded-full animate-spin" />
//                     ) : (
//                       <MapPin size={16} />
//                     )}
//                   </span>
//                 </div>
//                 <p className="text-[10.5px] text-slate-400 mt-1.5 font-medium">
//                   Helps us assign the nearest Garud Tata team to you.
//                 </p>
//               </div>

//               {/* ── Enquiry type pills ── */}
//               <div>
//                 <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">
//                   Enquiry Type
//                 </label>
//                 <div className="flex flex-wrap gap-2">
//                   {ENQUIRY_TYPES.map(t => (
//                     <button
//                       key={t}
//                       type="button"
//                       onClick={() => setForm(f => ({ ...f, type: t }))}
//                       className={`px-3.5 py-2.5 rounded-lg text-[12px] font-bold tracking-[0.03em] min-h-[40px] border transition-all duration-150 ${
//                         form.type === t
//                           ? "bg-[#0055A5] border-[#0055A5] text-white shadow-sm"
//                           : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300"
//                       }`}
//                     >
//                       {t}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* ── Showroom radio cards ── */}
//               <div>
//                 <label className="block text-[11px] text-slate-500 mb-2 tracking-[0.16em] uppercase font-bold">
//                   Preferred Showroom *
//                 </label>
//                 <div className="space-y-2">
//                   {SHOWROOMS.map(s => (
//                     <button
//                       key={s}
//                       type="button"
//                       onClick={() => setForm(f => ({ ...f, showroom: s }))}
//                       className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
//                         form.showroom === s
//                           ? "border-[#0055A5] bg-[#0055A5]/5 ring-2 ring-[#0055A5]/20"
//                           : "border-slate-200 bg-slate-50 hover:border-[#0055A5]/40 hover:bg-white"
//                       }`}
//                     >
//                       <div>
//                         <p className={`text-[13.5px] font-bold ${form.showroom === s ? "text-[#0055A5]" : "text-slate-800"}`}>
//                           {s}
//                         </p>
//                         <p className="text-[11px] text-slate-400 font-medium mt-0.5">
//                           {SHOWROOM_META[s]}
//                         </p>
//                       </div>
//                       <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
//                         form.showroom === s
//                           ? "border-[#0055A5] bg-[#0055A5]"
//                           : "border-slate-300"
//                       }`}>
//                         {form.showroom === s && (
//                           <span className="w-2 h-2 rounded-full bg-white block" />
//                         )}
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* ── Inline error ── */}
//               {error && (
//                 <p role="alert" className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-[13px] font-medium leading-snug">
//                   {error}
//                 </p>
//               )}

//               {/* ── Submit ── */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full flex items-center justify-center gap-2 py-4 min-h-[52px] rounded-xl mt-1 bg-[#0055A5] hover:bg-[#004080] disabled:opacity-55 disabled:cursor-not-allowed text-white font-extrabold text-[13.5px] tracking-[0.08em] shadow-[0_4px_16px_rgba(0,85,165,0.25)] transition-all duration-150 group"
//               >
//                 {loading ? (
//                   <Loader2 size={18} className="animate-spin" />
//                 ) : (
//                   <>
//                     {submitLabel}
//                     <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-150" />
//                   </>
//                 )}
//               </button>

//               <p className="text-[11px] text-slate-400 text-center leading-relaxed">
//                 *T&C apply. Subject to eligibility. Our team will contact you within 24 hours.
//               </p>
//             </form>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }













// // garud-tata\app\components\Offerenquiryform.tsx

// "use client";

// import {
//   useState,
//   useCallback,
//   useRef,
//   useEffect,
//   type FormEvent,
// } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   CheckCircle2,
//   ArrowRight,
//   Loader2,
//   ChevronDown,
//   MapPin,
// } from "lucide-react";
// import type { TataOffer, EnquiryType } from "@/lib/tata-offers";
// import { OFFERS, SHOWROOMS, ENQUIRY_TYPES } from "@/lib/tata-offers";

// // ✅ Extended window type for both fbq and gtag
// declare global {
//   interface Window {
//     fbq?: (...a: unknown[]) => void;
//     gtag?: (...a: unknown[]) => void;
//   }
// }

// function fbTrack(event: string, params?: Record<string, unknown>) {
//   if (typeof window !== "undefined" && typeof window.fbq === "function")
//     window.fbq("track", event, params);
// }

// // ✅ gtag helper — mirrors fbTrack pattern
// function gtagEvent(eventName: string, params?: Record<string, unknown>) {
//   if (typeof window !== "undefined" && typeof window.gtag === "function")
//     window.gtag("event", eventName, params);
// }

// // ─── Image map ────────────────────────────────────────────────────────────────
// const CAR_IMAGES: Record<string, string> = {
//   tiago: "/Car images/Tata tiago/image1.jpg",
//   "tiago-ev": "/Car images/Tata tiago/image1.jpg",
//   tigor: "/Car images/Tata tigor/image1.avif",
//   altroz: "/Car images/Tata altroz/image1.avif",
//   punch: "/Car images/Tata punch/image1.jpg",
//   "punch-ev": "/Car images/Tata punch/image1.jpg",
//   nexon: "/Car images/Tata nexon/image1.avif",
//   "nexon-ev": "/Car images/Tata nexon/image1.avif",
//   curvv: "/Car images/Tata curv/image1.avif",
//   "curvv-ev": "/Car images/Tata curv/image1.avif",
//   harrier: "/Car images/Tata harrier/image1.avif",
//   "harrier-ev": "/Car images/Tata harrier/image1.avif",
//   safari: "/Car images/Tata safari/image1.avif",
//   sierra: "/Car images/Tata sierra/image1.avif",
// };

// function getCarImage(model: string, isEV = false) {
//   const key = isEV ? `${model.toLowerCase()}-ev` : model.toLowerCase();
//   return CAR_IMAGES[key] ?? CAR_IMAGES[model.toLowerCase()] ?? "/placeholder-car.jpg";
// }

// const ALL_CARS: string[] = (() => {
//   const seen = new Set<string>();
//   return OFFERS.filter((o) => o.active && !seen.has(o.model) && seen.add(o.model)).map((o) => o.model);
// })();

// const SHOWROOM_META: Record<string, string> = {
//   "Garud Tata Palam": "South-West Delhi",
//   "Garud Tata Narela": "North Delhi",
//   "Garud Tata Najafgarh": "West Delhi",
// };

// const fieldCls =
//   "w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 min-h-[52px] text-slate-900 text-[16px] sm:text-[13.5px] placeholder:text-slate-400 font-medium focus:outline-none focus:border-[#0055A5] focus:bg-white transition-all duration-150";

// // ─── Accessible custom select ─────────────────────────────────────────────────
// function Select({
//   label, value, onChange, options, placeholder,
// }: {
//   label: string; value: string; onChange: (v: string) => void;
//   options: readonly string[]; placeholder: string;
// }) {
//   const [open, setOpen] = useState(false);
//   const [hi, setHi] = useState(0);
//   const wrapRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!open) return;
//     const handler = (e: MouseEvent) => {
//       if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
//     };
//     document.addEventListener("mousedown", handler);
//     return () => document.removeEventListener("mousedown", handler);
//   }, [open]);

//   useEffect(() => {
//     if (open) setHi(Math.max(0, options.indexOf(value)));
//   }, [open, value, options]);

//   const onKey = (e: React.KeyboardEvent) => {
//     if (!open && ["Enter", " ", "ArrowDown"].includes(e.key)) { e.preventDefault(); setOpen(true); return; }
//     if (!open) return;
//     if (e.key === "ArrowDown") { e.preventDefault(); setHi(i => Math.min(i + 1, options.length - 1)); }
//     else if (e.key === "ArrowUp") { e.preventDefault(); setHi(i => Math.max(i - 1, 0)); }
//     else if (e.key === "Enter") { e.preventDefault(); onChange(options[hi]); setOpen(false); }
//     else if (e.key === "Escape" || e.key === "Tab") { setOpen(false); }
//   };

//   return (
//     <div ref={wrapRef} className="relative">
//       <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">{label}</label>
//       <button
//         type="button"
//         onClick={() => setOpen(o => !o)}
//         onKeyDown={onKey}
//         aria-haspopup="listbox"
//         aria-expanded={open}
//         className="w-full flex items-center justify-between gap-2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 min-h-[52px] text-left focus:outline-none focus:border-[#0055A5] focus:bg-white transition-all duration-150"
//       >
//         <span className={`text-[15px] sm:text-[13.5px] truncate font-medium ${value ? "text-slate-900" : "text-slate-400"}`}>
//           {value || placeholder}
//         </span>
//         <ChevronDown size={16} className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180 text-[#0055A5]" : ""}`} />
//       </button>

//       <AnimatePresence>
//         {open && (
//           <motion.ul
//             role="listbox"
//             initial={{ opacity: 0, y: -6 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -6 }}
//             transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
//             className="absolute z-50 mt-2 w-full max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-1.5"
//             style={{ scrollbarWidth: "thin" }}
//           >
//             {options.map((opt, i) => (
//               <li
//                 key={opt}
//                 role="option"
//                 aria-selected={value === opt}
//                 onMouseEnter={() => setHi(i)}
//                 onClick={() => { onChange(opt); setOpen(false); }}
//                 className={`flex items-center justify-between gap-2 px-3.5 py-3 sm:py-2.5 rounded-lg cursor-pointer text-[15px] sm:text-[13.5px] transition-colors duration-100
//                   ${i === hi ? "bg-slate-100" : ""}
//                   ${value === opt ? "text-[#0055A5] font-semibold bg-[#0055A5]/[0.08]" : "text-slate-700"}`}
//               >
//                 {opt}
//                 {value === opt && <CheckCircle2 size={15} className="text-[#0055A5]" />}
//               </li>
//             ))}
//           </motion.ul>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // ─── Car + Variant picker ─────────────────────────────────────────────────────
// function CarVariantPicker({
//   selectedCar, selectedVariantId, onCarChange, onVariantChange,
// }: {
//   selectedCar: string; selectedVariantId: string;
//   onCarChange: (car: string) => void; onVariantChange: (id: string) => void;
// }) {
//   const [showPicker, setShowPicker] = useState(false);
//   const variants = OFFERS.filter((o) => o.active && o.model === selectedCar);
//   const selectedOffer = OFFERS.find((o) => o.id === selectedVariantId);

//   const handleCarSelect = (car: string) => {
//     onCarChange(car);
//     const firstVariant = OFFERS.find((o) => o.active && o.model === car);
//     if (firstVariant) onVariantChange(firstVariant.id);
//     setShowPicker(false);
//   };

//   return (
//     <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
//       <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-white">
//         <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Selected Vehicle</p>
//         <button
//           type="button"
//           onClick={() => setShowPicker(v => !v)}
//           className="text-[11px] font-bold text-[#0055A5] hover:underline underline-offset-2 flex items-center gap-1"
//         >
//           {showPicker ? "Cancel" : "Change Car"}
//           {!showPicker && <ChevronDown size={12} />}
//         </button>
//       </div>

//       {showPicker ? (
//         <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-3">
//           {ALL_CARS.map((car) => (
//             <button
//               key={car}
//               type="button"
//               onClick={() => handleCarSelect(car)}
//               className={`flex flex-col items-center py-2.5 px-1 rounded-xl border text-center transition-all text-xs font-bold ${selectedCar === car
//                   ? "border-[#0055A5] bg-[#0055A5]/8 text-[#0055A5]"
//                   : "border-slate-200 bg-white text-slate-600 hover:border-[#0055A5]/50"
//                 }`}
//             >
//               <img src={getCarImage(car)} alt={car} className="w-14 h-9 object-cover rounded mb-1" />
//               {car}
//             </button>
//           ))}
//         </div>
//       ) : (
//         <div className="flex items-center gap-3 px-4 py-3">
//           <img
//             src={getCarImage(selectedCar, selectedOffer?.powertrain === "Electric")}
//             alt={selectedCar}
//             className="w-16 h-11 object-cover rounded-lg border border-slate-200 shrink-0"
//           />
//           <div className="min-w-0">
//             <p className="text-sm font-black text-slate-800">
//               Tata {selectedCar}
//               {selectedOffer?.category === "EV" && !selectedCar.includes("EV") ? " EV" : ""}
//             </p>
//             {selectedOffer ? (
//               <>
//                 <p className="text-[11px] text-slate-500 font-semibold truncate">{selectedOffer.variantLabel ?? "—"}</p>
//                 <p className="text-[11px] font-black text-[#0055A5] mt-0.5">
//                   Up to ₹{selectedOffer.totalBenefit.toLocaleString("en-IN")}
//                 </p>
//               </>
//             ) : (
//               <p className="text-[11px] text-slate-400">Select a variant below</p>
//             )}
//           </div>
//         </div>
//       )}

//       {!showPicker && variants.length > 1 && (
//         <div className="border-t border-slate-100 px-3 pb-3 pt-2 space-y-1.5">
//           <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1 mb-1">Variant</p>
//           {variants.map((v) => (
//             <button
//               key={v.id}
//               type="button"
//               onClick={() => onVariantChange(v.id)}
//               className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all text-[12.5px] font-semibold ${selectedVariantId === v.id
//                   ? "border-[#0055A5] bg-[#0055A5]/6 text-[#0055A5]"
//                   : "border-slate-200 bg-white text-slate-700 hover:border-[#0055A5]/40"
//                 }`}
//             >
//               <span>{v.variantLabel ?? v.id}</span>
//               <span className={`font-black text-[12px] ${selectedVariantId === v.id ? "text-[#0055A5]" : "text-slate-500"}`}>
//                 ₹{v.totalBenefit.toLocaleString("en-IN")}
//               </span>
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── Main component ───────────────────────────────────────────────────────────
// interface OfferEnquiryFormProps {
//   offer: TataOffer;
//   defaultType?: EnquiryType;
// }

// export default function OfferEnquiryForm({
//   offer,
//   defaultType = "Get Offer",
// }: OfferEnquiryFormProps) {
//   const [selectedCar, setSelectedCar] = useState(offer.model);
//   const [selectedVariantId, setSelectedVariantId] = useState(offer.id);

//   const activeOffer = OFFERS.find((o) => o.id === selectedVariantId) ?? offer;

//   const [form, setForm] = useState({
//     name: "",
//     mobile: "",
//     location: "",
//     type: defaultType,
//     showroom: "",
//   });
//   const [locLoading, setLocLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     setForm(f => ({ ...f, type: defaultType }));
//   }, [defaultType]);

//   useEffect(() => {
//     if (!navigator.geolocation) return;
//     setLocLoading(true);
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
//           if (city) setForm(f => ({ ...f, location: city }));
//         } catch { /* silent */ }
//         setLocLoading(false);
//       },
//       () => setLocLoading(false),
//       { timeout: 6000 }
//     );
//   }, []);

//   const handleCarChange = useCallback((car: string) => setSelectedCar(car), []);
//   const handleVariantChange = useCallback((id: string) => setSelectedVariantId(id), []);

//   // ── Submit ────────────────────────────────────────────────────────────────
//   const handleSubmit = useCallback(async (e: FormEvent) => {
//     e.preventDefault();
//     if (loading) return;
//     setError("");

//     if (!form.name.trim()) { setError("Please enter your name."); return; }
//     if (form.mobile.replace(/\D/g, "").length < 10) { setError("Please enter a valid 10-digit mobile number."); return; }
//     if (!form.showroom) { setError("Please select a preferred showroom."); return; }

//     setLoading(true);

//     // Pre-submit Meta Pixel event
//     fbTrack("OfferEnquirySubmit", {
//       content_name: activeOffer.model,
//       offer_id: activeOffer.id,
//       type: form.type,
//     });

//     try {
//       const res = await fetch("/api/enquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: form.name,
//           mobile: form.mobile,
//           location: form.location || null,
//           car: activeOffer.model,
//           variant: activeOffer.variantLabel ?? "",
//           type: form.type,
//           showroom: form.showroom,
//           source: `garud-tata-offer-detail | ${activeOffer.id}`,
//         }),
//       });

//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(data?.error ?? "Submission failed. Please try again.");

//       // ✅ Google Ads conversion — fires only on confirmed success
//       gtagEvent("conversion", {
//         send_to: "AW-18209967669/FeICCNezs-gcELWcmOtD",
//       });

//       // Post-submit Meta Pixel Lead event
//       fbTrack("Lead", {
//         content_name: activeOffer.model,
//         offer_id: activeOffer.id,
//       });

//       setSubmitted(true);

//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [form, loading, activeOffer]);

//   const submitLabel = form.type === "Test Drive" ? "BOOK TEST DRIVE" : "GET MY OFFER";

//   return (
//     <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-28 px-5 lg:px-12 text-slate-900 border-t border-slate-200/70">
//       <div className="max-w-[640px] mx-auto">

//         {/* Heading */}
//         <div className="text-center mb-10">
//           <span className="text-[11px] font-bold tracking-[0.22em] text-[#0055A5] uppercase mb-3 block">
//             GARUD TATA · ENQUIRY
//           </span>
//           <h2 className="text-slate-900 font-extrabold text-[clamp(1.6rem,5vw,2.5rem)] tracking-tight leading-[1.05] mb-3">
//             Interested in the {selectedCar}?
//           </h2>
//           <p className="text-slate-600 text-[13.5px] leading-relaxed">
//             Get the latest offer breakdown or book a test drive at Garud Tata.
//           </p>
//         </div>

//         {/* Card */}
//         <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 lg:p-8 shadow-sm">

//           {/* ── Success state ── */}
//           {submitted ? (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.97 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="py-10 text-center"
//             >
//               <div className="w-14 h-14 rounded-full bg-[#0055A5]/10 border border-[#0055A5]/25 flex items-center justify-center mx-auto mb-5">
//                 <CheckCircle2 size={28} className="text-[#0055A5]" />
//               </div>
//               <h3 className="text-slate-900 font-extrabold text-[1.4rem] tracking-tight mb-2">
//                 Enquiry Received!
//               </h3>
//               <p className="text-slate-600 text-[13.5px] leading-relaxed mb-8 max-w-xs mx-auto">
//                 Thank you for your interest in the {activeOffer.model}. Our{" "}
//                 <strong className="text-slate-800">{form.showroom}</strong> team will contact you shortly.
//               </p>
//               ```tsx
//               <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                 {/* Call Button */}
//                 <a
//                   href="tel:+919217371204"
//                   className="flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] rounded-full bg-[#0055A5] text-white font-bold text-[12.5px] tracking-[0.06em] transition-all duration-200 hover:bg-[#004080] hover:shadow-md active:scale-95"
//                 >
//                   CALL NOW
//                 </a>

//                 {/* WhatsApp Button */}
//                 <a
//                   href="https://wa.me/919217371204"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] rounded-full bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-[12.5px] tracking-[0.04em] transition-all duration-200 hover:bg-slate-200 hover:shadow-md active:scale-95"
//                 >
//                   WHATSAPP US
//                 </a>
//               </div>
//               ```

//             </motion.div>

//           ) : (
//             <form onSubmit={handleSubmit} noValidate className="space-y-5">

//               <CarVariantPicker
//                 selectedCar={selectedCar}
//                 selectedVariantId={selectedVariantId}
//                 onCarChange={handleCarChange}
//                 onVariantChange={handleVariantChange}
//               />

//               {/* ── Name ── */}
//               <div>
//                 <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">Name *</label>
//                 <input
//                   type="text" required autoComplete="name" value={form.name}
//                   onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
//                   placeholder="Your full name" className={fieldCls}
//                 />
//               </div>

//               {/* ── Mobile ── */}
//               <div>
//                 <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">Mobile Number *</label>
//                 <input
//                   type="tel" required inputMode="numeric" autoComplete="tel" maxLength={15}
//                   value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))}
//                   placeholder="+91 00000 00000" className={fieldCls}
//                 />
//               </div>

//               {/* ── Location ── */}
//               <div>
//                 <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">Your City / Location</label>
//                 <div className="relative">
//                   <input
//                     type="text" value={form.location}
//                     onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
//                     placeholder={locLoading ? "Detecting your location…" : "e.g. New Delhi, Gurugram"}
//                     className={`${fieldCls} pr-10`}
//                   />
//                   <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
//                     {locLoading
//                       ? <span className="inline-block w-4 h-4 border-2 border-slate-300 border-t-[#0055A5] rounded-full animate-spin" />
//                       : <MapPin size={16} />
//                     }
//                   </span>
//                 </div>
//                 <p className="text-[10.5px] text-slate-400 mt-1.5 font-medium">
//                   Helps us assign the nearest Garud Tata team to you.
//                 </p>
//               </div>

//               {/* ── Enquiry type pills ── */}
//               <div>
//                 <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">Enquiry Type</label>
//                 <div className="flex flex-wrap gap-2">
//                   {ENQUIRY_TYPES.map(t => (
//                     <button
//                       key={t}
//                       type="button"
//                       onClick={() => setForm(f => ({ ...f, type: t }))}
//                       className={`px-3.5 py-2.5 rounded-lg text-[12px] font-bold tracking-[0.03em] min-h-[40px] border transition-all duration-150 ${form.type === t
//                           ? "bg-[#0055A5] border-[#0055A5] text-white shadow-sm"
//                           : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300"
//                         }`}
//                     >
//                       {t}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* ── Showroom radio cards ── */}
//               <div>
//                 <label className="block text-[11px] text-slate-500 mb-2 tracking-[0.16em] uppercase font-bold">Preferred Showroom *</label>
//                 <div className="space-y-2">
//                   {SHOWROOMS.map(s => (
//                     <button
//                       key={s}
//                       type="button"
//                       onClick={() => setForm(f => ({ ...f, showroom: s }))}
//                       className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${form.showroom === s
//                           ? "border-[#0055A5] bg-[#0055A5]/5 ring-2 ring-[#0055A5]/20"
//                           : "border-slate-200 bg-slate-50 hover:border-[#0055A5]/40 hover:bg-white"
//                         }`}
//                     >
//                       <div>
//                         <p className={`text-[13.5px] font-bold ${form.showroom === s ? "text-[#0055A5]" : "text-slate-800"}`}>{s}</p>
//                         <p className="text-[11px] text-slate-400 font-medium mt-0.5">{SHOWROOM_META[s]}</p>
//                       </div>
//                       <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${form.showroom === s ? "border-[#0055A5] bg-[#0055A5]" : "border-slate-300"
//                         }`}>
//                         {form.showroom === s && <span className="w-2 h-2 rounded-full bg-white block" />}
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* ── Error ── */}
//               {error && (
//                 <p role="alert" className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-[13px] font-medium leading-snug">
//                   {error}
//                 </p>
//               )}

//               {/* ── Submit ── */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full flex items-center justify-center gap-2 py-4 min-h-[52px] rounded-xl mt-1 bg-[#0055A5] hover:bg-[#004080] disabled:opacity-55 disabled:cursor-not-allowed text-white font-extrabold text-[13.5px] tracking-[0.08em] shadow-[0_4px_16px_rgba(0,85,165,0.25)] transition-all duration-150 group"
//               >
//                 {loading ? (
//                   <Loader2 size={18} className="animate-spin" />
//                 ) : (
//                   <>
//                     {submitLabel}
//                     <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-150" />
//                   </>
//                 )}
//               </button>

//               <p className="text-[11px] text-slate-400 text-center leading-relaxed">
//                 *T&C apply. Subject to eligibility. Our team will contact you within 24 hours.
//               </p>
//             </form>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
























// garud-tata\app\components\Offerenquiryform.tsx

"use client";

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  type FormEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  ArrowRight,
  Loader2,
  ChevronDown,
  MapPin,
} from "lucide-react";
import type { TataOffer, EnquiryType } from "@/lib/tata-offers";
import { OFFERS, SHOWROOMS, ENQUIRY_TYPES } from "@/lib/tata-offers";

// ✅ Extended window type for both fbq and gtag
declare global {
  interface Window {
    fbq?: (...a: unknown[]) => void;
    gtag?: (...args: any[]) => void;
  }
}

function fbTrack(event: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function")
    window.fbq("track", event, params);
}

// ✅ gtag helper — mirrors fbTrack pattern
function gtagEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function")
    window.gtag("event", eventName, params);
}

// ─── Image map ────────────────────────────────────────────────────────────────
const CAR_IMAGES: Record<string, string> = {
  tiago: "/Car images/Tata tiago/image1.jpg",
  "tiago-ev": "/Car images/Tata tiago/image1.jpg",
  tigor: "/Car images/Tata tigor/image1.avif",
  altroz: "/Car images/Tata altroz/image1.avif",
  punch: "/Car images/Tata punch/image1.jpg",
  "punch-ev": "/Car images/Tata punch/image1.jpg",
  nexon: "/Car images/Tata nexon/image1.avif",
  "nexon-ev": "/Car images/Tata nexon/image1.avif",
  curvv: "/Car images/Tata curv/image1.avif",
  "curvv-ev": "/Car images/Tata curv/image1.avif",
  harrier: "/Car images/Tata harrier/image1.avif",
  "harrier-ev": "/Car images/Tata harrier/image1.avif",
  safari: "/Car images/Tata safari/image1.avif",
  sierra: "/Car images/Tata sierra/image1.avif",
};

function getCarImage(model: string, isEV = false) {
  const key = isEV ? `${model.toLowerCase()}-ev` : model.toLowerCase();
  return CAR_IMAGES[key] ?? CAR_IMAGES[model.toLowerCase()] ?? "/placeholder-car.jpg";
}

const ALL_CARS: string[] = (() => {
  const seen = new Set<string>();
  return OFFERS.filter((o) => o.active && !seen.has(o.model) && seen.add(o.model)).map((o) => o.model);
})();

const SHOWROOM_META: Record<string, string> = {
  "Garud Tata Palam": "South-West Delhi",
  "Garud Tata Narela": "North Delhi",
  "Garud Tata Najafgarh": "West Delhi",
};

const fieldCls =
  "w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 min-h-[52px] text-slate-900 text-[16px] sm:text-[13.5px] placeholder:text-slate-400 font-medium focus:outline-none focus:border-[#0055A5] focus:bg-white transition-all duration-150";

// ─── Accessible custom select ─────────────────────────────────────────────────
function Select({
  label, value, onChange, options, placeholder,
}: {
  label: string; value: string; onChange: (v: string) => void;
  options: readonly string[]; placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (open) setHi(Math.max(0, options.indexOf(value)));
  }, [open, value, options]);

  const onKey = (e: React.KeyboardEvent) => {
    if (!open && ["Enter", " ", "ArrowDown"].includes(e.key)) { e.preventDefault(); setOpen(true); return; }
    if (!open) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setHi(i => Math.min(i + 1, options.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setHi(i => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); onChange(options[hi]); setOpen(false); }
    else if (e.key === "Escape" || e.key === "Tab") { setOpen(false); }
  };

  return (
    <div ref={wrapRef} className="relative">
      <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        onKeyDown={onKey}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-2 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 min-h-[52px] text-left focus:outline-none focus:border-[#0055A5] focus:bg-white transition-all duration-150"
      >
        <span className={`text-[15px] sm:text-[13.5px] truncate font-medium ${value ? "text-slate-900" : "text-slate-400"}`}>
          {value || placeholder}
        </span>
        <ChevronDown size={16} className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180 text-[#0055A5]" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-50 mt-2 w-full max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-1.5"
            style={{ scrollbarWidth: "thin" }}
          >
            {options.map((opt, i) => (
              <li
                key={opt}
                role="option"
                aria-selected={value === opt}
                onMouseEnter={() => setHi(i)}
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`flex items-center justify-between gap-2 px-3.5 py-3 sm:py-2.5 rounded-lg cursor-pointer text-[15px] sm:text-[13.5px] transition-colors duration-100
                  ${i === hi ? "bg-slate-100" : ""}
                  ${value === opt ? "text-[#0055A5] font-semibold bg-[#0055A5]/[0.08]" : "text-slate-700"}`}
              >
                {opt}
                {value === opt && <CheckCircle2 size={15} className="text-[#0055A5]" />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Car + Variant picker ─────────────────────────────────────────────────────
function CarVariantPicker({
  selectedCar, selectedVariantId, onCarChange, onVariantChange,
}: {
  selectedCar: string; selectedVariantId: string;
  onCarChange: (car: string) => void; onVariantChange: (id: string) => void;
}) {
  const [showPicker, setShowPicker] = useState(false);
  const variants = OFFERS.filter((o) => o.active && o.model === selectedCar);
  const selectedOffer = OFFERS.find((o) => o.id === selectedVariantId);

  const handleCarSelect = (car: string) => {
    onCarChange(car);
    const firstVariant = OFFERS.find((o) => o.active && o.model === car);
    if (firstVariant) onVariantChange(firstVariant.id);
    setShowPicker(false);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-white">
        <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Selected Vehicle</p>
        <button
          type="button"
          onClick={() => setShowPicker(v => !v)}
          className="text-[11px] font-bold text-[#0055A5] hover:underline underline-offset-2 flex items-center gap-1"
        >
          {showPicker ? "Cancel" : "Change Car"}
          {!showPicker && <ChevronDown size={12} />}
        </button>
      </div>

      {showPicker ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-3">
          {ALL_CARS.map((car) => (
            <button
              key={car}
              type="button"
              onClick={() => handleCarSelect(car)}
              className={`flex flex-col items-center py-2.5 px-1 rounded-xl border text-center transition-all text-xs font-bold ${selectedCar === car
                  ? "border-[#0055A5] bg-[#0055A5]/8 text-[#0055A5]"
                  : "border-slate-200 bg-white text-slate-600 hover:border-[#0055A5]/50"
                }`}
            >
              <img src={getCarImage(car)} alt={car} className="w-14 h-9 object-cover rounded mb-1" />
              {car}
            </button>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-3 px-4 py-3">
          <img
            src={getCarImage(selectedCar, selectedOffer?.powertrain === "Electric")}
            alt={selectedCar}
            className="w-16 h-11 object-cover rounded-lg border border-slate-200 shrink-0"
          />
          <div className="min-w-0">
            <p className="text-sm font-black text-slate-800">
              Tata {selectedCar}
              {selectedOffer?.category === "EV" && !selectedCar.includes("EV") ? " EV" : ""}
            </p>
            {selectedOffer ? (
              <>
                <p className="text-[11px] text-slate-500 font-semibold truncate">{selectedOffer.variantLabel ?? "—"}</p>
                <p className="text-[11px] font-black text-[#0055A5] mt-0.5">
                  Up to ₹{selectedOffer.totalBenefit.toLocaleString("en-IN")}
                </p>
              </>
            ) : (
              <p className="text-[11px] text-slate-400">Select a variant below</p>
            )}
          </div>
        </div>
      )}

      {!showPicker && variants.length > 1 && (
        <div className="border-t border-slate-100 px-3 pb-3 pt-2 space-y-1.5">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1 mb-1">Variant</p>
          {variants.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => onVariantChange(v.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border text-left transition-all text-[12.5px] font-semibold ${selectedVariantId === v.id
                  ? "border-[#0055A5] bg-[#0055A5]/6 text-[#0055A5]"
                  : "border-slate-200 bg-white text-slate-700 hover:border-[#0055A5]/40"
                }`}
            >
              <span>{v.variantLabel ?? v.id}</span>
              <span className={`font-black text-[12px] ${selectedVariantId === v.id ? "text-[#0055A5]" : "text-slate-500"}`}>
                ₹{v.totalBenefit.toLocaleString("en-IN")}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
interface OfferEnquiryFormProps {
  offer: TataOffer;
  defaultType?: EnquiryType;
}

export default function OfferEnquiryForm({
  offer,
  defaultType = "Get Offer",
}: OfferEnquiryFormProps) {
  const [selectedCar, setSelectedCar] = useState(offer.model);
  const [selectedVariantId, setSelectedVariantId] = useState(offer.id);

  const activeOffer = OFFERS.find((o) => o.id === selectedVariantId) ?? offer;

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    location: "",
    type: defaultType,
    showroom: "",
  });
  const [locLoading, setLocLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(f => ({ ...f, type: defaultType }));
  }, [defaultType]);

  useEffect(() => {
    if (!navigator.geolocation) return;
    setLocLoading(true);
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
          if (city) setForm(f => ({ ...f, location: city }));
        } catch { /* silent */ }
        setLocLoading(false);
      },
      () => setLocLoading(false),
      { timeout: 6000 }
    );
  }, []);

  const handleCarChange = useCallback((car: string) => setSelectedCar(car), []);
  const handleVariantChange = useCallback((id: string) => setSelectedVariantId(id), []);

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");

    if (!form.name.trim()) { setError("Please enter your name."); return; }
    if (form.mobile.replace(/\D/g, "").length < 10) { setError("Please enter a valid 10-digit mobile number."); return; }
    if (!form.showroom) { setError("Please select a preferred showroom."); return; }

    setLoading(true);

    // Pre-submit Meta Pixel event
    fbTrack("OfferEnquirySubmit", {
      content_name: activeOffer.model,
      offer_id: activeOffer.id,
      type: form.type,
    });

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          mobile: form.mobile,
          location: form.location || null,
          car: activeOffer.model,
          variant: activeOffer.variantLabel ?? "",
          type: form.type,
          showroom: form.showroom,
          source: `garud-tata-offer-detail | ${activeOffer.id}`,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Submission failed. Please try again.");

      // ✅ Google Ads conversion — fires only on confirmed success
      gtagEvent("conversion", {
        send_to: "AW-18209967669/FeICCNezs-gcELWcmOtD",
      });

      // Post-submit Meta Pixel Lead event
      fbTrack("Lead", {
        content_name: activeOffer.model,
        offer_id: activeOffer.id,
      });

      setSubmitted(true);

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [form, loading, activeOffer]);

  const submitLabel = form.type === "Test Drive" ? "BOOK TEST DRIVE" : "GET MY OFFER";

  return (
    <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-28 px-5 lg:px-12 text-slate-900 border-t border-slate-200/70">
      <div className="max-w-[640px] mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-[0.22em] text-[#0055A5] uppercase mb-3 block">
            GARUD TATA · ENQUIRY
          </span>
          <h2 className="text-slate-900 font-extrabold text-[clamp(1.6rem,5vw,2.5rem)] tracking-tight leading-[1.05] mb-3">
            Interested in the {selectedCar}?
          </h2>
          <p className="text-slate-600 text-[13.5px] leading-relaxed">
            Get the latest offer breakdown or book a test drive at Garud Tata.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 lg:p-8 shadow-sm">

          {/* ── Success state ── */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#0055A5]/10 border border-[#0055A5]/25 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={28} className="text-[#0055A5]" />
              </div>
              <h3 className="text-slate-900 font-extrabold text-[1.4rem] tracking-tight mb-2">
                Enquiry Received!
              </h3>
              <p className="text-slate-600 text-[13.5px] leading-relaxed mb-8 max-w-xs mx-auto">
                Thank you for your interest in the {activeOffer.model}. Our{" "}
                <strong className="text-slate-800">{form.showroom}</strong> team will contact you shortly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {/* Call Button */}
                <a
                  href="tel:+919217371204"
                  className="flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] rounded-full bg-[#0055A5] text-white font-bold text-[12.5px] tracking-[0.06em] transition-all duration-200 hover:bg-[#004080] hover:shadow-md active:scale-95"
                >
                  CALL NOW
                </a>

                {/* WhatsApp Button */}
                <a
                  href="https://wa.me/919217371204"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] rounded-full bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-[12.5px] tracking-[0.04em] transition-all duration-200 hover:bg-slate-200 hover:shadow-md active:scale-95"
                >
                  WHATSAPP US
                </a>
              </div>

            </motion.div>

          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              <CarVariantPicker
                selectedCar={selectedCar}
                selectedVariantId={selectedVariantId}
                onCarChange={handleCarChange}
                onVariantChange={handleVariantChange}
              />

              {/* ── Name ── */}
              <div>
                <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">Name *</label>
                <input
                  type="text" required autoComplete="name" value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your full name" className={fieldCls}
                />
              </div>

              {/* ── Mobile ── */}
              <div>
                <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">Mobile Number *</label>
                <input
                  type="tel" required inputMode="numeric" autoComplete="tel" maxLength={15}
                  value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))}
                  placeholder="+91 00000 00000" className={fieldCls}
                />
              </div>

              {/* ── Location ── */}
              <div>
                <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">Your City / Location</label>
                <div className="relative">
                  <input
                    type="text" value={form.location}
                    onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                    placeholder={locLoading ? "Detecting your location…" : "e.g. New Delhi, Gurugram"}
                    className={`${fieldCls} pr-10`}
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                    {locLoading
                      ? <span className="inline-block w-4 h-4 border-2 border-slate-300 border-t-[#0055A5] rounded-full animate-spin" />
                      : <MapPin size={16} />
                    }
                  </span>
                </div>
                <p className="text-[10.5px] text-slate-400 mt-1.5 font-medium">
                  Helps us assign the nearest Garud Tata team to you.
                </p>
              </div>

              {/* ── Enquiry type pills ── */}
              <div>
                <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">Enquiry Type</label>
                <div className="flex flex-wrap gap-2">
                  {ENQUIRY_TYPES.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, type: t }))}
                      className={`px-3.5 py-2.5 rounded-lg text-[12px] font-bold tracking-[0.03em] min-h-[40px] border transition-all duration-150 ${form.type === t
                          ? "bg-[#0055A5] border-[#0055A5] text-white shadow-sm"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300"
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Showroom radio cards ── */}
              <div>
                <label className="block text-[11px] text-slate-500 mb-2 tracking-[0.16em] uppercase font-bold">Preferred Showroom *</label>
                <div className="space-y-2">
                  {SHOWROOMS.map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, showroom: s }))}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${form.showroom === s
                          ? "border-[#0055A5] bg-[#0055A5]/5 ring-2 ring-[#0055A5]/20"
                          : "border-slate-200 bg-slate-50 hover:border-[#0055A5]/40 hover:bg-white"
                        }`}
                    >
                      <div>
                        <p className={`text-[13.5px] font-bold ${form.showroom === s ? "text-[#0055A5]" : "text-slate-800"}`}>{s}</p>
                        <p className="text-[11px] text-slate-400 font-medium mt-0.5">{SHOWROOM_META[s]}</p>
                      </div>
                      <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${form.showroom === s ? "border-[#0055A5] bg-[#0055A5]" : "border-slate-300"
                        }`}>
                        {form.showroom === s && <span className="w-2 h-2 rounded-full bg-white block" />}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Error ── */}
              {error && (
                <p role="alert" className="text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-[13px] font-medium leading-snug">
                  {error}
                </p>
              )}

              {/* ── Submit ── */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 min-h-[52px] rounded-xl mt-1 bg-[#0055A5] hover:bg-[#004080] disabled:opacity-55 disabled:cursor-not-allowed text-white font-extrabold text-[13.5px] tracking-[0.08em] shadow-[0_4px_16px_rgba(0,85,165,0.25)] transition-all duration-150 group"
              >
                {loading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    {submitLabel}
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-150" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                *T&C apply. Subject to eligibility. Our team will contact you within 24 hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
