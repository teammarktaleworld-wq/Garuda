






// // ─────────────────────────────────────────────────────────────────────────────
// // lib/tata-offers.ts
// // ─────────────────────────────────────────────────────────────────────────────

// export type Category   = "SUV" | "Hatchback" | "Sedan" | "EV";
// export type ModelYear  = "MY24" | "MY25";
// export type Powertrain = "Petrol" | "CNG" | "Diesel" | "Electric";

// export const MODEL_GALLERY: Record<string, string[]> = {
//   sierra: [
//     "/Car images/Tata sierra/image1.avif",
//     "/Car images/Tata sierra/image2.avif",
//     "/Car images/Tata sierra/image3.avif",
//     "/Car images/Tata sierra/image4.avif",
//     "/Car images/Tata sierra/image5.avif",
//   ],
//   "sierra-ev": [
//     "/Car images/Tata sierra/image1.avif",
//     "/Car images/Tata sierra/image2.avif",
//     "/Car images/Tata sierra/image3.avif",
//     "/Car images/Tata sierra/image4.avif",
//     "/Car images/Tata sierra/image5.avif",
//   ],
//   tiago: [
//     "/Car images/Tata tiago/image1.jpg",
//     "/Car images/Tata tiago/image2.jpg",
//     "/Car images/Tata tiago/image3.jpg",
//     "/Car images/Tata tiago/image4.jpg",
//     "/Car images/Tata tiago/image5.jpg",
//     "/Car images/Tata tiago/image6.jpg",
//   ],
//   "tiago-ev": [
//     "/Car images/Tata tiago/image1.jpg",
//     "/Car images/Tata tiago/image2.jpg",
//     "/Car images/Tata tiago/image3.jpg",
//     "/Car images/Tata tiago/image4.jpg",
//     "/Car images/Tata tiago/image5.jpg",
//     "/Car images/Tata tiago/image6.jpg",
//   ],
//   tigor: [
//     "/Car images/Tata tigor/image1.avif",
//     "/Car images/Tata tigor/image2.avif",
//     "/Car images/Tata tigor/image3.avif",
//     "/Car images/Tata tigor/image4.avif",
//     "/Car images/Tata tigor/image5.avif",
//   ],
//   altroz: [
//     "/Car images/Tata altroz/image1.avif",
//     "/Car images/Tata altroz/image2.avif",
//     "/Car images/Tata altroz/image3.avif",
//     "/Car images/Tata altroz/image4.avif",
//     "/Car images/Tata altroz/image5.avif",
//     "/Car images/Tata altroz/image6.avif",
//     "/Car images/Tata altroz/image7.avif",
//   ],
//   punch: [
//     "/Car images/Tata punch/image1.jpg",
//     "/Car images/Tata punch/image2.jpg",
//     "/Car images/Tata punch/image3.jpg",
//     "/Car images/Tata punch/image4.jpg",
//     "/Car images/Tata punch/image5.jpg",
//   ],
//   "punch-ev": [
//     "/Car images/Tata punch/image1.jpg",
//     "/Car images/Tata punch/image2.jpg",
//     "/Car images/Tata punch/image3.jpg",
//     "/Car images/Tata punch/image4.jpg",
//     "/Car images/Tata punch/image5.jpg",
//   ],
//   nexon: [
//     "/Car images/Tata nexon/image1.avif",
//     "/Car images/Tata nexon/image2.avif",
//     "/Car images/Tata nexon/image3.avif",
//     "/Car images/Tata nexon/image4.avif",
//     "/Car images/Tata nexon/image5.avif",
//     "/Car images/Tata nexon/image6.avif",
//   ],
//   "nexon-ev": [
//     "/Car images/Tata nexon/image1.avif",
//     "/Car images/Tata nexon/image2.avif",
//     "/Car images/Tata nexon/image3.avif",
//     "/Car images/Tata nexon/image4.avif",
//     "/Car images/Tata nexon/image5.avif",
//     "/Car images/Tata nexon/image6.avif",
//   ],
//   curvv: [
//     "/Car images/Tata curv/image1.avif",
//     "/Car images/Tata curv/image2.avif",
//     "/Car images/Tata curv/image3.avif",
//     "/Car images/Tata curv/image4.avif",
//     "/Car images/Tata curv/image5.avif",
//     "/Car images/Tata curv/image6.avif",
//     "/Car images/Tata curv/image7.avif",
//   ],
//   "curvv-ev": [
//     "/Car images/Tata curv/image1.avif",
//     "/Car images/Tata curv/image2.avif",
//     "/Car images/Tata curv/image3.avif",
//     "/Car images/Tata curv/image4.avif",
//     "/Car images/Tata curv/image5.avif",
//     "/Car images/Tata curv/image6.avif",
//     "/Car images/Tata curv/image7.avif",
//   ],
//   harrier: [
//     "/Car images/Tata harrier/image1.avif",
//     "/Car images/Tata harrier/image2.avif",
//     "/Car images/Tata harrier/image3.avif",
//     "/Car images/Tata harrier/image4.avif",
//     "/Car images/Tata harrier/image5.avif",
//     "/Car images/Tata harrier/image6.avif",
//     "/Car images/Tata harrier/image7.avif",
//   ],
//   "harrier-ev": [
//     "/Car images/Tata harrier/image1.avif",
//     "/Car images/Tata harrier/image2.avif",
//     "/Car images/Tata harrier/image3.avif",
//     "/Car images/Tata harrier/image4.avif",
//     "/Car images/Tata harrier/image5.avif",
//     "/Car images/Tata harrier/image6.avif",
//     "/Car images/Tata harrier/image7.avif",
//   ],
//   safari: [
//     "/Car images/Tata safari/image1.avif",
//     "/Car images/Tata safari/image2.avif",
//     "/Car images/Tata safari/image3.avif",
//     "/Car images/Tata safari/image4.avif",
//     "/Car images/Tata safari/image5.avif",
//     "/Car images/Tata safari/image7.avif",
//     "/Car images/Tata safari/image8.avif",
//   ],
// };

// export type VehicleDetail = {
//   galleryKey: string;
//   description: string;
//   priceFrom: string;
//   fuelType?: string;
//   transmission?: string;
//   seatingCapacity?: number;
//   mileage?: string;
//   range?: string;
//   battery?: string;
//   charging?: string;
//   specifications: {
//     engine?: string;
//     power?: string;
//     torque?: string;
//     fuelType?: string;
//     transmission?: string;
//     seating?: string;
//     mileage?: string;
//     range?: string;
//     battery?: string;
//   };
//   highlights: string[];
// };

// export const VEHICLE_DETAILS: Record<string, VehicleDetail> = {
//   sierra: {
//     galleryKey: "sierra",
//     description:
//       "The legendary Tata Sierra returns — reimagined as a bold modern SUV with a distinctive three-window silhouette, glass tailgate, and Tata's most advanced connected-car and safety technologies. An icon reborn for a new era.",
//     priceFrom: "₹12.00 Lakh* (est.)",
//     fuelType: "Petrol (NA & TGDi Turbo) / Diesel / Electric (coming soon)",
//     transmission: "6-MT / 7-DCA / 6-AT",
//     seatingCapacity: 5,
//     mileage: "~17 kmpl (est.)",
//     specifications: {
//       engine: "1.5L NA Petrol / 1.5L TGDi Turbo Petrol / 1.5L Kryojet Diesel",
//       power: "106 PS (NA) · 160 PS (Turbo) · 118 PS (Diesel)",
//       torque: "145 Nm (NA) · 255 Nm (Turbo) · 260–280 Nm (Diesel)",
//       transmission: "6-MT / 7-DCA / 6-AT",
//       seating: "5",
//       mileage: "~17 kmpl (est.)",
//     },
//     highlights: [
//       "Iconic three-window & glass tailgate design",
//       "1.5L TGDi Turbo: 160 PS / 255 Nm",
//       "1.5L Kryojet Diesel: 118 PS / 280 Nm (AT)",
//       "ADAS Level 2 safety suite",
//       "Panoramic glass sunroof",
//       "iRA connected-car technology",
//       "Built on OMEGA-Arc platform",
//     ],
//   },

//   "sierra-ev": {
//     galleryKey: "sierra-ev",
//     description:
//       "The Tata Sierra EV brings the iconic three-window silhouette into the electric era — zero emissions, instant torque, ADAS Level 2, and Tata's most advanced connected-car technologies packed into a bold modern SUV.",
//     priceFrom: "₹17.49 Lakh* (est.)",
//     fuelType: "Electric",
//     seatingCapacity: 5,
//     range: "400+ km (claimed, est.)",
//     battery: "~60 kWh (est.)",
//     charging: "DC fast charging up to 100 kW (est.)",
//     specifications: {
//       power: "~170 bhp (est.)",
//       torque: "~280 Nm (est.)",
//       seating: "5",
//       range: "400+ km (est.)",
//       battery: "~60 kWh (est.)",
//     },
//     highlights: [
//       "Iconic three-window & glass tailgate design",
//       "Zero emissions electric powertrain",
//       "ADAS Level 2 safety suite",
//       "Panoramic glass sunroof",
//       "iRA connected-car technology",
//       "DC fast charging support",
//       "Built on OMEGA-Arc platform",
//       "V2L capability (est.)",
//     ],
//   },

//   tiago: {
//     galleryKey: "tiago",
//     description:
//       "The Tata Tiago is a feature-packed entry-level hatchback that punches well above its segment with a premium cabin, Harman sound system and a 5-star safety-first approach.",
//     priceFrom: "₹5.60 Lakh*",
//     fuelType: "Petrol / CNG",
//     transmission: "Manual / AMT",
//     seatingCapacity: 5,
//     mileage: "19.8 – 26.49 km/kg",
//     specifications: {
//       engine: "1.2 L Revotron",
//       power: "85 bhp",
//       torque: "113 Nm",
//       transmission: "5-MT / 5-AMT",
//       seating: "5",
//       mileage: "19.8 kmpl (Petrol)",
//     },
//     highlights: [
//       "Harman-powered infotainment",
//       "7-inch touchscreen with wireless AA & CP",
//       "Dual front airbags standard",
//       "AMT available across range",
//       "Best-in-class cabin space",
//       "Tata's proven ALFA architecture",
//     ],
//   },

//   "tiago-ev": {
//     galleryKey: "tiago-ev",
//     description:
//       "The Tata Tiago EV democratises electric mobility with an accessible price tag, a 315 km long-range option and Tata's trusted electric drivetrain.",
//     priceFrom: "₹8.49 Lakh*",
//     fuelType: "Electric",
//     seatingCapacity: 5,
//     range: "315 km (LR, claimed)",
//     battery: "24 kWh (LR) / 19.2 kWh (MR)",
//     charging: "DC fast charging up to 50 kW",
//     specifications: {
//       power: "74 bhp",
//       torque: "114 Nm",
//       seating: "5",
//       range: "315 km (LR)",
//       battery: "24 kWh (LR)",
//     },
//     highlights: [
//       "Up to 315 km claimed range (LR)",
//       "DC fast charging support",
//       "iRA connected car tech",
//       "Regenerative braking",
//       "Harman infotainment",
//       "Zippy single-speed electric motor",
//     ],
//   },

//   tigor: {
//     galleryKey: "tigor",
//     description:
//       "The Tata Tigor is a stylish compact sedan offering a massive 420 L boot, Harman audio, and iRA connected-car tech.",
//     priceFrom: "₹6.00 Lakh*",
//     fuelType: "Petrol / CNG",
//     transmission: "Manual / AMT",
//     seatingCapacity: 5,
//     mileage: "20.3 – 26.49 km/kg",
//     specifications: {
//       engine: "1.2 L Revotron",
//       power: "85 bhp",
//       torque: "113 Nm",
//       transmission: "5-MT / 5-AMT",
//       seating: "5",
//       mileage: "20.3 kmpl (Petrol)",
//     },
//     highlights: [
//       "420 L boot — segment leader",
//       "Harman 8-speaker audio",
//       "iRA connected-car system",
//       "AMT available",
//       "4-star GNCAP safety",
//       "CNG variant for lower running costs",
//     ],
//   },

//   altroz: {
//     galleryKey: "altroz",
//     description:
//       "The Tata Altroz is a premium hatchback built on the ALFA architecture, boasting a 5-star GNCAP rating, a 10.25-inch touchscreen and a dual-cylinder CNG option.",
//     priceFrom: "₹6.61 Lakh*",
//     fuelType: "Petrol / Diesel / CNG",
//     transmission: "Manual / DCT",
//     seatingCapacity: 5,
//     mileage: "19.0 – 28.08 km/kg",
//     specifications: {
//       engine: "1.2 L Revotron / 1.5 L Revotorq",
//       power: "85–90 bhp",
//       torque: "113–200 Nm",
//       transmission: "5-MT / 6-MT / 7-DCT",
//       seating: "5",
//       mileage: "20.35 kmpl (Petrol)",
//     },
//     highlights: [
//       "5-star GNCAP — safest in class",
//       "Dual-cylinder CNG (unique to segment)",
//       "10.25-inch HD infotainment",
//       "iRA connected-car tech",
//       "ARKAMYS sound system",
//       "DCA (dual clutch) available",
//     ],
//   },

