




// // app/api/enquiry/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// import { appendToSheet } from "@/lib/googleSheets";

// interface EnquiryBody {
//   name: string;
//   mobile: string;
//   car?: string;
//   variant?: string;
//   type?: string;
//   showroom?: string;
//   source?: string;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body: EnquiryBody = await req.json();
//     const { name, mobile, car, variant, type, showroom, source } = body;

//     if (!name || name.trim().length < 2)
//       return NextResponse.json({ error: "Valid name is required." }, { status: 400 });

//     const cleanMobile = mobile?.replace(/\D/g, "");
//     if (!cleanMobile || cleanMobile.length < 10)
//       return NextResponse.json({ error: "Valid 10-digit mobile number is required." }, { status: 400 });

//     const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

//     // 1 — Firebase
//     const docRef = await addDoc(collection(db, "enquiries"), {
//       name:      name.trim(),
//       mobile:    cleanMobile,
//       car:       car?.trim()      || null,
//       variant:   variant?.trim()  || null,
//       type:      type?.trim()     || "Get Offer",
//       showroom:  showroom?.trim() || null,
//       source:    source?.trim()   || "website",
//       status:    "new",
//       createdAt: serverTimestamp(),
//       updatedAt: serverTimestamp(),
//     });

//     // 2 — Google Sheets (non-blocking)
//     try {
//       await appendToSheet(
//         process.env.ENQUIRY_SHEET_ID!,
//         "Sheet1!A:H",
//         [[
//           now,
//           name.trim(),
//           cleanMobile,
//           car?.trim()      || "",
//           variant?.trim()  || "",
//           type?.trim()     || "Get Offer",
//           showroom?.trim() || "",
//           docRef.id,
//         ]]
//       );
//     } catch (sheetErr) {
//       console.error("[/api/enquiry] Google Sheets error:", sheetErr);
//     }

//     return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
//   } catch (err) {
//     console.error("[/api/enquiry] Error:", err);
//     return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
//   }
// }

// export async function GET() {
//   return NextResponse.json({ ok: true, endpoint: "POST /api/enquiry" });
// }




















// app/api/enquiry/route.ts

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
  mobile: string;
  car?: string;
  variant?: string;
  type?: string;
  showroom?: string;
  source?: string;
  campaign?: string;
  notes?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: EnquiryBody = await req.json();

    const {
      name,
      mobile,
      car,
      variant,
      type,
      showroom,
      source,
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

    // ─────────────────────────────────────────────
    // DEFAULT VALUES
    // ─────────────────────────────────────────────

    const enquiryType = type?.trim() || "Get Offer";
    const enquirySource = source?.trim() || "website";

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
      collection(db, "enquiries"),
      {
        name: name.trim(),

        mobile: cleanMobile,

        car: car?.trim() || null,

        variant: variant?.trim() || null,

        type: enquiryType,

        showroom: showroom?.trim() || null,

        source: enquirySource,

        campaign: campaign?.trim() || null,

        notes: notes?.trim() || null,

        status: "new",

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
            enquiryType,

            // E - Name
            name.trim(),

            // F - Mobile
            cleanMobile,

            // G - Email
            "",

            // H - Car
            car?.trim() || "",

            // I - Variant
            variant?.trim() || "",

            // J - Showroom / Workshop
            showroom?.trim() || "",

            // K - Source
            enquirySource,

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
        "[/api/enquiry] Google Sheets entry added successfully:",
        docRef.id
      );
    } catch (sheetErr) {
      // Firebase data is already saved.
      // Do not fail the enquiry if Google Sheets fails.

      console.error(
        "[/api/enquiry] Google Sheets error:",
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
        message: "Enquiry submitted successfully.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(
      "[/api/enquiry] Error:",
      err
    );

    return NextResponse.json(
      {
        error:
          "Something went wrong. Please try again.",
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
    endpoint: "POST /api/enquiry",
  });
}