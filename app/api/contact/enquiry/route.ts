


// // app/api/contact/enquiry/route.ts

// import { NextRequest, NextResponse } from "next/server";

// import { db } from "@/lib/firebase";

// import {
//   collection,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";

// import { appendToSheet } from "@/lib/googleSheets";

// interface EnquiryBody {
//   name: string;
//   email?: string;
//   mobile: string;
//   model: string;
//   outlet: string;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body: EnquiryBody = await req.json();

//     const {
//       name,
//       email,
//       mobile,
//       model,
//       outlet,
//     } = body;

//     // ─────────────────────────────────────────────
//     // VALIDATION
//     // ─────────────────────────────────────────────

//     if (!name || name.trim().length < 2) {
//       return NextResponse.json(
//         { error: "Valid name is required." },
//         { status: 400 }
//       );
//     }

//     const cleanMobile = mobile?.replace(/\D/g, "");

//     if (!cleanMobile || cleanMobile.length < 10) {
//       return NextResponse.json(
//         {
//           error:
//             "Valid 10-digit mobile number is required.",
//         },
//         { status: 400 }
//       );
//     }

//     if (!model?.trim()) {
//       return NextResponse.json(
//         { error: "Car model is required." },
//         { status: 400 }
//       );
//     }

//     if (!outlet?.trim()) {
//       return NextResponse.json(
//         { error: "Outlet selection is required." },
//         { status: 400 }
//       );
//     }

//     // ─────────────────────────────────────────────
//     // CURRENT TIME
//     // ─────────────────────────────────────────────

//     const now = new Date().toLocaleString("en-IN", {
//       timeZone: "Asia/Kolkata",
//     });

//     // ─────────────────────────────────────────────
//     // 1. SAVE TO FIREBASE
//     // ─────────────────────────────────────────────

//     const docRef = await addDoc(
//       collection(db, "contact_enquiries"),
//       {
//         name: name.trim(),
//         email: email?.trim() || null,
//         mobile: cleanMobile,
//         model: model.trim(),
//         outlet: outlet.trim(),

//         type: "car_enquiry",
//         status: "new",
//         source: "website",

//         createdAt: serverTimestamp(),
//         updatedAt: serverTimestamp(),
//       }
//     );

//     // ─────────────────────────────────────────────
//     // 2. SAVE TO GOOGLE SHEETS
//     // ─────────────────────────────────────────────

//     try {
//       await appendToSheet(
//         process.env.ENQUIRY_SHEET_ID!,
//         "ContactEnquiries!A:H",
//         [
//           [
//             now,
//             name.trim(),
//             cleanMobile,
//             email?.trim() || "",
//             model.trim(),
//             outlet.trim(),
//             "car_enquiry",
//             docRef.id,
//           ],
//         ]
//       );
//     } catch (sheetErr) {
//       console.error(
//         "[/api/contact/enquiry] Google Sheets error:",
//         sheetErr
//       );
//     }

//     // ─────────────────────────────────────────────
//     // SUCCESS
//     // ─────────────────────────────────────────────

//     return NextResponse.json(
//       {
//         success: true,
//         id: docRef.id,
//         message: "Car enquiry submitted successfully.",
//       },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error(
//       "[/api/contact/enquiry] Error:",
//       err
//     );

//     return NextResponse.json(
//       {
//         error:
//           "Something went wrong. Please try again.",
//       },
//       { status: 500 }
//     );
//   }
// }

// // ─────────────────────────────────────────────
// // GET / HEALTH CHECK
// // ─────────────────────────────────────────────

// export async function GET() {
//   return NextResponse.json({
//     ok: true,
//     endpoint: "POST /api/contact/enquiry",
//   });
// }


















// app/api/contact/enquiry/route.ts

import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { appendToSheet } from "@/lib/googleSheets";

interface EnquiryBody {
  name: string;
  email?: string;
  mobile: string;
  model: string;
  variant?: string;
  outlet: string;
  campaign?: string;
  notes?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: EnquiryBody = await req.json();