//   punch: {
//     galleryKey: "punch",
//     description:
//       "The Tata Punch is a rugged micro-SUV loaded with SUV DNA — high ground clearance, 5-star GNCAP safety and a bold stance.",
//     priceFrom: "₹6.13 Lakh*",
//     fuelType: "Petrol / CNG",
//     transmission: "Manual / AMT",
//     seatingCapacity: 5,
//     mileage: "18.8 – 26.99 km/kg",
//     specifications: {
//       engine: "1.2 L Revotron",
//       power: "85 bhp",
//       torque: "113 Nm",
//       transmission: "5-MT / 5-AMT",
//       seating: "5",
//       mileage: "18.8 kmpl (Petrol)",
//     },
//     highlights: [
//       "5-star GNCAP — best in class",
//       "High ground clearance (187 mm)",
//       "360° parking camera",
//       "AMT across trims",
//       "Tri-arrow sculpted exterior",
//       "Multiple driving modes",
//     ],
//   },

//   "punch-ev": {
//     galleryKey: "punch-ev",
//     description:
//       "The Tata Punch EV combines rugged SUV character with a long-range electric powertrain delivering up to 421 km, V2L / V2V capability and ADAS features.",
//     priceFrom: "₹9.99 Lakh*",
//     fuelType: "Electric",
//     seatingCapacity: 5,
//     range: "421 km (LR, claimed)",
//     battery: "35 kWh (LR) / 25 kWh (MR)",
//     charging: "DC fast charging up to 50 kW",
//     specifications: {
//       power: "120 bhp",
//       torque: "190 Nm",
//       seating: "5",
//       range: "421 km (LR)",
//       battery: "35 kWh (LR)",
//     },
//     highlights: [
//       "421 km claimed range (LR)",
//       "Vehicle-to-Load (V2L) & V2V",
//       "ADAS safety suite",
//       "DC fast charging (50 kW)",
//       "High ground clearance (187 mm)",
//       "Smart connected-car features",
//     ],
//   },

//   nexon: {
//     galleryKey: "nexon",
//     description:
//       "India's benchmark compact SUV with 5-star GNCAP safety, panoramic sunroof, ADAS Level 2 and iRA connected-car technology.",
//     priceFrom: "₹8.10 Lakh*",
//     fuelType: "Petrol / Diesel / CNG",
//     transmission: "Manual / AMT / DCA",
//     seatingCapacity: 5,
//     mileage: "17.4 – 24.06 km/kg",
//     specifications: {
//       engine: "1.2 L Revotron Turbo / 1.5 L Revotorq",
//       power: "118–130 bhp",
//       torque: "170–260 Nm",
//       transmission: "6-MT / 6-DCA / 6-AT",
//       seating: "5",
//       mileage: "17.4 kmpl (Petrol Turbo)",
//     },
//     highlights: [
//       "5-star GNCAP rating",
//       "Panoramic glass sunroof",
//       "ADAS Level 2 (select trims)",
//       "iRA connected-car system",
//       "Wireless Android Auto & Apple CarPlay",
//       "Over-the-air software updates",
//     ],
//   },

//   "nexon-ev": {
//     galleryKey: "nexon-ev",
//     description:
//       "India's leading electric SUV delivering a claimed 465 km range, V2L capability, ADAS Level 2 and fast charging support.",
//     priceFrom: "₹14.49 Lakh*",
//     fuelType: "Electric",
//     seatingCapacity: 5,
//     range: "465 km (claimed)",
//     battery: "40.5 kWh",
//     charging: "DC fast charging up to 70 kW",
//     specifications: {
//       power: "143 bhp",
//       torque: "215 Nm",
//       seating: "5",
//       range: "465 km",
//       battery: "40.5 kWh",
//     },
//     highlights: [
//       "465 km claimed range",
//       "V2L (Vehicle-to-Load) capability",
//       "ADAS Level 2 safety suite",
//       "DC fast charging (70 kW)",
//       "iRA connected-car tech",
//       "Over-the-air updates",
//     ],
//   },

//   curvv: {
//     galleryKey: "curvv",
//     description:
//       "Tata's coupe-SUV offering a sweeping fastback roofline, ADAS Level 2, and digital cockpit instrumentation.",
//     priceFrom: "₹10.00 Lakh*",
//     fuelType: "Petrol / Diesel",
//     transmission: "Manual / DCA / AT",
//     seatingCapacity: 5,
//     mileage: "16.5 – 21.0 kmpl",
//     specifications: {
//       engine: "1.2 L Revotron Turbo / 1.5 L Revotorq",
//       power: "118–125 bhp",
//       torque: "170–260 Nm",
//       transmission: "6-MT / 6-DCA / 6-AT",
//       seating: "5",
//       mileage: "16.5 kmpl (Petrol)",
//     },
//     highlights: [
//       "Distinctive coupe-SUV silhouette",
//       "ADAS Level 2",
//       "12.3-inch floating touchscreen",
//       "Panoramic glass sunroof",
//       "Wireless AA & CP",
//       "360° surround camera",
//     ],
//   },

//   "curvv-ev": {
//     galleryKey: "curvv-ev",
//     description:
//       "Tata's flagship electric coupe-SUV delivering a claimed 502 km range, V2L, ADAS Level 2, and fast charging.",
//     priceFrom: "₹17.49 Lakh*",
//     fuelType: "Electric",
//     seatingCapacity: 5,
//     range: "502 km (claimed)",
//     battery: "55 kWh",
//     charging: "DC fast charging up to 70 kW",
//     specifications: {
//       power: "167 bhp",
//       torque: "215 Nm",
//       seating: "5",
//       range: "502 km",
//       battery: "55 kWh",
//     },
//     highlights: [
//       "502 km claimed range",
//       "ADAS Level 2 safety suite",
//       "V2L capability",
//       "12.3-inch premium infotainment",
//       "Coupe-SUV fastback design",
//       "Over-the-air updates",
//     ],
//   },

//   harrier: {
//     galleryKey: "harrier",
//     description:
//       "Built on the Land Rover–derived OMEGARC platform, featuring a panoramic sunroof, JBL audio, and ADAS Level 2.",
//     priceFrom: "₹15.49 Lakh*",
//     fuelType: "Diesel / Petrol",
//     transmission: "Manual / Automatic",
//     seatingCapacity: 5,
//     mileage: "16.35 kmpl",
//     specifications: {
//       engine: "2.0 L Kryotec Diesel / 1.5 L Revotron Turbo Petrol",
//       power: "168 bhp (D) / 165 bhp (P)",
//       torque: "350 Nm (D) / 250 Nm (P)",
//       transmission: "6-MT / 6-AT",
//       seating: "5",
//       mileage: "16.35 kmpl (Diesel)",
//     },
//     highlights: [
//       "Land Rover–derived D8 platform",
//       "Panoramic sunroof",
//       "ADAS Level 2",
//       "JBL 10-speaker sound system",
//       "360° surround view camera",
//       "Multiple terrain modes",
//     ],
//   },

//   "harrier-ev": {
//     galleryKey: "harrier-ev",
//     description:
//       "Flagship dual-motor AWD electric SUV with ADAS Level 2, V2L/V2H bidirectional charging, and 540+ km range.",
//     priceFrom: "₹21.49 Lakh*",
//     fuelType: "Electric",
//     seatingCapacity: 5,
//     range: "540+ km (claimed)",
//     battery: "~66 kWh",
//     charging: "DC fast charging up to 150 kW",
//     specifications: {
//       power: "296 bhp (AWD)",
//       torque: "568 Nm (AWD)",
//       seating: "5",
//       range: "540+ km",
//       battery: "~66 kWh",
//     },
//     highlights: [
//       "Dual-motor AWD",
//       "ADAS Level 2 full suite",
//       "V2L / V2H capability",
//       "DC fast charging (150 kW)",
//       "Land Rover–derived platform",
//       "Over-the-air updates",
//     ],
//   },

//   safari: {
//     galleryKey: "safari",
//     description:
//       "Flagship 6 & 7-seater SUV with ADAS Level 2, ventilated captain seats, terrain response, and JBL surround sound.",
//     priceFrom: "₹16.19 Lakh*",
//     fuelType: "Diesel / Petrol",
//     transmission: "Manual / Automatic",
//     seatingCapacity: 7,
//     mileage: "16.30 kmpl",
//     specifications: {
//       engine: "2.0 L Kryotec Diesel / 1.5 L Revotron Turbo Petrol",
//       power: "168 bhp (D) / 165 bhp (P)",
//       torque: "350 Nm (D) / 250 Nm (P)",
//       transmission: "6-MT / 6-AT",
//       seating: "6 or 7",
//       mileage: "16.30 kmpl (Diesel)",
//     },
//     highlights: [
//       "6 & 7 seat variants",
//       "ADAS Level 2",
//       "Panoramic sunroof",
//       "Terrain response modes",
//       "JBL 12-speaker sound system",
//       "Iconic Safari legacy",
//     ],
//   },
// };

// export function resolveGalleryKey(offerId: string): string {
//   if (offerId.startsWith("sierra-ev"))  return "sierra-ev";
//   if (offerId.startsWith("sierra"))     return "sierra";
//   if (offerId.startsWith("harrier-ev")) return "harrier-ev";
//   if (offerId.startsWith("harrier"))    return "harrier";
//   if (offerId.startsWith("safari"))     return "safari";
//   if (offerId.startsWith("curvv-ev"))   return "curvv-ev";
//   if (offerId.startsWith("curvv"))      return "curvv";
//   if (offerId.startsWith("nexon-ev"))   return "nexon-ev";
//   if (offerId.startsWith("nexon"))      return "nexon";
//   if (offerId.startsWith("punch-ev"))   return "punch-ev";
//   if (offerId.startsWith("punch"))      return "punch";
//   if (offerId.startsWith("altroz"))     return "altroz";
//   if (offerId.startsWith("tiago-ev"))   return "tiago-ev";
//   if (offerId.startsWith("tiago"))      return "tiago";
//   if (offerId.startsWith("tigor"))      return "tigor";
//   return "tiago";
// }

// export function resolveVehicleDetail(offerId: string): VehicleDetail {
//   const key = resolveGalleryKey(offerId);
//   return VEHICLE_DETAILS[key] ?? VEHICLE_DETAILS["tiago"];
// }

// export type EnquiryType =
//   | "Get Offer"
//   | "Test Drive"
//   | "Exchange"
//   | "Finance"
//   | "General Enquiry";

// export const SHOWROOMS = [
//   "Garud Tata Palam",
//   "Garud Tata Narela",
//   "Garud Tata Najafgarh",
// ] as const;

// export const ENQUIRY_TYPES: EnquiryType[] = [
//   "Get Offer",
//   "Test Drive",
//   "Exchange",
//   "Finance",
//   "General Enquiry",
// ];

// export const CARS = [
//   "Tata Sierra",
//   "Tata Sierra EV",
//   "Tata Harrier",
//   "Tata Safari",
//   "Tata Curvv",
//   "Tata Curvv EV",
//   "Tata Nexon",
//   "Tata Nexon EV",
//   "Tata Punch",
//   "Tata Punch EV",
//   "Tata Altroz",
//   "Tata Tiago",
//   "Tata Tiago EV",
//   "Tata Tigor",
// ] as const;

// export type TataOffer = {
//   id: string;
//   slug: string;
//   model: string;
//   variantLabel?: string;
//   powertrain: Powertrain;
//   category: Category;
//   modelYear: ModelYear;
//   consumerOffer?: number;
//   exchangeBenefit?: number;
//   scrappageBenefit?: number;
//   loyaltyBenefit?: number;
//   totalBenefit: number;
//   featured?: boolean;
//   eligibility?: string;
//   active: boolean;
// };

// export const BENEFIT_ROWS: {
//   key: keyof Pick<TataOffer, "consumerOffer" | "exchangeBenefit" | "scrappageBenefit" | "loyaltyBenefit">;
//   label: string;
//   short: string;
// }[] = [
//   { key: "consumerOffer",    label: "Consumer Offer",    short: "Consumer"  },
//   { key: "exchangeBenefit",  label: "Exchange Benefit",  short: "Exchange"  },
//   { key: "scrappageBenefit", label: "Scrappage Benefit", short: "Scrappage" },
//   { key: "loyaltyBenefit",   label: "Loyalty Benefit",   short: "Loyalty"   },
// ];

// export const LAST_UPDATED = "23 August 2026";

// export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

// export const OFFERS: TataOffer[] = [

//   // ── SIERRA ───────────────────────────────────────────────────────────────
//   {
//     id: "sierra-petrol-na",
//     slug: "sierra-petrol-na",
//     model: "Sierra",
//     variantLabel: "1.5 Petrol NA (106 PS)",
//     powertrain: "Petrol",
//     category: "SUV",
//     modelYear: "MY25",
//     consumerOffer: 50000,
//     exchangeBenefit: 25000,
//     scrappageBenefit: 30000,
//     totalBenefit: 80000,
//     featured: true,
//     active: true,
//   },
//   {
//     id: "sierra-petrol-turbo",
//     slug: "sierra-petrol-turbo",
//     model: "Sierra",
//     variantLabel: "1.5 TGDi Turbo Petrol (160 PS)",
//     powertrain: "Petrol",
//     category: "SUV",
//     modelYear: "MY25",
//     consumerOffer: 50000,
//     exchangeBenefit: 25000,
//     scrappageBenefit: 30000,
//     totalBenefit: 80000,
//     featured: true,
//     active: true,
//   },
//   {
//     id: "sierra-diesel",
//     slug: "sierra-diesel",
//     model: "Sierra",
//     variantLabel: "1.5 Kryojet Diesel (118 PS)",
//     powertrain: "Diesel",
//     category: "SUV",
//     modelYear: "MY25",
//     consumerOffer: 50000,
//     exchangeBenefit: 25000,
//     scrappageBenefit: 30000,
//     totalBenefit: 80000,
//     featured: true,
//     active: true,
//   },
//   {
//     id: "sierra-ev",
//     slug: "sierra-ev",
//     model: "Sierra",
//     variantLabel: "Electric",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     consumerOffer: 50000,
//     exchangeBenefit: 25000,
//     scrappageBenefit: 30000,
//     totalBenefit: 80000,
//     featured: true,
//     active: true,
//   },

