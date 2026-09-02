
// "use client";

// import { MapPin, Phone, Mail } from "lucide-react";
// import { motion, type Variants } from "framer-motion";

// const models = ["Harrier", "Safari", "Nexon", "Punch", "Curvv", "Sierra", "Tiago", "Altroz"];

// const navLinks = [
//   { label: "New Cars", href: "#cars" },
//   { label: "Offers", href: "#offers" },
//   { label: "Test Drive", href: "#testdrive" },
//   { label: "About Us", href: "#about" },
//   { label: "Gallery", href: "#gallery" },
//   { label: "Contact", href: "#contact" },
// ];

// // Shortened addresses to easily fit within two lines
// const locations = [
//   {
//     name: "Palam Showroom",
//     address: "Garg Plaza, RZ A70, Dabri–Palam Rd, New Delhi 110045",
//     phone: "9217371204",
//     maps: "https://maps.google.com/?q=Garg+Plaza+RZ+A70+Dabri+Palam+Rd+Main+Shiv+Market+Palam+New+Delhi+110045",
//   },
//   {
//     name: "Narela Showroom",
//     address: "Khasra No 42/12, Narela, New Delhi 110040",
//     phone: "9311083011",
//     maps: "https://maps.google.com/?q=Khasra+No+42%2F12+Narela+New+Delhi+110040",
//   },
//   {
//     name: "Najafgarh Showroom",
//     address: "Plot No. 8–11, Najafgarh Rd, Near Sai Baba Mandir, New Delhi 110043",
//     phone: "9217371207",
//     maps: "https://maps.google.com/?q=Plot+No+8+to+11+Najafgarh+Rd+Near+Sai+Baba+Mandir+Najafgarh+New+Delhi+110043",
//   },
//   {
//     name: "Dwarka Service Centre",
//     address: "Shanti Garden, Matiala Ind. Area, Dwarka, New Delhi 110059",
//     phone: "9319198306",
//     maps: "https://maps.google.com/?q=Shanti+Garden+Matiala+Industrial+Area+Dwarka+New+Delhi+110059",
//   },
//   {
//     name: "Najafgarh Service Centre",
//     address: "Plot No. 8–11, Main Najafgarh Rd, New Delhi 110043",
//     phone: "9319198306",
//     maps: "https://maps.google.com/?q=Plot+No+8+to+11+Main+Najafgarh+Road+Near+Sai+Baba+Mandir+Najafgarh+New+Delhi+110043",
//   },
// ];

// /* Framer Motion Variants */
// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1, delayChildren: 0.1 },
//   },
// };

// const itemVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
// };

// export default function Footer() {
//   return (
//     <footer className="bg-[#07111F] border-t border-white/5 overflow-hidden">
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-50px" }}
//         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
//       >
//         {/* Main Grid: 1 col on mobile, 2 on tablet, 12-col span on desktop */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">

//           {/* 1. Brand Section */}
//           <motion.div variants={itemVariants} className="lg:col-span-4 pr-0 lg:pr-6">
//             <div className="flex items-center gap-3 mb-6">
//               {/* Fix: Replaced strict background block with a responsive container to show full logo */}
//               <div className="h-10 w-32 sm:h-12 sm:w-40 flex items-center justify-start flex-shrink-0">
//                 <img
//                   src="/images/logo.jpg"
//                   alt="Garud Tata Logo"
//                   className="w-full h-full object-contain object-left"
//                 />
//               </div>
//               <div className="border-l border-white/20 pl-3">
//                 <div className="font-bold text-white text-base tracking-wide" style={{ fontFamily: "'Syne', sans-serif" }}>GARUD TATA</div>
//                 <div className="text-[#1E7FE8] text-[10px] font-medium tracking-wider uppercase">Authorized Dealer</div>
//               </div>
//             </div>

//             <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-sm">
//               Your trusted authorized Tata Motors dealership across Delhi NCR. Professional guidance, complete EV support, and customer-first service.
//             </p>

//             <div className="flex gap-3 mb-8">
//               {["IG", "FB", "YT"].map((label, i) => (
//                 <motion.a
//                   key={i}
//                   href={
//                     label === "IG"
//                       ? "https://www.instagram.com/garudtata/"
//                       : "#"
//                   }
//                   target={label === "IG" ? "_blank" : undefined}
//                   rel={label === "IG" ? "noopener noreferrer" : undefined}
//                   whileHover={{ scale: 1.1, y: -2 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#0055A5] hover:text-white hover:border-[#0055A5] transition-colors text-xs font-bold"
//                 >
//                   {label}
//                 </motion.a>
//               ))}
//             </div>

