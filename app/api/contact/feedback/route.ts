// // app/api/contact/feedback/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/firebase";
// import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// interface FeedbackBody {
//   name: string;
//   email?: string;
//   mobile: string;
//   outlet: string;
//   rating: number;
//   feedback: string;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body: FeedbackBody = await req.json();
//     const { name, email, mobile, outlet, rating, feedback } = body;

//     if (!name || name.trim().length < 2)
//       return NextResponse.json({ error: "Valid name is required." }, { status: 400 });

//     const cleanMobile = mobile?.replace(/\D/g, "");
//     if (!cleanMobile || cleanMobile.length < 10)
//       return NextResponse.json({ error: "Valid 10-digit mobile number is required." }, { status: 400 });

//     if (!outlet?.trim())
//       return NextResponse.json({ error: "Outlet selection is required." }, { status: 400 });

//     const ratingNum = Number(rating);
//     if (!ratingNum || ratingNum < 1 || ratingNum > 5)
//       return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });

//     if (!feedback || feedback.trim().length < 5)
//       return NextResponse.json({ error: "Please enter your feedback (at least 5 characters)." }, { status: 400 });

//     const docRef = await addDoc(collection(db, "feedback"), {
//       name:      name.trim(),
//       email:     email?.trim() || null,
//       mobile:    cleanMobile,
//       outlet:    outlet.trim(),
//       rating:    ratingNum,
//       feedback:  feedback.trim(),
//       type:      "customer_feedback",
//       status:    "new",
//       source:    "website",
//       createdAt: serverTimestamp(),
//       updatedAt: serverTimestamp(),
//     });

//     return NextResponse.json(
//       { success: true, id: docRef.id, message: "Feedback submitted successfully." },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("[/api/contact/feedback] Error:", err);
//     return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
//   }
// }

// export async function GET() {
//   return NextResponse.json({ ok: true, endpoint: "POST /api/contact/feedback" });
// }
















// app/api/contact/feedback/route.ts

import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/firebase";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { appendToSheet } from "@/lib/googleSheets";

interface FeedbackBody {
  name: string;
  email?: string;
  mobile: string;
  outlet: string;
  rating: number;
  feedback: string;
  campaign?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: FeedbackBody = await req.json();

    const {
      name,
      email,
      mobile,
      outlet,
      rating,
      feedback,
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

    const ratingNum = Number(rating);

    if (
      !ratingNum ||
      ratingNum < 1 ||
      ratingNum > 5
    ) {
      return NextResponse.json(
        {
          error: "Rating must be between 1 and 5.",
        },
        { status: 400 }
      );
    }

    if (!feedback || feedback.trim().length < 5) {
      return NextResponse.json(
        {
          error:
            "Please enter your feedback (at least 5 characters).",
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
      collection(db, "feedback"),
      {
        name: name.trim(),

        email: email?.trim() || null,

        mobile: cleanMobile,

        outlet: outlet.trim(),

        rating: ratingNum,

        feedback: feedback.trim(),

        campaign: campaign?.trim() || null,

        type: "customer_feedback",

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

      // Store both rating and feedback in Notes
      // because the master sheet does not have
      // separate Rating / Feedback columns.

      const feedbackNotes =
        `Rating: ${ratingNum}/5 | Feedback: ${feedback.trim()}`;

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
            "customer_feedback",

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
            "new",

            // N - Assigned To
            "",

            // O - Follow-up Date
            "",

            // P - Notes
            feedbackNotes,
          ],
        ]
      );

      console.log(
        "[/api/contact/feedback] Google Sheets entry added successfully:",
        docRef.id
      );
    } catch (sheetErr) {
      // Firebase data is already saved.
      // Do not fail the feedback submission
      // if Google Sheets fails.

      console.error(
        "[/api/contact/feedback] Google Sheets error:",
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

        message: "Feedback submitted successfully.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error(
      "[/api/contact/feedback] Error:",
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
    endpoint: "POST /api/contact/feedback",
  });
}