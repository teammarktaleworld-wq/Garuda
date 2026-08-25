


"use client";

// ─────────────────────────────────────────────────────────────────────────────
// GarudChatbot.tsx — Single-file AI Chatbot for Garud Tata
// Drop this file anywhere in your project and import it.
// Requires: framer-motion, lucide-react
// API route at /app/api/chat/route.ts handles Groq.
// ─────────────────────────────────────────────────────────────────────────────

import React, {
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minus,
  Phone,
  MessageCircle,
  Car,
  Percent,
  MapPin,
  Wrench,
  Calendar,
  Clock,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";

// ─── Dealership Config ────────────────────────────────────────────────────────

const DEALERSHIP = {
  name: "Garud Tata",
  type: "Authorized Tata Motors Dealer",
  city: "New Delhi",
  website: "https://www.garudtata.com/",
  whatsapp: "919217371204",
  phone: "+91 92173 71204",
  email: "sm.dwarka@garudtata.com",
  googleMapsUrl:
    "https://maps.google.com/?q=RZ+A70,Dabri+Palam+Rd,Main+Shiv+Market,Palam,New+Delhi,Delhi+110045",
  hours: {
    all: "10:00 AM – 7:00 PM",
  },
};

// ─── Types & API Interfaces ───────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface EnquiryPayload {
  enquiryType:
    | "offer"
    | "test_drive"
    | "showroom"
    | "workshop"
    | "finance"
    | "exchange"
    | "contact";
  modelId?: string;
  modelName?: string;
  showroomId?: string;
  showroomName?: string;
  date?: string;
  time?: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  metadata?: Record<string, unknown>;
}

type FlowType =
  | "explore"
  | "offers"
  | "test_drive"
  | "showroom"
  | "workshop"
  | null;

// ─── Real Dealership Data ─────────────────────────────────────────────────────

const CAR_MODELS = [
  { id: "m1", name: "Nexon", category: "Compact SUV", fuelTypes: ["Petrol", "Diesel", "EV"], priceRange: "₹8.10 Lakh*", image: "🚗" },
  { id: "m2", name: "Punch", category: "Micro SUV", fuelTypes: ["Petrol", "CNG", "EV"], priceRange: "₹6.13 Lakh*", image: "🚙" },
  { id: "m3", name: "Harrier", category: "Midsize SUV", fuelTypes: ["Diesel", "EV"], priceRange: "₹15.49 Lakh*", image: "🚘" },
  { id: "m4", name: "Safari", category: "Premium SUV", fuelTypes: ["Diesel"], priceRange: "₹16.19 Lakh*", image: "🛻" },
  { id: "m5", name: "Altroz", category: "Premium Hatchback", fuelTypes: ["Petrol", "Diesel", "CNG"], priceRange: "₹6.61 Lakh*", image: "🏎️" },
  { id: "m6", name: "Tiago", category: "Hatchback", fuelTypes: ["Petrol", "CNG", "EV"], priceRange: "₹5.60 Lakh*", image: "🚗" },
  { id: "m7", name: "Curvv", category: "Coupe SUV", fuelTypes: ["Petrol", "Diesel", "EV"], priceRange: "₹10.00 Lakh*", image: "🚙" },
  { id: "m8", name: "Tigor", category: "Compact Sedan", fuelTypes: ["Petrol", "CNG"], priceRange: "₹6.00 Lakh*", image: "🚗" },
];

