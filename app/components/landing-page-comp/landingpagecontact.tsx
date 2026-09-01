



// // garud-tata\app\components\landing-page-comp\landingpagecontact.tsx


// "use client";

// import {
//   useRef, useState, useCallback, type FormEvent, type ReactNode,
// } from "react";
// import {
//   motion, useInView, useReducedMotion, AnimatePresence,
// } from "framer-motion";
// import {
//   Phone, Mail, Car, Wrench, MessageSquare, Star,
//   ArrowRight, Loader2, CheckCircle2, Building2, AlertCircle,
// } from "lucide-react";

// declare global {
//   interface Window {
//     gtag?: (...args: any[]) => void;
//   }
// }

// function trackFormConversion() {
//   window.gtag?.("event", "conversion", {
//     send_to: "AW-18209967669/BPu-CPPRseocELWcmOtD",
//     value: 1.0,
//     currency: "INR",
//   });
// }

// /* ══════════════════════════════════════════════════════════════════════
//    CONSTANTS
// ══════════════════════════════════════════════════════════════════════ */
// const SALES_PHONE  = "+91 9217371204";
// const SALES_HREF   = "tel:+919217371205";
// const CDM_EMAIL    = "cdm@garudtata.com";
// const SERVICE_EMAIL= "service@garudtata.com";

// const CARS = [
//   "Tata Sierra", "Tata Harrier", "Tata Safari",
//   "Tata Curvv", "Tata Curvv EV", "Tata Nexon", "Tata Nexon EV",
//   "Tata Punch", "Tata Punch EV", "Tata Altroz",
//   "Tata Tiago", "Tata Tiago EV", "Tata Tigor",
// ] as const;

// const OUTLETS = [
//   "Garud Tata Palam",
//   "Garud Tata Narela",
//   "Garud Tata Najafgarh",
// ] as const;

// const WORKSHOPS = [
//   "Garud Tata Service Centre, Matiala Dwarka",
//   "Garud Tata Service Centre, Najafgarh",
// ] as const;

// const ALL_OUTLETS  = [...OUTLETS, ...WORKSHOPS] as const;

// const SERVICE_TYPES = [
//   "Regular Service", "Accidental Repair", "Mechanical Repair",
//   "Electrical Issue", "Tyres & Wheels", "Accessories Fitment", "Other",
// ] as const;

// /* ══════════════════════════════════════════════════════════════════════
//    TABS
// ══════════════════════════════════════════════════════════════════════ */
// type TabId = "enquiry" | "service" | "complaint" | "feedback";

// const TABS: { id: TabId; label: string; icon: typeof Car }[] = [
//   { id: "enquiry",   label: "Car Enquiry",          icon: Car },
//   { id: "service",   label: "Service Booking",      icon: Wrench },
//   { id: "complaint", label: "Complaints / Queries", icon: MessageSquare },
//   { id: "feedback",  label: "Feedback",             icon: Star },
// ];

// /* ══════════════════════════════════════════════════════════════════════
//    SHARED STYLES
// ══════════════════════════════════════════════════════════════════════ */
// const fieldCls =
//   "w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3.5 min-h-[52px] " +
//   "text-white text-[16px] sm:text-[13.5px] placeholder:text-white/25 " +
//   "focus:outline-none focus:border-[#0055A5]/65 focus:bg-[#0055A5]/[0.07] " +
//   "transition-colors duration-200 appearance-none";

// const labelCls =
//   "block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold";

// /* ══════════════════════════════════════════════════════════════════════
//    HELPERS
// ══════════════════════════════════════════════════════════════════════ */
// function FieldLabel({ children }: { children: ReactNode }) {
//   return <label className={labelCls}>{children}</label>;
// }

// function NativeSelect({
//   value, onChange, options, placeholder,
// }: {
//   value: string; onChange: (v: string) => void;
//   options: readonly string[]; placeholder: string;
// }) {
//   return (
//     <div className="relative">
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className={`${fieldCls} pr-10 ${!value ? "text-white/25" : "text-white"}`}
//       >
//         <option value="" disabled className="bg-[#132035] text-white/50">{placeholder}</option>
//         {options.map((o) => (
//           <option key={o} value={o} className="bg-[#132035] text-white">{o}</option>
//         ))}
//       </select>
//       <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30">
//         <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//           <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//       </span>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════
//    STAR RATING
// ══════════════════════════════════════════════════════════════════════ */
// function StarRating({ value, onChange }: { value: number; onChange: (n: number) => void }) {
//   const [hover, setHover] = useState(0);
//   return (
//     <div className="flex gap-1.5">
//       {[1, 2, 3, 4, 5].map((n) => (
//         <button
//           key={n}
//           type="button"
//           onClick={() => onChange(n)}
//           onMouseEnter={() => setHover(n)}
//           onMouseLeave={() => setHover(0)}
//           aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
//           className="transition-transform duration-100 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0055A5] rounded"
//         >
//           <Star
//             size={26}
//             strokeWidth={1.8}
//             className={`transition-colors duration-100 ${
//               n <= (hover || value)
//                 ? "fill-amber-400 text-amber-400"
//                 : "text-white/20"
//             }`}
//           />
//         </button>
//       ))}
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════
//    SUCCESS STATE
// ══════════════════════════════════════════════════════════════════════ */
// function SuccessState({ message, onReset }: { message: string; onReset: () => void }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.97 }}
//       animate={{ opacity: 1, scale: 1 }}
//       className="py-10 text-center"
//     >
//       <div className="w-14 h-14 rounded-full bg-[#0055A5]/18 border border-[#0055A5]/35 flex items-center justify-center mx-auto mb-5">
//         <CheckCircle2 size={28} className="text-[#7DB8F7]" />
//       </div>
//       <h4 className="text-white font-extrabold text-[1.3rem] tracking-tight mb-2">Submitted!</h4>
//       <p className="text-white/42 text-[13.5px] leading-relaxed mb-8 max-w-xs mx-auto">{message}</p>
//       <button
//         type="button"
//         onClick={onReset}
//         className="px-6 py-3 rounded-full bg-white/[0.07] border border-white/[0.14] text-white/70 hover:text-white font-semibold text-[12.5px] transition-colors"
//       >
//         Submit Another
//       </button>
//     </motion.div>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════
//    SUBMIT BUTTON
// ══════════════════════════════════════════════════════════════════════ */
// function SubmitBtn({ loading, label = "Submit" }: { loading: boolean; label?: string }) {
//   return (
//     <button
//       type="submit"
//       disabled={loading}
//       className="w-full flex items-center justify-center gap-2 py-4 rounded-xl min-h-[52px] bg-[#0055A5] hover:bg-[#1A70D4] active:bg-[#1A70D4] disabled:opacity-55 disabled:cursor-not-allowed text-white font-extrabold text-[13.5px] tracking-[0.08em] shadow-[0_6px_24px_rgba(0,85,165,0.38)] transition-colors duration-150 group"
//     >
//       {loading ? (
//         <Loader2 size={18} className="animate-spin" />
//       ) : (
//         <>
//           {label}
//           <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-150" />
//         </>
//       )}
//     </button>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════
//    FORM 1 — CAR ENQUIRY
// ══════════════════════════════════════════════════════════════════════ */
// function CarEnquiryForm() {
//   const init = { name: "", email: "", mobile: "", model: "", outlet: "" };
//   const [form, setForm] = useState(init);
//   const [loading,   setLoading]   = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [error,     setError]     = useState("");

