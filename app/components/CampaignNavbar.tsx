




// // garud-tata/app/components/CampaignNavbar.tsx
// "use client";

// import { useState, useEffect, useCallback, memo, useRef } from "react";
// import { useRouter, usePathname } from "next/navigation";
// import { motion, AnimatePresence, type Variants } from "framer-motion";
// import {
//   Phone,
//   Menu,
//   X,
//   ArrowRight,
//   Gift,
//   ChevronRight,
//   ChevronDown,
//   MapPin,
//   MessageCircle,
//   Copy,
//   Check,
//   Navigation,
//   Newspaper,
// } from "lucide-react";

// import {
//   showrooms,
//   SHOWROOM_SLUGS,
//   HOME_URL,
//   type ShowroomSlug,
// } from "@/app/config/showrooms";

// import {
//   trackCallClick,
//   trackWhatsAppClick,
//   trackCopyPhone,
// } from "@/lib/tracking";

// /* =========================================================
//    TYPES
// ========================================================= */

// export interface CampaignNavbarProps {
//   phone?: string;
//   vehicle?: string;
//   logoSrc?: string;
//   offerSectionId?: string;
// }

// /* =========================================================
//    NAVIGATION TYPES
// ========================================================= */

// type RouteNavLink = {
//   label: string;
//   href: string;
//   type: "route";
//   hash: null;
// };

// type HashNavLink = {
//   label: string;
//   href: string;
//   type: "hash";
//   hash: string;
// };

// type NavLink = RouteNavLink | HashNavLink;

// /* =========================================================
//    NAVIGATION LINKS
// ========================================================= */

// const NAV_LINKS: NavLink[] = [
//   {
//     label: "Home",
//     href: "/",
//     type: "route",
//     hash: null,
//   },
//   {
//     label: "Offers",
//     href: "#offers",
//     type: "hash",
//     hash: "offer-form",
//   },
//   {
//     label: "Showrooms",
//     href: "#showrooms",
//     type: "hash",
//     hash: "showrooms",
//   },
//   {
//     label: "Service",
//     href: "#showrooms",
//     type: "hash",
//     hash: "showrooms",
//   },
//   {
//     label: "PR & Blogs",
//     href: "/pr-blog",
//     type: "route",
//     hash: null,
//   },
//   {
//     label: "Contact",
//     href: "#contact",
//     type: "hash",
//     hash: "contact",
//   },
// ];

// const CONTACT_LINK: HashNavLink = {
//   label: "Contact",
//   href: "#contact",
//   type: "hash",
//   hash: "contact",
// };

// /* =========================================================
//    CONSTANTS
// ========================================================= */

// const WHATSAPP_MESSAGE = encodeURIComponent(
//   "Hello! I would like to enquire about a new Tata car at Garud Tata. Could you please share details about availability, pricing, and current offers?"
// );

// const DISPLAY_PHONE = "+91 92173 71211";
// const RAW_PHONE = "919217371211";

// /* =========================================================
//    FRAMER MOTION VARIANTS
// ========================================================= */

// const navContainerVariants: Variants = {
//   hidden: {
//     opacity: 0,
//     y: -20,
//   },

//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       staggerChildren: 0.07,
//       delayChildren: 0.15,
//     },
//   },
// };

// const navItemVariants: Variants = {
//   hidden: {
//     opacity: 0,
//     y: -8,
//   },

//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       type: "spring",
//       stiffness: 320,
//       damping: 26,
//     },
//   },
// };

// const dropdownVariants: Variants = {
//   hidden: {
//     opacity: 0,
//     y: -6,
//     scale: 0.97,
//   },

//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       type: "spring",
//       stiffness: 400,
//       damping: 28,
//     },
//   },

//   exit: {
//     opacity: 0,
//     y: -4,
//     scale: 0.97,
//     transition: {
//       duration: 0.15,
//     },
//   },
// };

// /* =========================================================
//    SHOWROOM CITY INFO HOOK
//    — "/" → no dropdown, city = "Delhi"
//    — showroom routes → show switcher
// ========================================================= */

// function useShowroomInfo() {
//   const pathname = usePathname();

//   if (pathname === "/") {
//     return {
//       cityName: "Delhi",
//       currentSlug: null,
//       isShowroomRoute: false,
//     };
//   }

//   /*
//    * PR & Blog pages are not showroom routes.
//    * Prevent "/pr-blog" from being interpreted as a showroom slug.
//    */
//   if (
//     pathname === "/pr-blog" ||
//     pathname.startsWith("/pr-blog/")
//   ) {
//     return {
//       cityName: "Delhi",
//       currentSlug: null,
//       isShowroomRoute: false,
//     };
//   }

//   const pathSlug = pathname.split("/")[1] as ShowroomSlug;

//   const isValid = pathSlug && !!showrooms[pathSlug];

//   const currentSlug = isValid ? pathSlug : null;

//   const cityName = currentSlug
//     ? currentSlug.split("-").pop()!
//     : "Delhi";

//   return {
//     cityName,
//     currentSlug,
//     isShowroomRoute: !!currentSlug,
//   };
// }

// /* =========================================================
//    SHOWROOM SWITCHER DROPDOWN
// ========================================================= */

// const ShowroomSwitcher = memo(function ShowroomSwitcher({
//   currentSlug,
//   cityName,
//   onSwitch,
// }: {
//   currentSlug: ShowroomSlug;
//   cityName: string;
//   onSwitch: (slug: ShowroomSlug) => void;
// }) {
//   const [open, setOpen] = useState(false);

//   const ref = useRef<HTMLDivElement>(null);

//   /* Close on outside click */
//   useEffect(() => {
//     const handler = (e: MouseEvent) => {
//       if (
//         ref.current &&
//         !ref.current.contains(e.target as Node)
//       ) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handler);

//     return () =>
//       document.removeEventListener("mousedown", handler);
//   }, []);

//   const otherSlugs = SHOWROOM_SLUGS.filter(
//     (s) => s !== currentSlug
//   );

//   return (
//     <div ref={ref} className="relative">
//       {/* Trigger */}
//       <button
//         type="button"
//         onClick={() => setOpen((v) => !v)}
//         className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-all duration-200 ${
//           open
//             ? "border-[#0055A5]/40 bg-[#0055A5]/10"
//             : "border-[#0055A5]/20 bg-[#0055A5]/[0.06] hover:bg-[#0055A5]/10"
//         }`}
//       >
//         <MapPin
//           size={12}
//           className="text-[#0055A5]"
//           strokeWidth={2.5}
//         />

//         <span className="text-[11px] font-bold text-[#0055A5] tracking-[0.06em] uppercase">
//           {cityName}
//         </span>

//         <ChevronDown
//           size={11}
//           strokeWidth={2.5}
//           className={`text-[#0055A5] transition-transform duration-200 ${
//             open ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       {/* Dropdown */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             variants={dropdownVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="absolute left-0 top-[calc(100%+8px)] z-[200] min-w-[220px] rounded-2xl border border-gray-100 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.10)] overflow-hidden"
//           >
//             {/* Current showroom */}
//             <div className="px-4 py-3 border-b border-gray-100 bg-[#0055A5]/[0.04]">
//               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
//                 Current Showroom
//               </p>

