// // lib/tracking.ts

// /**
//  * Google Tag Manager / Data Layer tracking utilities
//  *
//  * Flow:
//  * Next.js → dataLayer → GTM → GA4 / Google Ads
//  */

// declare global {
//   interface Window {
//     dataLayer: Array<Record<string, unknown>>;
//   }
// }

// /**
//  * Push an event to Google Tag Manager dataLayer.
//  */
// function pushToDataLayer(
//   event: string,
//   parameters: Record<string, unknown> = {}
// ): void {
//   if (typeof window === "undefined") return;

//   window.dataLayer = window.dataLayer || [];

//   window.dataLayer.push({
//     event,
//     ...parameters,
//   });
// }

// /**
//  * Generic event
//  */
// export function trackEvent(
//   eventName: string,
//   parameters: Record<string, unknown> = {}
// ): void {
//   pushToDataLayer(eventName, parameters);
// }

// /* =========================================================
//    CTA / BUTTON TRACKING
// ========================================================= */

// /**
//  * Track CTA button clicks.
//  *
//  * Example:
//  * trackCTA("Get Offer", "hero");
//  */
// export function trackCTA(
//   ctaName: string,
//   location = "unknown"
// ): void {
//   pushToDataLayer("cta_click", {
//     cta_name: ctaName,
//     location,
//   });
// }

// /* =========================================================
//    PHONE TRACKING
// ========================================================= */

// /**
//  * Track phone/call clicks.
//  *
//  * Event:
//  * phone_click
//  */
// export function trackPhoneClick(
//   location = "unknown"
// ): void {
//   pushToDataLayer("phone_click", {
//     location,
//   });
// }

// /**
//  * Backward-compatible call event.
//  *
//  * Your existing navbar currently uses:
//  * call_click
//  */
// export function trackCallClick(
//   location = "unknown"
// ): void {
//   pushToDataLayer("call_click", {
//     location,
//   });
// }

// /**
//  * Track copying the phone number.
//  */
// export function trackCopyPhone(
//   location = "unknown"
// ): void {
//   pushToDataLayer("copy_phone", {
//     location,
//   });
// }

// /* =========================================================
//    WHATSAPP TRACKING
// ========================================================= */

// /**
//  * Track WhatsApp clicks.
//  *
//  * Example:
//  * trackWhatsAppClick("header");
//  */
// export function trackWhatsAppClick(
//   location = "unknown"
// ): void {
//   pushToDataLayer("whatsapp_click", {
//     location,
//   });
// }

// /* =========================================================
//    EMAIL TRACKING
// ========================================================= */

// /**
//  * Track email clicks.
//  */
// export function trackEmailClick(
//   location = "unknown"
// ): void {
//   pushToDataLayer("email_click", {
//     location,
//   });
// }

// /* =========================================================
//    FORM TRACKING
// ========================================================= */

// /**
//  * Generic form submission.
//  *
//  * Example:
//  * trackFormSubmission("contact_form");
//  */
// export function trackFormSubmission(
//   formName: string,
//   parameters: Record<string, unknown> = {}
// ): void {
//   pushToDataLayer("form_submit", {
//     form_name: formName,
//     ...parameters,
//   });
// }

// /**
//  * Test drive form submission.
//  */
// export function trackTestDriveSubmit(
//   modelName?: string
// ): void {
//   pushToDataLayer("test_drive_submit", {
//     model_name: modelName || "unknown",
//   });
// }

// /**
//  * Offer enquiry form submission.
//  */
// export function trackOfferEnquirySubmit(
//   modelName?: string
// ): void {
//   pushToDataLayer("offer_enquiry_submit", {
//     model_name: modelName || "unknown",
//   });
// }

// /**
//  * Contact form submission.
//  */
// export function trackContactFormSubmit(): void {
//   pushToDataLayer("contact_form_submit");
// }

// /**
//  * General enquiry submission.
//  */
// export function trackEnquirySubmit(
//   modelName?: string
// ): void {
//   pushToDataLayer("enquiry_submit", {
//     model_name: modelName || "unknown",
//   });
// }

// /**
//  * Feedback form submission.
//  */
// export function trackFeedbackSubmit(): void {
//   pushToDataLayer("feedback_submit");
// }

// /**
//  * Callback request.
//  */
// export function trackCallbackRequest(): void {
//   pushToDataLayer("callback_request");
// }

// /* =========================================================
//    CAR / PRODUCT TRACKING
// ========================================================= */

