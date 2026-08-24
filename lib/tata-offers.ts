// // ─────────────────────────────────────────────────────────────────────────────
// // lib/tata-offers.ts
// // Single source of truth for all Tata offer data.
// // Imported by: app/offers/[slug]/page.tsx  +  components/Offers.tsx
// // ─────────────────────────────────────────────────────────────────────────────

// export type Category = "SUV" | "Hatchback" | "Sedan" | "EV";
// export type ModelYear = "MY24" | "MY25";

// // ── Vehicle gallery map ───────────────────────────────────────────────────────
// // High-resolution vehicle images mapped to base model slugs.
// export const MODEL_GALLERY: Record<string, string[]> = {
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

// // ── Vehicle detail data ──────────────────────────────────────────────────────
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

// // ── Helpers ──────────────────────────────────────────────────────────────────
// export function resolveGalleryKey(offerId: string): string {
//   if (offerId.startsWith("harrier-ev")) return "harrier-ev";
//   if (offerId.startsWith("harrier")) return "harrier";
//   if (offerId.startsWith("safari")) return "safari";
//   if (offerId.startsWith("curvv-ev")) return "curvv-ev";
//   if (offerId.startsWith("curvv")) return "curvv";
//   if (offerId.startsWith("nexon-ev")) return "nexon-ev";
//   if (offerId.startsWith("nexon")) return "nexon";
//   if (offerId.startsWith("punch-ev")) return "punch-ev";
//   if (offerId.startsWith("punch")) return "punch";
//   if (offerId.startsWith("altroz")) return "altroz";
//   if (offerId.startsWith("tiago-ev")) return "tiago-ev";
//   if (offerId.startsWith("tiago")) return "tiago";
//   if (offerId.startsWith("tigor")) return "tigor";
//   return "tiago";
// }

// export function resolveVehicleDetail(offerId: string): VehicleDetail {
//   const key = resolveGalleryKey(offerId);
//   return VEHICLE_DETAILS[key] ?? VEHICLE_DETAILS["tiago"];
// }

// // ── Enquiry helpers ───────────────────────────────────────────────────────────
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
//   "Tata Punch",
//   "Tata Punch EV",
//   "Tata Altroz",
//   "Tata Tiago",
//   "Tata Tiago EV",
//   "Tata Tigor",
// ] as const;

// // ── Offer data type ───────────────────────────────────────────────────────────
// export type TataOffer = {
//   id: string;
//   model: string;
//   variantLabel?: string;
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
//   slug: string;
// };

// // ── Benefit row metadata ─────────────────────────────────────────────────────
// export const BENEFIT_ROWS: {
//   key: keyof Pick<
//     TataOffer,
//     "consumerOffer" | "exchangeBenefit" | "scrappageBenefit" | "loyaltyBenefit"
//   >;
//   label: string;
//   short: string;
// }[] = [
//   { key: "consumerOffer", label: "Consumer Offer", short: "Consumer" },
//   { key: "exchangeBenefit", label: "Exchange Benefit", short: "Exchange" },
//   { key: "scrappageBenefit", label: "Scrappage Benefit", short: "Scrappage" },
//   { key: "loyaltyBenefit", label: "Loyalty Benefit", short: "Loyalty" },
// ];

// export const LAST_UPDATED = "23 August 2026";

// export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

