// // garud-tata\app\components\landing-page-comp\landingHerosection.tsx


// "use client";



// import { useState, useEffect, useCallback, useRef } from "react";
// import { ChevronLeft, ChevronRight, X, Send, Loader2 } from "lucide-react";

// /* =========================================================
//    SLIDES
// ========================================================= */

// const SLIDES = [
//   {
//     image: "/images/Hero images/Heroimage.avif",
//     model: "Tata Sierra",
//     tagline: "Born to lead.",
//   },
//   {
//     image: "/images/Hero images/harrier-d.avif",
//     model: "Tata Harrier",
//     tagline: "Command every road.",
//   },
//   {
//     image: "/images/Hero images/safari-d.avif",
//     model: "Tata Safari",
//     tagline: "The adventure starts here.",
//   },
//   {
//     image: "/images/Hero images/nexon-d.avif",
//     model: "Tata Nexon",
//     tagline: "Urban. Unstoppable.",
//   },
//   {
//     image: "/images/Hero images/curvv-d.avif",
//     model: "Tata Curvv",
//     tagline: "Sculpted for tomorrow.",
//   },
//   {
//     image: "/images/Hero images/punch-d.avif",
//     model: "Tata Punch",
//     tagline: "Compact. Fearless.",
//   },
//   {
//     image: "/images/Hero images/altroz-d.avif",
//     model: "Tata Altroz",
//     tagline: "Precision in every detail.",
//   },
//   {
//     image: "/images/Hero images/tiago-d.avif",
//     model: "Tata Tiago",
//     tagline: "Smart drives start here.",
//   },
// ];

// const CAR_MODELS = [
//   "Tata Tiago", "Tata Tigor", "Tata Altroz",
//   "Tata Punch", "Tata Nexon", "Tata Curvv",
//   "Tata Harrier", "Tata Safari",
//   "Tata Tiago EV", "Tata Punch EV",
//   "Tata Nexon EV", "Tata Curvv EV", "Tata Harrier EV",
// ];

// /* =========================================================
//    HERO SECTION
// ========================================================= */

// export default function HeroSection() {
//   const [current, setCurrent] = useState(0);
//   const [prev, setPrev] = useState<number | null>(null);
//   const [direction, setDirection] = useState<"left" | "right">("right");
//   const [animating, setAnimating] = useState(false);
//   const [showForm, setShowForm] = useState(false);
//   const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   /* ── Auto-advance ──────────────────────────────────── */
//   const startTimer = useCallback(() => {
//     if (timerRef.current) clearTimeout(timerRef.current);
//     timerRef.current = setTimeout(() => {
//       goTo((c: number) => (c + 1) % SLIDES.length, "right");
//     }, 5000);
//   }, []);

//   useEffect(() => {
//     startTimer();
//     return () => {
//       if (timerRef.current) clearTimeout(timerRef.current);
//     };
//   }, [current, startTimer]);

//   /* ── Navigation ────────────────────────────────────── */
//   const goTo = useCallback(
//     (indexOrUpdater: number | ((c: number) => number), dir: "left" | "right") => {
//       if (animating) return;
//       setAnimating(true);
//       setDirection(dir);
//       setCurrent((c) => {
//         const next = typeof indexOrUpdater === "function" ? indexOrUpdater(c) : indexOrUpdater;
//         setPrev(c);
//         return next;
//       });
//       setTimeout(() => {
//         setPrev(null);
//         setAnimating(false);
//       }, 600);
//     },
//     [animating]
//   );

//   const goPrev = useCallback(() => {
//     goTo((c) => (c - 1 + SLIDES.length) % SLIDES.length, "left");
//     startTimer();
//   }, [goTo, startTimer]);

//   const goNext = useCallback(() => {
//     goTo((c) => (c + 1) % SLIDES.length, "right");
//     startTimer();
//   }, [goTo, startTimer]);

//   const goIndex = useCallback(
//     (i: number) => {
//       if (i === current) return;
//       goTo(i, i > current ? "right" : "left");
//       startTimer();
//     },
//     [current, goTo, startTimer]
//   );

//   const slide = SLIDES[current];
//   const prevSlide = prev !== null ? SLIDES[prev] : null;

//   return (
//     <>
//       <section
//         className="relative w-full overflow-hidden bg-gray-900"
//         style={{ height: "100svh", minHeight: 560 }}
//         aria-label="Garud Tata — hero"
//       >
//         {/* ── Background images ───────────────────────── */}

//         {/* Previous (animating out) */}
//         {prevSlide && (
//           <div
//             key={`prev-${prev}`}
//             className="absolute inset-0"
//             style={{
//               animation: `slideOut${direction === "right" ? "Left" : "Right"} 0.6s cubic-bezier(0.76,0,0.24,1) forwards`,
//             }}
//           >
//             <img
//               src={prevSlide.image}
//               alt={prevSlide.model}
//               className="absolute inset-0 w-full h-full object-cover object-center"
//             />
//             {/* Subtle bottom scrim only — for text legibility */}
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//           </div>
//         )}

