

import CampaignNavbar from "./components/CampaignNavbar";
import OfferHero from "./components/OfferHero";
import VehicleShowcase from "./components/VehicleShowcase";
import VehicleGrid from "./components/VehicleGrid";
import FeaturedVehicle from "./components/FeaturedVehicle";
import WhyGarudTata from "./components/WhyGarudTata";
import Offers from "./components/Offers";
import TestDrive from "./components/TestDrive";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import FinanceCalculator from "./components/FinanceCalculator";
import Showroom from "./components/Showroom";
import Gallery from "./components/Gallery";
import Contact from "./components/Contact";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import GarudChatbot from "./components/Garudchatbot";

export default function Home() {
  return (
    <main>
      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <CampaignNavbar
        phone="+919217371204"
    
        offerSectionId="offer-form"
        // logoSrc="/images/logo.png"
      />

      {/* ── Hero (text-only, no image/video props) ───────────────────────
          vehicle    → uncomment for vehicle-specific campaigns e.g. "Nexon"
          offerValue → pass ONLY if you have a verified figure e.g. "₹2,40,000"
                       leave undefined to show "SPECIAL BENEFITS AVAILABLE"
      ─────────────────────────────────────────────────────────────────── */}
      <OfferHero
        phone="+919876543210"
        whatsappNumber="919876543210"
        offerSectionId="offer-form"
        backgroundImage="/images/vehicles/sierrakv-3.avif"
        backgroundVideo="/video/vidssave.com Sierra _ Glimpse 2 _ The Legend Returns 720P.mp4"
        // vehicle="Nexon"
        // offerValue="₹50,000"
        // headlineLine1="Drive Home Your"
        // headlineLine2="Tata Nexon."
      />

      {/* ── Offers + lead form ──────────────────────────────────────────── */}
      <div id="offer-form">
        <Offers />
      </div>

      {/* <VehicleShowcase /> */}
{/* 
      <div id="cars">
        <VehicleGrid />
      </div> */}

      {/* <FeaturedVehicle /> */}
      <WhyGarudTata />

      {/* <div id="test-drive">
        <TestDrive />
      </div> */}

      <About />
      {/* <Testimonials /> */}
      {/* <FinanceCalculator /> */}

      <div id="showrooms">
        <Showroom />
      </div>

      {/* <Gallery /> */}

      <div id="contact">
        <Contact />
      </div>

      {/* <FinalCTA /> */}
      <Footer />
      <GarudChatbot />
    </main>
  );
}