// // ── OFFERS array ──────────────────────────────────────────────────────────────
// export const OFFERS: TataOffer[] = [
//   {
//     id: "tiago-petrol",
//     slug: "tiago-petrol",
//     model: "Tata Tiago",
//     variantLabel: "Petrol",
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
//     model: "Tata Tiago",
//     variantLabel: "CNG",
//     category: "Hatchback",
//     modelYear: "MY25",
//     consumerOffer: 30000,
//     exchangeBenefit: 10000,
//     scrappageBenefit: 15000,
//     totalBenefit: 45000,
//     active: true,
//   },
//   {
//     id: "tigor",
//     slug: "tigor",
//     model: "Tata Tigor",
//     category: "Sedan",
//     modelYear: "MY25",
//     consumerOffer: 15000,
//     exchangeBenefit: 10000,
//     scrappageBenefit: 15000,
//     totalBenefit: 30000,
//     active: true,
//   },
//   {
//     id: "altroz-petrol",
//     slug: "altroz-petrol",
//     model: "Tata Altroz",
//     variantLabel: "Petrol",
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
//     model: "Tata Altroz",
//     variantLabel: "CNG",
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
//     model: "Tata Altroz",
//     variantLabel: "Diesel",
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
//     model: "Tata Altroz",
//     variantLabel: "Outgoing Stock",
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
//   {
//     id: "punch-petrol-out",
//     slug: "punch-petrol-out",
//     model: "Tata Punch",
//     variantLabel: "Petrol · Outgoing",
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
//     id: "punch-cng-out",
//     slug: "punch-cng-out",
//     model: "Tata Punch",
//     variantLabel: "CNG · Outgoing",
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
//     id: "nexon-petrol",
//     slug: "nexon-petrol",
//     model: "Tata Nexon",
//     variantLabel: "Petrol",
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
//     model: "Tata Nexon",
//     variantLabel: "CNG",
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
//     model: "Tata Nexon",
//     variantLabel: "Diesel",
//     category: "SUV",
//     modelYear: "MY25",
//     exchangeBenefit: 15000,
//     scrappageBenefit: 20000,
//     totalBenefit: 20000,
//     active: true,
//   },
//   {
//     id: "curvv",
//     slug: "curvv",
//     model: "Tata Curvv",
//     category: "SUV",
//     modelYear: "MY25",
//     consumerOffer: 30000,
//     exchangeBenefit: 40000,
//     scrappageBenefit: 45000,
//     loyaltyBenefit: 50000,
//     totalBenefit: 125000,
//     active: true,
//   },
//   {
//     id: "harrier-d",
//     slug: "harrier-d",
//     model: "Tata Harrier",
//     variantLabel: "Diesel",
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
//     model: "Tata Harrier",
//     variantLabel: "Diesel · w/o X",
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
//     model: "Tata Harrier",
//     variantLabel: "Petrol",
//     category: "SUV",
//     modelYear: "MY25",
//     consumerOffer: 40000,
//     totalBenefit: 40000,
//     active: true,
//   },
//   {
//     id: "safari-d",
//     slug: "safari-d",
//     model: "Tata Safari",
//     variantLabel: "2.0 Diesel",
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
//     model: "Tata Safari",
//     variantLabel: "2.0 Diesel · w/o X",
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
//     model: "Tata Safari",
//     variantLabel: "2.0 Petrol",
//     category: "SUV",
//     modelYear: "MY25",
//     consumerOffer: 40000,
//     totalBenefit: 40000,
//     active: true,
//   },
//   {
//     id: "tiago-ev-lr-xt",
//     slug: "tiago-ev-lr-xt",
//     model: "Tata Tiago EV",
//     variantLabel: "LR XT",
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
//     model: "Tata Tiago EV",
//     variantLabel: "LR XZ+ & above",
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
//     model: "Tata Tiago EV",
//     variantLabel: "MR — all variants",
//     category: "EV",
//     modelYear: "MY25",
//     consumerOffer: 40000,
//     exchangeBenefit: 20000,
//     scrappageBenefit: 25000,
//     totalBenefit: 65000,
//     active: true,
//   },
//   {
//     id: "punch-ev-lr",
//     slug: "punch-ev-lr",
//     model: "Tata Punch EV",
//     variantLabel: "LR — all variants",
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
//     model: "Tata Punch EV",
//     variantLabel: "MR (excl. Smart)",
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
//     model: "Tata Punch EV",
//     variantLabel: "Smart & Smart+",
//     category: "EV",
//     modelYear: "MY25",
//     consumerOffer: 60000,
//     exchangeBenefit: 30000,
//     scrappageBenefit: 35000,
//     totalBenefit: 95000,
//     active: true,
//   },
//   {
//     id: "nexon-ev",
//     slug: "nexon-ev",
//     model: "Tata Nexon EV",
//     variantLabel: "3.0",
//     category: "EV",
//     modelYear: "MY25",
//     consumerOffer: 15000,
//     exchangeBenefit: 25000,
//     scrappageBenefit: 35000,
//     totalBenefit: 50000,
//     active: true,
//   },
//   {
//     id: "curvv-ev",
//     slug: "curvv-ev",
//     model: "Tata Curvv EV",
//     category: "EV",
//     modelYear: "MY25",
//     consumerOffer: 300000,
//     exchangeBenefit: 30000,
//     scrappageBenefit: 35000,
//     totalBenefit: 335000,
//     featured: true,
//     active: true,
//   },
//   {
//     id: "harrier-ev",
//     slug: "harrier-ev",
//     model: "Tata Harrier EV",
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





















