






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
// import { useParams } from "next/navigation";
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
//   year:  "numeric",
// });

// const formatINR = (amount: number) =>
//   new Intl.NumberFormat("en-IN", {
//     style:                 "currency",
//     currency:              "INR",
//     maximumFractionDigits: 0,
//   }).format(amount);

// // ============================================================================
// // CAR METADATA & IMAGES
// // ============================================================================
// const CAR_BODY_TYPES: Record<string, string> = {
//   Sierra:  "Premium SUV · Icon Reborn",
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
//   sierra:       ["/Car images/Tata sierra/image1.avif",  "/Car images/Tata sierra/image2.avif",  "/Car images/Tata sierra/image3.avif"],
//   tiago:        ["/Car images/Tata tiago/image1.jpg",    "/Car images/Tata tiago/image2.jpg",    "/Car images/Tata tiago/image3.jpg"  ],
//   "tiago-ev":   ["/Car images/Tata tiago/image1.jpg",    "/Car images/Tata tiago/image2.jpg",    "/Car images/Tata tiago/image3.jpg"  ],
//   tigor:        ["/Car images/Tata tigor/image1.avif",   "/Car images/Tata tigor/image2.avif"                                        ],
//   altroz:       ["/Car images/Tata altroz/image1.avif",  "/Car images/Tata altroz/image2.avif"                                       ],
//   punch:        ["/Car images/Tata punch/image1.jpg",    "/Car images/Tata punch/image2.jpg"                                         ],
//   "punch-ev":   ["/Car images/Tata punch/image1.jpg",    "/Car images/Tata punch/image2.jpg"                                         ],
//   nexon:        ["/Car images/Tata nexon/image1.avif",   "/Car images/Tata nexon/image2.avif"                                        ],
//   "nexon-ev":   ["/Car images/Tata nexon/image1.avif",   "/Car images/Tata nexon/image2.avif"                                        ],
//   curvv:        ["/Car images/Tata curv/image1.avif",    "/Car images/Tata curv/image2.avif"                                         ],
//   "curvv-ev":   ["/Car images/Tata curv/image1.avif",    "/Car images/Tata curv/image2.avif"                                         ],
//   harrier:      ["/Car images/Tata harrier/image1.avif", "/Car images/Tata harrier/image2.avif"                                      ],
//   "harrier-ev": ["/Car images/Tata harrier/image1.avif", "/Car images/Tata harrier/image2.avif"                                      ],
//   safari:       ["/Car images/Tata safari/image1.avif",  "/Car images/Tata safari/image2.avif"                                       ],
// };

// const getCarImage = (model: string, isEV = false) => {
//   const key = isEV ? `${model.toLowerCase()}-ev` : model.toLowerCase();
//   return CAR_IMAGES[key]?.[0] || CAR_IMAGES[model.toLowerCase()]?.[0] || "/placeholder-car.jpg";
// };

// const getCarSlug = (model: string): string | null => {
//   const nonEV = OFFERS.find((o) => o.active && o.model === model && o.category !== "EV");
//   const any   = OFFERS.find((o) => o.active && o.model === model);
//   return (nonEV ?? any)?.id ?? null;
// };

// // ============================================================================
// // ANIMATED COUNTER
// // ============================================================================
// function AnimatedCounter({ value }: { value: number }) {
//   const prefersReduced        = useReducedMotion();
//   const [display, setDisplay] = useState(prefersReduced ? value : 0);

//   useEffect(() => {
//     if (prefersReduced) { setDisplay(value); return; }
//     const c = animate(0, value, {
//       duration: 1.1,
//       ease:     [0.16, 1, 0.3, 1],
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
//   isOpen:        boolean;
//   onClose:       () => void;
//   initialCar:    string;
//   enquiryType:   EnquiryType;
//   offerDetails?: TataOffer | null;
//   availableCars: string[];
//   onCarChange?:  (car: string) => void;
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
//   const [name,            setName]          = useState("");
//   const [mobile,          setMobile]        = useState("");
//   const [location,        setLocation]      = useState("");
//   const [locationLoading, setLocLoad]       = useState(false);
//   const [showroom,        setShowroom]      = useState(SHOWROOMS[0]);
//   const [isSubmitting,    setSubmitting]    = useState(false);
//   const [isSuccess,       setSuccess]       = useState(false);
//   const [error,           setError]         = useState("");
//   const [showCarPicker,   setShowCarPicker] = useState(false);
//   const [activeCar,       setActiveCar]     = useState(initialCar);

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
//       const w = window as unknown as {
//         fbq?:  (...a: unknown[]) => void;
//         gtag?: (...a: unknown[]) => void;
//       };

//       // Meta Pixel — Lead event
//       w.fbq?.("track", "Lead", {
//         content_name:     activeCar,
//         content_category: enquiryType,
//         value:            offerDetails?.totalBenefit ?? 0,
//         currency:         "INR",
//       });

//       const res = await fetch("/api/enquiry", {
//         method:  "POST",
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

//       const data = await res.json().catch(() => ({}));
//       if (!res.ok) throw new Error(data?.error ?? "Submission failed.");

//       // ✅ Google Ads conversion tracking
//       w.gtag?.("event", "conversion", {
//         send_to: "AW-18209967669/FeICCNezs-gcELWcmOtD",
//       });