//         {/* Current (animating in) */}
//         <div
//           key={`curr-${current}`}
//           className="absolute inset-0"
//           style={{
//             animation: prev !== null
//               ? `slideIn${direction === "right" ? "Right" : "Left"} 0.6s cubic-bezier(0.76,0,0.24,1) forwards`
//               : "none",
//           }}
//         >
//           <img
//             src={slide.image}
//             alt={slide.model}
//             className="absolute inset-0 w-full h-full object-cover object-center"
//             fetchPriority="high"
//           />
//           {/* Subtle bottom scrim only — for text legibility */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//         </div>

//         {/* ── Content ─────────────────────────────────── */}
//         <div className="relative z-10 h-full flex flex-col justify-end pb-14 px-6 sm:px-12 lg:px-20 max-w-[1440px] mx-auto w-full">

//           {/* Model name + tagline */}
//           <div className="mb-8">
//             <p
//               key={`tag-${current}`}
//               className="text-white/70 text-sm font-medium mb-2 tracking-wide"
//               style={{ animation: "fadeSlideUp 0.5s ease forwards" }}
//             >
//               {slide.tagline}
//             </p>
//             <h1
//               key={`model-${current}`}
//               className="font-black leading-none text-white"
//               style={{
//                 fontSize: "clamp(3rem, 9vw, 8rem)",
//                 animation: "fadeSlideUp 0.55s ease 0.05s both forwards",
//               }}
//             >
//               {slide.model}
//             </h1>
//           </div>

//           {/* Bottom row: dots + buttons */}
//           <div className="flex items-center justify-between gap-4 flex-wrap">

//             {/* Slide dots */}
//             <div className="flex items-center gap-2">
//               {SLIDES.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => goIndex(i)}
//                   aria-label={`Go to ${SLIDES[i].model}`}
//                   className="transition-all duration-300 rounded-full focus:outline-none"
//                   style={{
//                     width: i === current ? 32 : 8,
//                     height: 8,
//                     background: i === current ? "#ffffff" : "rgba(255,255,255,0.35)",
//                   }}
//                 />
//               ))}
//             </div>

//             {/* Arrows + CTA */}
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={goPrev}
//                 aria-label="Previous"
//                 className="w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
//               >
//                 <ChevronLeft size={18} />
//               </button>
//               <button
//                 onClick={goNext}
//                 aria-label="Next"
//                 className="w-10 h-10 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
//               >
//                 <ChevronRight size={18} />
//               </button>

//               <button
//                 onClick={() => setShowForm(true)}
//                 className="ml-2 px-6 py-2.5 rounded-full bg-white text-gray-900 text-sm font-bold tracking-wide hover:bg-white/90 transition-colors shadow-md"
//               >
//                 Contact Us
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ── Slide counter ─────────────────────────── */}
//         <div className="absolute top-8 right-8 z-10 text-white/40 text-xs font-mono tabular-nums select-none hidden sm:block">
//           {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
//         </div>
//       </section>

//       {/* ── CSS keyframes ─────────────────────────────── */}
//       <style>{`
//         @keyframes slideInRight {
//           from { transform: translateX(100%); }
//           to   { transform: translateX(0); }
//         }
//         @keyframes slideInLeft {
//           from { transform: translateX(-100%); }
//           to   { transform: translateX(0); }
//         }
//         @keyframes slideOutLeft {
//           from { transform: translateX(0); }
//           to   { transform: translateX(-100%); }
//         }
//         @keyframes slideOutRight {
//           from { transform: translateX(0); }
//           to   { transform: translateX(100%); }
//         }
//         @keyframes fadeSlideUp {
//           from { opacity: 0; transform: translateY(16px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to   { opacity: 1; }
//         }
//         @keyframes scaleIn {
//           from { opacity: 0; transform: scale(0.96) translateY(12px); }
//           to   { opacity: 1; transform: scale(1) translateY(0); }
//         }
//       `}</style>

//       {/* ── Contact form modal ────────────────────────── */}
//       {showForm && (
//         <ContactModal
//           onClose={() => setShowForm(false)}
//           defaultCar={slide.model}
//         />
//       )}
//     </>
//   );
// }

// /* =========================================================
//    CONTACT MODAL
// ========================================================= */

// interface ContactModalProps {
//   onClose: () => void;
//   defaultCar: string;
// }

// function ContactModal({ onClose, defaultCar }: ContactModalProps) {
//   const [form, setForm] = useState({
//     name: "",
//     mobile: "",
//     car: defaultCar,
//     message: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [sent, setSent] = useState(false);
//   const [error, setError] = useState("");

//   /* Close on Escape */
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, [onClose]);

//   /* Lock body scroll */
//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => { document.body.style.overflow = ""; };
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (!form.name.trim()) { setError("Please enter your name."); return; }
//     if (form.mobile.replace(/\D/g, "").length < 10) { setError("Please enter a valid mobile number."); return; }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/enquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...form, source: "hero-contact-modal" }),
//       });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error ?? "Submission failed.");
//       }

