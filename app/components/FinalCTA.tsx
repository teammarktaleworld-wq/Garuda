// "use client";
// import { useRef } from "react";
// import { motion, useInView } from "framer-motion";
// import { ArrowRight } from "lucide-react";

// export default function FinalCTA() {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });

//   return (
//     <section className="relative py-28 lg:py-40 overflow-hidden">
//       <div className="absolute inset-0">
//         <img
//           src="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1920&q=80"
//           alt="Tata Safari"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-b from-[#080B10]/70 via-[#07111F]/80 to-[#080B10]" />
//       </div>

//       <div ref={ref} className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
//         <motion.h2
//           initial={{ opacity: 0, y: 40 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ duration: 0.8 }}
//           className="text-5xl lg:text-7xl font-black text-white mb-6"
//           style={{ fontFamily: "'Syne', sans-serif", lineHeight: 0.95 }}
//         >
//           Your Next Drive<br />
//           <span className="gradient-text">Starts Here.</span>
//         </motion.h2>
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={inView ? { opacity: 1 } : {}}
//           transition={{ delay: 0.3 }}
//           className="text-white/50 text-lg mb-10"
//         >
//           Explore the Tata Motors range at Garud Tata, Palam, New Delhi.
//         </motion.p>
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={inView ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 0.4 }}
//           className="flex gap-4 justify-center flex-wrap"
//         >
//           <a href="#cars" className="group flex items-center gap-2 px-8 py-4 bg-[#0055A5] rounded-full text-white font-bold text-sm hover:bg-[#1E7FE8] transition-all hover:shadow-2xl hover:shadow-blue-500/30">
//             Explore Cars
//             <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//           </a>
//           <a href="#testdrive" className="px-8 py-4 border border-white/20 rounded-full text-white font-semibold text-sm hover:bg-white/5 hover:border-white/40 transition-all backdrop-blur-sm">
//             Book Test Drive
//           </a>
//         </motion.div>
//       </div>
//     </section>
//   );
// }
















"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function FinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-28 lg:py-40 overflow-hidden bg-[#050A12] font-sans">
      
      {/* Background Dark Studio Lighting & Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-[#0055A5]/15 blur-[160px] rounded-full mix-blend-screen" />
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '4rem 4rem' }} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080B10] via-[#050A12]/80 to-[#080B10]" />
      </div>

      {/* Featured Tata Sierra Background Vehicle Stage */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none overflow-hidden">
        <div className="relative w-full max-w-5xl h-[450px]">
          {/* Shadow Grounding Effect */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-[30px] bg-black/90 blur-[25px] rounded-[100%]" />
          <Image
            src="/images/vehicles/sierra.webp"
            alt="Tata Sierra"
            fill
            className="object-contain scale-125 lg:scale-150 drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#0055A5] animate-pulse" />
          <span className="text-xs font-semibold text-white/80 tracking-widest uppercase">
            GARUD TATA EXPERIENCE
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-[0.95]"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Your Next Drive<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0055A5] via-[#1E7FE8] to-white">
            Starts Here.
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="text-white/60 text-base lg:text-lg mb-10 max-w-xl mx-auto font-light leading-relaxed"
        >
          Explore the revolutionary Tata Sierra and the complete Tata Motors portfolio at Garud Tata.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <a
            href="#cars"
            className="group flex items-center gap-2 px-8 py-4 bg-[#0055A5] rounded-full text-white font-semibold text-sm hover:bg-[#1E7FE8] transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,85,165,0.5)]"
          >
            Explore Cars
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="#testdrive"
            className="px-8 py-4 border border-white/20 rounded-full text-white font-semibold text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-300 backdrop-blur-md"
          >
            Book Test Drive
          </a>
        </motion.div>

      </div>
    </section>
  );
}