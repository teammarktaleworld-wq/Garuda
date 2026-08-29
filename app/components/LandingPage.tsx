// // app/components/LandingPage.tsx
// "use client";

// import type { ShowroomConfig } from "@/app/config/showrooms";
// import CampaignNavbar from "./CampaignNavbar";
// import OfferHero from "./OfferHero";
// import WhyGarudTata from "./WhyGarudTata";
// import Offers from "./Offers";
// import About from "./About";
// import Showroom from "./Showroom";
// import Contact from "./Contact";
// import Footer from "./Footer";
// import GarudChatbot from "./Garudchatbot";

// interface LandingPageProps {
//   showroom: ShowroomConfig;
// }

// export default function LandingPage({ showroom }: LandingPageProps) {
//   return (
//     <main>
//       <CampaignNavbar
//         phone={showroom.phone}
//         offerSectionId="offer-form"
//       />

//       <OfferHero
//         phone={showroom.phone}
//         whatsappNumber={showroom.whatsappNumber}
//         offerSectionId="offer-form"
//         backgroundImage={showroom.hero.backgroundImage}
//         backgroundVideo={showroom.hero.backgroundVideo}
//       />

//       <div id="offer-form">
//         <Offers />
//       </div>

//       <WhyGarudTata />
//       <About />

//       <div id="showrooms">
//         {/* ✅ FIXED: was <Showroom config={showroom.showroom} /> — .showroom doesn't exist */}
//         <Showroom
//           outlets={showroom.outlets}
//           cityName={showroom.name}
//         />
//       </div>

//       <div id="contact">
//         {/* ✅ pass email from contact config, not apiBase */}
//         <Contact
//           phone={showroom.phone}
//           email={showroom.contact.email}
//         />
//       </div>

//       {/* ✅ Footer — remove phone prop if Footer doesn't accept it */}
//       <Footer />

//       {/* ✅ GarudChatbot — remove phone prop if it doesn't accept it */}
//       <GarudChatbot />
//     </main>
//   );
// }










// // app/components/LandingPage.tsx
// "use client";

// import type { ShowroomConfig } from "@/app/config/showrooms";
// import CampaignNavbar from "./CampaignNavbar";
// import OfferHero from "./OfferHero";
// import WhyGarudTata from "./WhyGarudTata";
// import Offers from "./Offers";
// import About from "./About";
// import Showroom from "./Showroom";
// import Contact from "./Contact";
// import Footer from "./Footer";
// import GarudChatbot from "./Garudchatbot";

// interface LandingPageProps {
//   showroom: ShowroomConfig;
// }

// export default function LandingPage({ showroom }: LandingPageProps) {
//   return (
//     <main>
//       <CampaignNavbar
//         phone={showroom.phone}
//         offerSectionId="offer-form"
//       />

//       <OfferHero
//         phone={showroom.phone}
//         whatsappNumber={showroom.whatsappNumber}
//         offerSectionId="offer-form"
//         backgroundImage={showroom.hero.backgroundImage}
//         backgroundVideo={showroom.hero.backgroundVideo}
//       />

//       <div id="offer-form">
//         <Offers />
//       </div>

//       <WhyGarudTata />
//       <About />

//       <div id="showrooms">
//         <Showroom
//           outlets={showroom.outlets}
//           cityName={showroom.name}
//         />
//       </div>

//       <div id="contact">
//         <Contact />  {/* ✅ no props — Contact is fully self-contained */}
//       </div>

//       <Footer />
//       <GarudChatbot />
//     </main>
//   );
// }















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