//               <div className="flex items-center gap-2">
//                 <div className="w-2 h-2 rounded-full bg-[#0055A5]" />

//                 <span className="text-[13px] font-semibold text-[#0055A5]">
//                   {showrooms[currentSlug].name}
//                 </span>
//               </div>
//             </div>

//             {/* Switch to */}
//             <div className="px-3 py-2">
//               <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1 pt-1 pb-2">
//                 Switch Showroom
//               </p>

//               {otherSlugs.map((slug) => {
//                 const city = slug.split("-").pop()!;

//                 const cfg = showrooms[slug];

//                 return (
//                   <button
//                     key={slug}
//                     type="button"
//                     onClick={() => {
//                       setOpen(false);
//                       onSwitch(slug);
//                     }}
//                     className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-[#0055A5]/[0.06] transition-colors group"
//                   >
//                     <div className="flex items-center gap-2.5">
//                       <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0055A5]/10 transition-colors">
//                         <Navigation
//                           size={13}
//                           className="text-gray-400 group-hover:text-[#0055A5] transition-colors"
//                           strokeWidth={2}
//                         />
//                       </div>

//                       <div className="text-left">
//                         <p className="text-[13px] font-semibold text-gray-800 group-hover:text-[#0055A5] transition-colors">
//                           {city}
//                         </p>

//                         <p className="text-[11px] text-gray-400 truncate max-w-[130px]">
//                           {cfg.outlets.find(
//                             (o) =>
//                               o.type === "showroom" &&
//                               o.shortName === city
//                           )?.address?.split(",")[0] ??
//                             cfg.footer.tagline}
//                         </p>
//                       </div>
//                     </div>

//                     <ChevronRight
//                       size={14}
//                       className="text-gray-300 group-hover:text-[#0055A5] flex-shrink-0 transition-colors"
//                     />
//                   </button>
//                 );
//               })}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// });

// /* =========================================================
//    MOBILE SHOWROOM SWITCHER
// ========================================================= */

// const MobileShowroomSwitcher = memo(
//   function MobileShowroomSwitcher({
//     currentSlug,
//     onSwitch,
//   }: {
//     currentSlug: ShowroomSlug;
//     onSwitch: (slug: ShowroomSlug) => void;
//   }) {
//     return (
//       <div className="mx-0 mb-2 rounded-2xl border border-gray-100 overflow-hidden">
//         <div className="px-4 py-3 bg-[#0055A5]/[0.04] border-b border-gray-100">
//           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
//             Current Showroom
//           </p>

//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 rounded-full bg-[#0055A5]" />

//             <span className="text-[14px] font-semibold text-[#0055A5]">
//               {showrooms[currentSlug].name}
//             </span>
//           </div>
//         </div>

//         <div className="p-2">
//           <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 pt-1 pb-2">
//             Switch Showroom
//           </p>

//           {SHOWROOM_SLUGS.filter(
//             (s) => s !== currentSlug
//           ).map((slug) => {
//             const city = slug.split("-").pop()!;

//             const cfg = showrooms[slug];

//             return (
//               <button
//                 key={slug}
//                 type="button"
//                 onClick={() => onSwitch(slug)}
//                 className="w-full flex items-center justify-between gap-3 px-3 py-3 rounded-xl active:bg-[#0055A5]/[0.06] transition-colors group"
//               >
//                 <div className="flex items-center gap-3">
//                   <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
//                     <Navigation
//                       size={14}
//                       className="text-gray-400"
//                       strokeWidth={2}
//                     />
//                   </div>

//                   <div className="text-left">
//                     <p className="text-[14px] font-semibold text-gray-800">
//                       {city}
//                     </p>

//                     <p className="text-[11px] text-gray-400">
//                       {cfg.outlets.find(
//                         (o) =>
//                           o.type === "showroom" &&
//                           o.shortName === city
//                       )?.address?.split(",")[0] ??
//                         cfg.footer.tagline}
//                     </p>
//                   </div>
//                 </div>

//                 <ChevronRight
//                   size={16}
//                   className="text-gray-300 flex-shrink-0"
//                 />
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// );

// /* =========================================================
//    CITY BADGE
// ========================================================= */

// const CityBadge = memo(function CityBadge({
//   cityName,
//   size = "md",
// }: {
//   cityName: string;
//   size?: "sm" | "md";
// }) {
//   const sm = size === "sm";

//   return (
//     <div
//       className={`flex items-center gap-1.5 rounded-full border border-[#0055A5]/20 bg-[#0055A5]/[0.06] ${
//         sm ? "px-2 py-1" : "px-3 py-1.5"
//       }`}
//     >
//       <MapPin
//         size={sm ? 10 : 12}
//         className="text-[#0055A5]"
//         strokeWidth={2.5}
//       />

//       <span
//         className={`font-bold text-[#0055A5] tracking-[0.06em] uppercase ${
//           sm ? "text-[10px]" : "text-[11px]"
//         }`}
//       >
//         {cityName}
//       </span>
//     </div>
//   );
// });

// /* =========================================================
//    COPY BUTTON
// ========================================================= */

// const CopyButton = memo(function CopyButton({
//   onCopy,
//   copied,
//   size = "md",
// }: {
//   onCopy: () => void;
//   copied: boolean;
//   size?: "sm" | "md";
// }) {
//   const iconSize = size === "sm" ? 15 : 13;

//   return (
//     <button
//       type="button"
//       onClick={onCopy}
//       title="Copy number"
//       aria-label="Copy phone number"
//       className={`text-gray-400 hover:text-[#0055A5] transition-colors ${
//         size === "sm"
//           ? "p-1.5 rounded-lg hover:bg-gray-200"
//           : "px-3 py-2.5 hover:bg-gray-50"
//       }`}
//     >
//       {copied ? (
//         <Check
//           size={iconSize}
//           className="text-green-500"
//           strokeWidth={2.5}
//         />
//       ) : (
//         <Copy size={iconSize} strokeWidth={2.5} />
//       )}
//     </button>
//   );
// });

// /* =========================================================
//    MAIN COMPONENT
// ========================================================= */

// export default function CampaignNavbar({
//   logoSrc = "/images/logo.jpg",
// }: CampaignNavbarProps) {
//   const router = useRouter();
//   const pathname = usePathname();

//   const {
//     cityName,
//     currentSlug,
//     isShowroomRoute,
//   } = useShowroomInfo();

//   const [scrolled, setScrolled] = useState(false);

//   const [menuOpen, setMenuOpen] = useState(false);

//   /*
//    * PR & Blog route is considered active for both:
//    *
//    * /pr-blog
//    * /pr-blog/article-slug
//    */
//   const [activeLink, setActiveLink] = useState<string>(() => {
//     if (
//       pathname === "/pr-blog" ||
//       pathname.startsWith("/pr-blog/")
//     ) {
//       return "/pr-blog";
//     }

//     if (pathname === "/") {
//       return "/";
//     }