//       setSuccess(true);
//     } catch {
//       // Still show success to user — lead likely captured
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
//         {/* ── Header ── */}
//         <div className="bg-[#004b8d] px-5 py-4 flex items-center justify-between shrink-0 rounded-t-3xl sm:rounded-t-2xl">
//           <div>
//             <p className="text-[10px] uppercase tracking-widest font-bold text-blue-200">
//               {enquiryType === "Test Drive" ? "Book a Test Drive" : "Claim Your Offer"}
//             </p>
//             <p className="text-white font-black text-base leading-tight">Tata {activeCar}</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors shrink-0"
//             aria-label="Close"
//           >
//             ✕
//           </button>
//         </div>

//         {/* ── Body ── */}
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

//               {/* ── Car summary card ── */}
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
//                         <img src={getCarImage(car)} alt={car} className="w-14 h-9 object-cover rounded mb-1" />
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
//                             {offerDetails.variantLabel ?? offerDetails.model}
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

//               {/* ── Name ── */}
//               <div>
//                 <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
//                   Your Name
//                 </label>
//                 <input
//                   type="text" required value={name}
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
//                   type="tel" required maxLength={10} value={mobile}
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
//                     type="text" value={location}
//                     onChange={(e) => setLocation(e.target.value)}
//                     placeholder={locationLoading ? "Detecting your location…" : "e.g. New Delhi, Gurugram"}
//                     className="w-full bg-slate-50 border border-slate-200 focus:border-[#004b8d] focus:ring-2 focus:ring-[#004b8d]/20 rounded-xl px-4 py-3 pr-10 text-sm text-slate-800 outline-none transition-all font-medium"
//                   />
//                   <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">
//                     {locationLoading ? (
//                       <span className="inline-block w-4 h-4 border-2 border-slate-300 border-t-[#004b8d] rounded-full animate-spin" />
//                     ) : "📍"}
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
//   current, total, labels,
// }: {
//   current: number; total: number; labels: string[];
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
//           const step = i + 1; const done = step < current; const active = step === current;
//           return (
//             <div key={label} className="relative z-10 flex flex-col items-center gap-1.5">
//               <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-300 ${
//                 done ? "bg-[#004b8d] text-white" : active ? "bg-[#004b8d] text-white ring-4 ring-[#004b8d]/20" : "bg-slate-100 text-slate-400 border border-slate-200"
//               }`}>
//                 {done ? "✓" : step}
//               </span>
//               <span className={`text-[10px] font-bold uppercase tracking-wider ${
//                 active ? "text-[#004b8d]" : done ? "text-slate-500" : "text-slate-300"
//               }`}>
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
// interface OffersProps {
//   showroomSlug?: string;
// }

// export default function Offers({ showroomSlug = "palam" }: OffersProps) {
//   const prefersReduced = useReducedMotion();

//   // Prefer URL param (detail pages), fall back to prop (landing page)
//   const params   = useParams();
//   const showroom = (params?.showroom as string) ?? showroomSlug;

//   const [selectedCar,        setSelectedCar]        = useState<string | null>(null);
//   const [selectedPowertrain, setSelectedPowertrain] = useState<Powertrain | null>(null);
//   const [selectedVariantId,  setSelectedVariantId]  = useState<string | null>(null);
//   const [carFilter,          setCarFilter]          = useState<"All" | "Petrol" | "CNG" | "Diesel" | "Electric">("All");
//   const [modal, setModal] = useState<{ open: boolean; type: EnquiryType }>({
//     open: false,
//     type: "Offer Enquiry",
//   });

//   const availableCars = useMemo(() => {
//     const list: string[] = [];
//     OFFERS.forEach((o) => { if (o.active && !list.includes(o.model)) list.push(o.model); });
//     return list;
//   }, []);

//   const filteredCars = useMemo(() => {
//     if (carFilter === "All") return availableCars;
//     return availableCars.filter((model) =>
//       OFFERS.some((o) => o.active && o.model === model && o.powertrain === carFilter)
//     );
//   }, [availableCars, carFilter]);

//   const filterCounts = useMemo(() => {
//     const counts: Record<string, number> = { All: availableCars.length };
//     (["Petrol", "CNG", "Diesel", "Electric"] as const).forEach((pt) => {
//       counts[pt] = availableCars.filter((model) =>
//         OFFERS.some((o) => o.active && o.model === model && o.powertrain === pt)
//       ).length;
//     });
//     return counts;
//   }, [availableCars]);

//   const handleSelectCar = (car: string) => {
//     setSelectedVariantId(null);
//     if (carFilter !== "All") {
//       setSelectedCar(car);
//       setSelectedPowertrain(carFilter as Powertrain);
//       const matches = OFFERS.filter(
//         (o) => o.active && o.model === car && o.powertrain === (carFilter as Powertrain)
//       );
//       if (matches.length === 0) {
//         setSelectedCar(null);
//         setSelectedPowertrain(null);
//         setModal({ open: true, type: "Offer Enquiry" });
//       }
//     } else {
//       setSelectedCar(car);
//       setSelectedPowertrain(null);
//     }
//   };

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

//   const powertrainPreSelected = carFilter !== "All";

//   const stepLabels = useMemo(() => {
//     return powertrainPreSelected
//       ? (needsVariant ? ["Car", "Variant", "Offer"] : ["Car", "Offer"])
//       : (needsVariant ? ["Car", "Powertrain", "Variant", "Offer"] : ["Car", "Powertrain", "Offer"]);
//   }, [powertrainPreSelected, needsVariant]);

