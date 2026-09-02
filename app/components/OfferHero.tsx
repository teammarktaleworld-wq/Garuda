

// // garud-tata\app\components\OfferHero.tsx
// "use client";

// import {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   type FormEvent,
// } from "react";
// import { motion } from "framer-motion";
// import {
//   ArrowRight,
//   CheckCircle2,
//   Phone,
//   MessageCircle,
//   Loader2,
// } from "lucide-react";

// // ─── TRACKING ─────────────────────────────────────────────────────────────────
// declare global {
//   interface Window {
//     fbq?: (...args: any[]) => void;
//     dataLayer?: Record<string, any>[];
//   }
// }

// function track(event: string, params?: Record<string, string>) {
//   if (typeof window !== "undefined" && typeof window.fbq === "function") {
//     window.fbq("track", event, params);
//   }
// }

// // Google Tag Manager event for Google Ads conversion.
// // Fired only after /api/enquiry returns a successful response.
// // GTM listens for the custom event: lead_form_submit
// const trackGoogleAdsLead = () => {
//   if (typeof window !== "undefined") {
//     window.dataLayer = window.dataLayer || [];

//     window.dataLayer.push({
//       event: "lead_form_submit",
//     });
//   }
// };

// const trackViewContent = (vehicle?: string) =>
//   track("ViewContent", {
//     content_name: vehicle ?? "General Offer",
//   });

// const trackGetOffer = (vehicle?: string) =>
//   track("Lead", {
//     content_name: vehicle ?? "General Offer",
//     source: "GetOfferCTA",
//   });

// const trackTestDrive = () =>
//   track("Lead", {
//     source: "TestDriveCTA",
//   });

// const trackCall = () =>
//   track("Contact", {
//     source: "CallCTA",
//   });

// const trackWhatsApp = () =>
//   track("Contact", {
//     source: "WhatsAppCTA",
//   });

// // ─── TYPES ────────────────────────────────────────────────────────────────────
// export interface OfferHeroProps {
//   vehicle?: string;
//   headlineLine1?: string;
//   headlineLine2?: string;
//   description?: string;
//   offerLabel?: string;
//   offerValue?: string;
//   phone?: string;
//   whatsappNumber?: string;
//   offerSectionId?: string;
//   carModels?: string[];

//   /**
//    * Static image shown instantly while video loads (or as permanent fallback).
//    * Defaults to the Sierra keyvisual.
//    */
//   backgroundImage?: string;

//   /**
//    * Optional looping promo video. Cross-fades in over the image once
//    * the browser has buffered enough to play. Falls back to image on error.
//    */
//   backgroundVideo?: string;
// }

// // ─── DEFAULT CAR MODELS ────────────────────────────────────────────────────────
// // Synced with the Offers section's OFFER_DATA (MY25/MY24 consumer offer sheets).
// // Base model names — ICE first, then EV variants — matching what's actually
// // on offer so the lead form and the offers table stay in lockstep.
// const DEFAULT_MODELS = [
//   // ICE
//   "Tata Tiago",
//   "Tata Tigor",
//   "Tata Altroz",
//   "Tata Punch",
//   "Tata Nexon",
//   "Tata Curvv",
//   "Tata Harrier",
//   "Tata Safari",

//   // EV
//   "Tata Tiago EV",
//   "Tata Punch EV",
//   "Tata Nexon EV",
//   "Tata Curvv EV",
//   "Tata Harrier EV",
// ];

// const EASE = [0.16, 1, 0.3, 1] as const;

// const fadeUp = (delay = 0) => ({
//   hidden: {
//     opacity: 0,
//     y: 20,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: EASE,
//       delay,
//     },
//   },
// });

// const lineReveal = (delay = 0) => ({
//   hidden: {
//     y: "108%",
//   },
//   visible: {
//     y: "0%",
//     transition: {
//       duration: 0.7,
//       ease: EASE,
//       delay,
//     },
//   },
// });

// // ─── COMPONENT ────────────────────────────────────────────────────────────────
// export default function OfferHero({
//   vehicle,
//   headlineLine1,
//   headlineLine2,
//   description = "Explore exciting benefits on selected Tata cars at Garud Tata. Submit your details and our team will get in touch with you.",
//   offerLabel,
//   offerValue,
//   phone = "+919876543210",
//   whatsappNumber = "919876543210",
//   offerSectionId = "offer-form",
//   carModels = DEFAULT_MODELS,
//   backgroundImage = "/images/vehicles/sierrakv-3.avif",
//   backgroundVideo,
// }: OfferHeroProps) {
//   const displayVehicle = vehicle ? `Tata ${vehicle}` : undefined;

//   const hl1 =
//     headlineLine1 ??
//     (vehicle ? "Drive Home Your" : "Drive Home");

//   const hl2 =
//     headlineLine2 ??
//     (vehicle ? displayVehicle! : "Your Dream Tata.");

//   const badgeLabel =
//     offerLabel ??
//     (vehicle
//       ? `EXCLUSIVE ${vehicle.toUpperCase()} OFFER`
//       : "EXCLUSIVE OFFER");

//   const waMessage = vehicle
//     ? `Hi Garud Tata, I am interested in the Tata ${vehicle} offer. Please share the details.`
//     : `Hi Garud Tata, I am interested in the latest Tata car offers. Please share the current offers.`;

//   useEffect(() => {
//     trackViewContent(vehicle);
//   }, [vehicle]);

//   const scrollTo = useCallback((id: string) => {
//     document
//       .getElementById(id)
//       ?.scrollIntoView({ behavior: "smooth" });
//   }, []);

//   // ── Quick lead form state ─────────────────────────────────────────────────
//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     car: vehicle ? `Tata ${vehicle}` : "",
//   });

//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formError, setFormError] = useState("");

//   const handleSubmit = useCallback(
//     async (e: FormEvent) => {
//       e.preventDefault();
//       setFormError("");

//       if (!formData.name.trim()) {
//         setFormError("Please enter your name.");
//         return;
//       }

//       if (
//         formData.mobile.replace(/\D/g, "").length < 10
//       ) {
//         setFormError("Please enter a valid mobile number.");
//         return;
//       }

//       setLoading(true);

//       try {
//         const res = await fetch("/api/enquiry", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             ...formData,
//             source: "hero-form",
//           }),
//         });

//         if (!res.ok) {
//           const data = await res.json();
//           throw new Error(
//             data.error ?? "Submission failed."
//           );
//         }

//         // ─────────────────────────────────────────────
//         // GOOGLE ADS / GTM CONVERSION
//         // Fires ONLY after successful form submission.
//         // GTM trigger: Custom Event → lead_form_submit
//         // ─────────────────────────────────────────────
//         trackGoogleAdsLead();

//         // Keep existing Facebook Lead tracking.
//         trackGetOffer(vehicle);

//         setSubmitted(true);

//         setTimeout(
//           () => scrollTo(offerSectionId),
//           400
//         );
//       } catch (err: unknown) {
//         setFormError(
//           err instanceof Error
//             ? err.message
//             : "Something went wrong."
//         );
//       } finally {
//         setLoading(false);
//       }
//     },
//     [
//       formData,
//       vehicle,
//       offerSectionId,
//       scrollTo,
//     ]
//   );

//   return (
//     <>
//       {/* ════════════════════════════════════════════
//           HERO SECTION
//       ════════════════════════════════════════════ */}
//       <section
//         id="hero"
//         className="
//           relative w-full overflow-hidden bg-[#050A12]
//           min-h-[680px]
//           flex items-center
//         "
//         aria-label="Hero — Garud Tata Exclusive Offers"
//       >
//         {/* ── Cinematic background ─────────────────────────────── */}
//         <HeroBackground
//           image={backgroundImage}
//           video={backgroundVideo}
//         />

//         {/* ── Content ──────────────────────────────────────────── */}
//         <div
//           className="
//             relative z-10
//             w-full max-w-[1440px] mx-auto
//             px-5 lg:px-16
//             py-[120px] lg:py-[140px]
//             grid grid-cols-1 xl:grid-cols-[1fr_320px]
//             gap-10 xl:gap-16
//             items-center
//           "
//         >
//           {/* LEFT — hero copy */}
//           <div className="flex flex-col max-w-[720px]">

//             {/* Badge row */}
//             <motion.div
//               variants={fadeUp(0.05)}
//               initial="hidden"
//               animate="visible"
//               className="mb-6 flex items-center gap-3 flex-wrap"
//             >
//               <span className="text-[10px] font-bold tracking-[0.28em] text-white/40 uppercase">
//                 GARUD TATA · NEW DELHI
//               </span>

//               <span
//                 className="
//                   inline-flex items-center gap-2
//                   px-3.5 py-1.5 rounded-full
//                   bg-[#0055A5]/20
//                   border border-[#0055A5]/40
//                   text-[#5BA3E8]
//                   text-[11px]
//                   font-semibold
//                   tracking-[0.16em]
//                   uppercase
//                 "
//               >
//                 <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8] animate-pulse" />
//                 {badgeLabel}
//               </span>
//             </motion.div>

