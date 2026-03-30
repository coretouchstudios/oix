import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

const SECRET = process.env.JWT_SECRET!;

/* =========================
   🍪 SAFE COOKIE PARSER
========================= */
function getCookie(req: Request, name: string) {
  const cookie = req.headers.get("cookie");
  if (!cookie) return null;

  const match = cookie
    .split("; ")
    .find((c) => c.startsWith(name + "="));

  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

/* =========================
   🔐 EXTRACT USER FROM TOKEN
========================= */
async function getUserIdFromRequest(req: Request) {
  const token = getCookie(req, "accessToken");
  if (!token) return null;

  const session = await prisma.session.findFirst({
    where: {
      refreshToken: token,
      expiresAt: {
        gt: new Date(),
      },
    },
  });

  return session?.userId || null;
}

/* =========================
   📱 GET ALL SESSIONS
========================= */
export async function GET(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    /* =========================
       🚫 RATE LIMIT
    ========================= */
    if (!rateLimit(ip, 30)) {
      return Response.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const userId = await getUserIdFromRequest(req);

    if (!userId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const sessions = await prisma.session.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        ip: true,
        userAgent: true,
        createdAt: true,
      },
    });

    return Response.json({ sessions });

  } catch (e) {
    console.error("Session GET error:", e);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

/* =========================
   🗑️ LOGOUT SPECIFIC DEVICE
========================= */
export async function DELETE(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "unknown";

    /* =========================
       🚫 RATE LIMIT
    ========================= */
    if (!rateLimit(ip, 20)) {
      return Response.json(
        { error: "Too many requests" },
        { status: 429 }
      );
    }

    const userId = await getUserIdFromRequest(req);

    if (!userId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { sessionId } = await req.json();

    if (!sessionId) {
      return Response.json(
        { error: "Session ID required" },
        { status: 400 }
      );
    }

    /* =========================
       🔒 VERIFY OWNERSHIP
    ========================= */
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.userId !== userId) {
      return Response.json(
        { error: "Not allowed" },
        { status: 403 }
      );
    }

    /* =========================
       🧠 OPTIONAL: CURRENT DEVICE PROTECTION
    ========================= */
    const currentUA = req.headers.get("user-agent") || "unknown";

    if (
      session.userAgent &&
      session.userAgent !== currentUA
    ) {
      console.warn("Suspicious session delete attempt");
    }

    await prisma.session.delete({
      where: { id: sessionId },
    });

    return Response.json({ success: true });

  } catch (e) {
    console.error("Session DELETE error:", e);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}