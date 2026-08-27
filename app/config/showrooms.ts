// app/config/showrooms.ts

export type ShowroomSlug = "palam" | "narela" | "najafgarh";

export interface OutletData {
  id:        string;
  name:      string;
  shortName: string;
  type:      "showroom" | "workshop";
  address:   string;
  phone:     string;
  email:     string;
  hours:     string;
  mapsNav:   string;
  gmbImage?: string;
}

export interface ShowroomConfig {
  slug:           ShowroomSlug;
  name:           string;
  phone:          string;
  whatsappNumber: string;
  apiBase:        string;
  hero: {
    backgroundImage: string;
    backgroundVideo:  string;
  };
  seo: {
    title:       string;
    description: string;
    canonical:   string;
  };
  navbar: {
    logoSrc:  string;
    gmbImage: string;
  };
  outlets: OutletData[];
  contact: {
    heading:    string;
    subheading: string;
    email:      string;
  };
  footer: { tagline: string };
  ui: {
    showVehicles:     boolean;
    showTestimonials: boolean;
    showGallery:      boolean;
    showFinance:      boolean;
    showTestDrive:    boolean;
  };
}

export const HOME_URL = "https://www.garudtata.com/";

const ALL_OUTLETS: OutletData[] = [
  {
    id:        "palam-showroom",
    name:      "Garud Tata – Palam",
    shortName: "Palam",
    type:      "showroom",
    address:   "Sales-Garg Plaza, RZ A70, Dabri–Palam Rd, Main Shiv Market, Palam, New Delhi, Delhi 110045",
    phone:     "9217371204",
    email:     "sm.dwarka@garudtata.com",
    hours:     "10 AM – 7 PM · All Days",
    mapsNav:   "https://maps.google.com/?q=RZ+A70,Dabri+Palam+Rd,Main+Shiv+Market,Palam,New+Delhi,Delhi+110045",
    gmbImage:  "/images/Navbar/palamgmb.png",
  },
  {
    id:        "narela-showroom",
    name:      "Garud Tata – Narela",
    shortName: "Narela",
    type:      "showroom",
    address:   "Khasra No 42/12, Narela, New Delhi, Delhi 110040",
    phone:     "9311083011",
    email:     "sm.narela@garudtata.com",
    hours:     "10 AM – 7 PM · All Days",
    mapsNav:   "https://maps.google.com/?q=Khasra+No+42/12,Narela,New+Delhi,Delhi+110040",
    gmbImage:  "/images/Navbar/Narelagmb.png",
  },
  {
    id:        "najafgarh-showroom",
    name:      "Garud Tata – Najafgarh",
    shortName: "Najafgarh",
    type:      "showroom",
    address:   "Plot No. 8–11, Najafgarh Rd, Near Sai Baba Mandir, Roshan Garden, Najafgarh, New Delhi, Delhi 110043",
    phone:     "9217371207",
    email:     "sm.najafgarh@garudtata.com",
    hours:     "10 AM – 7 PM · All Days",
    mapsNav:   "https://maps.google.com/?q=Najafgarh+Road+Near+Sai+Baba+Mandir+Roshan+Garden+Najafgarh+New+Delhi+110043",
    gmbImage:  "/images/Navbar/NajafgarhGmbimage.jpeg",
  },
  {
    id:        "dwarka-service",
    name:      "Garud Service – Dwarka (Matiala)",
    shortName: "Dwarka Service",
    type:      "workshop",
    address:   "Shanti Garden, Matiala Industrial Area, Dwarka, New Delhi, Delhi 110059",
    phone:     "9319198306",
    email:     "crmservice.matiala@garudtata.com",
    hours:     "9 AM – 7 PM · All Days",
    mapsNav:   "https://maps.google.com/?q=Shanti+Garden+Matiala+Industrial+Area+Dwarka+New+Delhi+110059",
    gmbImage:  "/images/Navbar/palamgmb.png",
  },
  {
    id:        "najafgarh-service",
    name:      "Garud Service – Najafgarh",
    shortName: "Najafgarh Service",
    type:      "workshop",
    address:   "Plot No. 8–11, Main Najafgarh Road, Near Sai Baba Mandir, Najafgarh, New Delhi, Delhi 110043",
    phone:     "9319198306",
    email:     "service@garudtata.com",
    hours:     "9 AM – 7 PM · All Days",
    mapsNav:   "https://maps.google.com/?q=Najafgarh+Road+Near+Sai+Baba+Mandir+Najafgarh+New+Delhi+110043",
    gmbImage:  "/images/Navbar/NajafgarhGmbimage.jpeg",
  },
];

