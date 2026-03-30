import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const refreshToken = cookie
      .split("; ")
      .find((c) => c.startsWith("refreshToken="))
      ?.split("=")[1];

    if (!refreshToken) {
      return Response.json({ error: "No refresh token" }, { status: 401 });
    }

    const hashed = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await prisma.session.findFirst({
      where: { refreshToken: hashed },
    });

    if (!session) {
      return Response.json({ error: "Invalid session" }, { status: 401 });
    }

    /* 🔁 ROTATE TOKEN */
    const newRefresh = crypto.randomBytes(64).toString("hex");

    const newHashed = crypto
      .createHash("sha256")
      .update(newRefresh)
      .digest("hex");

    await prisma.session.update({
      where: { id: session.id },
      data: { refreshToken: newHashed },
    });

    const newAccess = jwt.sign(
      { userId: session.userId },
      SECRET,
      { expiresIn: "15m" }
    );

    const res = Response.json({ success: true });

    res.headers.append(
      "Set-Cookie",
      `accessToken=${newAccess}; HttpOnly; Path=/; Max-Age=900; SameSite=Strict`
    );

    res.headers.append(
      "Set-Cookie",
      `refreshToken=${newRefresh}; HttpOnly; Path=/; Max-Age=2592000; SameSite=Strict`
    );

    return res;

  } catch (e) {
    console.error("Refresh error:", e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}