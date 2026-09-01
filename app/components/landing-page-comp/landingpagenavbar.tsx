
// // garud-tata\app\components\landing-page-comp\landingpagenavbar.tsx

// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { Phone, Menu, X, MessageCircle } from "lucide-react";

// const BRAND = "#1c39ff";

// const NAV_LINKS = [
//   { label: "Home", href: "/" },
//   { label: "Offers", href: "#offer-form" },
//   { label: "Showrooms", href: "#showrooms" },
//   { label: "Service", href: "#showrooms" },
//   { label: "Contact", href: "/contact" },
// ];

// const DISPLAY_PHONE = "+91 92173 71211";
// const RAW_PHONE = "919217371211";

// const WHATSAPP_MSG = encodeURIComponent(
//   "Hello! I'd like to enquire about a new Tata car at Garud Tata."
// );

// function pushGTM(event: "call_click" | "whatsapp_click") {
//   if (typeof window === "undefined") return;

//   const dataLayer = ((window as typeof window & {
//     dataLayer?: Record<string, unknown>[];
//   }).dataLayer ||= []);

//   dataLayer.push({ event });
// }

// export interface CampaignNavbarProps {
//   phone?: string;
//   logoSrc?: string;
//   offerSectionId?: string;
// }

// export default function CampaignNavbar({
//   phone = RAW_PHONE,
//   logoSrc = "/images/logo.jpg",
//   offerSectionId = "offer-form",
// }: CampaignNavbarProps) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const rawPhone = phone.replace(/\D/g, "") || RAW_PHONE;
//   const telHref = `tel:+${rawPhone}`;
//   const waHref = `https://wa.me/${rawPhone}?text=${WHATSAPP_MSG}`;

//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [active, setActive] = useState("/");

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 40);
//     };

//     handleScroll();

//     window.addEventListener("scroll", handleScroll, { passive: true });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     setActive(pathname);
//   }, [pathname]);

//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [menuOpen]);

//   const navigate = useCallback(
//     (href: string) => {
//       setMenuOpen(false);

//       if (href.startsWith("/")) {
//         setActive(href);
//         router.push(href);
//         return;
//       }

//       const id =
//         href === "#offer-form"
//           ? offerSectionId
//           : href.replace("#", "");

//       const element = document.getElementById(id);

//       if (element) {
//         element.scrollIntoView({
//           behavior: "smooth",
//           block: "start",
//         });
//       }

//       window.history.pushState(null, "", href);
//       setActive(href);
//     },
//     [router, offerSectionId]
//   );

//   const handleCallClick = useCallback(
//     (event: React.MouseEvent<HTMLAnchorElement>) => {
//       event.preventDefault();
//       pushGTM("call_click");
//       window.location.href = telHref;
//     },
//     [telHref]
//   );

//   const handleWhatsAppClick = useCallback(() => {
//     pushGTM("whatsapp_click");
//   }, []);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

//         .gt-nav,
//         .gt-nav * {
//           font-family: 'Inter', sans-serif;
//           box-sizing: border-box;
//         }
//       `}</style>

//       {/* Desktop / Main Navbar */}
//       <nav
//         className="gt-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300"
//         style={{
//           background: BRAND,
//           height: scrolled ? 56 : 68,
//           boxShadow: scrolled
//             ? "0 2px 12px rgba(28,57,255,0.25)"
//             : "none",
//         }}
//       >
//         <div
//           className="mx-auto px-5 lg:px-10 h-full flex items-center justify-between"
//           style={{ maxWidth: 1400 }}
//         >
//           {/* Logo */}
//           <a
//             href="/"
//             onClick={(event) => {
//               event.preventDefault();
//               navigate("/");
//             }}
//             className="flex items-center gap-2.5 flex-shrink-0"
//             aria-label="Garud Tata home"
//           >
//             <img
//               src="/images/Navbar/tata logo.svg"
//               alt="Tata"
//               width={36}
//               height={36}
//               className="object-contain flex-shrink-0"
//             />

//             <img
//               src={logoSrc}
//               alt="Garud Tata"
//               className="object-contain"
//               style={{
//                 height: scrolled ? 44 : 54,
//                 width: "auto",
//                 transition: "height 0.3s",
//               }}
//             />
//           </a>

//           {/* Desktop Navigation */}
//           <div className="hidden lg:flex items-center gap-7">
//             {NAV_LINKS.map((link) => {
//               const isActive = active === link.href;

//               return (
//                 <a
//                   key={link.label}
//                   href={link.href}
//                   onClick={(event) => {
//                     event.preventDefault();
//                     navigate(link.href);
//                   }}
//                   className="text-[13.5px] font-medium transition-opacity duration-150 relative"
//                   style={{
//                     color: "#fff",
//                     opacity: isActive ? 1 : 0.72,
//                   }}
//                 >
//                   {link.label}

//                   {isActive && (
//                     <span
//                       className="absolute left-0 right-0 rounded-full"
//                       style={{
//                         bottom: -3,
//                         height: 2,
//                         background: "#fff",
//                       }}
//                     />
//                   )}
//                 </a>
//               );
//             })}
//           </div>

