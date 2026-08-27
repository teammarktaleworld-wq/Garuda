// garud-tata\app\[showroom]\offers\layout.tsx
import CampaignNavbar from "@/app/components/CampaignNavbar";
import GarudChatbot from "../../components/Garudchatbot";

export default function OffersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Permanent Offer Campaign Navbar */}
      <CampaignNavbar
        phone="+919217371204"
        offerSectionId="offers"
      />
      <GarudChatbot />

      {/* Space reserved for fixed navbar */}
      <main className="pt-[80px]">
        {children}
      </main>
    </>
  );
}