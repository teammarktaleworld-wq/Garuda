




// "use client";

// import { useState, useCallback, useRef, useEffect, type FormEvent } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { CheckCircle2, ArrowRight, Loader2, ChevronDown } from "lucide-react";
// import type { TataOffer, EnquiryType } from "@/lib/tata-offers";
// import { SHOWROOMS, ENQUIRY_TYPES } from "@/lib/tata-offers";

// declare global { interface Window { fbq?: (...a: unknown[]) => void; } }
// function fbTrack(event: string, params?: Record<string, string>) {
//   if (typeof window !== "undefined" && typeof window.fbq === "function") window.fbq("track", event, params);
// }

// function Select({ label, value, onChange, options, placeholder }: {
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

//   useEffect(() => { if (open) setHi(Math.max(0, options.indexOf(value))); }, [open, value, options]);

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
//         type="button" onClick={() => setOpen(o => !o)} onKeyDown={onKey}
//         aria-haspopup="listbox" aria-expanded={open}
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
//             initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
//             transition={{ duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
//             className="absolute z-50 mt-2 w-full max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-[0_12px_32px_rgba(0,0,0,0.12)] p-1.5"
//             style={{ scrollbarWidth: "thin" }}
//           >
//             {options.map((opt, i) => (
//               <li
//                 key={opt} role="option" aria-selected={value === opt}
//                 onMouseEnter={() => setHi(i)} onClick={() => { onChange(opt); setOpen(false); }}
//                 className={`flex items-center justify-between gap-2 px-3.5 py-3 sm:py-2.5 rounded-lg cursor-pointer text-[15px] sm:text-[13.5px] transition-colors duration-100 ${i === hi ? "bg-slate-100" : ""} ${value === opt ? "text-[#0055A5] font-semibold bg-[#0055A5]/[0.08]" : "text-slate-700"}`}
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

// const fieldClass = "w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 min-h-[52px] text-slate-900 text-[16px] sm:text-[13.5px] placeholder:text-slate-400 font-medium focus:outline-none focus:border-[#0055A5] focus:bg-white transition-all duration-150";

// interface OfferEnquiryFormProps {
//   offer: TataOffer;
//   defaultType?: EnquiryType;
// }

// export default function OfferEnquiryForm({ offer, defaultType = "Get Offer" }: OfferEnquiryFormProps) {
//   const [form, setForm] = useState({
//     name: "",
//     mobile: "",
//     type: defaultType,
//     showroom: "",
//   });
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // ✅ Sync enquiry type when parent changes it (Test Drive click etc.)
//   // but do NOT auto-focus — that was causing the page to jump to the form
//   useEffect(() => { setForm(f => ({ ...f, type: defaultType })); }, [defaultType]);

//   const handleSubmit = useCallback(async (e: FormEvent) => {
//     e.preventDefault();
//     if (loading) return;
//     setError("");

//     if (!form.name.trim()) { setError("Please enter your name."); return; }
//     if (form.mobile.replace(/\D/g, "").length < 10) { setError("Please enter a valid 10-digit mobile number."); return; }
//     if (!form.showroom) { setError("Please select a preferred showroom."); return; }

//     setLoading(true);
//     fbTrack("OfferEnquirySubmit", { content_name: offer.model, offer_id: offer.id, type: form.type });

//     try {
//       const res = await fetch("/api/enquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: form.name,
//           mobile: form.mobile,
//           car: offer.model,
//           variant: offer.variantLabel ?? "",
//           type: form.type,
//           showroom: form.showroom,
//           source: `garud-tata-offer-detail | ${offer.id}`,
//         }),
//       });
//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(data?.error ?? "Submission failed. Please try again.");
//       setSubmitted(true);
//       fbTrack("Lead", { content_name: offer.model, offer_id: offer.id });
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, [form, loading, offer]);

//   const submitLabel = form.type === "Test Drive" ? "BOOK TEST DRIVE" : "GET MY OFFER";

