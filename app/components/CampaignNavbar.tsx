
// garud-tata\app\components\CampaignNavbar.tsx

"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Phone,
  Menu,
  X,
  ArrowRight,
  Gift,
  ChevronRight,
  MapPin,
  MessageCircle,
  Copy,
  Check,
} from "lucide-react";
import { showrooms, HOME_URL } from "@/app/config/showrooms";

/* =========================================================
   TYPES
========================================================= */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export interface CampaignNavbarProps {
  phone?: string;
  vehicle?: string;
  logoSrc?: string;
  offerSectionId?: string;
  gmbImage?: string;
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
  {
    label: "Home",
    href: "/",
    type: "route",
    hash: null,
  },
  {
    label: "Offers",
    href: "#offers",
    type: "hash",
    hash: "offer-form",
  },
  {
    label: "Showrooms",
    href: "#showrooms",
    type: "hash",
    hash: "showrooms",
  },
  {
    label: "Service",
    href: "#showrooms",
    type: "hash",
    hash: "showrooms",
  },
  {
    label: "Contact",
    href: "#contact",
    type: "hash",
    hash: "contact",
  },
];

const CONTACT_LINK: HashNavLink = {
  label: "Contact",
  href: "#contact",
  type: "hash",
  hash: "contact",
};

/* =========================================================
   WHATSAPP
========================================================= */

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello! I would like to enquire about a new Tata car at Garud Tata. Could you please share details about availability, pricing, and current offers?"
);

/* =========================================================
   PHONE
========================================================= */

const DISPLAY_PHONE = "+91 92173 71211";

/* =========================================================
   FRAMER MOTION VARIANTS
========================================================= */

const navContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.15,
    },
  },
};

const navItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -8,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 320,
      damping: 26,
    },
  },
};

/* =========================================================
   GOOGLE ADS CALL CONVERSION
========================================================= */

function fireCallConversion(url: string) {
  const navigate = () => {
    window.location.href = url;
  };

  // Google Ads "Nav Sales button" conversion
  // Conversion ID: AW-18209967669
  // Conversion label: 25aMCKmSteocELWcmOtD
  if (typeof window.gtag !== "function") {
    navigate();
    return;
  }

  window.gtag("event", "conversion", {
    send_to: "AW-18209967669/25aMCKmSteocELWcmOtD",
    value: 1.0,
    currency: "INR",
    event_callback: navigate,
    event_timeout: 2000,
  });
}

/* =========================================================
   CITY INFORMATION
========================================================= */

function useCityInfo() {
  const pathname = usePathname();

  const pathSlug = pathname.split("/")[1] as keyof typeof showrooms;

  const slug =
    pathSlug && showrooms[pathSlug]
      ? pathSlug
      : "palam";

  const config = showrooms[slug];

  return {
    cityName: config.name.split(" ").pop() ?? slug,
    gmbImage: config.navbar.gmbImage as string | null,
  };
}

/* =========================================================
   CITY BADGE
========================================================= */