//       /* GTM dataLayer event */
//       if (typeof window !== "undefined") {
//         (window as any).dataLayer = (window as any).dataLayer || [];
//         (window as any).dataLayer.push({ event: "lead_form_submit" });
//       }

//       setSent(true);
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     /* Backdrop */
//     <div
//       className="fixed inset-0 z-[100] flex items-center justify-center p-4"
//       style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", animation: "fadeIn 0.2s ease" }}
//       onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
//     >
//       {/* Panel */}
//       <div
//         className="relative w-full max-w-md bg-white border border-gray-200 rounded-2xl p-7 shadow-2xl"
//         style={{ animation: "scaleIn 0.25s ease" }}
//       >
//         {/* Close */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
//           aria-label="Close"
//         >
//           <X size={16} />
//         </button>

//         {sent ? (
//           <div className="py-8 text-center">
//             <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
//               <Send size={24} className="text-gray-700" />
//             </div>
//             <p className="text-gray-900 font-bold text-lg mb-1">We'll be in touch!</p>
//             <p className="text-gray-400 text-sm leading-relaxed">
//               Our team will call you back within 24 hours.
//             </p>
//             <button
//               onClick={onClose}
//               className="mt-6 px-6 py-2.5 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-700 transition-colors"
//             >
//               Done
//             </button>
//           </div>
//         ) : (
//           <>
//             <h2 className="text-gray-900 font-bold text-xl mb-1">Get in touch</h2>
//             <p className="text-gray-400 text-sm mb-6 leading-relaxed">
//               Tell us what you're looking for and we'll get back to you.
//             </p>

//             <form onSubmit={handleSubmit} noValidate className="space-y-4">

//               {/* Name */}
//               <div>
//                 <label className="block text-gray-500 text-xs mb-1.5">Name</label>
//                 <input
//                   type="text"
//                   value={form.name}
//                   onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
//                   placeholder="Your full name"
//                   className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
//                 />
//               </div>

//               {/* Mobile */}
//               <div>
//                 <label className="block text-gray-500 text-xs mb-1.5">Mobile</label>
//                 <input
//                   type="tel"
//                   value={form.mobile}
//                   onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))}
//                   placeholder="+91 00000 00000"
//                   className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
//                 />
//               </div>

//               {/* Car */}
//               <div>
//                 <label className="block text-gray-500 text-xs mb-1.5">Car of interest</label>
//                 <select
//                   value={form.car}
//                   onChange={(e) => setForm((p) => ({ ...p, car: e.target.value }))}
//                   className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-gray-400 transition-colors appearance-none"
//                 >
//                   <option value="">Choose a model</option>
//                   {CAR_MODELS.map((m) => (
//                     <option key={m} value={m}>{m}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Message */}
//               <div>
//                 <label className="block text-gray-500 text-xs mb-1.5">Message (optional)</label>
//                 <textarea
//                   value={form.message}
//                   onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
//                   placeholder="Anything else you'd like us to know?"
//                   rows={3}
//                   className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors resize-none"
//                 />
//               </div>

//               {/* Error */}
//               {error && (
//                 <p className="text-red-500 text-xs">{error}</p>
//               )}

//               {/* Submit */}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3.5 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <Loader2 size={16} className="animate-spin" />
//                 ) : (
//                   "Send enquiry"
//                 )}
//               </button>

//               <p className="text-gray-300 text-xs text-center">
//                 We'll reach out within 24 hours. No spam.
//               </p>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }















// // garud-tata\app\components\landing-page-comp\landingHerosection.tsx

// "use client";

// import { useState, useCallback, useRef } from "react";
// import { ChevronLeft, ChevronRight, X, Send, Loader2 } from "lucide-react";

// const SLIDES = [
//   { image: "/images/Hero images/Heroimage.avif", model: "Tata Sierra",  tagline: "Born to lead." },
//   { image: "/images/Hero images/harrier-d.avif", model: "Tata Harrier", tagline: "Command every road." },
//   { image: "/images/Hero images/safari-d.avif",  model: "Tata Safari",  tagline: "The adventure starts here." },
//   { image: "/images/Hero images/nexon-d.avif",   model: "Tata Nexon",   tagline: "Urban. Unstoppable." },
//   { image: "/images/Hero images/curvv-d.avif",   model: "Tata Curvv",   tagline: "Sculpted for tomorrow." },
//   { image: "/images/Hero images/punch-d.avif",   model: "Tata Punch",   tagline: "Compact. Fearless." },
//   { image: "/images/Hero images/altroz-d.avif",  model: "Tata Altroz",  tagline: "Precision in every detail." },
//   { image: "/images/Hero images/tiago-d.avif",   model: "Tata Tiago",   tagline: "Smart drives start here." },
// ];

// const CAR_MODELS = [
//   "Tata Tiago", "Tata Tigor", "Tata Altroz",
//   "Tata Punch", "Tata Nexon", "Tata Curvv",
//   "Tata Harrier", "Tata Safari",
//   "Tata Tiago EV", "Tata Punch EV",
//   "Tata Nexon EV", "Tata Curvv EV", "Tata Harrier EV",
// ];