//   return (
//     <section id="enquiry" className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-28 px-5 lg:px-12 text-slate-900 border-t border-slate-200/70 scroll-mt-20">
//       <div className="max-w-[640px] mx-auto">
//         <div className="text-center mb-10">
//           <span className="text-[11px] font-bold tracking-[0.22em] text-[#0055A5] uppercase mb-3 block">
//             GARUD TATA · ENQUIRY
//           </span>
//           <h2 className="text-slate-900 font-extrabold text-[clamp(1.6rem,5vw,2.5rem)] tracking-tight leading-[1.05] mb-3">
//             Interested in the {offer.model}?
//           </h2>
//           <p className="text-slate-600 text-[13.5px] leading-relaxed">
//             Get the latest offer breakdown or book a test drive at Garud Tata.
//           </p>
//         </div>

//         <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 lg:p-8 shadow-sm">
//           {submitted ? (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
//               className="py-10 text-center"
//             >
//               <div className="w-14 h-14 rounded-full bg-[#0055A5]/10 border border-[#0055A5]/25 flex items-center justify-center mx-auto mb-5">
//                 <CheckCircle2 size={28} className="text-[#0055A5]" />
//               </div>
//               <h3 className="text-slate-900 font-extrabold text-[1.4rem] tracking-tight mb-2">Enquiry Received!</h3>
//               <p className="text-slate-600 text-[13.5px] leading-relaxed mb-8 max-w-xs mx-auto">
//                 Thank you for your interest in the {offer.model}. Our Garud Tata team will contact you shortly.
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
//             <form onSubmit={handleSubmit} noValidate className="space-y-4">
//               <motion.div
//                 initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
//                 className="flex items-center gap-3 bg-[#0055A5]/[0.06] border border-[#0055A5]/20 rounded-xl px-4 py-3"
//               >
//                 <CheckCircle2 size={16} className="text-[#0055A5] flex-shrink-0" />
//                 <div className="min-w-0 text-[12.5px]">
//                   <span className="text-slate-900 font-bold">{offer.model}</span>
//                   {offer.variantLabel && <span className="text-slate-600"> · {offer.variantLabel}</span>}
//                   <span className="text-slate-400"> — pre-filled</span>
//                 </div>
//               </motion.div>

//               <div>
//                 <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">Name *</label>
//                 <input
//                   type="text" required autoComplete="name"
//                   value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
//                   placeholder="Your full name" className={fieldClass}
//                 />
//               </div>

//               <div>
//                 <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">Mobile Number *</label>
//                 <input
//                   type="tel" required inputMode="numeric" autoComplete="tel" maxLength={15}
//                   value={form.mobile} onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))}
//                   placeholder="+91 00000 00000" className={fieldClass}
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">Interested Car</label>
//                   <div className={`${fieldClass} text-slate-700 bg-slate-100 border-slate-200 cursor-default flex items-center`}>{offer.model}</div>
//                 </div>
//                 {offer.variantLabel && (
//                   <div>
//                     <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">Variant</label>
//                     <div className={`${fieldClass} text-slate-700 bg-slate-100 border-slate-200 cursor-default flex items-center`}>{offer.variantLabel}</div>
//                   </div>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">Enquiry Type</label>
//                 <div className="flex flex-wrap gap-2">
//                   {ENQUIRY_TYPES.map(t => (
//                     <button
//                       key={t} type="button" onClick={() => setForm(f => ({ ...f, type: t }))}
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

//               <Select
//                 label="Preferred Showroom *"
//                 value={form.showroom}
//                 onChange={v => setForm(f => ({ ...f, showroom: v }))}
//                 options={SHOWROOMS}
//                 placeholder="Select a showroom"
//               />

//               {error && (
//                 <p role="alert" className="text-red-600 text-[13px] font-medium leading-snug">{error}</p>
//               )}

//               <button
//                 type="submit" disabled={loading}
//                 className="w-full flex items-center justify-center gap-2 py-4 min-h-[52px] rounded-xl mt-1 bg-[#0055A5] hover:bg-[#004080] disabled:opacity-55 disabled:cursor-not-allowed text-white font-extrabold text-[13.5px] tracking-[0.08em] shadow-[0_4px_16px_rgba(0,85,165,0.25)] transition-all duration-150 group"
//               >
//                 {loading
//                   ? <Loader2 size={18} className="animate-spin" />
//                   : <>{submitLabel} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-150" /></>
//                 }
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














"use client";