//           {/* Desktop Actions */}
//           <div className="hidden lg:flex items-center gap-3">
//             <a
//               href={telHref}
//               onClick={handleCallClick}
//               className="flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-90"
//               style={{
//                 color: "rgba(255,255,255,0.85)",
//               }}
//               aria-label={`Call Garud Tata at ${DISPLAY_PHONE}`}
//             >
//               <Phone
//                 size={13}
//                 strokeWidth={2.5}
//                 style={{ color: "#fff" }}
//               />
//               {DISPLAY_PHONE}
//             </a>

//             <a
//               href={waHref}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={handleWhatsAppClick}
//               className="flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-semibold text-white rounded-full transition-opacity hover:opacity-90"
//               style={{
//                 background: "#25D366",
//               }}
//               aria-label="WhatsApp Garud Tata"
//             >
//               <MessageCircle size={13} strokeWidth={2.5} />
//               WhatsApp
//             </a>
//           </div>

//           {/* Mobile Right Controls */}
//           <div className="flex lg:hidden items-center gap-2">
//             <a
//               href={waHref}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={handleWhatsAppClick}
//               className="p-2 rounded-full text-white"
//               style={{
//                 background: "#25D366",
//               }}
//               aria-label="WhatsApp"
//             >
//               <MessageCircle size={17} strokeWidth={2} />
//             </a>

//             <a
//               href={telHref}
//               onClick={handleCallClick}
//               className="p-2 rounded-full text-white"
//               style={{
//                 background: "rgba(255,255,255,0.18)",
//               }}
//               aria-label="Call"
//             >
//               <Phone size={17} strokeWidth={2} />
//             </a>

//             <button
//               type="button"
//               onClick={() => setMenuOpen(true)}
//               className="p-2 rounded-full text-white"
//               style={{
//                 background: "rgba(255,255,255,0.18)",
//               }}
//               aria-label="Open menu"
//             >
//               <Menu size={19} strokeWidth={2} />
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Fullscreen Menu */}
//       {menuOpen && (
//         <div
//           className="gt-nav fixed inset-0 z-[80] flex flex-col lg:hidden"
//           style={{
//             background: BRAND,
//           }}
//         >
//           {/* Mobile Menu Header */}
//           <div
//             className="flex items-center justify-between px-5 flex-shrink-0"
//             style={{
//               height: 64,
//               borderBottom: "1px solid rgba(255,255,255,0.14)",
//             }}
//           >
//             <a
//               href="/"
//               onClick={(event) => {
//                 event.preventDefault();
//                 navigate("/");
//               }}
//               className="flex items-center gap-2.5"
//               aria-label="Garud Tata home"
//             >
//               <img
//                 src="/images/Navbar/tata logo.svg"
//                 alt="Tata"
//                 width={28}
//                 height={28}
//                 className="object-contain flex-shrink-0"
//               />

//               <img
//                 src={logoSrc}
//                 alt="Garud Tata"
//                 style={{
//                   height: 48,
//                   width: "auto",
//                 }}
//                 className="object-contain"
//               />
//             </a>

//             <button
//               type="button"
//               onClick={() => setMenuOpen(false)}
//               className="p-2 rounded-full text-white"
//               style={{
//                 background: "rgba(255,255,255,0.18)",
//               }}
//               aria-label="Close menu"
//             >
//               <X size={19} strokeWidth={2} />
//             </button>
//           </div>

//           {/* Mobile Navigation Links */}
//           <nav className="flex-1 flex flex-col justify-center px-7">
//             {NAV_LINKS.map((link) => {
//               const isActive = active === link.href;

//               return (
//                 <a
//                   key={link.label}
//                   href={link.href}
//                   onClick={(event) => {
//                     event.preventDefault();
//                     navigate(link.href);
//                   }}
//                   className="flex items-center justify-between py-[18px]"
//                   style={{
//                     borderBottom:
//                       "1px solid rgba(255,255,255,0.1)",
//                   }}
//                 >
//                   <span
//                     className="text-[1.65rem] font-bold tracking-tight"
//                     style={{
//                       color: "#fff",
//                       opacity: isActive ? 1 : 0.6,
//                     }}
//                   >
//                     {link.label}
//                   </span>

//                   {isActive && (
//                     <span
//                       className="w-2 h-2 rounded-full flex-shrink-0"
//                       style={{
//                         background: "#fff",
//                       }}
//                     />
//                   )}
//                 </a>
//               );
//             })}
//           </nav>

//           {/* Mobile Menu Actions */}
//           <div
//             className="p-5 flex flex-col gap-3"
//             style={{
//               paddingBottom:
//                 "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
//             }}
//           >
//             <a
//               href={telHref}
//               onClick={handleCallClick}
//               className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-semibold text-white"
//               style={{
//                 border: "1.5px solid rgba(255,255,255,0.4)",
//               }}
//             >
//               <Phone size={15} strokeWidth={2.5} />
//               {DISPLAY_PHONE}
//             </a>

