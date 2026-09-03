// // app/api/test-drive/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// interface TestDriveBody {
//   name: string;
//   mobile: string;
//   car: string;
//   showroom: string;
//   date: string;       // ISO date string "YYYY-MM-DD"
//   slot: string;       // e.g. "10:00 AM"
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body: TestDriveBody = await req.json();
//     const { name, mobile, car, showroom, date, slot } = body;

//     /* ── Validation ── */
//     if (!name || name.trim().length < 2) {
//       return NextResponse.json(
//         { error: "Valid name is required." },
//         { status: 400 }
//       );
//     }

//     const cleanMobile = mobile?.replace(/\D/g, "");
//     if (!cleanMobile || cleanMobile.length < 10) {
//       return NextResponse.json(
//         { error: "Valid 10-digit mobile number is required." },
//         { status: 400 }
//       );
//     }

//     if (!car || car.trim().length === 0) {
//       return NextResponse.json(
//         { error: "Car model is required." },
//         { status: 400 }
//       );
//     }

//     if (!showroom || showroom.trim().length === 0) {
//       return NextResponse.json(
//         { error: "Showroom selection is required." },
//         { status: 400 }
//       );
//     }

//     if (!date) {
//       return NextResponse.json(
//         { error: "Preferred date is required." },
//         { status: 400 }
//       );
//     }

//     // Ensure date is not in the past
//     const requested = new Date(date);
//     const today     = new Date();
//     today.setHours(0, 0, 0, 0);
//     if (requested < today) {
//       return NextResponse.json(
//         { error: "Preferred date cannot be in the past." },
//         { status: 400 }
//       );
//     }

//     if (!slot || slot.trim().length === 0) {
//       return NextResponse.json(
//         { error: "Time slot is required." },
//         { status: 400 }
//       );
//     }

//     /* ── Firestore write ── */
//     const docRef = await addDoc(collection(db, "test_drives"), {
//       name:      name.trim(),
//       mobile:    cleanMobile,
//       car:       car.trim(),
//       showroom:  showroom.trim(),
//       date:      date,           // store as-is for easy display/sorting
//       slot:      slot.trim(),
//       status:    "pending",      // pending → confirmed → completed
//       source:    "website",
//       createdAt: serverTimestamp(),
//       updatedAt: serverTimestamp(),
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         id:      docRef.id,
//         message: "Test drive request submitted successfully.",
//       },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("[/api/test-drive] Error:", err);
//     return NextResponse.json(
//       { error: "Something went wrong. Please try again." },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   return NextResponse.json({ ok: true, endpoint: "POST /api/test-drive" });
// }

















// app/api/test-drive/route.ts

import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { appendToSheet } from "@/lib/googleSheets";

interface TestDriveBody {
  name: string;
  mobile: string;
  car: string;
  variant?: string;
  showroom: string;
  date: string; // YYYY-MM-DD
  slot: string; // e.g. "10:00 AM"
  campaign?: string;
  notes?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: TestDriveBody = await req.json();

    const {
      name,
      mobile,
      car,
      variant,
      showroom,
      date,
      slot,
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

    if (!car || car.trim().length === 0) {
      return NextResponse.json(
        {
          error: "Car model is required.",
        },
        { status: 400 }
      );
    }

    if (!showroom || showroom.trim().length === 0) {
      return NextResponse.json(
        {
          error: "Showroom selection is required.",
        },
        { status: 400 }
      );
    }

    if (!date) {
      return NextResponse.json(
        {
          error: "Preferred date is required.",
        },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────
    // VALIDATE DATE
    // ─────────────────────────────────────────────

    const requested = new Date(date);

    if (Number.isNaN(requested.getTime())) {
      return NextResponse.json(
        {
          error: "Invalid preferred date.",
        },
        { status: 400 }
      );
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (requested < today) {
      return NextResponse.json(
        {
          error: "Preferred date cannot be in the past.",
        },
        { status: 400 }
      );
    }

    if (!slot || slot.trim().length === 0) {
      return NextResponse.json(
        {
          error: "Time slot is required.",
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
      collection(db, "test_drives"),
      {
        name: name.trim(),

        mobile: cleanMobile,

        car: car.trim(),

        variant: variant?.trim() || null,

        showroom: showroom.trim(),

        date: date,

        slot: slot.trim(),

        campaign: campaign?.trim() || null,

        notes: notes?.trim() || null,

        type: "test_drive",

        status: "pending",

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

      // Store Test Drive date + slot in Notes
      // because the master sheet has no dedicated
      // Test Drive Date / Slot columns.

      let testDriveNotes =
        `Test Drive Date: ${date} | Slot: ${slot.trim()}`;

      if (notes?.trim()) {
        testDriveNotes += ` | ${notes.trim()}`;
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
            "test_drive",

            // E - Name
            name.trim(),

            // F - Mobile
            cleanMobile,

            // G - Email
            "",

            // H - Car
            car.trim(),

            // I - Variant
            variant?.trim() || "",

            // J - Showroom / Workshop
            showroom.trim(),

            // K - Source
            "website",

            // L - Campaign
            campaign?.trim() || "",

            // M - Status
            "pending",

            // N - Assigned To
            "",

            // O - Follow-up Date
            "",

            // P - Notes
            testDriveNotes,
          ],
        ]
      );

      console.log(
        "[/api/test-drive] Google Sheets entry added successfully:",
        docRef.id
      );
    } catch (sheetErr) {
      // Firebase data is already saved.
      // Do not fail the Test Drive request if
      // Google Sheets fails.

      console.error(
        "[/api/test-drive] Google Sheets error:",
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
          "Test drive request submitted successfully.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(
      "[/api/test-drive] Error:",
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
    endpoint: "POST /api/test-drive",
  });
}