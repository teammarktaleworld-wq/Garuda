// "use client";
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Phone, Menu, X, ChevronRight } from "lucide-react";

// const navLinks = [
//   { label: "Home", href: "#home" },
//   { label: "New Cars", href: "#cars" },
//   { label: "Offers", href: "#offers" },
//   { label: "Test Drive", href: "#testdrive" },
//   { label: "About Us", href: "#about" },
//   { label: "Gallery", href: "#gallery" },
//   { label: "Contact", href: "#contact" },
// ];

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 60);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           scrolled
//             ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100"
//             : "bg-transparent"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 lg:h-20">
//             {/* Logo */}
//             <a href="#home" className="flex items-center gap-3">
//               <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-lg ${scrolled ? "bg-[#0055A5]" : "bg-[#0055A5]/90"}`}>
//                 G
//               </div>
//               <div className="flex flex-col">
//                 <span className={`font-bold text-base leading-tight tracking-wide transition-colors ${scrolled ? "text-[#07111F]" : "text-white"}`} style={{ fontFamily: "'Syne', sans-serif" }}>
//                   GARUD TATA
//                 </span>
//                 <span className={`text-xs leading-tight transition-colors ${scrolled ? "text-[#0055A5]" : "text-blue-300"}`}>
//                   Authorized Tata Dealer
//                 </span>
//               </div>
//             </a>

//             {/* Desktop Nav */}
//             <div className="hidden lg:flex items-center gap-8">
//               {navLinks.map((link) => (
//                 <a
//                   key={link.label}
//                   href={link.href}
//                   className={`text-sm font-medium transition-colors hover:text-[#0055A5] ${
//                     scrolled ? "text-gray-700" : "text-white/90"
//                   }`}
//                 >
//                   {link.label}
//                 </a>
//               ))}
//             </div>

//             {/* Right CTAs */}
//             <div className="hidden lg:flex items-center gap-4">
//               <a
//                 href="tel:+91XXXXXXXXXX"
//                 className={`flex items-center gap-2 text-sm font-medium transition-colors ${scrolled ? "text-gray-700 hover:text-[#0055A5]" : "text-white/90 hover:text-white"}`}
//               >
//                 <Phone size={16} />
//                 <span>Call Now</span>
//               </a>
//               <a
//                 href="#testdrive"
//                 className="px-5 py-2.5 bg-[#0055A5] text-white text-sm font-semibold rounded-full hover:bg-[#1E7FE8] transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
//               >
//                 Book Test Drive
//               </a>
//             </div>

//             {/* Mobile */}
//             <div className="flex lg:hidden items-center gap-3">
//               <a href="tel:+91XXXXXXXXXX" className={`p-2 rounded-full ${scrolled ? "text-[#0055A5]" : "text-white"}`}>
//                 <Phone size={20} />
//               </a>
//               <button
//                 onClick={() => setMenuOpen(true)}
//                 className={`p-2 ${scrolled ? "text-gray-700" : "text-white"}`}
//               >
//                 <Menu size={24} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Mobile Drawer */}
//       <AnimatePresence>
//         {menuOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setMenuOpen(false)}
//               className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
//             />
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 30, stiffness: 300 }}
//               className="fixed right-0 top-0 bottom-0 w-80 bg-[#07111F] z-[70] flex flex-col"
//             >
//               <div className="flex items-center justify-between p-6 border-b border-white/10">
//                 <span className="font-bold text-white text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>GARUD TATA</span>
//                 <button onClick={() => setMenuOpen(false)} className="text-white/60 hover:text-white">
//                   <X size={24} />
//                 </button>
//               </div>
//               <nav className="flex-1 p-6 space-y-1">
//                 {navLinks.map((link, i) => (
//                   <motion.a
//                     key={link.label}
//                     href={link.href}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: i * 0.05 + 0.1 }}
//                     onClick={() => setMenuOpen(false)}
//                     className="flex items-center justify-between py-3 px-4 rounded-xl text-white/80 hover:text-white hover:bg-white/5 transition-all group"
//                   >
//                     <span className="font-medium">{link.label}</span>
//                     <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
//                   </motion.a>
//                 ))}
//               </nav>
//               <div className="p-6 space-y-3 border-t border-white/10">
//                 <a href="tel:+91XXXXXXXXXX" className="flex items-center justify-center gap-2 w-full py-3 border border-white/20 rounded-xl text-white font-medium hover:bg-white/5 transition-all">
//                   <Phone size={18} />
//                   Call Us Now
//                 </a>
//                 <a href="#testdrive" onClick={() => setMenuOpen(false)} className="flex items-center justify-center w-full py-3 bg-[#0055A5] rounded-xl text-white font-semibold hover:bg-[#1E7FE8] transition-all">
//                   Book Test Drive
//                 </a>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Mobile Bottom Bar */}
//       <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
//         <div className="bg-[#07111F]/95 backdrop-blur-xl border-t border-white/10 grid grid-cols-3">
//           <a href="tel:+91XXXXXXXXXX" className="flex flex-col items-center gap-1 py-3 text-white/70 hover:text-[#0055A5] transition-colors">
//             <Phone size={20} />
//             <span className="text-xs font-medium">Call Now</span>
//           </a>
//           <a href="#testdrive" className="flex flex-col items-center gap-1 py-3 bg-[#0055A5] text-white">
//             <span className="text-xs font-bold">BOOK TEST DRIVE</span>
//           </a>
//           <a href="#showroom" className="flex flex-col items-center gap-1 py-3 text-white/70 hover:text-[#0055A5] transition-colors">
//             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
//             <span className="text-xs font-medium">Locate Us</span>
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }
