const OFFERS = [
  { id: "o1", modelId: "m6", modelName: "Tiago Petrol", offerTitle: "MY25/MY24 Offer", benefits: ["Cash: ₹35,000", "Exchange bonus: ₹10,000", "Scrappage: ₹15,000"], maxOffer: "₹50,000", validTill: "Limited period" },
  { id: "o3", modelId: "m2", modelName: "Punch Petrol", offerTitle: "MY25/MY24 Offer", benefits: ["Cash: ₹70,000", "Exchange bonus: ₹30,000", "Scrappage: ₹30,000", "Loyalty: ₹20,000"], maxOffer: "₹1,20,000", validTill: "Limited period" },
  { id: "o7", modelId: "m1", modelName: "Nexon Petrol", offerTitle: "MY25/MY24 Offer", benefits: ["Cash: ₹40,000", "Exchange bonus: ₹15,000", "Scrappage: ₹20,000"], maxOffer: "₹60,000", validTill: "Limited period" },
  { id: "o8", modelId: "m7", modelName: "Curvv", offerTitle: "MY25/MY24 Offer", benefits: ["Cash: ₹30,000", "Exchange bonus: ₹40,000", "Scrappage: ₹45,000", "Loyalty: ₹50,000"], maxOffer: "₹1,25,000", validTill: "Limited period" },
  { id: "o11", modelId: "m1", modelName: "Nexon EV 3.0", offerTitle: "EV Consumer Offer", benefits: ["Cash: ₹15,000", "Exchange bonus: ₹25,000", "Scrappage: ₹35,000"], maxOffer: "₹50,000", validTill: "Limited period" },
];

const SHOWROOMS = [
  { id: "s1", name: "Garud Tata – Palam", address: "Sales-Garg Plaza, RZ A70, Dabri–Palam Rd, Palam", phone: "+91 92173 71204", hours: "10:00 AM – 7:00 PM", mapsUrl: "https://maps.google.com/?q=RZ+A70,Dabri+Palam+Rd,Main+Shiv+Market,Palam,New+Delhi,Delhi+110045" },
  { id: "s2", name: "Garud Tata – Narela", address: "Khasra No 42/12, Narela, New Delhi", phone: "+91 93110 83011", hours: "10:00 AM – 7:00 PM", mapsUrl: "https://maps.google.com/?q=Khasra+No+42/12,Narela,New+Delhi,Delhi+110040" },
];

const WORKSHOPS = [
  { id: "w1", name: "Garud Service – Matiala", address: "Shanti Garden, Matiala Industrial Area, Dwarka", phone: "+91 93191 98306", email: "service.matiala@garudtata.com", hours: "9:00 AM – 7:00 PM", services: ["Routine Service", "Body Shop", "EV Support", "Genuine Parts"] },
];

const TEST_DRIVE_SLOTS = ["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];

// ─── Shared UI Components ─────────────────────────────────────────────────────

// UPDATED MASCOT ICON COMPONENT (Uses your image path)
function MascotIcon({ size = 24 }: { size?: number }) {
  return (
    <img
      src="/images/garudchatboticon.png"
      alt="Garud AI Mascot"
      style={{ width: size, height: size, objectFit: "contain" }}
      className="drop-shadow-lg"
    />
  );
}

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5 mb-4 justify-center">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{
            width: i + 1 === current ? 24 : 8,
            backgroundColor: i + 1 === current ? "rgba(59, 130, 246, 1)" : i + 1 < current ? "rgba(59, 130, 246, 0.5)" : "rgba(255, 255, 255, 0.1)"
          }}
          className="h-1.5 rounded-full"
        />
      ))}
    </div>
  );
}