//   const currentStep = useMemo(() => {
//     if (!selectedCar)        return 1;
//     if (!selectedPowertrain) return 2;
//     if (needsVariant && !selectedVariantId) return powertrainPreSelected ? 2 : 3;
//     return stepLabels.length;
//   }, [selectedCar, selectedPowertrain, needsVariant, selectedVariantId, powertrainPreSelected, stepLabels.length]);

//   const goBack = () => {
//     if (needsVariant && selectedVariantId) { setSelectedVariantId(null); return; }
//     if (selectedPowertrain) {
//       setSelectedPowertrain(null);
//       if (powertrainPreSelected) setSelectedCar(null);
//       return;
//     }
//     setSelectedCar(null);
//   };

//   const reset = () => {
//     setSelectedCar(null);
//     setSelectedPowertrain(null);
//     setSelectedVariantId(null);
//     setCarFilter("All");
//   };

//   const motion_step = {
//     initial: prefersReduced ? {} : { opacity: 0, y: 16 },
//     animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as Easing } },
//     exit:    prefersReduced ? {} : { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" as Easing } },
//   };

//   return (
//     <section className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 font-sans">
//       {/* ── HERO ── */}
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

//       {/* ── MAIN CARD ── */}
//       <div className="max-w-[960px] mx-auto bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/80 overflow-hidden">
//         <StepProgress current={currentStep} total={stepLabels.length} labels={stepLabels} />

//         <div className="p-5 sm:p-8 md:p-10">
//           <AnimatePresence mode="wait">

//             {/* ── STEP 1 : CAR GRID ── */}
//             {!selectedCar && (
//               <motion.div key="step-car" {...motion_step}>
//                 <h2 className="text-lg sm:text-xl font-black text-slate-800 mb-5 text-center">
//                   Which Tata are you interested in?
//                 </h2>

//                 {/* Filter bar */}
//                 <div className="flex items-center gap-2 flex-wrap justify-center mb-6">
//                   {([
//                     { key: "All",      label: "All Cars", icon: "🚗" },
//                     { key: "Petrol",   label: "Petrol",   icon: "⛽" },
//                     { key: "CNG",      label: "CNG",      icon: "🔋" },
//                     { key: "Diesel",   label: "Diesel",   icon: "🔧" },
//                     { key: "Electric", label: "Electric", icon: "⚡" },
//                   ] as const).map(({ key, label, icon }) => {
//                     const count  = filterCounts[key] ?? 0;
//                     const active = carFilter === key;
//                     if (count === 0) return null;
//                     return (
//                       <button
//                         key={key}
//                         onClick={() => setCarFilter(key)}
//                         className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all border ${
//                           active
//                             ? "bg-[#004b8d] text-white border-[#004b8d] shadow-md shadow-[#004b8d]/20"
//                             : "bg-white text-slate-600 border-slate-200 hover:border-[#004b8d]/40 hover:text-[#004b8d]"
//                         }`}
//                       >
//                         <span>{icon}</span>
//                         <span>{label}</span>
//                         <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
//                           active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
//                         }`}>
//                           {count}
//                         </span>
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {/* Car grid */}
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={carFilter}
//                     initial={{ opacity: 0, y: 8 }}
//                     animate={{ opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" as Easing } }}
//                     exit={{ opacity: 0, y: -6, transition: { duration: 0.15 } }}
//                     className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
//                   >
//                     {filteredCars.length === 0 ? (
//                       <div className="col-span-full text-center py-10 text-slate-400 font-semibold text-sm">
//                         No {carFilter} models available right now.
//                       </div>
//                     ) : filteredCars.map((car) => {
//                       const slug = getCarSlug(car);
//                       const pts  = Array.from(
//                         new Set(OFFERS.filter((o) => o.active && o.model === car).map((o) => o.powertrain))
//                       );
//                       const ptEmoji: Record<string, string> = {
//                         Petrol: "⛽", CNG: "🔋", Diesel: "🔧", Electric: "⚡",
//                       };
//                       return (
//                         <div
//                           key={car}
//                           className="group relative rounded-2xl border border-slate-200 hover:border-[#004b8d] bg-white shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-0.5 flex flex-col"
//                         >
//                           <button
//                             onClick={() => handleSelectCar(car)}
//                             className="text-left flex-1 focus-visible:ring-2 focus-visible:ring-[#004b8d] focus-visible:outline-none rounded-t-2xl"
//                           >
//                             <div className="relative h-28 sm:h-32 bg-slate-100 overflow-hidden">
//                               <img
//                                 src={getCarImage(car)}
//                                 alt={`Tata ${car}`}
//                                 loading="lazy"
//                                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                               />
//                               <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white/50 to-transparent" />
//                               <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
//                                 {pts.map((pt) => (
//                                   <span key={pt} className="text-[9px] font-bold bg-white/90 text-slate-700 px-1.5 py-0.5 rounded-full leading-tight shadow-sm">
//                                     {ptEmoji[pt]} {pt}
//                                   </span>
//                                 ))}
//                               </div>
//                             </div>
//                             <div className="px-3.5 pt-3 pb-2">
//                               <p className="text-sm font-black text-slate-800 uppercase tracking-wide leading-none group-hover:text-[#004b8d] transition-colors">
//                                 {car}
//                               </p>
//                               <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
//                                 {CAR_BODY_TYPES[car] ?? "Tata Vehicle"}
//                               </p>
//                             </div>
//                           </button>