//             {/* Headline */}
//             <div className="mb-7">
//               <div className="overflow-hidden mb-1">
//                 <motion.h1
//                   variants={lineReveal(0.1)}
//                   initial="hidden"
//                   animate="visible"
//                   className="
//                     font-extrabold
//                     tracking-tight
//                     leading-[1.0]
//                     text-[clamp(3rem,6.5vw,6rem)]
//                     text-white
//                   "
//                 >
//                   {hl1}
//                 </motion.h1>
//               </div>

//               <div className="overflow-hidden">
//                 <motion.h1
//                   variants={lineReveal(0.18)}
//                   initial="hidden"
//                   animate="visible"
//                   className="
//                     font-extrabold
//                     tracking-tight
//                     leading-[1.0]
//                     text-[clamp(3rem,6.5vw,6rem)]
//                     bg-gradient-to-r
//                     from-white
//                     via-[#A8CAFF]
//                     to-[#5BA3E8]
//                     bg-clip-text
//                     text-transparent
//                   "
//                 >
//                   {hl2}
//                 </motion.h1>
//               </div>
//             </div>

//             {/* Offer value pill */}
//             <motion.div
//               variants={fadeUp(0.26)}
//               initial="hidden"
//               animate="visible"
//               className="mb-6"
//             >
//               {offerValue ? (
//                 <span
//                   className="
//                     inline-block
//                     px-5 py-2.5
//                     rounded-xl
//                     bg-[#0055A5]
//                     text-white
//                     text-[14px]
//                     font-bold
//                     tracking-[0.06em]
//                     shadow-[0_4px_24px_rgba(0,85,165,0.5)]
//                   "
//                 >
//                   BENEFITS UP TO {offerValue}*
//                 </span>
//               ) : (
//                 <span
//                   className="
//                     inline-block
//                     px-5 py-2.5
//                     rounded-xl
//                     bg-white/8
//                     border border-white/15
//                     text-white/70
//                     text-[13px]
//                     font-semibold
//                     tracking-[0.06em]
//                   "
//                 >
//                   SPECIAL BENEFITS AVAILABLE
//                 </span>
//               )}
//             </motion.div>

//             {/* Description */}
//             <motion.p
//               variants={fadeUp(0.32)}
//               initial="hidden"
//               animate="visible"
//               className="
//                 text-white/55
//                 text-[16px]
//                 leading-relaxed
//                 max-w-[540px]
//                 mb-9
//               "
//             >
//               {description}
//             </motion.p>

//             {/* CTA buttons */}
//             <motion.div
//               variants={fadeUp(0.4)}
//               initial="hidden"
//               animate="visible"
//               className="flex flex-col sm:flex-row gap-3 mb-9"
//             >
//               <button
//                 onClick={() => {
//                   trackGetOffer(vehicle);
//                   scrollTo(offerSectionId);
//                 }}
//                 className="
//                   group
//                   flex items-center
//                   justify-center
//                   gap-2.5
//                   px-8 py-[16px]
//                   rounded-full
//                   bg-[#0055A5]
//                   hover:bg-[#1E7FE8]
//                   text-white
//                   font-bold
//                   text-[14px]
//                   tracking-[0.06em]
//                   shadow-[0_4px_24px_rgba(0,85,165,0.45)]
//                   hover:shadow-[0_8px_32px_rgba(30,127,232,0.55)]
//                   hover:-translate-y-0.5
//                   transition-all
//                   duration-250
//                 "
//               >
//                 GET MY OFFER

//                 <ArrowRight
//                   size={16}
//                   className="
//                     group-hover:translate-x-1
//                     transition-transform
//                     duration-200
//                   "
//                 />
//               </button>

//               <button
//                 onClick={() => {
//                   trackTestDrive();
//                   scrollTo("test-drive");
//                 }}
//                 className="
//                   group
//                   flex items-center
//                   justify-center
//                   gap-2.5
//                   px-8 py-[16px]
//                   rounded-full
//                   bg-white/6
//                   backdrop-blur-md
//                   border border-white/20
//                   hover:border-white/40
//                   hover:bg-white/10
//                   text-white
//                   font-medium
//                   text-[14px]
//                   tracking-[0.04em]
//                   hover:-translate-y-0.5
//                   transition-all
//                   duration-250
//                 "
//               >
//                 BOOK TEST DRIVE
//               </button>
//             </motion.div>

//             {/* Trust indicators */}
//             <motion.div
//               variants={fadeUp(0.48)}
//               initial="hidden"
//               animate="visible"
//               className="flex flex-wrap gap-x-6 gap-y-2"
//             >
//               {[
//                 "Authorized Tata Dealer",
//                 "Multiple Delhi Locations",
//                 "Easy Enquiry",
//               ].map((label) => (
//                 <span
//                   key={label}
//                   className="
//                     flex items-center gap-1.5
//                     text-[12px]
//                     text-white/45
//                     font-medium
//                   "
//                 >
//                   <CheckCircle2
//                     size={13}
//                     className="text-[#0055A5] flex-shrink-0"
//                   />
//                   {label}
//                 </span>
//               ))}
//             </motion.div>
//           </div>

//           {/* RIGHT — Quick lead form */}
//           <motion.div
//             initial={{
//               opacity: 0,
//               y: 20,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             transition={{
//               delay: 0.55,
//               duration: 0.6,
//               ease: EASE,
//             }}
//             className="hidden xl:block"
//           >
//             <LeadForm
//               formData={formData}
//               setFormData={setFormData}
//               onSubmit={handleSubmit}
//               submitted={submitted}
//               loading={loading}
//               error={formError}
//               carModels={carModels}
//             />
//           </motion.div>
//         </div>

//         {/* Bottom gradient */}
//         <div
//           className="
//             absolute
//             bottom-0
//             left-0
//             right-0
//             h-28
//             bg-gradient-to-t
//             from-[#050A12]
//             to-transparent
//             z-10
//             pointer-events-none
//           "
//         />
//       </section>

//       {/* TRUST STRIP */}
//       <TrustStrip />

//       {/* MOBILE STICKY BOTTOM BAR */}
//       <div
//         className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
//         style={{
//           paddingBottom:
//             "env(safe-area-inset-bottom, 0px)",
//         }}
//       >
//         <div
//           className="
//             bg-[#060B18]/96
//             backdrop-blur-xl
//             border-t border-white/10
//             grid grid-cols-3
//             h-[72px]
//           "
//         >
//           <a
//             href={`tel:${phone}`}
//             onClick={trackCall}
//             className="
//               flex flex-col
//               items-center
//               justify-center
//               gap-1
//               text-white/60
//               hover:text-white
//               transition-colors
//             "
//             aria-label={`Call ${phone}`}
//           >
//             <Phone
//               size={19}
//               strokeWidth={1.5}
//             />
//             <span
//               className="
//                 text-[9px]
//                 uppercase
//                 tracking-wider
//                 font-semibold
//               "
//             >
//               Call
//             </span>
//           </a>

//           <a
//             href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
//               waMessage
//             )}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             onClick={trackWhatsApp}
//             className="
//               flex flex-col
//               items-center
//               justify-center
//               gap-1
//               text-[#25D366]/70
//               hover:text-[#25D366]
//               transition-colors
//             "
//             aria-label="Chat on WhatsApp"
//           >
//             <MessageCircle
//               size={19}
//               strokeWidth={1.5}
//             />
//             <span
//               className="
//                 text-[9px]
//                 uppercase
//                 tracking-wider
//                 font-semibold
//               "
//             >
//               WhatsApp
//             </span>
//           </a>

//           <button
//             onClick={() => {
//               trackGetOffer(vehicle);
//               scrollTo(offerSectionId);
//             }}
//             className="
//               flex flex-col
//               items-center
//               justify-center
//               gap-1
//               bg-[#0055A5]
//               active:bg-[#004494]
//               text-white
//               transition-colors
//             "
//           >
//             <ArrowRight
//               size={19}
//               strokeWidth={1.8}
//             />
//             <span
//               className="
//                 text-[9px]
//                 uppercase
//                 tracking-wider
//                 font-bold
//               "
//             >
//               Get Offer
//             </span>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// // ─── BACKGROUND ───────────────────────────────────────────────────────────────
// // Technique: image renders immediately (no layout shift, no blank flash).
// // Video is stacked on top at opacity-0. Once the browser fires `canplay`
// // we cross-fade the video in over ~1.2 s. If the video errors or isn't
// // provided, the image stays visible forever — seamless fallback.

// interface HeroBgProps {
//   image: string;
//   video?: string;
// }

// function HeroBackground({
//   image,
//   video,
// }: HeroBgProps) {
//   const videoRef =
//     useRef<HTMLVideoElement>(null);

//   const [videoReady, setVideoReady] =
//     useState(false);

//   useEffect(() => {
//     const el = videoRef.current;

//     if (!el || !video) return;

//     // Reset if src changes between campaigns
//     setVideoReady(false);

//     const onCanPlay = () => {
//       el.play().catch(() => {
//         // autoplay blocked — image stays visible
//       });

//       setVideoReady(true);
//     };

//     const onError = () =>
//       setVideoReady(false);

//     el.addEventListener(
//       "canplay",
//       onCanPlay,
//       { once: true }
//     );

//     el.addEventListener(
//       "error",
//       onError,
//       { once: true }
//     );