// export default function HeroSection() {
//   const [current,   setCurrent]   = useState(0);
//   const [prev,      setPrev]      = useState<number | null>(null);
//   const [direction, setDirection] = useState<"left" | "right">("right");
//   const [showForm,  setShowForm]  = useState(false);

//   // Use a ref instead of state for the animating flag — avoids stale closures
//   const animatingRef = useRef(false);

//   const goTo = useCallback((indexOrUpdater: number | ((c: number) => number), dir: "left" | "right") => {
//     if (animatingRef.current) return;
//     animatingRef.current = true;
//     setDirection(dir);
//     setCurrent((c) => {
//       const next = typeof indexOrUpdater === "function" ? indexOrUpdater(c) : indexOrUpdater;
//       setPrev(c);
//       return next;
//     });
//     setTimeout(() => {
//       setPrev(null);
//       animatingRef.current = false;
//     }, 600);
//   }, []);

//   const goPrev  = useCallback(() => goTo((c) => (c - 1 + SLIDES.length) % SLIDES.length, "left"),  [goTo]);
//   const goNext  = useCallback(() => goTo((c) => (c + 1) % SLIDES.length, "right"), [goTo]);
//   const goIndex = useCallback((i: number) => {
//     setCurrent((c) => {
//       if (i === c) return c;
//       goTo(i, i > c ? "right" : "left");
//       return c;
//     });
//   }, [goTo]);

//   const scrollToContact = () => {
//     document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   const slide     = SLIDES[current];
//   const prevSlide = prev !== null ? SLIDES[prev] : null;

//   return (
//     <>
//       <section
//         className="relative w-full overflow-hidden bg-gray-900"
//         style={{ height: "100svh", minHeight: 560 }}
//         aria-label="Garud Tata — hero"
//       >
//         {/* Previous slide animating out */}
//         {prevSlide && (
//           <div
//             key={`prev-${prev}`}
//             className="absolute inset-0"
//             style={{
//               animation: `slideOut${direction === "right" ? "Left" : "Right"} 0.6s cubic-bezier(0.76,0,0.24,1) forwards`,
//             }}
//           >
//             <img
//               src={prevSlide.image}
//               alt={prevSlide.model}
//               className="absolute inset-0 w-full h-full object-cover object-center"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//           </div>
//         )}

//         {/* Current slide animating in */}
//         <div
//           key={`curr-${current}`}
//           className="absolute inset-0"
//           style={{
//             animation: prev !== null
//               ? `slideIn${direction === "right" ? "Right" : "Left"} 0.6s cubic-bezier(0.76,0,0.24,1) forwards`
//               : "none",
//           }}
//         >
//           <img
//             src={slide.image}
//             alt={slide.model}
//             className="absolute inset-0 w-full h-full object-cover object-center"
//             fetchPriority="high"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//         </div>

//         {/* Left arrow */}
//         <button
//           onClick={goPrev}
//           aria-label="Previous"
//           className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors"
//         >
//           <ChevronLeft size={22} />
//         </button>

//         {/* Right arrow */}
//         <button
//           onClick={goNext}
//           aria-label="Next"
//           className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors"
//         >
//           <ChevronRight size={22} />
//         </button>

//         {/* Content */}
//         <div className="relative z-10 h-full flex flex-col justify-end pb-14 px-6 sm:px-12 lg:px-20 max-w-[1440px] mx-auto w-full">
//           <div className="mb-8">
//             <p
//               key={`tag-${current}`}
//               className="text-white/70 text-sm font-medium mb-2 tracking-wide"
//               style={{ animation: "fadeSlideUp 0.5s ease forwards" }}
//             >
//               {slide.tagline}
//             </p>
//             <h1
//               key={`model-${current}`}
//               className="font-black leading-none text-white"
//               style={{
//                 fontSize: "clamp(3rem, 9vw, 8rem)",
//                 animation: "fadeSlideUp 0.55s ease 0.05s both forwards",
//               }}
//             >
//               {slide.model}
//             </h1>
//           </div>

//           <div className="flex items-center justify-between gap-4 flex-wrap">
//             {/* Dots */}
//             <div className="flex items-center gap-2">
//               {SLIDES.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => goIndex(i)}
//                   aria-label={`Go to ${SLIDES[i].model}`}
//                   className="transition-all duration-300 rounded-full focus:outline-none"
//                   style={{
//                     width: i === current ? 32 : 8,
//                     height: 8,
//                     background: i === current ? "#ffffff" : "rgba(255,255,255,0.35)",
//                   }}
//                 />
//               ))}
//             </div>

//             {/* CTA */}
//             <button
//               onClick={scrollToContact}
//               className="px-6 py-2.5 rounded-full bg-white text-gray-900 text-sm font-bold tracking-wide hover:bg-white/90 transition-colors shadow-md"
//             >
//               Contact Us
//             </button>
//           </div>
//         </div>

//         {/* Slide counter */}
//         <div className="absolute top-8 right-8 z-10 text-white/40 text-xs font-mono tabular-nums select-none hidden sm:block">
//           {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
//         </div>
//       </section>