//             <ul className="space-y-4">
//               <li className="flex items-center gap-3 group cursor-pointer">
//                 <div className="w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center group-hover:bg-[#1E7FE8]/20 transition-colors">
//                   <Phone size={14} className="text-[#1E7FE8]" />
//                 </div>
//                 <a href="tel:+919876543210" className="text-white/60 text-sm group-hover:text-white font-medium transition-colors">
//                   Sales: +91 9217371204
//                 </a>
//               </li>
//               <li className="flex items-center gap-3 group cursor-pointer">
//                 <div className="w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center group-hover:bg-[#1E7FE8]/20 transition-colors">
//                   <Mail size={14} className="text-[#1E7FE8]" />
//                 </div>
//                 {/* Fix: Changed email */}
//                 <a href="mailto:sales@garudtata.com" className="text-white/60 text-sm group-hover:text-white transition-colors">
//                   sales@garudtata.com
//                 </a>
//               </li>
//             </ul>
//           </motion.div>

//           {/* 2. Navigation */}
//           <motion.div variants={itemVariants} className="lg:col-span-2">
//             <h4 className="text-white font-semibold text-sm mb-6 uppercase tracking-wider">Navigate</h4>
//             <ul className="space-y-3.5">
//               {navLinks.map((link) => (
//                 <li key={link.label}>
//                   <a href={link.href} className="text-white/40 text-sm hover:text-[#1E7FE8] transition-colors flex items-center gap-2 group">
//                     <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8]/0 group-hover:bg-[#1E7FE8] transition-all" />
//                     <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* 3. Models */}
//           <motion.div variants={itemVariants} className="lg:col-span-2">
//             <h4 className="text-white font-semibold text-sm mb-6 uppercase tracking-wider">Models</h4>
//             <ul className="space-y-3.5">
//               {models.map((m) => (
//                 <li key={m}>
//                   <a href="#cars" className="text-white/40 text-sm hover:text-[#1E7FE8] transition-colors flex items-center gap-2 group">
//                     <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8]/0 group-hover:bg-[#1E7FE8] transition-all" />
//                     <span className="group-hover:translate-x-1 transition-transform">Tata {m}</span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* 4. Locations */}
//           <motion.div variants={itemVariants} className="lg:col-span-4">
//             <h4 className="text-white font-semibold text-sm mb-6 uppercase tracking-wider">Our Locations</h4>
//             <ul className="space-y-5">
//               {locations.map((loc) => (
//                 <li key={loc.name}>
//                   <a
//                     href={loc.maps}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="group block p-3 -mx-3 rounded-xl hover:bg-white/[0.02] transition-colors"
//                   >
//                     <div className="flex items-start gap-3">
//                       <div className="mt-0.5 p-1.5 rounded-full bg-white/[0.03] group-hover:bg-[#1E7FE8]/10 transition-colors">
//                         <MapPin size={15} className="text-[#1E7FE8] group-hover:-rotate-12 transition-transform" />
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <div className="text-white/80 text-sm font-medium group-hover:text-white transition-colors mb-1">
//                           {loc.name}
//                         </div>
//                         {/* Fix: Strict 2-line clamp */}
//                         <div className="text-white/40 text-[13px] leading-relaxed group-hover:text-white/60 transition-colors line-clamp-2 pr-4">
//                           {loc.address}
//                         </div>
//                         <div className="text-[#1E7FE8]/80 text-[12px] mt-1.5 font-medium group-hover:text-[#1E7FE8] transition-colors flex items-center gap-1.5">
//                           <Phone size={11} /> +91 {loc.phone}
//                         </div>
//                       </div>
//                     </div>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         </div>

//         {/* Bottom Bar */}
//         <motion.div
//           variants={itemVariants}
//           className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
//         >
//           <p className="text-white/30 text-xs text-center md:text-left">
//             © {new Date().getFullYear()} Garud Tata. All Rights Reserved.
//           </p>
//           <p className="text-white/20 text-xs text-center md:text-right max-w-lg">
//             *Prices and specifications are indicative and subject to change. Please contact the showroom for the latest details.
//           </p>
//         </motion.div>
//       </motion.div>
//     </footer>
//   );
// }















// "use client";

// import Link from "next/link";
// import { MapPin, Phone, Mail } from "lucide-react";
// import { motion, type Variants } from "framer-motion";

// const models = [
//   "Harrier",
//   "Safari",
//   "Nexon",
//   "Punch",
//   "Curvv",
//   "Sierra",
//   "Tiago",
//   "Altroz",
// ];

// const navLinks = [
//   { label: "New Cars", href: "#cars" },
//   { label: "Offers", href: "#offers" },
//   { label: "Test Drive", href: "#testdrive" },
//   { label: "About Us", href: "#about" },
//   { label: "Gallery", href: "#gallery" },
//   { label: "Contact", href: "#contact" },
// ];

// /* =========================================================
//    SHOWROOM & SERVICE LOCATIONS
// ========================================================= */

