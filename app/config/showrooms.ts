

// app/config/showrooms.ts

export type ShowroomSlug =
  | "Tata-Motors-Palam"
  | "Tata-Motors-Narela"
  | "Tata-Motors-Najafgarh";

export interface OutletData {
  id: string;
  name: string;
  shortName: string;
  type: "showroom" | "workshop";
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapsNav: string;
  gmbImage?: string;
}

export interface ShowroomConfig {
  slug: ShowroomSlug;

  // SEO / display location name
  name: string;
  shortName: string;

  phone: string;
  whatsappNumber: string;
  apiBase: string;

  hero: {
    backgroundImage: string;
    backgroundVideo: string;
  };

  seo: {
    title: string;
    description: string;
    canonical: string;
  };

  navbar: {
    logoSrc: string;
    gmbImage: string;
  };

  // Main showroom for this page
  primaryOutlet: OutletData;

  // Other outlets / workshops
  outlets: OutletData[];

  contact: {
    heading: string;
    subheading: string;
    email: string;
  };

  footer: {
    tagline: string;
  };

  ui: {
    showVehicles: boolean;
    showTestimonials: boolean;
    showGallery: boolean;
    showFinance: boolean;
    showTestDrive: boolean;
  };
}

/* =========================================================
   WEBSITE URL
========================================================= */

export const HOME_URL =
  "https://tatamotors-delhi.com/";

/* =========================================================
   SINGLE SHARED PHONE NUMBER
========================================================= */

const SHARED_PHONE = "+919217371211";

const SHARED_WHATSAPP = "919217371211";

const SHARED_PHONE_OUTLETS = "9217371211";

/* =========================================================
   SHARED HERO
========================================================= */

const SHARED_HERO = {
  backgroundImage: "/images/vehicles/sierrakv-3.avif",

  backgroundVideo:
    "/video/vidssave.com Sierra _ Glimpse 2 _ The Legend Returns 720P.mp4",
};

/* =========================================================
   SHARED UI
========================================================= */

const SHARED_UI = {
  showVehicles: false,
  showTestimonials: false,
  showGallery: false,
  showFinance: false,
  showTestDrive: false,
};

/* =========================================================
   OUTLETS
========================================================= */

const PALAM_SHOWROOM: OutletData = {
  id: "palam-showroom",

  name: "Garud Tata – Palam",

  shortName: "Palam",

  type: "showroom",

  address:
    "Sales-Garg Plaza, RZ A70, Dabri–Palam Rd, Main Shiv Market, Palam, New Delhi, Delhi 110045",

  phone: SHARED_PHONE_OUTLETS,

  email: "sm.dwarka@garudtata.com",

  hours: "10 AM – 7 PM · All Days",

  mapsNav:
    "https://maps.google.com/?q=RZ+A70,Dabri+Palam+Rd,Main+Shiv+Market,Palam,New+Delhi,Delhi+110045",

  gmbImage: "/images/Navbar/palamgmb.png",
};

const NARELA_SHOWROOM: OutletData = {
  id: "narela-showroom",

  name: "Garud Tata – Narela",

  shortName: "Narela",

  type: "showroom",

  address:
    "Khasra No 42/12, Narela, New Delhi, Delhi 110040",

  phone: SHARED_PHONE_OUTLETS,

  email: "sm.narela@garudtata.com",

  hours: "10 AM – 7 PM · All Days",

  mapsNav:
    "https://maps.google.com/?q=Khasra+No+42/12,Narela,New+Delhi,Delhi+110040",

  gmbImage: "/images/Navbar/Narelagmb.png",
};

const NAJAFGARH_SHOWROOM: OutletData = {
  id: "najafgarh-showroom",

  name: "Garud Tata – Najafgarh",

  shortName: "Najafgarh",

  type: "showroom",

  address:
    "Plot No. 13, Najafgarh Rd, near Sai Baba Mandir, Jai Vihar Colony, Masudabad, Najafgarh, New Delhi, Delhi 110043",

  phone: SHARED_PHONE_OUTLETS,

  email: "sm.najafgarh@garudtata.com",

  hours: "10 AM – 7 PM · All Days",

  mapsNav:
    "https://maps.google.com/?q=Najafgarh+Road+Near+Sai+Baba+Mandir+Roshan+Garden+Najafgarh+New+Delhi+110043",

  gmbImage: "/images/Navbar/NajafgarhGmbimage.jpeg",
};

const DWARKA_SERVICE: OutletData = {
  id: "dwarka-service",

  name: "Garud Service – Dwarka (Matiala)",

  shortName: "Dwarka Service",

  type: "workshop",

  address:
    "Shanti Garden, Matiala Industrial Area, Dwarka, New Delhi, Delhi 110059",

  phone: SHARED_PHONE_OUTLETS,

  email: "crmservice.matiala@garudtata.com",

  hours: "9 AM – 7 PM · All Days",

  mapsNav:
    "https://maps.google.com/?q=Shanti+Garden+Matiala+Industrial+Area+Dwarka+New+Delhi+110059",

  gmbImage: "/images/Navbar/palamgmb.png",
};

const NAJAFGARH_SERVICE: OutletData = {
  id: "najafgarh-service",

  name: "Garud Service – Najafgarh",

  shortName: "Najafgarh Service",

  type: "workshop",

  address:
    "Plot No. 8–11, Main Najafgarh Road, Near Sai Baba Mandir, Najafgarh, New Delhi, Delhi 110043",

  phone: SHARED_PHONE_OUTLETS,

  email: "service@garudtata.com",

  hours: "9 AM – 7 PM · All Days",

  mapsNav:
    "https://maps.google.com/?q=Najafgarh+Road+Near+Sai+Baba+Mandir+Najafgarh+New+Delhi+110043",

  gmbImage: "/images/Navbar/NajafgarhGmbimage.jpeg",
};

