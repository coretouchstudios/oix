import jwt from "jsonwebtoken";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/mail";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

const SECRET = process.env.JWT_SECRET!;

/* =========================
   ✨ MAGIC LINK REQUEST
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

    /* =========================
       👤 UPSERT USER
    ========================= */
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    /* =========================
       🔐 GENERATE MAGIC TOKEN
    ========================= */
    const rawToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    const expires = new Date(Date.now() + 1000 * 60 * 15); // 15 min

    /* =========================
       💾 STORE TOKEN (SECURE)
    ========================= */
    await prisma.magicToken.create({
      data: {
        userId: user.id,
        token: hashedToken,
        expires,
      },
    });

    /* =========================
       🔗 CREATE MAGIC LINK
    ========================= */
    const link = `${process.env.APP_URL}/api/auth/magic/verify?token=${rawToken}`;

    /* =========================
       📩 SEND EMAIL
    ========================= */
    await sendVerificationEmail(
      email,
      link,
      "magic-login"
    );

    /* =========================
       🛡️ SAFE RESPONSE
    ========================= */
    return Response.json({
      success: true,
      message: "If the email exists, a login link was sent.",
    });

  } catch (e) {
    console.error("Magic link error:", e);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}