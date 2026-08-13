"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, MapPin, Mail, ArrowRight } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", phone: "", email: "", interest: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="bg-[#F5F7F9] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#0055A5] text-sm font-semibold uppercase tracking-widest block mb-3"
          >
            Get In Touch
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-[#07111F]"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Let's Get You Behind the Wheel.
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-[#07111F] font-bold text-2xl mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Garud Tata – Palam</h3>
              <p className="text-gray-400">We're here to help. Reach out through any of the channels below.</p>
            </div>

            {[
              { icon: Phone, label: "Sales", val: "+91 XXXX-XXXXXX", href: "tel:+91XXXXXXXXXX" },
              { icon: MapPin, label: "Showroom", val: "Sales-Garg Plaza, RZ A70, Dabri - Palam Rd, Main Shiv Market, Palam, Delhi – 110045", href: "#" },
              { icon: Mail, label: "Email", val: "info@garudtata.com", href: "mailto:info@garudtata.com" },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#0055A5]/20 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#0055A5]/10 flex items-center justify-center flex-none group-hover:bg-[#0055A5]/20 transition-all">
                  <c.icon size={20} className="text-[#0055A5]" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-0.5">{c.label}</div>
                  <div className="text-[#07111F] font-medium text-sm">{c.val}</div>
                </div>
              </a>
            ))}

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden h-48 bg-gray-200 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.7!2d77.07!3d28.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM1JzI0LjAiTiA3N8KwMDQnMTIuMCJF!5e0!3m2!1sen!2sin!4v1"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.25 }}
            className="bg-white rounded-3xl p-7 shadow-xl border border-gray-100"
          >
            <h3 className="text-[#07111F] font-bold text-xl mb-6" style={{ fontFamily: "'Syne', sans-serif" }}>Send Enquiry</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0055A5] transition-colors text-sm"
                />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0055A5] transition-colors text-sm"
                />
              </div>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0055A5] transition-colors text-sm"
              />
              <select
                name="interest"
                value={form.interest}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-600 focus:outline-none focus:border-[#0055A5] transition-colors text-sm appearance-none"
              >
                <option value="">Interested In...</option>
                <option>Tata Sierra</option>
                <option>Tata Harrier</option>
                <option>Tata Safari</option>
                <option>Tata Curvv</option>
                <option>Tata Nexon</option>
                <option>Tata Punch</option>
                <option>Tata Altroz</option>
                <option>Tata Tiago</option>
                <option>Finance & Offers</option>
                <option>Service & Support</option>
              </select>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Your Message (optional)"
                rows={4}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#0055A5] transition-colors text-sm resize-none"
              />
              <button className="group w-full py-4 bg-[#0055A5] rounded-xl text-white font-bold hover:bg-[#1E7FE8] transition-all hover:shadow-xl hover:shadow-blue-500/20 flex items-center justify-center gap-2">
                Send Enquiry
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-xs text-gray-400">We'll respond within 24 hours.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