//   const set = (k: keyof typeof form) => (v: string) =>
//     setForm((p) => ({ ...p, [k]: v }));

//   const handleSubmit = useCallback(async (e: FormEvent) => {
//     e.preventDefault();
//     if (loading) return;
//     setError("");
//     if (!form.name.trim())                           { setError("Please enter your name."); return; }
//     if (form.mobile.replace(/\D/g, "").length < 10)  { setError("Please enter a valid mobile number."); return; }
//     if (!form.model)                                 { setError("Please select a model."); return; }
//     if (!form.outlet)                                { setError("Please select an outlet."); return; }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/contact/enquiry", {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(data?.error ?? "Submission failed.");

//       // Google Ads conversion — fires only after successful submission
//       trackFormConversion();

//       setSubmitted(true);
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   }, [form, loading]);

//   if (submitted) return (
//     <SuccessState
//       message="Your car enquiry has been received. Our team will contact you within 24 hours."
//       onReset={() => { setSubmitted(false); setForm(init); }}
//     />
//   );

//   return (
//     <form onSubmit={handleSubmit} noValidate className="space-y-4">
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div>
//           <FieldLabel>Name *</FieldLabel>
//           <input type="text" required autoComplete="name" value={form.name}
//             onChange={(e) => set("name")(e.target.value)}
//             placeholder="Your full name" className={fieldCls} />
//         </div>
//         <div>
//           <FieldLabel>Email</FieldLabel>
//           <input type="email" autoComplete="email" value={form.email}
//             onChange={(e) => set("email")(e.target.value)}
//             placeholder="your@email.com" className={fieldCls} />
//         </div>
//       </div>
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div>
//           <FieldLabel>Mobile No. *</FieldLabel>
//           <input type="tel" required inputMode="numeric" autoComplete="tel" maxLength={15}
//             value={form.mobile} onChange={(e) => set("mobile")(e.target.value)}
//             placeholder="+91 00000 00000" className={fieldCls} />
//         </div>
//         <div>
//           <FieldLabel>Model *</FieldLabel>
//           <NativeSelect value={form.model} onChange={set("model")} options={CARS} placeholder="Select Model" />
//         </div>
//       </div>
//       <div>
//         <FieldLabel>Outlet *</FieldLabel>
//         <NativeSelect value={form.outlet} onChange={set("outlet")} options={OUTLETS} placeholder="Select Outlet" />
//       </div>
//       {error && <ErrorMsg>{error}</ErrorMsg>}
//       <SubmitBtn loading={loading} label="Submit Enquiry" />
//     </form>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════
//    FORM 2 — SERVICE BOOKING
// ══════════════════════════════════════════════════════════════════════ */
// function ServiceBookingForm() {
//   const init = { name: "", email: "", mobile: "", model: "", outlet: "", serviceType: "", date: "" };
//   const [form, setForm] = useState(init);
//   const [loading,   setLoading]   = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [error,     setError]     = useState("");

//   const set = (k: keyof typeof form) => (v: string) =>
//     setForm((p) => ({ ...p, [k]: v }));

//   const minDate = (() => {
//     const d = new Date(); d.setDate(d.getDate() + 1);
//     return d.toISOString().split("T")[0];
//   })();

//   const handleSubmit = useCallback(async (e: FormEvent) => {
//     e.preventDefault();
//     if (loading) return;
//     setError("");
//     if (!form.name.trim())                           { setError("Please enter your name."); return; }
//     if (form.mobile.replace(/\D/g, "").length < 10)  { setError("Please enter a valid mobile number."); return; }
//     if (!form.model)                                 { setError("Please select a model."); return; }
//     if (!form.outlet)                                { setError("Please select an outlet."); return; }
//     if (!form.serviceType)                           { setError("Please select a service type."); return; }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/contact/service", {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(data?.error ?? "Submission failed.");

//       trackFormConversion();

//       setSubmitted(true);
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   }, [form, loading]);

//   if (submitted) return (
//     <SuccessState
//       message="Your service booking request has been received. We'll confirm your slot within 24 hours."
//       onReset={() => { setSubmitted(false); setForm(init); }}
//     />
//   );

