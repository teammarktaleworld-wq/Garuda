"use client";

interface MobileOfferCTAProps {
  onGetOffer: () => void;
  onTestDrive: () => void;
}

export default function MobileOfferCTA({ onGetOffer, onTestDrive }: MobileOfferCTAProps) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-gradient-to-t from-[#071020] via-[#071020]/95 to-transparent">
      <div className="flex gap-2">
        <button
          onClick={onGetOffer}
          className="flex-1 py-3.5 min-h-[52px] rounded-full bg-[#0055A5] hover:bg-[#1A70D4] active:bg-[#1A70D4] text-white font-bold text-[13px] tracking-[0.06em] shadow-[0_6px_24px_rgba(0,85,165,0.44)] transition-colors duration-150"
        >
          GET OFFER
        </button>
        <button
          onClick={onTestDrive}
          className="flex-1 py-3.5 min-h-[52px] rounded-full bg-white/[0.07] border border-white/[0.14] active:border-white/25 text-white font-medium text-[13px] tracking-[0.04em] transition-colors duration-150"
        >
          TEST DRIVE
        </button>
      </div>
    </div>
  );
}