//                           <div className="flex items-center border-t border-slate-100 divide-x divide-slate-100">
//                             <button
//                               onClick={() => handleSelectCar(car)}
//                               className="flex-1 py-2 text-[11px] font-black text-[#004b8d] hover:bg-[#004b8d]/5 transition-colors text-center"
//                             >
//                               Check Offer
//                             </button>
//                             {slug ? (
//                               <Link
//                                 href={`/${showroom}/offers/${slug}`}
//                                 className="flex-1 py-2 text-[11px] font-bold text-slate-500 hover:text-[#004b8d] hover:bg-slate-50 transition-colors text-center"
//                                 onClick={(e) => e.stopPropagation()}
//                               >
//                                 Explore ↗
//                               </Link>
//                             ) : (
//                               <span className="flex-1 py-2 text-[11px] text-slate-300 text-center">—</span>
//                             )}
//                           </div>

//                           <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#004b8d] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
//                         </div>
//                       );
//                     })}
//                   </motion.div>
//                 </AnimatePresence>
//               </motion.div>
//             )}

//             {/* ── STEP 2 : POWERTRAIN ── */}
//             {selectedCar && !selectedPowertrain && (
//               <motion.div key="step-pt" {...motion_step}>
//                 <div className="text-center mb-8">
//                   <span className="inline-block text-xs font-black uppercase tracking-wider bg-[#004b8d]/8 text-[#004b8d] px-3 py-1 rounded-full mb-3">
//                     {selectedCar}
//                   </span>
//                   <h2 className="text-lg sm:text-xl font-black text-slate-800">Fuel or powertrain type?</h2>
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
//                       <span className="text-sm font-black text-slate-800 group-hover:text-[#004b8d] transition-colors">{pt}</span>
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

//             {/* ── STEP 3 : VARIANT ── */}
//             {selectedCar && selectedPowertrain && needsVariant && !selectedVariantId && (
//               <motion.div key="step-var" {...motion_step}>
//                 <div className="text-center mb-8">
//                   <span className="inline-block text-xs font-black uppercase tracking-wider bg-[#004b8d]/8 text-[#004b8d] px-3 py-1 rounded-full mb-3">
//                     {selectedCar} · {selectedPowertrain}
//                   </span>
//                   <h2 className="text-lg sm:text-xl font-black text-slate-800">Choose your variant</h2>
//                   <p className="text-xs text-slate-400 mt-1 font-medium">Different variants have different eligible benefits</p>
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
//                           {offer.variantLabel ?? offer.model}
//                         </p>
//                         <p className="text-xs text-slate-400 font-semibold mt-0.5">{offer.modelYear} Edition</p>
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

//             {/* ── STEP 4 : OFFER RESULT ── */}
//             {finalOffer && (
//               <motion.div key="step-result" {...motion_step} className="max-w-xl mx-auto">
//                 <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/60">
//                   {/* Hero banner */}
//                   <div className="relative h-52 sm:h-60 overflow-hidden bg-[#003570]">
//                     <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#0059a8]/50" />
//                     <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-[#002a58]/60" />
//                     <img
//                       src={getCarImage(finalOffer.model, finalOffer.powertrain === "Electric")}
//                       alt={`Tata ${finalOffer.model}`}
//                       className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
//                     />
//                     <div className="absolute inset-0 flex flex-col justify-end p-6">
//                       <p className="text-[10px] uppercase font-black tracking-[0.25em] text-blue-300/80 mb-1">Your Garud Tata Offer</p>
//                       <h2 className="text-3xl sm:text-4xl font-black text-white leading-none">
//                         Tata {finalOffer.model}
//                         {finalOffer.category === "EV" && !finalOffer.model.includes("EV") ? " EV" : ""}
//                       </h2>
//                       <div className="flex flex-wrap gap-2 mt-2">
//                         {[finalOffer.variantLabel ?? finalOffer.model, finalOffer.powertrain, finalOffer.modelYear].map((tag) => (
//                           <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-white/15 text-white/90 px-2.5 py-1 rounded-full">
//                             {tag}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Offer body */}
//                   <div className="p-6 sm:p-8 bg-white">
//                     <div className="text-center mb-7 py-5 rounded-2xl bg-slate-50 border border-slate-100">
//                       <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Maximum Eligible Benefits</p>
//                       <p className="text-4xl sm:text-5xl font-black text-[#004b8d] leading-none">
//                         <span className="text-lg align-middle font-bold text-[#004b8d]/60 mr-1">UP TO</span>
//                         <AnimatedCounter value={finalOffer.totalBenefit} />
//                       </p>
//                     </div>

//                     <div className="mb-6">
//                       <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 text-center mb-3">Benefit Breakdown</p>
//                       <div className="grid grid-cols-2 gap-2.5">
//                         {(finalOffer.consumerOffer   ?? 0) > 0 && <BenefitChip label="Consumer Discount" value={finalOffer.consumerOffer!}   />}
//                         {(finalOffer.exchangeBenefit  ?? 0) > 0 && <BenefitChip label="Exchange Bonus"    value={finalOffer.exchangeBenefit!}  />}
//                         {(finalOffer.scrappageBenefit ?? 0) > 0 && <BenefitChip label="Scrappage Bonus"   value={finalOffer.scrappageBenefit!} />}
//                         {(finalOffer.loyaltyBenefit   ?? 0) > 0 && <BenefitChip label="Loyalty Reward"    value={finalOffer.loyaltyBenefit!}   />}
//                       </div>
//                       <div className="flex items-center justify-between mt-3 px-4 py-3.5 rounded-xl bg-[#004b8d] text-white shadow-lg shadow-[#004b8d]/20">
//                         <span className="font-bold text-sm">Total Benefits</span>
//                         <span className="font-black text-lg">{formatINR(finalOffer.totalBenefit)}</span>
//                       </div>
//                     </div>