//   // ── TIAGO ────────────────────────────────────────────────────────────────
//   {
//     id: "tiago-petrol",
//     slug: "tiago-petrol",
//     model: "Tiago",
//     variantLabel: "Petrol",
//     powertrain: "Petrol",
//     category: "Hatchback",
//     modelYear: "MY25",
//     consumerOffer: 35000,
//     exchangeBenefit: 10000,
//     scrappageBenefit: 15000,
//     totalBenefit: 50000,
//     active: true,
//   },
//   {
//     id: "tiago-cng",
//     slug: "tiago-cng",
//     model: "Tiago",
//     variantLabel: "CNG",
//     powertrain: "CNG",
//     category: "Hatchback",
//     modelYear: "MY25",
//     consumerOffer: 30000,
//     exchangeBenefit: 10000,
//     scrappageBenefit: 15000,
//     totalBenefit: 45000,
//     active: true,
//   },

//   // ── TIGOR ────────────────────────────────────────────────────────────────
//   {
//     id: "tigor",
//     slug: "tigor",
//     model: "Tigor",
//     powertrain: "Petrol",
//     category: "Sedan",
//     modelYear: "MY25",
//     consumerOffer: 15000,
//     exchangeBenefit: 10000,
//     scrappageBenefit: 15000,
//     totalBenefit: 30000,
//     active: true,
//   },

//   // ── ALTROZ ───────────────────────────────────────────────────────────────
//   {
//     id: "altroz-petrol",
//     slug: "altroz-petrol",
//     model: "Altroz",
//     variantLabel: "Petrol",
//     powertrain: "Petrol",
//     category: "Hatchback",
//     modelYear: "MY25",
//     consumerOffer: 35000,
//     exchangeBenefit: 15000,
//     scrappageBenefit: 20000,
//     totalBenefit: 55000,
//     active: true,
//   },
//   {
//     id: "altroz-cng",
//     slug: "altroz-cng",
//     model: "Altroz",
//     variantLabel: "CNG",
//     powertrain: "CNG",
//     category: "Hatchback",
//     modelYear: "MY25",
//     consumerOffer: 35000,
//     exchangeBenefit: 15000,
//     scrappageBenefit: 20000,
//     totalBenefit: 55000,
//     active: true,
//   },
//   {
//     id: "altroz-diesel",
//     slug: "altroz-diesel",
//     model: "Altroz",
//     variantLabel: "Diesel",
//     powertrain: "Diesel",
//     category: "Hatchback",
//     modelYear: "MY25",
//     consumerOffer: 25000,
//     exchangeBenefit: 15000,
//     scrappageBenefit: 20000,
//     totalBenefit: 45000,
//     active: true,
//   },
//   {
//     id: "altroz-outgoing",
//     slug: "altroz-outgoing",
//     model: "Altroz",
//     variantLabel: "Outgoing Stock",
//     powertrain: "Petrol",
//     category: "Hatchback",
//     modelYear: "MY24",
//     consumerOffer: 110000,
//     exchangeBenefit: 40000,
//     scrappageBenefit: 40000,
//     loyaltyBenefit: 25000,
//     totalBenefit: 175000,
//     eligibility: "Limited outgoing stock — selected variants",
//     active: true,
//   },

//   // ── PUNCH (ICE) ──────────────────────────────────────────────────────────
//   {
//     id: "punch-petrol",
//     slug: "punch-petrol",
//     model: "Punch",
//     variantLabel: "Petrol · Outgoing",
//     powertrain: "Petrol",
//     category: "SUV",
//     modelYear: "MY24",
//     consumerOffer: 70000,
//     exchangeBenefit: 30000,
//     scrappageBenefit: 30000,
//     loyaltyBenefit: 20000,
//     totalBenefit: 120000,
//     eligibility: "Limited outgoing stock",
//     active: true,
//   },
//   {
//     id: "punch-cng",
//     slug: "punch-cng",
//     model: "Punch",
//     variantLabel: "CNG · Outgoing",
//     powertrain: "CNG",
//     category: "SUV",
//     modelYear: "MY24",
//     consumerOffer: 70000,
//     exchangeBenefit: 30000,
//     scrappageBenefit: 30000,
//     loyaltyBenefit: 20000,
//     totalBenefit: 120000,
//     eligibility: "Limited outgoing stock",
//     active: true,
//   },

//   // ── NEXON (ICE) ──────────────────────────────────────────────────────────
//   {
//     id: "nexon-petrol",
//     slug: "nexon-petrol",
//     model: "Nexon",
//     variantLabel: "Petrol",
//     powertrain: "Petrol",
//     category: "SUV",
//     modelYear: "MY25",
//     consumerOffer: 40000,
//     exchangeBenefit: 15000,
//     scrappageBenefit: 20000,
//     totalBenefit: 60000,
//     active: true,
//   },
//   {
//     id: "nexon-cng",
//     slug: "nexon-cng",
//     model: "Nexon",
//     variantLabel: "CNG",
//     powertrain: "CNG",
//     category: "SUV",
//     modelYear: "MY25",
//     consumerOffer: 35000,
//     exchangeBenefit: 20000,
//     scrappageBenefit: 25000,
//     totalBenefit: 60000,
//     active: true,
//   },
//   {
//     id: "nexon-diesel",
//     slug: "nexon-diesel",
//     model: "Nexon",
//     variantLabel: "Diesel",
//     powertrain: "Diesel",
//     category: "SUV",
//     modelYear: "MY25",
//     exchangeBenefit: 15000,
//     scrappageBenefit: 20000,
//     totalBenefit: 20000,
//     active: true,
//   },

//   // ── CURVV (ICE) ──────────────────────────────────────────────────────────
//   {
//     id: "curvv",
//     slug: "curvv",
//     model: "Curvv",
//     powertrain: "Petrol",
//     category: "SUV",
//     modelYear: "MY25",
//     consumerOffer: 30000,
//     exchangeBenefit: 40000,
//     scrappageBenefit: 45000,
//     loyaltyBenefit: 50000,
//     totalBenefit: 125000,
//     active: true,
//   },

//   // ── HARRIER (ICE) ────────────────────────────────────────────────────────
//   {
//     id: "harrier-d",
//     slug: "harrier-d",
//     model: "Harrier",
//     variantLabel: "Diesel",
//     powertrain: "Diesel",
//     category: "SUV",
//     modelYear: "MY25",
//     consumerOffer: 10000,
//     exchangeBenefit: 25000,
//     scrappageBenefit: 35000,
//     totalBenefit: 45000,
//     active: true,
//   },
//   {
//     id: "harrier-d-wox",
//     slug: "harrier-d-wox",
//     model: "Harrier",
//     variantLabel: "Diesel · w/o X",
//     powertrain: "Diesel",
//     category: "SUV",
//     modelYear: "MY24",
//     consumerOffer: 150000,
//     exchangeBenefit: 50000,
//     scrappageBenefit: 50000,
//     loyaltyBenefit: 40000,
//     totalBenefit: 240000,
//     eligibility: "Selected variants — excludes X trim",
//     active: true,
//   },
//   {
//     id: "harrier-p",
//     slug: "harrier-p",
//     model: "Harrier",
//     variantLabel: "Petrol",
//     powertrain: "Petrol",
//     category: "SUV",
//     modelYear: "MY25",
//     consumerOffer: 40000,
//     totalBenefit: 40000,
//     active: true,
//   },

//   // ── SAFARI (ICE) ─────────────────────────────────────────────────────────
//   {
//     id: "safari-d",
//     slug: "safari-d",
//     model: "Safari",
//     variantLabel: "2.0 Diesel",
//     powertrain: "Diesel",
//     category: "SUV",
//     modelYear: "MY25",
//     consumerOffer: 10000,
//     exchangeBenefit: 25000,
//     scrappageBenefit: 35000,
//     totalBenefit: 45000,
//     active: true,
//   },
//   {
//     id: "safari-d-wox",
//     slug: "safari-d-wox",
//     model: "Safari",
//     variantLabel: "2.0 Diesel · w/o X",
//     powertrain: "Diesel",
//     category: "SUV",
//     modelYear: "MY24",
//     consumerOffer: 150000,
//     exchangeBenefit: 50000,
//     scrappageBenefit: 50000,
//     loyaltyBenefit: 40000,
//     totalBenefit: 240000,
//     eligibility: "Selected variants — excludes X trim",
//     active: true,
//   },
//   {
//     id: "safari-p",
//     slug: "safari-p",
//     model: "Safari",
//     variantLabel: "2.0 Petrol",
//     powertrain: "Petrol",
//     category: "SUV",
//     modelYear: "MY25",
//     consumerOffer: 40000,
//     totalBenefit: 40000,
//     active: true,
//   },

//   // ── TIAGO EV ─────────────────────────────────────────────────────────────
//   {
//     id: "tiago-ev-lr-xt",
//     slug: "tiago-ev-lr-xt",
//     model: "Tiago",
//     variantLabel: "EV LR XT",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     consumerOffer: 100000,
//     exchangeBenefit: 20000,
//     scrappageBenefit: 25000,
//     totalBenefit: 125000,
//     active: true,
//   },
//   {
//     id: "tiago-ev-lr-xz",
//     slug: "tiago-ev-lr-xz",
//     model: "Tiago",
//     variantLabel: "EV LR XZ+ & above",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     consumerOffer: 100000,
//     exchangeBenefit: 20000,
//     scrappageBenefit: 25000,
//     totalBenefit: 125000,
//     active: true,
//   },
//   {
//     id: "tiago-ev-mr",
//     slug: "tiago-ev-mr",
//     model: "Tiago",
//     variantLabel: "EV MR — all variants",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     consumerOffer: 40000,
//     exchangeBenefit: 20000,
//     scrappageBenefit: 25000,
//     totalBenefit: 65000,
//     active: true,
//   },

//   // ── PUNCH EV ─────────────────────────────────────────────────────────────
//   {
//     id: "punch-ev-lr",
//     slug: "punch-ev-lr",
//     model: "Punch",
//     variantLabel: "EV LR — all variants",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     consumerOffer: 110000,
//     exchangeBenefit: 30000,
//     scrappageBenefit: 35000,
//     totalBenefit: 145000,
//     active: true,
//   },
//   {
//     id: "punch-ev-mr",
//     slug: "punch-ev-mr",
//     model: "Punch",
//     variantLabel: "EV MR (excl. Smart)",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     consumerOffer: 90000,
//     exchangeBenefit: 30000,
//     scrappageBenefit: 35000,
//     totalBenefit: 125000,
//     active: true,
//   },
//   {
//     id: "punch-ev-smart",
//     slug: "punch-ev-smart",
//     model: "Punch",
//     variantLabel: "EV Smart & Smart+",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     consumerOffer: 60000,
//     exchangeBenefit: 30000,
//     scrappageBenefit: 35000,
//     totalBenefit: 95000,
//     active: true,
//   },

//   // ── NEXON EV ─────────────────────────────────────────────────────────────
//   {
//     id: "nexon-ev",
//     slug: "nexon-ev",
//     model: "Nexon",
//     variantLabel: "EV 3.0",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     consumerOffer: 15000,
//     exchangeBenefit: 25000,
//     scrappageBenefit: 35000,
//     totalBenefit: 50000,
//     active: true,
//   },

//   // ── CURVV EV ─────────────────────────────────────────────────────────────
//   {
//     id: "curvv-ev",
//     slug: "curvv-ev",
//     model: "Curvv",
//     variantLabel: "EV",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     consumerOffer: 300000,
//     exchangeBenefit: 30000,
//     scrappageBenefit: 35000,
//     totalBenefit: 335000,
//     featured: true,
//     active: true,
//   },

//   // ── HARRIER EV ───────────────────────────────────────────────────────────
//   {
//     id: "harrier-ev",
//     slug: "harrier-ev",
//     model: "Harrier",
//     variantLabel: "EV",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     consumerOffer: 100000,
//     exchangeBenefit: 50000,
//     scrappageBenefit: 75000,
//     loyaltyBenefit: 100000,
//     totalBenefit: 275000,
//     active: true,
//   },
// ];

// export function getOfferBySlug(slug: string): TataOffer | undefined {
//   return OFFERS.find((o) => o.id === slug);
// }

























// // ─────────────────────────────────────────────────────────────────────────────
// // lib/tata-offers.ts
// // ─────────────────────────────────────────────────────────────────────────────

// export type Category   = "SUV" | "Hatchback" | "Sedan" | "EV";
// export type ModelYear  = "MY24" | "MY25";
// export type Powertrain = "Petrol" | "CNG" | "Diesel" | "Electric";

