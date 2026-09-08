
// // garud-tata\app\[showroom]\page.tsx
// import { notFound } from "next/navigation";
// import LandingPage from "../components/LandingPage";
// import { showrooms } from "../config/showrooms";

// interface PageProps {
//   params: Promise<{
//     showroom: string;
//   }>;
// }

// export default async function ShowroomPage({
//   params,
// }: PageProps) {
//   const { showroom } = await params;

//   const config =
//     showrooms[showroom as keyof typeof showrooms];

//   if (!config) {
//     notFound();
//   }

//   return <LandingPage showroom={config} />;
// }










import type { Metadata } from "next";
import { notFound } from "next/navigation";

import LandingPage from "../components/LandingPage";

import {
  showrooms,
  SHOWROOM_SLUGS,
  type ShowroomSlug,
} from "../config/showrooms";

interface PageProps {
  params: Promise<{
    showroom: string;
  }>;
}

/**
 * Generate all showroom pages at build time.
 *
 * Creates:
 * /Tata-Motors-Palam
 * /Tata-Motors-Narela
 * /Tata-Motors-Najafgarh
 */
export function generateStaticParams() {
  return SHOWROOM_SLUGS.map((slug) => ({
    showroom: slug,
  }));
}

/**
 * Generate unique SEO metadata for each showroom.
 *
 * The metadata comes from:
 * app/config/showrooms.ts
 */
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { showroom } = await params;

  const config = showrooms[showroom as ShowroomSlug];

  // If showroom doesn't exist, don't generate metadata.
  if (!config) {
    return {};
  }

  return {
    /**
     * Google Search Title
     */
    title: config.seo.title,

    /**
     * Google Search Description
     */
    description: config.seo.description,

    /**
     * Tell Google the preferred URL for this showroom.
     */
    alternates: {
      canonical: config.seo.canonical,
    },

    /**
     * Allow search engines to index and follow this page.
     */
    robots: {
      index: true,
      follow: true,
    },

    /**
     * Open Graph metadata for WhatsApp,
     * Facebook, LinkedIn, etc.
     */
    openGraph: {
      title: config.seo.title,
      description: config.seo.description,
      url: config.seo.canonical,
      siteName: "Garud Tata",
      type: "website",
      locale: "en_IN",
    },

    /**
     * Twitter/X metadata.
     */
    twitter: {
      card: "summary_large_image",
      title: config.seo.title,
      description: config.seo.description,
    },
  };
}

/**
 * Render the common landing page using
 * showroom-specific configuration.
 */
export default async function ShowroomPage({
  params,
}: PageProps) {
  const { showroom } = await params;

  const config = showrooms[showroom as ShowroomSlug];

  /**
   * Invalid showroom URL
   * → 404 page
   */
  if (!config) {
    notFound();
  }

  /**
   * Same LandingPage component,
   * different showroom data.
   */
  return <LandingPage showroom={config} />;
}