//             <a
//               href={waHref}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={handleWhatsAppClick}
//               className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-semibold text-white"
//               style={{
//                 background: "#25D366",
//               }}
//             >
//               <MessageCircle size={15} strokeWidth={2} />
//               WhatsApp enquiry
//             </a>
//           </div>
//         </div>
//       )}

//       {/* Mobile Bottom Bar */}
//       <div
//         className="gt-nav fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
//         style={{
//           background: BRAND,
//           paddingBottom:
//             "env(safe-area-inset-bottom, 0px)",
//           borderTop:
//             "1px solid rgba(255,255,255,0.15)",
//         }}
//       >
//         <div className="grid grid-cols-2 h-[54px]">
//           <a
//             href={telHref}
//             onClick={handleCallClick}
//             className="flex flex-col items-center justify-center gap-1 text-white active:opacity-70"
//             style={{
//               borderRight:
//                 "1px solid rgba(255,255,255,0.18)",
//             }}
//           >
//             <Phone size={18} strokeWidth={2} />

//             <span
//               style={{
//                 fontSize: 9,
//                 fontWeight: 700,
//                 letterSpacing: "0.05em",
//               }}
//             >
//               Call Sales
//             </span>
//           </a>

//           <a
//             href={waHref}
//             target="_blank"
//             rel="noopener noreferrer"
//             onClick={handleWhatsAppClick}
//             className="flex flex-col items-center justify-center gap-1 text-white active:opacity-70"
//           >
//             <MessageCircle size={18} strokeWidth={2} />

//             <span
//               style={{
//                 fontSize: 9,
//                 fontWeight: 700,
//                 letterSpacing: "0.05em",
//               }}
//             >
//               WhatsApp
//             </span>
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }


















// // garud-tata\app\components\landing-page-comp\landingpagenavbar.tsx

// "use client";

// import {
//   useState,
//   useEffect,
//   useCallback,
//   type MouseEvent,
// } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import {
//   Phone,
//   Menu,
//   X,
//   MessageCircle,
//   Copy,
//   Check,
// } from "lucide-react";

// const BRAND = "#1c39ff";

// const NAV_LINKS = [
//   { label: "Home", href: "/" },
//   { label: "Contact", href: "#contact" },
// ];

// const DISPLAY_PHONE = "+91 92173 71211";
// const RAW_PHONE = "919217371211";

// const WHATSAPP_MSG = encodeURIComponent(
//   "Hello! I'd like to enquire about a new Tata car at Garud Tata."
// );

// function pushGTM(
//   event: "call_click" | "whatsapp_click" | "copy_phone"
// ) {
//   if (typeof window === "undefined") return;

//   const dataLayer =
//     (
//       window as typeof window & {
//         dataLayer?: Record<string, unknown>[];
//       }
//     ).dataLayer || [];

//   dataLayer.push({ event });

//   (
//     window as typeof window & {
//       dataLayer?: Record<string, unknown>[];
//     }
//   ).dataLayer = dataLayer;
// }

// export interface CampaignNavbarProps {
//   phone?: string;
//   logoSrc?: string;
// }

// export default function CampaignNavbar({
//   phone = RAW_PHONE,
//   logoSrc = "/images/logo.jpg",
// }: CampaignNavbarProps) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const rawPhone = phone.replace(/\D/g, "") || RAW_PHONE;

//   const telHref = `tel:+${rawPhone}`;

//   const waHref = `https://wa.me/${rawPhone}?text=${WHATSAPP_MSG}`;

//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [active, setActive] = useState("/");
//   const [copied, setCopied] = useState(false);

//   /* ----------------------------------------
//      Scroll detection
//   ---------------------------------------- */
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 40);
//     };

//     handleScroll();

//     window.addEventListener("scroll", handleScroll, {
//       passive: true,
//     });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   /* ----------------------------------------
//      Active route
//   ---------------------------------------- */
//   useEffect(() => {
//     setActive(pathname);
//   }, [pathname]);

//   /* ----------------------------------------
//      Prevent background scroll when menu open
//   ---------------------------------------- */
//   useEffect(() => {
//     document.body.style.overflow = menuOpen ? "hidden" : "";

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [menuOpen]);

//   /* ----------------------------------------
//      Navigation
//   ---------------------------------------- */
//   const navigate = useCallback(
//     (href: string) => {
//       setMenuOpen(false);

//       // Home
//       if (href === "/") {
//         setActive("/");
//         router.push("/");
//         return;
//       }

//       // Anchor links
//       if (href.startsWith("#")) {
//         const id = href.replace("#", "");

//         const element = document.getElementById(id);

//         if (element) {
//           element.scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           });
//         }

//         window.history.pushState(null, "", href);
//         setActive(href);

//         return;
//       }

//       // Other pages
//       setActive(href);
//       router.push(href);
//     },
//     [router]
//   );

