import Navbar from "./components/Navbar";
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
import CinematicHero from "./components/Hero";
import GarudChatbot from "./components/Garudchatbot";

export default function Home() {
  return (
    <main>
      <Navbar />
      
      <CinematicHero/>
      <VehicleShowcase />
      <VehicleGrid />
      <FeaturedVehicle />
      <WhyGarudTata />
      <Offers />
      <TestDrive />
      <About />
      <Testimonials />
      <FinanceCalculator />
      <Showroom />
      <Gallery />
      <Contact />
      <FinalCTA />
      <Footer />
      <GarudChatbot />

    </main>
  );
}