// const locations = [
//   {
//     name: "Palam Showroom",
//     address: "Garg Plaza, RZ A70, Dabri–Palam Rd, New Delhi 110045",
//     phone: "9217371204",
//     maps:
//       "https://maps.google.com/?q=Garg+Plaza+RZ+A70+Dabri+Palam+Rd+Main+Shiv+Market+Palam+New+Delhi+110045",
//   },
//   {
//     name: "Narela Showroom",
//     address: "Khasra No 42/12, Narela, New Delhi 110040",
//     phone: "9311083011",
//     maps:
//       "https://maps.google.com/?q=Khasra+No+42%2F12+Narela+New+Delhi+110040",
//   },
//   {
//     name: "Najafgarh Showroom",
//     address:
//       "Plot No. 8–11, Najafgarh Rd, Near Sai Baba Mandir, New Delhi 110043",
//     phone: "9217371207",
//     maps:
//       "https://maps.google.com/?q=Plot+No+8+to+11+Najafgarh+Rd+Near+Sai+Baba+Mandir+Najafgarh+New+Delhi+110043",
//   },
//   {
//     name: "Dwarka Service Centre",
//     address:
//       "Shanti Garden, Matiala Ind. Area, Dwarka, New Delhi 110059",
//     phone: "9319198306",
//     maps:
//       "https://maps.google.com/?q=Shanti+Garden+Matiala+Industrial+Area+Dwarka+New+Delhi+110059",
//   },
//   {
//     name: "Najafgarh Service Centre",
//     address:
//       "Plot No. 8–11, Main Najafgarh Rd, New Delhi 110043",
//     phone: "9319198306",
//     maps:
//       "https://maps.google.com/?q=Plot+No+8+to+11+Main+Najafgarh+Road+Near+Sai+Baba+Mandir+Najafgarh+New+Delhi+110043",
//   },
// ];

// /* =========================================================
//    FRAMER MOTION
// ========================================================= */

// const containerVariants: Variants = {
//   hidden: {
//     opacity: 0,
//   },

//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.1,
//     },
//   },
// };

// const itemVariants: Variants = {
//   hidden: {
//     opacity: 0,
//     y: 20,
//   },

//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.5,
//       ease: "easeOut",
//     },
//   },
// };

// /* =========================================================
//    FOOTER
// ========================================================= */

