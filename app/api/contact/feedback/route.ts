// app/api/contact/feedback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface FeedbackBody {
  name: string;
  email?: string;
  mobile: string;
  outlet: string;
  rating: number;
  feedback: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: FeedbackBody = await req.json();
    const { name, email, mobile, outlet, rating, feedback } = body;

    if (!name || name.trim().length < 2)
      return NextResponse.json({ error: "Valid name is required." }, { status: 400 });

    const cleanMobile = mobile?.replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length < 10)
      return NextResponse.json({ error: "Valid 10-digit mobile number is required." }, { status: 400 });

    if (!outlet?.trim())
      return NextResponse.json({ error: "Outlet selection is required." }, { status: 400 });

    const ratingNum = Number(rating);
    if (!ratingNum || ratingNum < 1 || ratingNum > 5)
      return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });

    if (!feedback || feedback.trim().length < 5)
      return NextResponse.json({ error: "Please enter your feedback (at least 5 characters)." }, { status: 400 });

    const docRef = await addDoc(collection(db, "feedback"), {
      name:      name.trim(),
      email:     email?.trim() || null,
      mobile:    cleanMobile,
      outlet:    outlet.trim(),
      rating:    ratingNum,
      feedback:  feedback.trim(),
      type:      "customer_feedback",
      status:    "new",
      source:    "website",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json(
      { success: true, id: docRef.id, message: "Feedback submitted successfully." },
      { status: 201 }
    );
  } catch (err) {
    console.error("[/api/contact/feedback] Error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "POST /api/contact/feedback" });
}