//     return "";
//   });

//   const [copied, setCopied] = useState(false);

//   const telHref = `tel:+${RAW_PHONE}`;

//   const whatsappHref = `https://wa.me/${RAW_PHONE}?text=${WHATSAPP_MESSAGE}`;

//   /* =======================================================
//      SHOWROOM SWITCH HANDLER
//   ======================================================= */

//   const handleShowroomSwitch = useCallback(
//     (slug: ShowroomSlug) => {
//       setMenuOpen(false);

//       router.push(`/${slug}`);
//     },
//     [router]
//   );

//   /* =======================================================
//      SCROLL LISTENER
//   ======================================================= */

//   useEffect(() => {
//     const onScroll = () =>
//       setScrolled(window.scrollY > 50);

//     window.addEventListener("scroll", onScroll, {
//       passive: true,
//     });

//     return () =>
//       window.removeEventListener("scroll", onScroll);
//   }, []);

//   /* =======================================================
//      BODY SCROLL LOCK
//   ======================================================= */

//   useEffect(() => {
//     document.body.style.overflow = menuOpen
//       ? "hidden"
//       : "";

//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [menuOpen]);

//   /* =======================================================
//      ROUTE + HASH SYNC
//   ======================================================= */

//   useEffect(() => {
//     const sync = () => {
//       /*
//        * PR & Blogs should remain active on the
//        * listing page and every article page.
//        */
//       if (
//         pathname === "/pr-blog" ||
//         pathname.startsWith("/pr-blog/")
//       ) {
//         setActiveLink("/pr-blog");
//         return;
//       }

//       const hash = window.location.hash;

//       setActiveLink(
//         hash || (pathname === "/" ? "/" : pathname)
//       );
//     };

//     sync();

//     window.addEventListener("hashchange", sync);

//     return () =>
//       window.removeEventListener("hashchange", sync);
//   }, [pathname]);

//   /* =======================================================
//      INTERSECTION OBSERVER
//   ======================================================= */

//   useEffect(() => {
//     /*
//      * Do not run homepage section tracking on
//      * PR & Blog pages.
//      */
//     if (
//       pathname === "/pr-blog" ||
//       pathname.startsWith("/pr-blog/")
//     ) {
//       return;
//     }

//     const ids = Array.from(
//       new Set(
//         NAV_LINKS.filter(
//           (
//             link
//           ): link is HashNavLink =>
//             link.type === "hash" &&
//             Boolean(link.hash)
//         ).map((link) => link.hash)
//       )
//     );

//     const sections = ids
//       .map((id) =>
//         document.getElementById(id)
//       )
//       .filter(
//         (el): el is HTMLElement =>
//           Boolean(el)
//       );

//     if (!sections.length) return;

//     const observer =
//       new IntersectionObserver(
//         (entries) => {
//           for (const entry of entries) {
//             if (!entry.isIntersecting) continue;

//             const matched = NAV_LINKS.find(
//               (
//                 link
//               ): link is HashNavLink =>
//                 link.type === "hash" &&
//                 link.hash === entry.target.id
//             );

//             if (matched) {
//               setActiveLink(matched.href);

//               window.history.replaceState(
//                 null,
//                 "",
//                 matched.href
//               );
//             }
//           }
//         },
//         {
//           rootMargin:
//             "-20% 0px -60% 0px",
//           threshold: 0,
//         }
//       );

//     sections.forEach((s) =>
//       observer.observe(s)
//     );

//     return () => observer.disconnect();
//   }, [pathname]);

//   /* =======================================================
//      NAVIGATION HANDLER
//   ======================================================= */

//   const handleNav = useCallback(
//     (link: NavLink) => {
//       setMenuOpen(false);

//       /* Route navigation */
//       if (link.type === "route") {
//         setActiveLink(link.href);

//         router.push(link.href);

//         return;
//       }

//       /* Homepage section navigation */
//       const targetId =
//         link.hash ||
//         link.href.replace("#", "");

//       const element =
//         document.getElementById(targetId);

//       if (element) {
//         element.scrollIntoView({
//           behavior: "smooth",
//         });
//       }

//       window.history.pushState(
//         null,
//         "",
//         link.href
//       );

//       setActiveLink(link.href);
//     },
//     [router]
//   );

//   /* =======================================================
//      CONVERSION EVENTS
//   ======================================================= */

//   const handleCallClick = useCallback(
//     (
//       e: React.MouseEvent<HTMLAnchorElement>
//     ) => {
//       e.preventDefault();

//       trackCallClick("campaign_navbar");

//       window.location.href = telHref;
//     },
//     [telHref]
//   );

//   const handleWhatsAppClick =
//     useCallback(() => {
//       trackWhatsAppClick("campaign_navbar");
//     }, []);

//   const handleCopy = useCallback(() => {
//     navigator.clipboard
//       .writeText(DISPLAY_PHONE)
//       .then(() => {
//         setCopied(true);

//         trackCopyPhone(
//           "campaign_navbar"
//         );

//         setTimeout(
//           () => setCopied(false),
//           2000
//         );
//       })
//       .catch(() =>
//         setCopied(false)
//       );
//   }, []);

//   const openMenu = useCallback(
//     () => setMenuOpen(true),
//     []
//   );

//   const closeMenu = useCallback(
//     () => setMenuOpen(false),
//     []
//   );

//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (
//     <>
//       {/* =====================================================
//           NAVBAR
//       ===================================================== */}

//       <motion.nav
//         initial={{
//           y: -100,
//           opacity: 0,
//         }}
//         animate={{
//           y: 0,
//           opacity: 1,
//         }}
//         transition={{
//           duration: 0.55,
//           ease: [
//             0.16,
//             1,
//             0.3,
//             1,
//           ],
//         }}
//         aria-label="Primary navigation"
//         className={`fixed top-0 left-0 right-0 z-50 will-change-transform transition-all duration-500 ease-in-out border-b ${
//           scrolled
//             ? "h-[64px] bg-white/92 backdrop-blur-xl border-gray-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.05)]"
//             : "h-[76px] bg-white/80 backdrop-blur-md border-transparent"
//         }`}
//       >
//         <div className="max-w-[1440px] mx-auto px-5 lg:px-12 h-full flex items-center justify-between gap-4">
//           {/* LOGO */}

//           <a
//             href={HOME_URL}
//             className="relative z-10 flex-shrink-0 group"
//             aria-label="Garud Tata — home"
//           >
//             <img
//               src={logoSrc}
//               alt="Garud Tata"
//               width={240}
//               height={76}
//               className="h-[52px] w-auto sm:h-[58px] lg:h-[70px] object-contain object-left transition-transform duration-500 group-hover:scale-105"
//             />
//           </a>

//           {/* LOCATION BADGE / SWITCHER — desktop */}

//           <div className="hidden lg:flex flex-shrink-0">
//             {isShowroomRoute &&
//             currentSlug ? (
//               <ShowroomSwitcher
//                 currentSlug={currentSlug}
//                 cityName={cityName}
//                 onSwitch={
//                   handleShowroomSwitch
//                 }
//               />
//             ) : (
//               <CityBadge
//                 cityName={cityName}
//                 size="md"
//               />
//             )}
//           </div>

