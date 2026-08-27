

// // garud-tata\app\[showroom]\offers\[slug]\page.tsx

// import { notFound }    from "next/navigation";
// import type { Metadata } from "next";

// import OfferDetailClient from "@/app/components/Offerdetailclient";
// import {
//   OFFERS,
//   getOfferBySlug,
//   resolveVehicleDetail,
//   MODEL_GALLERY,
//   resolveGalleryKey,
// } from "@/lib/tata-offers";

// /*
//  * page.tsx — /offers/[slug]
//  *
//  * SCROLL CONTRACT:
//  * ─────────────────────────────────────────────────────────────────────────────
//  * ✅ searchParams is intentionally NOT destructured here.
//  *    The old ?type=TestDrive pattern was removed because the parent used to read
//  *    it and pass it to OfferDetailClient which would then scroll to the form.
//  *
//  * ✅ defaultType is hardcoded to "Get Offer".
//  *    The only way enquiryType changes is via an explicit user click on a CTA
//  *    button inside the page — never on route load.
//  *
//  * ✅ No window/document/history scroll APIs are called anywhere in this file.
//  * ─────────────────────────────────────────────────────────────────────────────
//  */

// export function generateStaticParams() {
//   return OFFERS
//     .filter(o => o.active)
//     .map(o => ({ slug: o.id }));
// }

// export async function generateMetadata(
//   { params }: { params: Promise<{ slug: string }> }
// ): Promise<Metadata> {
//   const { slug } = await params;
//   const offer    = getOfferBySlug(slug);

//   if (!offer) return { title: "Offer Not Found | Garud Tata" };

//   const variantPart = offer.variantLabel ? ` ${offer.variantLabel}` : "";
//   const benefitPart = `Up to ₹${(offer.totalBenefit / 1000).toFixed(0)},000 Benefits`;
//   const title       = `${offer.model}${variantPart} Offers | ${benefitPart} | Garud Tata`;
//   const description = `Explore the latest ${offer.model}${variantPart} offer at Garud Tata, New Delhi. Get exchange, scrappage and consumer benefits up to ${benefitPart.toLowerCase()} and book a test drive today.`;

//   const gallery = MODEL_GALLERY[resolveGalleryKey(offer.id)] ?? [];
//   const ogImage = gallery[0];

//   return {
//     title,
//     description,
//     alternates: {
//       canonical: `https://garudtata.com/offers/${offer.id}`,
//     },
//     openGraph: {
//       title,
//       description,
//       url:      `https://garudtata.com/offers/${offer.id}`,
//       siteName: "Garud Tata",
//       ...(ogImage
//         ? { images: [{ url: ogImage, alt: `${offer.model} at Garud Tata` }] }
//         : {}),
//     },
//   };
// }

// export default async function OfferDetailPage(
//   { params }: { params: Promise<{ slug: string }> }
//   // ✅ searchParams intentionally omitted — the old ?type= param was the
//   //    original trigger for auto-scroll behavior. It is not used here.
// ) {
//   const { slug } = await params;
//   const offer    = getOfferBySlug(slug);

//   if (!offer) notFound();

//   const detail   = resolveVehicleDetail(offer.id);
//   const galleryKey = resolveGalleryKey(offer.id);
//   const images   = MODEL_GALLERY[galleryKey] ?? [];
//   const heroImage = images[0] ?? null;

//   return (
//     <OfferDetailClient
//       offer={offer}
//       detail={detail}
//       images={images}
//       heroImage={heroImage}
//       defaultType="Get Offer"
//       // ✅ Always "Get Offer" on page load.
//       //    Never "Test Drive" — that would have caused the old scroll-to-form behavior.
//     />
//   );
// }










// garud-tata\app\[showroom]\offers\[slug]\page.tsx

import { notFound }    from "next/navigation";
import type { Metadata } from "next";

import OfferDetailClient from "@/app/components/Offerdetailclient";
import {
  OFFERS,
  getOfferBySlug,
  resolveVehicleDetail,
  MODEL_GALLERY,
  resolveGalleryKey,
} from "@/lib/tata-offers";
import { SHOWROOM_SLUGS } from "@/app/config/showrooms";

export function generateStaticParams() {
  return OFFERS
    .filter(o => o.active)
    .flatMap(o =>
      SHOWROOM_SLUGS.map(s => ({ showroom: s, slug: o.id }))
    );
}

export async function generateMetadata(
  { params }: { params: Promise<{ showroom: string; slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const offer    = getOfferBySlug(slug);

  if (!offer) return { title: "Offer Not Found | Garud Tata" };

  const variantPart = offer.variantLabel ? ` ${offer.variantLabel}` : "";
  const benefitPart = `Up to ₹${(offer.totalBenefit / 1000).toFixed(0)},000 Benefits`;
  const title       = `${offer.model}${variantPart} Offers | ${benefitPart} | Garud Tata`;
  const description = `Explore the latest ${offer.model}${variantPart} offer at Garud Tata, New Delhi. Get exchange, scrappage and consumer benefits up to ${benefitPart.toLowerCase()} and book a test drive today.`;

  const gallery = MODEL_GALLERY[resolveGalleryKey(offer.id)] ?? [];
  const ogImage = gallery[0];

  return {
    title,
    description,
    alternates: {
      canonical: `https://garudtata.com/offers/${offer.id}`,
    },
    openGraph: {
      title,
      description,
      url:      `https://garudtata.com/offers/${offer.id}`,
      siteName: "Garud Tata",
      ...(ogImage
        ? { images: [{ url: ogImage, alt: `${offer.model} at Garud Tata` }] }
        : {}),
    },
  };
}

export default async function OfferDetailPage(
  { params }: { params: Promise<{ showroom: string; slug: string }> }
) {
  const { slug } = await params;
  const offer    = getOfferBySlug(slug);

  if (!offer) notFound();

  const detail     = resolveVehicleDetail(offer.id);
  const galleryKey = resolveGalleryKey(offer.id);
  const images     = MODEL_GALLERY[galleryKey] ?? [];
  const heroImage  = images[0] ?? null;

  return (
    <OfferDetailClient
      offer={offer}
      detail={detail}
      images={images}
      heroImage={heroImage}
      defaultType="Get Offer"
    />
  );
}