//   return (
//     <form onSubmit={handleSubmit} noValidate className="space-y-4">
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div>
//           <FieldLabel>Name *</FieldLabel>
//           <input type="text" required autoComplete="name" value={form.name}
//             onChange={(e) => set("name")(e.target.value)}
//             placeholder="Your full name" className={fieldCls} />
//         </div>
//         <div>
//           <FieldLabel>Email</FieldLabel>
//           <input type="email" autoComplete="email" value={form.email}
//             onChange={(e) => set("email")(e.target.value)}
//             placeholder="your@email.com" className={fieldCls} />
//         </div>
//       </div>
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div>
//           <FieldLabel>Mobile No. *</FieldLabel>
//           <input type="tel" required inputMode="numeric" autoComplete="tel" maxLength={15}
//             value={form.mobile} onChange={(e) => set("mobile")(e.target.value)}
//             placeholder="+91 00000 00000" className={fieldCls} />
//         </div>
//         <div>
//           <FieldLabel>Model *</FieldLabel>
//           <NativeSelect value={form.model} onChange={set("model")} options={CARS} placeholder="Select Model" />
//         </div>
//       </div>
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div>
//           <FieldLabel>Outlet *</FieldLabel>
//           <NativeSelect value={form.outlet} onChange={set("outlet")} options={ALL_OUTLETS} placeholder="Select Outlet" />
//         </div>
//         <div>
//           <FieldLabel>Service Type *</FieldLabel>
//           <NativeSelect value={form.serviceType} onChange={set("serviceType")} options={SERVICE_TYPES} placeholder="Select Service Type" />
//         </div>
//       </div>
//       <div>
//         <FieldLabel>Preferred Date</FieldLabel>
//         <input type="date" min={minDate} value={form.date}
//           onChange={(e) => set("date")(e.target.value)}
//           className={`${fieldCls} text-white/70`} />
//       </div>
//       {error && <ErrorMsg>{error}</ErrorMsg>}
//       <SubmitBtn loading={loading} label="Book Service" />
//     </form>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════
//    FORM 3 — COMPLAINTS / QUERIES
// ══════════════════════════════════════════════════════════════════════ */
// function ComplaintForm() {
//   const init = { name: "", email: "", mobile: "", outlet: "", query: "" };
//   const [form, setForm] = useState(init);
//   const [loading,   setLoading]   = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [error,     setError]     = useState("");

//   const set = (k: keyof typeof form) => (v: string) =>
//     setForm((p) => ({ ...p, [k]: v }));

//   const handleSubmit = useCallback(async (e: FormEvent) => {
//     e.preventDefault();
//     if (loading) return;
//     setError("");
//     if (!form.name.trim())                           { setError("Please enter your name."); return; }
//     if (form.mobile.replace(/\D/g, "").length < 10)  { setError("Please enter your name."); return; }
//     if (!form.outlet)                                { setError("Please select an outlet."); return; }
//     if (!form.query.trim())                          { setError("Please describe your query."); return; }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/contact/complaint", {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(data?.error ?? "Submission failed.");

//       trackFormConversion();

//       setSubmitted(true);
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   }, [form, loading]);

//   if (submitted) return (
//     <SuccessState
//       message="Your complaint / query has been registered. Our team will get back to you within 48 hours."
//       onReset={() => { setSubmitted(false); setForm(init); }}
//     />
//   );

//   return (
//     <form onSubmit={handleSubmit} noValidate className="space-y-4">
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div>
//           <FieldLabel>Name *</FieldLabel>
//           <input type="text" required autoComplete="name" value={form.name}
//             onChange={(e) => set("name")(e.target.value)}
//             placeholder="Your full name" className={fieldCls} />
//         </div>
//         <div>
//           <FieldLabel>Email</FieldLabel>
//           <input type="email" autoComplete="email" value={form.email}
//             onChange={(e) => set("email")(e.target.value)}
//             placeholder="your@email.com" className={fieldCls} />
//         </div>
//       </div>
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div>
//           <FieldLabel>Mobile No. *</FieldLabel>
//           <input type="tel" required inputMode="numeric" autoComplete="tel" maxLength={15}
//             value={form.mobile} onChange={(e) => set("mobile")(e.target.value)}
//             placeholder="+91 00000 00000" className={fieldCls} />
//         </div>
//         <div>
//           <FieldLabel>Outlet *</FieldLabel>
//           <NativeSelect value={form.outlet} onChange={set("outlet")} options={ALL_OUTLETS} placeholder="Select Outlet" />
//         </div>
//       </div>
//       <div>
//         <FieldLabel>Your Query *</FieldLabel>
//         <textarea required rows={4} value={form.query}
//           onChange={(e) => set("query")(e.target.value)}
//           placeholder="Describe your complaint or query in detail…"
//           className={`${fieldCls} resize-none min-h-[110px]`} />
//       </div>
//       {error && <ErrorMsg>{error}</ErrorMsg>}
//       <SubmitBtn loading={loading} label="Submit Query" />
//     </form>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════
//    FORM 4 — FEEDBACK
// ══════════════════════════════════════════════════════════════════════ */
// function FeedbackForm() {
//   const init = { name: "", email: "", mobile: "", outlet: "", rating: 0, feedback: "" };
//   const [form, setForm] = useState(init);
//   const [loading,   setLoading]   = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [error,     setError]     = useState("");

//   const set = (k: keyof typeof form) => (v: string | number) =>
//     setForm((p) => ({ ...p, [k]: v }));

//   const handleSubmit = useCallback(async (e: FormEvent) => {
//     e.preventDefault();
//     if (loading) return;
//     setError("");
//     if (!form.name.trim())                           { setError("Please enter your name."); return; }
//     if (form.mobile.replace(/\D/g, "").length < 10)  { setError("Please enter a valid mobile number."); return; }
//     if (!form.outlet)                                { setError("Please select an outlet."); return; }
//     if (!form.rating)                                { setError("Please select a rating."); return; }
//     if (!form.feedback.trim())                       { setError("Please enter your feedback."); return; }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/contact/feedback", {
//         method: "POST", headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(data?.error ?? "Submission failed.");

//       trackFormConversion();

//       setSubmitted(true);
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   }, [form, loading]);

//   if (submitted) return (
//     <SuccessState
//       message="Thank you for your feedback! It helps us serve you better."
//       onReset={() => { setSubmitted(false); setForm(init); }}
//     />
//   );

