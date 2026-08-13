













"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  Volume2, 
  VolumeX,
  Phone,
  MapPin,
  Car,
  Calendar
} from "lucide-react";

export default function CinematicHero() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => setIsMuted(!isMuted);
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Ensure video plays on load even in strict browser environments
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((e) => console.log("Autoplay prevented:", e));
    }
  }, []);

  // Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

  return (
    <section className="relative w-full h-[100vh] min-h-[600px] overflow-hidden bg-[#050505] font-sans">
      
      {/* 1. VIDEO BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="/video/vidssave.com Sierra _ Glimpse 2 _ The Legend Returns 720P.mp4"
          poster="/images/tata-fallback.jpg" // Add a fallback image in your public folder
          autoPlay
          muted={isMuted}
          loop
          playsInline
          className="w-full h-full object-cover object-[70%_center]"
        />
      </div>

      {/* 2. CINEMATIC OVERLAYS */}
      {/* Film Grain */}
      <div 
        className="absolute inset-0 z-[1] opacity-20 pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      
      {/* Gradients & Vignette */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-black/90 via-black/50 to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
      
      {/* Soft Blue Ambient Glow */}
      <div className="absolute top-1/4 left-0 w-[50vw] h-[50vh] bg-[#0055A5]/15 blur-[120px] rounded-full pointer-events-none z-[2]" />

      {/* 3. MAIN HERO CONTENT */}
      <div className="absolute inset-0 z-10 flex flex-col justify-center pl-[8%] pr-6 sm:pr-8 pt-20">
        <div className="max-w-[700px]">
          
          {/* Eyebrow */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-xs sm:text-sm font-semibold text-white tracking-[0.2em] uppercase">
              GARUD TATA
            </span>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="h-[2px] bg-[#0055A5]"
            />
          </motion.div>

          {/* Headline */}
          <div className="mb-6">
            <motion.div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="text-[clamp(3rem,7vw,8rem)] font-bold text-white leading-[0.95] tracking-tighter"
              >
                DRIVE YOUR
              </motion.h1>
            </motion.div>
            <motion.div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-[clamp(3rem,7vw,8rem)] font-bold text-white leading-[0.95] tracking-tighter"
              >
                NEXT CHAPTER.
              </motion.h1>
            </motion.div>
          </div>

          {/* Description */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.3 }}
            className="text-gray-300 text-base sm:text-lg max-w-[520px] mb-10 leading-relaxed font-light"
          >
            Experience the confidence, technology and performance of Tata Motors at Garud Tata.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <a
              href="#explore"
              className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-[#0055A5] text-white font-medium rounded-md overflow-hidden hover:shadow-[0_0_25px_rgba(0,85,165,0.4)] transition-all duration-300"
            >
              <span className="relative z-10">EXPLORE CARS</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </a>

            <a
              href="#test-drive"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/30 text-white font-medium rounded-md hover:-translate-y-1 hover:bg-white/10 hover:border-white/60 transition-all duration-300"
            >
              BOOK A TEST DRIVE
              <ArrowRight size={18} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
            </a>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 text-xs sm:text-sm text-white/70"
          >
            <div className="flex items-center gap-2 font-medium text-white/90">
              <CheckCircle2 size={16} className="text-[#0055A5]" />
              AUTHORIZED TATA MOTORS DEALER
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/20" />
            <div className="flex items-center gap-4">
              <span>15+ Years of Trust</span>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span>5000+ Happy Customers</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4. FLOATING BOTTOM NAVIGATION */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="fixed sm:absolute bottom-0 sm:bottom-8 left-0 sm:left-1/2 sm:-translate-x-1/2 w-full sm:w-auto z-40"
      >
        <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-6 px-4 sm:px-8 py-3 sm:py-4 bg-black/40 sm:bg-white/5 backdrop-blur-xl sm:border border-white/10 sm:rounded-2xl">
          {[
            { icon: Car, label: "Cars", href: "#cars" },
            { icon: Calendar, label: "Test Drive", href: "#test-drive" },
            { icon: Phone, label: "Call Us", href: "tel:+1234567890" },
            { icon: MapPin, label: "Location", href: "#location" },
          ].map((item, i) => (
            <a 
              key={i} 
              href={item.href}
              className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-white/70 hover:text-white transition-colors p-2 sm:p-0"
            >
              <item.icon size={18} strokeWidth={1.5} />
              <span className="text-[10px] sm:text-sm font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </motion.div>

      {/* 5. VIDEO CONTROLS */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-24 sm:bottom-12 right-6 sm:right-12 z-30 flex items-center gap-4"
      >
        <button 
          onClick={togglePlay}
          className="flex items-center gap-2 text-xs font-medium tracking-widest text-white/60 hover:text-white transition-colors uppercase"
        >
          <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-white/40'}`} />
          {isPlaying ? 'Playing' : 'Paused'}
        </button>
        <div className="w-px h-4 bg-white/20" />
        <button 
          onClick={toggleMute}
          className="text-white/60 hover:text-white transition-colors p-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </motion.div>

      {/* 6. SCROLL INDICATOR */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-28 sm:bottom-12 left-[8%] z-30 hidden sm:flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/50" style={{ writingMode: 'vertical-rl' }}>
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
          />
        </div>
      </motion.div>

    </section>
  );
}