// app/offers/[slug]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import OfferDetailClient from "@/app/components/Offerdetailclient";
import { OFFERS, getOfferBySlug, resolveVehicleDetail, MODEL_GALLERY, resolveGalleryKey } from "@/lib/tata-offers";

// ── Static generation ─────────────────────────────────────────────────────────
export function generateStaticParams() {
  return OFFERS
    .filter(o => o.active)
    .map(o => ({ slug: o.id }));
}

// ── Dynamic metadata ──────────────────────────────────────────────────────────
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const offer = getOfferBySlug(slug);

  if (!offer) {
    return { title: "Offer Not Found | Garud Tata" };
  }

  const variantPart = offer.variantLabel ? ` ${offer.variantLabel}` : "";
  const benefitPart = `Up to ₹${(offer.totalBenefit / 1000).toFixed(0)},000 Benefits`;
  const title = `${offer.model}${variantPart} Offers | ${benefitPart} | Garud Tata`;
  const description = `Explore the latest ${offer.model}${variantPart} offer at Garud Tata, New Delhi. Get exchange, scrappage and consumer benefits up to ${benefitPart.toLowerCase()} and book a test drive today.`;

  const detail = resolveVehicleDetail(offer.id);
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
      url: `https://garudtata.com/offers/${offer.id}`,
      siteName: "Garud Tata",
      ...(ogImage ? { images: [{ url: ogImage, alt: `${offer.model} at Garud Tata` }] } : {}),
    },
  };
}

// ── Server component ──────────────────────────────────────────────────────────
export default async function OfferDetailPage(
  { params, searchParams }: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ type?: string }>;
  }
) {
  const { slug } = await params;
  const { type: typeParam } = await searchParams;
  const offer = getOfferBySlug(slug);

  if (!offer) notFound();

  const detail = resolveVehicleDetail(offer.id);
  const galleryKey = resolveGalleryKey(offer.id);
  const images = MODEL_GALLERY[galleryKey] ?? [];
  const heroImage = images[0] ?? null;
  const defaultType = typeParam === "test-drive" ? "Test Drive" as const : "Get Offer" as const;

  return (

    <OfferDetailClient
      offer={offer}
      detail={detail}
      images={images}
      heroImage={heroImage}
      defaultType={defaultType}
    />
  );
}