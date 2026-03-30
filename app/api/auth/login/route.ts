import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { rateLimit } from "@/lib/rateLimit";
import { cookies } from "next/headers";

export const runtime = "nodejs";

const SECRET = process.env.JWT_SECRET!;

/* =========================
   🔐 LOGIN ROUTE (FINAL FIXED)
========================= */
export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const userAgent = req.headers.get("user-agent") || "unknown";

    /* =========================
       🚫 RATE LIMIT
    ========================= */
    if (!rateLimit(ip)) {
      return Response.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const { email, password } = await req.json();

    /* =========================
       🧾 VALIDATION
    ========================= */
    if (!email || !password) {
      return Response.json(
        { error: "Email and password required" },
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

    if (!user || !user.password) {
      return Response.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    /* =========================
       🔑 VERIFY PASSWORD
    ========================= */
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return Response.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    /* =========================
       📧 EMAIL VERIFIED CHECK
    ========================= */
    if (!user.verified) {
      return Response.json(
        { error: "Please verify your email first" },
        { status: 403 }
      );
    }

    /* =========================
       ⚠️ SUSPICIOUS LOGIN CHECK
    ========================= */
    const existingSession = await prisma.session.findFirst({
      where: { userId: user.id },
    });

    const suspicious =
      existingSession &&
      existingSession.ip !== ip &&
      existingSession.userAgent !== userAgent;

    if (suspicious) {
      return Response.json(
        {
          error: "New device detected. Please verify via email.",
        },
        { status: 403 }
      );
    }

    /* =========================
       🎟️ ACCESS TOKEN (SHORT)
    ========================= */
    const accessToken = jwt.sign(
      { userId: user.id },
      SECRET,
      { expiresIn: "15m" }
    );

    /* =========================
       🔁 REFRESH TOKEN (HASHED)
    ========================= */
    const rawRefresh = crypto.randomBytes(64).toString("hex");

    const hashedRefresh = crypto
      .createHash("sha256")
      .update(rawRefresh)
      .digest("hex");

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: hashedRefresh,
        ip,
        userAgent,
      },
    });

    /* =========================
       🍪 SET COOKIES (FIXED)
    ========================= */
    const isProd = process.env.NODE_ENV === "production";

    cookies().set("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 15,
      sameSite: "strict",
      secure: isProd,
    });

    cookies().set("refreshToken", rawRefresh, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "strict",
      secure: isProd,
    });

    /* =========================
       ✅ RESPONSE
    ========================= */
    return Response.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    });

  } catch (e) {
    console.error("Login error:", e);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}