// "use client";
// import { useRef, useState } from "react";
// import { motion, useInView } from "framer-motion";
// import { CalendarDays, ArrowRight, Phone } from "lucide-react";

// export default function TestDrive() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });
//   const [form, setForm] = useState({ name: "", phone: "", car: "", date: "" });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   return (
//     <section id="testdrive" className="relative py-20 lg:py-32 overflow-hidden">
//       {/* BG */}
//       <div className="absolute inset-0">
//         <img
//           src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920&q=80"
//           alt="Tata Harrier"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-[#07111F] via-[#07111F]/90 to-[#07111F]/70" />
//         <div className="absolute inset-0 bg-[#07111F]/40" />
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left text */}
//           <div>
//             <motion.span
//               initial={{ opacity: 0 }}
//               animate={inView ? { opacity: 1 } : {}}
//               className="text-[#1E7FE8] text-sm font-semibold uppercase tracking-widest block mb-4"
//             >
//               Experience First
//             </motion.span>
//             <motion.h2
//               initial={{ opacity: 0, y: 30 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.1 }}
//               className="text-5xl lg:text-6xl font-black text-white mb-6 leading-[0.95]"
//               style={{ fontFamily: "'Syne', sans-serif" }}
//             >
//               Feel It Before<br />
//               <span className="gradient-text">You Drive It.</span>
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={inView ? { opacity: 1 } : {}}
//               transition={{ delay: 0.2 }}
//               className="text-white/50 text-lg leading-relaxed mb-8"
//             >
//               Experience the performance, comfort and technology of Tata Motors firsthand — no commitment, just pure driving pleasure.
//             </motion.p>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={inView ? { opacity: 1 } : {}}
//               transition={{ delay: 0.3 }}
//               className="flex gap-4"
//             >
//               <div className="flex items-center gap-2 text-white/40 text-sm">
//                 <CalendarDays size={16} className="text-[#1E7FE8]" />
//                 Available 7 days a week
//               </div>
//             </motion.div>
//           </div>

//           {/* Form */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={inView ? { opacity: 1, x: 0 } : {}}
//             transition={{ delay: 0.2, duration: 0.6 }}
//             className="glass rounded-2xl p-7 border border-white/10"
//           >
//             <h3 className="text-white font-bold text-xl mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
//               Request Test Drive
//             </h3>
//             <div className="space-y-4">
//               <input
//                 type="text"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 placeholder="Your Name"
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#1E7FE8] transition-colors text-sm"
//               />
//               <input
//                 type="tel"
//                 name="phone"
//                 value={form.phone}
//                 onChange={handleChange}
//                 placeholder="Phone Number"
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#1E7FE8] transition-colors text-sm"
//               />
//               <select
//                 name="car"
//                 value={form.car}
//                 onChange={handleChange}
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1E7FE8] transition-colors text-sm appearance-none"
//               >
//                 <option value="" className="text-gray-800">Select Car Model</option>
//                 <option value="sierra" className="text-gray-800">Tata Sierra</option>
//                 <option value="harrier" className="text-gray-800">Tata Harrier</option>
//                 <option value="safari" className="text-gray-800">Tata Safari</option>
//                 <option value="curvv" className="text-gray-800">Tata Curvv</option>
//                 <option value="nexon" className="text-gray-800">Tata Nexon</option>
//                 <option value="punch" className="text-gray-800">Tata Punch</option>
//                 <option value="altroz" className="text-gray-800">Tata Altroz</option>
//                 <option value="tiago" className="text-gray-800">Tata Tiago</option>
//               </select>
//               <input
//                 type="date"
//                 name="date"
//                 value={form.date}
//                 onChange={handleChange}
//                 className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/70 focus:outline-none focus:border-[#1E7FE8] transition-colors text-sm"
//               />
//               <button className="group w-full py-4 bg-[#0055A5] rounded-xl text-white font-bold hover:bg-[#1E7FE8] transition-all hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center gap-2">
//                 Request Test Drive
//                 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//               </button>
//               <div className="flex items-center gap-2 justify-center">
//                 <div className="flex-1 h-px bg-white/10" />
//                 <span className="text-white/20 text-xs">or</span>
//                 <div className="flex-1 h-px bg-white/10" />
//               </div>
//               <a href="tel:+91XXXXXXXXXX" className="flex items-center justify-center gap-2 w-full py-3.5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:border-white/30 transition-all text-sm font-medium">
//                 <Phone size={16} />
//                 Call Us Directly
//               </a>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }



















"use client";

import { useRef, useState, useCallback, type FormEvent } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  CalendarDays, ArrowRight, Phone, CheckCircle2, Loader2,
  Zap, Car, MessageSquare, MapPin,
} from "lucide-react";

/* ── DATA ───────────────────────────────────────────────────────────── */
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

const SLOTS = ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"] as const;