// export default function Footer() {
//   return (
//     <footer className="bg-[#07111F] border-t border-white/5 overflow-hidden">
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{
//           once: true,
//           margin: "-50px",
//         }}
//         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
//       >
//         {/* =====================================================
//             MAIN GRID
//         ===================================================== */}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
//           {/* ===================================================
//               1. BRAND SECTION
//           =================================================== */}

//           <motion.div
//             variants={itemVariants}
//             className="lg:col-span-4 pr-0 lg:pr-6"
//           >
//             {/* Logo */}
//             <div className="flex items-center gap-3 mb-6">
//               <div className="h-10 w-32 sm:h-12 sm:w-40 flex items-center justify-start flex-shrink-0">
//                 <img
//                   src="/images/logo.jpg"
//                   alt="Garud Tata Logo"
//                   className="w-full h-full object-contain object-left"
//                 />
//               </div>

//               <div className="border-l border-white/20 pl-3">
//                 <div
//                   className="font-bold text-white text-base tracking-wide"
//                   style={{
//                     fontFamily: "'Syne', sans-serif",
//                   }}
//                 >
//                   GARUD TATA
//                 </div>

//                 <div className="text-[#1E7FE8] text-[10px] font-medium tracking-wider uppercase">
//                   Authorized Dealer
//                 </div>
//               </div>
//             </div>

//             {/* Description */}
//             <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-sm">
//               Your trusted authorized Tata Motors dealership across Delhi NCR.
//               Professional guidance, complete EV support, and customer-first
//               service.
//             </p>

//             {/* =================================================
//                 SOCIAL MEDIA
//             ================================================= */}

//             <div className="flex gap-3 mb-8">
//               {["IG", "FB", "YT"].map((label, i) => (
//                 <motion.a
//                   key={i}
//                   href={
//                     label === "IG"
//                       ? "https://www.instagram.com/garudtata/"
//                       : "#"
//                   }
//                   target={label === "IG" ? "_blank" : undefined}
//                   rel={
//                     label === "IG"
//                       ? "noopener noreferrer"
//                       : undefined
//                   }
//                   whileHover={{
//                     scale: 1.1,
//                     y: -2,
//                   }}
//                   whileTap={{
//                     scale: 0.95,
//                   }}
//                   className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#0055A5] hover:text-white hover:border-[#0055A5] transition-colors text-xs font-bold"
//                 >
//                   {label}
//                 </motion.a>
//               ))}
//             </div>

//             {/* =================================================
//                 CONTACT DETAILS
//             ================================================= */}

//             <ul className="space-y-4">
//               {/* Sales Phone */}
//               <li className="flex items-center gap-3 group">
//                 <div className="w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center group-hover:bg-[#1E7FE8]/20 transition-colors">
//                   <Phone
//                     size={14}
//                     className="text-[#1E7FE8]"
//                   />
//                 </div>

//                 <a
//                   href="tel:+919217371204"
//                   className="text-white/60 text-sm group-hover:text-white font-medium transition-colors"
//                 >
//                   Sales: +91 9217371204
//                 </a>
//               </li>

//               {/* Email */}
//               <li className="flex items-center gap-3 group">
//                 <div className="w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center group-hover:bg-[#1E7FE8]/20 transition-colors">
//                   <Mail
//                     size={14}
//                     className="text-[#1E7FE8]"
//                   />
//                 </div>

//                 <a
//                   href="mailto:sales@garudtata.com"
//                   className="text-white/60 text-sm group-hover:text-white transition-colors"
//                 >
//                   sales@garudtata.com
//                 </a>
//               </li>
//             </ul>
//           </motion.div>

//           {/* ===================================================
//               2. NAVIGATION
//           =================================================== */}

//           <motion.div
//             variants={itemVariants}
//             className="lg:col-span-2"
//           >
//             <h4 className="text-white font-semibold text-sm mb-6 uppercase tracking-wider">
//               Navigate
//             </h4>

//             <ul className="space-y-3.5">
//               {navLinks.map((link) => (
//                 <li key={link.label}>
//                   <a
//                     href={link.href}
//                     className="text-white/40 text-sm hover:text-[#1E7FE8] transition-colors flex items-center gap-2 group"
//                   >
//                     <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8]/0 group-hover:bg-[#1E7FE8] transition-all" />

//                     <span className="group-hover:translate-x-1 transition-transform">
//                       {link.label}
//                     </span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* ===================================================
//               3. MODELS
//           =================================================== */}

//           <motion.div
//             variants={itemVariants}
//             className="lg:col-span-2"
//           >
//             <h4 className="text-white font-semibold text-sm mb-6 uppercase tracking-wider">
//               Models
//             </h4>

//             <ul className="space-y-3.5">
//               {models.map((model) => (
//                 <li key={model}>
//                   <a
//                     href="#cars"
//                     className="text-white/40 text-sm hover:text-[#1E7FE8] transition-colors flex items-center gap-2 group"
//                   >
//                     <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8]/0 group-hover:bg-[#1E7FE8] transition-all" />

//                     <span className="group-hover:translate-x-1 transition-transform">
//                       Tata {model}
//                     </span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* ===================================================
//               4. LOCATIONS
//           =================================================== */}

//           <motion.div
//             variants={itemVariants}
//             className="lg:col-span-4"
//           >
//             <h4 className="text-white font-semibold text-sm mb-6 uppercase tracking-wider">
//               Our Locations
//             </h4>

//             <ul className="space-y-5">
//               {locations.map((loc) => (
//                 <li key={loc.name}>
//                   <a
//                     href={loc.maps}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="group block p-3 -mx-3 rounded-xl hover:bg-white/[0.02] transition-colors"
//                   >
//                     <div className="flex items-start gap-3">
//                       {/* Map Icon */}
//                       <div className="mt-0.5 p-1.5 rounded-full bg-white/[0.03] group-hover:bg-[#1E7FE8]/10 transition-colors">
//                         <MapPin
//                           size={15}
//                           className="text-[#1E7FE8] group-hover:-rotate-12 transition-transform"
//                         />
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         {/* Location Name */}
//                         <div className="text-white/80 text-sm font-medium group-hover:text-white transition-colors mb-1">
//                           {loc.name}
//                         </div>

//                         {/* Address */}
//                         <div className="text-white/40 text-[13px] leading-relaxed group-hover:text-white/60 transition-colors line-clamp-2 pr-4">
//                           {loc.address}
//                         </div>

//                         {/* Phone */}
//                         <div className="text-[#1E7FE8]/80 text-[12px] mt-1.5 font-medium group-hover:text-[#1E7FE8] transition-colors flex items-center gap-1.5">
//                           <Phone size={11} />
//                           +91 {loc.phone}
//                         </div>
//                       </div>
//                     </div>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         </div>

//         {/* =====================================================
//             BOTTOM BAR
//         ===================================================== */}

//         <motion.div
//           variants={itemVariants}
//           className="pt-8 border-t border-white/10"
//         >
//           <div className="flex flex-col md:flex-row items-center justify-between gap-5">
//             {/* Copyright */}
//             <p className="text-white/30 text-xs text-center md:text-left">
//               © {new Date().getFullYear()} Garud Tata. All Rights Reserved.
//             </p>

//             {/* Legal Links */}
//             <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
//               <Link
//                 href="/privacy-policy"
//                 className="text-white/40 text-xs hover:text-[#1E7FE8] transition-colors"
//               >
//                 Privacy Policy
//               </Link>

//               <span className="text-white/10">|</span>

//               <Link
//                 href="/terms-and-conditions"
//                 className="text-white/40 text-xs hover:text-[#1E7FE8] transition-colors"
//               >
//                 Terms & Conditions
//               </Link>

//               <span className="text-white/10">|</span>

//               <a
//                 href="#contact"
//                 className="text-white/40 text-xs hover:text-[#1E7FE8] transition-colors"
//               >
//                 Contact Us
//               </a>
//             </div>
//           </div>

//           {/* Disclaimer */}
//           <p className="text-white/20 text-xs text-center max-w-3xl mx-auto mt-5 leading-relaxed">
//             *Prices and specifications are indicative and subject to change.
//             Please contact the showroom for the latest details.
//           </p>
//         </motion.div>
//       </motion.div>
//     </footer>
//   );
// }


















// "use client";

// import Link from "next/link";
// import { MapPin, Phone, Mail } from "lucide-react";
// import { motion, type Variants } from "framer-motion";

// const models = [
//   "Harrier",
//   "Safari",
//   "Nexon",
//   "Punch",
//   "Curvv",
//   "Sierra",
//   "Tiago",
//   "Altroz",
// ];

// const navLinks = [
//   { label: "New Cars", href: "#cars" },
//   { label: "Offers", href: "#offers" },
//   { label: "Test Drive", href: "#testdrive" },
//   { label: "About Us", href: "#about" },
//   { label: "Gallery", href: "#gallery" },
//   { label: "Contact", href: "#contact" },
// ];

// /* =========================================================
//    SHOWROOM & SERVICE LOCATIONS
// ========================================================= */

// const locations = [
//   {
//     name: "Palam Showroom",
//     address: "Garg Plaza, RZ A70, Dabri–Palam Rd, New Delhi 110045",
//     phone: "9217371204",
//     maps:
//       "https://maps.google.com/?q=Garg+Plaza+RZ+A70+Dabri+Palam+Rd+Main+Shiv+Market+Palam+New+Delhi+110045",
//   },
//   {
//     name: "Narela Showroom",
//     address: "Khasra No 42/12, Narela, New Delhi 110040",
//     phone: "9311083011",
//     maps:
//       "https://maps.google.com/?q=Khasra+No+42%2F12+Narela+New+Delhi+110040",
//   },
//   {
//     name: "Najafgarh Showroom",
//     address:
//       "Plot No. 8–11, Najafgarh Rd, Near Sai Baba Mandir, New Delhi 110043",
//     phone: "9217371207",
//     maps:
//       "https://maps.google.com/?q=Plot+No+8+to+11+Najafgarh+Rd+Near+Sai+Baba+Mandir+Najafgarh+New+Delhi+110043",
//   },
//   {
//     name: "Dwarka Service Centre",
//     address:
//       "Shanti Garden, Matiala Ind. Area, Dwarka, New Delhi 110059",
//     phone: "9319198306",
//     maps:
//       "https://maps.google.com/?q=Shanti+Garden+Matiala+Industrial+Area+Dwarka+New+Delhi+110059",
//   },
//   {
//     name: "Najafgarh Service Centre",
//     address:
//       "Plot No. 8–11, Main Najafgarh Rd, New Delhi 110043",
//     phone: "9319198306",
//     maps:
//       "https://maps.google.com/?q=Plot+No+8+to+11+Main+Najafgarh+Road+Near+Sai+Baba+Mandir+Najafgarh+New+Delhi+110043",
//   },
// ];

// /* =========================================================
//    FRAMER MOTION VARIANTS
// ========================================================= */

// const containerVariants: Variants = {
//   hidden: {
//     opacity: 0,
//   },

//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//       delayChildren: 0.1,
//     },
//   },
// };

// const itemVariants: Variants = {
//   hidden: {
//     opacity: 0,
//     y: 20,
//   },

//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.5,
//       ease: "easeOut",
//     },
//   },
// };

// /* =========================================================
//    FOOTER
// ========================================================= */

// export default function Footer() {
//   return (
//     <footer className="bg-[#07111F] border-t border-white/5 overflow-hidden">
//       <motion.div
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{
//           once: true,
//           margin: "-50px",
//         }}
//         className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
//       >
//         {/* =====================================================
//             MAIN GRID
//         ===================================================== */}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">

//           {/* ===================================================
//               1. BRAND SECTION
//           =================================================== */}

//           <motion.div
//             variants={itemVariants}
//             className="lg:col-span-4 pr-0 lg:pr-6"
//           >
//             {/* Logo */}
//             <div className="flex items-center gap-3 mb-6">
//               <div className="h-10 w-32 sm:h-12 sm:w-40 flex items-center justify-start flex-shrink-0">
//                 <img
//                   src="/images/logo.jpg"
//                   alt="Garud Tata Logo"
//                   className="w-full h-full object-contain object-left"
//                 />
//               </div>

//               <div className="border-l border-white/20 pl-3">
//                 <div
//                   className="font-bold text-white text-base tracking-wide"
//                   style={{
//                     fontFamily: "'Syne', sans-serif",
//                   }}
//                 >
//                   GARUD TATA
//                 </div>

//                 <div className="text-[#1E7FE8] text-[10px] font-medium tracking-wider uppercase">
//                   Authorized Dealer
//                 </div>
//               </div>
//             </div>

//             {/* Description */}
//             <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-sm">
//               Your trusted authorized Tata Motors dealership across Delhi NCR.
//               Professional guidance, complete EV support, and customer-first
//               service.
//             </p>

//             {/* =================================================
//                 SOCIAL MEDIA
//             ================================================= */}

//             <div className="flex gap-3 mb-8">

//               {/* Instagram */}
//               <motion.a
//                 href="https://www.instagram.com/garudtata/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Garud Tata Instagram"
//                 whileHover={{
//                   scale: 1.1,
//                   y: -2,
//                 }}
//                 whileTap={{
//                   scale: 0.95,
//                 }}
//                 className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#0055A5] hover:text-white hover:border-[#0055A5] transition-colors text-xs font-bold"
//               >
//                 IG
//               </motion.a>

//               {/* Facebook */}
//               <motion.a
//                 href="https://www.facebook.com/garudtata"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 aria-label="Garud Tata Facebook"
//                 whileHover={{
//                   scale: 1.1,
//                   y: -2,
//                 }}
//                 whileTap={{
//                   scale: 0.95,
//                 }}
//                 className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#0055A5] hover:text-white hover:border-[#0055A5] transition-colors text-xs font-bold"
//               >
//                 FB
//               </motion.a>

//             </div>

//             {/* =================================================
//                 CONTACT DETAILS
//             ================================================= */}

//             <ul className="space-y-4">

//               {/* Sales Phone */}
//               <li className="flex items-center gap-3 group">
//                 <div className="w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center group-hover:bg-[#1E7FE8]/20 transition-colors">
//                   <Phone
//                     size={14}
//                     className="text-[#1E7FE8]"
//                   />
//                 </div>

//                 <a
//                   href="tel:+919217371211"
//                   className="text-white/60 text-sm group-hover:text-white font-medium transition-colors"
//                 >
//                   Sales: +91 92173 71211
//                 </a>
//               </li>

//               {/* Email */}
//               <li className="flex items-center gap-3 group">
//                 <div className="w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center group-hover:bg-[#1E7FE8]/20 transition-colors">
//                   <Mail
//                     size={14}
//                     className="text-[#1E7FE8]"
//                   />
//                 </div>

//                 <a
//                   href="mailto:garudtatadigital@gmail.com"
//                   className="text-white/60 text-sm group-hover:text-white transition-colors break-all"
//                 >
//                   garudtatadigital@gmail.com
//                 </a>
//               </li>

//             </ul>
//           </motion.div>

//           {/* ===================================================
//               2. NAVIGATION
//           =================================================== */}

//           <motion.div
//             variants={itemVariants}
//             className="lg:col-span-2"
//           >
//             <h4 className="text-white font-semibold text-sm mb-6 uppercase tracking-wider">
//               Navigate
//             </h4>

//             <ul className="space-y-3.5">
//               {navLinks.map((link) => (
//                 <li key={link.label}>
//                   <a
//                     href={link.href}
//                     className="text-white/40 text-sm hover:text-[#1E7FE8] transition-colors flex items-center gap-2 group"
//                   >
//                     <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8]/0 group-hover:bg-[#1E7FE8] transition-all" />

//                     <span className="group-hover:translate-x-1 transition-transform">
//                       {link.label}
//                     </span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* ===================================================
//               3. MODELS
//           =================================================== */}

//           <motion.div
//             variants={itemVariants}
//             className="lg:col-span-2"
//           >
//             <h4 className="text-white font-semibold text-sm mb-6 uppercase tracking-wider">
//               Models
//             </h4>

//             <ul className="space-y-3.5">
//               {models.map((model) => (
//                 <li key={model}>
//                   <a
//                     href="#cars"
//                     className="text-white/40 text-sm hover:text-[#1E7FE8] transition-colors flex items-center gap-2 group"
//                   >
//                     <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8]/0 group-hover:bg-[#1E7FE8] transition-all" />

//                     <span className="group-hover:translate-x-1 transition-transform">
//                       Tata {model}
//                     </span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>

//           {/* ===================================================
//               4. LOCATIONS
//           =================================================== */}

//           <motion.div
//             variants={itemVariants}
//             className="lg:col-span-4"
//           >
//             <h4 className="text-white font-semibold text-sm mb-6 uppercase tracking-wider">
//               Our Locations
//             </h4>

//             <ul className="space-y-5">
//               {locations.map((loc) => (
//                 <li key={loc.name}>
//                   <a
//                     href={loc.maps}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="group block p-3 -mx-3 rounded-xl hover:bg-white/[0.02] transition-colors"
//                   >
//                     <div className="flex items-start gap-3">

//                       {/* Map Icon */}
//                       <div className="mt-0.5 p-1.5 rounded-full bg-white/[0.03] group-hover:bg-[#1E7FE8]/10 transition-colors">
//                         <MapPin
//                           size={15}
//                           className="text-[#1E7FE8] group-hover:-rotate-12 transition-transform"
//                         />
//                       </div>

//                       <div className="flex-1 min-w-0">

//                         {/* Location Name */}
//                         <div className="text-white/80 text-sm font-medium group-hover:text-white transition-colors mb-1">
//                           {loc.name}
//                         </div>

//                         {/* Address */}
//                         <div className="text-white/40 text-[13px] leading-relaxed group-hover:text-white/60 transition-colors line-clamp-2 pr-4">
//                           {loc.address}
//                         </div>

//                         {/* Phone */}
//                         <div className="text-[#1E7FE8]/80 text-[12px] mt-1.5 font-medium group-hover:text-[#1E7FE8] transition-colors flex items-center gap-1.5">
//                           <Phone size={11} />
//                           +91 {loc.phone}
//                         </div>

//                       </div>
//                     </div>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </motion.div>
//         </div>

//         {/* =====================================================
//             BOTTOM BAR
//         ===================================================== */}

//         <motion.div
//           variants={itemVariants}
//           className="pt-8 border-t border-white/10"
//         >
//           <div className="flex flex-col md:flex-row items-center justify-between gap-5">

//             {/* Copyright */}
//             <p className="text-white/30 text-xs text-center md:text-left">
//               © {new Date().getFullYear()} Garud Tata. All Rights Reserved.
//             </p>

//             {/* Legal Links */}
//             <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">

//               {/* Privacy Policy */}
//               <Link
//                 href="/privacy-policy"
//                 className="text-white/40 text-xs hover:text-[#1E7FE8] transition-colors"
//               >
//                 Privacy Policy
//               </Link>

//               <span className="text-white/10">|</span>

//               {/* Contact */}
//               <a
//                 href="#contact"
//                 className="text-white/40 text-xs hover:text-[#1E7FE8] transition-colors"
//               >
//                 Contact Us
//               </a>

//             </div>
//           </div>

//           {/* Disclaimer */}
//           <p className="text-white/20 text-xs text-center max-w-3xl mx-auto mt-5 leading-relaxed">
//             *Prices and specifications are indicative and subject to change.
//             Please contact the showroom for the latest details.
//           </p>
//         </motion.div>
//       </motion.div>
//     </footer>
//   );
// }


















"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const models = [
  "Harrier", "Safari", "Nexon", "Punch",
  "Curvv", "Sierra", "Tiago", "Altroz",
];

const navLinks = [
  { label: "New Cars",   href: "#cars" },
  { label: "Offers",     href: "#offers" },
  { label: "Test Drive", href: "#testdrive" },
  { label: "About Us",   href: "#about" },
  { label: "Gallery",    href: "#gallery" },
  { label: "Contact",    href: "#contact" },
];

/* =========================================================
   COMMON CONTACT NUMBER
========================================================= */

const PHONE_DISPLAY = "+91 92173 71211";
const PHONE_TEL     = "tel:+919217371211";

/* =========================================================
   SHOWROOM & SERVICE LOCATIONS — no individual numbers
========================================================= */

const locations = [
  {
    name: "Palam Showroom",
    address: "Garg Plaza, RZ A70, Dabri–Palam Rd, New Delhi 110045",
    maps: "https://maps.google.com/?q=Garg+Plaza+RZ+A70+Dabri+Palam+Rd+Main+Shiv+Market+Palam+New+Delhi+110045",
  },
  {
    name: "Narela Showroom",
    address: "Khasra No 42/12, Narela, New Delhi 110040",
    maps: "https://maps.google.com/?q=Khasra+No+42%2F12+Narela+New+Delhi+110040",
  },
  {
    name: "Najafgarh Showroom",
    address: "Plot No. 8–11, Najafgarh Rd, Near Sai Baba Mandir, New Delhi 110043",
    maps: "https://maps.google.com/?q=Plot+No+8+to+11+Najafgarh+Rd+Near+Sai+Baba+Mandir+Najafgarh+New+Delhi+110043",
  },
  {
    name: "Dwarka Service Centre",
    address: "Shanti Garden, Matiala Ind. Area, Dwarka, New Delhi 110059",
    maps: "https://maps.google.com/?q=Shanti+Garden+Matiala+Industrial+Area+Dwarka+New+Delhi+110059",
  },
  {
    name: "Najafgarh Service Centre",
    address: "Plot No. 8–11, Main Najafgarh Rd, New Delhi 110043",
    maps: "https://maps.google.com/?q=Plot+No+8+to+11+Main+Najafgarh+Road+Near+Sai+Baba+Mandir+Najafgarh+New+Delhi+110043",
  },
];

/* =========================================================
   FRAMER MOTION VARIANTS
========================================================= */

const containerVariants: Variants = {
  hidden:   { opacity: 0 },
  visible:  { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden:   { opacity: 0, y: 20 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  return (
    <footer className="bg-[#07111F] border-t border-white/5 overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        {/* MAIN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">

          {/* 1. BRAND */}
          <motion.div variants={itemVariants} className="lg:col-span-4 pr-0 lg:pr-6">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-32 sm:h-12 sm:w-40 flex items-center justify-start flex-shrink-0">
                <img
                  src="/images/logo.jpg"
                  alt="Garud Tata Logo"
                  className="w-full h-full object-contain object-left"
                />
              </div>
              <div className="border-l border-white/20 pl-3">
                <div className="font-bold text-white text-base tracking-wide" style={{ fontFamily: "'Syne', sans-serif" }}>
                  GARUD TATA
                </div>
                <div className="text-[#1E7FE8] text-[10px] font-medium tracking-wider uppercase">
                  Authorized Dealer
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-sm">
              Your trusted authorized Tata Motors dealership across Delhi NCR.
              Professional guidance, complete EV support, and customer-first service.
            </p>

            {/* Social */}
            <div className="flex gap-3 mb-8">
              <motion.a
                href="https://www.instagram.com/garudtata/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Garud Tata Instagram"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#0055A5] hover:text-white hover:border-[#0055A5] transition-colors text-xs font-bold"
              >
                IG
              </motion.a>
              <motion.a
                href="https://www.facebook.com/garudtata"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Garud Tata Facebook"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-white/50 hover:bg-[#0055A5] hover:text-white hover:border-[#0055A5] transition-colors text-xs font-bold"
              >
                FB
              </motion.a>
            </div>

            {/* Contact details — single number only */}
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center group-hover:bg-[#1E7FE8]/20 transition-colors">
                  <Phone size={14} className="text-[#1E7FE8]" />
                </div>
                <a
                  href={PHONE_TEL}
                  className="text-white/60 text-sm group-hover:text-white font-medium transition-colors"
                >
                  Sales: {PHONE_DISPLAY}
                </a>
              </li>

              <li className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-full bg-white/[0.03] flex items-center justify-center group-hover:bg-[#1E7FE8]/20 transition-colors">
                  <Mail size={14} className="text-[#1E7FE8]" />
                </div>
                <a
                  href="mailto:garudtatadigital@gmail.com"
                  className="text-white/60 text-sm group-hover:text-white transition-colors break-all"
                >
                  garudtatadigital@gmail.com
                </a>
              </li>
            </ul>
          </motion.div>

          {/* 2. NAVIGATION */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm mb-6 uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-3.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/40 text-sm hover:text-[#1E7FE8] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8]/0 group-hover:bg-[#1E7FE8] transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 3. MODELS */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm mb-6 uppercase tracking-wider">Models</h4>
            <ul className="space-y-3.5">
              {models.map((model) => (
                <li key={model}>
                  <a
                    href="#cars"
                    className="text-white/40 text-sm hover:text-[#1E7FE8] transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E7FE8]/0 group-hover:bg-[#1E7FE8] transition-all" />
                    <span className="group-hover:translate-x-1 transition-transform">Tata {model}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 4. LOCATIONS — address + map link only, no per-location phone */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <h4 className="text-white font-semibold text-sm mb-6 uppercase tracking-wider">Our Locations</h4>
            <ul className="space-y-5">
              {locations.map((loc) => (
                <li key={loc.name}>
                  <a
                    href={loc.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block p-3 -mx-3 rounded-xl hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 p-1.5 rounded-full bg-white/[0.03] group-hover:bg-[#1E7FE8]/10 transition-colors">
                        <MapPin size={15} className="text-[#1E7FE8] group-hover:-rotate-12 transition-transform" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-white/80 text-sm font-medium group-hover:text-white transition-colors mb-1">
                          {loc.name}
                        </div>
                        <div className="text-white/40 text-[13px] leading-relaxed group-hover:text-white/60 transition-colors line-clamp-2 pr-4">
                          {loc.address}
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>

            {/* Single shared contact number at the bottom of locations */}
            <div className="mt-6 flex items-center gap-2 text-[#1E7FE8]/80 text-[13px] font-medium">
              <Phone size={13} />
              <a href={PHONE_TEL} className="hover:text-[#1E7FE8] transition-colors">
                {PHONE_DISPLAY} (all locations)
              </a>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM BAR */}
        <motion.div variants={itemVariants} className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5">
            <p className="text-white/30 text-xs text-center md:text-left">
              © {new Date().getFullYear()} Garud Tata. All Rights Reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
              <Link href="/privacy-policy" className="text-white/40 text-xs hover:text-[#1E7FE8] transition-colors">
                Privacy Policy
              </Link>
              <span className="text-white/10">|</span>
              <a href="#contact" className="text-white/40 text-xs hover:text-[#1E7FE8] transition-colors">
                Contact Us
              </a>
            </div>
          </div>
          <p className="text-white/20 text-xs text-center max-w-3xl mx-auto mt-5 leading-relaxed">
            *Prices and specifications are indicative and subject to change.
            Please contact the showroom for the latest details.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
}