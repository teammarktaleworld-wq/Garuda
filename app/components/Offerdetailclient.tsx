// "use client";

// import { useState, useCallback, useEffect } from "react";
// import Link from "next/link";
// import { ArrowLeft, ChevronRight } from "lucide-react";
// import type { TataOffer, VehicleDetail, EnquiryType } from "@/lib/tata-offers";


// import OfferHero from './OfferHero';
// import CarGallery from './Cargallery';
// import OfferBreakdown from './Offerbreakdown';
// import VehicleHighlights from './Vehiclehighlights';
// import OfferEnquiryForm from './Offerenquiryform';
// import MobileOfferCTA from './Mobileoffercta';
// import VehicleSpecs from './Vehiclespecs';

// /* ── Analytics ── */
// declare global { interface Window { fbq?: (...a: unknown[]) => void; } }
// function fbTrack(event: string, params?: Record<string, string>) {
//   if (typeof window !== "undefined" && typeof window.fbq === "function") window.fbq("track", event, params);
// }

// interface Props {
//   offer:       TataOffer;
//   detail:      VehicleDetail;
//   images:      string[];
//   heroImage:   string | null;
//   defaultType: EnquiryType;
// }

// export default function OfferDetailClient({ offer, detail, images, heroImage, defaultType }: Props) {
//   const [enquiryType, setEnquiryType] = useState<EnquiryType>(defaultType);

//   // Fire analytics on mount
//   useEffect(() => {
//     fbTrack("ViewContent", { content_name: offer.model, offer_id: offer.id });
//     fbTrack("OfferDetailView", { offer_id: offer.id });
//   }, [offer.id, offer.model]);

//   const scrollToEnquiry = useCallback(() => {
//     document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
//   }, []);

//   const handleGetOffer = useCallback(() => {
//     fbTrack("OfferEnquiryStart", { offer_id: offer.id, type: "Get Offer" });
//     setEnquiryType("Get Offer");
//     setTimeout(scrollToEnquiry, 60);
//   }, [offer.id, scrollToEnquiry]);

//   const handleTestDrive = useCallback(() => {
//     fbTrack("TestDriveStart", { offer_id: offer.id });
//     setEnquiryType("Test Drive");
//     setTimeout(scrollToEnquiry, 60);
//   }, [offer.id, scrollToEnquiry]);

//   return (
//     <div className="min-h-screen bg-[#071020]">

//       {/* ── Breadcrumb ── */}
//       <div className="bg-[#071020] border-b border-white/[0.05] px-5 lg:px-12 py-3 sticky top-0 z-30 backdrop-blur-sm bg-[#071020]/90">
//         <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-[11px] text-white/35">
//           <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
//           <ChevronRight size={11} />
//           <Link href="/#offers" className="hover:text-white/60 transition-colors">Offers</Link>
//           <ChevronRight size={11} />
//           <span className="text-white/55 truncate max-w-[140px]">
//             {offer.model}{offer.variantLabel ? ` · ${offer.variantLabel}` : ""}
//           </span>
//         </div>
//       </div>

//       {/* ── Back link ── */}
//       <div className="max-w-[1440px] mx-auto px-5 lg:px-12 pt-5">
//         <Link
//           href="/#offers"
//           className="inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-[#5BA3E8] transition-colors duration-150"
//         >
//           <ArrowLeft size={13} /> Back to all offers
//         </Link>
//       </div>

//       {/* ── Hero ── */}
//       <OfferHero
//         offer={offer}
//         heroImage={heroImage ?? undefined}
//         onGetOffer={handleGetOffer}
//         onTestDrive={handleTestDrive}
//       />

//       {/* ── Gallery ── */}
//       {images.length > 0 && (
//         <CarGallery images={images} alt={offer.model} />
//       )}

//       {/* ── Offer breakdown ── */}
//       <OfferBreakdown offer={offer} onGetOffer={handleGetOffer} />

//       {/* ── Vehicle specs ── */}
//       <VehicleSpecs offer={offer} detail={detail} />

