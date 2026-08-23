// app/offers/layout.tsx

import CampaignNavbar from "@/app/components/CampaignNavbar";

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Permanent Offer Campaign Navbar */}
      <CampaignNavbar
        phone="+919876543210"
        offerSectionId="offers"
      />

      {/* Space reserved for fixed navbar */}
      <main className="pt-[80px]">
        {children}
      </main>
    </>
  );
}