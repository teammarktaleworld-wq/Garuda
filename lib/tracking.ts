// /**
//  * Google Tag Manager / Data Layer tracking utilities
//  *
//  * Flow:
//  *
//  * Next.js
//  *    ↓
//  * dataLayer
//  *    ↓
//  * Google Tag Manager
//  *    ↓
//  * GA4 / Google Ads
//  */

// // =========================================================
// // GENERIC DATA LAYER HELPER
// // =========================================================

// function pushToDataLayer(
//   event: string,
//   parameters: Record<string, unknown> = {}
// ): void {
//   if (typeof window === "undefined") return;

//   const w = window as typeof window & {
//     dataLayer?: Array<Record<string, unknown>>;
//   };

//   w.dataLayer = w.dataLayer || [];

//   w.dataLayer.push({
//     event,
//     ...parameters,
//   });
// }

// // =========================================================
// // NAVBAR - CALL
// // =========================================================
// // this is common for landing page and / page 
// export function trackCallClick(
//   location = "unknown"
// ): void {
//   pushToDataLayer("call_click", {
//     location,
//   });
// }

// // =========================================================
// // NAVBAR - WHATSAPP
// // =========================================================

// export function trackWhatsAppClick(
//   location = "unknown"
// ): void {
//   pushToDataLayer("whatsapp_click", {
//     location,
//   });
// }

// // =========================================================
// // NAVBAR - COPY PHONE
// // =========================================================

// export function trackCopyPhone(
//   location = "unknown"
// ): void {
//   pushToDataLayer("copy_phone", {
//     location,
//   });
// }

// // =========================================================
// // CAR ENQUIRY SUBMISSION
// // =========================================================
// // this is for landing page 
// export function trackEnquirySubmit(
//   model?: string
// ): void {
//   pushToDataLayer("enquiry_submit", {
//     model_name: model || "unknown",
//   });
// }

// // =========================================================
// // TEST DRIVE SUBMISSION
// // =========================================================
// // this is for landing page 

// export function trackTestDriveSubmit(
//   model?: string
// ): void {
//   pushToDataLayer("test_drive_submit", {
//     model_name: model || "unknown",
//   });
// }

// // =========================================================
// // HERO - GET OFFER CTA CLICK
// // =========================================================
// //this is for offerhero
// export function trackGetOfferClick(
//   location = "unknown"
// ): void {
//   pushToDataLayer("get_offer_click", {
//     location,
//   });
// }

// // =========================================================
// // HERO - BOOK TEST DRIVE CTA CLICK
// // =========================================================
// // this is for offerhero 

// export function trackBookTestDriveClick(
//   location = "unknown"
// ): void {
//   pushToDataLayer("book_test_drive_click", {
//     location,
//   });
// }

// // =========================================================
// // OFFERS FORM - GOOGLE ADS CONVERSION
// // =========================================================
// // this is for offers.tsx form submissions (Offer Enquiry / Test Drive)
// // fires via GTM dataLayer, same pattern as call/whatsapp/copy tracking above

// export function trackOfferFormConversion(
//   model?: string,
//   enquiryType?: string
// ): void {
//   pushToDataLayer("conversion", {
//     send_to: "AW-18209967669/lusxCJrosuocELWcmOtD",
//     value: 1.0,
//     currency: "INR",
//     model_name: model || "unknown",
//     enquiry_type: enquiryType || "unknown",
//   });
// }



















// /**
//  * Google Tag Manager / Data Layer tracking utilities
//  *
//  * Flow:
//  *
//  * Next.js
//  *    ↓
//  * dataLayer
//  *    ↓
//  * Google Tag Manager
//  *    ↓
//  * GA4 / Google Ads
//  */

// // =========================================================
// // GENERIC DATA LAYER HELPER
// // =========================================================

// function pushToDataLayer(
//   event: string,
//   parameters: Record<string, unknown> = {}
// ): void {
//   if (typeof window === "undefined") return;

//   const w = window as typeof window & {
//     dataLayer?: Array<Record<string, unknown>>;
//   };

//   w.dataLayer = w.dataLayer || [];

//   w.dataLayer.push({
//     event,
//     ...parameters,
//   });
// }

// // =========================================================
// // NAVBAR - CALL
// // =========================================================
// // this is common for landing page and / page 
// export function trackCallClick(
//   location = "unknown"
// ): void {
//   pushToDataLayer("call_click", {
//     location,
//   });
// }