// /**
//  * Track viewing a specific car model.
//  *
//  * Example:
//  * trackCarModelView("Nexon");
//  */
// export function trackCarModelView(
//   modelName: string
// ): void {
//   pushToDataLayer("car_model_view", {
//     model_name: modelName,
//   });
// }

// /**
//  * Track selecting a car model.
//  */
// export function trackCarModelSelect(
//   modelName: string
// ): void {
//   pushToDataLayer("car_model_select", {
//     model_name: modelName,
//   });
// }

// /* =========================================================
//    BROCHURE / DOCUMENT TRACKING
// ========================================================= */

// /**
//  * Track brochure downloads.
//  */
// export function trackBrochureDownload(
//   modelName?: string
// ): void {
//   pushToDataLayer("brochure_download", {
//     model_name: modelName || "unknown",
//   });
// }

// /* =========================================================
//    EXTERNAL LINKS
// ========================================================= */

// /**
//  * Track external link clicks.
//  */
// export function trackExternalLink(
//   url: string,
//   location = "unknown"
// ): void {
//   pushToDataLayer("external_link_click", {
//     url,
//     location,
//   });
// }

// /* =========================================================
//    SHOWROOM TRACKING
// ========================================================= */

// /**
//  * Track showroom selection.
//  *
//  * Example:
//  * trackShowroomClick("Garud Tata Palam");
//  */
// export function trackShowroomClick(
//   showroomName: string
// ): void {
//   pushToDataLayer("showroom_click", {
//     showroom_name: showroomName,
//   });
// }

// /* =========================================================
//    NAVIGATION TRACKING
// ========================================================= */

// /**
//  * Track navigation menu clicks.
//  *
//  * Example:
//  * trackNavigationClick("Offers");
//  */
// export function trackNavigationClick(
//   linkName: string
// ): void {
//   pushToDataLayer("navigation_click", {
//     link_name: linkName,
//   });
// }

// /* =========================================================
//    SEARCH TRACKING
// ========================================================= */

// /**
//  * Track website searches.
//  */
// export function trackSearch(
//   searchTerm: string
// ): void {
//   pushToDataLayer("search", {
//     search_term: searchTerm,
//   });
// }














// lib/tracking.ts

/**
 * Google Tag Manager / Data Layer tracking utilities
 *
 * Flow:
 * Next.js → dataLayer → GTM → GA4 / Google Ads
 */

/**
 * Push an event to Google Tag Manager dataLayer.
 *
 * We intentionally type dataLayer locally instead of
 * extending Window globally. This prevents TypeScript
 * declaration conflicts with other files/libraries that
 * may already define window.dataLayer.
 */
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

/* =========================================================
   GENERIC EVENT TRACKING
========================================================= */

/**
 * Generic event.
 *
 * Example:
 * trackEvent("page_view_custom", {
 *   page_name: "Landing Page",
 * });
 */
export function trackEvent(
  eventName: string,
  parameters: Record<string, unknown> = {}
): void {
  pushToDataLayer(eventName, parameters);
}

/* =========================================================
   CTA / BUTTON TRACKING
========================================================= */

/**
 * Track CTA button clicks.
 *
 * Example:
 * trackCTA("Get Offer", "hero");
 */
export function trackCTA(
  ctaName: string,
  location = "unknown"
): void {
  pushToDataLayer("cta_click", {
    cta_name: ctaName,
    location,
  });
}

/* =========================================================
   PHONE TRACKING
========================================================= */

/**
 * Track phone/call clicks.
 *
 * Event:
 * phone_click
 */
export function trackPhoneClick(
  location = "unknown"
): void {
  pushToDataLayer("phone_click", {
    location,
  });
}

/**
 * Backward-compatible call event.
 *
 * Existing components may use:
 * trackCallClick()
 */
export function trackCallClick(
  location = "unknown"
): void {
  pushToDataLayer("call_click", {
    location,
  });
}

/**
 * Track copying the phone number.
 */
export function trackCopyPhone(
  location = "unknown"
): void {
  pushToDataLayer("copy_phone", {
    location,
  });
}

/* =========================================================
   WHATSAPP TRACKING
========================================================= */

/**
 * Track WhatsApp clicks.
 *
 * Example:
 * trackWhatsAppClick("header");
 */
export function trackWhatsAppClick(
  location = "unknown"
): void {
  pushToDataLayer("whatsapp_click", {
    location,
  });
}

/* =========================================================
   EMAIL TRACKING
========================================================= */

/**
 * Track email clicks.
 */
