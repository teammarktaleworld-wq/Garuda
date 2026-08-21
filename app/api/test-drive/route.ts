// app/api/test-drive/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface TestDriveBody {
  name: string;
  mobile: string;
  car: string;
  showroom: string;
  date: string;       // ISO date string "YYYY-MM-DD"
  slot: string;       // e.g. "10:00 AM"
}

export async function POST(req: NextRequest) {
  try {
    const body: TestDriveBody = await req.json();
    const { name, mobile, car, showroom, date, slot } = body;

    /* ── Validation ── */
    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Valid name is required." },
        { status: 400 }
      );
    }

    const cleanMobile = mobile?.replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length < 10) {
      return NextResponse.json(
        { error: "Valid 10-digit mobile number is required." },
        { status: 400 }
      );
    }

    if (!car || car.trim().length === 0) {
      return NextResponse.json(
        { error: "Car model is required." },
        { status: 400 }
      );
    }

    if (!showroom || showroom.trim().length === 0) {
      return NextResponse.json(
        { error: "Showroom selection is required." },
        { status: 400 }
      );
    }

    if (!date) {
      return NextResponse.json(
        { error: "Preferred date is required." },
        { status: 400 }
      );
    }

    // Ensure date is not in the past
    const requested = new Date(date);
    const today     = new Date();
    today.setHours(0, 0, 0, 0);
    if (requested < today) {
      return NextResponse.json(
        { error: "Preferred date cannot be in the past." },
        { status: 400 }
      );
    }

    if (!slot || slot.trim().length === 0) {
      return NextResponse.json(
        { error: "Time slot is required." },
        { status: 400 }
      );
    }

    /* ── Firestore write ── */
    const docRef = await addDoc(collection(db, "test_drives"), {
      name:      name.trim(),
      mobile:    cleanMobile,
      car:       car.trim(),
      showroom:  showroom.trim(),
      date:      date,           // store as-is for easy display/sorting
      slot:      slot.trim(),
      status:    "pending",      // pending → confirmed → completed
      source:    "website",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json(
      {
        success: true,
        id:      docRef.id,
        message: "Test drive request submitted successfully.",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("[/api/test-drive] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "POST /api/test-drive" });
}