function BackButton({ onClick, label = "Back" }: { onClick: () => void; label?: string }) {
  return (
    <motion.button
      whileHover={{ x: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors mb-4 focus:outline-none"
    >
      <ArrowLeft size={14} /> {label}
    </motion.button>
  );
}

// ─── Interactive Flow Components ──────────────────────────────────────────────

function TestDriveFlow({ onComplete, onCancel }: { onComplete: (p: EnquiryPayload) => void; onCancel: () => void }) {
  const [step, setStep] = useState(1);
  const [payload, setPayload] = useState<Partial<EnquiryPayload>>({ enquiryType: "test_drive", customer: { name: "", phone: "" } });

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#1a2030] border border-white/10 rounded-2xl p-4 shadow-lg">
      {step > 1 && step < 6 && <BackButton onClick={prevStep} />}
      {step < 6 && <StepIndicator current={step} total={5} />}

      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
          <h4 className="text-white font-medium mb-3 text-sm">Which car would you like to test drive?</h4>
          <div className="grid grid-cols-2 gap-2">
            {CAR_MODELS.map((car) => (
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                key={car.id}
                onClick={() => { setPayload({ ...payload, modelId: car.id, modelName: car.name }); nextStep(); }}
                className="bg-[#1e2535] hover:bg-[#252d42] border border-white/5 rounded-xl p-3 text-left transition-colors"
              >
                <div className="text-2xl mb-1">{car.image}</div>
                <div className="text-white text-sm font-semibold">{car.name}</div>
                <div className="text-gray-400 text-[10px]">{car.priceRange}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
          <h4 className="text-white font-medium mb-3 text-sm">Choose preferred showroom</h4>
          <div className="flex flex-col gap-2">
            {SHOWROOMS.map((sr) => (
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                key={sr.id}
                onClick={() => { setPayload({ ...payload, showroomId: sr.id, showroomName: sr.name }); nextStep(); }}
                className="flex items-center justify-between bg-[#1e2535] hover:bg-[#252d42] border border-white/5 rounded-xl p-3 text-left transition-colors"
              >
                <div>
                  <div className="text-white text-sm font-medium">{sr.name}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{sr.address.split(",")[0]}</div>
                </div>
                <ChevronRight size={16} className="text-gray-500" />
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
          <h4 className="text-white font-medium mb-3 text-sm">Choose preferred date</h4>
          <div className="grid grid-cols-2 gap-2">
            {Array.from({ length: 4 }).map((_, i) => {
              const d = new Date();
              d.setDate(d.getDate() + i + 1);
              const dateStr = d.toLocaleDateString("en-IN", { weekday: "short", month: "short", day: "numeric" });
              return (
                <motion.button
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  key={i}
                  onClick={() => { setPayload({ ...payload, date: dateStr }); nextStep(); }}
                  className="flex items-center gap-2 bg-[#1e2535] hover:bg-[#252d42] border border-white/5 rounded-xl p-3 transition-colors text-white text-sm"
                >
                  <Calendar size={14} className="text-blue-400" /> {dateStr}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      )}

      {step === 4 && (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
          <h4 className="text-white font-medium mb-3 text-sm">Choose preferred time</h4>
          <div className="grid grid-cols-2 gap-2">
            {TEST_DRIVE_SLOTS.map((time) => (
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                key={time}
                onClick={() => { setPayload({ ...payload, time }); nextStep(); }}
                className="flex items-center gap-2 bg-[#1e2535] hover:bg-[#252d42] border border-white/5 rounded-xl p-3 transition-colors text-white text-sm"
              >
                <Clock size={14} className="text-blue-400" /> {time}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {step === 5 && (
        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
          <h4 className="text-white font-medium mb-3 text-sm">Your Details</h4>
          <div className="space-y-3">
            <input
              type="text" placeholder="Full Name"
              value={payload.customer?.name || ""}
              onChange={(e) => setPayload({ ...payload, customer: { ...payload.customer!, name: e.target.value } })}
              className="w-full bg-[#1e2535] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <input
              type="tel" placeholder="Mobile Number"
              value={payload.customer?.phone || ""}
              onChange={(e) => setPayload({ ...payload, customer: { ...payload.customer!, phone: e.target.value } })}
              className="w-full bg-[#1e2535] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
            <motion.button
              whileHover={{ scale: (!payload.customer?.name || payload.customer?.phone.length < 10) ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!payload.customer?.name || payload.customer?.phone.length < 10}
              onClick={() => nextStep()}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-2.5 text-sm font-medium transition-colors disabled:opacity-50 mt-2"
            >
              Review Details
            </motion.button>
          </div>
        </motion.div>
      )}

      {step === 6 && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }} className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 size={24} />
          </motion.div>
          <h4 className="text-white font-semibold mb-1">Confirm Test Drive</h4>
          <p className="text-gray-400 text-xs mb-4">Please review your selections</p>
          <div className="bg-[#1e2535] rounded-xl p-3 text-left space-y-2 mb-4">
            <div className="flex justify-between text-xs"><span className="text-gray-400">Car:</span><span className="text-white font-medium">{payload.modelName}</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-400">Showroom:</span><span className="text-white font-medium">{payload.showroomName}</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-400">Time:</span><span className="text-white font-medium">{payload.date}, {payload.time}</span></div>
            <div className="flex justify-between text-xs"><span className="text-gray-400">Contact:</span><span className="text-white font-medium">{payload.customer?.name} ({payload.customer?.phone})</span></div>
          </div>
          <div className="flex gap-2">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setStep(1)} className="flex-1 bg-white/5 hover:bg-white/10 text-white rounded-xl py-2.5 text-sm font-medium transition-colors">Start Over</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => onComplete(payload as EnquiryPayload)} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-2.5 text-sm font-medium transition-colors shadow-lg shadow-blue-600/20">Confirm</motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function OffersFlow({ onComplete }: { onComplete: (p: EnquiryPayload) => void }) {
  const [selectedOffer, setSelectedOffer] = useState<(typeof OFFERS)[0] | null>(null);
  const [customer, setCustomer] = useState({ name: "", phone: "" });

  if (!selectedOffer) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#1a2030] border border-white/10 rounded-2xl p-4 shadow-lg">
        <h4 className="text-white font-medium mb-1 text-sm">Current MY25/MY24 Offers</h4>
        <p className="text-gray-500 text-[10px] mb-3">* Confirm final offer with showroom · Amounts in INR</p>
        <div className="flex flex-col gap-2 max-h-[340px] overflow-y-auto pr-0.5" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}>
          {OFFERS.map((offer) => (
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              key={offer.id} onClick={() => setSelectedOffer(offer)}
              className="bg-[#1e2535] hover:bg-[#252d42] border border-white/5 rounded-xl p-3 text-left transition-colors"
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-white text-sm font-semibold">{offer.modelName}</span>
                <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap ml-2">Max ₹{offer.maxOffer.replace("₹", "")}</span>
              </div>
              <ul className="text-gray-400 text-xs list-disc pl-4 mb-1">{offer.benefits.map((b, i) => <li key={i}>{b}</li>)}</ul>
              <div className="text-gray-500 text-[10px]">{offer.validTill}</div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="bg-[#1a2030] border border-white/10 rounded-2xl p-4 shadow-lg">
      <BackButton onClick={() => setSelectedOffer(null)} />
      <h4 className="text-white font-medium mb-1 text-sm">Claim {selectedOffer.modelName} Offer</h4>
      <p className="text-gray-400 text-xs mb-3">Enter details to get this offer.</p>
      <div className="space-y-3">
        <input type="text" placeholder="Full Name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} className="w-full bg-[#1e2535] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
        <input type="tel" placeholder="Mobile Number" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} className="w-full bg-[#1e2535] border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500" />
        <motion.button
          whileHover={{ scale: (!customer.name || customer.phone.length < 10) ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}
          disabled={!customer.name || customer.phone.length < 10}
          onClick={() => onComplete({ enquiryType: "offer", modelId: selectedOffer.modelId, modelName: selectedOffer.modelName, customer })}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl py-2.5 text-sm font-medium transition-colors disabled:opacity-50"
        >
          Get This Offer
        </motion.button>
      </div>
    </motion.div>
  );
}

function ShowroomFlow() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#1a2030] border border-white/10 rounded-2xl p-4 shadow-lg">
      <h4 className="text-white font-medium mb-3 text-sm">Our Showrooms</h4>
      <div className="flex flex-col gap-3">
        {SHOWROOMS.map((sr) => (
          <div key={sr.id} className="bg-[#1e2535] border border-white/5 rounded-xl p-3">
            <h5 className="text-white text-sm font-semibold mb-1">{sr.name}</h5>
            <p className="text-gray-400 text-xs flex items-start gap-1 mb-1"><MapPin size={12} className="mt-0.5 flex-shrink-0" />{sr.address}</p>
            <p className="text-gray-400 text-xs flex items-center gap-1 mb-3"><Clock size={12} /> {sr.hours}</p>
            <div className="flex gap-2">
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={sr.mapsUrl} target="_blank" rel="noreferrer" className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs py-1.5 rounded-lg text-center transition-colors">Directions</motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={`tel:${sr.phone}`} className="flex-1 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 text-xs py-1.5 rounded-lg text-center transition-colors">Call Now</motion.a>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function WorkshopFlow() {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#1a2030] border border-white/10 rounded-2xl p-4 shadow-lg">
      <h4 className="text-white font-medium mb-3 text-sm">Service Centres</h4>
      <div className="flex flex-col gap-3">
        {WORKSHOPS.map((ws) => (
          <div key={ws.id} className="bg-[#1e2535] border border-white/5 rounded-xl p-3">
            <h5 className="text-white text-sm font-semibold mb-1">{ws.name}</h5>
            <p className="text-gray-400 text-xs flex items-start gap-1 mb-1"><MapPin size={12} className="mt-0.5 flex-shrink-0" />{ws.address}</p>
            <p className="text-gray-400 text-xs flex items-center gap-1 mb-1"><Clock size={12} /> {ws.hours}</p>
            <div className="flex flex-wrap gap-1 mb-3">{ws.services.map((s) => <span key={s} className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-0.5 rounded-full">{s}</span>)}</div>
            <div className="flex gap-2">
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={`mailto:${ws.email}`} className="flex-1 bg-white/5 hover:bg-white/10 text-white text-xs py-1.5 rounded-lg text-center transition-colors">Email</motion.a>
              <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href={`tel:${ws.phone}`} className="flex-1 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 text-xs py-1.5 rounded-lg text-center transition-colors">Call Now</motion.a>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ExploreCarsFlow({ onSelectCar }: { onSelectCar: (carName: string) => void }) {
  const [category, setCategory] = useState<string | null>(null);

  if (!category) {
    const categories = Array.from(new Set(CAR_MODELS.map((c) => c.category)));
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-[#1a2030] border border-white/10 rounded-2xl p-4 shadow-lg">
        <h4 className="text-white font-medium mb-3 text-sm">What type of car are you looking for?</h4>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <motion.button
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              key={cat} onClick={() => setCategory(cat)}
              className="bg-[#1e2535] hover:bg-[#252d42] border border-white/5 rounded-xl p-3 text-center text-sm text-gray-200 transition-colors"
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  }

  const filtered = CAR_MODELS.filter((c) => c.category === category);
  return (
    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="bg-[#1a2030] border border-white/10 rounded-2xl p-4 shadow-lg">
      <BackButton onClick={() => setCategory(null)} label="Categories" />
      <h4 className="text-white font-medium mb-3 text-sm">{category} Models</h4>
      <div className="flex flex-col gap-2">
        {filtered.map((car) => (
          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            key={car.id} onClick={() => onSelectCar(car.name)}
            className="flex items-center justify-between bg-[#1e2535] hover:bg-[#252d42] border border-white/5 rounded-xl p-3 text-left transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{car.image}</span>
              <div>
                <div className="text-white text-sm font-semibold">{car.name}</div>
                <div className="text-gray-400 text-[10px]">{car.fuelTypes.join(" · ")} · Starts {car.priceRange}</div>
              </div>
            </div>
            <ChevronRight size={16} className="text-gray-500" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Main Chat Window ─────────────────────────────────────────────────────────

export default function GarudChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeFlow, setActiveFlow] = useState<FlowType>(null);
  const [inputValue, setInputValue] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, activeFlow]);

  useEffect(() => {
    if (window.innerWidth < 640 && isOpen && !isMinimized) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, isMinimized]);

  const addMessage = (role: "user" | "assistant", content: string) => {
    setMessages((p) => [...p, { id: `${role}-${Date.now()}`, role, content, timestamp: new Date() }]);
  };

  const sendMessageToAI = async (content: string) => {
    if (!content.trim() || isLoading) return;
    setActiveFlow(null);
    addMessage("user", content.trim());
    setIsTyping(true);
    setIsLoading(true);

    const history = [...messages, { role: "user" as const, content: content.trim() }].map((m) => ({ role: m.role, content: m.content }));
    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
        signal: abortRef.current.signal,
      });

      setIsTyping(false);
      if (!res.ok) throw new Error("API Error");
      if (!res.body) throw new Error("No response body");

      const assistantId = `a-${Date.now()}`;
      setMessages((prev) => [...prev, { id: assistantId, role: "assistant", content: "", timestamp: new Date() }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
        setMessages((prev) => prev.map((m) => m.id === assistantId ? { ...m, content: fullText } : m));
      }
    } catch (err: unknown) {
      setIsTyping(false);
      if (err instanceof Error && err.name === "AbortError") return;
      addMessage("assistant", "Sorry, I'm having trouble connecting right now. Please try again or contact us via WhatsApp.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAction = (flow: FlowType, userMessage: string, autoReply?: string) => {
    addMessage("user", userMessage);
    setTimeout(() => {
      if (autoReply) addMessage("assistant", autoReply);
      setActiveFlow(flow);
    }, 400);
  };

  const handleFlowComplete = (payload: EnquiryPayload) => {
    setActiveFlow(null);
    addMessage("assistant", `🎉 All set! We've received your request for the **${payload.modelName || "service"}**. Our team will contact you shortly at ${payload.customer.phone}.`);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;
    sendMessageToAI(inputValue.trim());
    setInputValue("");
  };

  const QUICK_ACTIONS = [
    { icon: <Car size={16} />, label: "Explore Cars", onClick: () => handleAction("explore", "I want to explore Tata cars.") },
    { icon: <Percent size={16} />, label: "View Offers", onClick: () => handleAction("offers", "Show me current offers.") },
    { icon: <Calendar size={16} />, label: "Test Drive", onClick: () => handleAction("test_drive", "I want to book a test drive.") },
    { icon: <MapPin size={16} />, label: "Showrooms", onClick: () => handleAction("showroom", "Where are your showrooms located?") },
    { icon: <Wrench size={16} />, label: "Service", onClick: () => handleAction("workshop", "I need to find a service centre.") },
    { icon: <Phone size={16} />, label: "Contact", onClick: () => sendMessageToAI("How can I contact Garud Tata?") },
  ];

  const showWindow = isOpen && !isMinimized;

  return (
    <>
      <AnimatePresence>
        {showWindow && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] max-w-[420px] sm:w-[420px] h-[640px] max-h-[calc(100dvh-7rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/[0.08]"
            style={{ background: "linear-gradient(180deg, #0d1520 0%, #0f1521 100%)" }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0 relative" style={{ background: "linear-gradient(135deg, #0a1628 0%, #0e1d35 50%, #0a1628 100%)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-lg shadow-blue-500/20 overflow-hidden">
                  <MascotIcon size={32} />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0a1628]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">Garud Tata AI</p>
                <p className="text-gray-400 text-[11px] leading-tight"><span className="text-green-400">●</span> Online · Dealership Assistant</p>
              </div>
              <div className="flex items-center gap-1">
                <motion.a whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} href={`https://wa.me/${DEALERSHIP.whatsapp}`} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-green-400 hover:bg-white/5 transition-all"><MessageCircle size={14} /></motion.a>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => { setIsMinimized(true); setIsOpen(false); }} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all"><Minus size={14} /></motion.button>
                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => { setIsOpen(false); setIsMinimized(false); }} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all"><X size={14} /></motion.button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 scroll-smooth" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.08) transparent" }}>
              {messages.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center px-2 py-2 gap-5">
                  <motion.div initial={{ scale: 0.8, y: 10 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", bounce: 0.5 }} className="text-center mt-2">
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-3 shadow-xl shadow-blue-500/20 overflow-hidden">
                      <MascotIcon size={48} />
                    </div>
                    <h3 className="text-white font-semibold text-base">Hi! I'm Garud AI 👋</h3>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">Your virtual Tata Motors assistant.<br />How can I help you today?</p>
                  </motion.div>
                  <div className="w-full">
                    <motion.div 
                      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } }}
                      initial="hidden" animate="show"
                      className="grid grid-cols-2 gap-2"
                    >
                      {QUICK_ACTIONS.map((action) => (
                        <motion.button
                          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                          whileHover={{ scale: 1.03, backgroundColor: "rgba(37, 45, 66, 1)" }}
                          whileTap={{ scale: 0.97 }}
                          key={action.label} onClick={action.onClick}
                          className="flex items-center gap-2 bg-[#1e2535] border border-white/5 hover:border-blue-500/30 rounded-xl px-3 py-3 text-left transition-colors group"
                        >
                          <span className="text-blue-400 group-hover:text-blue-300 transition-colors">{action.icon}</span>
                          <span className="text-gray-300 text-xs font-medium group-hover:text-white transition-colors">{action.label}</span>
                        </motion.button>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                messages.map((msg) => (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95, transformOrigin: msg.role === "user" ? "bottom right" : "bottom left" }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "items-start gap-2.5"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg shadow-blue-500/20 overflow-hidden">
                        <MascotIcon size={20} />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === "user" ? "bg-blue-600 text-white rounded-tr-sm shadow-lg shadow-blue-500/20" : "bg-[#1e2535] text-gray-100 border border-white/5 rounded-tl-sm"}`}>
                      {msg.content.split("\n").map((line, i) => {
                        if (line.startsWith("**") && line.endsWith("**")) return <strong key={i} className="block mt-1">{line.replace(/\*\*/g, "")}</strong>;
                        return <span key={i} className="block min-h-[1rem]">{line}</span>;
                      })}
                    </div>
                  </motion.div>
                ))
              )}

              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg shadow-blue-500/20 overflow-hidden">
                    <MascotIcon size={20} />
                  </div>
                  <div className="bg-[#1e2535] border border-white/5 rounded-2xl rounded-tl-sm px-4 py-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block animate-pulse" />
                  </div>
                </motion.div>
              )}

              {activeFlow && (
                <div className="pt-2 pb-1">
                  {activeFlow === "test_drive" && <TestDriveFlow onComplete={handleFlowComplete} onCancel={() => setActiveFlow(null)} />}
                  {activeFlow === "offers" && <OffersFlow onComplete={handleFlowComplete} />}
                  {activeFlow === "showroom" && <ShowroomFlow />}
                  {activeFlow === "workshop" && <WorkshopFlow />}
                  {activeFlow === "explore" && <ExploreCarsFlow onSelectCar={(car) => { setActiveFlow(null); sendMessageToAI(`Tell me more about the Tata ${car}`); }} />}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/5 bg-[#0f1521]/95 backdrop-blur-sm p-3">
              <div className="flex items-center gap-2 bg-[#1a2030] border border-white/[0.08] focus-within:border-blue-500/40 rounded-2xl px-3 py-2">
                <input
                  ref={inputRef} type="text" placeholder="Ask Garud AI anything..." disabled={isLoading}
                  value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-transparent text-gray-200 text-sm placeholder:text-gray-500 outline-none"
                  onKeyDown={(e) => { if (e.key === "Enter") handleSend(); }}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  onClick={handleSend} disabled={isLoading || !inputValue.trim()}
                  className="text-white bg-blue-500 hover:bg-blue-400 disabled:opacity-50 w-8 h-8 rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-blue-500/30"
                >
                  <ChevronRight size={16} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-2"
        initial={{ scale: 0, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
      >
        <motion.button
          whileHover={{ scale: 1.08, rotate: showWindow ? 90 : 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => { setIsOpen(!showWindow); setIsMinimized(false); }}
          className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/30 overflow-hidden"
          style={{
            background: showWindow ? "linear-gradient(135deg, #1e2535, #252d42)" : "linear-gradient(135deg, #1d6ff5, #0f52c4)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <AnimatePresence mode="wait">
            {showWindow ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={24} color="white" />
              </motion.div>
            ) : (
              <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="pt-1 pl-0.5">
                <MascotIcon size={32} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </>
  );
}