//   /* ----------------------------------------
//      Call tracking
//   ---------------------------------------- */
//   const handleCallClick = useCallback(
//     (e: MouseEvent<HTMLAnchorElement>) => {
//       e.preventDefault();

//       pushGTM("call_click");

//       window.location.href = telHref;
//     },
//     [telHref]
//   );

//   /* ----------------------------------------
//      WhatsApp tracking
//   ---------------------------------------- */
//   const handleWhatsAppClick = useCallback(() => {
//     pushGTM("whatsapp_click");
//   }, []);

//   /* ----------------------------------------
//      Copy phone number
//   ---------------------------------------- */
//   const handleCopyPhone = useCallback(
//     async (e: MouseEvent<HTMLButtonElement>) => {
//       e.preventDefault();

//       try {
//         await navigator.clipboard.writeText(DISPLAY_PHONE);

//         setCopied(true);

//         pushGTM("copy_phone");

//         setTimeout(() => {
//           setCopied(false);
//         }, 2000);
//       } catch (error) {
//         console.error("Failed to copy phone number:", error);
//       }
//     },
//     []
//   );

//   return (
//     <>
//       {/* ----------------------------------------
//           Styles
//       ---------------------------------------- */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

//         .gt-nav,
//         .gt-nav * {
//           font-family: 'Inter', sans-serif;
//           box-sizing: border-box;
//         }

//         /* Force Tata SVG to WHITE */
//         .tata-logo-white {
//           filter: brightness(0) invert(1);
//         }
//       `}</style>

//       {/* ========================================
//           MAIN NAVBAR
//       ======================================== */}
//       <nav
//         className="gt-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300"
//         style={{
//           background: BRAND,
//           height: scrolled ? 56 : 68,
//           boxShadow: scrolled
//             ? "0 2px 12px rgba(28,57,255,0.25)"
//             : "none",
//         }}
//       >
//         <div
//           className="mx-auto px-5 lg:px-10 h-full flex items-center justify-between"
//           style={{
//             maxWidth: 1400,
//           }}
//         >
//           {/* ========================================
//               LOGO
//           ======================================== */}
//           <a
//             href="/"
//             onClick={(e) => {
//               e.preventDefault();
//               navigate("/");
//             }}
//             className="flex items-center gap-2.5 flex-shrink-0"
//             aria-label="Garud Tata home"
//           >
//             {/* WHITE TATA LOGO */}
//             <img
//               src="/images/Navbar/tata logo.svg"
//               alt="Tata"
//               width={36}
//               height={36}
//               className="object-contain flex-shrink-0 tata-logo-white"
//             />

//             {/* GARUD TATA LOGO */}
//             <img
//               src={logoSrc}
//               alt="Garud Tata"
//               className="object-contain"
//               style={{
//                 height: scrolled ? 44 : 54,
//                 width: "auto",
//                 transition: "height 0.3s",
//               }}
//             />
//           </a>

//           {/* ========================================
//               DESKTOP NAV LINKS
//           ======================================== */}
//           <div className="hidden lg:flex items-center gap-7">
//             {NAV_LINKS.map((link) => {
//               const isActive = active === link.href;

//               return (
//                 <a
//                   key={link.label}
//                   href={link.href}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     navigate(link.href);
//                   }}
//                   className="text-[13.5px] font-medium transition-opacity duration-150 relative"
//                   style={{
//                     color: "#fff",
//                     opacity: isActive ? 1 : 0.72,
//                   }}
//                 >
//                   {link.label}

//                   {isActive && (
//                     <span
//                       className="absolute left-0 right-0 rounded-full"
//                       style={{
//                         bottom: -3,
//                         height: 2,
//                         background: "#fff",
//                       }}
//                     />
//                   )}
//                 </a>
//               );
//             })}
//           </div>

//           {/* ========================================
//               DESKTOP ACTIONS
//           ======================================== */}
//           <div className="hidden lg:flex items-center gap-3">
//             {/* PHONE + COPY */}
//             <div className="flex items-center gap-1.5">
//               <a
//                 href={telHref}
//                 onClick={handleCallClick}
//                 className="flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-90"
//                 style={{
//                   color: "rgba(255,255,255,0.85)",
//                 }}
//                 aria-label={`Call Garud Tata at ${DISPLAY_PHONE}`}
//               >
//                 <Phone
//                   size={13}
//                   strokeWidth={2.5}
//                   style={{
//                     color: "#fff",
//                   }}
//                 />

//                 {DISPLAY_PHONE}
//               </a>

//               <button
//                 type="button"
//                 onClick={handleCopyPhone}
//                 className="p-1 rounded-md transition-opacity hover:opacity-90"
//                 aria-label="Copy phone number"
//                 title={copied ? "Copied!" : "Copy number"}
//               >
//                 {copied ? (
//                   <Check
//                     size={13}
//                     strokeWidth={2.5}
//                     style={{
//                       color: "#7fffb0",
//                     }}
//                   />
//                 ) : (
//                   <Copy
//                     size={13}
//                     strokeWidth={2.5}
//                     style={{
//                       color: "rgba(255,255,255,0.6)",
//                     }}
//                   />
//                 )}
//               </button>
//             </div>

