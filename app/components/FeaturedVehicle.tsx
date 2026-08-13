// "use client";
// import { useRef } from "react";
// import { motion, useInView, useScroll, useTransform } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// const specs = [
//   { label: "Engine", value: "1.5L Turbo" },
//   { label: "Power", value: "170 bhp" },
//   { label: "Torque", value: "280 Nm" },
//   { label: "0-100", value: "9.2s" },
// ];

// export default function FeaturedVehicle() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
//   const imgX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

//   return (
//     <section ref={ref} className="relative bg-[#080B10] py-20 lg:py-32 overflow-hidden">
//       {/* Background texture */}
//       <div className="absolute inset-0">
//         <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0055A5] to-transparent opacity-60" />
//         <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0055A5] to-transparent opacity-60" />
//       </div>

//       {/* SIERRA watermark */}
//       <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
//         <span className="text-[20vw] font-black text-white/[0.02] tracking-tighter whitespace-nowrap" style={{ fontFamily: "'Syne', sans-serif" }}>
//           SIERRA
//         </span>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Text */}
//           <div>
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               className="mb-3"
//             >
//               <span className="text-[#1E7FE8] text-xs font-bold uppercase tracking-[0.3em]">Flagship Model</span>
//             </motion.div>
//             <motion.h2
//               initial={{ opacity: 0, y: 40 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.1 }}
//               className="text-5xl lg:text-7xl font-black text-white mb-6 leading-[0.9]"
//               style={{ fontFamily: "'Syne', sans-serif" }}
//             >
//               THE NEW<br />
//               <span className="gradient-text">TATA</span><br />
//               SIERRA
//             </motion.h2>
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={inView ? { opacity: 1 } : {}}
//               transition={{ delay: 0.25 }}
//               className="text-white/50 text-lg leading-relaxed mb-8 max-w-md"
//             >
//               Escape Ordinary. A bold new expression of adventure, technology and unmistakable Tata design — reborn for the next generation.
//             </motion.p>

//             {/* Specs */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.35 }}
//               className="grid grid-cols-4 gap-4 mb-10 p-5 rounded-2xl border border-white/5 bg-white/[0.02]"
//             >
//               {specs.map((s) => (
//                 <div key={s.label} className="text-center">
//                   <div className="text-white font-bold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>{s.value}</div>
//                   <div className="text-white/30 text-xs uppercase tracking-wider mt-0.5">{s.label}</div>
//                 </div>
//               ))}
//             </motion.div>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={inView ? { opacity: 1, y: 0 } : {}}
//               transition={{ delay: 0.45 }}
//               className="flex gap-4 flex-wrap"
//             >
//               <a href="#cars" className="group flex items-center gap-2 px-7 py-3.5 bg-[#0055A5] rounded-full text-white font-semibold hover:bg-[#1E7FE8] transition-all hover:shadow-xl hover:shadow-blue-500/30">
//                 Explore Sierra
//                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//               </a>
//               <a href="#testdrive" className="px-7 py-3.5 border border-white/15 rounded-full text-white/80 font-semibold hover:bg-white/5 transition-all">
//                 Book Test Drive
//               </a>
//             </motion.div>
//           </div>

//           {/* Car image */}
//           <motion.div
//             style={{ x: imgX }}
//             className="relative"
//           >
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={inView ? { opacity: 1, scale: 1 } : {}}
//               transition={{ duration: 0.8, delay: 0.2 }}
//               className="relative"
//             >
//               {/* Glow */}
//               <div className="absolute inset-0 bg-[#0055A5]/20 blur-3xl rounded-full transform scale-75" />
//               <img
//                 src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&q=85"
//                 alt="Tata Sierra"
//                 className="w-full h-auto rounded-2xl object-cover relative z-10"
//               />
//             </motion.div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }















"use client";
import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const specs = [
  { label: "Engine", value: "1.5L Turbo" },
  { label: "Power", value: "170 bhp" },
  { label: "Torque", value: "280 Nm" },
  { label: "0-100", value: "9.2s" },
];

export default function FeaturedVehicle() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgX = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
    <section ref={ref} className="relative bg-[#080B10] py-20 lg:py-32 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0055A5] to-transparent opacity-60" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#0055A5] to-transparent opacity-60" />
      </div>

      {/* SIERRA watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-black text-white/[0.02] tracking-tighter whitespace-nowrap" style={{ fontFamily: "'Syne', sans-serif" }}>
          SIERRA
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              className="mb-3"
            >
              <span className="text-[#1E7FE8] text-xs font-bold uppercase tracking-[0.3em]">Flagship Model</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black text-white mb-6 leading-[0.9]"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              THE NEW<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055A5] to-[#1E7FE8]">TATA</span><br />
              SIERRA
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.25 }}
              className="text-white/50 text-lg leading-relaxed mb-8 max-w-md"
            >
              Escape Ordinary. A bold new expression of adventure, technology and unmistakable Tata design — reborn for the next generation.
            </motion.p>

            {/* Specs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
              className="grid grid-cols-4 gap-4 mb-10 p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
            >
              {specs.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-white font-bold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>{s.value}</div>
                  <div className="text-white/30 text-xs uppercase tracking-wider mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.45 }}
              className="flex gap-4 flex-wrap"
            >
              <a href="#cars" className="group flex items-center gap-2 px-7 py-3.5 bg-[#0055A5] rounded-full text-white font-semibold hover:bg-[#1E7FE8] transition-all hover:shadow-[0_0_20px_rgba(0,85,165,0.4)]">
                Explore Sierra
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#testdrive" className="px-7 py-3.5 border border-white/15 rounded-full text-white/80 font-semibold hover:bg-white/5 hover:text-white transition-all">
                Book Test Drive
              </a>
            </motion.div>
          </div>

          {/* Car image (Studio Presentation) */}
          <motion.div
            style={{ x: imgX }}
            className="relative w-full aspect-[4/3] lg:aspect-auto lg:h-[600px] flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {/* Cinematic Glow Behind Car */}
              <div className="absolute inset-0 bg-[#0055A5]/20 blur-[100px] rounded-full transform scale-75" />
              
              {/* Artificial Ground Shadow for Transparent WebP */}
              <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[80%] h-[30px] bg-black/80 blur-[20px] rounded-[100%]" />
              <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[50%] h-[15px] bg-[#0055A5]/40 blur-[25px] rounded-[100%]" />

              <Image
                src="/images/vehicles/sierra.webp"
                alt="Tata Sierra Flagship Model"
                fill
                className="object-contain relative z-10 drop-shadow-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}