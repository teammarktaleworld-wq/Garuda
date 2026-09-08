"use client";

import { usePathname } from "next/navigation";
import CampaignNavbar from "./CampaignNavbar";

// Add any routes that use their own navbar here
const EXCLUDED_ROUTES = ["/landing-page"];

export default function GlobalNavbar() {
  const pathname = usePathname();

  const isExcluded = EXCLUDED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  if (isExcluded) return null;

  return <CampaignNavbar />;
}