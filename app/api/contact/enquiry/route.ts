// app/api/contact/enquiry/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface EnquiryBody {
  name: string;
  email?: string;
  mobile: string;
  model: string;
  outlet: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: EnquiryBody = await req.json();
    const { name, email, mobile, model, outlet } = body;

    if (!name || name.trim().length < 2)
      return NextResponse.json({ error: "Valid name is required." }, { status: 400 });

    const cleanMobile = mobile?.replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length < 10)
      return NextResponse.json({ error: "Valid 10-digit mobile number is required." }, { status: 400 });

    if (!model?.trim())
      return NextResponse.json({ error: "Car model is required." }, { status: 400 });

    if (!outlet?.trim())
      return NextResponse.json({ error: "Outlet selection is required." }, { status: 400 });

    const docRef = await addDoc(collection(db, "contact_enquiries"), {
      name:      name.trim(),
      email:     email?.trim() || null,
      mobile:    cleanMobile,
      model:     model.trim(),
      outlet:    outlet.trim(),
      type:      "car_enquiry",
      status:    "new",
      source:    "website",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json(
      { success: true, id: docRef.id, message: "Car enquiry submitted successfully." },
      { status: 201 }
    );
  } catch (err) {
    console.error("[/api/contact/enquiry] Error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "POST /api/contact/enquiry" });
}