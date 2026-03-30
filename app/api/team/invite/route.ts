import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export const runtime = "nodejs";

const SECRET = process.env.JWT_SECRET!;
const APP_URL = process.env.APP_URL!;

export async function POST(req: Request) {
  try {
    const { email, projectId } = await req.json();

    if (!email || !projectId) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    /* 🔐 CREATE INVITE TOKEN */
    const token = jwt.sign(
      { projectId, email },
      SECRET,
      { expiresIn: "1d" }
    );

    const link = `${APP_URL}/invite?token=${token}`;

    /* 📩 SEND EMAIL */
    await sendEmail(
      email,
      "You're invited to a project",
      `<a href="${link}">Accept Invite</a>`
    );

    return Response.json({ success: true });

  } catch (e) {
    console.error(e);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}