// export const MODEL_GALLERY: Record<string, string[]> = {
//   sierra: [
//     "/Car images/Tata sierra/image1.avif",
//     "/Car images/Tata sierra/image2.avif",
//     "/Car images/Tata sierra/image3.avif",
//     "/Car images/Tata sierra/image4.avif",
//     "/Car images/Tata sierra/image5.avif",
//   ],
//   "sierra-ev": [
//     "/Car images/Tata sierra/image1.avif",
//     "/Car images/Tata sierra/image2.avif",
//     "/Car images/Tata sierra/image3.avif",
//     "/Car images/Tata sierra/image4.avif",
//     "/Car images/Tata sierra/image5.avif",
//   ],
//   tiago: [
//     "/Car images/Tata tiago/image1.jpg",
//     "/Car images/Tata tiago/image2.jpg",
//     "/Car images/Tata tiago/image3.jpg",
//     "/Car images/Tata tiago/image4.jpg",
//     "/Car images/Tata tiago/image5.jpg",
//     "/Car images/Tata tiago/image6.jpg",
//   ],
//   "tiago-ev": [
//     "/Car images/Tata tiago/image1.jpg",
//     "/Car images/Tata tiago/image2.jpg",
//     "/Car images/Tata tiago/image3.jpg",
//     "/Car images/Tata tiago/image4.jpg",
//     "/Car images/Tata tiago/image5.jpg",
//     "/Car images/Tata tiago/image6.jpg",
//   ],
//   tigor: [
//     "/Car images/Tata tigor/image1.avif",
//     "/Car images/Tata tigor/image2.avif",
//     "/Car images/Tata tigor/image3.avif",
//     "/Car images/Tata tigor/image4.avif",
//     "/Car images/Tata tigor/image5.avif",
//   ],
//   altroz: [
//     "/Car images/Tata altroz/image1.avif",
//     "/Car images/Tata altroz/image2.avif",
//     "/Car images/Tata altroz/image3.avif",
//     "/Car images/Tata altroz/image4.avif",
//     "/Car images/Tata altroz/image5.avif",
//     "/Car images/Tata altroz/image6.avif",
//     "/Car images/Tata altroz/image7.avif",
//   ],
//   punch: [
//     "/Car images/Tata punch/image1.jpg",
//     "/Car images/Tata punch/image2.jpg",
//     "/Car images/Tata punch/image3.jpg",
//     "/Car images/Tata punch/image4.jpg",
//     "/Car images/Tata punch/image5.jpg",
//   ],
//   "punch-ev": [
//     "/Car images/Tata punch/image1.jpg",
//     "/Car images/Tata punch/image2.jpg",
//     "/Car images/Tata punch/image3.jpg",
//     "/Car images/Tata punch/image4.jpg",
//     "/Car images/Tata punch/image5.jpg",
//   ],
//   nexon: [
//     "/Car images/Tata nexon/image1.avif",
//     "/Car images/Tata nexon/image2.avif",
//     "/Car images/Tata nexon/image3.avif",
//     "/Car images/Tata nexon/image4.avif",
//     "/Car images/Tata nexon/image5.avif",
//     "/Car images/Tata nexon/image6.avif",
//   ],
//   "nexon-ev": [
//     "/Car images/Tata nexon/image1.avif",
//     "/Car images/Tata nexon/image2.avif",
//     "/Car images/Tata nexon/image3.avif",
//     "/Car images/Tata nexon/image4.avif",
//     "/Car images/Tata nexon/image5.avif",
//     "/Car images/Tata nexon/image6.avif",
//   ],
//   curvv: [
//     "/Car images/Tata curv/image1.avif",
//     "/Car images/Tata curv/image2.avif",
//     "/Car images/Tata curv/image3.avif",
//     "/Car images/Tata curv/image4.avif",
//     "/Car images/Tata curv/image5.avif",
//     "/Car images/Tata curv/image6.avif",
//     "/Car images/Tata curv/image7.avif",
//   ],
//   "curvv-ev": [
//     "/Car images/Tata curv/image1.avif",
//     "/Car images/Tata curv/image2.avif",
//     "/Car images/Tata curv/image3.avif",
//     "/Car images/Tata curv/image4.avif",
//     "/Car images/Tata curv/image5.avif",
//     "/Car images/Tata curv/image6.avif",
//     "/Car images/Tata curv/image7.avif",
//   ],
//   harrier: [
//     "/Car images/Tata harrier/image1.avif",
//     "/Car images/Tata harrier/image2.avif",
//     "/Car images/Tata harrier/image3.avif",
//     "/Car images/Tata harrier/image4.avif",
//     "/Car images/Tata harrier/image5.avif",
//     "/Car images/Tata harrier/image6.avif",
//     "/Car images/Tata harrier/image7.avif",
//   ],
//   "harrier-ev": [
//     "/Car images/Tata harrier/image1.avif",
//     "/Car images/Tata harrier/image2.avif",
//     "/Car images/Tata harrier/image3.avif",
//     "/Car images/Tata harrier/image4.avif",
//     "/Car images/Tata harrier/image5.avif",
//     "/Car images/Tata harrier/image6.avif",
//     "/Car images/Tata harrier/image7.avif",
//   ],
//   safari: [
//     "/Car images/Tata safari/image1.avif",
//     "/Car images/Tata safari/image2.avif",
//     "/Car images/Tata safari/image3.avif",
//     "/Car images/Tata safari/image4.avif",
//     "/Car images/Tata safari/image5.avif",
//     "/Car images/Tata safari/image7.avif",
//     "/Car images/Tata safari/image8.avif",
//   ],
// };

// export type VehicleDetail = {
//   galleryKey: string;
//   description: string;
//   priceFrom: string;
//   fuelType?: string;
//   transmission?: string;
//   seatingCapacity?: number;
//   mileage?: string;
//   range?: string;
//   battery?: string;
//   charging?: string;
//   specifications: {
//     engine?: string;
//     power?: string;
//     torque?: string;
//     fuelType?: string;
//     transmission?: string;
//     seating?: string;
//     mileage?: string;
//     range?: string;
//     battery?: string;
//   };
//   highlights: string[];
// };

// export const VEHICLE_DETAILS: Record<string, VehicleDetail> = {
//   sierra: {
//     galleryKey: "sierra",
//     description:
//       "The legendary Tata Sierra returns — reimagined as a bold modern SUV with a distinctive three-window silhouette, glass tailgate, and Tata's most advanced connected-car and safety technologies. An icon reborn for a new era.",
//     priceFrom: "₹12.00 Lakh* (est.)",
//     fuelType: "Petrol (NA & TGDi Turbo) / Diesel",
//     transmission: "6-MT / 7-DCA / 6-AT",
//     seatingCapacity: 5,
//     mileage: "~17 kmpl (est.)",
//     specifications: {
//       engine: "1.5L NA Petrol / 1.5L TGDi Turbo Petrol / 1.5L Kryojet Diesel",
//       power: "106 PS (NA) · 160 PS (Turbo) · 118 PS (Diesel)",
//       torque: "145 Nm (NA) · 255 Nm (Turbo) · 260–280 Nm (Diesel)",
//       transmission: "6-MT / 7-DCA / 6-AT",
//       seating: "5",
//       mileage: "~17 kmpl (est.)",
//     },
//     highlights: [
//       "Iconic three-window & glass tailgate design",
//       "1.5L TGDi Turbo: 160 PS / 255 Nm",
//       "1.5L Kryojet Diesel: 118 PS / 280 Nm (AT)",
//       "ADAS Level 2 safety suite",
//       "Panoramic glass sunroof",
//       "iRA connected-car technology",
//       "Built on OMEGA-Arc platform",
//     ],
//   },

//   "sierra-ev": {
//     galleryKey: "sierra-ev",
//     description:
//       "The Tata Sierra EV brings the iconic three-window silhouette into the electric era — zero emissions, instant torque, ADAS Level 2, and Tata's most advanced connected-car technologies packed into a bold modern SUV.",
//     priceFrom: "₹17.49 Lakh* (est.)",
//     fuelType: "Electric",
//     seatingCapacity: 5,
//     range: "400+ km (claimed, est.)",
//     battery: "~60 kWh (est.)",
//     charging: "DC fast charging up to 100 kW (est.)",
//     specifications: {
//       power: "~170 bhp (est.)",
//       torque: "~280 Nm (est.)",
//       seating: "5",
//       range: "400+ km (est.)",
//       battery: "~60 kWh (est.)",
//     },
//     highlights: [
//       "Iconic three-window & glass tailgate design",
//       "Zero emissions electric powertrain",
//       "ADAS Level 2 safety suite",
//       "Panoramic glass sunroof",
//       "iRA connected-car technology",
//       "DC fast charging support",
//       "Built on OMEGA-Arc platform",
//       "V2L capability (est.)",
//     ],
//   },

//   tiago: {
//     galleryKey: "tiago",
//     description:
//       "The Tata Tiago is a feature-packed entry-level hatchback that punches well above its segment with a premium cabin, Harman sound system and a 5-star safety-first approach.",
//     priceFrom: "₹5.60 Lakh*",
//     fuelType: "Petrol / CNG",
//     transmission: "Manual / AMT",
//     seatingCapacity: 5,
//     mileage: "19.8 – 26.49 km/kg",
//     specifications: {
//       engine: "1.2 L Revotron",
//       power: "85 bhp",
//       torque: "113 Nm",
//       transmission: "5-MT / 5-AMT",
//       seating: "5",
//       mileage: "19.8 kmpl (Petrol)",
//     },
//     highlights: [
//       "Harman-powered infotainment",
//       "7-inch touchscreen with wireless AA & CP",
//       "Dual front airbags standard",
//       "AMT available across range",
//       "Best-in-class cabin space",
//       "Tata's proven ALFA architecture",
//     ],
//   },

//   "tiago-ev": {
//     galleryKey: "tiago-ev",
//     description:
//       "The Tata Tiago EV democratises electric mobility with an accessible price tag, a 315 km long-range option and Tata's trusted electric drivetrain.",
//     priceFrom: "₹8.49 Lakh*",
//     fuelType: "Electric",
//     seatingCapacity: 5,
//     range: "315 km (LR, claimed)",
//     battery: "24 kWh (LR) / 19.2 kWh (MR)",
//     charging: "DC fast charging up to 50 kW",
//     specifications: {
//       power: "74 bhp",
//       torque: "114 Nm",
//       seating: "5",
//       range: "315 km (LR)",
//       battery: "24 kWh (LR)",
//     },
//     highlights: [
//       "Up to 315 km claimed range (LR)",
//       "DC fast charging support",
//       "iRA connected car tech",
//       "Regenerative braking",
//       "Harman infotainment",
//       "Zippy single-speed electric motor",
//     ],
//   },

//   tigor: {
//     galleryKey: "tigor",
//     description:
//       "The Tata Tigor is a stylish compact sedan offering a massive 420 L boot, Harman audio, and iRA connected-car tech.",
//     priceFrom: "₹6.00 Lakh*",
//     fuelType: "Petrol / CNG",
//     transmission: "Manual / AMT",
//     seatingCapacity: 5,
//     mileage: "20.3 – 26.49 km/kg",
//     specifications: {
//       engine: "1.2 L Revotron",
//       power: "85 bhp",
//       torque: "113 Nm",
//       transmission: "5-MT / 5-AMT",
//       seating: "5",
//       mileage: "20.3 kmpl (Petrol)",
//     },
//     highlights: [
//       "420 L boot — segment leader",
//       "Harman 8-speaker audio",
//       "iRA connected-car system",
//       "AMT available",
//       "4-star GNCAP safety",
//       "CNG variant for lower running costs",
//     ],
//   },

//   altroz: {
//     galleryKey: "altroz",
//     description:
//       "The Tata Altroz is a premium hatchback built on the ALFA architecture, boasting a 5-star GNCAP rating, a 10.25-inch touchscreen and a dual-cylinder CNG option.",
//     priceFrom: "₹6.61 Lakh*",
//     fuelType: "Petrol / Diesel / CNG",
//     transmission: "Manual / DCT",
//     seatingCapacity: 5,
//     mileage: "19.0 – 28.08 km/kg",
//     specifications: {
//       engine: "1.2 L Revotron / 1.5 L Revotorq",
//       power: "85–90 bhp",
//       torque: "113–200 Nm",
//       transmission: "5-MT / 6-MT / 7-DCT",
//       seating: "5",
//       mileage: "20.35 kmpl (Petrol)",
//     },
//     highlights: [
//       "5-star GNCAP — safest in class",
//       "Dual-cylinder CNG (unique to segment)",
//       "10.25-inch HD infotainment",
//       "iRA connected-car tech",
//       "ARKAMYS sound system",
//       "DCA (dual clutch) available",
//     ],
//   },

//   punch: {
//     galleryKey: "punch",
//     description:
//       "The Tata Punch is a rugged micro-SUV loaded with SUV DNA — high ground clearance, 5-star GNCAP safety and a bold stance.",
//     priceFrom: "₹6.13 Lakh*",
//     fuelType: "Petrol / CNG",
//     transmission: "Manual / AMT",
//     seatingCapacity: 5,
//     mileage: "18.8 – 26.99 km/kg",
//     specifications: {
//       engine: "1.2 L Revotron",
//       power: "85 bhp",
//       torque: "113 Nm",
//       transmission: "5-MT / 5-AMT",
//       seating: "5",
//       mileage: "18.8 kmpl (Petrol)",
//     },
//     highlights: [
//       "5-star GNCAP — best in class",
//       "High ground clearance (187 mm)",
//       "360° parking camera",
//       "AMT across trims",
//       "Tri-arrow sculpted exterior",
//       "Multiple driving modes",
//     ],
//   },

//   "punch-ev": {
//     galleryKey: "punch-ev",
//     description:
//       "The Tata Punch EV combines rugged SUV character with a long-range electric powertrain delivering up to 421 km, V2L / V2V capability and ADAS features.",
//     priceFrom: "₹9.99 Lakh*",
//     fuelType: "Electric",
//     seatingCapacity: 5,
//     range: "421 km (LR, claimed)",
//     battery: "35 kWh (LR) / 25 kWh (MR)",
//     charging: "DC fast charging up to 50 kW",
//     specifications: {
//       power: "120 bhp",
//       torque: "190 Nm",
//       seating: "5",
//       range: "421 km (LR)",
//       battery: "35 kWh (LR)",
//     },
//     highlights: [
//       "421 km claimed range (LR)",
//       "Vehicle-to-Load (V2L) & V2V",
//       "ADAS safety suite",
//       "DC fast charging (50 kW)",
//       "High ground clearance (187 mm)",
//       "Smart connected-car features",
//     ],
//   },