//     return () => {
//       el.removeEventListener(
//         "canplay",
//         onCanPlay
//       );

//       el.removeEventListener(
//         "error",
//         onError
//       );
//     };
//   }, [video]);

//   return (
//     <div className="absolute inset-0 z-0 overflow-hidden">

//       {/* Layer 0: dark base */}
//       <div className="absolute inset-0 bg-[#050A12]" />

//       {/* Layer 1: static image */}
//       <img
//         src={image}
//         alt=""
//         aria-hidden="true"
//         fetchPriority="high"
//         decoding="async"
//         className="
//           absolute inset-0
//           w-full h-full
//           object-cover
//           object-center
//           lg:object-[68%_center]
//           select-none
//           pointer-events-none
//           transition-opacity
//           duration-[1200ms]
//           ease-in-out
//         "
//         style={{
//           opacity: videoReady
//             ? 0
//             : 0.62,
//         }}
//       />

//       {/* Layer 2: looping video */}
//       {video && (
//         <video
//           ref={videoRef}
//           src={video}
//           muted
//           loop
//           playsInline
//           preload="auto"
//           className="
//             absolute inset-0
//             w-full h-full
//             object-cover
//             object-center
//             lg:object-[68%_center]
//             select-none
//             pointer-events-none
//             transition-opacity
//             duration-[1200ms]
//             ease-in-out
//           "
//           style={{
//             opacity: videoReady
//               ? 0.62
//               : 0,
//           }}
//         />
//       )}

//       {/* Layer 3: directional dark vignette */}
//       <div
//         className="
//           absolute inset-0
//           pointer-events-none
//           bg-gradient-to-r
//           from-[#050A12]
//           via-[#050A12]/70
//           to-[#050A12]/15
//         "
//       />

//       {/* Layer 4: bottom scrim */}
//       <div
//         className="
//           absolute
//           bottom-0
//           left-0
//           right-0
//           h-44
//           bg-gradient-to-t
//           from-[#050A12]
//           to-transparent
//           pointer-events-none
//         "
//       />

//       {/* Layer 5: top scrim */}
//       <div
//         className="
//           absolute
//           top-0
//           left-0
//           right-0
//           h-36
//           bg-gradient-to-b
//           from-[#050A12]/70
//           to-transparent
//           pointer-events-none
//         "
//       />

//       {/* Layer 6: blue colour-grade */}
//       <div
//         className="
//           absolute inset-0
//           pointer-events-none
//           bg-[#0A1628]/30
//           mix-blend-multiply
//         "
//       />

//       {/* Layer 7: soft blue glow */}
//       <div
//         className="
//           absolute
//           top-[5%]
//           -left-[8%]
//           w-[55vw]
//           h-[55vw]
//           max-w-[680px]
//           max-h-[680px]
//           rounded-full
//           bg-[#0055A5]/18
//           blur-[130px]
//           pointer-events-none
//         "
//       />
//     </div>
//   );
// }

// // ─── LEAD FORM ────────────────────────────────────────────────────────────────
// interface LeadFormProps {
//   formData: {
//     name: string;
//     mobile: string;
//     car: string;
//   };
//   setFormData: React.Dispatch<
//     React.SetStateAction<{
//       name: string;
//       mobile: string;
//       car: string;
//     }>
//   >;
//   onSubmit: (e: FormEvent) => void;
//   submitted: boolean;
//   loading: boolean;
//   error: string;
//   carModels: string[];
// }

// function LeadForm({
//   formData,
//   setFormData,
//   onSubmit,
//   submitted,
//   loading,
//   error,
//   carModels,
// }: LeadFormProps) {
//   const inputCls = `
//     w-full
//     bg-white/6
//     border border-white/12
//     rounded-xl
//     px-4 py-3
//     text-white
//     text-[13px]
//     placeholder:text-white/25
//     focus:outline-none
//     focus:border-[#0055A5]/70
//     focus:bg-white/9
//     transition-colors
//     duration-150
//   `;

//   return (
//     <div
//       className="
//         bg-[#060C1A]/80
//         backdrop-blur-2xl
//         border border-white/10
//         rounded-2xl
//         p-6
//         shadow-[0_20px_60px_rgba(0,0,0,0.5)]
//       "
//     >
//       {submitted ? (
//         <div className="py-8 text-center">
//           <CheckCircle2
//             size={36}
//             className="text-[#0055A5] mx-auto mb-3"
//           />

//           <p className="text-white font-bold text-[16px]">
//             We'll call you back!
//           </p>

//           <p
//             className="
//               text-white/45
//               text-[13px]
//               mt-1.5
//               leading-relaxed
//             "
//           >
//             Our team will reach out within 24 hours.
//           </p>
//         </div>
//       ) : (
//         <form
//           onSubmit={onSubmit}
//           noValidate
//         >
//           <p
//             className="
//               text-white
//               font-bold
//               text-[15px]
//               tracking-[0.05em]
//               mb-5
//             "
//           >
//             GET YOUR OFFER
//           </p>

//           <div className="space-y-3.5 mb-5">

//             {/* Name */}
//             <div>
//               <label
//                 className="
//                   block
//                   text-[10px]
//                   text-white/35
//                   mb-1.5
//                   tracking-widest
//                   uppercase
//                 "
//               >
//                 Name
//               </label>