//             {/* WHATSAPP */}
//             <a
//               href={waHref}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={handleWhatsAppClick}
//               className="flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-semibold text-white rounded-full transition-opacity hover:opacity-90"
//               style={{
//                 background: "#25D366",
//               }}
//               aria-label="WhatsApp Garud Tata"
//             >
//               <MessageCircle
//                 size={13}
//                 strokeWidth={2.5}
//               />

//               WhatsApp
//             </a>
//           </div>

//           {/* ========================================
//               MOBILE RIGHT CONTROLS
//           ======================================== */}
//           <div className="flex lg:hidden items-center gap-2">
//             {/* WHATSAPP */}
//             <a
//               href={waHref}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={handleWhatsAppClick}
//               className="p-2 rounded-full text-white"
//               style={{
//                 background: "#25D366",
//               }}
//               aria-label="WhatsApp"
//             >
//               <MessageCircle
//                 size={17}
//                 strokeWidth={2}
//               />
//             </a>

//             {/* CALL */}
//             <a
//               href={telHref}
//               onClick={handleCallClick}
//               className="p-2 rounded-full text-white"
//               style={{
//                 background: "rgba(255,255,255,0.18)",
//               }}
//               aria-label="Call"
//             >
//               <Phone
//                 size={17}
//                 strokeWidth={2}
//               />
//             </a>

//             {/* MENU */}
//             <button
//               type="button"
//               onClick={() => setMenuOpen(true)}
//               className="p-2 rounded-full text-white"
//               style={{
//                 background: "rgba(255,255,255,0.18)",
//               }}
//               aria-label="Open menu"
//             >
//               <Menu
//                 size={19}
//                 strokeWidth={2}
//               />
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* ========================================
//           MOBILE FULLSCREEN MENU
//       ======================================== */}
//       {menuOpen && (
//         <div
//           className="gt-nav fixed inset-0 z-[80] flex flex-col lg:hidden"
//           style={{
//             background: BRAND,
//           }}
//         >
//           {/* MOBILE MENU HEADER */}
//           <div
//             className="flex items-center justify-between px-5 flex-shrink-0"
//             style={{
//               height: 64,
//               borderBottom:
//                 "1px solid rgba(255,255,255,0.14)",
//             }}
//           >
//             {/* LOGO */}
//             <a
//               href="/"
//               onClick={(e) => {
//                 e.preventDefault();
//                 navigate("/");
//               }}
//               className="flex items-center gap-2.5"
//               aria-label="Garud Tata home"
//             >
//               {/* WHITE TATA LOGO */}
//               <img
//                 src="/images/Navbar/tata logo.svg"
//                 alt="Tata"
//                 width={28}
//                 height={28}
//                 className="object-contain flex-shrink-0 tata-logo-white"
//               />

//               {/* GARUD TATA LOGO */}
//               <img
//                 src={logoSrc}
//                 alt="Garud Tata"
//                 style={{
//                   height: 48,
//                   width: "auto",
//                 }}
//                 className="object-contain"
//               />
//             </a>

//             {/* CLOSE */}
//             <button
//               type="button"
//               onClick={() => setMenuOpen(false)}
//               className="p-2 rounded-full text-white"
//               style={{
//                 background:
//                   "rgba(255,255,255,0.18)",
//               }}
//               aria-label="Close menu"
//             >
//               <X
//                 size={19}
//                 strokeWidth={2}
//               />
//             </button>
//           </div>

//           {/* MOBILE LINKS */}
//           <nav className="flex-1 flex flex-col justify-center px-7">
//             {NAV_LINKS.map((link) => {
//               const isActive = active === link.href;

//               return (
//                 <a
//                   key={link.label}
//                   href={link.href}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     navigate(link.href);
//                   }}
//                   className="flex items-center justify-between py-[18px]"
//                   style={{
//                     borderBottom:
//                       "1px solid rgba(255,255,255,0.1)",
//                   }}
//                 >
//                   <span
//                     className="text-[1.65rem] font-bold tracking-tight"
//                     style={{
//                       color: "#fff",
//                       opacity: isActive ? 1 : 0.6,
//                     }}
//                   >
//                     {link.label}
//                   </span>

//                   {isActive && (
//                     <span
//                       className="w-2 h-2 rounded-full flex-shrink-0"
//                       style={{
//                         background: "#fff",
//                       }}
//                     />
//                   )}
//                 </a>
//               );
//             })}
//           </nav>