//   nexon: {
//     galleryKey: "nexon",
//     description:
//       "India's benchmark compact SUV with 5-star GNCAP safety, panoramic sunroof, ADAS Level 2 and iRA connected-car technology.",
//     priceFrom: "₹8.10 Lakh*",
//     fuelType: "Petrol / Diesel / CNG",
//     transmission: "Manual / AMT / DCA",
//     seatingCapacity: 5,
//     mileage: "17.4 – 24.06 km/kg",
//     specifications: {
//       engine: "1.2 L Revotron Turbo / 1.5 L Revotorq",
//       power: "118–130 bhp",
//       torque: "170–260 Nm",
//       transmission: "6-MT / 6-DCA / 6-AT",
//       seating: "5",
//       mileage: "17.4 kmpl (Petrol Turbo)",
//     },
//     highlights: [
//       "5-star GNCAP rating",
//       "Panoramic glass sunroof",
//       "ADAS Level 2 (select trims)",
//       "iRA connected-car system",
//       "Wireless Android Auto & Apple CarPlay",
//       "Over-the-air software updates",
//     ],
//   },

//   "nexon-ev": {
//     galleryKey: "nexon-ev",
//     description:
//       "India's leading electric SUV delivering a claimed 465 km range, V2L capability, ADAS Level 2 and fast charging support.",
//     priceFrom: "₹14.49 Lakh*",
//     fuelType: "Electric",
//     seatingCapacity: 5,
//     range: "465 km (claimed)",
//     battery: "40.5 kWh",
//     charging: "DC fast charging up to 70 kW",
//     specifications: {
//       power: "143 bhp",
//       torque: "215 Nm",
//       seating: "5",
//       range: "465 km",
//       battery: "40.5 kWh",
//     },
//     highlights: [
//       "465 km claimed range",
//       "V2L (Vehicle-to-Load) capability",
//       "ADAS Level 2 safety suite",
//       "DC fast charging (70 kW)",
//       "iRA connected-car tech",
//       "Over-the-air updates",
//     ],
//   },

//   curvv: {
//     galleryKey: "curvv",
//     description:
//       "Tata's coupe-SUV offering a sweeping fastback roofline, ADAS Level 2, and digital cockpit instrumentation.",
//     priceFrom: "₹10.00 Lakh*",
//     fuelType: "Petrol / Diesel",
//     transmission: "Manual / DCA / AT",
//     seatingCapacity: 5,
//     mileage: "16.5 – 21.0 kmpl",
//     specifications: {
//       engine: "1.2 L Revotron Turbo / 1.5 L Revotorq",
//       power: "118–125 bhp",
//       torque: "170–260 Nm",
//       transmission: "6-MT / 6-DCA / 6-AT",
//       seating: "5",
//       mileage: "16.5 kmpl (Petrol)",
//     },
//     highlights: [
//       "Distinctive coupe-SUV silhouette",
//       "ADAS Level 2",
//       "12.3-inch floating touchscreen",
//       "Panoramic glass sunroof",
//       "Wireless AA & CP",
//       "360° surround camera",
//     ],
//   },

//   "curvv-ev": {
//     galleryKey: "curvv-ev",
//     description:
//       "Tata's flagship electric coupe-SUV delivering a claimed 502 km range, V2L, ADAS Level 2, and fast charging.",
//     priceFrom: "₹17.49 Lakh*",
//     fuelType: "Electric",
//     seatingCapacity: 5,
//     range: "502 km (claimed)",
//     battery: "55 kWh",
//     charging: "DC fast charging up to 70 kW",
//     specifications: {
//       power: "167 bhp",
//       torque: "215 Nm",
//       seating: "5",
//       range: "502 km",
//       battery: "55 kWh",
//     },
//     highlights: [
//       "502 km claimed range",
//       "ADAS Level 2 safety suite",
//       "V2L capability",
//       "12.3-inch premium infotainment",
//       "Coupe-SUV fastback design",
//       "Over-the-air updates",
//     ],
//   },

//   harrier: {
//     galleryKey: "harrier",
//     description:
//       "Built on the Land Rover–derived OMEGARC platform, featuring a panoramic sunroof, JBL audio, and ADAS Level 2.",
//     priceFrom: "₹15.49 Lakh*",
//     fuelType: "Diesel",
//     transmission: "Manual / Automatic",
//     seatingCapacity: 5,
//     mileage: "16.35 kmpl",
//     specifications: {
//       engine: "2.0 L Kryotec Diesel",
//       power: "168 bhp",
//       torque: "350 Nm",
//       transmission: "6-MT / 6-AT",
//       seating: "5",
//       mileage: "16.35 kmpl (Diesel)",
//     },
//     highlights: [
//       "Land Rover–derived D8 platform",
//       "Panoramic sunroof",
//       "ADAS Level 2",
//       "JBL 10-speaker sound system",
//       "360° surround view camera",
//       "Multiple terrain modes",
//     ],
//   },

//   "harrier-ev": {
//     galleryKey: "harrier-ev",
//     description:
//       "Flagship dual-motor AWD electric SUV with ADAS Level 2, V2L/V2H bidirectional charging, and 540+ km range.",
//     priceFrom: "₹21.49 Lakh*",
//     fuelType: "Electric",
//     seatingCapacity: 5,
//     range: "540+ km (claimed)",
//     battery: "~66 kWh",
//     charging: "DC fast charging up to 150 kW",
//     specifications: {
//       power: "296 bhp (AWD)",
//       torque: "568 Nm (AWD)",
//       seating: "5",
//       range: "540+ km",
//       battery: "~66 kWh",
//     },
//     highlights: [
//       "Dual-motor AWD",
//       "ADAS Level 2 full suite",
//       "V2L / V2H capability",
//       "DC fast charging (150 kW)",
//       "Land Rover–derived platform",
//       "Over-the-air updates",
//     ],
//   },

//   safari: {
//     galleryKey: "safari",
//     description:
//       "Flagship 6 & 7-seater SUV with ADAS Level 2, ventilated captain seats, terrain response, and JBL surround sound.",
//     priceFrom: "₹16.19 Lakh*",
//     fuelType: "Diesel",
//     transmission: "Manual / Automatic",
//     seatingCapacity: 7,
//     mileage: "16.30 kmpl",
//     specifications: {
//       engine: "2.0 L Kryotec Diesel",
//       power: "168 bhp",
//       torque: "350 Nm",
//       transmission: "6-MT / 6-AT",
//       seating: "6 or 7",
//       mileage: "16.30 kmpl (Diesel)",
//     },
//     highlights: [
//       "6 & 7 seat variants",
//       "ADAS Level 2",
//       "Panoramic sunroof",
//       "Terrain response modes",
//       "JBL 12-speaker sound system",
//       "Iconic Safari legacy",
//     ],
//   },
// };

// export function resolveGalleryKey(offerId: string): string {
//   if (offerId.startsWith("sierra-ev"))  return "sierra-ev";
//   if (offerId.startsWith("sierra"))     return "sierra";
//   if (offerId.startsWith("harrier-ev")) return "harrier-ev";
//   if (offerId.startsWith("harrier"))    return "harrier";
//   if (offerId.startsWith("safari"))     return "safari";
//   if (offerId.startsWith("curvv-ev"))   return "curvv-ev";
//   if (offerId.startsWith("curvv"))      return "curvv";
//   if (offerId.startsWith("nexon-ev"))   return "nexon-ev";
//   if (offerId.startsWith("nexon"))      return "nexon";
//   if (offerId.startsWith("punch-ev"))   return "punch-ev";
//   if (offerId.startsWith("punch"))      return "punch";
//   if (offerId.startsWith("altroz"))     return "altroz";
//   if (offerId.startsWith("tiago-ev"))   return "tiago-ev";
//   if (offerId.startsWith("tiago"))      return "tiago";
//   if (offerId.startsWith("tigor"))      return "tigor";
//   return "tiago";
// }

// export function resolveVehicleDetail(offerId: string): VehicleDetail {
//   const key = resolveGalleryKey(offerId);
//   return VEHICLE_DETAILS[key] ?? VEHICLE_DETAILS["tiago"];
// }

// export type EnquiryType =
//   | "Get Offer"
//   | "Test Drive"
//   | "Exchange"
//   | "Finance"
//   | "General Enquiry";

// export const SHOWROOMS = [
//   "Garud Tata Palam",
//   "Garud Tata Narela",
//   "Garud Tata Najafgarh",
// ] as const;

// export const ENQUIRY_TYPES: EnquiryType[] = [
//   "Get Offer",
//   "Test Drive",
//   "Exchange",
//   "Finance",
//   "General Enquiry",
// ];

// export const CARS = [
//   "Tata Sierra",
//   "Tata Harrier",
//   "Tata Safari",
//   "Tata Curvv",
//   "Tata Curvv EV",
//   "Tata Nexon",
//   "Tata Nexon EV",
//   "Tata Punch EV",
//   "Tata Altroz",
//   "Tata Tiago",
//   "Tata Tiago EV",
//   "Tata Tigor",
// ] as const;

// export type TataOffer = {
//   id: string;
//   slug: string;
//   model: string;
//   variantLabel?: string;
//   powertrain: Powertrain;
//   category: Category;
//   modelYear: ModelYear;
//   consumerOffer?: number;
//   exchangeBenefit?: number;
//   scrappageBenefit?: number;
//   loyaltyBenefit?: number;
//   totalBenefit: number;
//   featured?: boolean;
//   eligibility?: string;
//   active: boolean;
// };

// export const BENEFIT_ROWS: {
//   key: keyof Pick<TataOffer, "consumerOffer" | "exchangeBenefit" | "scrappageBenefit" | "loyaltyBenefit">;
//   label: string;
//   short: string;
// }[] = [
//   { key: "consumerOffer",    label: "Consumer Offer",    short: "Consumer"  },
//   { key: "exchangeBenefit",  label: "Exchange Benefit",  short: "Exchange"  },
//   { key: "scrappageBenefit", label: "Scrappage Benefit", short: "Scrappage" },
//   { key: "loyaltyBenefit",   label: "Loyalty Benefit",   short: "Loyalty"   },
// ];

// export const LAST_UPDATED = "3 September 2026";

// export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

// export const OFFERS: TataOffer[] = [

//   // ── SIERRA ───────────────────────────────────────────────────────────────
//   {
//     id: "sierra-petrol",
//     slug: "sierra-petrol",
//     model: "Sierra",
//     variantLabel: "Petrol",
//     powertrain: "Petrol",
//     category: "SUV",
//     modelYear: "MY25",
//     totalBenefit: 30000,
//     active: true,
//   },
//   {
//     id: "sierra-diesel",
//     slug: "sierra-diesel",
//     model: "Sierra",
//     variantLabel: "Diesel",
//     powertrain: "Diesel",
//     category: "SUV",
//     modelYear: "MY25",
//     totalBenefit: 30000,
//     active: true,
//   },

//   // ── TIAGO ────────────────────────────────────────────────────────────────
//   {
//     id: "tiago-petrol",
//     slug: "tiago-petrol",
//     model: "Tiago",
//     variantLabel: "Petrol (Excl. XE)",
//     powertrain: "Petrol",
//     category: "Hatchback",
//     modelYear: "MY25",
//     totalBenefit: 40000,
//     eligibility: "Excludes XE variant",
//     active: true,
//   },
//   {
//     id: "tiago-cng",
//     slug: "tiago-cng",
//     model: "Tiago",
//     variantLabel: "CNG (Excl. XE)",
//     powertrain: "CNG",
//     category: "Hatchback",
//     modelYear: "MY25",
//     totalBenefit: 40000,
//     eligibility: "Excludes XE variant",
//     active: true,
//   },

//   // ── TIGOR ────────────────────────────────────────────────────────────────
//   {
//     id: "tigor",
//     slug: "tigor",
//     model: "Tigor",
//     powertrain: "Petrol",
//     category: "Sedan",
//     modelYear: "MY25",
//     totalBenefit: 35000,
//     active: true,
//   },

//   // ── TIGOR EV ──────────────────────────────────────────────────────────────
// {
//   id: "tigor-ev",
//   slug: "tigor-ev",
//   model: "Tigor",
//   variantLabel: "EV — all variants",
//   powertrain: "Electric",
//   category: "EV",
//   modelYear: "MY25",
//   totalBenefit: 80000,
//   active: true,
// },
//   // ── ALTROZ ───────────────────────────────────────────────────────────────
//   {
//     id: "altroz-petrol",
//     slug: "altroz-petrol",
//     model: "Altroz",
//     variantLabel: "Petrol",
//     powertrain: "Petrol",
//     category: "Hatchback",
//     modelYear: "MY25",
//     totalBenefit: 43000,
//     active: true,
//   },
//   {
//     id: "altroz-cng",
//     slug: "altroz-cng",
//     model: "Altroz",
//     variantLabel: "CNG",
//     powertrain: "CNG",
//     category: "Hatchback",
//     modelYear: "MY25",
//     totalBenefit: 63000,
//     active: true,
//   },
//   {
//     id: "altroz-diesel",
//     slug: "altroz-diesel",
//     model: "Altroz",
//     variantLabel: "Diesel",
//     powertrain: "Diesel",
//     category: "Hatchback",
//     modelYear: "MY25",
//     totalBenefit: 43000,
//     active: true,
//   },