/* ── API CALL ───────────────────────────────────────────────────────── */
async function submitTestDrive(payload: {
  name: string;
  mobile: string;
  car: string;
  showroom: string;
  date: string;
  slot: string;
}) {
  const res = await fetch("/api/test-drive", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error ?? "Submission failed. Please try again.");
  return data as { success: true; id: string; message: string };
}

/* ── SHARED FIELD CLASS ─────────────────────────────────────────────── */
const fieldClass =
  "w-full bg-white/[0.06] border border-white/[0.12] rounded-xl px-4 py-3.5 min-h-[52px] text-white text-[16px] sm:text-[13.5px] placeholder:text-white/25 focus:outline-none focus:border-[#0055A5]/65 focus:bg-[#0055A5]/[0.07] transition-colors duration-200 appearance-none";

/* ── SELECT WRAPPER ─────────────────────────────────────────────────── */
function NativeSelect({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`${fieldClass} pr-10 ${!value ? "text-white/25" : "text-white"}`}
        >
          <option value="" disabled className="bg-[#132035] text-white/50">
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt} className="bg-[#132035] text-white">
              {opt}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </div>
  );
}

/* ── STAT PILL ──────────────────────────────────────────────────────── */
function StatPill({ icon: Icon, text }: { icon: typeof CalendarDays; text: string }) {
  return (
    <div className="flex items-center gap-2 text-white/40 text-[12px] font-medium">
      <Icon size={13} className="text-[#5BA3E8] flex-shrink-0" />
      {text}
    </div>
  );
}

