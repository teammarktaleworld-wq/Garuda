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