import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const email = payload?.email;

    if (!email) {
      return Response.json({ error: "Invalid Google user" }, { status: 400 });
    }

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          emailVerified: new Date(),
        },
      });
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      SECRET,
      { expiresIn: "15m" }
    );

    const res = Response.json({ success: true });

    res.headers.append(
      "Set-Cookie",
      `accessToken=${accessToken}; HttpOnly; Path=/; Max-Age=900; SameSite=Strict`
    );

    return res;
  } catch (e) {
    return Response.json({ error: "Google auth failed" }, { status: 500 });
  }
}