// // =========================================================
// // NAVBAR - WHATSAPP
// // =========================================================

// export function trackWhatsAppClick(
//   location = "unknown"
// ): void {
//   pushToDataLayer("whatsapp_click", {
//     location,
//   });
// }

// // =========================================================
// // NAVBAR - COPY PHONE
// // =========================================================

// export function trackCopyPhone(
//   location = "unknown"
// ): void {
//   pushToDataLayer("copy_phone", {
//     location,
//   });
// }

// // =========================================================
// // CAR ENQUIRY SUBMISSION
// // =========================================================
// // this is for landing page + contact page (Car Enquiry tab)
// export function trackEnquirySubmit(
//   model?: string
// ): void {
//   pushToDataLayer("enquiry_submit", {
//     model_name: model || "unknown",
//   });
// }

// // =========================================================
// // TEST DRIVE SUBMISSION
// // =========================================================
// // this is for landing page + contact page (Test Drive tab)

// export function trackTestDriveSubmit(
//   model?: string
// ): void {
//   pushToDataLayer("test_drive_submit", {
//     model_name: model || "unknown",
//   });
// }

// // =========================================================
// // SERVICE BOOKING SUBMISSION
// // =========================================================
// // this is for contact page (Service Booking tab)

// export function trackServiceBookingSubmit(
//   model?: string,
//   serviceType?: string
// ): void {
//   pushToDataLayer("service_booking_submit", {
//     model_name: model || "unknown",
//     service_type: serviceType || "unknown",
//   });
// }

// // =========================================================
// // COMPLAINT / QUERY SUBMISSION
// // =========================================================
// // this is for contact page (Complaints / Queries tab)

// export function trackComplaintSubmit(
//   outlet?: string
// ): void {
//   pushToDataLayer("complaint_submit", {
//     outlet_name: outlet || "unknown",
//   });
// }

// // =========================================================
// // FEEDBACK SUBMISSION
// // =========================================================
// // this is for contact page (Feedback tab)

// export function trackFeedbackSubmit(
//   outlet?: string,
//   rating?: number
// ): void {
//   pushToDataLayer("feedback_submit", {
//     outlet_name: outlet || "unknown",
//     rating: rating ?? 0,
//   });
// }

// // =========================================================
// // HERO - GET OFFER CTA CLICK
// // =========================================================
// //this is for offerhero
// export function trackGetOfferClick(
//   location = "unknown"
// ): void {
//   pushToDataLayer("get_offer_click", {
//     location,
//   });
// }

// // =========================================================
// // HERO - BOOK TEST DRIVE CTA CLICK
// // =========================================================
// // this is for offerhero 

// export function trackBookTestDriveClick(
//   location = "unknown"
// ): void {
//   pushToDataLayer("book_test_drive_click", {
//     location,
//   });
// }

// // =========================================================
// // OFFERS FORM - GOOGLE ADS CONVERSION
// // =========================================================
// // this is for offers.tsx form submissions (Offer Enquiry / Test Drive)
// // fires via GTM dataLayer, same pattern as call/whatsapp/copy tracking above

// export function trackOfferFormConversion(
//   model?: string,
//   enquiryType?: string
// ): void {
//   pushToDataLayer("conversion", {
//     send_to: "AW-18209967669/lusxCJrosuocELWcmOtD",
//     value: 1.0,
//     currency: "INR",
//     model_name: model || "unknown",
//     enquiry_type: enquiryType || "unknown",
//   });
// }

// // =========================================================
// // CONTACT PAGE FORMS - GOOGLE ADS CONVERSION
// // =========================================================
// // this is for contact.tsx form submissions (all 5 tabs)
// // fires via GTM dataLayer, same pattern as trackOfferFormConversion above
// // formType examples: "enquiry" | "testdrive" | "service" | "complaint" | "feedback"

// export function trackContactFormConversion(
//   formType: string,
//   detail?: string
// ): void {
//   pushToDataLayer("conversion", {
//     send_to: "AW-18209967669/lusxCJrosuocELWcmOtD",
//     value: 1.0,
//     currency: "INR",
//     form_type: formType,
//     detail: detail || "unknown",
//   });
// }














/**
 * Google Tag Manager / Data Layer tracking utilities
 *
 * Flow:
 *
 * Next.js
 *    ↓
 * dataLayer
 *    ↓
 * Google Tag Manager
 *    ↓
 * GA4 / Google Ads
 */

// =========================================================
// GENERIC DATA LAYER HELPER
// =========================================================