/* ── MAIN COMPONENT ─────────────────────────────────────────────────── */
export default function TestDrive() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReduced = useReducedMotion();

  const [form, setForm] = useState({
    name: "", mobile: "", car: "", showroom: "", date: "", slot: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");

  const set = (key: keyof typeof form) => (val: string) =>
    setForm((p) => ({ ...p, [key]: val }));

  /* ── tomorrow as min date ── */
  const minDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  })();

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (loading) return;
      setError("");

      if (!form.name.trim())                           { setError("Please enter your name."); return; }
      if (form.mobile.replace(/\D/g, "").length < 10)  { setError("Please enter a valid 10-digit mobile number."); return; }
      if (!form.car)                                   { setError("Please select a car model."); return; }
      if (!form.showroom)                              { setError("Please select a showroom."); return; }
      if (!form.date)                                  { setError("Please pick a preferred date."); return; }
      if (!form.slot)                                  { setError("Please select a time slot."); return; }

      setLoading(true);
      try {
        await submitTestDrive({
          name: form.name,
          mobile: form.mobile,
          car: form.car,
          showroom: form.showroom,
          date: form.date,
          slot: form.slot,
        });
        setSubmitted(true);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [form, loading]
  );

  return (
    <section
      id="testdrive"
      className="relative bg-[#0D1829] py-16 sm:py-20 lg:py-28 overflow-hidden"
    >
      {/* ── Background glows ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="hidden sm:block absolute top-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-[#0055A5]/8 blur-[160px]" />
        <div className="hidden sm:block absolute bottom-[5%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#1A70D4]/5 blur-[130px]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-5 lg:px-12">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">

          {/* ── LEFT — copy ── */}
          <div className="lg:pt-4">
            <motion.span
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-[10px] font-bold tracking-[0.28em] text-[#7DB8F7] uppercase mb-3 block"
            >
              GARUD TATA · TEST DRIVE
            </motion.span>

            <motion.h2
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-extrabold text-[clamp(2rem,7vw,3.4rem)] tracking-[-0.02em] leading-[1.04] mb-5"
            >
              Feel It Before<br />
              <span
                className="bg-gradient-to-r from-[#5BA3E8] via-[#7DB8F7] to-[#5BA3E8] bg-clip-text text-transparent"
              >
                You Drive It.
              </span>
            </motion.h2>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.18 }}
              className="text-white/42 text-[14px] sm:text-[15px] leading-relaxed mb-8 max-w-md"
            >
              Experience the performance, comfort and technology of Tata Motors firsthand —
              no commitment, just pure driving pleasure. Book a test drive at a Garud Tata
              showroom near you.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25 }}
              className="flex flex-col gap-3 mb-10"
            >
              <StatPill icon={CalendarDays}   text="Available 7 days a week" />
              <StatPill icon={Car}            text="13 models available for test drive" />
              <StatPill icon={Zap}            text="EV experience drives included" />
              <StatPill icon={MapPin}         text="3 Garud Tata showroom locations" />
            </motion.div>

            {/* Contact strip */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.32, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="tel:+911234567890"
                className="group flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[48px] rounded-full bg-white/[0.06] border border-white/[0.12] hover:border-white/[0.28] hover:bg-white/[0.10] text-white/70 hover:text-white font-medium text-[12.5px] tracking-[0.05em] transition-all duration-200"
              >
                <Phone size={14} className="text-[#5BA3E8]" />
                Call Us Directly
              </a>
              <a
                href="https://wa.me/911234567890"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[48px] rounded-full bg-white/[0.06] border border-white/[0.12] hover:border-white/[0.28] hover:bg-white/[0.10] text-white/70 hover:text-white font-medium text-[12.5px] tracking-[0.05em] transition-all duration-200"
              >
                <MessageSquare size={14} className="text-[#5BA3E8]" />
                WhatsApp Us
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT — form card ── */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 28 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#132035] border border-white/[0.08] rounded-3xl p-5 sm:p-6 lg:p-8"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                /* ── Success state ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="py-8 sm:py-10 text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-[#0055A5]/18 border border-[#0055A5]/35 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle2 size={28} className="text-[#7DB8F7]" />
                  </div>
                  <h3 className="text-white font-extrabold text-[1.4rem] sm:text-[1.5rem] tracking-tight mb-2">
                    Test Drive Booked!
                  </h3>
                  <p className="text-white/42 text-[13.5px] sm:text-[14px] leading-relaxed mb-2 max-w-xs mx-auto">
                    We've received your request for the{" "}
                    <span className="text-white font-semibold">{form.car}</span>.
                  </p>
                  <p className="text-white/30 text-[12.5px] mb-8">
                    {form.date} · {form.slot} · {form.showroom}
                  </p>
                  <p className="text-white/38 text-[13px] mb-8 max-w-xs mx-auto leading-relaxed">
                    Our Garud Tata team will confirm your slot within 24 hours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href="tel:+911234567890"
                      className="flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full bg-[#0055A5] active:bg-[#1A70D4] text-white font-bold text-[12.5px] tracking-[0.06em] transition-colors duration-150"
                    >
                      CALL NOW
                    </a>
                    <button
                      type="button"
                      onClick={() => { setSubmitted(false); setForm({ name: "", mobile: "", car: "", showroom: "", date: "", slot: "" }); }}
                      className="flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] rounded-full bg-white/[0.06] border border-white/[0.15] active:border-white/30 text-white font-medium text-[12.5px] tracking-[0.04em] transition-colors duration-150"
                    >
                      BOOK ANOTHER
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ── Form ── */
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-6">
                    <p className="text-[10px] font-bold tracking-[0.22em] text-[#7DB8F7] uppercase mb-1">
                      Book a Test Drive
                    </p>
                    <h3
                      className="text-white font-extrabold text-[1.25rem] sm:text-[1.35rem] tracking-tight"
                    >
                      Reserve Your Slot
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => set("name")(e.target.value)}
                        placeholder="Your full name"
                        className={fieldClass}
                      />
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        inputMode="numeric"
                        autoComplete="tel"
                        maxLength={15}
                        value={form.mobile}
                        onChange={(e) => set("mobile")(e.target.value)}
                        placeholder="+91 00000 00000"
                        className={fieldClass}
                      />
                    </div>

                    {/* Car */}
                    <NativeSelect
                      label="Car Model"
                      value={form.car}
                      onChange={set("car")}
                      options={CARS}
                      placeholder="Select a model"
                    />

                    {/* Showroom */}
                    <NativeSelect
                      label="Preferred Showroom"
                      value={form.showroom}
                      onChange={set("showroom")}
                      options={SHOWROOMS}
                      placeholder="Select a showroom"
                    />

                    {/* Date + Slot — side by side */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-white/32 mb-1.5 tracking-[0.18em] uppercase font-bold">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          required
                          min={minDate}
                          value={form.date}
                          onChange={(e) => set("date")(e.target.value)}
                          className={`${fieldClass} text-white/70`}
                        />
                      </div>
                      <NativeSelect
                        label="Time Slot"
                        value={form.slot}
                        onChange={set("slot")}
                        options={SLOTS}
                        placeholder="Pick a slot"
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        role="alert"
                        className="text-red-400 text-[12.5px] leading-snug"
                      >
                        {error}
                      </motion.p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-xl mt-1 min-h-[52px] bg-[#0055A5] hover:bg-[#1A70D4] active:bg-[#1A70D4] disabled:opacity-55 disabled:cursor-not-allowed text-white font-extrabold text-[13.5px] tracking-[0.08em] shadow-[0_6px_24px_rgba(0,85,165,0.38)] transition-colors duration-150 group"
                    >
                      {loading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <>
                          REQUEST TEST DRIVE
                          <ArrowRight
                            size={16}
                            className="group-hover:translate-x-1 transition-transform duration-150"
                          />
                        </>
                      )}
                    </button>

                    <p className="text-[10.5px] text-white/18 text-center leading-relaxed pt-0.5">
                      *Subject to slot availability. Our team will confirm within 24 hours.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}