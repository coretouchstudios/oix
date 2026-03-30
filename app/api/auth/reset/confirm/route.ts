import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

const SECRET = process.env.JWT_SECRET!;

/* =========================
   🔐 RESET PASSWORD CONFIRM (FINAL)
========================= */
export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    /* =========================
       🚫 RATE LIMIT
    ========================= */
    if (!rateLimit(ip)) {
      return Response.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const { token, password } = await req.json();

    /* =========================
       🧾 VALIDATION
    ========================= */
    if (!token || !password) {
      return Response.json(
        { error: "Token and password required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return Response.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    /* =========================
       🔍 VERIFY TOKEN
    ========================= */
    let decoded: any;

    try {
      decoded = jwt.verify(token, SECRET);
    } catch {
      return Response.json(
        { error: "Invalid or expired token" },
        { status: 400 }
      );
    }

    /* =========================
       👤 FIND USER
    ========================= */
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      return Response.json(
        { error: "Invalid token" }, // avoid leaking info
        { status: 400 }
      );
    }

    /* =========================
       🔒 HASH NEW PASSWORD
    ========================= */
    const hashedPassword = await bcrypt.hash(password, 12);

    /* =========================
       🔁 UPDATE + KILL SESSIONS
    ========================= */
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          password: hashedPassword,
        },
      }),

      // 🔥 CRITICAL: invalidate ALL sessions
      prisma.session.deleteMany({
        where: { userId: user.id },
      }),
    ]);

    /* =========================
       🧹 OPTIONAL: LOG EVENT
    ========================= */
    console.log("Password reset success for user:", user.id);

    /* =========================
       ✅ RESPONSE
    ========================= */
    return Response.json({
      success: true,
      message: "Password reset successful",
    });

  } catch (e: any) {
    console.error("Reset confirm error:", e);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}