const SHARED_UI = {
  showVehicles:     false,
  showTestimonials: false,
  showGallery:      false,
  showFinance:      false,
  showTestDrive:    false,
};

const SHARED_HERO = {
  backgroundImage: "/images/vehicles/sierrakv-3.avif",
  backgroundVideo:  "/video/vidssave.com Sierra _ Glimpse 2 _ The Legend Returns 720P.mp4",
};

export const showrooms: Record<ShowroomSlug, ShowroomConfig> = {

  palam: {
    slug:           "palam",
    name:           "Garud Tata Palam",
    phone:          "+919217371204",
    whatsappNumber: "919217371204",
    apiBase:        "/api/enquiry",
    hero:           SHARED_HERO,
    seo: {
      title:       "Garud Tata | Tata Motors Authorised Dealer – New Delhi",
      description: "3 showrooms & 2 service centres across New Delhi. Best Tata car deals, test drives & after-sales service.",
      canonical:   "https://garudtata.com/",
    },
    navbar: {
      logoSrc:  "/images/logo.jpg",
      gmbImage: "/images/Navbar/palamgmb.png",
    },
    outlets: ALL_OUTLETS,
    contact: {
      heading:    "Get in Touch",
      subheading: "Our team across Palam, Narela & Najafgarh is ready to help you find your perfect Tata.",
      email:      "sm.dwarka@garudtata.com",
    },
    footer:  { tagline: "Tata Motors Authorised Dealer · New Delhi" },
    ui:      SHARED_UI,
  },

  narela: {
    slug:           "narela",
    name:           "Garud Tata Narela",
    phone:          "+919311083011",
    whatsappNumber: "919311083011",
    apiBase:        "/api/enquiry",
    hero:           SHARED_HERO,
    seo: {
      title:       "Garud Tata Narela | Tata Motors Authorised Dealer – North Delhi",
      description: "Visit Garud Tata Narela for exclusive Tata car offers, test drives & expert service in North Delhi.",
      canonical:   "https://garudtata.com/narela",
    },
    navbar: {
      logoSrc:  "/images/logo.jpg",
      gmbImage: "/images/Navbar/Narelagmb.png",
    },
    outlets: ALL_OUTLETS,
    contact: {
      heading:    "Get in Touch – Narela",
      subheading: "Our Narela team is ready to help you find your perfect Tata.",
      email:      "sm.narela@garudtata.com",
    },
    footer:  { tagline: "Tata Motors Authorised Dealer · Narela, New Delhi" },
    ui:      SHARED_UI,
  },

  najafgarh: {
    slug:           "najafgarh",
    name:           "Garud Tata Najafgarh",
    phone:          "+919217371207",
    whatsappNumber: "919217371207",
    apiBase:        "/api/enquiry",
    hero:           SHARED_HERO,
    seo: {
      title:       "Garud Tata Najafgarh | Tata Motors Authorised Dealer – West Delhi",
      description: "Visit Garud Tata Najafgarh for exclusive Tata car offers, test drives & expert service in West Delhi.",
      canonical:   "https://garudtata.com/najafgarh",
    },
    navbar: {
      logoSrc:  "/images/logo.jpg",
      gmbImage: "/images/Navbar/NajafgarhGmbimage.jpeg",
    },
    outlets: ALL_OUTLETS,
    contact: {
      heading:    "Get in Touch – Najafgarh",
      subheading: "Our Najafgarh team is ready to help you find your perfect Tata.",
      email:      "sm.najafgarh@garudtata.com",
    },
    footer:  { tagline: "Tata Motors Authorised Dealer · Najafgarh, New Delhi" },
    ui:      SHARED_UI,
  },
};

export function getShowroom(slug: string): ShowroomConfig | null {
  return showrooms[slug as ShowroomSlug] ?? null;
}

export const SHOWROOM_SLUGS = Object.keys(showrooms) as ShowroomSlug[];