
// app/components/LandingPage.tsx
"use client";

import type { ShowroomConfig } from "@/app/config/showrooms";
import CampaignNavbar from "./CampaignNavbar";
import OfferHero from "./OfferHero";
import WhyGarudTata from "./WhyGarudTata";
import Offers from "./Offers";
import About from "./About";
import Showroom from "./Showroom";
import Contact from "./Contact";
import Footer from "./Footer";
import GarudChatbot from "./Garudchatbot";

interface LandingPageProps {
  showroom: ShowroomConfig;
}

export default function LandingPage({ showroom }: LandingPageProps) {
  return (
    <main>
      <CampaignNavbar
        phone={showroom.phone}
        offerSectionId="offer-form"
      />

      <OfferHero
        phone={showroom.phone}
        whatsappNumber={showroom.whatsappNumber}
        offerSectionId="offer-form"
        backgroundImage={showroom.hero.backgroundImage}
        backgroundVideo={showroom.hero.backgroundVideo}
      />

      <div id="offer-form">
        {/* ✅ pass slug so Offers builds correct /palam/offers/... links */}
        <Offers showroomSlug={showroom.slug} />
      </div>

      <WhyGarudTata />
      <About />

      <div id="showrooms">
        <Showroom
          outlets={showroom.outlets}
          cityName={showroom.name}
        />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <Footer />
      <GarudChatbot />
    </main>
  );
}