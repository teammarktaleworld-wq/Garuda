// import Navbar from "./components/Navbar";
// import VehicleShowcase from "./components/VehicleShowcase";
// import VehicleGrid from "./components/VehicleGrid";
// import FeaturedVehicle from "./components/FeaturedVehicle";
// import WhyGarudTata from "./components/WhyGarudTata";
// import Offers from "./components/Offers";
// import TestDrive from "./components/TestDrive";
// import About from "./components/About";
// import Testimonials from "./components/Testimonials";
// import FinanceCalculator from "./components/FinanceCalculator";
// import Showroom from "./components/Showroom";
// import Gallery from "./components/Gallery";
// import Contact from "./components/Contact";
// import FinalCTA from "./components/FinalCTA";
// import Footer from "./components/Footer";
// import CinematicHero from "./components/Hero";
// import GarudChatbot from "./components/Garudchatbot";

// export default function Home() {
//   return (
//     <main>
//       <Navbar />
      
//       <CinematicHero/>
//       <VehicleShowcase />
//       <VehicleGrid />
//       <FeaturedVehicle />
//       <WhyGarudTata />
//       <Offers />
//       <TestDrive />
//       <About />
//       <Testimonials />
//       <FinanceCalculator />
//       <Showroom />
//       <Gallery />
//       <Contact />
//       <FinalCTA />
//       <Footer />
//       <GarudChatbot />

//     </main>
//   );
// }









// import CampaignNavbar from "./components/CampaignNavbar";
// import OfferHero from "./components/OfferHero";
// import VehicleShowcase from "./components/VehicleShowcase";
// import VehicleGrid from "./components/VehicleGrid";
// import FeaturedVehicle from "./components/FeaturedVehicle";
// import WhyGarudTata from "./components/WhyGarudTata";
// import Offers from "./components/Offers";
// import TestDrive from "./components/TestDrive";
// import About from "./components/About";
// import Testimonials from "./components/Testimonials";
// import FinanceCalculator from "./components/FinanceCalculator";
// import Showroom from "./components/Showroom";
// import Gallery from "./components/Gallery";
// import Contact from "./components/Contact";
// import FinalCTA from "./components/FinalCTA";
// import Footer from "./components/Footer";
// import GarudChatbot from "./components/Garudchatbot";

// export default function Home() {
//   return (
//     <main>
//       {/* ── Navbar ─────────────────────────────────────────────────────────
//           Replace phone / whatsappNumber with real dealership numbers.
//           Add logoSrc="/images/logo.png" once you have the logo file.
//       ─────────────────────────────────────────────────────────────────── */}
//       <CampaignNavbar
//         phone="+919876543210"
//         whatsappNumber="919876543210"
//         offerSectionId="offer-form"
//         // logoSrc="/images/logo.png"
//       />

//       {/* ── Hero ───────────────────────────────────────────────────────────
//           image    → official Tata vehicle from public/images/vehicles/
//           video    → official Tata promo video from public/video/
//           offerValue → pass ONLY if you have a verified figure, e.g. "₹50,000"
//                        leave undefined to show "SPECIAL BENEFITS AVAILABLE"
//       ─────────────────────────────────────────────────────────────────── */}
//       <OfferHero
//         image="/images/vehicles/harrier.webp"
//         video="/video/vidssave.com Sierra _ Glimpse 2 _ The Legend Returns 720P.mp4"
//         phone="+919876543210"
//         whatsappNumber="919876543210"
//         offerSectionId="offer-form"
//         // vehicle="Nexon"          ← uncomment for vehicle-specific campaigns
//         // offerValue="₹50,000"    ← uncomment only when verified
//       />

//       {/* ── Offer form anchor ──────────────────────────────────────────────
//           Both the navbar CTA and hero "GET MY OFFER" scroll here.
//           This wraps your existing Offers component as the lead form section.
//       ─────────────────────────────────────────────────────────────────── */}
//       <div id="offer-form">
//         <Offers />
//       </div>

//       <VehicleShowcase />

//       <div id="cars">
//         <VehicleGrid />
//       </div>

//       <FeaturedVehicle />
//       <WhyGarudTata />

//       <div id="test-drive">
//         <TestDrive />
//       </div>

//       <About />
//       <Testimonials />
//       <FinanceCalculator />

//       <div id="showrooms">
//         <Showroom />
//       </div>

//       <Gallery />

//       <div id="contact">
//         <Contact />
//       </div>

//       <FinalCTA />
//       <Footer />
//       <GarudChatbot />
//     </main>
//   );
// }









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
        phone="+919876543210"
    
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

      <VehicleShowcase />

      <div id="cars">
        <VehicleGrid />
      </div>

      <FeaturedVehicle />
      <WhyGarudTata />

      <div id="test-drive">
        <TestDrive />
      </div>

      <About />
      <Testimonials />
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