//       <style>{`
//         @keyframes slideInRight  { from { transform: translateX(100%); }  to { transform: translateX(0); } }
//         @keyframes slideInLeft   { from { transform: translateX(-100%); } to { transform: translateX(0); } }
//         @keyframes slideOutLeft  { from { transform: translateX(0); } to { transform: translateX(-100%); } }
//         @keyframes slideOutRight { from { transform: translateX(0); } to { transform: translateX(100%); } }
//         @keyframes fadeSlideUp   { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
//         @keyframes fadeIn        { from { opacity: 0; } to { opacity: 1; } }
//         @keyframes scaleIn       { from { opacity: 0; transform: scale(0.96) translateY(12px); } to { opacity: 1; transform: scale(1) translateY(0); } }
//       `}</style>

//       {showForm && (
//         <ContactModal onClose={() => setShowForm(false)} defaultCar={slide.model} />
//       )}
//     </>
//   );
// }

// /* =========================================================
//    CONTACT MODAL
// ========================================================= */

// interface ContactModalProps {
//   onClose: () => void;
//   defaultCar: string;
// }

// function ContactModal({ onClose, defaultCar }: ContactModalProps) {
//   const [form, setForm] = useState({ name: "", mobile: "", car: defaultCar, message: "" });
//   const [loading, setLoading] = useState(false);
//   const [sent,    setSent]    = useState(false);
//   const [error,   setError]   = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     if (!form.name.trim())                          { setError("Please enter your name."); return; }
//     if (form.mobile.replace(/\D/g, "").length < 10) { setError("Please enter a valid mobile number."); return; }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/enquiry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...form, source: "hero-contact-modal" }),
//       });
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.error ?? "Submission failed.");
//       }
//       if (typeof window !== "undefined") {
//         (window as any).dataLayer = (window as any).dataLayer || [];
//         (window as any).dataLayer.push({ event: "lead_form_submit" });
//       }
//       setSent(true);
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-[100] flex items-center justify-center p-4"
//       style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", animation: "fadeIn 0.2s ease" }}
//       onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
//     >
//       <div
//         className="relative w-full max-w-md bg-white border border-gray-200 rounded-2xl p-7 shadow-2xl"
//         style={{ animation: "scaleIn 0.25s ease" }}
//       >
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
//           aria-label="Close"
//         >
//           <X size={16} />
//         </button>

//         {sent ? (
//           <div className="py-8 text-center">
//             <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
//               <Send size={24} className="text-gray-700" />
//             </div>
//             <p className="text-gray-900 font-bold text-lg mb-1">We'll be in touch!</p>
//             <p className="text-gray-400 text-sm leading-relaxed">Our team will call you back within 24 hours.</p>
//             <button
//               onClick={onClose}
//               className="mt-6 px-6 py-2.5 rounded-full bg-gray-900 text-white text-sm font-bold hover:bg-gray-700 transition-colors"
//             >
//               Done
//             </button>
//           </div>
//         ) : (
//           <>
//             <h2 className="text-gray-900 font-bold text-xl mb-1">Get in touch</h2>
//             <p className="text-gray-400 text-sm mb-6 leading-relaxed">
//               Tell us what you're looking for and we'll get back to you.
//             </p>
//             <form onSubmit={handleSubmit} noValidate className="space-y-4">
//               <div>
//                 <label className="block text-gray-500 text-xs mb-1.5">Name</label>
//                 <input type="text" value={form.name}
//                   onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
//                   placeholder="Your full name"
//                   className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-500 text-xs mb-1.5">Mobile</label>
//                 <input type="tel" value={form.mobile}
//                   onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))}
//                   placeholder="+91 00000 00000"
//                   className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-500 text-xs mb-1.5">Car of interest</label>
//                 <select value={form.car}
//                   onChange={(e) => setForm((p) => ({ ...p, car: e.target.value }))}
//                   className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm focus:outline-none focus:border-gray-400 transition-colors appearance-none"
//                 >
//                   <option value="">Choose a model</option>
//                   {CAR_MODELS.map((m) => <option key={m} value={m}>{m}</option>)}
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-gray-500 text-xs mb-1.5">Message (optional)</label>
//                 <textarea value={form.message}
//                   onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
//                   placeholder="Anything else you'd like us to know?"
//                   rows={3}
//                   className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors resize-none"
//                 />
//               </div>
//               {error && <p className="text-red-500 text-xs">{error}</p>}
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3.5 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
//               >
//                 {loading ? <Loader2 size={16} className="animate-spin" /> : "Send enquiry"}
//               </button>
//               <p className="text-gray-300 text-xs text-center">We'll reach out within 24 hours. No spam.</p>
//             </form>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }















// "use client";

