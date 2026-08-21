// app/api/contact/service/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface ServiceBody {
  name: string;
  email?: string;
  mobile: string;
  model: string;
  outlet: string;
  serviceType: string;
  date?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ServiceBody = await req.json();
    const { name, email, mobile, model, outlet, serviceType, date } = body;

    if (!name || name.trim().length < 2)
      return NextResponse.json({ error: "Valid name is required." }, { status: 400 });

    const cleanMobile = mobile?.replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length < 10)
      return NextResponse.json({ error: "Valid 10-digit mobile number is required." }, { status: 400 });

    if (!model?.trim())
      return NextResponse.json({ error: "Car model is required." }, { status: 400 });

    if (!outlet?.trim())
      return NextResponse.json({ error: "Outlet selection is required." }, { status: 400 });

    if (!serviceType?.trim())
      return NextResponse.json({ error: "Service type is required." }, { status: 400 });

    // Validate date is not in the past if provided
    if (date) {
      const requested = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (requested < today)
        return NextResponse.json({ error: "Preferred date cannot be in the past." }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "service_bookings"), {
      name:        name.trim(),
      email:       email?.trim() || null,
      mobile:      cleanMobile,
      model:       model.trim(),
      outlet:      outlet.trim(),
      serviceType: serviceType.trim(),
      date:        date || null,
      type:        "service_booking",
      status:      "pending",   // pending → confirmed → completed
      source:      "website",
      createdAt:   serverTimestamp(),
      updatedAt:   serverTimestamp(),
    });

    return NextResponse.json(
      { success: true, id: docRef.id, message: "Service booking submitted successfully." },
      { status: 201 }
    );
  } catch (err) {
    console.error("[/api/contact/service] Error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "POST /api/contact/service" });
}