//   return (
//     <form onSubmit={handleSubmit} noValidate className="space-y-4">
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div>
//           <FieldLabel>Name *</FieldLabel>
//           <input type="text" required autoComplete="name" value={form.name}
//             onChange={(e) => set("name")(e.target.value)}
//             placeholder="Your full name" className={fieldCls} />
//         </div>
//         <div>
//           <FieldLabel>Email</FieldLabel>
//           <input type="email" autoComplete="email" value={form.email}
//             onChange={(e) => set("email")(e.target.value)}
//             placeholder="your@email.com" className={fieldCls} />
//         </div>
//       </div>
//       <div className="grid sm:grid-cols-2 gap-4">
//         <div>
//           <FieldLabel>Mobile No. *</FieldLabel>
//           <input type="tel" required inputMode="numeric" autoComplete="tel" maxLength={15}
//             value={form.mobile} onChange={(e) => set("mobile")(e.target.value)}
//             placeholder="+91 00000 00000" className={fieldCls} />
//         </div>
//         <div>
//           <FieldLabel>Outlet *</FieldLabel>
//           <NativeSelect value={form.outlet} onChange={set("outlet")} options={ALL_OUTLETS} placeholder="Select Outlet" />
//         </div>
//       </div>
//       <div>
//         <FieldLabel>Rating *</FieldLabel>
//         <StarRating value={form.rating} onChange={(n) => set("rating")(n)} />
//       </div>
//       <div>
//         <FieldLabel>Your Feedback *</FieldLabel>
//         <textarea required rows={4} value={form.feedback}
//           onChange={(e) => set("feedback")(e.target.value)}
//           placeholder="Share your experience with Garud Tata…"
//           className={`${fieldCls} resize-none min-h-[110px]`} />
//       </div>
//       {error && <ErrorMsg>{error}</ErrorMsg>}
//       <SubmitBtn loading={loading} label="Submit Feedback" />
//     </form>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════
//    ERROR MSG
// ══════════════════════════════════════════════════════════════════════ */
// function ErrorMsg({ children }: { children: ReactNode }) {
//   return (
//     <motion.p
//       initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
//       role="alert"
//       className="flex items-center gap-2 text-red-400 text-[12.5px] leading-snug"
//     >
//       <AlertCircle size={13} className="flex-shrink-0" />
//       {children}
//     </motion.p>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════
//    CONTACT INFO SIDEBAR
// ══════════════════════════════════════════════════════════════════════ */
// function ContactSidebar() {
//   return (
//     <div className="space-y-3">
//       {/* Sales phone */}
//       <a
//         href={SALES_HREF}
//         className="group flex items-center gap-4 p-4 sm:p-5 bg-[#102030] border border-white/[0.07] rounded-2xl hover:border-[#0055A5]/40 hover:bg-[#0055A5]/[0.08] transition-all duration-200"
//       >
//         <div className="w-11 h-11 rounded-xl bg-[#0055A5]/15 border border-[#0055A5]/25 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0055A5]/25 transition-colors">
//           <Phone size={18} className="text-[#5BA3E8]" strokeWidth={2} />
//         </div>
//         <div>
//           <p className="text-[9.5px] font-bold tracking-[0.18em] text-white/30 uppercase mb-0.5">Sales</p>
//           <p className="text-white font-bold text-[14px]">{SALES_PHONE}</p>
//         </div>
//       </a>

//       {/* CDM email */}
//       <a
//         href={`mailto:${CDM_EMAIL}`}
//         className="group flex items-center gap-4 p-4 sm:p-5 bg-[#102030] border border-white/[0.07] rounded-2xl hover:border-[#0055A5]/40 hover:bg-[#0055A5]/[0.08] transition-all duration-200"
//       >
//         <div className="w-11 h-11 rounded-xl bg-[#0055A5]/15 border border-[#0055A5]/25 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0055A5]/25 transition-colors">
//           <Mail size={18} className="text-[#5BA3E8]" strokeWidth={2} />
//         </div>
//         <div className="min-w-0">
//           <p className="text-[9.5px] font-bold tracking-[0.18em] text-white/30 uppercase mb-0.5">Email ID</p>
//           <p className="text-white font-bold text-[13.5px] truncate">{CDM_EMAIL}</p>
//         </div>
//       </a>

//       {/* Service email */}
//       <a
//         href={`mailto:${SERVICE_EMAIL}`}
//         className="group flex items-center gap-4 p-4 sm:p-5 bg-[#102030] border border-white/[0.07] rounded-2xl hover:border-amber-500/30 hover:bg-amber-500/[0.05] transition-all duration-200"
//       >
//         <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center flex-shrink-0">
//           <Wrench size={16} className="text-amber-400" strokeWidth={2} />
//         </div>
//         <div className="min-w-0">
//           <p className="text-[9.5px] font-bold tracking-[0.18em] text-white/30 uppercase mb-0.5">Service Email</p>
//           <p className="text-white font-bold text-[13.5px] truncate">{SERVICE_EMAIL}</p>
//         </div>
//       </a>

//       {/* Divider */}
//       <div className="h-px bg-white/[0.06] my-1" />

//       {/* Quick links */}
//       <a
//         href="#showroom"
//         className="flex items-center justify-between gap-3 px-5 py-3.5 min-h-[48px] rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.16] text-white/60 hover:text-white font-semibold text-[12.5px] tracking-[0.05em] transition-all duration-150 group"
//       >
//         <span className="flex items-center gap-2.5">
//           <Building2 size={14} className="text-[#5BA3E8]" />
//           Our Showrooms
//         </span>
//         <ArrowRight size={13} className="text-white/25 group-hover:translate-x-0.5 transition-transform" />
//       </a>
//       <a
//         href="#showroom"
//         onClick={() => {/* could dispatch a tab-switch event */}}
//         className="flex items-center justify-between gap-3 px-5 py-3.5 min-h-[48px] rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.16] text-white/60 hover:text-white font-semibold text-[12.5px] tracking-[0.05em] transition-all duration-150 group"
//       >
//         <span className="flex items-center gap-2.5">
//           <Wrench size={14} className="text-amber-400" />
//           Our Workshops
//         </span>
//         <ArrowRight size={13} className="text-white/25 group-hover:translate-x-0.5 transition-transform" />
//       </a>

