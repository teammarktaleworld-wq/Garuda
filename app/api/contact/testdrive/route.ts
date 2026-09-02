
// garud-tata/app/api/contact/testdrive/route.ts

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

interface TestDriveBody {
  name: string;
  email?: string;
  mobile: string;
  model: string;
  outlet: string;
  date?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: TestDriveBody = await req.json();

    const {
      name,
      email,
      mobile,
      model,
      outlet,
      date,
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

    const cleanMobile =
      mobile?.replace(/\D/g, "");

    if (
      !cleanMobile ||
      cleanMobile.length < 10
    ) {
      return NextResponse.json(
        {
          error:
            "Valid 10-digit mobile number is required.",
        },
        { status: 400 }
      );
    }

    if (!model || !model.trim()) {
      return NextResponse.json(
        {
          error: "Car model is required.",
        },
        { status: 400 }
      );
    }

    if (!outlet || !outlet.trim()) {
      return NextResponse.json(
        {
          error: "Outlet selection is required.",
        },
        { status: 400 }
      );
    }

    // ─────────────────────────────────────────────
    // SAVE TO FIREBASE
    // ─────────────────────────────────────────────

    const docRef = await addDoc(
      collection(db, "test_drive_enquiries"),
      {
        name: name.trim(),

        email:
          email?.trim() || null,

        mobile: cleanMobile,

        model: model.trim(),

        outlet: outlet.trim(),

        date:
          date?.trim() || null,

        type: "test_drive",

        status: "new",

        source: "website",

        createdAt: serverTimestamp(),

        updatedAt: serverTimestamp(),
      }
    );

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
  } catch (error) {
    console.error(
      "[/api/contact/testdrive] Error:",
      error
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
// HEALTH CHECK
// ─────────────────────────────────────────────

export async function GET() {
  return NextResponse.json({
    ok: true,
    endpoint: "POST /api/contact/testdrive",
  });
}