function pushToDataLayer(
  event: string,
  parameters: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;

  const w = window as typeof window & {
    dataLayer?: Array<Record<string, unknown>>;
  };

  w.dataLayer = w.dataLayer || [];

  w.dataLayer.push({
    event,
    ...parameters,
  });
}

// =========================================================
// NAVBAR - CALL
// =========================================================
// this is common for landing page and / page 
export function trackCallClick(
  location = "unknown"
): void {
  pushToDataLayer("call_click", {
    location,
  });
}

// =========================================================
// NAVBAR - WHATSAPP
// =========================================================

export function trackWhatsAppClick(
  location = "unknown"
): void {
  pushToDataLayer("whatsapp_click", {
    location,
  });
}

// =========================================================
// NAVBAR - COPY PHONE
// =========================================================

export function trackCopyPhone(
  location = "unknown"
): void {
  pushToDataLayer("copy_phone", {
    location,
  });
}

// =========================================================
// CAR ENQUIRY SUBMISSION
// =========================================================
// this is for landing page + contact page (Car Enquiry tab) + offer detail page
export function trackEnquirySubmit(
  model?: string
): void {
  pushToDataLayer("enquiry_submit", {
    model_name: model || "unknown",
  });
}

// =========================================================
// TEST DRIVE SUBMISSION
// =========================================================
// this is for landing page + contact page (Test Drive tab) + offer detail page

export function trackTestDriveSubmit(
  model?: string
): void {
  pushToDataLayer("test_drive_submit", {
    model_name: model || "unknown",
  });
}

// =========================================================
// SERVICE BOOKING SUBMISSION
// =========================================================
// this is for contact page (Service Booking tab)

export function trackServiceBookingSubmit(
  model?: string,
  serviceType?: string
): void {
  pushToDataLayer("service_booking_submit", {
    model_name: model || "unknown",
    service_type: serviceType || "unknown",
  });
}

// =========================================================
// COMPLAINT / QUERY SUBMISSION
// =========================================================
// this is for contact page (Complaints / Queries tab)

export function trackComplaintSubmit(
  outlet?: string
): void {
  pushToDataLayer("complaint_submit", {
    outlet_name: outlet || "unknown",
  });
}

// =========================================================
// FEEDBACK SUBMISSION
// =========================================================
// this is for contact page (Feedback tab)

export function trackFeedbackSubmit(
  outlet?: string,
  rating?: number
): void {
  pushToDataLayer("feedback_submit", {
    outlet_name: outlet || "unknown",
    rating: rating ?? 0,
  });
}

// =========================================================
// HERO - GET OFFER CTA CLICK
// =========================================================
//this is for offerhero
export function trackGetOfferClick(
  location = "unknown"
): void {
  pushToDataLayer("get_offer_click", {
    location,
  });
}

// =========================================================
// HERO - BOOK TEST DRIVE CTA CLICK
// =========================================================
// this is for offerhero 

export function trackBookTestDriveClick(
  location = "unknown"
): void {
  pushToDataLayer("book_test_drive_click", {
    location,
  });
}

// =========================================================
// OFFERS FORM - GOOGLE ADS CONVERSION
// =========================================================
// this is for offers.tsx (landing page modal) AND offerenquiryform.tsx
// (offer detail page form) submissions — Offer Enquiry / Test Drive / Get Offer
// fires via GTM dataLayer, same pattern as call/whatsapp/copy tracking above

export function trackOfferFormConversion(
  model?: string,
  enquiryType?: string
): void {
  pushToDataLayer("conversion", {
    send_to: "AW-18209967669/lusxCJrosuocELWcmOtD",
    value: 1.0,
    currency: "INR",
    model_name: model || "unknown",
    enquiry_type: enquiryType || "unknown",
  });
}

// =========================================================
// CONTACT PAGE FORMS - GOOGLE ADS CONVERSION
// =========================================================
// this is for contact.tsx form submissions (all 5 tabs)
// fires via GTM dataLayer, same pattern as trackOfferFormConversion above
// formType examples: "enquiry" | "testdrive" | "service" | "complaint" | "feedback"

export function trackContactFormConversion(
  formType: string,
  detail?: string
): void {
  pushToDataLayer("conversion", {
    send_to: "AW-18209967669/lusxCJrosuocELWcmOtD",
    value: 1.0,
    currency: "INR",
    form_type: formType,
    detail: detail || "unknown",
  });
}