//       <p className="text-[10.5px] text-white/18 text-center pt-1 leading-relaxed">
//         We respond within 24 hours. Mon – Sun · 10 AM – 7 PM
//       </p>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════════════════════════
//    MAIN EXPORT
// ══════════════════════════════════════════════════════════════════════ */
// export default function Contact() {
//   const ref    = useRef<HTMLDivElement>(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });
//   const prefersReduced = useReducedMotion();

//   const [activeTab, setActiveTab] = useState<TabId>("enquiry");

//   const FORM_MAP: Record<TabId, ReactNode> = {
//     enquiry:   <CarEnquiryForm />,
//     service:   <ServiceBookingForm />,
//     complaint: <ComplaintForm />,
//     feedback:  <FeedbackForm />,
//   };

//   return (
//     <section
//       id="contact"
//       className="scroll-mt-20 lg:scroll-mt-24 relative bg-[#0D1829] py-16 sm:py-20 lg:py-28 overflow-hidden"
//     >
//       {/* Background */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div
//           className="absolute inset-0 opacity-[0.022]"
//           style={{
//             backgroundImage:
//               "linear-gradient(rgba(255,255,255,0.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.6) 1px,transparent 1px)",
//             backgroundSize: "72px 72px",
//           }}
//         />
//         <div className="hidden sm:block absolute top-[5%] right-[5%] w-[550px] h-[550px] rounded-full bg-[#0055A5]/7 blur-[150px]" />
//         <div className="hidden sm:block absolute bottom-[5%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#1A70D4]/5 blur-[120px]" />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Header */}
//         <div ref={ref} className="text-center mb-10 sm:mb-12">
//           <motion.span
//             initial={prefersReduced ? false : { opacity: 0 }}
//             animate={inView ? { opacity: 1 } : {}}
//             className="text-[10px] font-bold tracking-[0.28em] text-[#7DB8F7] uppercase mb-3 block"
//           >
//             GARUD TATA · CONTACT
//           </motion.span>
//           <motion.h2
//             initial={prefersReduced ? false : { opacity: 0, y: 20 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
//             className="text-white font-extrabold text-[clamp(1.9rem,7vw,3.2rem)] tracking-[-0.02em] leading-[1.04] mb-4"
//           >
//             How Can We Help You?
//           </motion.h2>
//           <motion.p
//             initial={prefersReduced ? false : { opacity: 0 }}
//             animate={inView ? { opacity: 1 } : {}}
//             transition={{ delay: 0.16 }}
//             className="text-white/40 text-[14px] sm:text-[15px] max-w-md mx-auto leading-relaxed"
//           >
//             Reach out for a car enquiry, service booking, complaint, or share your feedback.
//           </motion.p>
//         </div>

//         <div className="grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px] gap-8 xl:gap-12 items-start">

//           {/* LEFT — Tabbed form card */}
//           <motion.div
//             initial={prefersReduced ? false : { opacity: 0, y: 24 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ delay: 0.2, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
//             className="bg-[#102030] border border-white/[0.07] rounded-3xl overflow-hidden"
//           >
//             {/* Tab bar */}
//             <div className="flex border-b border-white/[0.07] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//               {TABS.map((t) => {
//                 const active = activeTab === t.id;
//                 return (
//                   <button
//                     key={t.id}
//                     onClick={() => setActiveTab(t.id)}
//                     className={`relative flex items-center gap-2 px-4 sm:px-5 py-4 text-[12px] sm:text-[12.5px] font-bold tracking-[0.05em] whitespace-nowrap flex-shrink-0 transition-colors duration-150 min-h-[52px] ${
//                       active ? "text-white" : "text-white/35 hover:text-white/65"
//                     }`}
//                   >
//                     <t.icon size={13} strokeWidth={2.2} />
//                     <span className="hidden sm:inline">{t.label}</span>
//                     <span className="sm:hidden">{t.label.split(" ")[0]}</span>
//                     {active && (
//                       <motion.span
//                         layoutId="contact-tab-underline"
//                         transition={{ type: "spring", stiffness: 420, damping: 36 }}
//                         className="absolute inset-x-0 bottom-0 h-[2px] bg-[#0055A5] rounded-full"
//                       />
//                     )}
//                   </button>
//                 );
//               })}
//             </div>

//             {/* Form area */}
//             <div className="p-5 sm:p-6 lg:p-8">
//               <AnimatePresence mode="wait">
//                 <motion.div
//                   key={activeTab}
//                   initial={prefersReduced ? false : { opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
//                 >
//                   {FORM_MAP[activeTab]}
//                 </motion.div>
//               </AnimatePresence>
//             </div>
//           </motion.div>

//           {/* RIGHT — Sidebar */}
//           <motion.div
//             initial={prefersReduced ? false : { opacity: 0, x: 20 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ delay: 0.28, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
//           >
//             <ContactSidebar />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }






















// "use client";

// import { useState, useCallback, type FormEvent } from "react";
// import { Car, Bike, Loader2, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

// /* ══════════════════════════════════════════════════════
//    CONSTANTS
// ══════════════════════════════════════════════════════ */
// const CARS = [
//   "Tata Sierra", "Tata Harrier", "Tata Safari",
//   "Tata Curvv", "Tata Curvv EV", "Tata Nexon", "Tata Nexon EV",
//   "Tata Punch", "Tata Punch EV", "Tata Altroz",
//   "Tata Tiago", "Tata Tiago EV", "Tata Tigor",
// ] as const;

// const OUTLETS = [
//   "Garud Tata Palam",
//   "Garud Tata Narela",
//   "Garud Tata Najafgarh",
// ] as const;

// /* ══════════════════════════════════════════════════════
//    SHARED STYLES
// ══════════════════════════════════════════════════════ */
// const fieldCls =
//   "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-[14px] " +
//   "placeholder:text-gray-350 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 " +
//   "transition-all duration-150 appearance-none";