import { useState, useCallback, useRef, useEffect, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Loader2, ChevronDown } from "lucide-react";
import type { TataOffer, EnquiryType } from "@/lib/tata-offers";
import { SHOWROOMS, ENQUIRY_TYPES } from "@/lib/tata-offers";

declare global { interface Window { fbq?: (...a: unknown[]) => void; } }
function fbTrack(event: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function")
    window.fbq("track", event, params);
}

// ─── Accessible custom select ────────────────────────────────────────────────
function Select({
  label, value, onChange, options, placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [hi, setHi]     = useState(0);
  const wrapRef         = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Reset highlighted index when opening
  useEffect(() => {
    if (open) setHi(Math.max(0, options.indexOf(value)));
  }, [open, value, options]);

  const onKey = (e: React.KeyboardEvent) => {
    if (!open && ["Enter", " ", "ArrowDown"].includes(e.key)) {
      e.preventDefault(); setOpen(true); return;
    }
    if (!open) return;
    if (e.key === "ArrowDown")  { e.preventDefault(); setHi(i => Math.min(i + 1, options.length - 1)); }
    else if (e.key === "ArrowUp")   { e.preventDefault(); setHi(i => Math.max(i - 1, 0)); }
    else if (e.key === "Enter")     { e.preventDefault(); onChange(options[hi]); setOpen(false); }
    else if (e.key === "Escape" || e.key === "Tab") { setOpen(false); }
  };

  return (
    <div ref={wrapRef} className="relative">
      <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">
        {label}
      </label>
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
        <ChevronDown
          size={16}
          className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-180 text-[#0055A5]" : ""}`}
        />
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

const fieldClass =
  "w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3.5 min-h-[52px] text-slate-900 text-[16px] sm:text-[13.5px] placeholder:text-slate-400 font-medium focus:outline-none focus:border-[#0055A5] focus:bg-white transition-all duration-150";

// ─── Main component ───────────────────────────────────────────────────────────
interface OfferEnquiryFormProps {
  offer: TataOffer;
  defaultType?: EnquiryType;
}

export default function OfferEnquiryForm({
  offer,
  defaultType = "Get Offer",
}: OfferEnquiryFormProps) {
  const [form, setForm] = useState({
    name:     "",
    mobile:   "",
    type:     defaultType,
    showroom: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  // ✅ Sync enquiry type pill when the parent changes defaultType (e.g. "Test Drive" button).
  // This is pure React state — no scrolling, no focus, no side-effects.
  useEffect(() => {
    setForm(f => ({ ...f, type: defaultType }));
  }, [defaultType]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");

    if (!form.name.trim())                          { setError("Please enter your name.");                      return; }
    if (form.mobile.replace(/\D/g, "").length < 10) { setError("Please enter a valid 10-digit mobile number."); return; }
    if (!form.showroom)                             { setError("Please select a preferred showroom.");           return; }

    setLoading(true);
    fbTrack("OfferEnquirySubmit", {
      content_name: offer.model,
      offer_id:     offer.id,
      type:         form.type,
    });

    try {
      const res = await fetch("/api/enquiry", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          name:     form.name,
          mobile:   form.mobile,
          car:      offer.model,
          variant:  offer.variantLabel ?? "",
          type:     form.type,
          showroom: form.showroom,
          source:   `garud-tata-offer-detail | ${offer.id}`,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Submission failed. Please try again.");
      setSubmitted(true);
      fbTrack("Lead", { content_name: offer.model, offer_id: offer.id });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [form, loading, offer]);

  const submitLabel = form.type === "Test Drive" ? "BOOK TEST DRIVE" : "GET MY OFFER";

  return (
    /*
     * ✅ NO id="enquiry" — removing the id prevents any href="#enquiry" anchor
     *    or router.push("#enquiry") elsewhere in the app from causing a page jump.
     *
     * ✅ scroll-mt-20 is kept for the case where the user manually clicks a same-page
     *    anchor; it only affects browser-native anchor scrolls, not programmatic ones.
     *    If you have NO anchor links pointing here you can remove scroll-mt-20 too.
     */
    <section className="bg-[#F8FAFC] py-16 sm:py-20 lg:py-28 px-5 lg:px-12 text-slate-900 border-t border-slate-200/70">
      <div className="max-w-[640px] mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <span className="text-[11px] font-bold tracking-[0.22em] text-[#0055A5] uppercase mb-3 block">
            GARUD TATA · ENQUIRY
          </span>
          <h2 className="text-slate-900 font-extrabold text-[clamp(1.6rem,5vw,2.5rem)] tracking-tight leading-[1.05] mb-3">
            Interested in the {offer.model}?
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
                Thank you for your interest in the {offer.model}. Our Garud Tata team will contact you shortly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="tel:+919217371204"
                  className="flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] rounded-full bg-[#0055A5] text-white font-bold text-[12.5px] tracking-[0.06em] transition-colors hover:bg-[#004080] shadow-sm"
                >
                  CALL NOW
                </a>
                <a
                  href="https://wa.me/919217371204"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-7 py-3.5 min-h-[48px] rounded-full bg-slate-100 border border-slate-300 text-slate-800 font-semibold text-[12.5px] tracking-[0.04em] transition-colors hover:bg-slate-200"
                >
                  WHATSAPP US
                </a>
              </div>
            </motion.div>

          ) : (
            /* ── Form state ── */
            /*
             * ✅ noValidate — we handle validation ourselves so the browser never
             *    auto-focuses an invalid field (which would scroll to it).
             * ✅ No <input autoFocus> anywhere below.
             */
            <form onSubmit={handleSubmit} noValidate className="space-y-4">

              {/* Pre-filled car chip */}
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 bg-[#0055A5]/[0.06] border border-[#0055A5]/20 rounded-xl px-4 py-3"
              >
                <CheckCircle2 size={16} className="text-[#0055A5] flex-shrink-0" />
                <div className="min-w-0 text-[12.5px]">
                  <span className="text-slate-900 font-bold">{offer.model}</span>
                  {offer.variantLabel && (
                    <span className="text-slate-600"> · {offer.variantLabel}</span>
                  )}
                  <span className="text-slate-400"> — pre-filled</span>
                </div>
              </motion.div>

              {/* Name */}
              <div>
                <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your full name"
                  className={fieldClass}
                  // ✅ No autoFocus — browser would scroll to this field on mount
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  inputMode="numeric"
                  autoComplete="tel"
                  maxLength={15}
                  value={form.mobile}
                  onChange={e => setForm(f => ({ ...f, mobile: e.target.value }))}
                  placeholder="+91 00000 00000"
                  className={fieldClass}
                />
              </div>

              {/* Interested car + variant (read-only display) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">
                    Interested Car
                  </label>
                  <div className={`${fieldClass} text-slate-700 bg-slate-100 border-slate-200 cursor-default flex items-center`}>
                    {offer.model}
                  </div>
                </div>
                {offer.variantLabel && (
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">
                      Variant
                    </label>
                    <div className={`${fieldClass} text-slate-700 bg-slate-100 border-slate-200 cursor-default flex items-center`}>
                      {offer.variantLabel}
                    </div>
                  </div>
                )}
              </div>

              {/* Enquiry type pills */}
              <div>
                <label className="block text-[11px] text-slate-500 mb-1.5 tracking-[0.16em] uppercase font-bold">
                  Enquiry Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {ENQUIRY_TYPES.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, type: t }))}
                      className={`px-3.5 py-2.5 rounded-lg text-[12px] font-bold tracking-[0.03em] min-h-[40px] border transition-all duration-150
                        ${form.type === t
                          ? "bg-[#0055A5] border-[#0055A5] text-white shadow-sm"
                          : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300"
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Showroom select */}
              <Select
                label="Preferred Showroom *"
                value={form.showroom}
                onChange={v => setForm(f => ({ ...f, showroom: v }))}
                options={SHOWROOMS}
                placeholder="Select a showroom"
              />

              {/* Inline error */}
              {error && (
                <p role="alert" className="text-red-600 text-[13px] font-medium leading-snug">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 min-h-[52px] rounded-xl mt-1 bg-[#0055A5] hover:bg-[#004080] disabled:opacity-55 disabled:cursor-not-allowed text-white font-extrabold text-[13.5px] tracking-[0.08em] shadow-[0_4px_16px_rgba(0,85,165,0.25)] transition-all duration-150 group"
              >
                {loading
                  ? <Loader2 size={18} className="animate-spin" />
                  : (
                    <>
                      {submitLabel}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-150" />
                    </>
                  )
                }
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