//           {/* MOBILE CTA SECTION */}
//           <div
//             className="p-5 flex flex-col gap-3"
//             style={{
//               paddingBottom:
//                 "calc(1.25rem + env(safe-area-inset-bottom, 0px))",
//             }}
//           >
//             {/* PHONE + COPY */}
//             <div
//               className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl"
//               style={{
//                 border:
//                   "1.5px solid rgba(255,255,255,0.4)",
//               }}
//             >
//               <a
//                 href={telHref}
//                 onClick={handleCallClick}
//                 className="flex items-center gap-2 text-[14px] font-semibold text-white"
//               >
//                 <Phone
//                   size={15}
//                   strokeWidth={2.5}
//                 />

//                 {DISPLAY_PHONE}
//               </a>

//               <button
//                 type="button"
//                 onClick={handleCopyPhone}
//                 className="pl-3"
//                 aria-label="Copy phone number"
//               >
//                 {copied ? (
//                   <Check
//                     size={15}
//                     strokeWidth={2.5}
//                     style={{
//                       color: "#7fffb0",
//                     }}
//                   />
//                 ) : (
//                   <Copy
//                     size={15}
//                     strokeWidth={2.5}
//                     style={{
//                       color:
//                         "rgba(255,255,255,0.6)",
//                     }}
//                   />
//                 )}
//               </button>
//             </div>

//             {/* WHATSAPP */}
//             <a
//               href={waHref}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={handleWhatsAppClick}
//               className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-semibold text-white"
//               style={{
//                 background: "#25D366",
//               }}
//             >
//               <MessageCircle
//                 size={15}
//                 strokeWidth={2}
//               />

//               WhatsApp enquiry
//             </a>
//           </div>
//         </div>
//       )}

//       {/* ========================================
//           MOBILE BOTTOM BAR
//       ======================================== */}
//       <div
//         className="gt-nav fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
//         style={{
//           background: BRAND,
//           paddingBottom:
//             "env(safe-area-inset-bottom, 0px)",
//           borderTop:
//             "1px solid rgba(255,255,255,0.15)",
//         }}
//       >
//         <div className="grid grid-cols-2 h-[54px]">
//           {/* CALL */}
//           <a
//             href={telHref}
//             onClick={handleCallClick}
//             className="flex flex-col items-center justify-center gap-1 text-white active:opacity-70"
//             style={{
//               borderRight:
//                 "1px solid rgba(255,255,255,0.18)",
//             }}
//           >
//             <Phone
//               size={18}
//               strokeWidth={2}
//             />

//             <span
//               style={{
//                 fontSize: 9,
//                 fontWeight: 700,
//                 letterSpacing: "0.05em",
//               }}
//             >
//               Call Sales
//             </span>
//           </a>

//           {/* WHATSAPP */}
//           <a
//             href={waHref}
//             target="_blank"
//             rel="noopener noreferrer"
//             onClick={handleWhatsAppClick}
//             className="flex flex-col items-center justify-center gap-1 text-white active:opacity-70"
//           >
//             <MessageCircle
//               size={18}
//               strokeWidth={2}
//             />

//             <span
//               style={{
//                 fontSize: 9,
//                 fontWeight: 700,
//                 letterSpacing: "0.05em",
//               }}
//             >
//               WhatsApp
//             </span>
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }















"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type MouseEvent,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Phone,
  Menu,
  X,
  MessageCircle,
  Copy,
  Check,
  MapPin,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

const BRAND = "#1c39ff";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Contact", href: "#contact" },
];

const DISPLAY_PHONE = "+91 92173 71211";
const RAW_PHONE     = "919217371211";

const WHATSAPP_MSG = encodeURIComponent(
  "Hello! I'd like to enquire about a new Tata car at Garud Tata."
);

const SHOWROOMS = [
  { label: "Garud Tata Palam",      url: "https://www.tatamotors-delhi.com/palam" },
  { label: "Garud Tata Narela",     url: "https://www.tatamotors-delhi.com/narela" },
  { label: "Garud Tata Najafgarh",  url: "https://www.tatamotors-delhi.com/najafgarh" },
] as const;

function pushGTM(event: "call_click" | "whatsapp_click" | "copy_phone") {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event });
}

export interface CampaignNavbarProps {
  phone?: string;
  logoSrc?: string;
}