// /* ══════════════════════════════════════════════════════
//    SELECT
// ══════════════════════════════════════════════════════ */
// function Select({
//   value, onChange, options, placeholder,
// }: {
//   value: string; onChange: (v: string) => void;
//   options: readonly string[]; placeholder: string;
// }) {
//   return (
//     <div className="relative">
//       <select
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         className={`${fieldCls} pr-10 ${!value ? "text-gray-400" : "text-gray-900"}`}
//       >
//         <option value="" disabled>{placeholder}</option>
//         {options.map((o) => (
//           <option key={o} value={o}>{o}</option>
//         ))}
//       </select>
//       <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
//         <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
//           <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//       </span>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════════
//    ERROR
// ══════════════════════════════════════════════════════ */
// function ErrorMsg({ children }: { children: string }) {
//   return (
//     <p className="flex items-center gap-1.5 text-red-500 text-[12.5px]">
//       <AlertCircle size={13} className="flex-shrink-0" />
//       {children}
//     </p>
//   );
// }

// /* ══════════════════════════════════════════════════════
//    SUCCESS
// ══════════════════════════════════════════════════════ */
// function SuccessState({ message, onReset }: { message: string; onReset: () => void }) {
//   return (
//     <div className="py-10 text-center">
//       <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-4">
//         <CheckCircle2 size={26} className="text-blue-600" />
//       </div>
//       <h4 className="text-gray-900 font-bold text-lg mb-1.5">Submitted!</h4>
//       <p className="text-gray-500 text-[13.5px] leading-relaxed mb-7 max-w-xs mx-auto">{message}</p>
//       <button
//         type="button"
//         onClick={onReset}
//         className="px-6 py-2.5 rounded-full border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300 font-medium text-[13px] transition-colors"
//       >
//         Submit another
//       </button>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════════
//    SUBMIT BUTTON
// ══════════════════════════════════════════════════════ */
// function SubmitBtn({ loading, label }: { loading: boolean; label: string }) {
//   return (
//     <button
//       type="submit"
//       disabled={loading}
//       className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-[13.5px] transition-colors duration-150 group shadow-sm"
//     >
//       {loading
//         ? <Loader2 size={17} className="animate-spin" />
//         : <>{label}<ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" /></>
//       }
//     </button>
//   );
// }

// /* ══════════════════════════════════════════════════════
//    CAR ENQUIRY FORM
// ══════════════════════════════════════════════════════ */
// function CarEnquiryForm() {
//   const init = { name: "", mobile: "", model: "", outlet: "" };
//   const [form, setForm] = useState(init);
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState("");

//   const set = (k: keyof typeof form) => (v: string) =>
//     setForm((p) => ({ ...p, [k]: v }));

//   const handleSubmit = useCallback(async (e: FormEvent) => {
//     e.preventDefault();
//     if (loading) return;
//     setError("");
//     if (!form.name.trim())                          { setError("Please enter your name."); return; }
//     if (form.mobile.replace(/\D/g, "").length < 10) { setError("Please enter a valid mobile number."); return; }
//     if (!form.model)                                { setError("Please select a model."); return; }
//     if (!form.outlet)                               { setError("Please select an outlet."); return; }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/contact/enquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(data?.error ?? "Submission failed.");
//       setSubmitted(true);
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   }, [form, loading]);

//   if (submitted) return (
//     <SuccessState
//       message="Your enquiry is received. Our team will call you within 24 hours."
//       onReset={() => { setSubmitted(false); setForm(init); }}
//     />
//   );

//   return (
//     <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
//       <div className="grid sm:grid-cols-2 gap-3.5">
//         <div>
//           <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">Name *</label>
//           <input type="text" required autoComplete="name" value={form.name}
//             onChange={(e) => set("name")(e.target.value)}
//             placeholder="Your full name" className={fieldCls} />
//         </div>
//         <div>
//           <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">Mobile *</label>
//           <input type="tel" required inputMode="numeric" autoComplete="tel" maxLength={15}
//             value={form.mobile} onChange={(e) => set("mobile")(e.target.value)}
//             placeholder="+91 00000 00000" className={fieldCls} />
//         </div>
//       </div>
//       <div className="grid sm:grid-cols-2 gap-3.5">
//         <div>
//           <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">Model *</label>
//           <Select value={form.model} onChange={set("model")} options={CARS} placeholder="Select model" />
//         </div>
//         <div>
//           <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">Outlet *</label>
//           <Select value={form.outlet} onChange={set("outlet")} options={OUTLETS} placeholder="Select outlet" />
//         </div>
//       </div>
//       {error && <ErrorMsg>{error}</ErrorMsg>}
//       <SubmitBtn loading={loading} label="Send Enquiry" />
//     </form>
//   );
// }

// /* ══════════════════════════════════════════════════════
//    TEST DRIVE FORM
// ══════════════════════════════════════════════════════ */
// function TestDriveForm() {
//   const init = { name: "", mobile: "", model: "", outlet: "", date: "" };
//   const [form, setForm] = useState(init);
//   const [loading, setLoading] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [error, setError] = useState("");

//   const set = (k: keyof typeof form) => (v: string) =>
//     setForm((p) => ({ ...p, [k]: v }));

//   const minDate = (() => {
//     const d = new Date(); d.setDate(d.getDate() + 1);
//     return d.toISOString().split("T")[0];
//   })();

//   const handleSubmit = useCallback(async (e: FormEvent) => {
//     e.preventDefault();
//     if (loading) return;
//     setError("");
//     if (!form.name.trim())                          { setError("Please enter your name."); return; }
//     if (form.mobile.replace(/\D/g, "").length < 10) { setError("Please enter a valid mobile number."); return; }
//     if (!form.model)                                { setError("Please select a model."); return; }
//     if (!form.outlet)                               { setError("Please select an outlet."); return; }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/contact/testdrive", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(data?.error ?? "Submission failed.");
//       setSubmitted(true);
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   }, [form, loading]);

//   if (submitted) return (
//     <SuccessState
//       message="Test drive booked! We'll confirm your slot and call you within 24 hours."
//       onReset={() => { setSubmitted(false); setForm(init); }}
//     />
//   );