//   // ── NEXON (ICE) ──────────────────────────────────────────────────────────
//   {
//     id: "nexon-petrol-entry",
//     slug: "nexon-petrol-entry",
//     model: "Nexon",
//     variantLabel: "Petrol – Smart+, SmartS, Pure, Pure S, Pure+ S, Pure+ PS (MT only)",
//     powertrain: "Petrol",
//     category: "SUV",
//     modelYear: "MY25",
//     totalBenefit: 82500,
//     eligibility: "Only MT variants: Smart+, SmartS, Pure, Pure S, Pure+ S, Pure+ PS",
//     active: true,
//   },
//   {
//     id: "nexon-petrol-remaining",
//     slug: "nexon-petrol-remaining",
//     model: "Nexon",
//     variantLabel: "Petrol – Remaining variants",
//     powertrain: "Petrol",
//     category: "SUV",
//     modelYear: "MY25",
//     totalBenefit: 62500,
//     eligibility: "All Nexon Petrol PLs not listed in the MT entry offer",
//     active: true,
//   },
//   {
//     id: "nexon-cng",
//     slug: "nexon-cng",
//     model: "Nexon",
//     variantLabel: "CNG",
//     powertrain: "CNG",
//     category: "SUV",
//     modelYear: "MY25",
//     totalBenefit: 67500,
//     active: true,
//   },
//   {
//     id: "nexon-diesel",
//     slug: "nexon-diesel",
//     model: "Nexon",
//     variantLabel: "Diesel",
//     powertrain: "Diesel",
//     category: "SUV",
//     modelYear: "MY25",
//     totalBenefit: 27500,
//     active: true,
//   },

//   // ── CURVV (ICE) ──────────────────────────────────────────────────────────
//   {
//     id: "curvv",
//     slug: "curvv",
//     model: "Curvv",
//     variantLabel: "All variants",
//     powertrain: "Petrol",
//     category: "SUV",
//     modelYear: "MY25",
//     totalBenefit: 132500,
//     active: true,
//   },

//   // ── HARRIER (ICE) ────────────────────────────────────────────────────────
//   {
//     id: "harrier-d",
//     slug: "harrier-d",
//     model: "Harrier",
//     variantLabel: "Diesel",
//     powertrain: "Diesel",
//     category: "SUV",
//     modelYear: "MY25",
//     totalBenefit: 62000,
//     active: true,
//   },

//   // ── SAFARI (ICE) ─────────────────────────────────────────────────────────
//   {
//     id: "safari-d",
//     slug: "safari-d",
//     model: "Safari",
//     variantLabel: "Diesel",
//     powertrain: "Diesel",
//     category: "SUV",
//     modelYear: "MY25",
//     totalBenefit: 62000,
//     active: true,
//   },

//   // ── TIAGO EV ─────────────────────────────────────────────────────────────
//   {
//     id: "tiago-ev-lr-xt",
//     slug: "tiago-ev-lr-xt",
//     model: "Tiago",
//     variantLabel: "EV LR XT",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     totalBenefit: 160000,
//     active: true,
//   },
//   {
//     id: "tiago-ev-lr-xz",
//     slug: "tiago-ev-lr-xz",
//     model: "Tiago",
//     variantLabel: "EV LR XZ+ & above",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     totalBenefit: 140000,
//     active: true,
//   },
//   {
//     id: "tiago-ev-mr",
//     slug: "tiago-ev-mr",
//     model: "Tiago",
//     variantLabel: "EV MR — all variants",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     totalBenefit: 80000,
//     active: true,
//   },

//   // ── PUNCH EV ─────────────────────────────────────────────────────────────
//   {
//     id: "punch-ev-lr",
//     slug: "punch-ev-lr",
//     model: "Punch",
//     variantLabel: "EV LR — all variants (Outgoing)",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY24",
//     totalBenefit: 160000,
//     eligibility: "Outgoing stock — LR variants",
//     active: true,
//   },
//   {
//     id: "punch-ev-mr",
//     slug: "punch-ev-mr",
//     model: "Punch",
//     variantLabel: "EV MR — excl. Smart (Outgoing)",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY24",
//     totalBenefit: 140000,
//     eligibility: "Outgoing stock — MR variants except Smart",
//     active: true,
//   },
//   {
//     id: "punch-ev-smart",
//     slug: "punch-ev-smart",
//     model: "Punch",
//     variantLabel: "EV Smart & Smart+ (Outgoing)",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY24",
//     totalBenefit: 110000,
//     eligibility: "Outgoing stock — Smart variants",
//     active: true,
//   },

//   // ── NEXON EV ─────────────────────────────────────────────────────────────
//   {
//     id: "nexon-ev",
//     slug: "nexon-ev",
//     model: "Nexon",
//     variantLabel: "EV 3.0",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     totalBenefit: 60000,
//     active: true,
//   },

//   // ── CURVV EV ─────────────────────────────────────────────────────────────
//   {
//     id: "curvv-ev-creative",
//     slug: "curvv-ev-creative",
//     model: "Curvv",
//     variantLabel: "EV — Creative",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     totalBenefit: 300000,
//     eligibility: "Creative variant only",
//     active: true,
//   },
//   {
//     id: "curvv-ev-wox",
//     slug: "curvv-ev-wox",
//     model: "Curvv",
//     variantLabel: "EV — w/o X",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     totalBenefit: 350000,
//     eligibility: "All EV variants excluding X trim",
//     featured: true,
//     active: true,
//   },
//   {
//     id: "curvv-ev-x",
//     slug: "curvv-ev-x",
//     model: "Curvv",
//     variantLabel: "EV — X",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     totalBenefit: 80000,
//     eligibility: "X trim only",
//     active: true,
//   },

//   // ── HARRIER EV ───────────────────────────────────────────────────────────
//   {
//     id: "harrier-ev-adventure",
//     slug: "harrier-ev-adventure",
//     model: "Harrier",
//     variantLabel: "EV — Adventure",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     totalBenefit: 250000,
//     eligibility: "Adventure variant",
//     active: true,
//   },
//   {
//     id: "harrier-ev-fearless",
//     slug: "harrier-ev-fearless",
//     model: "Harrier",
//     variantLabel: "EV — Fearless+ / Empowered",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     totalBenefit: 275000,
//     eligibility: "Fearless+ and Empowered variants",
//     active: true,
//   },
//   {
//     id: "harrier-ev-awd-stealth",
//     slug: "harrier-ev-awd-stealth",
//     model: "Harrier",
//     variantLabel: "EV — Empowered AWD Stealth 75 ACFC",
//     powertrain: "Electric",
//     category: "EV",
//     modelYear: "MY25",
//     totalBenefit: 225000,
//     eligibility: "Only in Delhi — Empowered AWD Stealth 75 ACFC",
//     active: true,
//   },
// ];

// export function getOfferBySlug(slug: string): TataOffer | undefined {
//   return OFFERS.find((o) => o.id === slug);
// }




























// ─────────────────────────────────────────────────────────────────────────────
// lib/tata-offers.ts
// ─────────────────────────────────────────────────────────────────────────────

export type Category   = "SUV" | "Hatchback" | "Sedan" | "EV";
export type ModelYear  = "MY24" | "MY25";
export type Powertrain = "Petrol" | "CNG" | "Diesel" | "Electric";

export const MODEL_GALLERY: Record<string, string[]> = {
  sierra: [
    "/Car images/Tata sierra/image1.avif",
    "/Car images/Tata sierra/image2.avif",
    "/Car images/Tata sierra/image3.avif",
    "/Car images/Tata sierra/image4.avif",
    "/Car images/Tata sierra/image5.avif",
  ],
  "sierra-ev": [
    "/Car images/Tata sierra/image1.avif",
    "/Car images/Tata sierra/image2.avif",
    "/Car images/Tata sierra/image3.avif",
    "/Car images/Tata sierra/image4.avif",
    "/Car images/Tata sierra/image5.avif",
  ],
  tiago: [
    "/Car images/Tata tiago/image1.jpg",
    "/Car images/Tata tiago/image2.jpg",
    "/Car images/Tata tiago/image3.jpg",
    "/Car images/Tata tiago/image4.jpg",
    "/Car images/Tata tiago/image5.jpg",
    "/Car images/Tata tiago/image6.jpg",
  ],
  "tiago-ev": [
    "/Car images/Tata tiago/image1.jpg",
    "/Car images/Tata tiago/image2.jpg",
    "/Car images/Tata tiago/image3.jpg",
    "/Car images/Tata tiago/image4.jpg",
    "/Car images/Tata tiago/image5.jpg",
    "/Car images/Tata tiago/image6.jpg",
  ],
  tigor: [
    "/Car images/Tata tigor/image1.avif",
    "/Car images/Tata tigor/image2.avif",
    "/Car images/Tata tigor/image3.avif",
    "/Car images/Tata tigor/image4.avif",
    "/Car images/Tata tigor/image5.avif",
  ],
  altroz: [
    "/Car images/Tata altroz/image1.avif",
    "/Car images/Tata altroz/image2.avif",
    "/Car images/Tata altroz/image3.avif",
    "/Car images/Tata altroz/image4.avif",
    "/Car images/Tata altroz/image5.avif",
    "/Car images/Tata altroz/image6.avif",
    "/Car images/Tata altroz/image7.avif",
  ],
  punch: [
    "/Car images/Tata punch/image1.jpg",
    "/Car images/Tata punch/image2.jpg",
    "/Car images/Tata punch/image3.jpg",
    "/Car images/Tata punch/image4.jpg",
    "/Car images/Tata punch/image5.jpg",
  ],
  "punch-ev": [
    "/Car images/Tata punch/image1.jpg",
    "/Car images/Tata punch/image2.jpg",
    "/Car images/Tata punch/image3.jpg",
    "/Car images/Tata punch/image4.jpg",
    "/Car images/Tata punch/image5.jpg",
  ],
  nexon: [
    "/Car images/Tata nexon/image1.avif",
    "/Car images/Tata nexon/image2.avif",
    "/Car images/Tata nexon/image3.avif",
    "/Car images/Tata nexon/image4.avif",
    "/Car images/Tata nexon/image5.avif",
    "/Car images/Tata nexon/image6.avif",
  ],
  "nexon-ev": [
    "/Car images/Tata nexon/image1.avif",
    "/Car images/Tata nexon/image2.avif",
    "/Car images/Tata nexon/image3.avif",
    "/Car images/Tata nexon/image4.avif",
    "/Car images/Tata nexon/image5.avif",
    "/Car images/Tata nexon/image6.avif",
  ],
  curvv: [
    "/Car images/Tata curv/image1.avif",
    "/Car images/Tata curv/image2.avif",
    "/Car images/Tata curv/image3.avif",
    "/Car images/Tata curv/image4.avif",
    "/Car images/Tata curv/image5.avif",
    "/Car images/Tata curv/image6.avif",
    "/Car images/Tata curv/image7.avif",
  ],
  "curvv-ev": [
    "/Car images/Tata curv/image1.avif",
    "/Car images/Tata curv/image2.avif",
    "/Car images/Tata curv/image3.avif",
    "/Car images/Tata curv/image4.avif",
    "/Car images/Tata curv/image5.avif",
    "/Car images/Tata curv/image6.avif",
    "/Car images/Tata curv/image7.avif",
  ],
  harrier: [
    "/Car images/Tata harrier/image1.avif",
    "/Car images/Tata harrier/image2.avif",
    "/Car images/Tata harrier/image3.avif",
    "/Car images/Tata harrier/image4.avif",
    "/Car images/Tata harrier/image5.avif",
    "/Car images/Tata harrier/image6.avif",
    "/Car images/Tata harrier/image7.avif",
  ],
  "harrier-ev": [
    "/Car images/Tata harrier/image1.avif",
    "/Car images/Tata harrier/image2.avif",
    "/Car images/Tata harrier/image3.avif",
    "/Car images/Tata harrier/image4.avif",
    "/Car images/Tata harrier/image5.avif",
    "/Car images/Tata harrier/image6.avif",
    "/Car images/Tata harrier/image7.avif",
  ],
  safari: [
    "/Car images/Tata safari/image1.avif",
    "/Car images/Tata safari/image2.avif",
    "/Car images/Tata safari/image3.avif",
    "/Car images/Tata safari/image4.avif",
    "/Car images/Tata safari/image5.avif",
    "/Car images/Tata safari/image7.avif",
    "/Car images/Tata safari/image8.avif",
  ],
};

export type VehicleDetail = {
  galleryKey: string;
  description: string;
  priceFrom: string;
  fuelType?: string;
  transmission?: string;
  seatingCapacity?: number;
  mileage?: string;
  range?: string;
  battery?: string;
  charging?: string;
  specifications: {
    engine?: string;
    power?: string;
    torque?: string;
    fuelType?: string;
    transmission?: string;
    seating?: string;
    mileage?: string;
    range?: string;
    battery?: string;
  };
  highlights: string[];
};

