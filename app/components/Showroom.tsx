"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";

export default function Showroom() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="showroom" className="bg-[#07111F] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#1E7FE8] text-sm font-semibold uppercase tracking-widest block mb-3"
          >
            Find Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-white"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Visit Garud Tata
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden aspect-[4/3] relative"
          >
            <img
              src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80"
              alt="Garud Tata Showroom"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07111F]/50 to-transparent" />
            <div className="absolute bottom-5 left-5 glass rounded-xl px-4 py-3 border border-white/10">
              <div className="text-white font-bold text-sm">Garud Tata – Palam</div>
              <div className="text-white/50 text-xs">Authorized Tata Dealer</div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-white font-bold text-2xl mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
                Garud Tata – Palam
              </h3>
              <div className="text-[#1E7FE8] text-sm font-medium">Authorized Tata Motors Dealer</div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <MapPin size={20} className="text-[#1E7FE8] mt-0.5 flex-none" />
                <div>
                  <div className="text-white font-medium text-sm mb-0.5">Address</div>
                  <div className="text-white/50 text-sm leading-relaxed">
                    Sales-Garg Plaza, RZ A70, Dabri - Palam Rd,<br />
                    Main Shiv Market, Palam, New Delhi – 110045
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <Phone size={20} className="text-[#1E7FE8] mt-0.5 flex-none" />
                <div>
                  <div className="text-white font-medium text-sm mb-0.5">Sales & Enquiries</div>
                  <a href="tel:+91XXXXXXXXXX" className="text-white/50 text-sm hover:text-[#1E7FE8] transition-colors">+91 XXXX-XXXXXX</a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <Clock size={20} className="text-[#1E7FE8] mt-0.5 flex-none" />
                <div>
                  <div className="text-white font-medium text-sm mb-1">Working Hours</div>
                  <div className="text-white/50 text-sm">Mon – Sun: 9:30 AM – 7:30 PM</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <a
                href="https://maps.google.com/?q=Garg+Plaza+Palam+New+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-[#0055A5] rounded-full text-white font-semibold text-sm hover:bg-[#1E7FE8] transition-all"
              >
                <Navigation size={16} />
                Get Directions
              </a>
              <a
                href="tel:+91XXXXXXXXXX"
                className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full text-white/70 font-semibold text-sm hover:bg-white/5 transition-all"
              >
                <Phone size={16} />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
