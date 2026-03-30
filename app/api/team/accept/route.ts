import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { token, userId } = await req.json();

    if (!token || !userId) {
      return Response.json({ error: "Missing data" }, { status: 400 });
    }

    /* 🔍 VERIFY TOKEN */
    let decoded: any;

    try {
      decoded = jwt.verify(token, SECRET);
    } catch {
      return Response.json(
        { error: "Invalid or expired invite" },
        { status: 400 }
      );
    }

    /* 👥 CREATE MEMBERSHIP */
    await prisma.membership.create({
      data: {
        userId,
        projectId: decoded.projectId,
        role: "member",
      },
    });

    return Response.json({ success: true });

  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}