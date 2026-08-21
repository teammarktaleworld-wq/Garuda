// app/api/contact/complaint/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface ComplaintBody {
  name: string;
  email?: string;
  mobile: string;
  outlet: string;
  query: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: ComplaintBody = await req.json();
    const { name, email, mobile, outlet, query } = body;

    if (!name || name.trim().length < 2)
      return NextResponse.json({ error: "Valid name is required." }, { status: 400 });

    const cleanMobile = mobile?.replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length < 10)
      return NextResponse.json({ error: "Valid 10-digit mobile number is required." }, { status: 400 });

    if (!outlet?.trim())
      return NextResponse.json({ error: "Outlet selection is required." }, { status: 400 });

    if (!query || query.trim().length < 10)
      return NextResponse.json({ error: "Please describe your query (at least 10 characters)." }, { status: 400 });

    const docRef = await addDoc(collection(db, "complaints"), {
      name:      name.trim(),
      email:     email?.trim() || null,
      mobile:    cleanMobile,
      outlet:    outlet.trim(),
      query:     query.trim(),
      type:      "complaint_query",
      status:    "open",        // open → in_progress → resolved
      priority:  "normal",
      source:    "website",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json(
      { success: true, id: docRef.id, message: "Complaint / query submitted successfully." },
      { status: 201 }
    );
  } catch (err) {
    console.error("[/api/contact/complaint] Error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "POST /api/contact/complaint" });
}