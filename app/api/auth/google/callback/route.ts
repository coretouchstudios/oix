import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenRes.json();

  const userRes = await fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    }
  );

  const googleUser = await userRes.json();

  let user = await prisma.user.findUnique({
    where: { email: googleUser.email },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: googleUser.email,
        emailVerified: new Date(),
      },
    });
  }

  const jwtToken = jwt.sign({ userId: user.id }, SECRET, {
    expiresIn: "15m",
  });

  const res = Response.redirect(new URL("/dashboard", req.url));

  res.headers.append(
    "Set-Cookie",
    `accessToken=${jwtToken}; HttpOnly; Path=/; Max-Age=900`
  );

  return res;
}