//                     <p className="text-[10px] text-slate-400 leading-relaxed text-center mb-6">
//                       *Benefits are subject to variant, customer, and campaign eligibility. Exchange,
//                       scrappage, and loyalty benefits may be combined only where applicable.
//                     </p>

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

//                     <div className="mt-3">
//                       <Link
//                         href={`/${showroom}/offers/${finalOffer.id}`}
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

//             {/* ── NO MATCH ── */}
//             {selectedCar && selectedPowertrain && !finalOffer && matchingOffers.length === 0 && (
//               <motion.div key="no-match" {...motion_step} className="text-center py-14 max-w-sm mx-auto">
//                 <div className="w-14 h-14 rounded-2xl bg-[#004b8d]/8 flex items-center justify-center mx-auto mb-4 text-2xl">🔍</div>
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

//       {/* ── TRUST BAR ── */}
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

//       {/* ── MODAL ── */}
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

// // ── Benefit chip ──────────────────────────────────────────────────────────────
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
import { useParams } from "next/navigation";
import {
  OFFERS,
  TataOffer,
  Powertrain,
} from "@/lib/tata-offers";

// ============================================================================
// LOCAL HELPERS & TYPES
// ============================================================================
type EnquiryType = "Offer Enquiry" | "Test Drive";

const SHOWROOMS = [
  "Garud Tata Palam",
  "Garud Tata Narela",
  "Garud Tata Najafgarh",
];

const SHOWROOM_META: Record<string, { area: string; city: string }> = {
  "Garud Tata Palam":     { area: "Palam",     city: "South-West Delhi" },
  "Garud Tata Narela":    { area: "Narela",    city: "North Delhi"      },
  "Garud Tata Najafgarh": { area: "Najafgarh", city: "West Delhi"       },
};

const LAST_UPDATED = new Date().toLocaleDateString("en-IN", {
  month: "long",
  year:  "numeric",
});

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style:                 "currency",
    currency:              "INR",
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
  sierra:       ["/Car images/Tata sierra/image1.avif",  "/Car images/Tata sierra/image2.avif",  "/Car images/Tata sierra/image3.avif"],
  tiago:        ["/Car images/Tata tiago/image1.jpg",    "/Car images/Tata tiago/image2.jpg",    "/Car images/Tata tiago/image3.jpg"  ],
  "tiago-ev":   ["/Car images/Tata tiago/image1.jpg",    "/Car images/Tata tiago/image2.jpg",    "/Car images/Tata tiago/image3.jpg"  ],
  tigor:        ["/Car images/Tata tigor/image1.avif",   "/Car images/Tata tigor/image2.avif"                                        ],
  altroz:       ["/Car images/Tata altroz/image1.avif",  "/Car images/Tata altroz/image2.avif"                                       ],
  punch:        ["/Car images/Tata punch/image1.jpg",    "/Car images/Tata punch/image2.jpg"                                         ],
  "punch-ev":   ["/Car images/Tata punch/image1.jpg",    "/Car images/Tata punch/image2.jpg"                                         ],
  nexon:        ["/Car images/Tata nexon/image1.avif",   "/Car images/Tata nexon/image2.avif"                                        ],
  "nexon-ev":   ["/Car images/Tata nexon/image1.avif",   "/Car images/Tata nexon/image2.avif"                                        ],
  curvv:        ["/Car images/Tata curv/image1.avif",    "/Car images/Tata curv/image2.avif"                                         ],
  "curvv-ev":   ["/Car images/Tata curv/image1.avif",    "/Car images/Tata curv/image2.avif"                                         ],
  harrier:      ["/Car images/Tata harrier/image1.avif", "/Car images/Tata harrier/image2.avif"                                      ],
  "harrier-ev": ["/Car images/Tata harrier/image1.avif", "/Car images/Tata harrier/image2.avif"                                      ],
  safari:       ["/Car images/Tata safari/image1.avif",  "/Car images/Tata safari/image2.avif"                                       ],
};

const getCarImage = (model: string, isEV = false) => {
  const key = isEV ? `${model.toLowerCase()}-ev` : model.toLowerCase();
  return CAR_IMAGES[key]?.[0] || CAR_IMAGES[model.toLowerCase()]?.[0] || "/placeholder-car.jpg";
};

const getCarSlug = (model: string): string | null => {
  const nonEV = OFFERS.find((o) => o.active && o.model === model && o.category !== "EV");
  const any   = OFFERS.find((o) => o.active && o.model === model);
  return (nonEV ?? any)?.id ?? null;
};