//           {/* DESKTOP NAV */}

//           <motion.nav
//             variants={
//               navContainerVariants
//             }
//             initial="hidden"
//             animate="visible"
//             aria-label="Site sections"
//             className="hidden lg:flex items-center gap-1 h-full flex-1 justify-center"
//           >
//             {NAV_LINKS.map((link) => {
//               const isActive =
//                 activeLink ===
//                 link.href;

//               return (
//                 <motion.a
//                   key={link.label}
//                   variants={
//                     navItemVariants
//                   }
//                   href={link.href}
//                   onClick={(e) => {
//                     e.preventDefault();

//                     handleNav(link);
//                   }}
//                   className="relative px-4 py-2 rounded-full group cursor-pointer"
//                   aria-current={
//                     isActive
//                       ? "page"
//                       : undefined
//                   }
//                 >
//                   {isActive && (
//                     <motion.span
//                       layoutId="nav-pill"
//                       className="absolute inset-0 bg-[#0055A5]/10 rounded-full"
//                       transition={{
//                         type: "spring",
//                         stiffness: 380,
//                         damping: 32,
//                       }}
//                     />
//                   )}

//                   <span
//                     className={`relative z-10 text-[13px] font-semibold tracking-[0.03em] transition-colors duration-200 ${
//                       isActive
//                         ? "text-[#0055A5]"
//                         : "text-gray-600 group-hover:text-gray-900"
//                     }`}
//                   >
//                     {link.label}
//                   </span>
//                 </motion.a>
//               );
//             })}
//           </motion.nav>

//           {/* DESKTOP ACTIONS */}

//           <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
//             {/* Call + Copy */}

//             <div className="flex items-center rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden">
//               <a
//                 href={telHref}
//                 onClick={
//                   handleCallClick
//                 }
//                 className="group flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-gray-700 hover:text-gray-900 text-[13px] font-semibold tracking-wide transition-colors duration-150 border-r border-gray-100"
//                 aria-label={`Call ${DISPLAY_PHONE}`}
//               >
//                 <Phone
//                   size={14}
//                   className="text-[#0055A5] group-hover:scale-110 transition-transform"
//                   strokeWidth={2.5}
//                 />

//                 <span>
//                   <span className="text-gray-400 text-[10px] uppercase tracking-wider mr-1.5 font-bold">
//                     Sales
//                   </span>

//                   {DISPLAY_PHONE}
//                 </span>
//               </a>

//               <CopyButton
//                 onCopy={handleCopy}
//                 copied={copied}
//                 size="md"
//               />
//             </div>

//             {/* WhatsApp */}

//             <a
//               href={whatsappHref}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={
//                 handleWhatsAppClick
//               }
//               className="group flex items-center gap-2 px-4 py-2.5 rounded-full border border-green-200 bg-green-50 hover:bg-green-100 text-green-700 text-[13px] font-semibold tracking-wide transition-colors duration-150 shadow-sm"
//               aria-label="WhatsApp enquiry"
//             >
//               <MessageCircle
//                 size={14}
//                 strokeWidth={2.5}
//                 className="group-hover:scale-110 transition-transform"
//               />

//               WhatsApp
//             </a>

//             {/* Get Offer */}

//             <a
//               href="#contact"
//               onClick={(e) => {
//                 e.preventDefault();

//                 handleNav(
//                   CONTACT_LINK
//                 );
//               }}
//               className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0055A5] hover:bg-[#004488] text-white text-[13px] font-bold tracking-[0.05em] shadow-[0_4px_16px_rgba(0,85,165,0.3)] hover:shadow-[0_6px_22px_rgba(0,85,165,0.4)] hover:-translate-y-px transition-all duration-200"
//             >
//               GET OFFER

//               <ArrowRight
//                 size={14}
//                 strokeWidth={2.5}
//               />
//             </a>
//           </div>

//           {/* MOBILE TOP BAR */}

//           <div className="flex lg:hidden items-center gap-1.5">
//             {/* Mobile location */}

//             {isShowroomRoute &&
//             currentSlug ? (
//               <div className="flex items-center gap-1 rounded-full border border-[#0055A5]/20 bg-[#0055A5]/[0.06] px-2 py-1">
//                 <MapPin
//                   size={10}
//                   className="text-[#0055A5]"
//                   strokeWidth={2.5}
//                 />

//                 <span className="text-[10px] font-bold text-[#0055A5] tracking-[0.06em] uppercase">
//                   {cityName}
//                 </span>
//               </div>
//             ) : (
//               <CityBadge
//                 cityName={cityName}
//                 size="sm"
//               />
//             )}

//             {/* WhatsApp */}

//             <a
//               href={whatsappHref}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={
//                 handleWhatsAppClick
//               }
//               className="p-2 text-green-600 bg-green-50 rounded-full hover:bg-green-100 transition-colors"
//               aria-label="WhatsApp enquiry"
//             >
//               <MessageCircle
//                 size={18}
//                 strokeWidth={2}
//               />
//             </a>

//             {/* Phone */}

//             <a
//               href={telHref}
//               onClick={
//                 handleCallClick
//               }
//               className="p-2 text-[#0055A5] bg-[#0055A5]/10 rounded-full hover:bg-[#0055A5]/20 transition-colors"
//               aria-label={`Call ${DISPLAY_PHONE}`}
//             >
//               <Phone
//                 size={18}
//                 strokeWidth={2}
//               />
//             </a>

//             {/* Menu */}

//             <button
//               type="button"
//               onClick={openMenu}
//               className="p-2 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
//               aria-label="Open menu"
//             >
//               <Menu
//                 size={20}
//                 strokeWidth={2}
//               />
//             </button>
//           </div>
//         </div>
//       </motion.nav>

//       {/* =====================================================
//           MOBILE FULLSCREEN MENU
//       ===================================================== */}

//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div
//             key="mobile-menu"
//             initial={{
//               opacity: 0,
//             }}
//             animate={{
//               opacity: 1,
//             }}
//             exit={{
//               opacity: 0,
//             }}
//             transition={{
//               duration: 0.2,
//             }}
//             className="fixed inset-0 z-[80] bg-white flex flex-col lg:hidden overflow-y-auto overscroll-contain"
//           >
//             {/* Header */}

//             <div className="flex items-center justify-between px-6 h-[72px] border-b border-gray-100 flex-shrink-0">
//               <img
//                 src={logoSrc}
//                 alt="Garud Tata"
//                 width={130}
//                 height={38}
//                 className="h-[36px] w-auto object-contain object-left"
//               />

//               <button
//                 type="button"
//                 onClick={closeMenu}
//                 className="p-2.5 text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
//                 aria-label="Close menu"
//               >
//                 <X
//                   size={20}
//                   strokeWidth={2.5}
//                 />
//               </button>
//             </div>

//             {/* Showroom switcher */}