const CityBadge = memo(function CityBadge({
  cityName,
  gmbImage,
  size = "md",
}: {
  cityName: string;
  gmbImage: string | null;
  size?: "sm" | "md";
}) {
  const sm = size === "sm";

  return (
    <div
      className={`flex items-center gap-1.5 rounded-full border border-[#0055A5]/20 bg-[#0055A5]/[0.06] ${
        sm ? "px-2 py-1" : "px-3 py-1.5"
      }`}
    >
      {gmbImage ? (
        <img
          src={gmbImage}
          alt={cityName}
          width={sm ? 20 : 24}
          height={sm ? 20 : 24}
          className={`rounded-full object-cover flex-shrink-0 ${
            sm ? "w-5 h-5" : "w-6 h-6"
          }`}
        />
      ) : (
        <MapPin
          size={sm ? 10 : 12}
          className="text-[#0055A5]"
          strokeWidth={2.5}
        />
      )}

      <span
        className={`font-bold text-[#0055A5] tracking-[0.06em] uppercase ${
          sm ? "text-[10px]" : "text-[11px]"
        }`}
      >
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
        size === "sm"
          ? "p-1.5 rounded-lg hover:bg-gray-200"
          : "px-3 py-2.5 hover:bg-gray-50"
      }`}
    >
      {copied ? (
        <Check
          size={iconSize}
          className="text-green-500"
          strokeWidth={2.5}
        />
      ) : (
        <Copy
          size={iconSize}
          strokeWidth={2.5}
        />
      )}
    </button>
  );
});

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CampaignNavbar({
  phone = "919217371211",
  logoSrc = "/images/logo.jpg",
  gmbImage,
}: CampaignNavbarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const {
    cityName,
    gmbImage: configGmbImage,
  } = useCityInfo();

  const resolvedGmbImage =
    gmbImage ?? configGmbImage;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("/");
  const [copied, setCopied] = useState(false);

  /* =======================================================
     PHONE LINKS
  ======================================================= */

  const rawPhone = phone.replace(/\D/g, "");

  const telHref = `tel:+${rawPhone}`;

  const whatsappHref =
    `https://wa.me/${rawPhone}?text=${WHATSAPP_MESSAGE}`;

  /* =======================================================
     SCROLL LISTENER
  ======================================================= */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* =======================================================
     BODY SCROLL LOCK
  ======================================================= */

  useEffect(() => {
    document.body.style.overflow = menuOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* =======================================================
     HASH SYNC
  ======================================================= */

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash;

      setActiveLink(
        hash ||
          (pathname === "/"
            ? "/"
            : pathname)
      );
    };

    sync();

    window.addEventListener(
      "hashchange",
      sync
    );

    return () => {
      window.removeEventListener(
        "hashchange",
        sync
      );
    };
  }, [pathname]);

  /* =======================================================
     INTERSECTION OBSERVER
  ======================================================= */

  useEffect(() => {
    const ids = Array.from(
      new Set(
        NAV_LINKS
          .filter(
            (link): link is HashNavLink =>
              link.type === "hash" &&
              Boolean(link.hash)
          )
          .map((link) => link.hash)
      )
    );

    const sections = ids
      .map((id) =>
        document.getElementById(id)
      )
      .filter(
        (element): element is HTMLElement =>
          Boolean(element)
      );

    if (!sections.length) {
      return;
    }

    const observer =
      new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) {
              continue;
            }

            const matched =
              NAV_LINKS.find(
                (link): link is HashNavLink =>
                  link.type === "hash" &&
                  link.hash === entry.target.id
              );

            if (matched) {
              setActiveLink(matched.href);

              window.history.replaceState(
                null,
                "",
                matched.href
              );
            }
          }
        },
        {
          rootMargin:
            "-20% 0px -60% 0px",
          threshold: 0,
        }
      );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
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

      const targetId =
        link.hash ||
        link.href.replace("#", "");

      const element =
        document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }

      window.history.pushState(
        null,
        "",
        link.href
      );

      setActiveLink(link.href);
    },
    [router]
  );

  /* =======================================================
     COPY PHONE NUMBER
  ======================================================= */

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(DISPLAY_PHONE)
      .then(() => {
        setCopied(true);

        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch(() => {
        setCopied(false);
      });
  }, []);

  /* =======================================================
     MENU HANDLERS
  ======================================================= */

  const openMenu = useCallback(
    () => setMenuOpen(true),
    []
  );

  const closeMenu = useCallback(
    () => setMenuOpen(false),
    []
  );

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <motion.nav
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.55,
          ease: [0.16, 1, 0.3, 1],
        }}
        aria-label="Primary navigation"
        className={`fixed top-0 left-0 right-0 z-50 will-change-transform transition-all duration-500 ease-in-out border-b ${
          scrolled
            ? "h-[64px] bg-white/92 backdrop-blur-xl border-gray-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.05)]"
            : "h-[76px] bg-white/80 backdrop-blur-md border-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-5 lg:px-12 h-full flex items-center justify-between gap-4">

          {/* =================================================
              LOGO
          ================================================= */}

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

          {/* =================================================
              CITY BADGE
          ================================================= */}

          <div className="hidden lg:flex flex-shrink-0">
            <CityBadge
              cityName={cityName}
              gmbImage={resolvedGmbImage}
              size="md"
            />
          </div>

          {/* =================================================
              DESKTOP NAV
          ================================================= */}

          <motion.nav
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            aria-label="Site sections"
            className="hidden lg:flex items-center gap-1 h-full flex-1 justify-center"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                activeLink === link.href;

              return (
                <motion.a
                  key={link.label}
                  variants={navItemVariants}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNav(link);
                  }}
                  className="relative px-4 py-2 rounded-full group cursor-pointer"
                  aria-current={
                    isActive
                      ? "page"
                      : undefined
                  }
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-[#0055A5]/10 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 32,
                      }}
                    />
                  )}

                  <span
                    className={`relative z-10 text-[13px] font-semibold tracking-[0.03em] transition-colors duration-200 ${
                      isActive
                        ? "text-[#0055A5]"
                        : "text-gray-600 group-hover:text-gray-900"
                    }`}
                  >
                    {link.label}
                  </span>
                </motion.a>
              );
            })}
          </motion.nav>

          {/* =================================================
              DESKTOP ACTIONS
          ================================================= */}

          <div className="hidden lg:flex items-center gap-2 flex-shrink-0">

            {/* Call + Copy */}
            <div className="flex items-center rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden">
              <a
                href={telHref}
                onClick={(event) => {
                  event.preventDefault();
                  fireCallConversion(telHref);
                }}
                className="group flex items-center gap-2 px-4 py-2.5 hover:bg-gray-50 text-gray-700 hover:text-gray-900 text-[13px] font-semibold tracking-wide transition-colors duration-150 border-r border-gray-100"
                aria-label={`Call ${DISPLAY_PHONE}`}
              >
                <Phone
                  size={14}
                  className="text-[#0055A5] group-hover:scale-110 transition-transform"
                  strokeWidth={2.5}
                />

                <span>
                  <span className="text-gray-400 text-[10px] uppercase tracking-wider mr-1.5 font-bold">
                    Sales
                  </span>

                  {DISPLAY_PHONE}
                </span>
              </a>

              <CopyButton
                onCopy={handleCopy}
                copied={copied}
                size="md"
              />
            </div>

            {/* WhatsApp */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2.5 rounded-full border border-green-200 bg-green-50 hover:bg-green-100 text-green-700 text-[13px] font-semibold tracking-wide transition-colors duration-150 shadow-sm"
              aria-label="WhatsApp enquiry"
            >
              <MessageCircle
                size={14}
                strokeWidth={2.5}
                className="group-hover:scale-110 transition-transform"
              />

              WhatsApp
            </a>

            {/* Get Offer */}
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                handleNav(CONTACT_LINK);
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0055A5] hover:bg-[#004488] text-white text-[13px] font-bold tracking-[0.05em] shadow-[0_4px_16px_rgba(0,85,165,0.3)] hover:shadow-[0_6px_22px_rgba(0,85,165,0.4)] hover:-translate-y-px transition-all duration-200"
            >
              GET OFFER

              <ArrowRight
                size={14}
                strokeWidth={2.5}
              />
            </a>
          </div>

          {/* =================================================
              MOBILE TOP BAR
          ================================================= */}

          <div className="flex lg:hidden items-center gap-1.5">

            <CityBadge
              cityName={cityName}
              gmbImage={resolvedGmbImage}
              size="sm"
            />

            {/* WhatsApp */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-green-600 bg-green-50 rounded-full hover:bg-green-100 transition-colors"
              aria-label="WhatsApp enquiry"
            >
              <MessageCircle
                size={18}
                strokeWidth={2}
              />
            </a>

            {/* Call */}
            <a
              href={telHref}
              onClick={(event) => {
                  event.preventDefault();
                  fireCallConversion(telHref);
                }}
              className="p-2 text-[#0055A5] bg-[#0055A5]/10 rounded-full hover:bg-[#0055A5]/20 transition-colors"
              aria-label={`Call ${DISPLAY_PHONE}`}
            >
              <Phone
                size={18}
                strokeWidth={2}
              />
            </a>

            {/* Menu */}
            <button
              type="button"
              onClick={openMenu}
              className="p-2 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              aria-label="Open menu"
            >
              <Menu
                size={20}
                strokeWidth={2}
              />
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
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed inset-0 z-[80] bg-white flex flex-col lg:hidden overflow-y-auto overscroll-contain"
          >

            {/* Header */}
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-gray-100 flex-shrink-0">

              <div className="flex items-center gap-3">
                <img
                  src={logoSrc}
                  alt="Garud Tata"
                  width={130}
                  height={38}
                  className="h-[36px] w-auto object-contain object-left"
                />

                {cityName &&
                  resolvedGmbImage && (
                    <CityBadge
                      cityName={cityName}
                      gmbImage={resolvedGmbImage}
                      size="sm"
                    />
                  )}
              </div>

              <button
                type="button"
                onClick={closeMenu}
                className="p-2.5 text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X
                  size={20}
                  strokeWidth={2.5}
                />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 flex flex-col justify-center px-8 py-8 gap-1">
              {NAV_LINKS.map(
                (link, index) => {
                  const isActive =
                    activeLink === link.href;

                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={(event) => {
                        event.preventDefault();
                        handleNav(link);
                      }}
                      className="group flex items-center justify-between py-4 border-b border-gray-100 last:border-0 active:bg-gray-50 -mx-2 px-2 rounded-xl transition-colors"
                    >
                      <div className="flex items-center gap-4">

                        <span
                          className={`text-[10px] font-bold transition-colors ${
                            isActive
                              ? "text-[#0055A5]"
                              : "text-gray-300"
                          }`}
                        >
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </span>

                        <span
                          className={`text-[1.75rem] font-bold tracking-tight ${
                            isActive
                              ? "text-[#0055A5]"
                              : "text-gray-800"
                          }`}
                        >
                          {link.label}
                        </span>
                      </div>

                      <ChevronRight
                        size={22}
                        className={`flex-shrink-0 ${
                          isActive
                            ? "text-[#0055A5]"
                            : "text-gray-300"
                        }`}
                      />
                    </a>
                  );
                }
              )}
            </nav>

            {/* Mobile Footer CTAs */}
            <div className="p-5 space-y-3 pb-[calc(84px+env(safe-area-inset-bottom,0px))] flex-shrink-0">

              {/* Number + Copy */}
              <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3">

                <Phone
                  size={15}
                  className="text-[#0055A5] flex-shrink-0"
                  strokeWidth={2.5}
                />

                <a
                  href={telHref}
                  onClick={(event) => {
                  event.preventDefault();
                  fireCallConversion(telHref);
                }}
                  className="flex-1 text-[15px] font-bold text-gray-800"
                >
                  {DISPLAY_PHONE}
                </a>

                <CopyButton
                  onCopy={handleCopy}
                  copied={copied}
                  size="sm"
                />
              </div>

              {/* WhatsApp */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-between px-6 py-4 bg-[#25D366] active:bg-[#1ebe5d] rounded-2xl text-white font-bold tracking-[0.04em] text-[15px] shadow-md transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <MessageCircle
                    size={18}
                    strokeWidth={2}
                  />

                  WHATSAPP ENQUIRY
                </span>

                <ArrowRight size={18} />
              </a>

              {/* Get Offer */}
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  handleNav(CONTACT_LINK);
                }}
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
        style={{
          paddingBottom:
            "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div className="bg-white border-t border-gray-200 grid grid-cols-3 h-[64px] shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">

          {/* Call */}
          <a
            href={telHref}
            onClick={(event) => {
                  event.preventDefault();
                  fireCallConversion(telHref);
                }}
            className="flex flex-col items-center justify-center gap-1 text-gray-500 active:text-[#0055A5] transition-colors border-r border-gray-100"
          >
            <Phone
              size={20}
              strokeWidth={2}
            />

            <span className="text-[9px] uppercase tracking-wider font-bold">
              Call Sales
            </span>
          </a>

          {/* WhatsApp */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-1 text-[#25D366] active:opacity-80 transition-opacity border-r border-gray-100"
          >
            <MessageCircle
              size={20}
              strokeWidth={2}
            />

            <span className="text-[9px] uppercase tracking-wider font-bold">
              WhatsApp
            </span>
          </a>

          {/* Get Offer */}
          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              handleNav(CONTACT_LINK);
            }}
            className="flex flex-col items-center justify-center gap-1 bg-[#0055A5] active:bg-[#004488] text-white transition-colors"
          >
            <Gift
              size={20}
              strokeWidth={2}
            />

            <span className="text-[9px] uppercase tracking-wider font-bold">
              Get Offer
            </span>
          </a>
        </div>
      </div>
    </>
  );
}