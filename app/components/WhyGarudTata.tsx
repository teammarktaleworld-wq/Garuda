"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck, Star, CreditCard, Eye, Users, Headphones } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Authorized Tata Dealership",
    desc: "Buy with complete confidence from an official, authorized Tata Motors dealer with full manufacturer backing.",
  },
  {
    icon: Star,
    title: "Complete Car Experience",
    desc: "From choosing your first car to ownership support — we're with you every step of the journey.",
  },
  {
    icon: CreditCard,
    title: "Easy Financing",
    desc: "Flexible finance solutions, attractive EMI plans, and assistance with all leading banks and NBFCs.",
  },
  {
    icon: Eye,
    title: "Transparent Pricing",
    desc: "Clear, honest pricing with no hidden charges. What you see is what you pay.",
  },
  {
    icon: Users,
    title: "Expert Assistance",
    desc: "Our trained team helps you choose the right Tata model for your lifestyle, budget, and preferences.",
  },
  {
    icon: Headphones,
    title: "After-Sales Support",
    desc: "Dedicated customer support and service even after you drive away, ensuring a lifetime of happy ownership.",
  },
];

export default function WhyGarudTata() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="bg-[#07111F] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#1E7FE8] text-sm font-semibold uppercase tracking-widest block mb-3"
          >
            Why Choose Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Why Drive With Garud Tata?
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="group p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-[#0055A5]/30 hover:bg-white/[0.05] transition-all duration-400"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0055A5]/10 flex items-center justify-center mb-5 group-hover:bg-[#0055A5]/20 transition-all">
                <f.icon size={22} className="text-[#1E7FE8]" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2.5" style={{ fontFamily: "'Syne', sans-serif" }}>{f.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