    const {
      name,
      email,
      mobile,
      model,
      variant,
      outlet,
      campaign,
      notes,
    } = body;

    // ─────────────────────────────────────────────
    // VALIDATION
    // ─────────────────────────────────────────────

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        {
          error: "Valid name is required.",
        },
        { status: 400 }
      );
    }

    const cleanMobile = mobile?.replace(/\D/g, "");

    if (!cleanMobile || cleanMobile.length < 10) {
      return NextResponse.json(
        {
          error: "Valid 10-digit mobile number is required.",
        },
        { status: 400 }
      );
    }

    if (!model?.trim()) {
      return NextResponse.json(
        {
          error: "Car model is required.",
        },
        { status: 400 }
      );
    }

    if (!outlet?.trim()) {
      return NextResponse.json(
        {
          error: "Outlet selection is required.",
        },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────
    // CURRENT DATE & TIME - INDIA
    // ─────────────────────────────────────────────

    const now = new Date();

    const sheetDate = now.toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    const sheetTime = now.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // ─────────────────────────────────────────────
    // 1. SAVE TO FIREBASE
    // ─────────────────────────────────────────────

    const docRef = await addDoc(
      collection(db, "contact_enquiries"),
      {
        name: name.trim(),

        email: email?.trim() || null,

        mobile: cleanMobile,

        model: model.trim(),

        variant: variant?.trim() || null,

        outlet: outlet.trim(),

        campaign: campaign?.trim() || null,

        notes: notes?.trim() || null,

        type: "car_enquiry",

        status: "new",

        source: "website",

        createdAt: serverTimestamp(),

        updatedAt: serverTimestamp(),
      }
    );

    // ─────────────────────────────────────────────
    // 2. SAVE TO MASTER GOOGLE SHEET
    // ─────────────────────────────────────────────
    //
    // Sheet: Sheet1
    //
    // A = Date
    // B = Time
    // C = Enquiry ID
    // D = Type
    // E = Name
    // F = Mobile
    // G = Email
    // H = Car
    // I = Variant
    // J = Showroom / Workshop
    // K = Source
    // L = Campaign
    // M = Status
    // N = Assigned To
    // O = Follow-up Date
    // P = Notes
    //
    // ─────────────────────────────────────────────

    try {
      const sheetId = process.env.ENQUIRY_SHEET_ID;

      if (!sheetId) {
        throw new Error(
          "ENQUIRY_SHEET_ID is not configured in environment variables."
        );
      }

      await appendToSheet(
        sheetId,
        "Sheet1!A:P",
        [
          [
            // A - Date
            sheetDate,

            // B - Time
            sheetTime,

            // C - Enquiry ID
            docRef.id,

            // D - Type
            "car_enquiry",

            // E - Name
            name.trim(),

            // F - Mobile
            cleanMobile,

            // G - Email
            email?.trim() || "",

            // H - Car
            model.trim(),

            // I - Variant
            variant?.trim() || "",

            // J - Showroom / Workshop
            outlet.trim(),

            // K - Source
            "website",

            // L - Campaign
            campaign?.trim() || "",

            // M - Status
            "new",

            // N - Assigned To
            "",

            // O - Follow-up Date
            "",

            // P - Notes
            notes?.trim() || "",
          ],
        ]
      );

      console.log(
        "[/api/contact/enquiry] Google Sheets entry added successfully:",
        docRef.id
      );
    } catch (sheetErr) {
      // Firebase data is already saved.
      // Do not fail the enquiry if Google Sheets fails.

      console.error(
        "[/api/contact/enquiry] Google Sheets error:",
        sheetErr
      );
    }

    // ─────────────────────────────────────────────
    // SUCCESS RESPONSE
    // ─────────────────────────────────────────────

    return NextResponse.json(
      {
        success: true,

        id: docRef.id,

        message: "Car enquiry submitted successfully.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(
      "[/api/contact/enquiry] Error:",
      err
    );

    return NextResponse.json(
      {
        error: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────
// GET / HEALTH CHECK
// ─────────────────────────────────────────────

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "POST /api/contact/enquiry",
  });
}