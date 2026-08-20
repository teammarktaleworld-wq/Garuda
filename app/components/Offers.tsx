"use client";

import { useState, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Tag, RefreshCcw, Trash2, Heart, Zap, Fuel, Loader2, CheckCircle2 } from "lucide-react";

// ─── CORRECTED OFFER DATA — MY25/MY24 (verified from official consumer offer sheets) ─────
// Image 1: ICE models  |  Image 2: EV models

type OfferRow = {
  variant: string;
  cash: number;
  exchange: number;
  scrappage: number;
  loyalty: number;
  maxOffer: number;
};

type ModelGroup = {
  model: string;
  type: "ICE" | "EV";
  image: string;
  variants: OfferRow[];
};

const OFFER_DATA: ModelGroup[] = [
  // ══ ICE Models (Image 1) ══════════════════════════════════════════════════
  {
    model: "Tiago",
    type: "ICE",
    image: "/images/vehicles/tatatiago.webp",
    variants: [
      { variant: "Tiago Petrol", cash: 35000, exchange: 10000, scrappage: 15000, loyalty: 0, maxOffer: 50000 },
      { variant: "Tiago CNG",    cash: 30000, exchange: 10000, scrappage: 15000, loyalty: 0, maxOffer: 45000 },
    ],
  },
  {
    model: "Tigor",
    type: "ICE",
    image: "/images/vehicles/tatatiago.webp",
    variants: [
      { variant: "Tigor", cash: 15000, exchange: 10000, scrappage: 15000, loyalty: 0, maxOffer: 30000 },
    ],
  },
  {
    model: "Altroz",
    type: "ICE",
    image: "/images/vehicles/altrozaltroz.webp",
    variants: [
      { variant: "Altroz Petrol",   cash: 35000,  exchange: 15000, scrappage: 20000, loyalty: 0,     maxOffer: 55000  },
      { variant: "Altroz CNG",      cash: 35000,  exchange: 15000, scrappage: 20000, loyalty: 0,     maxOffer: 55000  },
      { variant: "Altroz Diesel",   cash: 25000,  exchange: 15000, scrappage: 20000, loyalty: 0,     maxOffer: 45000  },
      { variant: "Altroz Outgoing", cash: 110000, exchange: 40000, scrappage: 40000, loyalty: 25000, maxOffer: 175000 },
    ],
  },
  {
    model: "Punch",
    type: "ICE",
    image: "/images/vehicles/punchtata.webp",
    variants: [
      { variant: "Punch Petrol (Outgoing)", cash: 70000, exchange: 30000, scrappage: 30000, loyalty: 20000, maxOffer: 120000 },
      { variant: "Punch CNG (Outgoing)",    cash: 70000, exchange: 30000, scrappage: 30000, loyalty: 20000, maxOffer: 120000 },
    ],
  },
  {
    model: "Nexon",
    type: "ICE",
    image: "/images/vehicles/tatanexon.webp",
    variants: [
      { variant: "Nexon Petrol", cash: 40000, exchange: 15000, scrappage: 20000, loyalty: 0, maxOffer: 60000 },
      { variant: "Nexon CNG",    cash: 35000, exchange: 20000, scrappage: 25000, loyalty: 0, maxOffer: 60000 },
      { variant: "Nexon Diesel", cash: 0,     exchange: 15000, scrappage: 20000, loyalty: 0, maxOffer: 20000 },
    ],
  },
  {
    model: "Curvv",
    type: "ICE",
    image: "/images/vehicles/tatacurvve.webp",
    variants: [
      { variant: "Curvv", cash: 30000, exchange: 40000, scrappage: 45000, loyalty: 50000, maxOffer: 125000 },
    ],
  },
  {
    model: "Harrier",
    type: "ICE",
    image: "/images/vehicles/harrier.webp",
    variants: [
      { variant: "Harrier D",              cash: 10000,  exchange: 25000, scrappage: 35000, loyalty: 0,     maxOffer: 45000  },
      { variant: "Harrier D (without X)",  cash: 150000, exchange: 50000, scrappage: 50000, loyalty: 40000, maxOffer: 240000 },
      { variant: "Harrier P",              cash: 40000,  exchange: 0,     scrappage: 0,     loyalty: 0,     maxOffer: 40000  },
    ],
  },
  {
    model: "Safari",
    type: "ICE",
    image: "/images/vehicles/tatasafari.webp",
    variants: [
      { variant: "Safari 2.0 D",             cash: 10000,  exchange: 25000, scrappage: 35000, loyalty: 0,     maxOffer: 45000  },
      { variant: "Safari 2.0 D (without X)", cash: 150000, exchange: 50000, scrappage: 50000, loyalty: 40000, maxOffer: 240000 },
      { variant: "Safari 2.0 P",             cash: 40000,  exchange: 0,     scrappage: 0,     loyalty: 0,     maxOffer: 40000  },
    ],
  },
  // ══ EV Models (Image 2) ═══════════════════════════════════════════════════
  {
    model: "Tiago EV",
    type: "EV",
    image: "/images/vehicles/tatatiago.webp",
    variants: [
      { variant: "Tiago EV LR XT",      cash: 100000, exchange: 20000, scrappage: 25000, loyalty: 0, maxOffer: 125000 },
      { variant: "Tiago EV LR XZ+ All", cash: 100000, exchange: 20000, scrappage: 25000, loyalty: 0, maxOffer: 125000 },
      { variant: "Tiago EV MR All",     cash: 40000,  exchange: 20000, scrappage: 25000, loyalty: 0, maxOffer: 65000  }, // ← corrected: 65,000 per image 2
    ],
  },
  {
    model: "Punch EV",
    type: "EV",
    image: "/images/vehicles/punchtata.webp",
    variants: [
      { variant: "Punch EV All LR",                     cash: 110000, exchange: 30000, scrappage: 35000, loyalty: 0, maxOffer: 145000 },
      { variant: "Punch EV All MR (Except Smart)",       cash: 90000,  exchange: 30000, scrappage: 35000, loyalty: 0, maxOffer: 125000 },
      { variant: "Punch EV Smart & Smart+ Variant",      cash: 60000,  exchange: 30000, scrappage: 35000, loyalty: 0, maxOffer: 95000  }, // ← corrected: 95,000 per image 2
    ],
  },
  {
    model: "Nexon EV",
    type: "EV",
    image: "/images/vehicles/tatanexon.webp",
    variants: [
      { variant: "Nexon EV 3.0", cash: 15000, exchange: 25000, scrappage: 35000, loyalty: 0, maxOffer: 50000 },
    ],
  },
  {
    model: "Curvv EV",
    type: "EV",
    image: "/images/vehicles/tatacurvve.webp",
    variants: [
      { variant: "Curvv EV", cash: 300000, exchange: 30000, scrappage: 35000, loyalty: 0, maxOffer: 335000 },
    ],
  },
  {
    model: "Harrier EV",
    type: "EV",
    image: "/images/vehicles/harrier.webp",
    variants: [
      // ← corrected: loyalty = 100,000 per image 2
      { variant: "Harrier EV", cash: 100000, exchange: 50000, scrappage: 75000, loyalty: 100000, maxOffer: 275000 },
    ],
  },
  // Sierra EV intentionally omitted — no offer data in images
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  n === 0 ? "—" : `₹${n.toLocaleString("en-IN")}`;

const BENEFIT_ICONS = [
  { key: "cash",      label: "Cash Discount",  Icon: Tag       },
  { key: "exchange",  label: "Exchange Bonus",  Icon: RefreshCcw },
  { key: "scrappage", label: "Scrappage Bonus", Icon: Trash2    },
  { key: "loyalty",   label: "Loyalty Bonus",   Icon: Heart     },
] as const;

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── DEFAULT CAR MODELS (for enquiry form) ────────────────────────────────────
const DEFAULT_MODELS = OFFER_DATA.map(m => m.model);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Offers() {
  const [filter, setFilter]           = useState<"ALL" | "ICE" | "EV">("ALL");
  const [selected, setSelected]       = useState<ModelGroup>(OFFER_DATA[0]);
  const [activeVariant, setActiveVariant] = useState(0);

  // Enquiry form state
  const [formData, setFormData]       = useState({ name: "", mobile: "", car: selected.model });
  const [submitted, setSubmitted]     = useState(false);
  const [loading, setLoading]         = useState(false);
  const [formError, setFormError]     = useState("");

  const filtered = OFFER_DATA.filter(m => filter === "ALL" || m.type === filter);

  const variant = selected.variants[activeVariant] ?? selected.variants[0];

  const selectModel = useCallback((model: ModelGroup) => {
    setSelected(model);
    setActiveVariant(0);
    setFormData(p => ({ ...p, car: model.model }));
  }, []);

  const scrollToForm = useCallback(() => {
    document.getElementById("offer-form")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name.trim()) { setFormError("Please enter your name."); return; }
    if (formData.mobile.replace(/\D/g, "").length < 10) { setFormError("Please enter a valid mobile number."); return; }

    setLoading(true);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "offers-section" }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Submission failed.");
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [formData]);

  return (
    <section
      id="offers"
      className="relative bg-[#050A12] py-20 lg:py-28 overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#0055A5]/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 lg:px-12">

        {/* ── Section header ──────────────────────────────────── */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold tracking-[0.28em] text-[#5BA3E8] uppercase mb-3 block">
            MY25 / MY24 Consumer Offer · All India · All Amounts in INR
          </span>
          <h2 className="text-white font-extrabold text-[clamp(2rem,4vw,3.2rem)] tracking-tight leading-tight mb-4">
            Current Tata Offers
          </h2>
          <p className="text-white/50 text-[15px] max-w-xl mx-auto leading-relaxed">
            Verified benefits available at Garud Tata. Exchange + scrappage + loyalty can be combined on eligible models.
          </p>
        </div>

        {/* ── Filter tabs ─────────────────────────────────────── */}
        <div className="flex justify-center gap-2 mb-10">
          {(["ALL", "ICE", "EV"] as const).map(f => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                const first = OFFER_DATA.find(m => f === "ALL" || m.type === f);
                if (first) selectModel(first);
              }}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-semibold
                transition-all duration-200
                ${filter === f
                  ? "bg-[#0055A5] text-white shadow-[0_4px_16px_rgba(0,85,165,0.4)]"
                  : "bg-white/6 border border-white/12 text-white/60 hover:text-white hover:bg-white/10"
                }
              `}
            >
              {f === "EV"  && <Zap  size={13} />}
              {f === "ICE" && <Fuel size={13} />}
              {f}
            </button>
          ))}
        </div>

        {/* ── Main layout: model list + detail panel ──────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

          {/* Model list */}
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {filtered.map(model => (
              <button
                key={model.model}
                onClick={() => selectModel(model)}
                className={`
                  flex-shrink-0 flex items-center gap-3
                  px-4 py-3.5 rounded-xl text-left
                  transition-all duration-200
                  ${selected.model === model.model
                    ? "bg-[#0055A5]/20 border border-[#0055A5]/50 text-white"
                    : "bg-white/4 border border-white/8 text-white/60 hover:text-white hover:bg-white/8"
                  }
                `}
              >
                <img
                  src={encodeURI(model.image)}
                  alt={model.model}
                  className="w-14 h-9 object-contain flex-shrink-0"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
                />
                <div className="min-w-0">
                  <p className="text-[13px] font-semibold leading-tight truncate">{model.model}</p>
                  <p className="text-[10px] text-white/35 mt-0.5">
                    {model.type === "EV" ? "Electric" : "Petrol / CNG / Diesel"}
                  </p>
                </div>
                {model.type === "EV" && (
                  <span className="ml-auto flex-shrink-0 text-[9px] font-bold text-[#5BA3E8] bg-[#0055A5]/20 px-2 py-0.5 rounded-full">
                    EV
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.model}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="bg-white/4 border border-white/10 rounded-2xl overflow-hidden"
            >
              {/* Panel header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 lg:p-7 border-b border-white/8">
                <img
                  src={encodeURI(selected.image)}
                  alt={selected.model}
                  className="w-[160px] h-[90px] object-contain"
                  onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-bold text-[1.4rem] tracking-tight">{selected.model}</h3>
                    {selected.type === "EV" && (
                      <span className="text-[10px] font-bold text-[#5BA3E8] bg-[#0055A5]/20 border border-[#0055A5]/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Zap size={9} /> ELECTRIC
                      </span>
                    )}
                  </div>
                  <p className="text-white/45 text-[13px]">
                    Max benefit up to{" "}
                    <span className="text-[#5BA3E8] font-bold text-[15px]">
                      {fmt(Math.max(...selected.variants.map(v => v.maxOffer)))}
                    </span>
                    {" "}on select variants
                  </p>
                </div>
                <button
                  onClick={scrollToForm}
                  className="
                    flex items-center gap-2 px-5 py-2.5 rounded-full
                    bg-[#0055A5] hover:bg-[#1E7FE8]
                    text-white text-[13px] font-bold tracking-[0.04em]
                    shadow-[0_4px_16px_rgba(0,85,165,0.35)]
                    hover:-translate-y-px transition-all duration-200 group flex-shrink-0
                  "
                >
                  GET OFFER
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Variant tabs */}
              {selected.variants.length > 1 && (
                <div className="flex gap-2 p-4 lg:px-7 border-b border-white/8 overflow-x-auto">
                  {selected.variants.map((v, i) => (
                    <button
                      key={v.variant}
                      onClick={() => setActiveVariant(i)}
                      className={`
                        flex-shrink-0 px-3.5 py-1.5 rounded-lg text-[12px] font-medium
                        transition-all duration-150
                        ${activeVariant === i
                          ? "bg-[#0055A5]/25 border border-[#0055A5]/50 text-white"
                          : "bg-white/5 border border-white/10 text-white/50 hover:text-white"
                        }
                      `}
                    >
                      {v.variant}
                    </button>
                  ))}
                </div>
              )}

              {/* Benefit breakdown */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={variant.variant}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 lg:p-7"
                >
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                    {BENEFIT_ICONS.map(({ key, label, Icon }) => {
                      const val = variant[key as keyof OfferRow] as number;
                      return (
                        <div
                          key={key}
                          className={`
                            rounded-xl p-4 border transition-all
                            ${val > 0
                              ? "bg-[#0055A5]/10 border-[#0055A5]/25"
                              : "bg-white/3 border-white/8 opacity-50"
                            }
                          `}
                        >
                          <Icon size={16} className={val > 0 ? "text-[#5BA3E8] mb-2" : "text-white/30 mb-2"} />
                          <p className="text-[10px] text-white/45 uppercase tracking-wider mb-1">{label}</p>
                          <p className={`font-bold text-[17px] ${val > 0 ? "text-white" : "text-white/30"}`}>
                            {fmt(val)}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Max offer highlight */}
                  <div className="flex items-center justify-between bg-[#0055A5]/12 border border-[#0055A5]/25 rounded-xl px-5 py-4">
                    <div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest mb-0.5">Maximum Benefit</p>
                      <p className="text-white font-extrabold text-[1.6rem] tracking-tight">
                        {fmt(variant.maxOffer)}
                      </p>
                      <p className="text-white/35 text-[11px] mt-0.5">*T&C apply. Subject to eligibility.</p>
                    </div>
                    <button
                      onClick={scrollToForm}
                      className="
                        flex items-center gap-2 px-6 py-3 rounded-full
                        bg-[#0055A5] hover:bg-[#1E7FE8]
                        text-white font-bold text-[14px]
                        shadow-[0_4px_20px_rgba(0,85,165,0.4)]
                        hover:shadow-[0_6px_28px_rgba(30,127,232,0.5)]
                        hover:-translate-y-px transition-all duration-200 group
                      "
                    >
                      CLAIM OFFER
                      <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Full offer table ─────────────────────────────────── */}
        <div className="mt-14 overflow-x-auto">
          <p className="text-[11px] text-white/30 uppercase tracking-widest mb-4 font-semibold">
            Complete Offer Table · MY25/MY24 · All India
          </p>
          <table className="w-full text-[13px] border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                {["Model", "Variant", "Cash", "Exchange**", "Scrappage**", "Loyalty", "Max Offer"].map(h => (
                  <th key={h} className="text-left text-[10px] font-semibold text-white/35 uppercase tracking-widest px-4 py-3 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {OFFER_DATA.flatMap(m =>
                m.variants.map((v, i) => (
                  <tr
                    key={`${m.model}-${v.variant}`}
                    className={`
                      border-b border-white/5
                      hover:bg-white/3 transition-colors cursor-pointer
                      ${i === 0 ? "border-t border-white/8" : ""}
                    `}
                    onClick={() => {
                      selectModel(m);
                      setActiveVariant(i);
                      document.getElementById("offers")?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {i === 0 ? (
                      <td rowSpan={m.variants.length} className="px-4 py-3 font-semibold text-white/80 align-top whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {m.type === "EV" && <Zap size={11} className="text-[#5BA3E8]" />}
                          {m.model}
                        </div>
                      </td>
                    ) : null}
                    <td className="px-4 py-3 text-white/60">{v.variant}</td>
                    <td className="px-4 py-3 text-white/80 font-medium">{fmt(v.cash)}</td>
                    <td className="px-4 py-3 text-white/80 font-medium">{fmt(v.exchange)}</td>
                    <td className="px-4 py-3 text-white/80 font-medium">{fmt(v.scrappage)}</td>
                    <td className="px-4 py-3 text-white/80 font-medium">{fmt(v.loyalty)}</td>
                    <td className="px-4 py-3 font-bold text-[#5BA3E8] whitespace-nowrap">{fmt(v.maxOffer)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <p className="text-[11px] text-white/25 mt-4 leading-relaxed">
            ** Exchange and Scrappage benefits are subject to vehicle eligibility. Loyalty bonus applicable on select variants only.
            Please ensure tagging the correct campaign ID for discounts while retail. Contact Garud Tata for final offer confirmation.
          </p>
        </div>

        {/* ── Inline Enquiry Form ───────────────────────────────── */}
        <div
          id="offer-form"
          className="mt-16 max-w-[480px] mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-white font-bold text-[1.6rem] tracking-tight mb-2">
              Claim Your Offer
            </h3>
            <p className="text-white/45 text-[14px]">
              Fill in your details and our team will reach out within 24 hours.
            </p>
          </div>

          <div className="bg-white/4 border border-white/10 rounded-2xl p-6 lg:p-8">
            {submitted ? (
              <div className="py-8 text-center">
                <CheckCircle2 size={40} className="text-[#0055A5] mx-auto mb-4" />
                <p className="text-white font-bold text-[18px] mb-2">Enquiry Received!</p>
                <p className="text-white/50 text-[14px] leading-relaxed">
                  Our team will call you back within 24 hours with your personalised offer details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div>
                  <label className="block text-[10px] text-white/35 mb-1.5 tracking-widest uppercase">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder="Your full name"
                    className="
                      w-full bg-white/6 border border-white/12 rounded-xl
                      px-4 py-3.5 text-white text-[14px]
                      placeholder:text-white/25
                      focus:outline-none focus:border-[#0055A5]/70 focus:bg-white/9
                      transition-colors
                    "
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-white/35 mb-1.5 tracking-widest uppercase">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={e => setFormData(p => ({ ...p, mobile: e.target.value }))}
                    placeholder="+91 00000 00000"
                    className="
                      w-full bg-white/6 border border-white/12 rounded-xl
                      px-4 py-3.5 text-white text-[14px]
                      placeholder:text-white/25
                      focus:outline-none focus:border-[#0055A5]/70 focus:bg-white/9
                      transition-colors
                    "
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-white/35 mb-1.5 tracking-widest uppercase">Car of Interest</label>
                  <select
                    value={formData.car}
                    onChange={e => setFormData(p => ({ ...p, car: e.target.value }))}
                    className="
                      w-full bg-white/6 border border-white/12 rounded-xl
                      px-4 py-3.5 text-white text-[14px]
                      focus:outline-none focus:border-[#0055A5]/70 focus:bg-white/9
                      transition-colors appearance-none
                      [&>option]:bg-[#060C1A] [&>option]:text-white
                    "
                  >
                    <option value="">Select a model</option>
                    {DEFAULT_MODELS.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {formError && (
                  <p className="text-red-400 text-[13px] leading-snug">{formError}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="
                    w-full flex items-center justify-center gap-2
                    py-4 rounded-xl mt-2
                    bg-[#0055A5] hover:bg-[#1E7FE8]
                    disabled:opacity-60 disabled:cursor-not-allowed
                    text-white font-bold text-[14px] tracking-[0.06em]
                    shadow-[0_4px_20px_rgba(0,85,165,0.4)]
                    hover:shadow-[0_8px_28px_rgba(30,127,232,0.5)]
                    transition-all duration-200 group
                  "
                >
                  {loading ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <>
                      GET MY OFFER
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <p className="text-[11px] text-white/20 text-center leading-relaxed pt-1">
                  *T&C apply. Subject to eligibility. Our team will contact you within 24 hrs.
                </p>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}