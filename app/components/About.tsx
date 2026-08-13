"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 15, suffix: "+", label: "Years of Excellence" },
  { value: 5000, suffix: "+", label: "Happy Customers" },
  { value: 1000, suffix: "+", label: "Cars Delivered" },
  { value: 100, suffix: "%", label: "Customer Commitment" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="bg-[#F5F7F9] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80"
                alt="Garud Tata Showroom"
                className="w-full h-full object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 glass-dark rounded-2xl px-5 py-4 border border-white/10">
                <div className="text-white font-bold text-2xl" style={{ fontFamily: "'Syne', sans-serif" }}>
                  <Counter target={15} suffix="+" />
                </div>
                <div className="text-white/50 text-xs uppercase tracking-wider">Years of Trust</div>
              </div>
            </div>
            {/* Decorative */}
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-[#0055A5] rounded-2xl opacity-10" />
          </motion.div>

          {/* Text side */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-[#0055A5] text-sm font-semibold uppercase tracking-widest block mb-3"
            >
              Our Story
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-5xl font-bold text-[#07111F] mb-6 leading-[1.1]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Built on Trust.<br />Driven by Tata.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-gray-500 leading-relaxed mb-8 text-base"
            >
              Garud Tata is an authorized Tata Motors dealership committed to delivering a trusted, premium experience. 
              From your first visit to years of ownership, we stand by professional guidance, transparent communication, 
              and genuine customer-first service.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25 }}
              className="text-gray-500 leading-relaxed mb-10 text-base"
            >
              Located in Palam, New Delhi, we've been helping families and individuals find their perfect Tata for over 15 years.
            </motion.p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-5">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm"
                >
                  <div className="text-3xl font-black text-[#0055A5]" style={{ fontFamily: "'Syne', sans-serif" }}>
                    <Counter target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
