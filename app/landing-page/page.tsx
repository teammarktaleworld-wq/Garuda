// garud-tata\app\landing-page\page.tsx

import CampaignNavbar from "../components/landing-page-comp/landingpagenavbar";
import HeroSection from "../components/landing-page-comp/landingHerosection";
import Contact from './../components/landing-page-comp/landingpagecontact';

export default function LandingPage() {
  return (
    <main>
      <CampaignNavbar />
      <HeroSection />
      <Contact />
    </main>
  );
}