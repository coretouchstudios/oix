import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/mail";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

const SECRET = process.env.JWT_SECRET!;
const APP_URL = process.env.APP_URL!;

/* =========================
   🔐 PASSWORD RESET REQUEST
========================= */
export async function POST(req: Request) {
  try {
    /* =========================
       🌍 IP + RATE LIMIT
    ========================= */
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    if (!rateLimit(ip, 5)) {
      return Response.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    /* =========================
       🧾 VALIDATION
    ========================= */
    const { email } = await req.json();

    if (!email) {
      return Response.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    /* =========================
       👤 FIND USER
    ========================= */
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // ✅ SECURITY: never reveal existence
    if (!user) {
      return Response.json({
        success: true,
        message: "If the account exists, a reset link has been sent",
      });
    }

    /* =========================
       🎟️ CREATE RESET TOKEN
    ========================= */
    const token = jwt.sign(
      { userId: user.id },
      SECRET,
      { expiresIn: "15m" }
    );

    const resetLink = `${APP_URL}/reset-password?token=${token}`;

    /* =========================
       📩 SEND EMAIL
    ========================= */
    await sendVerificationEmail(
      normalizedEmail,
      token,
      "reset" // template switch inside mail.ts
    );

    /* =========================
       🧠 AUDIT LOG (OPTIONAL)
    ========================= */
    try {
      await prisma.auditLog.create({
        data: {
          userId: user.id,
          action: "password_reset_requested",
          ip,
        },
      });
    } catch {
      // safe fallback (no crash if table missing)
    }

    /* =========================
       🚀 RESPONSE
    ========================= */
    return Response.json({
      success: true,
      message: "If the account exists, a reset link has been sent",
    });

  } catch (e: any) {
    console.error("Reset request error:", e);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}