// import { useState, useCallback, useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const SLIDES = [
//   { image: "/images/Hero images/Heroimage.avif", model: "Tata Sierra",  tagline: "Born to lead." },
//   { image: "/images/Hero images/harrier-d.avif", model: "Tata Harrier", tagline: "Command every road." },
//   { image: "/images/Hero images/safari-d.avif",  model: "Tata Safari",  tagline: "The adventure starts here." },
//   { image: "/images/Hero images/nexon-d.avif",   model: "Tata Nexon",   tagline: "Urban. Unstoppable." },
//   { image: "/images/Hero images/curvv-d.avif",   model: "Tata Curvv",   tagline: "Sculpted for tomorrow." },
//   { image: "/images/Hero images/punch-d.avif",   model: "Tata Punch",   tagline: "Compact. Fearless." },
//   { image: "/images/Hero images/altroz-d.avif",  model: "Tata Altroz",  tagline: "Precision in every detail." },
//   { image: "/images/Hero images/tiago-d.avif",   model: "Tata Tiago",   tagline: "Smart drives start here." },
// ];

// export default function HeroSection() {
//   const [current,   setCurrent]   = useState(0);
//   const [prev,      setPrev]      = useState<number | null>(null);
//   const [direction, setDirection] = useState<"left" | "right">("right");

//   const animatingRef = useRef(false);

//   // Core transition — takes a resolved next index and a direction
//   const goTo = useCallback((next: number, dir: "left" | "right") => {
//     if (animatingRef.current) return;
//     setCurrent((c) => {
//       if (c === next) return c;
//       animatingRef.current = true;
//       setDirection(dir);
//       setPrev(c);
//       setTimeout(() => {
//         setPrev(null);
//         animatingRef.current = false;
//       }, 600);
//       return next;
//     });
//   }, []);

//   const goPrev = useCallback(() => {
//     setCurrent((c) => {
//       const next = (c - 1 + SLIDES.length) % SLIDES.length;
//       goTo(next, "left");
//       return c; // goTo will handle the real update
//     });
//   }, [goTo]);

//   const goNext = useCallback(() => {
//     setCurrent((c) => {
//       const next = (c + 1) % SLIDES.length;
//       goTo(next, "right");
//       return c;
//     });
//   }, [goTo]);

//   // Simpler: just compute next outside setState
//   const handlePrev = useCallback(() => {
//     if (animatingRef.current) return;
//     const next = (current - 1 + SLIDES.length) % SLIDES.length;
//     animatingRef.current = true;
//     setDirection("left");
//     setPrev(current);
//     setCurrent(next);
//     setTimeout(() => { setPrev(null); animatingRef.current = false; }, 600);
//   }, [current]);

//   const handleNext = useCallback(() => {
//     if (animatingRef.current) return;
//     const next = (current + 1) % SLIDES.length;
//     animatingRef.current = true;
//     setDirection("right");
//     setPrev(current);
//     setCurrent(next);
//     setTimeout(() => { setPrev(null); animatingRef.current = false; }, 600);
//   }, [current]);

//   const handleDot = useCallback((i: number) => {
//     if (animatingRef.current || i === current) return;
//     const dir = i > current ? "right" : "left";
//     animatingRef.current = true;
//     setDirection(dir);
//     setPrev(current);
//     setCurrent(i);
//     setTimeout(() => { setPrev(null); animatingRef.current = false; }, 600);
//   }, [current]);

//   const scrollToContact = () => {
//     document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   const slide     = SLIDES[current];
//   const prevSlide = prev !== null ? SLIDES[prev] : null;

//   return (
//     <>
//       <section
//         className="relative w-full overflow-hidden bg-gray-900"
//         style={{ height: "100svh", minHeight: 560 }}
//         aria-label="Garud Tata — hero"
//       >
//         {/* Previous slide animating out */}
//         {prevSlide && (
//           <div
//             key={`prev-${prev}`}
//             className="absolute inset-0"
//             style={{
//               animation: `slideOut${direction === "right" ? "Left" : "Right"} 0.6s cubic-bezier(0.76,0,0.24,1) forwards`,
//             }}
//           >
//             <img
//               src={prevSlide.image}
//               alt={prevSlide.model}
//               className="absolute inset-0 w-full h-full object-cover object-center"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//           </div>
//         )}

//         {/* Current slide animating in */}
//         <div
//           key={`curr-${current}`}
//           className="absolute inset-0"
//           style={{
//             animation: prev !== null
//               ? `slideIn${direction === "right" ? "Right" : "Left"} 0.6s cubic-bezier(0.76,0,0.24,1) forwards`
//               : "none",
//           }}
//         >
//           <img
//             src={slide.image}
//             alt={slide.model}
//             className="absolute inset-0 w-full h-full object-cover object-center"
//             fetchPriority="high"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
//         </div>

//         {/* Left arrow */}
//         <button
//           onClick={handlePrev}
//           aria-label="Previous"
//           className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors"
//         >
//           <ChevronLeft size={22} />
//         </button>

//         {/* Right arrow */}
//         <button
//           onClick={handleNext}
//           aria-label="Next"
//           className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-colors"
//         >
//           <ChevronRight size={22} />
//         </button>

