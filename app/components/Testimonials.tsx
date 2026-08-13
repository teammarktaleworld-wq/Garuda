"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    stars: 5,
    text: "From choosing the right model to delivery day, the entire experience at Garud Tata was smooth, transparent and absolutely professional. Got my Harrier at a great price!",
    name: "Rajesh Kumar",
    car: "Tata Harrier",
    initials: "RK",
    color: "#0055A5",
  },
  {
    stars: 5,
    text: "The team understood exactly what I needed. No pressure, no gimmicks — just honest guidance. My Safari was delivered on time with all the features I wanted.",
    name: "Priya Sharma",
    car: "Tata Safari",
    initials: "PS",
    color: "#1E7FE8",
  },
  {
    stars: 5,
    text: "Best dealership experience I've had. The finance team made everything so simple. Drove home my Nexon within a week of enquiring. Highly recommend Garud Tata!",
    name: "Amit Verma",
    car: "Tata Nexon EV",
    initials: "AV",
    color: "#0055A5",
  },
  {
    stars: 5,
    text: "I was nervous about my first car purchase but the staff at Garud Tata made it incredibly easy. Knowledgeable, patient, and genuinely helpful. Loving my Punch!",
    name: "Sunita Mehta",
    car: "Tata Punch",
    initials: "SM",
    color: "#1E7FE8",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  const t = testimonials[idx];

  return (
    <section className="bg-[#07111F] py-20 lg:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#1E7FE8] text-sm font-semibold uppercase tracking-widest block mb-3"
          >
            Customer Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            What Our Customers Say
          </motion.h2>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>

              {/* Quote icon */}
              <Quote size={40} className="text-[#0055A5]/40 mx-auto mb-6" />

              <p className="text-white/70 text-xl leading-relaxed mb-8 max-w-2xl mx-auto">
                "{t.text}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </div>
                <div className="text-left">
                  <div className="text-white font-semibold">{t.name}</div>
                  <div className="text-[#1E7FE8] text-sm">{t.car}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#0055A5] hover:border-[#0055A5] transition-all">
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${i === idx ? "w-6 bg-[#0055A5]" : "w-1.5 bg-white/20"}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#0055A5] hover:border-[#0055A5] transition-all">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
