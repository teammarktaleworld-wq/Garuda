import { NextRequest, NextResponse } from "next/server";
import { initializeApp, getApps, getApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

// ── Firebase Admin (server-side) init ─────────────────────────────────────────
// Uses service account env vars. In Vercel / your server, set:
//   FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
function getAdminDb() {
  const app =
    getApps().length === 0
      ? initializeApp({
          credential: cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            // Vercel stores newlines as \n in env vars — replace them back
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
          }),
        })
      : getApp();
  return getFirestore(app);
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface EnquiryBody {
  name: string;
  mobile: string;
  car?: string;
  source?: string; // e.g. "hero-form" | "offer-section" | "chatbot"
}

// ── POST /api/enquiry ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body: EnquiryBody = await req.json();

    // ── Validate ────────────────────────────────────────────────────────────
    const { name, mobile, car, source } = body;

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json({ error: "Valid name is required." }, { status: 400 });
    }

    const cleanMobile = mobile?.replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length < 10) {
      return NextResponse.json({ error: "Valid 10-digit mobile number is required." }, { status: 400 });
    }

    // ── Write to Firestore ──────────────────────────────────────────────────
    const db = getAdminDb();

    const docRef = await db.collection("enquiries").add({
      name: name.trim(),
      mobile: cleanMobile,
      car: car?.trim() || null,
      source: source?.trim() || "website",
      status: "new",         // new | contacted | converted | closed
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    });

    return NextResponse.json(
      { success: true, id: docRef.id, message: "Enquiry submitted successfully." },
      { status: 201 }
    );
  } catch (err) {
    console.error("[/api/enquiry] Error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// ── GET /api/enquiry — health check (remove or protect in production) ─────────
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "POST /api/enquiry" });
}