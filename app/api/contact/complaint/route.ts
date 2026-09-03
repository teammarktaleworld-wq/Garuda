// // app/api/contact/complaint/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// interface ComplaintBody {
//   name: string;
//   email?: string;
//   mobile: string;
//   outlet: string;
//   query: string;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body: ComplaintBody = await req.json();
//     const { name, email, mobile, outlet, query } = body;

//     if (!name || name.trim().length < 2)
//       return NextResponse.json({ error: "Valid name is required." }, { status: 400 });

//     const cleanMobile = mobile?.replace(/\D/g, "");
//     if (!cleanMobile || cleanMobile.length < 10)
//       return NextResponse.json({ error: "Valid 10-digit mobile number is required." }, { status: 400 });

//     if (!outlet?.trim())
//       return NextResponse.json({ error: "Outlet selection is required." }, { status: 400 });

//     if (!query || query.trim().length < 10)
//       return NextResponse.json({ error: "Please describe your query (at least 10 characters)." }, { status: 400 });

//     const docRef = await addDoc(collection(db, "complaints"), {
//       name:      name.trim(),
//       email:     email?.trim() || null,
//       mobile:    cleanMobile,
//       outlet:    outlet.trim(),
//       query:     query.trim(),
//       type:      "complaint_query",
//       status:    "open",        // open → in_progress → resolved
//       priority:  "normal",
//       source:    "website",
//       createdAt: serverTimestamp(),
//       updatedAt: serverTimestamp(),
//     });

//     return NextResponse.json(
//       { success: true, id: docRef.id, message: "Complaint / query submitted successfully." },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("[/api/contact/complaint] Error:", err);
//     return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
//   }
// }

// export async function GET() {
//   return NextResponse.json({ ok: true, endpoint: "POST /api/contact/complaint" });
// }

















// app/api/contact/complaint/route.ts

import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { appendToSheet } from "@/lib/googleSheets";

interface ComplaintBody {
  name: string;
  email?: string;
  mobile: string;
  outlet: string;
  query: string;
  campaign?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ComplaintBody = await req.json();

    const {
      name,
      email,
      mobile,
      outlet,
      query,
      campaign,
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

    if (!outlet?.trim()) {
      return NextResponse.json(
        {
          error: "Outlet selection is required.",
        },
        { status: 400 }
      );
    }

    if (!query || query.trim().length < 10) {
      return NextResponse.json(
        {
          error:
            "Please describe your query (at least 10 characters).",
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
      collection(db, "complaints"),
      {
        name: name.trim(),

        email: email?.trim() || null,

        mobile: cleanMobile,

        outlet: outlet.trim(),

        query: query.trim(),

        type: "complaint_query",

        status: "open",

        priority: "normal",

        source: "website",

        campaign: campaign?.trim() || null,

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

      // Complaint/query does not have a car or variant.
      // The complete complaint text is stored in Notes.

      const complaintNotes = `Complaint / Query: ${query.trim()}`;

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
            "complaint_query",

            // E - Name
            name.trim(),

            // F - Mobile
            cleanMobile,

            // G - Email
            email?.trim() || "",

            // H - Car
            "",

            // I - Variant
            "",

            // J - Showroom / Workshop
            outlet.trim(),

            // K - Source
            "website",

            // L - Campaign
            campaign?.trim() || "",

            // M - Status
            "open",

            // N - Assigned To
            "",

            // O - Follow-up Date
            "",

            // P - Notes
            complaintNotes,
          ],
        ]
      );

      console.log(
        "[/api/contact/complaint] Google Sheets entry added successfully:",
        docRef.id
      );
    } catch (sheetErr) {
      // Firebase data is already saved.
      // Do not fail the complaint if Google Sheets fails.

      console.error(
        "[/api/contact/complaint] Google Sheets error:",
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

        message:
          "Complaint / query submitted successfully.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(
      "[/api/contact/complaint] Error:",
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
    endpoint: "POST /api/contact/complaint",
  });
}