"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Phone, 
  Menu, 
  X, 
  ArrowRight, 
  ChevronRight, 
  Tag, 
  Percent, 
  RefreshCcw, 
  Sparkles,
  MapPin,
  Car
} from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "New Cars", href: "#cars", hasMegaMenu: true },
  { label: "Offers", href: "#offers", hasDropdown: true },
  { label: "About Us", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const suvModels = ["Tata Sierra", "Tata Harrier", "Tata Safari", "Tata Curvv", "Tata Nexon", "Tata Punch"];
const hatchbackModels = ["Tata Altroz", "Tata Tiago"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [menuOpen]);

  return (
    <>
      {/* 1. MAIN DESKTOP & MOBILE HEADER */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? "bg-[#050810]/90 backdrop-blur-2xl border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.2)] h-[68px]"
            : "bg-[rgba(10,15,25,0.20)] backdrop-blur-[16px] border-white/10 h-[84px]"
        }`}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-full flex items-center justify-between">
          
          {/* Logo */}
          <a href="#home" className="relative z-50 flex items-center gap-3 group">
            {/* Replace with actual client logo image when available */}
            <div className="flex flex-col justify-center">
              <span className="font-bold text-lg lg:text-xl text-white tracking-widest leading-none group-hover:text-white/90 transition-colors">
                GARUD TATA
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center h-full gap-8">
            {navLinks.map((link) => (
              <div 
                key={link.label}
                className="relative h-full flex items-center"
                onMouseEnter={() => {
                  setHoveredItem(link.label);
                  if (link.hasMegaMenu) setActiveDropdown("cars");
                  else if (link.hasDropdown) setActiveDropdown("offers");
                  else setActiveDropdown(null);
                }}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <a
                  href={link.href}
                  className="text-[14px] font-medium tracking-[0.02em] text-white/80 hover:text-white transition-colors py-2 flex items-center gap-1"
                >
                  {link.label}
                </a>
                
                {/* Active/Hover Animated Underline */}
                {hoveredItem === link.label && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-[20px] left-0 right-0 h-[2px] bg-[#0055A5]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-5">
            {/* Call Action - Hover to reveal number */}
            <a
              href="tel:+919876543210"
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all duration-300 overflow-hidden backdrop-blur-md"
            >
              <Phone size={16} className="text-white/70 group-hover:text-white transition-colors" />
              <div className="flex flex-col h-5 justify-center overflow-hidden relative w-[32px] group-hover:w-[115px] transition-all duration-300 ease-[0.16,1,0.3,1]">
                <span className="absolute left-0 transition-transform duration-300 group-hover:-translate-y-full opacity-100 group-hover:opacity-0">Call</span>
                <span className="absolute left-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100 tracking-wider whitespace-nowrap">+91 98765 43210</span>
              </div>
            </a>

            {/* Primary CTA */}
            <a
              href="#testdrive"
              className="group flex items-center gap-2 px-6 py-2.5 bg-[#0055A5] text-white text-sm font-medium rounded-full shadow-[0_4px_14px_rgba(0,85,165,0.2)] hover:shadow-[0_6px_20px_rgba(0,85,165,0.4)] hover:-translate-y-[1px] transition-all duration-300"
            >
              BOOK A TEST DRIVE
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Mobile Hamburger & Call */}
          <div className="flex lg:hidden items-center gap-4">
            <a href="tel:+919876543210" className="p-2 text-white/80 hover:text-white transition-colors">
              <Phone size={20} />
            </a>
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 text-white hover:text-white/80 transition-colors z-[60]"
              aria-label="Open Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* 2. MEGA MENU - NEW CARS */}
        <AnimatePresence>
          {activeDropdown === "cars" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 w-full bg-[#050810]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl overflow-hidden"
              onMouseEnter={() => setActiveDropdown("cars")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <div className="max-w-[1440px] mx-auto px-12 py-10 flex gap-16">
                
                {/* Lists */}
                <div className="flex gap-16 flex-1">
                  <div>
                    <h3 className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase mb-6 border-b border-white/10 pb-4">SUV</h3>
                    <ul className="space-y-4">
                      {suvModels.map(model => (
                        <li key={model}>
                          <a href="#" className="text-[15px] font-medium text-white/80 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group">
                            {model}
                            {model === "Tata Sierra" && <span className="text-[9px] bg-[#0055A5] px-2 py-0.5 rounded-full text-white ml-2">NEW</span>}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase mb-6 border-b border-white/10 pb-4">Hatchback & Sedan</h3>
                    <ul className="space-y-4">
                      {hatchbackModels.map(model => (
                        <li key={model}>
                          <a href="#" className="text-[15px] font-medium text-white/80 hover:text-white hover:translate-x-1 transition-all">
                            {model}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Featured Vehicle Card */}
                <div className="w-[400px] rounded-xl overflow-hidden relative group cursor-pointer bg-white/5 border border-white/10">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
                  <img 
                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80" 
                    alt="Featured Tata" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                    <h4 className="text-2xl font-bold text-white mb-2 tracking-tight">Tata Sierra</h4>
                    <p className="text-sm text-white/70 mb-4 leading-relaxed">Discover the new generation of adventure and technology.</p>
                    <div className="flex items-center text-xs font-semibold text-white tracking-widest uppercase">
                      Explore Vehicle <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. DROPDOWN - OFFERS */}
        <AnimatePresence>
          {activeDropdown === "offers" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-[100%] left-[50%] -translate-x-[20%] mt-2 w-64 bg-[#0A0F19]/95 backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl p-2"
              onMouseEnter={() => setActiveDropdown("offers")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {[
                { icon: Tag, label: "Current Offers" },
                { icon: Percent, label: "Finance Offers" },
                { icon: RefreshCcw, label: "Exchange Bonus" },
                { icon: Sparkles, label: "Corporate Deals" }
              ].map((item) => (
                <a key={item.label} href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/5 transition-colors group">
                  <item.icon size={16} className="text-[#0055A5] group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* 4. MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[70] bg-[#050505] flex flex-col lg:hidden overflow-y-auto"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between px-6 h-[84px] border-b border-white/10 shrink-0">
              <span className="font-bold text-lg text-white tracking-widest leading-none">
                GARUD TATA
              </span>
              <button 
                onClick={() => setMenuOpen(false)}
                className="p-2 text-white/70 hover:text-white bg-white/5 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Menu Links */}
            <div className="flex-1 px-6 py-8 flex flex-col justify-center">
              <nav className="space-y-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex items-center gap-6 text-white"
                  >
                    <span className="text-sm font-mono text-white/30 group-hover:text-[#0055A5] transition-colors">
                      0{index + 1}
                    </span>
                    <span className="text-[2.5rem] font-medium tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Mobile Menu Footer Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="p-6 space-y-4 shrink-0 pb-28" // pb-28 to account for bottom fixed bar
            >
              <a href="#testdrive" onClick={() => setMenuOpen(false)} className="flex items-center justify-between w-full p-4 bg-[#0055A5] rounded-xl text-white font-medium hover:bg-[#004488] transition-colors">
                BOOK A TEST DRIVE
                <ArrowRight size={20} />
              </a>
              <a href="tel:+919876543210" className="flex items-center justify-between w-full p-4 border border-white/20 rounded-xl text-white font-medium hover:bg-white/5 transition-colors">
                CALL GARUD TATA
                <Phone size={20} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. MOBILE BOTTOM ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-[65] lg:hidden">
        <div className="bg-[#050810]/95 backdrop-blur-xl border-t border-white/10 grid grid-cols-3 h-[72px] pb-safe">
          <a href="tel:+919876543210" className="flex flex-col items-center justify-center gap-1 text-white/70 hover:text-white transition-colors">
            <Phone size={20} strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-wider font-medium">Call</span>
          </a>
          <a href="#testdrive" className="flex flex-col items-center justify-center bg-[#0055A5] text-white">
            <Car size={22} strokeWidth={1.5} className="mb-1" />
            <span className="text-[10px] uppercase tracking-widest font-bold">Test Drive</span>
          </a>
          <a href="#showroom" className="flex flex-col items-center justify-center gap-1 text-white/70 hover:text-white transition-colors">
            <MapPin size={20} strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-wider font-medium">Map</span>
          </a>
        </div>
      </div>
    </>
  );
}