export function trackEmailClick(
  location = "unknown"
): void {
  pushToDataLayer("email_click", {
    location,
  });
}

/* =========================================================
   FORM TRACKING
========================================================= */

/**
 * Generic form submission.
 *
 * Example:
 * trackFormSubmission("contact_form");
 */
export function trackFormSubmission(
  formName: string,
  parameters: Record<string, unknown> = {}
): void {
  pushToDataLayer("form_submit", {
    form_name: formName,
    ...parameters,
  });
}

/**
 * Test drive form submission.
 *
 * GTM Event:
 * test_drive_submit
 *
 * Data Layer:
 * {
 *   event: "test_drive_submit",
 *   model_name: "Tata Punch EV"
 * }
 */
export function trackTestDriveSubmit(
  modelName?: string
): void {
  pushToDataLayer("test_drive_submit", {
    model_name: modelName || "unknown",
  });
}

/**
 * Offer enquiry form submission.
 *
 * GTM Event:
 * offer_enquiry_submit
 */
export function trackOfferEnquirySubmit(
  modelName?: string
): void {
  pushToDataLayer("offer_enquiry_submit", {
    model_name: modelName || "unknown",
  });
}

/**
 * Contact form submission.
 *
 * GTM Event:
 * contact_form_submit
 */
export function trackContactFormSubmit(): void {
  pushToDataLayer("contact_form_submit");
}

/**
 * General enquiry submission.
 *
 * GTM Event:
 * enquiry_submit
 *
 * Data Layer:
 * {
 *   event: "enquiry_submit",
 *   model_name: "Tata Punch EV"
 * }
 */
export function trackEnquirySubmit(
  modelName?: string
): void {
  pushToDataLayer("enquiry_submit", {
    model_name: modelName || "unknown",
  });
}

/**
 * Feedback form submission.
 *
 * GTM Event:
 * feedback_submit
 */
export function trackFeedbackSubmit(): void {
  pushToDataLayer("feedback_submit");
}

/**
 * Callback request.
 *
 * GTM Event:
 * callback_request
 */
export function trackCallbackRequest(): void {
  pushToDataLayer("callback_request");
}

/* =========================================================
   CAR / PRODUCT TRACKING
========================================================= */

/**
 * Track viewing a specific car model.
 *
 * Example:
 * trackCarModelView("Tata Nexon");
 */
export function trackCarModelView(
  modelName: string
): void {
  pushToDataLayer("car_model_view", {
    model_name: modelName,
  });
}

/**
 * Track selecting a car model.
 *
 * Example:
 * trackCarModelSelect("Tata Punch EV");
 */
export function trackCarModelSelect(
  modelName: string
): void {
  pushToDataLayer("car_model_select", {
    model_name: modelName,
  });
}

/* =========================================================
   BROCHURE / DOCUMENT TRACKING
========================================================= */

/**
 * Track brochure downloads.
 *
 * Example:
 * trackBrochureDownload("Tata Nexon");
 */
export function trackBrochureDownload(
  modelName?: string
): void {
  pushToDataLayer("brochure_download", {
    model_name: modelName || "unknown",
  });
}

/* =========================================================
   EXTERNAL LINKS
========================================================= */

/**
 * Track external link clicks.
 *
 * Example:
 * trackExternalLink(
 *   "https://example.com",
 *   "footer"
 * );
 */
export function trackExternalLink(
  url: string,
  location = "unknown"
): void {
  pushToDataLayer("external_link_click", {
    url,
    location,
  });
}

/* =========================================================
   SHOWROOM TRACKING
========================================================= */

/**
 * Track showroom selection.
 *
 * Example:
 * trackShowroomClick("Garud Tata Palam");
 */
export function trackShowroomClick(
  showroomName: string
): void {
  pushToDataLayer("showroom_click", {
    showroom_name: showroomName,
  });
}

/* =========================================================
   NAVIGATION TRACKING
========================================================= */

/**
 * Track navigation menu clicks.
 *
 * Example:
 * trackNavigationClick("Offers");
 */
export function trackNavigationClick(
  linkName: string
): void {
  pushToDataLayer("navigation_click", {
    link_name: linkName,
  });
}

/* =========================================================
   SEARCH TRACKING
========================================================= */

/**
 * Track website searches.
 *
 * Example:
 * trackSearch("Nexon");
 */
export function trackSearch(
  searchTerm: string
): void {
  pushToDataLayer("search", {
    search_term: searchTerm,
  });
}