/* =========================================================
   ALL OTHER OUTLETS
========================================================= */

const ALL_OUTLETS: OutletData[] = [
  PALAM_SHOWROOM,
  NARELA_SHOWROOM,
  NAJAFGARH_SHOWROOM,
  DWARKA_SERVICE,
  NAJAFGARH_SERVICE,
];

/* =========================================================
   SHOWROOM CONFIGURATION
========================================================= */

export const showrooms: Record<
  ShowroomSlug,
  ShowroomConfig
> = {
  /* =======================================================
     PALAM / DWARKA
  ======================================================= */

  "Tata-Motors-Palam": {
    slug: "Tata-Motors-Palam",

    name: "Garud Tata Palam",

    shortName: "Palam",

    phone: SHARED_PHONE,

    whatsappNumber: SHARED_WHATSAPP,

    apiBase: "/api/enquiry",

    hero: SHARED_HERO,

    seo: {
      title:
        "Tata Motors Palam Dwarka | New Tata Cars, Offers & Test Drive | Garud Tata",

      description:
        "Visit Garud Tata Palam Dwarka, an authorised Tata Motors dealer in New Delhi. Explore new Tata cars, latest offers, test drives, finance and expert assistance.",

      canonical:
        "https://tatamotors-delhi.com/Tata-Motors-Palam",
    },

    navbar: {
      logoSrc: "/images/logo.jpg",

      gmbImage:
        "/images/Navbar/palamgmb.png",
    },

    primaryOutlet: PALAM_SHOWROOM,

    outlets: ALL_OUTLETS,

    contact: {
      heading: "Get in Touch – Palam",

      subheading:
        "Our Palam Dwarka team is ready to help you find your perfect Tata.",

      email: "sm.dwarka@garudtata.com",
    },

    footer: {
      tagline:
        "Tata Motors Authorised Dealer · Palam, Dwarka, New Delhi",
    },

    ui: SHARED_UI,
  },

  /* =======================================================
     NARELA
  ======================================================= */

  "Tata-Motors-Narela": {
    slug: "Tata-Motors-Narela",

    name: "Garud Tata Narela",

    shortName: "Narela",

    phone: SHARED_PHONE,

    whatsappNumber: SHARED_WHATSAPP,

    apiBase: "/api/enquiry",

    hero: SHARED_HERO,

    seo: {
      title:
        "Tata Motors Narela | New Tata Cars, Offers & Test Drive | Garud Tata",

      description:
        "Visit Garud Tata Narela, an authorised Tata Motors dealer in Narela, New Delhi. Explore new Tata cars, latest offers, test drives, finance and expert assistance.",

      canonical:
        "https://tatamotors-delhi.com/Tata-Motors-Narela",
    },

    navbar: {
      logoSrc: "/images/logo.jpg",

      gmbImage:
        "/images/Navbar/Narelagmb.png",
    },

    primaryOutlet: NARELA_SHOWROOM,

    outlets: ALL_OUTLETS,

    contact: {
      heading: "Get in Touch – Narela",

      subheading:
        "Our Narela team is ready to help you find your perfect Tata.",

      email: "sm.narela@garudtata.com",
    },

    footer: {
      tagline:
        "Tata Motors Authorised Dealer · Narela, New Delhi",
    },

    ui: SHARED_UI,
  },

  /* =======================================================
     NAJAFGARH
  ======================================================= */

  "Tata-Motors-Najafgarh": {
    slug: "Tata-Motors-Najafgarh",

    name: "Garud Tata Najafgarh",

    shortName: "Najafgarh",

    phone: SHARED_PHONE,

    whatsappNumber: SHARED_WHATSAPP,

    apiBase: "/api/enquiry",

    hero: SHARED_HERO,

    seo: {
      title:
        "Tata Motors Najafgarh | New Tata Cars, Offers & Test Drive | Garud Tata",

      description:
        "Visit Garud Tata Najafgarh, an authorised Tata Motors dealer in Najafgarh, New Delhi. Explore new Tata cars, latest offers, test drives, finance and expert assistance.",

      canonical:
        "https://tatamotors-delhi.com/Tata-Motors-Najafgarh",
    },

    navbar: {
      logoSrc: "/images/logo.jpg",

      gmbImage:
        "/images/Navbar/NajafgarhGmbimage.jpeg",
    },

    primaryOutlet: NAJAFGARH_SHOWROOM,

    outlets: ALL_OUTLETS,

    contact: {
      heading: "Get in Touch – Najafgarh",

      subheading:
        "Our Najafgarh team is ready to help you find your perfect Tata.",

      email:
        "sm.najafgarh@garudtata.com",
    },

    footer: {
      tagline:
        "Tata Motors Authorised Dealer · Najafgarh, New Delhi",
    },

    ui: SHARED_UI,
  },
};

/* =========================================================
   HELPERS
========================================================= */

/**
 * Get showroom configuration from URL slug.
 */
export function getShowroom(
  slug: string
): ShowroomConfig | null {
  return (
    showrooms[slug as ShowroomSlug] ?? null
  );
}

/**
 * All showroom URLs.
 *
 * Used by generateStaticParams()
 * and sitemap.ts.
 */
export const SHOWROOM_SLUGS =
  Object.keys(showrooms) as ShowroomSlug[];