//               <input
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData((p) => ({
//                     ...p,
//                     name: e.target.value,
//                   }))
//                 }
//                 placeholder="Your full name"
//                 className={inputCls}
//               />
//             </div>

//             {/* Mobile */}
//             <div>
//               <label
//                 className="
//                   block
//                   text-[10px]
//                   text-white/35
//                   mb-1.5
//                   tracking-widest
//                   uppercase
//                 "
//               >
//                 Mobile
//               </label>

//               <input
//                 type="tel"
//                 required
//                 value={formData.mobile}
//                 onChange={(e) =>
//                   setFormData((p) => ({
//                     ...p,
//                     mobile: e.target.value,
//                   }))
//                 }
//                 placeholder="+91 00000 00000"
//                 className={inputCls}
//               />
//             </div>

//             {/* Car */}
//             <div>
//               <label
//                 className="
//                   block
//                   text-[10px]
//                   text-white/35
//                   mb-1.5
//                   tracking-widest
//                   uppercase
//                 "
//               >
//                 Car of Interest
//               </label>

//               <select
//                 value={formData.car}
//                 onChange={(e) =>
//                   setFormData((p) => ({
//                     ...p,
//                     car: e.target.value,
//                   }))
//                 }
//                 className={`
//                   ${inputCls}
//                   appearance-none
//                   [&>option]:bg-[#060C1A]
//                   [&>option]:text-white
//                 `}
//               >
//                 <option value="">
//                   Choose a model
//                 </option>

//                 {carModels.map((m) => (
//                   <option
//                     key={m}
//                     value={m}
//                   >
//                     {m}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Error */}
//           {error && (
//             <p
//               className="
//                 text-red-400
//                 text-[12px]
//                 mb-3
//                 leading-snug
//               "
//             >
//               {error}
//             </p>
//           )}

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="
//               w-full
//               flex items-center
//               justify-center
//               gap-2
//               py-3.5
//               rounded-xl
//               bg-[#0055A5]
//               hover:bg-[#1E7FE8]
//               disabled:opacity-60
//               disabled:cursor-not-allowed
//               text-white
//               font-bold
//               text-[13px]
//               tracking-[0.06em]
//               shadow-[0_4px_18px_rgba(0,85,165,0.4)]
//               hover:shadow-[0_8px_24px_rgba(30,127,232,0.5)]
//               transition-all
//               duration-200
//               group
//             "
//           >
//             {loading ? (
//               <Loader2
//                 size={16}
//                 className="animate-spin"
//               />
//             ) : (
//               <>
//                 GET MY OFFER

//                 <ArrowRight
//                   size={14}
//                   className="
//                     group-hover:translate-x-1
//                     transition-transform
//                   "
//                 />
//               </>
//             )}
//           </button>

//           <p
//             className="
//               text-[10px]
//               text-white/20
//               mt-3.5
//               text-center
//               leading-relaxed
//             "
//           >
//             *T&C apply. Our team will contact you within 24 hrs.
//           </p>
//         </form>
//       )}
//     </div>
//   );
// }

// // ─── TRUST STRIP ─────────────────────────────────────────────────────────────
// function TrustStrip() {
//   const items = [
//     "Authorized Tata Dealer",
//     "Multiple Showrooms",
//     "Test Drive Available",
//     "Easy Enquiry",
//   ];

//   return (
//     <div
//       className="
//         bg-[#050A12]
//         border-b border-white/6
//         py-4 px-5
//         overflow-x-auto
//       "
//     >
//       <div
//         className="
//           max-w-[1440px]
//           mx-auto
//           flex items-center
//           justify-center
//           gap-4
//           flex-wrap
//         "
//       >
//         {items.map((item, i) => (
//           <span
//             key={item}
//             className="
//               flex items-center
//               gap-3
//               text-[11px]
//               text-white/35
//               font-medium
//               uppercase
//               tracking-[0.14em]
//               whitespace-nowrap
//             "
//           >
//             {i > 0 && (
//               <span className="text-white/12">
//                 •
//               </span>
//             )}

//             {item}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }
















// // garud-tata/app/components/OfferHero.tsx

// "use client";

// import {
//   useState,
//   useRef,
//   useEffect,
//   useCallback,
//   type FormEvent,
// } from "react";
// import { motion } from "framer-motion";
// import {
//   ArrowRight,
//   CheckCircle2,
//   Phone,
//   MessageCircle,
//   Loader2,
// } from "lucide-react";

// // ─── TYPES ────────────────────────────────────────────────────────────────────

// export interface OfferHeroProps {
//   vehicle?: string;
//   headlineLine1?: string;
//   headlineLine2?: string;
//   description?: string;
//   offerLabel?: string;
//   offerValue?: string;
//   phone?: string;
//   whatsappNumber?: string;
//   offerSectionId?: string;
//   carModels?: string[];

//   /**
//    * Static image shown instantly while video loads
//    * or as permanent fallback.
//    */
//   backgroundImage?: string;

//   /**
//    * Optional looping promo video.
//    * Cross-fades in over the image once the browser
//    * has buffered enough to play.
//    * Falls back to image on error.
//    */
//   backgroundVideo?: string;
// }

// // ─── DEFAULT CAR MODELS ────────────────────────────────────────────────────────

// const DEFAULT_MODELS = [
//   // ICE
//   "Tata Tiago",
//   "Tata Tigor",
//   "Tata Altroz",
//   "Tata Punch",
//   "Tata Nexon",
//   "Tata Curvv",
//   "Tata Harrier",
//   "Tata Safari",

//   // EV
//   "Tata Tiago EV",
//   "Tata Punch EV",
//   "Tata Nexon EV",
//   "Tata Curvv EV",
//   "Tata Harrier EV",
// ];

// const EASE = [0.16, 1, 0.3, 1] as const;

// const fadeUp = (delay = 0) => ({
//   hidden: {
//     opacity: 0,
//     y: 20,
//   },

//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: EASE,
//       delay,
//     },
//   },
// });

// const lineReveal = (delay = 0) => ({
//   hidden: {
//     y: "108%",
//   },

//   visible: {
//     y: "0%",
//     transition: {
//       duration: 0.7,
//       ease: EASE,
//       delay,
//     },
//   },
// });

// // ─── COMPONENT ────────────────────────────────────────────────────────────────

// export default function OfferHero({
//   vehicle,
//   headlineLine1,
//   headlineLine2,
//   description = "Explore exciting benefits on selected Tata cars at Garud Tata. Submit your details and our team will get in touch with you.",
//   offerLabel,
//   offerValue,
//   phone = "+919876543210",
//   whatsappNumber = "919876543210",
//   offerSectionId = "offer-form",
//   carModels = DEFAULT_MODELS,
//   backgroundImage = "/images/vehicles/sierrakv-3.avif",
//   backgroundVideo,
// }: OfferHeroProps) {
//   const displayVehicle = vehicle
//     ? `Tata ${vehicle}`
//     : undefined;

//   const hl1 =
//     headlineLine1 ??
//     (vehicle ? "Drive Home Your" : "Drive Home");

//   const hl2 =
//     headlineLine2 ??
//     (vehicle
//       ? displayVehicle!
//       : "Your Dream Tata.");

//   const badgeLabel =
//     offerLabel ??
//     (vehicle
//       ? `EXCLUSIVE ${vehicle.toUpperCase()} OFFER`
//       : "EXCLUSIVE OFFER");

//   const waMessage = vehicle
//     ? `Hi Garud Tata, I am interested in the Tata ${vehicle} offer. Please share the details.`
//     : `Hi Garud Tata, I am interested in the latest Tata car offers. Please share the current offers.`;

//   const scrollTo = useCallback((id: string) => {
//     document
//       .getElementById(id)
//       ?.scrollIntoView({
//         behavior: "smooth",
//       });
//   }, []);

//   // ── Quick lead form state ─────────────────────────────────────────────────

//   const [formData, setFormData] = useState({
//     name: "",
//     mobile: "",
//     car: vehicle ? `Tata ${vehicle}` : "",
//   });

//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [formError, setFormError] = useState("");

//   const handleSubmit = useCallback(
//     async (e: FormEvent) => {
//       e.preventDefault();

//       setFormError("");

//       if (!formData.name.trim()) {
//         setFormError("Please enter your name.");
//         return;
//       }

//       if (
//         formData.mobile.replace(/\D/g, "").length < 10
//       ) {
//         setFormError(
//           "Please enter a valid mobile number."
//         );
//         return;
//       }

//       setLoading(true);

//       try {
//         const res = await fetch("/api/enquiry", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             ...formData,
//             source: "hero-form",
//           }),
//         });

//         if (!res.ok) {
//           const data = await res.json();

//           throw new Error(
//             data.error ?? "Submission failed."
//           );
//         }

//         setSubmitted(true);

//         setTimeout(
//           () => scrollTo(offerSectionId),
//           400
//         );
//       } catch (err: unknown) {
//         setFormError(
//           err instanceof Error
//             ? err.message
//             : "Something went wrong."
//         );
//       } finally {
//         setLoading(false);
//       }
//     },
//     [
//       formData,
//       offerSectionId,
//       scrollTo,
//     ]
//   );

//   return (
//     <>
//       {/* ════════════════════════════════════════════
//           HERO SECTION
//       ════════════════════════════════════════════ */}

//       <section
//         id="hero"
//         className="
//           relative w-full overflow-hidden bg-[#050A12]
//           min-h-[680px]
//           flex items-center
//         "
//         aria-label="Hero — Garud Tata Exclusive Offers"
//       >
//         {/* ── Cinematic background ─────────────────────────────── */}

//         <HeroBackground
//           image={backgroundImage}
//           video={backgroundVideo}
//         />

//         {/* ── Content ──────────────────────────────────────────── */}

//         <div
//           className="
//             relative z-10
//             w-full max-w-[1440px] mx-auto
//             px-5 lg:px-16
//             py-[120px] lg:py-[140px]
//             grid grid-cols-1 xl:grid-cols-[1fr_320px]
//             gap-10 xl:gap-16
//             items-center
//           "
//         >
//           {/* LEFT — hero copy */}

//           <div className="flex flex-col max-w-[720px]">

//             {/* Badge row */}

//             <motion.div
//               variants={fadeUp(0.05)}
//               initial="hidden"
//               animate="visible"
//               className="mb-6 flex items-center gap-3 flex-wrap"
//             >
//               <span className="text-[10px] font-bold tracking-[0.28em] text-white/40 uppercase">
//                 GARUD TATA · NEW DELHI
//               </span>

//               <span
//                 className="
//                   inline-flex items-center gap-2
//                   px-3.5 py-1.5 rounded-full
//                   bg-[#0055A5]/20
//                   border border-[#0055A5]/40
//                   text-[#5BA3E8]
//                   text-[11px]
//                   font-semibold
//                   tracking-[0.16em]
//                   uppercase
//                 "
//               >
//                 <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8] animate-pulse" />

//                 {badgeLabel}
//               </span>
//             </motion.div>

//             {/* Headline */}

//             <div className="mb-7">
//               <div className="overflow-hidden mb-1">
//                 <motion.h1
//                   variants={lineReveal(0.1)}
//                   initial="hidden"
//                   animate="visible"
//                   className="
//                     font-extrabold
//                     tracking-tight
//                     leading-[1.0]
//                     text-[clamp(3rem,6.5vw,6rem)]
//                     text-white
//                   "
//                 >
//                   {hl1}
//                 </motion.h1>
//               </div>

//               <div className="overflow-hidden">
//                 <motion.h1
//                   variants={lineReveal(0.18)}
//                   initial="hidden"
//                   animate="visible"
//                   className="
//                     font-extrabold
//                     tracking-tight
//                     leading-[1.0]
//                     text-[clamp(3rem,6.5vw,6rem)]
//                     bg-gradient-to-r
//                     from-white
//                     via-[#A8CAFF]
//                     to-[#5BA3E8]
//                     bg-clip-text
//                     text-transparent
//                   "
//                 >
//                   {hl2}
//                 </motion.h1>
//               </div>
//             </div>

//             {/* Offer value pill */}

//             <motion.div
//               variants={fadeUp(0.26)}
//               initial="hidden"
//               animate="visible"
//               className="mb-6"
//             >
//               {offerValue ? (
//                 <span
//                   className="
//                     inline-block
//                     px-5 py-2.5
//                     rounded-xl
//                     bg-[#0055A5]
//                     text-white
//                     text-[14px]
//                     font-bold
//                     tracking-[0.06em]
//                     shadow-[0_4px_24px_rgba(0,85,165,0.5)]
//                   "
//                 >
//                   BENEFITS UP TO {offerValue}*
//                 </span>
//               ) : (
//                 <span
//                   className="
//                     inline-block
//                     px-5 py-2.5
//                     rounded-xl
//                     bg-white/8
//                     border border-white/15
//                     text-white/70
//                     text-[13px]
//                     font-semibold
//                     tracking-[0.06em]
//                   "
//                 >
//                   SPECIAL BENEFITS AVAILABLE
//                 </span>
//               )}
//             </motion.div>

//             {/* Description */}

//             <motion.p
//               variants={fadeUp(0.32)}
//               initial="hidden"
//               animate="visible"
//               className="
//                 text-white/55
//                 text-[16px]
//                 leading-relaxed
//                 max-w-[540px]
//                 mb-9
//               "
//             >
//               {description}
//             </motion.p>

//             {/* CTA buttons */}

//             <motion.div
//               variants={fadeUp(0.4)}
//               initial="hidden"
//               animate="visible"
//               className="flex flex-col sm:flex-row gap-3 mb-9"
//             >
//               <button
//                 onClick={() => {
//                   scrollTo(offerSectionId);
//                 }}
//                 className="
//                   group
//                   flex items-center
//                   justify-center
//                   gap-2.5
//                   px-8 py-[16px]
//                   rounded-full
//                   bg-[#0055A5]
//                   hover:bg-[#1E7FE8]
//                   text-white
//                   font-bold
//                   text-[14px]
//                   tracking-[0.06em]
//                   shadow-[0_4px_24px_rgba(0,85,165,0.45)]
//                   hover:shadow-[0_8px_32px_rgba(30,127,232,0.55)]
//                   hover:-translate-y-0.5
//                   transition-all
//                   duration-250
//                 "
//               >
//                 GET MY OFFER

//                 <ArrowRight
//                   size={16}
//                   className="
//                     group-hover:translate-x-1
//                     transition-transform
//                     duration-200
//                   "
//                 />
//               </button>

//               <button
//                 onClick={() => {
//                   scrollTo("test-drive");
//                 }}
//                 className="
//                   group
//                   flex items-center
//                   justify-center
//                   gap-2.5
//                   px-8 py-[16px]
//                   rounded-full
//                   bg-white/6
//                   backdrop-blur-md
//                   border border-white/20
//                   hover:border-white/40
//                   hover:bg-white/10
//                   text-white
//                   font-medium
//                   text-[14px]
//                   tracking-[0.04em]
//                   hover:-translate-y-0.5
//                   transition-all
//                   duration-250
//                 "
//               >
//                 BOOK TEST DRIVE
//               </button>
//             </motion.div>

//             {/* Trust indicators */}

//             <motion.div
//               variants={fadeUp(0.48)}
//               initial="hidden"
//               animate="visible"
//               className="flex flex-wrap gap-x-6 gap-y-2"
//             >
//               {[
//                 "Authorized Tata Dealer",
//                 "Multiple Delhi Locations",
//                 "Easy Enquiry",
//               ].map((label) => (
//                 <span
//                   key={label}
//                   className="
//                     flex items-center gap-1.5
//                     text-[12px]
//                     text-white/45
//                     font-medium
//                   "
//                 >
//                   <CheckCircle2
//                     size={13}
//                     className="text-[#0055A5] flex-shrink-0"
//                   />

//                   {label}
//                 </span>
//               ))}
//             </motion.div>
//           </div>

//           {/* RIGHT — Quick lead form */}

//           <motion.div
//             initial={{
//               opacity: 0,
//               y: 20,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             transition={{
//               delay: 0.55,
//               duration: 0.6,
//               ease: EASE,
//             }}
//             className="hidden xl:block"
//           >
//             <LeadForm
//               formData={formData}
//               setFormData={setFormData}
//               onSubmit={handleSubmit}
//               submitted={submitted}
//               loading={loading}
//               error={formError}
//               carModels={carModels}
//             />
//           </motion.div>
//         </div>

//         {/* Bottom gradient */}

//         <div
//           className="
//             absolute
//             bottom-0
//             left-0
//             right-0
//             h-28
//             bg-gradient-to-t
//             from-[#050A12]
//             to-transparent
//             z-10
//             pointer-events-none
//           "
//         />
//       </section>

//       {/* TRUST STRIP */}

//       <TrustStrip />

//       {/* MOBILE STICKY BOTTOM BAR */}

//       <div
//         className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
//         style={{
//           paddingBottom:
//             "env(safe-area-inset-bottom, 0px)",
//         }}
//       >
//         <div
//           className="
//             bg-[#060B18]/96
//             backdrop-blur-xl
//             border-t border-white/10
//             grid grid-cols-3
//             h-[72px]
//           "
//         >
//           {/* Call */}

//           <a
//             href={`tel:${phone}`}
//             className="
//               flex flex-col
//               items-center
//               justify-center
//               gap-1
//               text-white/60
//               hover:text-white
//               transition-colors
//             "
//             aria-label={`Call ${phone}`}
//           >
//             <Phone
//               size={19}
//               strokeWidth={1.5}
//             />

//             <span
//               className="
//                 text-[9px]
//                 uppercase
//                 tracking-wider
//                 font-semibold
//               "
//             >
//               Call
//             </span>
//           </a>

//           {/* WhatsApp */}

//           <a
//             href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
//               waMessage
//             )}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="
//               flex flex-col
//               items-center
//               justify-center
//               gap-1
//               text-[#25D366]/70
//               hover:text-[#25D366]
//               transition-colors
//             "
//             aria-label="Chat on WhatsApp"
//           >
//             <MessageCircle
//               size={19}
//               strokeWidth={1.5}
//             />

//             <span
//               className="
//                 text-[9px]
//                 uppercase
//                 tracking-wider
//                 font-semibold
//               "
//             >
//               WhatsApp
//             </span>
//           </a>

//           {/* Get Offer */}

//           <button
//             onClick={() => {
//               scrollTo(offerSectionId);
//             }}
//             className="
//               flex flex-col
//               items-center
//               justify-center
//               gap-1
//               bg-[#0055A5]
//               active:bg-[#004494]
//               text-white
//               transition-colors
//             "
//           >
//             <ArrowRight
//               size={19}
//               strokeWidth={1.8}
//             />

//             <span
//               className="
//                 text-[9px]
//                 uppercase
//                 tracking-wider
//                 font-bold
//               "
//             >
//               Get Offer
//             </span>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }

// // ─── BACKGROUND ───────────────────────────────────────────────────────────────
// // Image renders immediately while video loads.
// // Video cross-fades in once ready.
// // Image remains as fallback if video fails.

// interface HeroBgProps {
//   image: string;
//   video?: string;
// }

// function HeroBackground({
//   image,
//   video,
// }: HeroBgProps) {
//   const videoRef =
//     useRef<HTMLVideoElement>(null);

//   const [videoReady, setVideoReady] =
//     useState(false);

//   useEffect(() => {
//     const el = videoRef.current;

//     if (!el || !video) return;

//     setVideoReady(false);

//     const onCanPlay = () => {
//       el.play().catch(() => {
//         // Autoplay blocked — image stays visible.
//       });

//       setVideoReady(true);
//     };

//     const onError = () =>
//       setVideoReady(false);

//     el.addEventListener(
//       "canplay",
//       onCanPlay,
//       { once: true }
//     );

//     el.addEventListener(
//       "error",
//       onError,
//       { once: true }
//     );

//     return () => {
//       el.removeEventListener(
//         "canplay",
//         onCanPlay
//       );

//       el.removeEventListener(
//         "error",
//         onError
//       );
//     };
//   }, [video]);

//   return (
//     <div className="absolute inset-0 z-0 overflow-hidden">

//       {/* Layer 0: dark base */}

//       <div className="absolute inset-0 bg-[#050A12]" />

//       {/* Layer 1: static image */}

//       <img
//         src={image}
//         alt=""
//         aria-hidden="true"
//         fetchPriority="high"
//         decoding="async"
//         className="
//           absolute inset-0
//           w-full h-full
//           object-cover
//           object-center
//           lg:object-[68%_center]
//           select-none
//           pointer-events-none
//           transition-opacity
//           duration-[1200ms]
//           ease-in-out
//         "
//         style={{
//           opacity: videoReady
//             ? 0
//             : 0.62,
//         }}
//       />

//       {/* Layer 2: looping video */}

//       {video && (
//         <video
//           ref={videoRef}
//           src={video}
//           muted
//           loop
//           playsInline
//           preload="auto"
//           className="
//             absolute inset-0
//             w-full h-full
//             object-cover
//             object-center
//             lg:object-[68%_center]
//             select-none
//             pointer-events-none
//             transition-opacity
//             duration-[1200ms]
//             ease-in-out
//           "
//           style={{
//             opacity: videoReady
//               ? 0.62
//               : 0,
//           }}
//         />
//       )}

//       {/* Layer 3: directional dark vignette */}

//       <div
//         className="
//           absolute inset-0
//           pointer-events-none
//           bg-gradient-to-r
//           from-[#050A12]
//           via-[#050A12]/70
//           to-[#050A12]/15
//         "
//       />

//       {/* Layer 4: bottom scrim */}

//       <div
//         className="
//           absolute
//           bottom-0
//           left-0
//           right-0
//           h-44
//           bg-gradient-to-t
//           from-[#050A12]
//           to-transparent
//           pointer-events-none
//         "
//       />

//       {/* Layer 5: top scrim */}

//       <div
//         className="
//           absolute
//           top-0
//           left-0
//           right-0
//           h-36
//           bg-gradient-to-b
//           from-[#050A12]/70
//           to-transparent
//           pointer-events-none
//         "
//       />

//       {/* Layer 6: blue colour-grade */}

//       <div
//         className="
//           absolute inset-0
//           pointer-events-none
//           bg-[#0A1628]/30
//           mix-blend-multiply
//         "
//       />

//       {/* Layer 7: soft blue glow */}

//       <div
//         className="
//           absolute
//           top-[5%]
//           -left-[8%]
//           w-[55vw]
//           h-[55vw]
//           max-w-[680px]
//           max-h-[680px]
//           rounded-full
//           bg-[#0055A5]/18
//           blur-[130px]
//           pointer-events-none
//         "
//       />
//     </div>
//   );
// }

// // ─── LEAD FORM ────────────────────────────────────────────────────────────────

// interface LeadFormProps {
//   formData: {
//     name: string;
//     mobile: string;
//     car: string;
//   };

//   setFormData: React.Dispatch<
//     React.SetStateAction<{
//       name: string;
//       mobile: string;
//       car: string;
//     }>
//   >;

//   onSubmit: (e: FormEvent) => void;

//   submitted: boolean;
//   loading: boolean;
//   error: string;
//   carModels: string[];
// }

// function LeadForm({
//   formData,
//   setFormData,
//   onSubmit,
//   submitted,
//   loading,
//   error,
//   carModels,
// }: LeadFormProps) {
//   const inputCls = `
//     w-full
//     bg-white/6
//     border border-white/12
//     rounded-xl
//     px-4 py-3
//     text-white
//     text-[13px]
//     placeholder:text-white/25
//     focus:outline-none
//     focus:border-[#0055A5]/70
//     focus:bg-white/9
//     transition-colors
//     duration-150
//   `;

//   return (
//     <div
//       className="
//         bg-[#060C1A]/80
//         backdrop-blur-2xl
//         border border-white/10
//         rounded-2xl
//         p-6
//         shadow-[0_20px_60px_rgba(0,0,0,0.5)]
//       "
//     >
//       {submitted ? (
//         <div className="py-8 text-center">

//           <CheckCircle2
//             size={36}
//             className="text-[#0055A5] mx-auto mb-3"
//           />

//           <p className="text-white font-bold text-[16px]">
//             We'll call you back!
//           </p>

//           <p
//             className="
//               text-white/45
//               text-[13px]
//               mt-1.5
//               leading-relaxed
//             "
//           >
//             Our team will reach out within 24 hours.
//           </p>
//         </div>
//       ) : (
//         <form
//           onSubmit={onSubmit}
//           noValidate
//         >
//           <p
//             className="
//               text-white
//               font-bold
//               text-[15px]
//               tracking-[0.05em]
//               mb-5
//             "
//           >
//             GET YOUR OFFER
//           </p>

//           <div className="space-y-3.5 mb-5">

//             {/* Name */}

//             <div>
//               <label
//                 className="
//                   block
//                   text-[10px]
//                   text-white/35
//                   mb-1.5
//                   tracking-widest
//                   uppercase
//                 "
//               >
//                 Name
//               </label>

//               <input
//                 type="text"
//                 required
//                 value={formData.name}
//                 onChange={(e) =>
//                   setFormData((p) => ({
//                     ...p,
//                     name: e.target.value,
//                   }))
//                 }
//                 placeholder="Your full name"
//                 className={inputCls}
//               />
//             </div>

//             {/* Mobile */}

//             <div>
//               <label
//                 className="
//                   block
//                   text-[10px]
//                   text-white/35
//                   mb-1.5
//                   tracking-widest
//                   uppercase
//                 "
//               >
//                 Mobile
//               </label>

//               <input
//                 type="tel"
//                 required
//                 value={formData.mobile}
//                 onChange={(e) =>
//                   setFormData((p) => ({
//                     ...p,
//                     mobile: e.target.value,
//                   }))
//                 }
//                 placeholder="+91 00000 00000"
//                 className={inputCls}
//               />
//             </div>

//             {/* Car */}

//             <div>
//               <label
//                 className="
//                   block
//                   text-[10px]
//                   text-white/35
//                   mb-1.5
//                   tracking-widest
//                   uppercase
//                 "
//               >
//                 Car of Interest
//               </label>

//               <select
//                 value={formData.car}
//                 onChange={(e) =>
//                   setFormData((p) => ({
//                     ...p,
//                     car: e.target.value,
//                   }))
//                 }
//                 className={`
//                   ${inputCls}
//                   appearance-none
//                   [&>option]:bg-[#060C1A]
//                   [&>option]:text-white
//                 `}
//               >
//                 <option value="">
//                   Choose a model
//                 </option>

//                 {carModels.map((m) => (
//                   <option
//                     key={m}
//                     value={m}
//                   >
//                     {m}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Error */}

//           {error && (
//             <p
//               className="
//                 text-red-400
//                 text-[12px]
//                 mb-3
//                 leading-snug
//               "
//             >
//               {error}
//             </p>
//           )}

//           {/* Submit */}

//           <button
//             type="submit"
//             disabled={loading}
//             className="
//               w-full
//               flex items-center
//               justify-center
//               gap-2
//               py-3.5
//               rounded-xl
//               bg-[#0055A5]
//               hover:bg-[#1E7FE8]
//               disabled:opacity-60
//               disabled:cursor-not-allowed
//               text-white
//               font-bold
//               text-[13px]
//               tracking-[0.06em]
//               shadow-[0_4px_18px_rgba(0,85,165,0.4)]
//               hover:shadow-[0_8px_24px_rgba(30,127,232,0.5)]
//               transition-all
//               duration-200
//               group
//             "
//           >
//             {loading ? (
//               <Loader2
//                 size={16}
//                 className="animate-spin"
//               />
//             ) : (
//               <>
//                 GET MY OFFER

//                 <ArrowRight
//                   size={14}
//                   className="
//                     group-hover:translate-x-1
//                     transition-transform
//                   "
//                 />
//               </>
//             )}
//           </button>

//           <p
//             className="
//               text-[10px]
//               text-white/20
//               mt-3.5
//               text-center
//               leading-relaxed
//             "
//           >
//             *T&C apply. Our team will contact you within 24 hrs.
//           </p>
//         </form>
//       )}
//     </div>
//   );
// }

// // ─── TRUST STRIP ─────────────────────────────────────────────────────────────

// function TrustStrip() {
//   const items = [
//     "Authorized Tata Dealer",
//     "Multiple Showrooms",
//     "Test Drive Available",
//     "Easy Enquiry",
//   ];

//   return (
//     <div
//       className="
//         bg-[#050A12]
//         border-b border-white/6
//         py-4 px-5
//         overflow-x-auto
//       "
//     >
//       <div
//         className="
//           max-w-[1440px]
//           mx-auto
//           flex items-center
//           justify-center
//           gap-4
//           flex-wrap
//         "
//       >
//         {items.map((item, i) => (
//           <span
//             key={item}
//             className="
//               flex items-center
//               gap-3
//               text-[11px]
//               text-white/35
//               font-medium
//               uppercase
//               tracking-[0.14em]
//               whitespace-nowrap
//             "
//           >
//             {i > 0 && (
//               <span className="text-white/12">
//                 •
//               </span>
//             )}

//             {item}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// }















// garud-tata/app/components/OfferHero.tsx

"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type FormEvent,
} from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Loader2,
} from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────

export interface OfferHeroProps {
  vehicle?: string;
  headlineLine1?: string;
  headlineLine2?: string;
  description?: string;
  offerLabel?: string;
  offerValue?: string;
  phone?: string;
  whatsappNumber?: string;
  offerSectionId?: string;
  carModels?: string[];

  /**
   * Static image shown instantly while video loads
   * or as permanent fallback.
   */
  backgroundImage?: string;

  /**
   * Optional looping promo video.
   * Cross-fades in over the image once the browser
   * has buffered enough to play.
   * Falls back to image on error.
   */
  backgroundVideo?: string;
}

// ─── DEFAULT CAR MODELS ────────────────────────────────────────────────────────

const DEFAULT_MODELS = [
  // ICE
  "Tata Tiago",
  "Tata Tigor",
  "Tata Altroz",
  "Tata Punch",
  "Tata Nexon",
  "Tata Curvv",
  "Tata Harrier",
  "Tata Safari",

  // EV
  "Tata Tiago EV",
  "Tata Punch EV",
  "Tata Nexon EV",
  "Tata Curvv EV",
  "Tata Harrier EV",
];

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay = 0) => ({
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: EASE,
      delay,
    },
  },
});