//   return (
//     <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
//       <div className="grid sm:grid-cols-2 gap-3.5">
//         <div>
//           <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">Name *</label>
//           <input type="text" required autoComplete="name" value={form.name}
//             onChange={(e) => set("name")(e.target.value)}
//             placeholder="Your full name" className={fieldCls} />
//         </div>
//         <div>
//           <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">Mobile *</label>
//           <input type="tel" required inputMode="numeric" autoComplete="tel" maxLength={15}
//             value={form.mobile} onChange={(e) => set("mobile")(e.target.value)}
//             placeholder="+91 00000 00000" className={fieldCls} />
//         </div>
//       </div>
//       <div className="grid sm:grid-cols-2 gap-3.5">
//         <div>
//           <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">Model *</label>
//           <Select value={form.model} onChange={set("model")} options={CARS} placeholder="Select model" />
//         </div>
//         <div>
//           <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">Outlet *</label>
//           <Select value={form.outlet} onChange={set("outlet")} options={OUTLETS} placeholder="Select outlet" />
//         </div>
//       </div>
//       <div>
//         <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">Preferred Date</label>
//         <input type="date" min={minDate} value={form.date}
//           onChange={(e) => set("date")(e.target.value)}
//           className={fieldCls} />
//       </div>
//       {error && <ErrorMsg>{error}</ErrorMsg>}
//       <SubmitBtn loading={loading} label="Book Test Drive" />
//     </form>
//   );
// }

// /* ══════════════════════════════════════════════════════
//    MAIN EXPORT
// ══════════════════════════════════════════════════════ */
// type TabId = "enquiry" | "testdrive";

// const TABS: { id: TabId; label: string; icon: typeof Car }[] = [
//   { id: "enquiry",   label: "Car Enquiry",  icon: Car },
//   { id: "testdrive", label: "Test Drive",   icon: Bike },
// ];

// export default function Contact() {
//   const [activeTab, setActiveTab] = useState<TabId>("enquiry");

//   return (
//     <section
//       id="contact"
//       className="scroll-mt-20 lg:scroll-mt-24 bg-gray-50 py-16 sm:py-20 lg:py-24"
//     >
//       <div className="max-w-2xl mx-auto px-4 sm:px-6">

//         {/* Header */}
//         <div className="text-center mb-8">
//           <h2 className="text-gray-900 font-extrabold text-[clamp(1.7rem,5vw,2.5rem)] tracking-tight mb-2">
//             Get in touch
//           </h2>
//           <p className="text-gray-500 text-[14px] leading-relaxed">
//             Enquire about a new car or book a test drive at your nearest outlet.
//           </p>
//         </div>

//         {/* Card */}
//         <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

//           {/* Tabs */}
//           <div className="flex border-b border-gray-100">
//             {TABS.map((t) => {
//               const active = activeTab === t.id;
//               return (
//                 <button
//                   key={t.id}
//                   onClick={() => setActiveTab(t.id)}
//                   className={`relative flex items-center gap-2 px-6 py-4 text-[13px] font-semibold flex-1 justify-center transition-colors duration-150 ${
//                     active ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
//                   }`}
//                 >
//                   <t.icon size={14} strokeWidth={2.2} />
//                   {t.label}
//                   {active && (
//                     <span className="absolute inset-x-0 bottom-0 h-[2px] bg-blue-600 rounded-full" />
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Form */}
//           <div className="p-5 sm:p-7">
//             {activeTab === "enquiry"   && <CarEnquiryForm />}
//             {activeTab === "testdrive" && <TestDriveForm />}
//           </div>
//         </div>

//         <p className="text-center text-gray-400 text-[11.5px] mt-4">
//           We respond within 24 hours · Mon–Sun, 10 AM – 7 PM
//         </p>
//       </div>
//     </section>
//   );
// }

















"use client";

import { useState, useCallback, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Car, Bike, Loader2, AlertCircle, ArrowRight } from "lucide-react";

/* ══════════════════════════════════════════════════════
   CONSTANTS
══════════════════════════════════════════════════════ */
// const CARS = [
//   "Tata Sierra", "Tata Harrier", "Tata Safari",
//   "Tata Curvv", "Tata Curvv EV", "Tata Nexon", "Tata Nexon EV",
//   "Tata Punch", "Tata Punch EV", "Tata Altroz",
//   "Tata Tiago", "Tata Tiago EV", "Tata Tigor",
// ] as const;
const CARS = [
  "Tata Sierra",
  "Tata Sierra EV",
  "Tata Harrier",
  "Tata Safari",
  "Tata Curvv",
  "Tata Curvv EV",
  "Tata Nexon",
  "Tata Nexon EV",
  "Tata Punch",
  "Tata Punch EV",
  "Tata Altroz",
  "Tata Tiago",
  "Tata Tiago EV",
  "Tata Tigor",
] as const;

const OUTLETS = [
  "Garud Tata Palam",
  "Garud Tata Narela",
  "Garud Tata Najafgarh",
] as const;

/* ══════════════════════════════════════════════════════
   SHARED STYLES
══════════════════════════════════════════════════════ */
const fieldCls =
  "w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-[14px] " +
  "placeholder:text-gray-350 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 " +
  "transition-all duration-150 appearance-none";