export const VEHICLE_DETAILS: Record<string, VehicleDetail> = {
  sierra: {
    galleryKey: "sierra",
    description:
      "The legendary Tata Sierra returns — reimagined as a bold modern SUV with a distinctive three-window silhouette, glass tailgate, and Tata's most advanced connected-car and safety technologies. An icon reborn for a new era.",
    priceFrom: "₹12.00 Lakh* (est.)",
    fuelType: "Petrol (NA & TGDi Turbo) / Diesel",
    transmission: "6-MT / 7-DCA / 6-AT",
    seatingCapacity: 5,
    mileage: "~17 kmpl (est.)",
    specifications: {
      engine: "1.5L NA Petrol / 1.5L TGDi Turbo Petrol / 1.5L Kryojet Diesel",
      power: "106 PS (NA) · 160 PS (Turbo) · 118 PS (Diesel)",
      torque: "145 Nm (NA) · 255 Nm (Turbo) · 260–280 Nm (Diesel)",
      transmission: "6-MT / 7-DCA / 6-AT",
      seating: "5",
      mileage: "~17 kmpl (est.)",
    },
    highlights: [
      "Iconic three-window & glass tailgate design",
      "1.5L TGDi Turbo: 160 PS / 255 Nm",
      "1.5L Kryojet Diesel: 118 PS / 280 Nm (AT)",
      "ADAS Level 2 safety suite",
      "Panoramic glass sunroof",
      "iRA connected-car technology",
      "Built on OMEGA-Arc platform",
    ],
  },

  "sierra-ev": {
    galleryKey: "sierra-ev",
    description:
      "The Tata Sierra EV brings the iconic three-window silhouette into the electric era — zero emissions, instant torque, ADAS Level 2, and Tata's most advanced connected-car technologies packed into a bold modern SUV.",
    priceFrom: "₹17.49 Lakh* (est.)",
    fuelType: "Electric",
    seatingCapacity: 5,
    range: "400+ km (claimed, est.)",
    battery: "~60 kWh (est.)",
    charging: "DC fast charging up to 100 kW (est.)",
    specifications: {
      power: "~170 bhp (est.)",
      torque: "~280 Nm (est.)",
      seating: "5",
      range: "400+ km (est.)",
      battery: "~60 kWh (est.)",
    },
    highlights: [
      "Iconic three-window & glass tailgate design",
      "Zero emissions electric powertrain",
      "ADAS Level 2 safety suite",
      "Panoramic glass sunroof",
      "iRA connected-car technology",
      "DC fast charging support",
      "Built on OMEGA-Arc platform",
      "V2L capability (est.)",
    ],
  },

  tiago: {
    galleryKey: "tiago",
    description:
      "The Tata Tiago is a feature-packed entry-level hatchback that punches well above its segment with a premium cabin, Harman sound system and a 5-star safety-first approach.",
    priceFrom: "₹5.60 Lakh*",
    fuelType: "Petrol / CNG",
    transmission: "Manual / AMT",
    seatingCapacity: 5,
    mileage: "19.8 – 26.49 km/kg",
    specifications: {
      engine: "1.2 L Revotron",
      power: "85 bhp",
      torque: "113 Nm",
      transmission: "5-MT / 5-AMT",
      seating: "5",
      mileage: "19.8 kmpl (Petrol)",
    },
    highlights: [
      "Harman-powered infotainment",
      "7-inch touchscreen with wireless AA & CP",
      "Dual front airbags standard",
      "AMT available across range",
      "Best-in-class cabin space",
      "Tata's proven ALFA architecture",
    ],
  },

  "tiago-ev": {
    galleryKey: "tiago-ev",
    description:
      "The Tata Tiago EV democratises electric mobility with an accessible price tag, a 315 km long-range option and Tata's trusted electric drivetrain.",
    priceFrom: "₹8.49 Lakh*",
    fuelType: "Electric",
    seatingCapacity: 5,
    range: "315 km (LR, claimed)",
    battery: "24 kWh (LR) / 19.2 kWh (MR)",
    charging: "DC fast charging up to 50 kW",
    specifications: {
      power: "74 bhp",
      torque: "114 Nm",
      seating: "5",
      range: "315 km (LR)",
      battery: "24 kWh (LR)",
    },
    highlights: [
      "Up to 315 km claimed range (LR)",
      "DC fast charging support",
      "iRA connected car tech",
      "Regenerative braking",
      "Harman infotainment",
      "Zippy single-speed electric motor",
    ],
  },

  tigor: {
    galleryKey: "tigor",
    description:
      "The Tata Tigor is a stylish compact sedan offering a massive 420 L boot, Harman audio, and iRA connected-car tech.",
    priceFrom: "₹6.00 Lakh*",
    fuelType: "Petrol / CNG",
    transmission: "Manual / AMT",
    seatingCapacity: 5,
    mileage: "20.3 – 26.49 km/kg",
    specifications: {
      engine: "1.2 L Revotron",
      power: "85 bhp",
      torque: "113 Nm",
      transmission: "5-MT / 5-AMT",
      seating: "5",
      mileage: "20.3 kmpl (Petrol)",
    },
    highlights: [
      "420 L boot — segment leader",
      "Harman 8-speaker audio",
      "iRA connected-car system",
      "AMT available",
      "4-star GNCAP safety",
      "CNG variant for lower running costs",
    ],
  },

  altroz: {
    galleryKey: "altroz",
    description:
      "The Tata Altroz is a premium hatchback built on the ALFA architecture, boasting a 5-star GNCAP rating, a 10.25-inch touchscreen and a dual-cylinder CNG option.",
    priceFrom: "₹6.61 Lakh*",
    fuelType: "Petrol / Diesel / CNG",
    transmission: "Manual / DCT",
    seatingCapacity: 5,
    mileage: "19.0 – 28.08 km/kg",
    specifications: {
      engine: "1.2 L Revotron / 1.5 L Revotorq",
      power: "85–90 bhp",
      torque: "113–200 Nm",
      transmission: "5-MT / 6-MT / 7-DCT",
      seating: "5",
      mileage: "20.35 kmpl (Petrol)",
    },
    highlights: [
      "5-star GNCAP — safest in class",
      "Dual-cylinder CNG (unique to segment)",
      "10.25-inch HD infotainment",
      "iRA connected-car tech",
      "ARKAMYS sound system",
      "DCA (dual clutch) available",
    ],
  },

  punch: {
    galleryKey: "punch",
    description:
      "The Tata Punch is a rugged micro-SUV loaded with SUV DNA — high ground clearance, 5-star GNCAP safety and a bold stance.",
    priceFrom: "₹6.13 Lakh*",
    fuelType: "Petrol / CNG",
    transmission: "Manual / AMT",
    seatingCapacity: 5,
    mileage: "18.8 – 26.99 km/kg",
    specifications: {
      engine: "1.2 L Revotron",
      power: "85 bhp",
      torque: "113 Nm",
      transmission: "5-MT / 5-AMT",
      seating: "5",
      mileage: "18.8 kmpl (Petrol)",
    },
    highlights: [
      "5-star GNCAP — best in class",
      "High ground clearance (187 mm)",
      "360° parking camera",
      "AMT across trims",
      "Tri-arrow sculpted exterior",
      "Multiple driving modes",
    ],
  },

  "punch-ev": {
    galleryKey: "punch-ev",
    description:
      "The Tata Punch EV combines rugged SUV character with a long-range electric powertrain delivering up to 421 km, V2L / V2V capability and ADAS features.",
    priceFrom: "₹9.99 Lakh*",
    fuelType: "Electric",
    seatingCapacity: 5,
    range: "421 km (LR, claimed)",
    battery: "35 kWh (LR) / 25 kWh (MR)",
    charging: "DC fast charging up to 50 kW",
    specifications: {
      power: "120 bhp",
      torque: "190 Nm",
      seating: "5",
      range: "421 km (LR)",
      battery: "35 kWh (LR)",
    },
    highlights: [
      "421 km claimed range (LR)",
      "Vehicle-to-Load (V2L) & V2V",
      "ADAS safety suite",
      "DC fast charging (50 kW)",
      "High ground clearance (187 mm)",
      "Smart connected-car features",
    ],
  },

  nexon: {
    galleryKey: "nexon",
    description:
      "India's benchmark compact SUV with 5-star GNCAP safety, panoramic sunroof, ADAS Level 2 and iRA connected-car technology.",
    priceFrom: "₹8.10 Lakh*",
    fuelType: "Petrol / Diesel / CNG",
    transmission: "Manual / AMT / DCA",
    seatingCapacity: 5,
    mileage: "17.4 – 24.06 km/kg",
    specifications: {
      engine: "1.2 L Revotron Turbo / 1.5 L Revotorq",
      power: "118–130 bhp",
      torque: "170–260 Nm",
      transmission: "6-MT / 6-DCA / 6-AT",
      seating: "5",
      mileage: "17.4 kmpl (Petrol Turbo)",
    },
    highlights: [
      "5-star GNCAP rating",
      "Panoramic glass sunroof",
      "ADAS Level 2 (select trims)",
      "iRA connected-car system",
      "Wireless Android Auto & Apple CarPlay",
      "Over-the-air software updates",
    ],
  },

  "nexon-ev": {
    galleryKey: "nexon-ev",
    description:
      "India's leading electric SUV delivering a claimed 465 km range, V2L capability, ADAS Level 2 and fast charging support.",
    priceFrom: "₹14.49 Lakh*",
    fuelType: "Electric",
    seatingCapacity: 5,
    range: "465 km (claimed)",
    battery: "40.5 kWh",
    charging: "DC fast charging up to 70 kW",
    specifications: {
      power: "143 bhp",
      torque: "215 Nm",
      seating: "5",
      range: "465 km",
      battery: "40.5 kWh",
    },
    highlights: [
      "465 km claimed range",
      "V2L (Vehicle-to-Load) capability",
      "ADAS Level 2 safety suite",
      "DC fast charging (70 kW)",
      "iRA connected-car tech",
      "Over-the-air updates",
    ],
  },

  curvv: {
    galleryKey: "curvv",
    description:
      "Tata's coupe-SUV offering a sweeping fastback roofline, ADAS Level 2, and digital cockpit instrumentation.",
    priceFrom: "₹10.00 Lakh*",
    fuelType: "Petrol / Diesel",
    transmission: "Manual / DCA / AT",
    seatingCapacity: 5,
    mileage: "16.5 – 21.0 kmpl",
    specifications: {
      engine: "1.2 L Revotron Turbo / 1.5 L Revotorq",
      power: "118–125 bhp",
      torque: "170–260 Nm",
      transmission: "6-MT / 6-DCA / 6-AT",
      seating: "5",
      mileage: "16.5 kmpl (Petrol)",
    },
    highlights: [
      "Distinctive coupe-SUV silhouette",
      "ADAS Level 2",
      "12.3-inch floating touchscreen",
      "Panoramic glass sunroof",
      "Wireless AA & CP",
      "360° surround camera",
    ],
  },

  "curvv-ev": {
    galleryKey: "curvv-ev",
    description:
      "Tata's flagship electric coupe-SUV delivering a claimed 502 km range, V2L, ADAS Level 2, and fast charging.",
    priceFrom: "₹17.49 Lakh*",
    fuelType: "Electric",
    seatingCapacity: 5,
    range: "502 km (claimed)",
    battery: "55 kWh",
    charging: "DC fast charging up to 70 kW",
    specifications: {
      power: "167 bhp",
      torque: "215 Nm",
      seating: "5",
      range: "502 km",
      battery: "55 kWh",
    },
    highlights: [
      "502 km claimed range",
      "ADAS Level 2 safety suite",
      "V2L capability",
      "12.3-inch premium infotainment",
      "Coupe-SUV fastback design",
      "Over-the-air updates",
    ],
  },

  harrier: {
    galleryKey: "harrier",
    description:
      "Built on the Land Rover–derived OMEGARC platform, featuring a panoramic sunroof, JBL audio, and ADAS Level 2.",
    priceFrom: "₹15.49 Lakh*",
    fuelType: "Diesel",
    transmission: "Manual / Automatic",
    seatingCapacity: 5,
    mileage: "16.35 kmpl",
    specifications: {
      engine: "2.0 L Kryotec Diesel",
      power: "168 bhp",
      torque: "350 Nm",
      transmission: "6-MT / 6-AT",
      seating: "5",
      mileage: "16.35 kmpl (Diesel)",
    },
    highlights: [
      "Land Rover–derived D8 platform",
      "Panoramic sunroof",
      "ADAS Level 2",
      "JBL 10-speaker sound system",
      "360° surround view camera",
      "Multiple terrain modes",
    ],
  },

  "harrier-ev": {
    galleryKey: "harrier-ev",
    description:
      "Flagship dual-motor AWD electric SUV with ADAS Level 2, V2L/V2H bidirectional charging, and 540+ km range.",
    priceFrom: "₹21.49 Lakh*",
    fuelType: "Electric",
    seatingCapacity: 5,
    range: "540+ km (claimed)",
    battery: "~66 kWh",
    charging: "DC fast charging up to 150 kW",
    specifications: {
      power: "296 bhp (AWD)",
      torque: "568 Nm (AWD)",
      seating: "5",
      range: "540+ km",
      battery: "~66 kWh",
    },
    highlights: [
      "Dual-motor AWD",
      "ADAS Level 2 full suite",
      "V2L / V2H capability",
      "DC fast charging (150 kW)",
      "Land Rover–derived platform",
      "Over-the-air updates",
    ],
  },

  safari: {
    galleryKey: "safari",
    description:
      "Flagship 6 & 7-seater SUV with ADAS Level 2, ventilated captain seats, terrain response, and JBL surround sound.",
    priceFrom: "₹16.19 Lakh*",
    fuelType: "Diesel",
    transmission: "Manual / Automatic",
    seatingCapacity: 7,
    mileage: "16.30 kmpl",
    specifications: {
      engine: "2.0 L Kryotec Diesel",
      power: "168 bhp",
      torque: "350 Nm",
      transmission: "6-MT / 6-AT",
      seating: "6 or 7",
      mileage: "16.30 kmpl (Diesel)",
    },
    highlights: [
      "6 & 7 seat variants",
      "ADAS Level 2",
      "Panoramic sunroof",
      "Terrain response modes",
      "JBL 12-speaker sound system",
      "Iconic Safari legacy",
    ],
  },
};