const lineReveal = (delay = 0) => ({
  hidden: {
    y: "108%",
  },

  visible: {
    y: "0%",
    transition: {
      duration: 0.7,
      ease: EASE,
      delay,
    },
  },
});

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function OfferHero({
  vehicle,
  headlineLine1,
  headlineLine2,
  description = "Explore exciting benefits on selected Tata cars at Garud Tata. Submit your details and our team will get in touch with you.",
  offerLabel,
  offerValue,
  phone = "+919876543210",
  whatsappNumber = "919876543210",
  offerSectionId = "offer-form",
  carModels = DEFAULT_MODELS,
  backgroundImage = "/images/vehicles/sierrakv-3.avif",
  backgroundVideo,
}: OfferHeroProps) {
  const displayVehicle = vehicle
    ? `Tata ${vehicle}`
    : undefined;

  const hl1 =
    headlineLine1 ??
    (vehicle ? "Drive Home Your" : "Drive Home");

  const hl2 =
    headlineLine2 ??
    (vehicle
      ? displayVehicle!
      : "Your Dream Tata.");

  const badgeLabel =
    offerLabel ??
    (vehicle
      ? `EXCLUSIVE ${vehicle.toUpperCase()} OFFER`
      : "EXCLUSIVE OFFER");

  const waMessage = vehicle
    ? `Hi Garud Tata, I am interested in the Tata ${vehicle} offer. Please share the details.`
    : `Hi Garud Tata, I am interested in the latest Tata car offers. Please share the current offers.`;

  const scrollTo = useCallback((id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }, []);

  // Opens the Contact section on a specific tab (e.g. "testdrive") and
  // scrolls to it. Contact.tsx listens for this event.
  const openContactTab = useCallback(
    (tab: string) => {
      window.dispatchEvent(
        new CustomEvent("garud:select-contact-tab", { detail: tab })
      );
      scrollTo("contact");
    },
    [scrollTo]
  );

  // ── Quick lead form state ─────────────────────────────────────────────────

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    car: vehicle ? `Tata ${vehicle}` : "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      setFormError("");

      if (!formData.name.trim()) {
        setFormError("Please enter your name.");
        return;
      }

      if (
        formData.mobile.replace(/\D/g, "").length < 10
      ) {
        setFormError(
          "Please enter a valid mobile number."
        );
        return;
      }

      setLoading(true);

      try {
        const res = await fetch("/api/enquiry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            source: "hero-form",
          }),
        });

        if (!res.ok) {
          const data = await res.json();

          throw new Error(
            data.error ?? "Submission failed."
          );
        }

        setSubmitted(true);

        setTimeout(
          () => scrollTo(offerSectionId),
          400
        );
      } catch (err: unknown) {
        setFormError(
          err instanceof Error
            ? err.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    },
    [
      formData,
      offerSectionId,
      scrollTo,
    ]
  );

  return (
    <>
      {/* ════════════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════════════ */}

      <section
        id="hero"
        className="
          relative w-full overflow-hidden bg-[#050A12]
          min-h-[680px]
          flex items-center
        "
        aria-label="Hero — Garud Tata Exclusive Offers"
      >
        {/* ── Cinematic background ─────────────────────────────── */}

        <HeroBackground
          image={backgroundImage}
          video={backgroundVideo}
        />

        {/* ── Content ──────────────────────────────────────────── */}

        <div
          className="
            relative z-10
            w-full max-w-[1440px] mx-auto
            px-5 lg:px-16
            py-[120px] lg:py-[140px]
            grid grid-cols-1 xl:grid-cols-[1fr_320px]
            gap-10 xl:gap-16
            items-center
          "
        >
          {/* LEFT — hero copy */}

          <div className="flex flex-col max-w-[720px]">

            {/* Badge row */}

            <motion.div
              variants={fadeUp(0.05)}
              initial="hidden"
              animate="visible"
              className="mb-6 flex items-center gap-3 flex-wrap"
            >
              <span className="text-[10px] font-bold tracking-[0.28em] text-white/40 uppercase">
                GARUD TATA · NEW DELHI
              </span>

              <span
                className="
                  inline-flex items-center gap-2
                  px-3.5 py-1.5 rounded-full
                  bg-[#0055A5]/20
                  border border-[#0055A5]/40
                  text-[#5BA3E8]
                  text-[11px]
                  font-semibold
                  tracking-[0.16em]
                  uppercase
                "
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8] animate-pulse" />

                {badgeLabel}
              </span>
            </motion.div>

            {/* Headline */}

            <div className="mb-7">
              <div className="overflow-hidden mb-1">
                <motion.h1
                  variants={lineReveal(0.1)}
                  initial="hidden"
                  animate="visible"
                  className="
                    font-extrabold
                    tracking-tight
                    leading-[1.0]
                    text-[clamp(3rem,6.5vw,6rem)]
                    text-white
                  "
                >
                  {hl1}
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  variants={lineReveal(0.18)}
                  initial="hidden"
                  animate="visible"
                  className="
                    font-extrabold
                    tracking-tight
                    leading-[1.0]
                    text-[clamp(3rem,6.5vw,6rem)]
                    bg-gradient-to-r
                    from-white
                    via-[#A8CAFF]
                    to-[#5BA3E8]
                    bg-clip-text
                    text-transparent
                  "
                >
                  {hl2}
                </motion.h1>
              </div>
            </div>

            {/* Offer value pill */}

            <motion.div
              variants={fadeUp(0.26)}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              {offerValue ? (
                <span
                  className="
                    inline-block
                    px-5 py-2.5
                    rounded-xl
                    bg-[#0055A5]
                    text-white
                    text-[14px]
                    font-bold
                    tracking-[0.06em]
                    shadow-[0_4px_24px_rgba(0,85,165,0.5)]
                  "
                >
                  BENEFITS UP TO {offerValue}*
                </span>
              ) : (
                <span
                  className="
                    inline-block
                    px-5 py-2.5
                    rounded-xl
                    bg-white/8
                    border border-white/15
                    text-white/70
                    text-[13px]
                    font-semibold
                    tracking-[0.06em]
                  "
                >
                  SPECIAL BENEFITS AVAILABLE
                </span>
              )}
            </motion.div>

            {/* Description */}

            <motion.p
              variants={fadeUp(0.32)}
              initial="hidden"
              animate="visible"
              className="
                text-white/55
                text-[16px]
                leading-relaxed
                max-w-[540px]
                mb-9
              "
            >
              {description}
            </motion.p>

            {/* CTA buttons */}

            <motion.div
              variants={fadeUp(0.4)}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row gap-3 mb-9"
            >
              <button
                onClick={() => {
                  scrollTo(offerSectionId);
                }}
                className="
                  group
                  flex items-center
                  justify-center
                  gap-2.5
                  px-8 py-[16px]
                  rounded-full
                  bg-[#0055A5]
                  hover:bg-[#1E7FE8]
                  text-white
                  font-bold
                  text-[14px]
                  tracking-[0.06em]
                  shadow-[0_4px_24px_rgba(0,85,165,0.45)]
                  hover:shadow-[0_8px_32px_rgba(30,127,232,0.55)]
                  hover:-translate-y-0.5
                  transition-all
                  duration-250
                "
              >
                GET MY OFFER

                <ArrowRight
                  size={16}
                  className="
                    group-hover:translate-x-1
                    transition-transform
                    duration-200
                  "
                />
              </button>

              <button
                onClick={() => {
                  openContactTab("testdrive");
                }}
                className="
                  group
                  flex items-center
                  justify-center
                  gap-2.5
                  px-8 py-[16px]
                  rounded-full
                  bg-white/6
                  backdrop-blur-md
                  border border-white/20
                  hover:border-white/40
                  hover:bg-white/10
                  text-white
                  font-medium
                  text-[14px]
                  tracking-[0.04em]
                  hover:-translate-y-0.5
                  transition-all
                  duration-250
                "
              >
                BOOK TEST DRIVE
              </button>
            </motion.div>

            {/* Trust indicators */}

            <motion.div
              variants={fadeUp(0.48)}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-x-6 gap-y-2"
            >
              {[
                "Authorized Tata Dealer",
                "Multiple Delhi Locations",
                "Easy Enquiry",
              ].map((label) => (
                <span
                  key={label}
                  className="
                    flex items-center gap-1.5
                    text-[12px]
                    text-white/45
                    font-medium
                  "
                >
                  <CheckCircle2
                    size={13}
                    className="text-[#0055A5] flex-shrink-0"
                  />

                  {label}
                </span>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Quick lead form */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.55,
              duration: 0.6,
              ease: EASE,
            }}
            className="hidden xl:block"
          >
            <LeadForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              submitted={submitted}
              loading={loading}
              error={formError}
              carModels={carModels}
            />
          </motion.div>
        </div>

        {/* Bottom gradient */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            h-28
            bg-gradient-to-t
            from-[#050A12]
            to-transparent
            z-10
            pointer-events-none
          "
        />
      </section>

      {/* TRUST STRIP */}

      <TrustStrip />

      {/* MOBILE STICKY BOTTOM BAR */}

      <div
        className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
        style={{
          paddingBottom:
            "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div
          className="
            bg-[#060B18]/96
            backdrop-blur-xl
            border-t border-white/10
            grid grid-cols-3
            h-[72px]
          "
        >
          {/* Call */}

          <a
            href={`tel:${phone}`}
            className="
              flex flex-col
              items-center
              justify-center
              gap-1
              text-white/60
              hover:text-white
              transition-colors
            "
            aria-label={`Call ${phone}`}
          >
            <Phone
              size={19}
              strokeWidth={1.5}
            />

            <span
              className="
                text-[9px]
                uppercase
                tracking-wider
                font-semibold
              "
            >
              Call
            </span>
          </a>

          {/* WhatsApp */}

          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              waMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex flex-col
              items-center
              justify-center
              gap-1
              text-[#25D366]/70
              hover:text-[#25D366]
              transition-colors
            "
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle
              size={19}
              strokeWidth={1.5}
            />

            <span
              className="
                text-[9px]
                uppercase
                tracking-wider
                font-semibold
              "
            >
              WhatsApp
            </span>
          </a>

          {/* Get Offer */}

          <button
            onClick={() => {
              scrollTo(offerSectionId);
            }}
            className="
              flex flex-col
              items-center
              justify-center
              gap-1
              bg-[#0055A5]
              active:bg-[#004494]
              text-white
              transition-colors
            "
          >
            <ArrowRight
              size={19}
              strokeWidth={1.8}
            />

            <span
              className="
                text-[9px]
                uppercase
                tracking-wider
                font-bold
              "
            >
              Get Offer
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

// ─── BACKGROUND ───────────────────────────────────────────────────────────────
// Image renders immediately while video loads.
// Video cross-fades in once ready.
// Image remains as fallback if video fails.

interface HeroBgProps {
  image: string;
  video?: string;
}

function HeroBackground({
  image,
  video,
}: HeroBgProps) {
  const videoRef =
    useRef<HTMLVideoElement>(null);

  const [videoReady, setVideoReady] =
    useState(false);

  useEffect(() => {
    const el = videoRef.current;

    if (!el || !video) return;

    setVideoReady(false);

    const onCanPlay = () => {
      el.play().catch(() => {
        // Autoplay blocked — image stays visible.
      });

      setVideoReady(true);
    };

    const onError = () =>
      setVideoReady(false);

    el.addEventListener(
      "canplay",
      onCanPlay,
      { once: true }
    );

    el.addEventListener(
      "error",
      onError,
      { once: true }
    );

    return () => {
      el.removeEventListener(
        "canplay",
        onCanPlay
      );

      el.removeEventListener(
        "error",
        onError
      );
    };
  }, [video]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">

      {/* Layer 0: dark base */}

      <div className="absolute inset-0 bg-[#050A12]" />

      {/* Layer 1: static image */}

      <img
        src={image}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
        className="
          absolute inset-0
          w-full h-full
          object-cover
          object-center
          lg:object-[68%_center]
          select-none
          pointer-events-none
          transition-opacity
          duration-[1200ms]
          ease-in-out
        "
        style={{
          opacity: videoReady
            ? 0
            : 0.62,
        }}
      />

      {/* Layer 2: looping video */}

      {video && (
        <video
          ref={videoRef}
          src={video}
          muted
          loop
          playsInline
          preload="auto"
          className="
            absolute inset-0
            w-full h-full
            object-cover
            object-center
            lg:object-[68%_center]
            select-none
            pointer-events-none
            transition-opacity
            duration-[1200ms]
            ease-in-out
          "
          style={{
            opacity: videoReady
              ? 0.62
              : 0,
          }}
        />
      )}

      {/* Layer 3: directional dark vignette */}

      <div
        className="
          absolute inset-0
          pointer-events-none
          bg-gradient-to-r
          from-[#050A12]
          via-[#050A12]/70
          to-[#050A12]/15
        "
      />

      {/* Layer 4: bottom scrim */}

      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          h-44
          bg-gradient-to-t
          from-[#050A12]
          to-transparent
          pointer-events-none
        "
      />

      {/* Layer 5: top scrim */}

      <div
        className="
          absolute
          top-0
          left-0
          right-0
          h-36
          bg-gradient-to-b
          from-[#050A12]/70
          to-transparent
          pointer-events-none
        "
      />

      {/* Layer 6: blue colour-grade */}

      <div
        className="
          absolute inset-0
          pointer-events-none
          bg-[#0A1628]/30
          mix-blend-multiply
        "
      />

      {/* Layer 7: soft blue glow */}

      <div
        className="
          absolute
          top-[5%]
          -left-[8%]
          w-[55vw]
          h-[55vw]
          max-w-[680px]
          max-h-[680px]
          rounded-full
          bg-[#0055A5]/18
          blur-[130px]
          pointer-events-none
        "
      />
    </div>
  );
}

// ─── LEAD FORM ────────────────────────────────────────────────────────────────

interface LeadFormProps {
  formData: {
    name: string;
    mobile: string;
    car: string;
  };

  setFormData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      mobile: string;
      car: string;
    }>
  >;

  onSubmit: (e: FormEvent) => void;

  submitted: boolean;
  loading: boolean;
  error: string;
  carModels: string[];
}

function LeadForm({
  formData,
  setFormData,
  onSubmit,
  submitted,
  loading,
  error,
  carModels,
}: LeadFormProps) {
  const inputCls = `
    w-full
    bg-white/6
    border border-white/12
    rounded-xl
    px-4 py-3
    text-white
    text-[13px]
    placeholder:text-white/25
    focus:outline-none
    focus:border-[#0055A5]/70
    focus:bg-white/9
    transition-colors
    duration-150
  `;

  return (
    <div
      className="
        bg-[#060C1A]/80
        backdrop-blur-2xl
        border border-white/10
        rounded-2xl
        p-6
        shadow-[0_20px_60px_rgba(0,0,0,0.5)]
      "
    >
      {submitted ? (
        <div className="py-8 text-center">

          <CheckCircle2
            size={36}
            className="text-[#0055A5] mx-auto mb-3"
          />

          <p className="text-white font-bold text-[16px]">
            We'll call you back!
          </p>

          <p
            className="
              text-white/45
              text-[13px]
              mt-1.5
              leading-relaxed
            "
          >
            Our team will reach out within 24 hours.
          </p>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          noValidate
        >
          <p
            className="
              text-white
              font-bold
              text-[15px]
              tracking-[0.05em]
              mb-5
            "
          >
            GET YOUR OFFER
          </p>

          <div className="space-y-3.5 mb-5">

            {/* Name */}

            <div>
              <label
                className="
                  block
                  text-[10px]
                  text-white/35
                  mb-1.5
                  tracking-widest
                  uppercase
                "
              >
                Name
              </label>

              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    name: e.target.value,
                  }))
                }
                placeholder="Your full name"
                className={inputCls}
              />
            </div>

            {/* Mobile */}

            <div>
              <label
                className="
                  block
                  text-[10px]
                  text-white/35
                  mb-1.5
                  tracking-widest
                  uppercase
                "
              >
                Mobile
              </label>

              <input
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    mobile: e.target.value,
                  }))
                }
                placeholder="+91 00000 00000"
                className={inputCls}
              />
            </div>

            {/* Car */}

            <div>
              <label
                className="
                  block
                  text-[10px]
                  text-white/35
                  mb-1.5
                  tracking-widest
                  uppercase
                "
              >
                Car of Interest
              </label>

              <select
                value={formData.car}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    car: e.target.value,
                  }))
                }
                className={`
                  ${inputCls}
                  appearance-none
                  [&>option]:bg-[#060C1A]
                  [&>option]:text-white
                `}
              >
                <option value="">
                  Choose a model
                </option>

                {carModels.map((m) => (
                  <option
                    key={m}
                    value={m}
                  >
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Error */}

          {error && (
            <p
              className="
                text-red-400
                text-[12px]
                mb-3
                leading-snug
              "
            >
              {error}
            </p>
          )}

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              flex items-center
              justify-center
              gap-2
              py-3.5
              rounded-xl
              bg-[#0055A5]
              hover:bg-[#1E7FE8]
              disabled:opacity-60
              disabled:cursor-not-allowed
              text-white
              font-bold
              text-[13px]
              tracking-[0.06em]
              shadow-[0_4px_18px_rgba(0,85,165,0.4)]
              hover:shadow-[0_8px_24px_rgba(30,127,232,0.5)]
              transition-all
              duration-200
              group
            "
          >
            {loading ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              <>
                GET MY OFFER

                <ArrowRight
                  size={14}
                  className="
                    group-hover:translate-x-1
                    transition-transform
                  "
                />
              </>
            )}
          </button>

          <p
            className="
              text-[10px]
              text-white/20
              mt-3.5
              text-center
              leading-relaxed
            "
          >
            *T&C apply. Our team will contact you within 24 hrs.
          </p>
        </form>
      )}
    </div>
  );
}

// ─── TRUST STRIP ─────────────────────────────────────────────────────────────

function TrustStrip() {
  const items = [
    "Authorized Tata Dealer",
    "Multiple Showrooms",
    "Test Drive Available",
    "Easy Enquiry",
  ];

  return (
    <div
      className="
        bg-[#050A12]
        border-b border-white/6
        py-4 px-5
        overflow-x-auto
      "
    >
      <div
        className="
          max-w-[1440px]
          mx-auto
          flex items-center
          justify-center
          gap-4
          flex-wrap
        "
      >
        {items.map((item, i) => (
          <span
            key={item}
            className="
              flex items-center
              gap-3
              text-[11px]
              text-white/35
              font-medium
              uppercase
              tracking-[0.14em]
              whitespace-nowrap
            "
          >
            {i > 0 && (
              <span className="text-white/12">
                •
              </span>
            )}

            {item}
          </span>
        ))}
      </div>
    </div>
  );
}