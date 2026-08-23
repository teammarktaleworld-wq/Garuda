// // garud-tata\app\api\enquiry\route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { db } from "@/lib/firebase";
// import {
//   collection,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";

// interface EnquiryBody {
//   name: string;
//   mobile: string;
//   car?: string;
//   source?: string;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body: EnquiryBody = await req.json();

//     const { name, mobile, car, source } = body;

//     if (!name || name.trim().length < 2) {
//       return NextResponse.json(
//         { error: "Valid name is required." },
//         { status: 400 }
//       );
//     }

//     const cleanMobile = mobile?.replace(/\D/g, "");

//     if (!cleanMobile || cleanMobile.length < 10) {
//       return NextResponse.json(
//         {
//           error: "Valid 10-digit mobile number is required.",
//         },
//         { status: 400 }
//       );
//     }

//     const docRef = await addDoc(collection(db, "enquiries"), {
//       name: name.trim(),
//       mobile: cleanMobile,
//       car: car?.trim() || null,
//       source: source?.trim() || "website",
//       status: "new",
//       createdAt: serverTimestamp(),
//       updatedAt: serverTimestamp(),
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         id: docRef.id,
//         message: "Enquiry submitted successfully.",
//       },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("[/api/enquiry] Error:", err);

//     return NextResponse.json(
//       {
//         error: "Something went wrong. Please try again.",
//       },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   return NextResponse.json({
//     ok: true,
//     endpoint: "POST /api/enquiry",
//   });
// }










import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface EnquiryBody {
  name: string;
  mobile: string;
  car?: string;
  variant?: string;
  type?: string;
  showroom?: string;
  source?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: EnquiryBody = await req.json();
    const { name, mobile, car, variant, type, showroom, source } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json({ error: "Valid name is required." }, { status: 400 });
    }

    const cleanMobile = mobile?.replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length < 10) {
      return NextResponse.json({ error: "Valid 10-digit mobile number is required." }, { status: 400 });
    }

    const docRef = await addDoc(collection(db, "enquiries"), {
      name:     name.trim(),
      mobile:   cleanMobile,
      car:      car?.trim()      || null,
      variant:  variant?.trim()  || null,
      type:     type?.trim()     || "Get Offer",
      showroom: showroom?.trim() || null,
      source:   source?.trim()   || "website",
      status:   "new",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return NextResponse.json({ success: true, id: docRef.id }, { status: 201 });
  } catch (err) {
    console.error("[/api/enquiry] Error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "POST /api/enquiry" });
}