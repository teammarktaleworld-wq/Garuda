// // garud-tata\app\landing-page\thank-you\page.tsx
// "use client";

// import { Suspense, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import Link from "next/link";
// import { CheckCircle2, Car, Bike } from "lucide-react";

// declare global {
//   interface Window {
//     gtag?: (...args: unknown[]) => void;
//     fbq?: (...args: unknown[]) => void;
//     dataLayer?: unknown[];
//   }
// }

// function ThankYouContent() {
//   const params = useSearchParams();
//   const type = params.get("type") === "testdrive" ? "testdrive" : "enquiry";
//   const model = params.get("model") ?? "";
//   const outlet = params.get("outlet") ?? "";

//   // Fire this page's load as your conversion event. Wire up whichever
//   // analytics you actually use — this covers the common ones.
//   useEffect(() => {
//     const eventName = type === "testdrive" ? "test_drive_booked" : "enquiry_submitted";

//     // Google Analytics 4 / Google Ads
//     if (typeof window.gtag === "function") {
//       window.gtag("event", eventName, { model, outlet });
//     }

//     // GTM dataLayer
//     if (Array.isArray(window.dataLayer)) {
//       window.dataLayer.push({ event: eventName, model, outlet });
//     }

//     // Meta / Facebook Pixel
//     if (typeof window.fbq === "function") {
//       window.fbq("track", "Lead", { content_name: model, content_category: type });
//     }
//   }, [type, model, outlet]);

//   const isTestDrive = type === "testdrive";

//   return (
//     <section className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-20">
//       <div className="max-w-md w-full text-center bg-white border border-gray-200 rounded-2xl shadow-sm p-8 sm:p-10">
//         <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-5">
//           <CheckCircle2 size={30} className="text-blue-600" />
//         </div>

//         <h1 className="text-gray-900 font-extrabold text-2xl mb-2">
//           {isTestDrive ? "Test Drive Booked!" : "Thank You!"}
//         </h1>

//         <p className="text-gray-500 text-[14.5px] leading-relaxed mb-6">
//           {isTestDrive
//             ? "Your test drive request has been received. Our team will call you within 24 hours to confirm your slot."
//             : "Your enquiry has been received. Our team will call you within 24 hours."}
//         </p>

//         {(model || outlet) && (
//           <div className="flex items-center justify-center gap-2 text-gray-600 text-[13px] bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 mb-7">
//             {isTestDrive ? <Bike size={14} /> : <Car size={14} />}
//             <span className="font-medium">{model}</span>
//             {outlet && <span className="text-gray-400">· {outlet}</span>}
//           </div>
//         )}

//         <Link
//           href="/"
//           className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[13.5px] transition-colors"
//         >
//           Back to Home
//         </Link>
//       </div>
//     </section>
//   );
// }

// // useSearchParams needs a Suspense boundary in the App Router
// export default function ThankYouPage() {
//   return (
//     <Suspense fallback={null}>
//       <ThankYouContent />
//     </Suspense>
//   );
// }
















// garud-tata\app\landing-page\thank-you\page.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Car, Bike } from "lucide-react";

function ThankYouContent() {
  const params = useSearchParams();
  const type = params.get("type") === "testdrive" ? "testdrive" : "enquiry";
  const model = params.get("model") ?? "";
  const outlet = params.get("outlet") ?? "";

  const isTestDrive = type === "testdrive";

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 py-20">
      <div className="max-w-md w-full text-center bg-white border border-gray-200 rounded-2xl shadow-sm p-8 sm:p-10">
        <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={30} className="text-blue-600" />
        </div>

        <h1 className="text-gray-900 font-extrabold text-2xl mb-2">
          {isTestDrive ? "Test Drive Booked!" : "Thank You!"}
        </h1>

        <p className="text-gray-500 text-[14.5px] leading-relaxed mb-6">
          {isTestDrive
            ? "Your test drive request has been received. Our team will call you within 24 hours to confirm your slot."
            : "Your enquiry has been received. Our team will call you within 24 hours."}
        </p>

        {(model || outlet) && (
          <div className="flex items-center justify-center gap-2 text-gray-600 text-[13px] bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 mb-7">
            {isTestDrive ? <Bike size={14} /> : <Car size={14} />}
            <span className="font-medium">{model}</span>
            {outlet && <span className="text-gray-400">· {outlet}</span>}
          </div>
        )}

        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-[13.5px] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}

// useSearchParams needs a Suspense boundary in the App Router
export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouContent />
    </Suspense>
  );
}