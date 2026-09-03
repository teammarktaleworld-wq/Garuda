// // app/api/contact/service/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// interface ServiceBody {
//   name: string;
//   email?: string;
//   mobile: string;
//   model: string;
//   outlet: string;
//   serviceType: string;
//   date?: string;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body: ServiceBody = await req.json();
//     const { name, email, mobile, model, outlet, serviceType, date } = body;

//     if (!name || name.trim().length < 2)
//       return NextResponse.json({ error: "Valid name is required." }, { status: 400 });

//     const cleanMobile = mobile?.replace(/\D/g, "");
//     if (!cleanMobile || cleanMobile.length < 10)
//       return NextResponse.json({ error: "Valid 10-digit mobile number is required." }, { status: 400 });

//     if (!model?.trim())
//       return NextResponse.json({ error: "Car model is required." }, { status: 400 });

//     if (!outlet?.trim())
//       return NextResponse.json({ error: "Outlet selection is required." }, { status: 400 });

//     if (!serviceType?.trim())
//       return NextResponse.json({ error: "Service type is required." }, { status: 400 });

//     // Validate date is not in the past if provided
//     if (date) {
//       const requested = new Date(date);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       if (requested < today)
//         return NextResponse.json({ error: "Preferred date cannot be in the past." }, { status: 400 });
//     }

//     const docRef = await addDoc(collection(db, "service_bookings"), {
//       name:        name.trim(),
//       email:       email?.trim() || null,
//       mobile:      cleanMobile,
//       model:       model.trim(),
//       outlet:      outlet.trim(),
//       serviceType: serviceType.trim(),
//       date:        date || null,
//       type:        "service_booking",
//       status:      "pending",   // pending → confirmed → completed
//       source:      "website",
//       createdAt:   serverTimestamp(),
//       updatedAt:   serverTimestamp(),
//     });

//     return NextResponse.json(
//       { success: true, id: docRef.id, message: "Service booking submitted successfully." },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("[/api/contact/service] Error:", err);
//     return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
//   }
// }

// export async function GET() {
//   return NextResponse.json({ ok: true, endpoint: "POST /api/contact/service" });
// }

















// app/api/contact/service/route.ts

import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { appendToSheet } from "@/lib/googleSheets";

interface ServiceBody {
  name: string;
  email?: string;
  mobile: string;
  model: string;
  variant?: string;
  outlet: string;
  serviceType: string;
  date?: string;
  campaign?: string;
  notes?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ServiceBody = await req.json();

    const {
      name,
      email,
      mobile,
      model,
      variant,
      outlet,
      serviceType,
      date,
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

    if (!serviceType?.trim()) {
      return NextResponse.json(
        {
          error: "Service type is required.",
        },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────
    // VALIDATE DATE
    // ─────────────────────────────────────────────

    if (date) {
      const requested = new Date(date);

      if (Number.isNaN(requested.getTime())) {
        return NextResponse.json(
          {
            error: "Invalid service date.",
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
      collection(db, "service_bookings"),
      {
        name: name.trim(),

        email: email?.trim() || null,

        mobile: cleanMobile,

        model: model.trim(),

        variant: variant?.trim() || null,

        outlet: outlet.trim(),

        serviceType: serviceType.trim(),

        date: date?.trim() || null,

        campaign: campaign?.trim() || null,

        notes: notes?.trim() || null,

        type: "service_booking",

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

      // Service-specific information is stored in Notes
      // because the master sheet does not have separate
      // Service Type / Service Date columns.

      let serviceNotes =
        `Service Type: ${serviceType.trim()}`;

      if (date?.trim()) {
        serviceNotes += ` | Preferred Service Date: ${date.trim()}`;
      }

      if (notes?.trim()) {
        serviceNotes += ` | ${notes.trim()}`;
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
            "service_booking",

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
            "pending",

            // N - Assigned To
            "",

            // O - Follow-up Date
            "",

            // P - Notes
            serviceNotes,
          ],
        ]
      );

      console.log(
        "[/api/contact/service] Google Sheets entry added successfully:",
        docRef.id
      );
    } catch (sheetErr) {
      // Firebase data is already saved.
      // Do not fail the service booking if Google Sheets fails.

      console.error(
        "[/api/contact/service] Google Sheets error:",
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

        message: "Service booking submitted successfully.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(
      "[/api/contact/service] Error:",
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
    endpoint: "POST /api/contact/service",
  });
}