"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CalendarDays, ArrowRight, Phone } from "lucide-react";

export default function TestDrive() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", phone: "", car: "", date: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="testdrive" className="relative py-20 lg:py-32 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1920&q=80"
          alt="Tata Harrier"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07111F] via-[#07111F]/90 to-[#07111F]/70" />
        <div className="absolute inset-0 bg-[#07111F]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left text */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-[#1E7FE8] text-sm font-semibold uppercase tracking-widest block mb-4"
            >
              Experience First
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-6xl font-black text-white mb-6 leading-[0.95]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Feel It Before<br />
              <span className="gradient-text">You Drive It.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-white/50 text-lg leading-relaxed mb-8"
            >
              Experience the performance, comfort and technology of Tata Motors firsthand — no commitment, just pure driving pleasure.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="flex gap-4"
            >
              <div className="flex items-center gap-2 text-white/40 text-sm">
                <CalendarDays size={16} className="text-[#1E7FE8]" />
                Available 7 days a week
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass rounded-2xl p-7 border border-white/10"
          >
            <h3 className="text-white font-bold text-xl mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>
              Request Test Drive
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#1E7FE8] transition-colors text-sm"
              />
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#1E7FE8] transition-colors text-sm"
              />
              <select
                name="car"
                value={form.car}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#1E7FE8] transition-colors text-sm appearance-none"
              >
                <option value="" className="text-gray-800">Select Car Model</option>
                <option value="sierra" className="text-gray-800">Tata Sierra</option>
                <option value="harrier" className="text-gray-800">Tata Harrier</option>
                <option value="safari" className="text-gray-800">Tata Safari</option>
                <option value="curvv" className="text-gray-800">Tata Curvv</option>
                <option value="nexon" className="text-gray-800">Tata Nexon</option>
                <option value="punch" className="text-gray-800">Tata Punch</option>
                <option value="altroz" className="text-gray-800">Tata Altroz</option>
                <option value="tiago" className="text-gray-800">Tata Tiago</option>
              </select>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/70 focus:outline-none focus:border-[#1E7FE8] transition-colors text-sm"
              />
              <button className="group w-full py-4 bg-[#0055A5] rounded-xl text-white font-bold hover:bg-[#1E7FE8] transition-all hover:shadow-xl hover:shadow-blue-500/30 flex items-center justify-center gap-2">
                Request Test Drive
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <div className="flex items-center gap-2 justify-center">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-white/20 text-xs">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <a href="tel:+91XXXXXXXXXX" className="flex items-center justify-center gap-2 w-full py-3.5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:border-white/30 transition-all text-sm font-medium">
                <Phone size={16} />
                Call Us Directly
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
