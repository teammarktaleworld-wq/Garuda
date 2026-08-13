"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-28 lg:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1920&q=80"
          alt="Tata Safari"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B10]/70 via-[#07111F]/80 to-[#080B10]" />
      </div>

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl lg:text-7xl font-black text-white mb-6"
          style={{ fontFamily: "'Syne', sans-serif", lineHeight: 0.95 }}
        >
          Your Next Drive<br />
          <span className="gradient-text">Starts Here.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-white/50 text-lg mb-10"
        >
          Explore the Tata Motors range at Garud Tata, Palam, New Delhi.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <a href="#cars" className="group flex items-center gap-2 px-8 py-4 bg-[#0055A5] rounded-full text-white font-bold text-sm hover:bg-[#1E7FE8] transition-all hover:shadow-2xl hover:shadow-blue-500/30">
            Explore Cars
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#testdrive" className="px-8 py-4 border border-white/20 rounded-full text-white font-semibold text-sm hover:bg-white/5 hover:border-white/40 transition-all backdrop-blur-sm">
            Book Test Drive
          </a>
        </motion.div>
      </div>
    </section>
  );
}