export function resolveGalleryKey(offerId: string): string {
  if (offerId.startsWith("sierra-ev"))  return "sierra-ev";
  if (offerId.startsWith("sierra"))     return "sierra";
  if (offerId.startsWith("harrier-ev")) return "harrier-ev";
  if (offerId.startsWith("harrier"))    return "harrier";
  if (offerId.startsWith("safari"))     return "safari";
  if (offerId.startsWith("curvv-ev"))   return "curvv-ev";
  if (offerId.startsWith("curvv"))      return "curvv";
  if (offerId.startsWith("nexon-ev"))   return "nexon-ev";
  if (offerId.startsWith("nexon"))      return "nexon";
  if (offerId.startsWith("punch-ev"))   return "punch-ev";
  if (offerId.startsWith("punch"))      return "punch";
  if (offerId.startsWith("altroz"))     return "altroz";
  if (offerId.startsWith("tiago-ev"))   return "tiago-ev";
  if (offerId.startsWith("tiago"))      return "tiago";
  if (offerId.startsWith("tigor"))      return "tigor";
  return "tiago";
}

export function resolveVehicleDetail(offerId: string): VehicleDetail {
  const key = resolveGalleryKey(offerId);
  return VEHICLE_DETAILS[key] ?? VEHICLE_DETAILS["tiago"];
}

export type EnquiryType =
  | "Get Offer"
  | "Test Drive"
  | "Exchange"
  | "Finance"
  | "General Enquiry";

export const SHOWROOMS = [
  "Garud Tata Palam",
  "Garud Tata Narela",
  "Garud Tata Najafgarh",
] as const;

export const ENQUIRY_TYPES: EnquiryType[] = [
  "Get Offer",
  "Test Drive",
  "Exchange",
  "Finance",
  "General Enquiry",
];

export const CARS = [
  "Tata Sierra",
  "Tata Harrier",
  "Tata Safari",
  "Tata Curvv",
  "Tata Curvv EV",
  "Tata Nexon",
  "Tata Nexon EV",
  "Tata Punch EV",
  "Tata Altroz",
  "Tata Tiago",
  "Tata Tiago EV",
  "Tata Tigor",
] as const;

export type TataOffer = {
  id: string;
  slug: string;
  model: string;
  variantLabel?: string;
  powertrain: Powertrain;
  category: Category;
  modelYear: ModelYear;
  consumerOffer?: number;
  exchangeBenefit?: number;
  scrappageBenefit?: number;
  loyaltyBenefit?: number;
  totalBenefit: number;
  featured?: boolean;
  eligibility?: string;
  active: boolean;
};

export const BENEFIT_ROWS: {
  key: keyof Pick<TataOffer, "consumerOffer" | "exchangeBenefit" | "scrappageBenefit" | "loyaltyBenefit">;
  label: string;
  short: string;
}[] = [
  { key: "consumerOffer",    label: "Consumer Offer",    short: "Consumer"  },
  { key: "exchangeBenefit",  label: "Exchange Benefit",  short: "Exchange"  },
  { key: "scrappageBenefit", label: "Scrappage Benefit", short: "Scrappage" },
  { key: "loyaltyBenefit",   label: "Loyalty Benefit",   short: "Loyalty"   },
];

export const LAST_UPDATED = "3 September 2026";

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const OFFERS: TataOffer[] = [

  // ── SIERRA ───────────────────────────────────────────────────────────────
  {
    id: "sierra-petrol",
    slug: "sierra-petrol",
    model: "Sierra",
    variantLabel: "Petrol",
    powertrain: "Petrol",
    category: "SUV",
    modelYear: "MY25",
    totalBenefit: 30000,
    active: true,
  },
  {
    id: "sierra-diesel",
    slug: "sierra-diesel",
    model: "Sierra",
    variantLabel: "Diesel",
    powertrain: "Diesel",
    category: "SUV",
    modelYear: "MY25",
    totalBenefit: 30000,
    active: true,
  },

  // ── SIERRA EV ────────────────────────────────────────────────────────────
  // EV availability is recorded here. No promotional benefit is assumed
  // until the live campaign value is confirmed.
  {
    id: "sierra-ev",
    slug: "sierra-ev",
    model: "Sierra",
    variantLabel: "EV — Enquiry",
    powertrain: "Electric",
    category: "EV",
    modelYear: "MY25",
    totalBenefit: 0,
    active: true,
  },

  // ── TIAGO ────────────────────────────────────────────────────────────────
  {
    id: "tiago-petrol",
    slug: "tiago-petrol",
    model: "Tiago",
    variantLabel: "Petrol (Excl. XE)",
    powertrain: "Petrol",
    category: "Hatchback",
    modelYear: "MY25",
    totalBenefit: 40000,
    eligibility: "Excludes XE variant",
    active: true,
  },
  {
    id: "tiago-cng",
    slug: "tiago-cng",
    model: "Tiago",
    variantLabel: "CNG (Excl. XE)",
    powertrain: "CNG",
    category: "Hatchback",
    modelYear: "MY25",
    totalBenefit: 40000,
    eligibility: "Excludes XE variant",
    active: true,
  },

  // ── TIGOR ────────────────────────────────────────────────────────────────
  {
    id: "tigor",
    slug: "tigor",
    model: "Tigor",
    powertrain: "Petrol",
    category: "Sedan",
    modelYear: "MY25",
    totalBenefit: 35000,
    active: true,
  },

  // ── TIGOR EV ──────────────────────────────────────────────────────────────
{
  id: "tigor-ev",
  slug: "tigor-ev",
  model: "Tigor",
  variantLabel: "EV — all variants",
  powertrain: "Electric",
  category: "EV",
  modelYear: "MY25",
  totalBenefit: 80000,
  active: true,
},
  // ── ALTROZ ───────────────────────────────────────────────────────────────
  {
    id: "altroz-petrol",
    slug: "altroz-petrol",
    model: "Altroz",
    variantLabel: "Petrol",
    powertrain: "Petrol",
    category: "Hatchback",
    modelYear: "MY25",
    totalBenefit: 43000,
    active: true,
  },
  {
    id: "altroz-cng",
    slug: "altroz-cng",
    model: "Altroz",
    variantLabel: "CNG",
    powertrain: "CNG",
    category: "Hatchback",
    modelYear: "MY25",
    totalBenefit: 63000,
    active: true,
  },
  {
    id: "altroz-diesel",
    slug: "altroz-diesel",
    model: "Altroz",
    variantLabel: "Diesel",
    powertrain: "Diesel",
    category: "Hatchback",
    modelYear: "MY25",
    totalBenefit: 43000,
    active: true,
  },

  // ── NEXON (ICE) ──────────────────────────────────────────────────────────
  {
    id: "nexon-petrol-entry",
    slug: "nexon-petrol-entry",
    model: "Nexon",
    variantLabel: "Petrol – Smart+, SmartS, Pure, Pure S, Pure+ S, Pure+ PS (MT only)",
    powertrain: "Petrol",
    category: "SUV",
    modelYear: "MY25",
    totalBenefit: 82500,
    eligibility: "Only MT variants: Smart+, SmartS, Pure, Pure S, Pure+ S, Pure+ PS",
    active: true,
  },
  {
    id: "nexon-petrol-remaining",
    slug: "nexon-petrol-remaining",
    model: "Nexon",
    variantLabel: "Petrol – Remaining variants",
    powertrain: "Petrol",
    category: "SUV",
    modelYear: "MY25",
    totalBenefit: 62500,
    eligibility: "All Nexon Petrol PLs not listed in the MT entry offer",
    active: true,
  },
  {
    id: "nexon-cng",
    slug: "nexon-cng",
    model: "Nexon",
    variantLabel: "CNG",
    powertrain: "CNG",
    category: "SUV",
    modelYear: "MY25",
    totalBenefit: 67500,
    active: true,
  },
  {
    id: "nexon-diesel",
    slug: "nexon-diesel",
    model: "Nexon",
    variantLabel: "Diesel",
    powertrain: "Diesel",
    category: "SUV",
    modelYear: "MY25",
    totalBenefit: 27500,
    active: true,
  },

  // ── CURVV (ICE) ──────────────────────────────────────────────────────────
  {
    id: "curvv",
    slug: "curvv",
    model: "Curvv",
    variantLabel: "All variants",
    powertrain: "Petrol",
    category: "SUV",
    modelYear: "MY25",
    totalBenefit: 132500,
    active: true,
  },

  // ── HARRIER (ICE) ────────────────────────────────────────────────────────
  {
    id: "harrier-d",
    slug: "harrier-d",
    model: "Harrier",
    variantLabel: "Diesel",
    powertrain: "Diesel",
    category: "SUV",
    modelYear: "MY25",
    totalBenefit: 62000,
    active: true,
  },

  // ── SAFARI (ICE) ─────────────────────────────────────────────────────────
  {
    id: "safari-d",
    slug: "safari-d",
    model: "Safari",
    variantLabel: "Diesel",
    powertrain: "Diesel",
    category: "SUV",
    modelYear: "MY25",
    totalBenefit: 62000,
    active: true,
  },

  // ── TIAGO EV ─────────────────────────────────────────────────────────────
  {
    id: "tiago-ev-lr-xt",
    slug: "tiago-ev-lr-xt",
    model: "Tiago",
    variantLabel: "EV LR XT",
    powertrain: "Electric",
    category: "EV",
    modelYear: "MY25",
    totalBenefit: 160000,
    active: true,
  },
  {
    id: "tiago-ev-lr-xz",
    slug: "tiago-ev-lr-xz",
    model: "Tiago",
    variantLabel: "EV LR XZ+ & above",
    powertrain: "Electric",
    category: "EV",
    modelYear: "MY25",
    totalBenefit: 140000,
    active: true,
  },
  {
    id: "tiago-ev-mr",
    slug: "tiago-ev-mr",
    model: "Tiago",
    variantLabel: "EV MR — all variants",
    powertrain: "Electric",
    category: "EV",
    modelYear: "MY25",
    totalBenefit: 80000,
    active: true,
  },

  // ── PUNCH EV ─────────────────────────────────────────────────────────────
  {
    id: "punch-ev-lr",
    slug: "punch-ev-lr",
    model: "Punch",
    variantLabel: "EV LR — all variants (Outgoing)",
    powertrain: "Electric",
    category: "EV",
    modelYear: "MY24",
    totalBenefit: 160000,
    eligibility: "Outgoing stock — LR variants",
    active: true,
  },
  {
    id: "punch-ev-mr",
    slug: "punch-ev-mr",
    model: "Punch",
    variantLabel: "EV MR — excl. Smart (Outgoing)",
    powertrain: "Electric",
    category: "EV",
    modelYear: "MY24",
    totalBenefit: 140000,
    eligibility: "Outgoing stock — MR variants except Smart",
    active: true,
  },
  {
    id: "punch-ev-smart",
    slug: "punch-ev-smart",
    model: "Punch",
    variantLabel: "EV Smart & Smart+ (Outgoing)",
    powertrain: "Electric",
    category: "EV",
    modelYear: "MY24",
    totalBenefit: 110000,
    eligibility: "Outgoing stock — Smart variants",
    active: true,
  },

  // ── NEXON EV ─────────────────────────────────────────────────────────────
  {
    id: "nexon-ev",
    slug: "nexon-ev",
    model: "Nexon",
    variantLabel: "EV 3.0",
    powertrain: "Electric",
    category: "EV",
    modelYear: "MY25",
    totalBenefit: 60000,
    active: true,
  },

  // ── CURVV EV ─────────────────────────────────────────────────────────────
  {
    id: "curvv-ev-creative",
    slug: "curvv-ev-creative",
    model: "Curvv",
    variantLabel: "EV — Creative",
    powertrain: "Electric",
    category: "EV",
    modelYear: "MY25",
    totalBenefit: 300000,
    eligibility: "Creative variant only",
    active: true,
  },
  {
    id: "curvv-ev-wox",
    slug: "curvv-ev-wox",
    model: "Curvv",
    variantLabel: "EV — w/o X",
    powertrain: "Electric",
    category: "EV",
    modelYear: "MY25",
    totalBenefit: 350000,
    eligibility: "All EV variants excluding X trim",
    featured: true,
    active: true,
  },
  {
    id: "curvv-ev-x",
    slug: "curvv-ev-x",
    model: "Curvv",
    variantLabel: "EV — X",
    powertrain: "Electric",
    category: "EV",
    modelYear: "MY25",
    totalBenefit: 80000,
    eligibility: "X trim only",
    active: true,
  },

  // ── HARRIER EV ───────────────────────────────────────────────────────────
  {
    id: "harrier-ev-adventure",
    slug: "harrier-ev-adventure",
    model: "Harrier",
    variantLabel: "EV — Adventure",
    powertrain: "Electric",
    category: "EV",
    modelYear: "MY25",
    totalBenefit: 250000,
    eligibility: "Adventure variant",
    active: true,
  },
  {
    id: "harrier-ev-fearless",
    slug: "harrier-ev-fearless",
    model: "Harrier",
    variantLabel: "EV — Fearless+ / Empowered",
    powertrain: "Electric",
    category: "EV",
    modelYear: "MY25",
    totalBenefit: 275000,
    eligibility: "Fearless+ and Empowered variants",
    active: true,
  },
  {
    id: "harrier-ev-awd-stealth",
    slug: "harrier-ev-awd-stealth",
    model: "Harrier",
    variantLabel: "EV — Empowered AWD Stealth 75 ACFC",
    powertrain: "Electric",
    category: "EV",
    modelYear: "MY25",
    totalBenefit: 225000,
    eligibility: "Only in Delhi — Empowered AWD Stealth 75 ACFC",
    active: true,
  },
];

export function getOfferBySlug(slug: string): TataOffer | undefined {
  return OFFERS.find((o) => o.id === slug);
}
