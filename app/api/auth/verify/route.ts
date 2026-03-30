import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return Response.json({ error: "Invalid token" }, { status: 400 });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await prisma.user.findFirst({
      where: {
        verifyToken: hashedToken,
        verifyExpires: { gt: new Date() },
      },
    });

    if (!user) {
      return Response.json(
        { error: "Token expired or invalid" },
        { status: 400 }
      );
    }

    /* ✅ MARK VERIFIED */
    await prisma.user.update({
      where: { id: user.id },
      data: {
        verifyToken: null,
        verifyExpires: null,
        emailVerified: new Date(),
      },
    });

    /* =========================
       🔐 ISSUE TOKENS (AUTO LOGIN)
    ========================= */
    const accessToken = jwt.sign(
      { userId: user.id },
      SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = crypto.randomBytes(64).toString("hex");

    const hashedRefresh = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken: hashedRefresh,
      },
    });

    /* =========================
       🍪 SET COOKIES
    ========================= */
    const res = Response.redirect(
      new URL("/dashboard", req.url)
    );

    res.headers.append(
      "Set-Cookie",
      `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=900; SameSite=Strict`
    );

    res.headers.append(
      "Set-Cookie",
      `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict`
    );

    return res;

  } catch (e) {
    console.error("Verify error:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}