// ============================================================================
// ANIMATED COUNTER
// ============================================================================
function AnimatedCounter({ value }: { value: number }) {
  const prefersReduced        = useReducedMotion();
  const [display, setDisplay] = useState(prefersReduced ? value : 0);

  useEffect(() => {
    if (prefersReduced) { setDisplay(value); return; }
    const c = animate(0, value, {
      duration: 1.1,
      ease:     [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => c.stop();
  }, [value, prefersReduced]);

  return <span>{formatINR(display)}</span>;
}

// ============================================================================
// ENQUIRY MODAL
// ============================================================================
interface EnquiryModalProps {
  isOpen:        boolean;
  onClose:       () => void;
  initialCar:    string;
  enquiryType:   EnquiryType;
  offerDetails?: TataOffer | null;
  availableCars: string[];
  onCarChange?:  (car: string) => void;
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
  const [name,            setName]          = useState("");
  const [mobile,          setMobile]        = useState("");
  const [location,        setLocation]      = useState("");
  const [locationLoading, setLocLoad]       = useState(false);
  const [showroom,        setShowroom]      = useState(SHOWROOMS[0]);
  const [isSubmitting,    setSubmitting]    = useState(false);
  const [isSuccess,       setSuccess]       = useState(false);
  const [error,           setError]         = useState("");
  const [showCarPicker,   setShowCarPicker] = useState(false);
  const [activeCar,       setActiveCar]     = useState(initialCar);

  useEffect(() => { setActiveCar(initialCar); }, [initialCar]);

  useEffect(() => {
    if (!isOpen || location) return;
    if (!navigator.geolocation) return;
    setLocLoad(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const res  = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${coords.latitude}&lon=${coords.longitude}&format=json`
          );
          const data = await res.json();
          const city =
            data.address?.city    ||
            data.address?.town    ||
            data.address?.village ||
            data.address?.county  ||
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
      const w = window as unknown as {
        fbq?:  (...a: unknown[]) => void;
        gtag?: (...a: unknown[]) => void;
      };

      // Meta Pixel — Lead event
      w.fbq?.("track", "Lead", {
        content_name:     activeCar,
        content_category: enquiryType,
        value:            offerDetails?.totalBenefit ?? 0,
        currency:         "INR",
      });

      const res = await fetch("/api/enquiry", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile,
          car:      activeCar,
          variant:  offerDetails?.variantLabel ?? "General",
          type:     enquiryType,
          showroom,
          location: location || null,
          source:   "offers-page",
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? "Submission failed.");

      // Google Ads conversion tracking — fires only after successful API submission
      w.gtag?.("event", "conversion", {
        send_to: "AW-18209967669/lusxCJrosuocELWcmOtD",
        value: 1.0,
        currency: "INR",
      });

      setSuccess(true);
    } catch {
      // Still show success to user — lead likely captured
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
        {/* ── Header ── */}
        <div className="bg-[#004b8d] px-5 py-4 flex items-center justify-between shrink-0 rounded-t-3xl sm:rounded-t-2xl">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-bold text-blue-200">
              {enquiryType === "Test Drive" ? "Book a Test Drive" : "Claim Your Offer"}
            </p>
            <p className="text-white font-black text-base leading-tight">Tata {activeCar}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors shrink-0"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* ── Body ── */}
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

              {/* ── Car summary card ── */}
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
                        <img src={getCarImage(car)} alt={car} className="w-14 h-9 object-cover rounded mb-1" />
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
                            {offerDetails.variantLabel ?? offerDetails.model}
                          </p>
                          <p className="text-[11px] font-black text-[#004b8d] mt-0.5">
                            Up to {formatINR(offerDetails.totalBenefit)}
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
                  type="text" required value={name}
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
                  type="tel" required maxLength={10} value={mobile}
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
                    type="text" value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={locationLoading ? "Detecting your location…" : "e.g. New Delhi, Gurugram"}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-[#004b8d] focus:ring-2 focus:ring-[#004b8d]/20 rounded-xl px-4 py-3 pr-10 text-sm text-slate-800 outline-none transition-all font-medium"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-base">
                    {locationLoading ? (
                      <span className="inline-block w-4 h-4 border-2 border-slate-300 border-t-[#004b8d] rounded-full animate-spin" />
                    ) : "📍"}
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
  current, total, labels,
}: {
  current: number; total: number; labels: string[];
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
        <div className="absolute top-3.5 left-0 right-0 h-0.5 bg-slate-200 z-0" />
        <div
          className="absolute top-3.5 left-0 h-0.5 bg-[#004b8d] z-0 transition-all duration-500"
          style={{ width: `${((current - 1) / (total - 1)) * 100}%` }}
        />
        {labels.map((label, i) => {
          const step = i + 1; const done = step < current; const active = step === current;
          return (
            <div key={label} className="relative z-10 flex flex-col items-center gap-1.5">
              <span className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-300 ${
                done ? "bg-[#004b8d] text-white" : active ? "bg-[#004b8d] text-white ring-4 ring-[#004b8d]/20" : "bg-slate-100 text-slate-400 border border-slate-200"
              }`}>
                {done ? "✓" : step}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${
                active ? "text-[#004b8d]" : done ? "text-slate-500" : "text-slate-300"
              }`}>
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
interface OffersProps {
  showroomSlug?: string;
}

export default function Offers({ showroomSlug = "palam" }: OffersProps) {
  const prefersReduced = useReducedMotion();

  // Prefer URL param (detail pages), fall back to prop (landing page)
  const params   = useParams();
  const showroom = (params?.showroom as string) ?? showroomSlug;

  const [selectedCar,        setSelectedCar]        = useState<string | null>(null);
  const [selectedPowertrain, setSelectedPowertrain] = useState<Powertrain | null>(null);
  const [selectedVariantId,  setSelectedVariantId]  = useState<string | null>(null);
  const [carFilter,          setCarFilter]          = useState<"All" | "Petrol" | "CNG" | "Diesel" | "Electric">("All");
  const [modal, setModal] = useState<{ open: boolean; type: EnquiryType }>({
    open: false,
    type: "Offer Enquiry",
  });

  const availableCars = useMemo(() => {
    const list: string[] = [];
    OFFERS.forEach((o) => { if (o.active && !list.includes(o.model)) list.push(o.model); });
    return list;
  }, []);

  const filteredCars = useMemo(() => {
    if (carFilter === "All") return availableCars;
    return availableCars.filter((model) =>
      OFFERS.some((o) => o.active && o.model === model && o.powertrain === carFilter)
    );
  }, [availableCars, carFilter]);

  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = { All: availableCars.length };
    (["Petrol", "CNG", "Diesel", "Electric"] as const).forEach((pt) => {
      counts[pt] = availableCars.filter((model) =>
        OFFERS.some((o) => o.active && o.model === model && o.powertrain === pt)
      ).length;
    });
    return counts;
  }, [availableCars]);

  const handleSelectCar = (car: string) => {
    setSelectedVariantId(null);
    if (carFilter !== "All") {
      setSelectedCar(car);
      setSelectedPowertrain(carFilter as Powertrain);
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

  const powertrainPreSelected = carFilter !== "All";

  const stepLabels = useMemo(() => {
    return powertrainPreSelected
      ? (needsVariant ? ["Car", "Variant", "Offer"] : ["Car", "Offer"])
      : (needsVariant ? ["Car", "Powertrain", "Variant", "Offer"] : ["Car", "Powertrain", "Offer"]);
  }, [powertrainPreSelected, needsVariant]);

  const currentStep = useMemo(() => {
    if (!selectedCar)        return 1;
    if (!selectedPowertrain) return 2;
    if (needsVariant && !selectedVariantId) return powertrainPreSelected ? 2 : 3;
    return stepLabels.length;
  }, [selectedCar, selectedPowertrain, needsVariant, selectedVariantId, powertrainPreSelected, stepLabels.length]);

  const goBack = () => {
    if (needsVariant && selectedVariantId) { setSelectedVariantId(null); return; }
    if (selectedPowertrain) {
      setSelectedPowertrain(null);
      if (powertrainPreSelected) setSelectedCar(null);
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
      {/* ── HERO ── */}
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

      {/* ── MAIN CARD ── */}
      <div className="max-w-[960px] mx-auto bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/80 overflow-hidden">
        <StepProgress current={currentStep} total={stepLabels.length} labels={stepLabels} />

        <div className="p-5 sm:p-8 md:p-10">
          <AnimatePresence mode="wait">

            {/* ── STEP 1 : CAR GRID ── */}
            {!selectedCar && (
              <motion.div key="step-car" {...motion_step}>
                <h2 className="text-lg sm:text-xl font-black text-slate-800 mb-5 text-center">
                  Which Tata are you interested in?
                </h2>

                {/* Filter bar */}
                <div className="flex items-center gap-2 flex-wrap justify-center mb-6">
                  {([
                    { key: "All",      label: "All Cars", icon: "🚗" },
                    { key: "Petrol",   label: "Petrol",   icon: "⛽" },
                    { key: "CNG",      label: "CNG",      icon: "🔋" },
                    { key: "Diesel",   label: "Diesel",   icon: "🔧" },
                    { key: "Electric", label: "Electric", icon: "⚡" },
                  ] as const).map(({ key, label, icon }) => {
                    const count  = filterCounts[key] ?? 0;
                    const active = carFilter === key;
                    if (count === 0) return null;
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

                {/* Car grid */}
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
                      const pts  = Array.from(
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
                          <button
                            onClick={() => handleSelectCar(car)}
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
                              <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                                {pts.map((pt) => (
                                  <span key={pt} className="text-[9px] font-bold bg-white/90 text-slate-700 px-1.5 py-0.5 rounded-full leading-tight shadow-sm">
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

                          <div className="flex items-center border-t border-slate-100 divide-x divide-slate-100">
                            <button
                              onClick={() => handleSelectCar(car)}
                              className="flex-1 py-2 text-[11px] font-black text-[#004b8d] hover:bg-[#004b8d]/5 transition-colors text-center"
                            >
                              Check Offer
                            </button>
                            {slug ? (
                              <Link
                                href={`/${showroom}/offers/${slug}`}
                                className="flex-1 py-2 text-[11px] font-bold text-slate-500 hover:text-[#004b8d] hover:bg-slate-50 transition-colors text-center"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Explore ↗
                              </Link>
                            ) : (
                              <span className="flex-1 py-2 text-[11px] text-slate-300 text-center">—</span>
                            )}
                          </div>

                          <div className="absolute bottom-0 inset-x-0 h-0.5 bg-[#004b8d] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                        </div>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {/* ── STEP 2 : POWERTRAIN ── */}
            {selectedCar && !selectedPowertrain && (
              <motion.div key="step-pt" {...motion_step}>
                <div className="text-center mb-8">
                  <span className="inline-block text-xs font-black uppercase tracking-wider bg-[#004b8d]/8 text-[#004b8d] px-3 py-1 rounded-full mb-3">
                    {selectedCar}
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-slate-800">Fuel or powertrain type?</h2>
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
                      <span className="text-sm font-black text-slate-800 group-hover:text-[#004b8d] transition-colors">{pt}</span>
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

            {/* ── STEP 3 : VARIANT ── */}
            {selectedCar && selectedPowertrain && needsVariant && !selectedVariantId && (
              <motion.div key="step-var" {...motion_step}>
                <div className="text-center mb-8">
                  <span className="inline-block text-xs font-black uppercase tracking-wider bg-[#004b8d]/8 text-[#004b8d] px-3 py-1 rounded-full mb-3">
                    {selectedCar} · {selectedPowertrain}
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-slate-800">Choose your variant</h2>
                  <p className="text-xs text-slate-400 mt-1 font-medium">Different variants have different eligible benefits</p>
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
                          {offer.variantLabel ?? offer.model}
                        </p>
                        <p className="text-xs text-slate-400 font-semibold mt-0.5">{offer.modelYear} Edition</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase font-bold tracking-wider text-[#004b8d]/50">Up to</p>
                        <p className="text-base font-black text-[#004b8d]">{formatINR(offer.totalBenefit)}</p>
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

            {/* ── STEP 4 : OFFER RESULT ── */}
            {finalOffer && (
              <motion.div key="step-result" {...motion_step} className="max-w-xl mx-auto">
                <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl shadow-slate-200/60">
                  {/* Hero banner */}
                  <div className="relative h-52 sm:h-60 overflow-hidden bg-[#003570]">
                    <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-[#0059a8]/50" />
                    <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-[#002a58]/60" />
                    <img
                      src={getCarImage(finalOffer.model, finalOffer.powertrain === "Electric")}
                      alt={`Tata ${finalOffer.model}`}
                      className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <p className="text-[10px] uppercase font-black tracking-[0.25em] text-blue-300/80 mb-1">Your Garud Tata Offer</p>
                      <h2 className="text-3xl sm:text-4xl font-black text-white leading-none">
                        Tata {finalOffer.model}
                        {finalOffer.category === "EV" && !finalOffer.model.includes("EV") ? " EV" : ""}
                      </h2>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {[finalOffer.variantLabel ?? finalOffer.model, finalOffer.powertrain, finalOffer.modelYear].map((tag) => (
                          <span key={tag} className="text-[10px] font-bold uppercase tracking-wider bg-white/15 text-white/90 px-2.5 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Offer body */}
                  <div className="p-6 sm:p-8 bg-white">
                    <div className="text-center mb-7 py-5 rounded-2xl bg-slate-50 border border-slate-100">
                      <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Maximum Eligible Benefits</p>
                      <p className="text-4xl sm:text-5xl font-black text-[#004b8d] leading-none">
                        <span className="text-lg align-middle font-bold text-[#004b8d]/60 mr-1">UP TO</span>
                        <AnimatedCounter value={finalOffer.totalBenefit} />
                      </p>
                    </div>

                    <div className="mb-6">
                      <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 text-center mb-3">Benefit Breakdown</p>
                      <div className="grid grid-cols-2 gap-2.5">
                        {(finalOffer.consumerOffer   ?? 0) > 0 && <BenefitChip label="Consumer Discount" value={finalOffer.consumerOffer!}   />}
                        {(finalOffer.exchangeBenefit  ?? 0) > 0 && <BenefitChip label="Exchange Bonus"    value={finalOffer.exchangeBenefit!}  />}
                        {(finalOffer.scrappageBenefit ?? 0) > 0 && <BenefitChip label="Scrappage Bonus"   value={finalOffer.scrappageBenefit!} />}
                        {(finalOffer.loyaltyBenefit   ?? 0) > 0 && <BenefitChip label="Loyalty Reward"    value={finalOffer.loyaltyBenefit!}   />}
                      </div>
                      <div className="flex items-center justify-between mt-3 px-4 py-3.5 rounded-xl bg-[#004b8d] text-white shadow-lg shadow-[#004b8d]/20">
                        <span className="font-bold text-sm">Total Benefits</span>
                        <span className="font-black text-lg">{formatINR(finalOffer.totalBenefit)}</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-400 leading-relaxed text-center mb-6">
                      *Benefits are subject to variant, customer, and campaign eligibility. Exchange,
                      scrappage, and loyalty benefits may be combined only where applicable.
                    </p>

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

                    <div className="mt-3">
                      <Link
                        href={`/${showroom}/offers/${finalOffer.id}`}
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

            {/* ── NO MATCH ── */}
            {selectedCar && selectedPowertrain && !finalOffer && matchingOffers.length === 0 && (
              <motion.div key="no-match" {...motion_step} className="text-center py-14 max-w-sm mx-auto">
                <div className="w-14 h-14 rounded-2xl bg-[#004b8d]/8 flex items-center justify-center mx-auto mb-4 text-2xl">🔍</div>
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

      {/* ── TRUST BAR ── */}
      <div className="max-w-3xl mx-auto mt-10 text-center">
        <div className="flex flex-wrap items-center justify-center gap-y-2.5 gap-x-5 text-[11px] font-bold text-slate-400">
          {["Verified Garud Offers", "MY25 / MY24 Benefits", "Exchange & Scrappage", "Test Drive Available"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="text-emerald-500">✓</span> {t}
            </span>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 font-semibold mt-5 uppercase tracking-widest">
          Offers Last Updated: {LAST_UPDATED}
        </p>
      </div>

      {/* ── MODAL ── */}
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

// ── Benefit chip ──────────────────────────────────────────────────────────────
function BenefitChip({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col px-3.5 py-3 rounded-xl bg-slate-50 border border-slate-100">
      <span className="text-[10px] text-slate-500 font-semibold leading-tight">{label}</span>
      <span className="text-sm font-black text-slate-800 mt-0.5">{formatINR(value)}</span>
    </div>
  );
}