export default function CampaignNavbar({
  phone   = RAW_PHONE,
  logoSrc = "/images/logo.jpg",
}: CampaignNavbarProps) {
  const router   = useRouter();
  const pathname = usePathname();

  const rawPhone = phone.replace(/\D/g, "") || RAW_PHONE;
  const telHref  = `tel:+${rawPhone}`;
  const waHref   = `https://wa.me/${rawPhone}?text=${WHATSAPP_MSG}`;

  const [scrolled,      setScrolled]      = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [active,        setActive]        = useState("/");
  const [copied,        setCopied]        = useState(false);
  const [showroomOpen,  setShowroomOpen]  = useState(false);
  const [mobileShowroomOpen, setMobileShowroomOpen] = useState(false);

  const showroomRef = useRef<HTMLDivElement>(null);

  /* Scroll detection */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Active route */
  useEffect(() => { setActive(pathname); }, [pathname]);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* Close dropdown on outside click */
  useEffect(() => {
    function handleOutside(e: globalThis.MouseEvent) {
      if (showroomRef.current && !showroomRef.current.contains(e.target as Node)) {
        setShowroomOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  /* Navigation */
  const navigate = useCallback((href: string) => {
    setMenuOpen(false);
    if (href === "/") { setActive("/"); router.push("/"); return; }
    if (href.startsWith("#")) {
      const el = document.getElementById(href.replace("#", ""));
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);
      setActive(href);
      return;
    }
    setActive(href);
    router.push(href);
  }, [router]);

  const handleCallClick = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    pushGTM("call_click");
    window.location.href = telHref;
  }, [telHref]);

  const handleWhatsAppClick = useCallback(() => pushGTM("whatsapp_click"), []);

  const handleCopyPhone = useCallback(async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(DISPLAY_PHONE);
      setCopied(true);
      pushGTM("copy_phone");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        .gt-nav, .gt-nav * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
        .tata-logo-white { filter: brightness(0) invert(1); }
        .showroom-dropdown { animation: dropIn 0.18s ease; }
        @keyframes dropIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
      `}</style>

      {/* ── MAIN NAVBAR ── */}
      <nav
        className="gt-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: BRAND,
          height: scrolled ? 56 : 68,
          boxShadow: scrolled ? "0 2px 12px rgba(28,57,255,0.25)" : "none",
        }}
      >
        <div className="mx-auto px-5 lg:px-10 h-full flex items-center justify-between" style={{ maxWidth: 1400 }}>

          {/* Logo */}
          <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}
            className="flex items-center gap-2.5 flex-shrink-0" aria-label="Garud Tata home">
            <img src="/images/Navbar/tata logo.svg" alt="Tata" width={36} height={36}
              className="object-contain flex-shrink-0 tata-logo-white" />
            <img src={logoSrc} alt="Garud Tata" className="object-contain"
              style={{ height: scrolled ? 44 : 54, width: "auto", transition: "height 0.3s" }} />
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <a key={link.label} href={link.href}
                  onClick={(e) => { e.preventDefault(); navigate(link.href); }}
                  className="text-[13.5px] font-medium transition-opacity duration-150 relative"
                  style={{ color: "#fff", opacity: isActive ? 1 : 0.72 }}>
                  {link.label}
                  {isActive && (
                    <span className="absolute left-0 right-0 rounded-full"
                      style={{ bottom: -3, height: 2, background: "#fff" }} />
                  )}
                </a>
              );
            })}

            {/* Nearest Showroom dropdown */}
            <div className="relative" ref={showroomRef}>
              <button
                type="button"
                onClick={() => setShowroomOpen((o) => !o)}
                className="flex items-center gap-1.5 text-[13.5px] font-medium transition-opacity duration-150"
                style={{ color: "#fff", opacity: 0.72 }}
                aria-expanded={showroomOpen}
                aria-haspopup="true"
              >
                <MapPin size={13} strokeWidth={2.5} />
                Nearest Showroom
                <ChevronDown
                  size={13}
                  strokeWidth={2.5}
                  style={{ transform: showroomOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                />
              </button>

              {showroomOpen && (
                <div
                  className="showroom-dropdown absolute top-full left-1/2 -translate-x-1/2 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
                >
                  {SHOWROOMS.map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setShowroomOpen(false)}
                      className="flex items-center justify-between px-4 py-3 text-[13px] font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors group"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin size={12} className="text-gray-400 group-hover:text-blue-500" strokeWidth={2} />
                        {s.label}
                      </span>
                      <ExternalLink size={11} className="text-gray-300 group-hover:text-blue-400" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Phone + copy */}
            <div className="flex items-center gap-1.5">
              <a href={telHref} onClick={handleCallClick}
                className="flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-90"
                style={{ color: "rgba(255,255,255,0.85)" }}
                aria-label={`Call Garud Tata at ${DISPLAY_PHONE}`}>
                <Phone size={13} strokeWidth={2.5} style={{ color: "#fff" }} />
                {DISPLAY_PHONE}
              </a>
              <button type="button" onClick={handleCopyPhone}
                className="p-1 rounded-md transition-opacity hover:opacity-90"
                aria-label="Copy phone number" title={copied ? "Copied!" : "Copy number"}>
                {copied
                  ? <Check size={13} strokeWidth={2.5} style={{ color: "#7fffb0" }} />
                  : <Copy size={13} strokeWidth={2.5} style={{ color: "rgba(255,255,255,0.6)" }} />
                }
              </button>
            </div>

            {/* WhatsApp */}
            <a href={waHref} target="_blank" rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-semibold text-white rounded-full transition-opacity hover:opacity-90"
              style={{ background: "#25D366" }}
              aria-label="WhatsApp Garud Tata">
              <MessageCircle size={13} strokeWidth={2.5} />
              WhatsApp
            </a>
          </div>

          {/* Mobile right controls */}
          <div className="flex lg:hidden items-center gap-2">
            <a href={waHref} target="_blank" rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="p-2 rounded-full text-white"
              style={{ background: "#25D366" }} aria-label="WhatsApp">
              <MessageCircle size={17} strokeWidth={2} />
            </a>
            <a href={telHref} onClick={handleCallClick}
              className="p-2 rounded-full text-white"
              style={{ background: "rgba(255,255,255,0.18)" }} aria-label="Call">
              <Phone size={17} strokeWidth={2} />
            </a>
            <button type="button" onClick={() => setMenuOpen(true)}
              className="p-2 rounded-full text-white"
              style={{ background: "rgba(255,255,255,0.18)" }} aria-label="Open menu">
              <Menu size={19} strokeWidth={2} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE FULLSCREEN MENU ── */}
      {menuOpen && (
        <div className="gt-nav fixed inset-0 z-[80] flex flex-col lg:hidden"
          style={{ background: BRAND }}>

          {/* Header */}
          <div className="flex items-center justify-between px-5 flex-shrink-0"
            style={{ height: 64, borderBottom: "1px solid rgba(255,255,255,0.14)" }}>
            <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}
              className="flex items-center gap-2.5" aria-label="Garud Tata home">
              <img src="/images/Navbar/tata logo.svg" alt="Tata" width={28} height={28}
                className="object-contain flex-shrink-0 tata-logo-white" />
              <img src={logoSrc} alt="Garud Tata"
                style={{ height: 48, width: "auto" }} className="object-contain" />
            </a>
            <button type="button" onClick={() => setMenuOpen(false)}
              className="p-2 rounded-full text-white"
              style={{ background: "rgba(255,255,255,0.18)" }} aria-label="Close menu">
              <X size={19} strokeWidth={2} />
            </button>
          </div>

          {/* Links */}
          <nav className="flex-1 flex flex-col justify-center px-7 overflow-y-auto">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href;
              return (
                <a key={link.label} href={link.href}
                  onClick={(e) => { e.preventDefault(); navigate(link.href); }}
                  className="flex items-center justify-between py-[18px]"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                  <span className="text-[1.65rem] font-bold tracking-tight"
                    style={{ color: "#fff", opacity: isActive ? 1 : 0.6 }}>
                    {link.label}
                  </span>
                  {isActive && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#fff" }} />}
                </a>
              );
            })}

            {/* Mobile showroom section */}
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <button
                type="button"
                onClick={() => setMobileShowroomOpen((o) => !o)}
                className="w-full flex items-center justify-between py-[18px]"
              >
                <span className="text-[1.65rem] font-bold tracking-tight flex items-center gap-3"
                  style={{ color: "#fff", opacity: 0.6 }}>
                  <MapPin size={22} strokeWidth={2} />
                  Showrooms
                </span>
                <ChevronDown
                  size={18} strokeWidth={2.5}
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    transform: mobileShowroomOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s",
                  }}
                />
              </button>

              {mobileShowroomOpen && (
                <div className="pb-4 space-y-2 pl-2">
                  {SHOWROOMS.map((s) => (
                    <a
                      key={s.label}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.1)" }}
                    >
                      <span className="text-white text-[14px] font-semibold">{s.label}</span>
                      <ExternalLink size={13} style={{ color: "rgba(255,255,255,0.5)" }} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile CTA */}
          <div className="p-5 flex flex-col gap-3"
            style={{ paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom, 0px))" }}>
            <div className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl"
              style={{ border: "1.5px solid rgba(255,255,255,0.4)" }}>
              <a href={telHref} onClick={handleCallClick}
                className="flex items-center gap-2 text-[14px] font-semibold text-white">
                <Phone size={15} strokeWidth={2.5} />
                {DISPLAY_PHONE}
              </a>
              <button type="button" onClick={handleCopyPhone} className="pl-3" aria-label="Copy phone number">
                {copied
                  ? <Check size={15} strokeWidth={2.5} style={{ color: "#7fffb0" }} />
                  : <Copy size={15} strokeWidth={2.5} style={{ color: "rgba(255,255,255,0.6)" }} />
                }
              </button>
            </div>
            <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[14px] font-semibold text-white"
              style={{ background: "#25D366" }}>
              <MessageCircle size={15} strokeWidth={2} />
              WhatsApp enquiry
            </a>
          </div>
        </div>
      )}

      {/* ── MOBILE BOTTOM BAR ── */}
      <div className="gt-nav fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
        style={{
          background: BRAND,
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          borderTop: "1px solid rgba(255,255,255,0.15)",
        }}>
        <div className="grid grid-cols-2 h-[54px]">
          <a href={telHref} onClick={handleCallClick}
            className="flex flex-col items-center justify-center gap-1 text-white active:opacity-70"
            style={{ borderRight: "1px solid rgba(255,255,255,0.18)" }}>
            <Phone size={18} strokeWidth={2} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.05em" }}>Call Sales</span>
          </a>
          <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick}
            className="flex flex-col items-center justify-center gap-1 text-white active:opacity-70">
            <MessageCircle size={18} strokeWidth={2} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.05em" }}>WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
}