// Basic email sanity check — only enforced when the user actually types something,
// since the field itself is optional.
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/* ══════════════════════════════════════════════════════
   SELECT
══════════════════════════════════════════════════════ */
function Select({
  value, onChange, options, placeholder,
}: {
  value: string; onChange: (v: string) => void;
  options: readonly string[]; placeholder: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${fieldCls} pr-10 ${!value ? "text-gray-400" : "text-gray-900"}`}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   ERROR
══════════════════════════════════════════════════════ */
function ErrorMsg({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-1.5 text-red-500 text-[12.5px]">
      <AlertCircle size={13} className="flex-shrink-0" />
      {children}
    </p>
  );
}

/* ══════════════════════════════════════════════════════
   SUBMIT BUTTON
══════════════════════════════════════════════════════ */
function SubmitBtn({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-[13.5px] transition-colors duration-150 group shadow-sm"
    >
      {loading
        ? <Loader2 size={17} className="animate-spin" />
        : <>{label}<ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" /></>
      }
    </button>
  );
}

/* ══════════════════════════════════════════════════════
   CAR ENQUIRY FORM
══════════════════════════════════════════════════════ */
function CarEnquiryForm() {
  const router = useRouter();
  const init = { name: "", mobile: "", email: "", model: "", outlet: "" };
  const [form, setForm] = useState(init);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    if (!form.name.trim())                          { setError("Please enter your name."); return; }
    if (form.mobile.replace(/\D/g, "").length < 10) { setError("Please enter a valid mobile number."); return; }
    if (form.email.trim() && !isValidEmail(form.email)) { setError("Please enter a valid email address."); return; }
    if (!form.model)                                { setError("Please select a model."); return; }
    if (!form.outlet)                               { setError("Please select an outlet."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/contact/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Submission failed.");

      // Redirect to a dedicated thank-you page so form conversions are
      // trackable as pageviews (GA4, Meta Pixel, Google Ads, etc.)
     // in TestDriveForm
router.push(
  `/landing-page/thank-you?type=testdrive&model=${encodeURIComponent(form.model)}&outlet=${encodeURIComponent(form.outlet)}`
);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }, [form, loading, router]);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
      <div className="grid sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">Name *</label>
          <input type="text" required autoComplete="name" value={form.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="Your full name" className={fieldCls} />
        </div>
        <div>
          <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">Mobile *</label>
          <input type="tel" required inputMode="numeric" autoComplete="tel" maxLength={15}
            value={form.mobile} onChange={(e) => set("mobile")(e.target.value)}
            placeholder="+91 00000 00000" className={fieldCls} />
        </div>
      </div>
      <div>
        <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">
          Email <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input type="email" autoComplete="email" value={form.email}
          onChange={(e) => set("email")(e.target.value)}
          placeholder="you@example.com" className={fieldCls} />
      </div>
      <div className="grid sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">Model *</label>
          <Select value={form.model} onChange={set("model")} options={CARS} placeholder="Select model" />
        </div>
        <div>
          <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">Outlet *</label>
          <Select value={form.outlet} onChange={set("outlet")} options={OUTLETS} placeholder="Select outlet" />
        </div>
      </div>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <SubmitBtn loading={loading} label="Send Enquiry" />
    </form>
  );
}

/* ══════════════════════════════════════════════════════
   TEST DRIVE FORM
══════════════════════════════════════════════════════ */
function TestDriveForm() {
  const router = useRouter();
  const init = { name: "", mobile: "", email: "", model: "", outlet: "", date: "" };
  const [form, setForm] = useState(init);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const minDate = (() => {
    const d = new Date(); d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  })();

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError("");
    if (!form.name.trim())                          { setError("Please enter your name."); return; }
    if (form.mobile.replace(/\D/g, "").length < 10) { setError("Please enter a valid mobile number."); return; }
    if (form.email.trim() && !isValidEmail(form.email)) { setError("Please enter a valid email address."); return; }
    if (!form.model)                                { setError("Please select a model."); return; }
    if (!form.outlet)                               { setError("Please select an outlet."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/contact/testdrive", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Submission failed.");

      router.push(
        `/thank-you?type=testdrive&model=${encodeURIComponent(form.model)}&outlet=${encodeURIComponent(form.outlet)}`
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setLoading(false);
    }
  }, [form, loading, router]);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
      <div className="grid sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">Name *</label>
          <input type="text" required autoComplete="name" value={form.name}
            onChange={(e) => set("name")(e.target.value)}
            placeholder="Your full name" className={fieldCls} />
        </div>
        <div>
          <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">Mobile *</label>
          <input type="tel" required inputMode="numeric" autoComplete="tel" maxLength={15}
            value={form.mobile} onChange={(e) => set("mobile")(e.target.value)}
            placeholder="+91 00000 00000" className={fieldCls} />
        </div>
      </div>
      <div>
        <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">
          Email <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <input type="email" autoComplete="email" value={form.email}
          onChange={(e) => set("email")(e.target.value)}
          placeholder="you@example.com" className={fieldCls} />
      </div>
      <div className="grid sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">Model *</label>
          <Select value={form.model} onChange={set("model")} options={CARS} placeholder="Select model" />
        </div>
        <div>
          <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">Outlet *</label>
          <Select value={form.outlet} onChange={set("outlet")} options={OUTLETS} placeholder="Select outlet" />
        </div>
      </div>
      <div>
        <label className="block text-gray-600 text-[11.5px] font-semibold mb-1.5">Preferred Date</label>
        <input type="date" min={minDate} value={form.date}
          onChange={(e) => set("date")(e.target.value)}
          className={fieldCls} />
      </div>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <SubmitBtn loading={loading} label="Book Test Drive" />
    </form>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════ */
type TabId = "enquiry" | "testdrive";

const TABS: { id: TabId; label: string; icon: typeof Car }[] = [
  { id: "enquiry",   label: "Car Enquiry",  icon: Car },
  { id: "testdrive", label: "Test Drive",   icon: Bike },
];

export default function Contact() {
  const [activeTab, setActiveTab] = useState<TabId>("enquiry");

  return (
    <section
      id="contact"
      className="scroll-mt-20 lg:scroll-mt-24 bg-gray-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-gray-900 font-extrabold text-[clamp(1.7rem,5vw,2.5rem)] tracking-tight mb-2">
            Get in touch
          </h2>
          <p className="text-gray-500 text-[14px] leading-relaxed">
            Enquire about a new car or book a test drive at your nearest outlet.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            {TABS.map((t) => {
              const active = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`relative flex items-center gap-2 px-6 py-4 text-[13px] font-semibold flex-1 justify-center transition-colors duration-150 ${
                    active ? "text-blue-600" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <t.icon size={14} strokeWidth={2.2} />
                  {t.label}
                  {active && (
                    <span className="absolute inset-x-0 bottom-0 h-[2px] bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Form */}
          <div className="p-5 sm:p-7">
            {activeTab === "enquiry"   && <CarEnquiryForm />}
            {activeTab === "testdrive" && <TestDriveForm />}
          </div>
        </div>

        <p className="text-center text-gray-400 text-[11.5px] mt-4">
          We respond within 24 hours · Mon–Sun, 10 AM – 7 PM
        </p>
      </div>
    </section>
  );
}