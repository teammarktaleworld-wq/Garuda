// // 





// "use client";

// import { useState, useCallback } from "react";

// import type {
//   TataOffer,
//   VehicleDetail,
//   EnquiryType,
// } from "@/lib/tata-offers";

// import CarGallery from "./Cargallery";
// import OfferBreakdown from "./Offerbreakdown";
// import VehicleSpecs from "./Vehiclespecs";
// import VehicleHighlights from "./Vehiclehighlights";
// import OfferEnquiryForm from "./Offerenquiryform";

// interface OfferDetailClientProps {
//   offer: TataOffer;
//   detail: VehicleDetail;
//   images: string[];
//   heroImage: string | null;
//   defaultType: EnquiryType;
// }

// export default function OfferDetailClient({
//   offer,
//   detail,
//   images,
//   defaultType,
// }: OfferDetailClientProps) {
//   /*
//    * IMPORTANT:
//    * This component contains ZERO programmatic scrolling.
//    *
//    * CTA buttons only update React state.
//    * They do NOT:
//    * - scrollTo()
//    * - scrollIntoView()
//    * - scrollBy()
//    * - change scrollTop
//    * - change URL hashes
//    * - focus inputs
//    */

//   const [enquiryType, setEnquiryType] =
//     useState<EnquiryType>(defaultType);

//   const handleGetOffer = useCallback(() => {
//     setEnquiryType("Get Offer");
//   }, []);

//   const handleTestDrive = useCallback(() => {
//     setEnquiryType("Test Drive");
//   }, []);

//   return (
//     <main className="min-h-screen">
//       {/* Vehicle Gallery */}
//       {images.length > 0 && (
//         <CarGallery
//           images={images}
//           alt={offer.model}
//           onGetOffer={handleGetOffer}
//           onTestDrive={handleTestDrive}
//         />
//       )}

//       {/* Offer Breakdown */}
//       <OfferBreakdown
//         offer={offer}
//         onGetOffer={handleGetOffer}
//       />

//       {/* Vehicle Specifications */}
//       <VehicleSpecs
//         offer={offer}
//         detail={detail}
//       />

//       {/* Vehicle Highlights */}
//       {detail.highlights.length > 0 && (
//         <VehicleHighlights
//           offer={offer}
//           highlights={detail.highlights}
//         />
//       )}

//       {/* Enquiry Form */}
//       <OfferEnquiryForm
//         offer={offer}
//         defaultType={enquiryType}
//       />
//     </main>
//   );
// }








"use client";

import { useState, useCallback, useRef } from "react";
import type { TataOffer, VehicleDetail, EnquiryType } from "@/lib/tata-offers";

import CarGallery from "./Cargallery";
import OfferBreakdown from "./Offerbreakdown";
import VehicleSpecs from "./Vehiclespecs";
import VehicleHighlights from "./Vehiclehighlights";
import OfferEnquiryForm from "./Offerenquiryform";

interface OfferDetailClientProps {
  offer: TataOffer;
  detail: VehicleDetail;
  images: string[];
  heroImage: string | null;
  defaultType: EnquiryType;
}

export default function OfferDetailClient({
  offer,
  detail,
  images,
  defaultType,
}: OfferDetailClientProps) {
  const [enquiryType, setEnquiryType] = useState<EnquiryType>(defaultType);

  const offerBreakdownRef = useRef<HTMLDivElement>(null);
  const enquiryFormRef    = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleGetOffer = useCallback(() => {
    setEnquiryType("Get Offer");
    scrollTo(offerBreakdownRef);
  }, []);

  const handleTestDrive = useCallback(() => {
    setEnquiryType("Test Drive");
    scrollTo(enquiryFormRef);
  }, []);

  const handleClaimOffer = useCallback(() => {
    setEnquiryType("Get Offer");
    scrollTo(enquiryFormRef);
  }, []);

  return (
    <main className="min-h-screen">

      {images.length > 0 && (
        <CarGallery
          images={images}
          alt={offer.model}
          onGetOffer={handleGetOffer}
          onTestDrive={handleTestDrive}
        />
      )}

      <div ref={offerBreakdownRef} className="scroll-mt-20">
        <OfferBreakdown
          offer={offer}
          onGetOffer={handleClaimOffer}
        />
      </div>

      <VehicleSpecs offer={offer} detail={detail} />

      {detail.highlights.length > 0 && (
        <VehicleHighlights offer={offer} highlights={detail.highlights} />
      )}

      <div ref={enquiryFormRef} className="scroll-mt-20">
        <OfferEnquiryForm
          offer={offer}
          defaultType={enquiryType}
        />
      </div>

    </main>
  );
}