//             {isShowroomRoute &&
//               currentSlug && (
//                 <div className="px-5 pt-5">
//                   <MobileShowroomSwitcher
//                     currentSlug={
//                       currentSlug
//                     }
//                     onSwitch={
//                       handleShowroomSwitch
//                     }
//                   />
//                 </div>
//               )}

//             {/* Nav links */}

//             <nav className="flex-1 flex flex-col justify-center px-8 py-6 gap-1">
//               {NAV_LINKS.map(
//                 (link, index) => {
//                   const isActive =
//                     activeLink ===
//                     link.href;

//                   return (
//                     <a
//                       key={
//                         link.label
//                       }
//                       href={
//                         link.href
//                       }
//                       onClick={(e) => {
//                         e.preventDefault();

//                         handleNav(
//                           link
//                         );
//                       }}
//                       className="group flex items-center justify-between py-4 border-b border-gray-100 last:border-0 active:bg-gray-50 -mx-2 px-2 rounded-xl transition-colors"
//                     >
//                       <div className="flex items-center gap-4">
//                         <span
//                           className={`text-[10px] font-bold transition-colors ${
//                             isActive
//                               ? "text-[#0055A5]"
//                               : "text-gray-300"
//                           }`}
//                         >
//                           {String(
//                             index + 1
//                           ).padStart(
//                             2,
//                             "0"
//                           )}
//                         </span>

//                         <span
//                           className={`text-[1.75rem] font-bold tracking-tight ${
//                             isActive
//                               ? "text-[#0055A5]"
//                               : "text-gray-800"
//                           }`}
//                         >
//                           {
//                             link.label
//                           }
//                         </span>
//                       </div>

//                       <ChevronRight
//                         size={22}
//                         className={`flex-shrink-0 ${
//                           isActive
//                             ? "text-[#0055A5]"
//                             : "text-gray-300"
//                         }`}
//                       />
//                     </a>
//                   );
//                 }
//               )}
//             </nav>

//             {/* Footer CTAs */}

//             <div className="p-5 space-y-3 pb-[calc(84px+env(safe-area-inset-bottom,0px))] flex-shrink-0">
//               {/* Phone */}

//               <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
//                 <Phone
//                   size={15}
//                   className="text-[#0055A5] flex-shrink-0"
//                   strokeWidth={2.5}
//                 />

//                 <a
//                   href={telHref}
//                   onClick={
//                     handleCallClick
//                   }
//                   className="flex-1 text-[15px] font-bold text-gray-800"
//                 >
//                   {
//                     DISPLAY_PHONE
//                   }
//                 </a>

//                 <CopyButton
//                   onCopy={
//                     handleCopy
//                   }
//                   copied={
//                     copied
//                   }
//                   size="sm"
//                 />
//               </div>

//               {/* WhatsApp */}

//               <a
//                 href={
//                   whatsappHref
//                 }
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 onClick={
//                   handleWhatsAppClick
//                 }
//                 className="w-full flex items-center justify-between px-6 py-4 bg-[#25D366] active:bg-[#1ebe5d] rounded-2xl text-white font-bold tracking-[0.04em] text-[15px] shadow-md transition-colors"
//               >
//                 <span className="flex items-center gap-2.5">
//                   <MessageCircle
//                     size={18}
//                     strokeWidth={2}
//                   />

//                   WHATSAPP
//                   ENQUIRY
//                 </span>

//                 <ArrowRight
//                   size={18}
//                 />
//               </a>

//               {/* Get Offer */}

//               <a
//                 href="#contact"
//                 onClick={(e) => {
//                   e.preventDefault();

//                   handleNav(
//                     CONTACT_LINK
//                   );
//                 }}
//                 className="w-full flex items-center justify-between px-6 py-4 bg-[#0055A5] active:bg-[#004488] rounded-2xl text-white font-bold tracking-[0.04em] text-[15px] shadow-md transition-colors"
//               >
//                 GET YOUR OFFER

//                 <ArrowRight
//                   size={18}
//                 />
//               </a>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* =====================================================
//           MOBILE STICKY BOTTOM BAR
//       ===================================================== */}

//       <div
//         className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
//         style={{
//           paddingBottom:
//             "env(safe-area-inset-bottom, 0px)",
//         }}
//       >
//         <div className="bg-white border-t border-gray-200 grid grid-cols-3 h-[64px] shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
//           {/* Call */}

//           <a
//             href={telHref}
//             onClick={
//               handleCallClick
//             }
//             className="flex flex-col items-center justify-center gap-1 text-gray-500 active:text-[#0055A5] transition-colors border-r border-gray-100"
//           >
//             <Phone
//               size={20}
//               strokeWidth={2}
//             />

//             <span className="text-[9px] uppercase tracking-wider font-bold">
//               Call Sales
//             </span>
//           </a>

//           {/* WhatsApp */}

//           <a
//             href={whatsappHref}
//             target="_blank"
//             rel="noopener noreferrer"
//             onClick={
//               handleWhatsAppClick
//             }
//             className="flex flex-col items-center justify-center gap-1 text-[#25D366] active:opacity-80 transition-opacity border-r border-gray-100"
//           >
//             <MessageCircle
//               size={20}
//               strokeWidth={2}
//             />

//             <span className="text-[9px] uppercase tracking-wider font-bold">
//               WhatsApp
//             </span>
//           </a>

//           {/* Get Offer */}

//           <a
//             href="#contact"
//             onClick={(e) => {
//               e.preventDefault();

//               handleNav(
//                 CONTACT_LINK
//               );
//             }}
//             className="flex flex-col items-center justify-center gap-1 bg-[#0055A5] active:bg-[#004488] text-white transition-colors"
//           >
//             <Gift
//               size={20}
//               strokeWidth={2}
//             />

//             <span className="text-[9px] uppercase tracking-wider font-bold">
//               Get Offer
//             </span>
//           </a>
//         </div>
//       </div>
//     </>
//   );
// }























// garud-tata/app/components/CampaignNavbar.tsx
"use client";

import { useState, useEffect, useCallback, memo, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Phone,
  Menu,
  X,
  ArrowRight,
  Gift,
  ChevronRight,
  ChevronDown,
  MapPin,
  MessageCircle,
  Copy,
  Check,
  Navigation,
} from "lucide-react";

import {
  showrooms,
  SHOWROOM_SLUGS,
  HOME_URL,
  type ShowroomSlug,
} from "@/app/config/showrooms";

import {
  trackCallClick,
  trackWhatsAppClick,
  trackCopyPhone,
} from "@/lib/tracking";

/* =========================================================
   TYPES
========================================================= */

export interface CampaignNavbarProps {
  phone?: string;
  vehicle?: string;
  logoSrc?: string;
  offerSectionId?: string;
}

/* =========================================================
   NAVIGATION TYPES
========================================================= */

type RouteNavLink = {
  label: string;
  href: string;
  type: "route";
  hash: null;
};

type HashNavLink = {
  label: string;
  href: string;
  type: "hash";
  hash: string;
};

type NavLink = RouteNavLink | HashNavLink;

/* =========================================================
   NAVIGATION LINKS
========================================================= */

const NAV_LINKS: NavLink[] = [
  { label: "Home",      href: "/",        type: "route", hash: null },
  { label: "Offers",    href: "#offers",  type: "hash",  hash: "offer-form" },
  { label: "Showrooms", href: "#showrooms", type: "hash", hash: "showrooms" },
  { label: "Service",   href: "#showrooms", type: "hash", hash: "showrooms" },
  { label: "PR & Blogs", href: "/blog", type: "route", hash: null },
  { label: "Contact",   href: "#contact", type: "hash",  hash: "contact" },
];

const CONTACT_LINK: HashNavLink = {
  label: "Contact",
  href: "#contact",
  type: "hash",
  hash: "contact",
};

/* =========================================================
   CONSTANTS
========================================================= */

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello! I would like to enquire about a new Tata car at Garud Tata. Could you please share details about availability, pricing, and current offers?"
);

