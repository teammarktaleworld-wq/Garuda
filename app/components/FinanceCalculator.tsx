"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Calculator, Banknote, Clock, TrendingDown } from "lucide-react";

export default function FinanceCalculator() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [price, setPrice] = useState(1500000);
  const [down, setDown] = useState(300000);
  const [rate, setRate] = useState(9);
  const [tenure, setTenure] = useState(60);

  const principal = price - down;
  const monthlyRate = rate / 100 / 12;
  const emi =
    monthlyRate > 0
      ? (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
        (Math.pow(1 + monthlyRate, tenure) - 1)
      : principal / tenure;

  const features = [
    { icon: Banknote, label: "Easy EMI", sub: "Starting ₹8,999/mo" },
    { icon: Clock, label: "Quick Processing", sub: "Approval in 24 hours" },
    { icon: TrendingDown, label: "Flexible Tenure", sub: "12 to 84 months" },
    { icon: Calculator, label: "Exchange Assistance", sub: "Get best value" },
  ];

  return (
    <section className="bg-[#F5F7F9] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#0055A5] text-sm font-semibold uppercase tracking-widest block mb-3"
          >
            Finance
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-[#07111F] mb-3"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Your Dream Tata, Your Way.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.15 }}
            className="text-gray-500 max-w-xl mx-auto"
          >
            Flexible financing options designed to make your next car easier to own.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 15 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0055A5]/10 flex items-center justify-center flex-none">
                  <f.icon size={22} className="text-[#0055A5]" />
                </div>
                <div>
                  <div className="font-bold text-[#07111F]" style={{ fontFamily: "'Syne', sans-serif" }}>{f.label}</div>
                  <div className="text-gray-400 text-sm">{f.sub}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-7 shadow-xl border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-6">
              <Calculator size={22} className="text-[#0055A5]" />
              <h3 className="font-bold text-[#07111F] text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>EMI Calculator</h3>
            </div>

            <div className="space-y-5">
              {[
                { label: "Car Price (₹)", value: price, setter: setPrice, min: 500000, max: 5000000, step: 50000 },
                { label: "Down Payment (₹)", value: down, setter: setDown, min: 0, max: price, step: 50000 },
                { label: "Interest Rate (%)", value: rate, setter: setRate, min: 5, max: 18, step: 0.5 },
                { label: "Loan Tenure (months)", value: tenure, setter: setTenure, min: 12, max: 84, step: 12 },
              ].map((field) => (
                <div key={field.label}>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-600">{field.label}</label>
                    <span className="text-sm font-bold text-[#0055A5]">
                      {field.label.includes("₹") ? `₹${field.value.toLocaleString("en-IN")}` : field.label.includes("%") ? `${field.value}%` : `${field.value} mo`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    value={field.value}
                    onChange={(e) => field.setter(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: "#0055A5" }}
                  />
                </div>
              ))}
            </div>

            {/* Result */}
            <div className="mt-6 p-5 rounded-2xl bg-[#07111F] text-center">
              <div className="text-white/50 text-xs uppercase tracking-widest mb-1">Estimated Monthly EMI</div>
              <div className="text-4xl font-black text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                ₹{Math.round(emi).toLocaleString("en-IN")}
              </div>
              <div className="text-white/30 text-xs mt-2">*Indicative only. Actual may vary based on lender.</div>
            </div>

            <a href="#contact" className="mt-4 block w-full py-3.5 bg-[#0055A5] text-white text-center rounded-xl font-semibold hover:bg-[#1E7FE8] transition-all text-sm">
              Get Finance Quote →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
