




// "use client";

// /*
//  * OfferDetailClient — zero programmatic scrolling.
//  *
//  * SCROLL CONTRACT (read before editing):
//  * ─────────────────────────────────────────────────────────────────────────────
//  * ✅ User has 100% control over the page scroll position at all times.
//  * ✅ handleGetOffer / handleTestDrive ONLY update React state.
//  *    They do NOT call: scrollIntoView · window.scrollTo · router.push("#…")
//  *    · document.documentElement.scrollTop · requestAnimationFrame + scroll
//  *    · any scroll API of any kind.
//  * ✅ No useEffect in this file touches the scroll position.
//  * ✅ No hash-based navigation is used anywhere in this component tree.
//  * ─────────────────────────────────────────────────────────────────────────────
//  */

// import { useState, useCallback } from "react";
// import type { TataOffer, VehicleDetail, EnquiryType } from "@/lib/tata-offers";


// import CarGallery from './Cargallery';

// import OfferBreakdown from './Offerbreakdown';
// import VehicleSpecs from './Vehiclespecs';
// import VehicleHighlights from './Vehiclehighlights';
// import OfferEnquiryForm from './Offerenquiryform';
// import  resolveHighlights  from "../../lib/tata-offers";
// interface OfferDetailClientProps {
//   offer:       TataOffer;
//   detail:      VehicleDetail;
//   images:      string[];
//   heroImage:   string | null;
//   defaultType: EnquiryType;
// }

// export default function OfferDetailClient({
//   offer,
//   detail,
//   images,
//   defaultType,
// }: OfferDetailClientProps) {
//   /*
//    * enquiryType drives which pill is pre-selected in <OfferEnquiryForm>.
//    * Changing it is the ONLY side-effect of the CTA buttons.
//    * There is no scroll, no focus, no navigation attached to this state.
//    */
//   const [enquiryType, setEnquiryType] = useState<EnquiryType>(defaultType);

//   // ✅ Sets enquiry type to "Get Offer" — nothing else.
//   const handleGetOffer = useCallback(() => {
//     setEnquiryType("Get Offer");
//   }, []);

//   // ✅ Sets enquiry type to "Test Drive" — nothing else.
//   const handleTestDrive = useCallback(() => {
//     setEnquiryType("Test Drive");
//   }, []);

//   const highlights = resolveHighlights(offer.id);

//   return (
//     <main>
//       {/*
//         CarGallery receives onGetOffer / onTestDrive.
//         These are ONLY called on explicit user clicks — they never fire automatically.
//         Inside CarGallery the thumbnail strip uses container.scrollTo() (not scrollIntoView)
//         so only the strip's internal scroll moves, never the page.
//       */}
//       <CarGallery
//         images={images}
//         alt={offer.model}
//         onGetOffer={handleGetOffer}
//         onTestDrive={handleTestDrive}
//       />

//       {/*
//         OfferBreakdown — NO id, NO scroll.
//         onGetOffer is passed so the "CLAIM THIS OFFER" button pre-selects
//         "Get Offer" in the form below. User still scrolls manually.
//       */}
//       <OfferBreakdown
//         offer={offer}
//         onGetOffer={handleGetOffer}
//       />

//       {/* VehicleSpecs — NO id, NO scroll. Pure display. */}
//       <VehicleSpecs
//         offer={offer}
//         detail={detail}
//       />

//       {/* VehicleHighlights — NO id, NO scroll. Pure display. */}
//       {highlights.length > 0 && (
//         <VehicleHighlights
//           offer={offer}
//           highlights={highlights}
//         />
//       )}

//       {/*
//         OfferEnquiryForm — NO id="enquiry", NO autoFocus, NO scroll.
//         defaultType is driven by enquiryType state above.
//         The form syncs via its own useEffect on the defaultType prop —
//         that effect only calls setForm(), never touches scroll.
//       */}
//       <OfferEnquiryForm
//         offer={offer}
//         defaultType={enquiryType}
//       />
//     </main>
//   );
// }







"use client";

import { useState, useCallback } from "react";

import type {
  TataOffer,
  VehicleDetail,
  EnquiryType,
} from "@/lib/tata-offers";

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
  /*
   * IMPORTANT:
   * This component contains ZERO programmatic scrolling.
   *
   * CTA buttons only update React state.
   * They do NOT:
   * - scrollTo()
   * - scrollIntoView()
   * - scrollBy()
   * - change scrollTop
   * - change URL hashes
   * - focus inputs
   */

  const [enquiryType, setEnquiryType] =
    useState<EnquiryType>(defaultType);

  const handleGetOffer = useCallback(() => {
    setEnquiryType("Get Offer");
  }, []);

  const handleTestDrive = useCallback(() => {
    setEnquiryType("Test Drive");
  }, []);

  return (
    <main className="min-h-screen">
      {/* Vehicle Gallery */}
      {images.length > 0 && (
        <CarGallery
          images={images}
          alt={offer.model}
          onGetOffer={handleGetOffer}
          onTestDrive={handleTestDrive}
        />
      )}

      {/* Offer Breakdown */}
      <OfferBreakdown
        offer={offer}
        onGetOffer={handleGetOffer}
      />

      {/* Vehicle Specifications */}
      <VehicleSpecs
        offer={offer}
        detail={detail}
      />

      {/* Vehicle Highlights */}
      {detail.highlights.length > 0 && (
        <VehicleHighlights
          offer={offer}
          highlights={detail.highlights}
        />
      )}

      {/* Enquiry Form */}
      <OfferEnquiryForm
        offer={offer}
        defaultType={enquiryType}
      />
    </main>
  );
}