const DISPLAY_PHONE = "+91 92173 71211";
const RAW_PHONE     = "919217371211";

/* =========================================================
   FRAMER MOTION VARIANTS
========================================================= */

const navContainerVariants: Variants = {
  hidden:  { opacity: 0, y: -20 },
  visible: {
    opacity: 1, y: 0,
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const navItemVariants: Variants = {
  hidden:  { opacity: 0, y: -8 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 320, damping: 26 },
  },
};

const dropdownVariants: Variants = {
  hidden:  { opacity: 0, y: -6, scale: 0.97 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 28 },
  },
  exit: { opacity: 0, y: -4, scale: 0.97, transition: { duration: 0.15 } },
};

/* =========================================================
   SHOWROOM INFO HOOK
   — "/"        → static Delhi badge, no dropdown
   — "/pr-blog" → static Delhi badge, no dropdown
   — showroom routes → switcher dropdown
========================================================= */

function useShowroomInfo() {
  const pathname = usePathname();

  if (pathname === "/" || pathname === "/pr-blog" || pathname.startsWith("/pr-blog/")) {
    return { cityName: "Delhi", currentSlug: null, isShowroomRoute: false };
  }

  const pathSlug    = pathname.split("/")[1] as ShowroomSlug;
  const isValid     = pathSlug && !!showrooms[pathSlug];
  const currentSlug = isValid ? pathSlug : null;
  const cityName    = currentSlug ? currentSlug.split("-").pop()! : "Delhi";

  return { cityName, currentSlug, isShowroomRoute: !!currentSlug };
}

/* =========================================================
   SHOWROOM SWITCHER DROPDOWN (desktop)
========================================================= */