//       {/* ── Highlights ── */}
//       <VehicleHighlights offer={offer} highlights={detail.highlights} />

//       {/* ── Enquiry form ── */}
//       <OfferEnquiryForm offer={offer} defaultType={enquiryType} />

//       {/* ── Mobile sticky CTA ── */}
//       <MobileOfferCTA onGetOffer={handleGetOffer} onTestDrive={handleTestDrive} />

//       {/* Bottom spacing for mobile CTA */}
//       <div className="h-20 lg:h-0" />
//     </div>
//   );
// }














"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import type { TataOffer, VehicleDetail, EnquiryType } from "@/lib/tata-offers";

import CarGallery from './Cargallery';
import OfferBreakdown from './Offerbreakdown';
import VehicleHighlights from './Vehiclehighlights';
import OfferEnquiryForm from './Offerenquiryform';
import VehicleSpecs from './Vehiclespecs';

/* ── Analytics ── */
declare global { interface Window { fbq?: (...a: unknown[]) => void; } }
function fbTrack(event: string, params?: Record<string, string>) {
  if (typeof window !== "undefined" && typeof window.fbq === "function") window.fbq("track", event, params);
}

interface Props {
  offer:       TataOffer;
  detail:      VehicleDetail;
  images:      string[];
  heroImage:   string | null;
  defaultType: EnquiryType;
}

export default function OfferDetailClient({ offer, detail, images, heroImage, defaultType }: Props) {
  const [enquiryType, setEnquiryType] = useState<EnquiryType>(defaultType);

  useEffect(() => {
    fbTrack("ViewContent", { content_name: offer.model, offer_id: offer.id });
    fbTrack("OfferDetailView", { offer_id: offer.id });
  }, [offer.id, offer.model]);

  const scrollToEnquiry = useCallback(() => {
    document.getElementById("enquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleGetOffer = useCallback(() => {
    fbTrack("OfferEnquiryStart", { offer_id: offer.id, type: "Get Offer" });
    setEnquiryType("Get Offer");
    setTimeout(scrollToEnquiry, 60);
  }, [offer.id, scrollToEnquiry]);

  const handleTestDrive = useCallback(() => {
    fbTrack("TestDriveStart", { offer_id: offer.id });
    setEnquiryType("Test Drive");
    setTimeout(scrollToEnquiry, 60);
  }, [offer.id, scrollToEnquiry]);

  return (
    <div className="min-h-screen bg-[#071020]">

      {/* ── Breadcrumb ── */}
      <div className="bg-[#071020]/90 border-b border-white/[0.05] px-5 lg:px-12 py-3 sticky top-0 z-30 backdrop-blur-sm">
        <div className="max-w-[1440px] mx-auto flex items-center gap-2 text-[11px] text-white/35">
          <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
          <ChevronRight size={11} />
          <Link href="/#offers" className="hover:text-white/60 transition-colors">Offers</Link>
          <ChevronRight size={11} />
          <span className="text-white/55 truncate max-w-[140px]">
            {offer.model}{offer.variantLabel ? ` · ${offer.variantLabel}` : ""}
          </span>
        </div>
      </div>

      {/* ── Back link ── */}
      <div className="max-w-[1440px] mx-auto px-5 lg:px-12 pt-5">
        <Link
          href="/#offers"
          className="inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-[#5BA3E8] transition-colors duration-150"
        >
          <ArrowLeft size={13} /> Back to all offers
        </Link>
      </div>

      {/* ── 1. Gallery (top, full width) ── */}
      {images.length > 0 && (
        <CarGallery images={images} alt={offer.model} />
      )}

      {/* ── 2. Offer info block ── */}
      <OfferBreakdown offer={offer} onGetOffer={handleGetOffer} />
      <VehicleSpecs offer={offer} detail={detail} />
      <VehicleHighlights offer={offer} highlights={detail.highlights} />

      {/* ── 3. Enquiry form ── */}
      <OfferEnquiryForm offer={offer} defaultType={enquiryType} />

    </div>
  );
}