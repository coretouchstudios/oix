import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

/* =========================
   📧 EMAIL VALIDATION
========================= */
function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* =========================
   🌍 GET IP
========================= */
function getIP(req: Request) {
  return (
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

/* =========================
   🔐 EMAIL ENTRY / LOOKUP
========================= */
export async function POST(req: Request) {
  try {
    const ip = getIP(req);

    /* =========================
       🚫 RATE LIMIT
    ========================= */
    if (!rateLimit(ip, 20)) {
      return NextResponse.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const { email } = await req.json();

    /* =========================
       🧾 VALIDATION
    ========================= */
    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!isValidEmail(normalizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email" },
        { status: 400 }
      );
    }

    /* =========================
       👤 FIND USER
    ========================= */
    let user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    /* =========================
       🧠 SAFE AUTO-CREATE
    ========================= */
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: normalizedEmail,
          verified: false,
        },
      });
    }

    /* =========================
       🚀 RESPONSE (SAFE)
    ========================= */
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        verified: !!user.verified,
      },
    });

  } catch (e) {
    console.error("Auth route error:", e);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}