// garud-tata\lib\tata-offers.ts

export type Powertrain = "Petrol" | "CNG" | "Diesel" | "Electric";

export type OfferCategory = "ICE" | "EV";

export interface TataOffer {
  id: string;

  // Customer-facing model
  model: string;

  // Petrol / CNG / Diesel / Electric
  powertrain: Powertrain;

  // Exact PPL / variant name from the offer sheet
  variant: string;

  // Optional source/PPL name where it differs from customer-facing model
  pplName: string;

  // MY25 / MY24
  modelYear: "MY25/MY24";

  category: OfferCategory;

  // Offer components
  cash: number;
  exchangeBenefit: number;
  scrappageBenefit: number;
  loyaltyBenefit: number;

  // IMPORTANT: use the Max Offer from the official sheet.
  // Do NOT calculate this from the four benefits.
  maxOffer: number;

  active: boolean;
}

export const OFFERS: TataOffer[] = [
  // ============================================================
  // TIAGO
  // ============================================================

  {
    id: "tiago-petrol",
    model: "Tiago",
    powertrain: "Petrol",
    variant: "Tiago Petrol",
    pplName: "Tiago",
    modelYear: "MY25/MY24",
    category: "ICE",
    cash: 35000,
    exchangeBenefit: 10000,
    scrappageBenefit: 15000,
    loyaltyBenefit: 0,
    maxOffer: 50000,
    active: true,
  },

  {
    id: "tiago-cng",
    model: "Tiago",
    powertrain: "CNG",
    variant: "Tiago CNG",
    pplName: "Tiago",
    modelYear: "MY25/MY24",
    category: "ICE",
    cash: 30000,
    exchangeBenefit: 10000,
    scrappageBenefit: 15000,
    loyaltyBenefit: 0,
    maxOffer: 45000,
    active: true,
  },

  // ============================================================
  // PUNCH OUTGOING
  // ============================================================

  {
    id: "punch-petrol",
    model: "Punch",
    powertrain: "Petrol",
    variant: "Punch Petrol",
    pplName: "Punch Outgoing",
    modelYear: "MY25/MY24",
    category: "ICE",
    cash: 70000,
    exchangeBenefit: 30000,
    scrappageBenefit: 30000,
    loyaltyBenefit: 20000,
    maxOffer: 120000,
    active: true,
  },

  {
    id: "punch-cng",
    model: "Punch",
    powertrain: "CNG",
    variant: "Punch CNG",
    pplName: "Punch Outgoing",
    modelYear: "MY25/MY24",
    category: "ICE",
    cash: 70000,
    exchangeBenefit: 30000,
    scrappageBenefit: 30000,
    loyaltyBenefit: 20000,
    maxOffer: 120000,
    active: true,
  },

  // ============================================================
  // ALTROZ
  // ============================================================

  {
    id: "altroz-petrol",
    model: "Altroz",
    powertrain: "Petrol",
    variant: "Altroz Petrol",
    pplName: "Altroz",
    modelYear: "MY25/MY24",
    category: "ICE",
    cash: 35000,
    exchangeBenefit: 15000,
    scrappageBenefit: 20000,
    loyaltyBenefit: 0,
    maxOffer: 55000,
    active: true,
  },

  {
    id: "altroz-cng",
    model: "Altroz",
    powertrain: "CNG",
    variant: "Altroz CNG",
    pplName: "Altroz",
    modelYear: "MY25/MY24",
    category: "ICE",
    cash: 35000,
    exchangeBenefit: 15000,
    scrappageBenefit: 20000,
    loyaltyBenefit: 0,
    maxOffer: 55000,
    active: true,
  },

  {
    id: "altroz-diesel",
    model: "Altroz",
    powertrain: "Diesel",
    variant: "Altroz Diesel",
    pplName: "Altroz",
    modelYear: "MY25/MY24",
    category: "ICE",
    cash: 25000,
    exchangeBenefit: 15000,
    scrappageBenefit: 20000,
    loyaltyBenefit: 0,
    maxOffer: 45000,
    active: true,
  },

  {
    id: "altroz-outgoing",
    model: "Altroz",
    powertrain: "Petrol",
    variant: "Altroz Outgoing",
    pplName: "Altroz",
    modelYear: "MY25/MY24",
    category: "ICE",
    cash: 110000,
    exchangeBenefit: 40000,
    scrappageBenefit: 40000,
    loyaltyBenefit: 25000,
    maxOffer: 175000,
    active: true,
  },

  // ============================================================
  // NEXON
  // ============================================================

  {
    id: "nexon-petrol",
    model: "Nexon",
    powertrain: "Petrol",
    variant: "Nexon Petrol",
    pplName: "Nexon",
    modelYear: "MY25/MY24",
    category: "ICE",
    cash: 40000,
    exchangeBenefit: 15000,
    scrappageBenefit: 20000,
    loyaltyBenefit: 0,
    maxOffer: 60000,
    active: true,
  },

  {
    id: "nexon-cng",
    model: "Nexon",
    powertrain: "CNG",
    variant: "Nexon CNG",
    pplName: "Nexon",
    modelYear: "MY25/MY24",
    category: "ICE",
    cash: 35000,
    exchangeBenefit: 20000,
    scrappageBenefit: 25000,
    loyaltyBenefit: 0,
    maxOffer: 60000,
    active: true,
  },

  {
    id: "nexon-diesel",
    model: "Nexon",
    powertrain: "Diesel",
    variant: "Nexon Diesel",
    pplName: "Nexon",
    modelYear: "MY25/MY24",
    category: "ICE",
    cash: 0,
    exchangeBenefit: 15000,
    scrappageBenefit: 20000,
    loyaltyBenefit: 0,
    maxOffer: 20000,
    active: true,
  },

  // ============================================================
  // CURVV
  // ============================================================

  {
    id: "curvv",
    model: "Curvv",
    powertrain: "Petrol",
    variant: "Curvv",
    pplName: "Curvv",
    modelYear: "MY25/MY24",
    category: "ICE",
    cash: 30000,
    exchangeBenefit: 40000,
    scrappageBenefit: 45000,
    loyaltyBenefit: 50000,
    maxOffer: 125000,
    active: true,
  },

  // ============================================================
  // HARRIER
  // ============================================================

  {
    id: "harrier-d",
    model: "Harrier",
    powertrain: "Diesel",
    variant: "Harrier D",
    pplName: "Harrier",
    modelYear: "MY25/MY24",
    category: "ICE",
    cash: 10000,
    exchangeBenefit: 25000,
    scrappageBenefit: 35000,
    loyaltyBenefit: 0,
    maxOffer: 45000,
    active: true,
  },

  {
    id: "harrier-d-without-x",
    model: "Harrier",
    powertrain: "Diesel",
    variant: "Harrier D (without X)",
    pplName: "Harrier",
    modelYear: "MY25/MY24",
    category: "ICE",
    cash: 150000,
    exchangeBenefit: 50000,
    scrappageBenefit: 50000,
    loyaltyBenefit: 40000,
    maxOffer: 240000,
    active: true,
  },

  {
    id: "harrier-p",
    model: "Harrier",
    powertrain: "Petrol",
    variant: "Harrier P",
    pplName: "Harrier",
    modelYear: "MY25/MY24",
    category: "ICE",
    cash: 40000,
    exchangeBenefit: 0,
    scrappageBenefit: 0,
    loyaltyBenefit: 0,
    maxOffer: 40000,
    active: true,
  },

  // ============================================================
  // SAFARI
  // ============================================================

  {
    id: "safari-2-0-d",
    model: "Safari",
    powertrain: "Diesel",
    variant: "Safari 2.0 D",
    pplName: "Safari",
    modelYear: "MY25/MY24",
    category: "ICE",
    cash: 10000,
    exchangeBenefit: 25000,
    scrappageBenefit: 35000,
    loyaltyBenefit: 0,
    maxOffer: 45000,
    active: true,
  },

  {
    id: "safari-2-0-d-without-x",
    model: "Safari",
    powertrain: "Diesel",
    variant: "Safari 2.0 D (without X)",
    pplName: "Safari",
    modelYear: "MY25/MY24",
    category: "ICE",
    cash: 150000,
    exchangeBenefit: 50000,
    scrappageBenefit: 50000,
    loyaltyBenefit: 40000,
    maxOffer: 240000,
    active: true,
  },

  {
    id: "safari-2-0-p",
    model: "Safari",
    powertrain: "Petrol",
    variant: "Safari 2.0 P",
    pplName: "Safari",
    modelYear: "MY25/MY24",
    category: "ICE",
    cash: 40000,
    exchangeBenefit: 0,
    scrappageBenefit: 0,
    loyaltyBenefit: 0,
    maxOffer: 40000,
    active: true,
  },

  // ============================================================
  // TIAGO EV
  // ============================================================

  {
    id: "tiago-ev-lr-xt",
    model: "Tiago",
    powertrain: "Electric",
    variant: "Tiago EV LR XT",
    pplName: "Tiago",
    modelYear: "MY25/MY24",
    category: "EV",
    cash: 100000,
    exchangeBenefit: 20000,
    scrappageBenefit: 25000,
    loyaltyBenefit: 0,
    maxOffer: 125000,
    active: true,
  },

  {
    id: "tiago-ev-lr-xz-plus-all",
    model: "Tiago",
    powertrain: "Electric",
    variant: "Tiago EV LR XZ+ All",
    pplName: "Tiago",
    modelYear: "MY25/MY24",
    category: "EV",
    cash: 100000,
    exchangeBenefit: 20000,
    scrappageBenefit: 25000,
    loyaltyBenefit: 0,
    maxOffer: 125000,
    active: true,
  },

  {
    id: "tiago-ev-mr-all",
    model: "Tiago",
    powertrain: "Electric",
    variant: "Tiago EV MR All",
    pplName: "Tiago",
    modelYear: "MY25/MY24",
    category: "EV",
    cash: 40000,
    exchangeBenefit: 20000,
    scrappageBenefit: 25000,
    loyaltyBenefit: 0,
    maxOffer: 65000,
    active: true,
  },

  // ============================================================
  // PUNCH EV
  // ============================================================

  {
    id: "punch-ev-all-lr",
    model: "Punch",
    powertrain: "Electric",
    variant: "Punch EV All LR",
    pplName: "Punch EV Outgoing",
    modelYear: "MY25/MY24",
    category: "EV",
    cash: 110000,
    exchangeBenefit: 30000,
    scrappageBenefit: 35000,
    loyaltyBenefit: 0,
    maxOffer: 145000,
    active: true,
  },

  {
    id: "punch-ev-mr",
    model: "Punch",
    powertrain: "Electric",
    variant: "Punch EV MR (Except Smart Variants)",
    pplName: "Punch EV Outgoing",
    modelYear: "MY25/MY24",
    category: "EV",
    cash: 90000,
    exchangeBenefit: 30000,
    scrappageBenefit: 35000,
    loyaltyBenefit: 0,
    maxOffer: 125000,
    active: true,
  },

  {
    id: "punch-ev-smart",
    model: "Punch",
    powertrain: "Electric",
    variant: "Punch EV - (Smart & Smart+ Variant)",
    pplName: "Punch EV Outgoing",
    modelYear: "MY25/MY24",
    category: "EV",
    cash: 60000,
    exchangeBenefit: 30000,
    scrappageBenefit: 35000,
    loyaltyBenefit: 0,
    maxOffer: 95000,
    active: true,
  },

  // ============================================================
  // NEXON EV
  // ============================================================

  {
    id: "nexon-ev-3-0",
    model: "Nexon",
    powertrain: "Electric",
    variant: "Nexon EV 3.0",
    pplName: "Nexon EV",
    modelYear: "MY25/MY24",
    category: "EV",
    cash: 15000,
    exchangeBenefit: 25000,
    scrappageBenefit: 35000,
    loyaltyBenefit: 0,
    maxOffer: 50000,
    active: true,
  },

  // ============================================================
  // CURVV EV
  // ============================================================

  {
    id: "curvv-ev",
    model: "Curvv",
    powertrain: "Electric",
    variant: "Curvv EV",
    pplName: "Curvv EV",
    modelYear: "MY25/MY24",
    category: "EV",
    cash: 300000,
    exchangeBenefit: 30000,
    scrappageBenefit: 35000,
    loyaltyBenefit: 0,
    maxOffer: 335000,
    active: true,
  },

  // ============================================================
  // HARRIER EV
  // ============================================================

  {
    id: "harrier-ev",
    model: "Harrier",
    powertrain: "Electric",
    variant: "Harrier EV",
    pplName: "Harrier EV",
    modelYear: "MY25/MY24",
    category: "EV",
    cash: 100000,
    exchangeBenefit: 50000,
    scrappageBenefit: 75000,
    loyaltyBenefit: 100000,
    maxOffer: 275000,
    active: true,
  },
];