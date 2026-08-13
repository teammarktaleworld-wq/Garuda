"use client";
import { MapPin, Phone, Mail, PlayCircle } from "lucide-react";

const models = ["Harrier", "Safari", "Nexon", "Punch", "Curvv", "Sierra", "Tiago", "Altroz"];
const navLinks = [
  { label: "New Cars", href: "#cars" },
  { label: "Offers", href: "#offers" },
  { label: "Test Drive", href: "#testdrive" },
  { label: "About Us", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#07111F] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#0055A5] flex items-center justify-center font-bold text-white text-lg">G</div>
              <div>
                <div className="font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>GARUD TATA</div>
                <div className="text-[#1E7FE8] text-xs">Authorized Tata Dealer</div>
              </div>
            </div>
            <p className="text-white/30 text-sm leading-relaxed mb-5">
              Your trusted authorized Tata Motors dealership in Palam, New Delhi. Professional guidance and customer-first service.
            </p>
            <div className="flex gap-3">
              {["IG", "FB", "YT"].map((label, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-[#0055A5] hover:text-white transition-all text-xs font-bold">
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/40 text-sm hover:text-[#1E7FE8] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Models */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Popular Models</h4>
            <ul className="space-y-2.5">
              {models.map((m) => (
                <li key={m}>
                  <a href="#cars" className="text-white/40 text-sm hover:text-[#1E7FE8] transition-colors">
                    Tata {m}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="text-[#1E7FE8] mt-0.5 flex-none" />
                <a href="tel:+91XXXXXXXXXX" className="text-white/40 text-sm hover:text-white transition-colors">+91 XXXX-XXXXXX</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[#1E7FE8] mt-0.5 flex-none" />
                <span className="text-white/40 text-sm leading-relaxed">Sales-Garg Plaza, RZ A70, Palam, Delhi – 110045</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="text-[#1E7FE8] mt-0.5 flex-none" />
                <a href="mailto:info@garudtata.com" className="text-white/40 text-sm hover:text-white transition-colors">info@garudtata.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            © 2026 Garud Tata. All Rights Reserved. Authorized Tata Motors Dealer.
          </p>
          <p className="text-white/15 text-xs text-center sm:text-right max-w-sm">
            *Prices are indicative and subject to change. Please contact showroom for latest pricing and offers.
          </p>
        </div>
      </div>
    </footer>
  );
}
