"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Gift, RefreshCw, Banknote, ArrowRight } from "lucide-react";

const offers = [
  {
    icon: Gift,
    tag: "Limited Time",
    title: "Festive Offers",
    desc: "Special benefits, cashbacks, and exclusive deals on selected Tata models. Drive home your dream car with attractive savings.",
    cta: "View Offer",
    gradient: "from-[#0055A5]/20 to-[#1E7FE8]/5",
    border: "border-[#0055A5]/30",
  },
  {
    icon: RefreshCw,
    tag: "Exchange",
    title: "Exchange Bonus",
    desc: "Get attractive exchange benefits when you trade in your existing vehicle. Seamless evaluation and transparent valuation.",
    cta: "Get Valuation",
    gradient: "from-[#1E7FE8]/20 to-[#0055A5]/5",
    border: "border-[#1E7FE8]/30",
  },
  {
    icon: Banknote,
    tag: "Finance",
    title: "Finance Offers",
    desc: "Explore flexible EMI schemes, low interest rates, and quick loan approvals across leading banks and NBFCs.",
    cta: "Calculate EMI",
    gradient: "from-[#07111F] to-[#0055A5]/10",
    border: "border-white/10",
  },
];

export default function Offers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="offers" className="bg-[#080B10] py-20 lg:py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0055A5]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div ref={ref} className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#1E7FE8] text-sm font-semibold uppercase tracking-widest block mb-3"
          >
            Current Deals
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Drive More. Pay Smarter.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((o, i) => (
            <motion.div
              key={o.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className={`group relative p-7 rounded-2xl border bg-gradient-to-br ${o.gradient} ${o.border} hover:scale-[1.02] transition-all duration-300 cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#0055A5]/20 flex items-center justify-center">
                  <o.icon size={22} className="text-[#1E7FE8]" />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 text-white/40 border border-white/10">
                  {o.tag}
                </span>
              </div>
              <h3 className="text-white font-bold text-2xl mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>{o.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed mb-6">{o.desc}</p>
              <a href="#contact" className="group/cta flex items-center gap-2 text-[#1E7FE8] font-semibold text-sm hover:gap-3 transition-all">
                {o.cta}
                <ArrowRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