//         {/* Content */}
//         <div className="relative z-10 h-full flex flex-col justify-end pb-14 px-6 sm:px-12 lg:px-20 max-w-[1440px] mx-auto w-full">
//           <div className="mb-8">
//             <p
//               key={`tag-${current}`}
//               className="text-white/70 text-sm font-medium mb-2 tracking-wide"
//               style={{ animation: "fadeSlideUp 0.5s ease forwards" }}
//             >
//               {slide.tagline}
//             </p>
//             <h1
//               key={`model-${current}`}
//               className="font-black leading-none text-white"
//               style={{
//                 fontSize: "clamp(3rem, 9vw, 8rem)",
//                 animation: "fadeSlideUp 0.55s ease 0.05s both forwards",
//               }}
//             >
//               {slide.model}
//             </h1>
//           </div>

//           <div className="flex items-center justify-between gap-4 flex-wrap">
//             {/* Dots */}
//             <div className="flex items-center gap-2">
//               {SLIDES.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => handleDot(i)}
//                   aria-label={`Go to ${SLIDES[i].model}`}
//                   className="transition-all duration-300 rounded-full focus:outline-none"
//                   style={{
//                     width: i === current ? 32 : 8,
//                     height: 8,
//                     background: i === current ? "#ffffff" : "rgba(255,255,255,0.35)",
//                   }}
//                 />
//               ))}
//             </div>

//             {/* CTA */}
//             <button
//               onClick={scrollToContact}
//               className="px-6 py-2.5 rounded-full bg-white text-gray-900 text-sm font-bold tracking-wide hover:bg-white/90 transition-colors shadow-md"
//             >
//               Contact Us
//             </button>
//           </div>
//         </div>

//         {/* Slide counter */}
//         <div className="absolute top-8 right-8 z-10 text-white/40 text-xs font-mono tabular-nums select-none hidden sm:block">
//           {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
//         </div>
//       </section>

//       <style>{`
//         @keyframes slideInRight  { from { transform: translateX(100%); }  to { transform: translateX(0); } }
//         @keyframes slideInLeft   { from { transform: translateX(-100%); } to { transform: translateX(0); } }
//         @keyframes slideOutLeft  { from { transform: translateX(0); } to { transform: translateX(-100%); } }
//         @keyframes slideOutRight { from { transform: translateX(0); } to { transform: translateX(100%); } }
//         @keyframes fadeSlideUp   { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
//       `}</style>
//     </>
//   );
// }
















"use client";

import { useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    image: "/images/Hero images/Heroimage.avif",
    model: "Tata Sierra",
    tagline: "Born to lead.",
  },
  {
    image: "/images/Hero images/harrier-d.avif",
    model: "Tata Harrier",
    tagline: "Command every road.",
  },
  {
    image: "/images/Hero images/safari-d.avif",
    model: "Tata Safari",
    tagline: "The adventure starts here.",
  },
  {
    image: "/images/Hero images/nexon-d.avif",
    model: "Tata Nexon",
    tagline: "Urban. Unstoppable.",
  },
  {
    image: "/images/Hero images/curvv-d.avif",
    model: "Tata Curvv",
    tagline: "Sculpted for tomorrow.",
  },
  {
    image: "/images/Hero images/punch-d.avif",
    model: "Tata Punch",
    tagline: "Compact. Fearless.",
  },
  {
    image: "/images/Hero images/altroz-d.avif",
    model: "Tata Altroz",
    tagline: "Precision in every detail.",
  },
  {
    image: "/images/Hero images/tiago-d.avif",
    model: "Tata Tiago",
    tagline: "Smart drives start here.",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const animatingRef = useRef(false);

  /*
   * Change slide
   */
  const changeSlide = useCallback(
    (nextIndex: number, dir: "left" | "right") => {
      if (animatingRef.current) return;

      if (nextIndex === current) return;

      animatingRef.current = true;

      setDirection(dir);
      setPrev(current);
      setCurrent(nextIndex);

      window.setTimeout(() => {
        setPrev(null);
        animatingRef.current = false;
      }, 600);
    },
    [current]
  );

  /*
   * Previous arrow
   */
  const handlePrev = useCallback(() => {
    if (animatingRef.current) return;

    const nextIndex =
      (current - 1 + SLIDES.length) % SLIDES.length;

    changeSlide(nextIndex, "left");
  }, [current, changeSlide]);

  /*
   * Next arrow
   */
  const handleNext = useCallback(() => {
    if (animatingRef.current) return;

    const nextIndex =
      (current + 1) % SLIDES.length;

    changeSlide(nextIndex, "right");
  }, [current, changeSlide]);

  /*
   * Dot navigation
   */
  const handleDot = useCallback(
    (index: number) => {
      if (animatingRef.current) return;
      if (index === current) return;

      const dir = index > current ? "right" : "left";

      changeSlide(index, dir);
    },
    [current, changeSlide]
  );

  /*
   * Contact CTA
   */
  const scrollToContact = useCallback(() => {
    document
      .getElementById("contact")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  }, []);

  const slide = SLIDES[current];

  const prevSlide =
    prev !== null ? SLIDES[prev] : null;

  return (
    <>
      <section
        className="relative w-full overflow-hidden bg-gray-900"
        style={{
          height: "100svh",
          minHeight: 560,
        }}
        aria-label="Garud Tata — hero"
      >
        {/* =========================================
            PREVIOUS SLIDE
        ========================================= */}
        {prevSlide && (
          <div
            key={`prev-${prev}`}
            className="absolute inset-0 z-[1]"
            style={{
              animation: `slideOut${
                direction === "right" ? "Left" : "Right"
              } 0.6s cubic-bezier(0.76,0,0.24,1) forwards`,
            }}
          >
            <img
              src={prevSlide.image}
              alt={prevSlide.model}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
        )}

        {/* =========================================
            CURRENT SLIDE
        ========================================= */}
        <div
          key={`curr-${current}`}
          className="absolute inset-0 z-[2]"
          style={{
            animation:
              prev !== null
                ? `slideIn${
                    direction === "right"
                      ? "Right"
                      : "Left"
                  } 0.6s cubic-bezier(0.76,0,0.24,1) forwards`
                : "none",
          }}
        >
          <img
            src={slide.image}
            alt={slide.model}
            className="absolute inset-0 w-full h-full object-cover object-center"
            fetchPriority="high"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* =========================================
            LEFT ARROW
            IMPORTANT: z-[30] + pointer-events-auto
        ========================================= */}
        <button
          type="button"
          onClick={handlePrev}
          disabled={animatingRef.current}
          aria-label="Previous slide"
          className="
            absolute
            left-4 sm:left-8
            top-1/2
            -translate-y-1/2
            z-[30]
            w-11 h-11
            rounded-full
            border border-white/30
            bg-white/10
            backdrop-blur-sm
            flex items-center justify-center
            text-white
            hover:bg-white/25
            active:scale-95
            transition-all
            cursor-pointer
            pointer-events-auto
          "
        >
          <ChevronLeft
            size={22}
            strokeWidth={2}
          />
        </button>

        {/* =========================================
            RIGHT ARROW
            IMPORTANT: z-[30] + pointer-events-auto
        ========================================= */}
        <button
          type="button"
          onClick={handleNext}
          disabled={animatingRef.current}
          aria-label="Next slide"
          className="
            absolute
            right-4 sm:right-8
            top-1/2
            -translate-y-1/2
            z-[30]
            w-11 h-11
            rounded-full
            border border-white/30
            bg-white/10
            backdrop-blur-sm
            flex items-center justify-center
            text-white
            hover:bg-white/25
            active:scale-95
            transition-all
            cursor-pointer
            pointer-events-auto
          "
        >
          <ChevronRight
            size={22}
            strokeWidth={2}
          />
        </button>

        {/* =========================================
            HERO CONTENT
            z-[20] but does NOT cover arrows
        ========================================= */}
        <div
          className="
            relative
            z-[20]
            h-full
            flex
            flex-col
            justify-end
            pb-14
            px-6
            sm:px-12
            lg:px-20
            max-w-[1440px]
            mx-auto
            w-full
            pointer-events-none
          "
        >
          <div className="mb-8">
            {/* Tagline */}
            <p
              key={`tag-${current}`}
              className="text-white/70 text-sm font-medium mb-2 tracking-wide"
              style={{
                animation:
                  "fadeSlideUp 0.5s ease forwards",
              }}
            >
              {slide.tagline}
            </p>

            {/* Model */}
            <h1
              key={`model-${current}`}
              className="font-black leading-none text-white"
              style={{
                fontSize:
                  "clamp(3rem, 9vw, 8rem)",
                animation:
                  "fadeSlideUp 0.55s ease 0.05s both forwards",
              }}
            >
              {slide.model}
            </h1>
          </div>

          {/* Bottom controls */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Dots */}
            <div className="flex items-center gap-2 pointer-events-auto">
              {SLIDES.map((slideItem, i) => (
                <button
                  type="button"
                  key={slideItem.model}
                  onClick={() => handleDot(i)}
                  aria-label={`Go to ${slideItem.model}`}
                  className="
                    transition-all
                    duration-300
                    rounded-full
                    focus:outline-none
                    cursor-pointer
                  "
                  style={{
                    width: i === current ? 32 : 8,
                    height: 8,
                    background:
                      i === current
                        ? "#ffffff"
                        : "rgba(255,255,255,0.35)",
                  }}
                />
              ))}
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={scrollToContact}
              className="
                pointer-events-auto
                px-6
                py-2.5
                rounded-full
                bg-white
                text-gray-900
                text-sm
                font-bold
                tracking-wide
                hover:bg-white/90
                active:scale-95
                transition-all
                shadow-md
                cursor-pointer
              "
            >
              Contact Us
            </button>
          </div>
        </div>

        {/* =========================================
            SLIDE COUNTER
        ========================================= */}
        <div
          className="
            absolute
            top-8
            right-8
            z-[30]
            text-white/40
            text-xs
            font-mono
            tabular-nums
            select-none
            hidden
            sm:block
          "
        >
          {String(current + 1).padStart(2, "0")}
          {" / "}
          {String(SLIDES.length).padStart(2, "0")}
        </div>
      </section>

      {/* ===========================================
          ANIMATIONS
      =========================================== */}
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }

        @keyframes slideOutLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }

        @keyframes slideOutRight {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }

        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}