import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/mail";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

/* =========================
   🔁 RESEND VERIFICATION
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

    const { email } = await req.json();

    if (!email) {
      return Response.json(
        { error: "Email required" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    /* =========================
       👤 FIND USER (SAFE)
    ========================= */
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    // 🛡️ anti-enumeration: always return success
    if (!user || user.verified) {
      return Response.json({ success: true });
    }

    /* =========================
       🔐 GENERATE NEW TOKEN
    ========================= */
    const rawToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const verifyExpires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

    /* =========================
       💾 UPDATE USER
    ========================= */
    await prisma.user.update({
      where: { id: user.id },
      data: {
        verifyToken: hashedToken,
        verifyExpires,
      },
    });

    /* =========================
       📩 SEND EMAIL (ASYNC)
    ========================= */
    sendVerificationEmail(normalizedEmail, rawToken)
      .catch((err) =>
        console.error("Resend email failed:", err)
      );

    /* =========================
       ✅ SAFE RESPONSE
    ========================= */
    return Response.json({
      success: true,
      message: "If the account exists, a verification email was sent.",
    });

  } catch (e) {
    console.error("Resend error:", e);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}