const ShowroomSwitcher = memo(function ShowroomSwitcher({
  currentSlug,
  cityName,
  onSwitch,
}: {
  currentSlug: ShowroomSlug;
  cityName: string;
  onSwitch: (slug: ShowroomSlug) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const otherSlugs = SHOWROOM_SLUGS.filter((s) => s !== currentSlug);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-all duration-200 ${
          open
            ? "border-[#0055A5]/40 bg-[#0055A5]/10"
            : "border-[#0055A5]/20 bg-[#0055A5]/[0.06] hover:bg-[#0055A5]/10"
        }`}
      >
        <MapPin size={12} className="text-[#0055A5]" strokeWidth={2.5} />
        <span className="text-[11px] font-bold text-[#0055A5] tracking-[0.06em] uppercase">
          {cityName}
        </span>
        <ChevronDown
          size={11}
          strokeWidth={2.5}
          className={`text-[#0055A5] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute left-0 top-[calc(100%+8px)] z-[200] min-w-[220px] rounded-2xl border border-gray-100 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.10)] overflow-hidden"
          >
            {/* Current */}
            <div className="px-4 py-3 border-b border-gray-100 bg-[#0055A5]/[0.04]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                Current Showroom
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#0055A5]" />
                <span className="text-[13px] font-semibold text-[#0055A5]">
                  {showrooms[currentSlug].name}
                </span>
              </div>
            </div>

            {/* Switch */}
            <div className="px-3 py-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-1 pt-1 pb-2">
                Switch Showroom
              </p>
              {otherSlugs.map((slug) => {
                const city = slug.split("-").pop()!;
                const cfg  = showrooms[slug];
                return (
                  <button
                    key={slug}
                    type="button"
                    onClick={() => { setOpen(false); onSwitch(slug); }}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-[#0055A5]/[0.06] transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0055A5]/10 transition-colors">
                        <Navigation size={13} className="text-gray-400 group-hover:text-[#0055A5] transition-colors" strokeWidth={2} />
                      </div>
                      <div className="text-left">
                        <p className="text-[13px] font-semibold text-gray-800 group-hover:text-[#0055A5] transition-colors">
                          {city}
                        </p>
                        <p className="text-[11px] text-gray-400 truncate max-w-[130px]">
                          {cfg.outlets.find((o) => o.type === "showroom" && o.shortName === city)?.address?.split(",")[0] ?? cfg.footer.tagline}
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-[#0055A5] flex-shrink-0 transition-colors" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

/* =========================================================
   MOBILE SHOWROOM SWITCHER
========================================================= */

const MobileShowroomSwitcher = memo(function MobileShowroomSwitcher({
  currentSlug,
  onSwitch,
}: {
  currentSlug: ShowroomSlug;
  onSwitch: (slug: ShowroomSlug) => void;
}) {
  return (
    <div className="mx-0 mb-2 rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-4 py-3 bg-[#0055A5]/[0.04] border-b border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
          Current Showroom
        </p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#0055A5]" />
          <span className="text-[14px] font-semibold text-[#0055A5]">
            {showrooms[currentSlug].name}
          </span>
        </div>
      </div>
      <div className="p-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-2 pt-1 pb-2">
          Switch Showroom
        </p>
        {SHOWROOM_SLUGS.filter((s) => s !== currentSlug).map((slug) => {
          const city = slug.split("-").pop()!;
          const cfg  = showrooms[slug];
          return (
            <button
              key={slug}
              type="button"
              onClick={() => onSwitch(slug)}
              className="w-full flex items-center justify-between gap-3 px-3 py-3 rounded-xl active:bg-[#0055A5]/[0.06] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Navigation size={14} className="text-gray-400" strokeWidth={2} />
                </div>
                <div className="text-left">
                  <p className="text-[14px] font-semibold text-gray-800">{city}</p>
                  <p className="text-[11px] text-gray-400">
                    {cfg.outlets.find((o) => o.type === "showroom" && o.shortName === city)?.address?.split(",")[0] ?? cfg.footer.tagline}
                  </p>
                </div>
              </div>
              <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
            </button>
          );
        })}
      </div>
    </div>
  );
});

/* =========================================================
   CITY BADGE
========================================================= */

const CityBadge = memo(function CityBadge({
  cityName,
  size = "md",
}: {
  cityName: string;
  size?: "sm" | "md";
}) {
  const sm = size === "sm";
  return (
    <div className={`flex items-center gap-1.5 rounded-full border border-[#0055A5]/20 bg-[#0055A5]/[0.06] ${sm ? "px-2 py-1" : "px-3 py-1.5"}`}>
      <MapPin size={sm ? 10 : 12} className="text-[#0055A5]" strokeWidth={2.5} />
      <span className={`font-bold text-[#0055A5] tracking-[0.06em] uppercase ${sm ? "text-[10px]" : "text-[11px]"}`}>
        {cityName}
      </span>
    </div>
  );
});

/* =========================================================
   COPY BUTTON
========================================================= */

const CopyButton = memo(function CopyButton({
  onCopy,
  copied,
  size = "md",
}: {
  onCopy: () => void;
  copied: boolean;
  size?: "sm" | "md";
}) {
  const iconSize = size === "sm" ? 15 : 13;
  return (
    <button
      type="button"
      onClick={onCopy}
      title="Copy number"
      aria-label="Copy phone number"
      className={`text-gray-400 hover:text-[#0055A5] transition-colors ${
        size === "sm" ? "p-1.5 rounded-lg hover:bg-gray-200" : "px-3 py-2.5 hover:bg-gray-50"
      }`}
    >
      {copied
        ? <Check size={iconSize} className="text-green-500" strokeWidth={2.5} />
        : <Copy  size={iconSize} strokeWidth={2.5} />
      }
    </button>
  );
});

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CampaignNavbar({
  logoSrc = "/images/logo.jpg",
}: CampaignNavbarProps) {
  const router   = useRouter();
  const pathname = usePathname();

  const { cityName, currentSlug, isShowroomRoute } = useShowroomInfo();

  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [activeLink, setActiveLink] = useState<string>(() => {
    if (pathname === "/pr-blog" || pathname.startsWith("/pr-blog/")) return "/pr-blog";
    if (pathname === "/") return "/";
    return "";
  });
  const [copied, setCopied] = useState(false);

  const telHref      = `tel:+${RAW_PHONE}`;
  const whatsappHref = `https://wa.me/${RAW_PHONE}?text=${WHATSAPP_MESSAGE}`;

  /* =======================================================
     SHOWROOM SWITCH
  ======================================================= */

  const handleShowroomSwitch = useCallback(
    (slug: ShowroomSlug) => { setMenuOpen(false); router.push(`/${slug}`); },
    [router]
  );

  /* =======================================================
     SCROLL — navbar shrink
  ======================================================= */

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* =======================================================
     BODY SCROLL LOCK
  ======================================================= */

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  /* =======================================================
     ROUTE + HASH SYNC
  ======================================================= */

  useEffect(() => {
    const sync = () => {
      // PR & Blog — always active on those routes
      if (pathname === "/pr-blog" || pathname.startsWith("/pr-blog/")) {
        setActiveLink("/pr-blog");
        return;
      }

      const hash = window.location.hash;

      // On root with no hash → Home is active
      if (!hash && pathname === "/") {
        setActiveLink("/");
        return;
      }

      setActiveLink(hash || (pathname === "/" ? "/" : pathname));
    };

    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [pathname]);

  /* =======================================================
     INTERSECTION OBSERVER + SCROLL-TO-TOP RESET
  ======================================================= */

  useEffect(() => {
    // Skip on PR & Blog pages
    if (pathname === "/pr-blog" || pathname.startsWith("/pr-blog/")) return;

    const ids = Array.from(
      new Set(
        NAV_LINKS
          .filter((link): link is HashNavLink => link.type === "hash" && Boolean(link.hash))
          .map((link) => link.hash)
      )
    );

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    /* ── Reset to Home when scrolled above the first section ── */
    const resetToHomeOnTop = () => {
      const firstSection = sections[0];
      if (!firstSection) return;
      const rect = firstSection.getBoundingClientRect();
      // First section hasn't entered the viewport → user is at the very top
      if (rect.top > 120) {
        setActiveLink("/");
        if (window.location.hash) {
          window.history.replaceState(null, "", pathname);
        }
      }
    };

    /* ── Intersection observer for section tracking ── */
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const matched = NAV_LINKS.find(
            (link): link is HashNavLink =>
              link.type === "hash" && link.hash === entry.target.id
          );
          if (matched) {
            setActiveLink(matched.href);
            window.history.replaceState(null, "", matched.href);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));

    // Passive scroll listener to detect return to top
    const onScroll = () => resetToHomeOnTop();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Run once on mount in case page loads at the very top
    resetToHomeOnTop();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  /* =======================================================
     NAVIGATION HANDLER
  ======================================================= */

  const handleNav = useCallback(
    (link: NavLink) => {
      setMenuOpen(false);

      if (link.type === "route") {
        setActiveLink(link.href);
        router.push(link.href);
        return;
      }

      const targetId = link.hash || link.href.replace("#", "");
      const element  = document.getElementById(targetId);
      if (element) element.scrollIntoView({ behavior: "smooth" });

      window.history.pushState(null, "", link.href);
      setActiveLink(link.href);
    },
    [router]
  );

  /* =======================================================
     CONVERSION EVENTS
  ======================================================= */

  const handleCallClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      trackCallClick("campaign_navbar");
      window.location.href = telHref;
    },
    [telHref]
  );

  const handleWhatsAppClick = useCallback(() => {
    trackWhatsAppClick("campaign_navbar");
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(DISPLAY_PHONE)
      .then(() => {
        setCopied(true);
        trackCopyPhone("campaign_navbar");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => setCopied(false));
  }, []);

  const openMenu  = useCallback(() => setMenuOpen(true),  []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0,    opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Primary navigation"
        className={`fixed top-0 left-0 right-0 z-50 will-change-transform transition-all duration-500 ease-in-out border-b ${
          scrolled
            ? "h-[64px] bg-white/92 backdrop-blur-xl border-gray-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.05)]"
            : "h-[76px] bg-white/80 backdrop-blur-md border-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 lg:px-12 h-full flex items-center justify-between gap-4">

          {/* LOGO */}
          <a
            href={HOME_URL}
            className="relative z-10 flex-shrink-0 group"
            aria-label="Garud Tata — home"
          >
            <img
              src={logoSrc}
              alt="Garud Tata"
              width={240}
              height={76}
              className="h-[52px] w-auto sm:h-[58px] lg:h-[70px] object-contain object-left transition-transform duration-500 group-hover:scale-105"
            />
          </a>

          {/* LOCATION BADGE / SWITCHER — desktop */}
          <div className="hidden lg:flex flex-shrink-0">
            {isShowroomRoute && currentSlug
              ? <ShowroomSwitcher currentSlug={currentSlug} cityName={cityName} onSwitch={handleShowroomSwitch} />
              : <CityBadge cityName={cityName} size="md" />
            }
          </div>

          {/* DESKTOP NAV */}
          <motion.nav
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            aria-label="Site sections"
            className="hidden lg:flex items-center gap-1 h-full flex-1 justify-center"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeLink === link.href;
              return (
                <motion.a
                  key={link.label}
                  variants={navItemVariants}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNav(link); }}
                  className="relative px-4 py-2 rounded-full group cursor-pointer"
                  aria-current={isActive ? "page" : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[#0055A5]/10 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={`relative z-10 text-[13px] font-semibold tracking-[0.03em] transition-colors duration-200 ${
                    isActive ? "text-[#0055A5]" : "text-gray-600 group-hover:text-gray-900"
                  }`}>
                    {link.label}
                  </span>
                </motion.a>
              );
            })}
          </motion.nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">

            {/* Call + Copy */}
            <div className="flex items-center rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden">
              <a
                href={telHref}
                onClick={handleCallClick}
                className="group flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-gray-700 hover:text-gray-900 text-[13px] font-semibold tracking-wide transition-colors duration-150 border-r border-gray-100"
                aria-label={`Call ${DISPLAY_PHONE}`}
              >
                <Phone size={14} className="text-[#0055A5] group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                <span>
                  <span className="text-gray-400 text-[10px] uppercase tracking-wider mr-1.5 font-bold">Sales</span>
                  {DISPLAY_PHONE}
                </span>
              </a>
              <CopyButton onCopy={handleCopy} copied={copied} size="md" />
            </div>

            {/* WhatsApp */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full border border-green-200 bg-green-50 hover:bg-green-100 text-green-700 text-[13px] font-semibold tracking-wide transition-colors duration-150 shadow-sm"
              aria-label="WhatsApp enquiry"
            >
              <MessageCircle size={14} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
              WhatsApp
            </a>

            {/* Get Offer */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNav(CONTACT_LINK); }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0055A5] hover:bg-[#004488] text-white text-[13px] font-bold tracking-[0.05em] shadow-[0_4px_16px_rgba(0,85,165,0.3)] hover:shadow-[0_6px_22px_rgba(0,85,165,0.4)] hover:-translate-y-px transition-all duration-200"
            >
              GET OFFER
              <ArrowRight size={14} strokeWidth={2.5} />
            </a>
          </div>

          {/* MOBILE TOP BAR */}
          <div className="flex lg:hidden items-center gap-1.5">

            {isShowroomRoute && currentSlug
              ? (
                <div className="flex items-center gap-1 rounded-full border border-[#0055A5]/20 bg-[#0055A5]/[0.06] px-2 py-1">
                  <MapPin size={10} className="text-[#0055A5]" strokeWidth={2.5} />
                  <span className="text-[10px] font-bold text-[#0055A5] tracking-[0.06em] uppercase">{cityName}</span>
                </div>
              )
              : <CityBadge cityName={cityName} size="sm" />
            }

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              className="p-2 text-green-600 bg-green-50 rounded-full hover:bg-green-100 transition-colors"
              aria-label="WhatsApp enquiry"
            >
              <MessageCircle size={18} strokeWidth={2} />
            </a>

            <a
              href={telHref}
              onClick={handleCallClick}
              className="p-2 text-[#0055A5] bg-[#0055A5]/10 rounded-full hover:bg-[#0055A5]/20 transition-colors"
              aria-label={`Call ${DISPLAY_PHONE}`}
            >
              <Phone size={18} strokeWidth={2} />
            </a>

            <button
              type="button"
              onClick={openMenu}
              className="p-2 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* =====================================================
          MOBILE FULLSCREEN MENU
      ===================================================== */}

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-white flex flex-col lg:hidden overflow-y-auto overscroll-contain"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-gray-100 flex-shrink-0">
              <img
                src={logoSrc}
                alt="Garud Tata"
                width={130}
                height={38}
                className="h-[36px] w-auto object-contain object-left"
              />
              <button
                type="button"
                onClick={closeMenu}
                className="p-2.5 text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Showroom switcher — only on showroom routes */}
            {isShowroomRoute && currentSlug && (
              <div className="px-5 pt-5">
                <MobileShowroomSwitcher currentSlug={currentSlug} onSwitch={handleShowroomSwitch} />
              </div>
            )}

            {/* Nav links */}
            <nav className="flex-1 flex flex-col justify-center px-8 py-6 gap-1">
              {NAV_LINKS.map((link, index) => {
                const isActive = activeLink === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNav(link); }}
                    className="group flex items-center justify-between py-4 border-b border-gray-100 last:border-0 active:bg-gray-50 -mx-2 px-2 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-[10px] font-bold transition-colors ${isActive ? "text-[#0055A5]" : "text-gray-300"}`}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={`text-[1.75rem] font-bold tracking-tight ${isActive ? "text-[#0055A5]" : "text-gray-800"}`}>
                        {link.label}
                      </span>
                    </div>
                    <ChevronRight size={22} className={`flex-shrink-0 ${isActive ? "text-[#0055A5]" : "text-gray-300"}`} />
                  </a>
                );
              })}
            </nav>

            {/* Footer CTAs */}
            <div className="p-5 space-y-3 pb-[calc(84px+env(safe-area-inset-bottom,0px))] flex-shrink-0">

              <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">
                <Phone size={15} className="text-[#0055A5] flex-shrink-0" strokeWidth={2.5} />
                <a href={telHref} onClick={handleCallClick} className="flex-1 text-[15px] font-bold text-gray-800">
                  {DISPLAY_PHONE}
                </a>
                <CopyButton onCopy={handleCopy} copied={copied} size="sm" />
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="w-full flex items-center justify-between px-6 py-4 bg-[#25D366] active:bg-[#1ebe5d] rounded-2xl text-white font-bold tracking-[0.04em] text-[15px] shadow-md transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <MessageCircle size={18} strokeWidth={2} />
                  WHATSAPP ENQUIRY
                </span>
                <ArrowRight size={18} />
              </a>

              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleNav(CONTACT_LINK); }}
                className="w-full flex items-center justify-between px-6 py-4 bg-[#0055A5] active:bg-[#004488] rounded-2xl text-white font-bold tracking-[0.04em] text-[15px] shadow-md transition-colors"
              >
                GET YOUR OFFER
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          MOBILE STICKY BOTTOM BAR
      ===================================================== */}

      <div
        className="fixed bottom-0 left-0 right-0 z-[70] lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="bg-white border-t border-gray-200 grid grid-cols-3 h-[64px] shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">

          <a
            href={telHref}
            onClick={handleCallClick}
            className="flex flex-col items-center justify-center gap-1 text-gray-500 active:text-[#0055A5] transition-colors border-r border-gray-100"
          >
            <Phone size={20} strokeWidth={2} />
            <span className="text-[9px] uppercase tracking-wider font-bold">Call Sales</span>
          </a>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="flex flex-col items-center justify-center gap-1 text-[#25D366] active:opacity-80 transition-opacity border-r border-gray-100"
          >
            <MessageCircle size={20} strokeWidth={2} />
            <span className="text-[9px] uppercase tracking-wider font-bold">WhatsApp</span>
          </a>

          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNav(CONTACT_LINK); }}
            className="flex flex-col items-center justify-center gap-1 bg-[#0055A5] active:bg-[#004488] text-white transition-colors"
          >
            <Gift size={20} strokeWidth={2} />
            <span className="text-[9px] uppercase tracking-wider font-bold">Get Offer</span>
          </a>
        </div>
      </div>
    </>
  );
}