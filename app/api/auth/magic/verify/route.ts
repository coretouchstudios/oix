import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return redirect("/login");
  }

  const magic = await prisma.magicToken.findFirst({
    where: {
      token,
      expires: {
        gt: new Date(),
      },
    },
  });

  if (!magic) {
    return redirect("/login");
  }

  const sessionToken = crypto.randomUUID();

  await prisma.session.create({
    data: {
      userId: magic.userId,
      refreshToken: sessionToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
  });

  // ✅ IMPORTANT FIX HERE
  cookies().set("accessToken", sessionToken, {
  httpOnly: true,
  path: "/",
  secure: false,
  sameSite: "lax",
  maxAge: 60 * 60 * 24 * 7, // ✅ ADD THIS
});

  await prisma.magicToken.delete({
    where: { id: magic.id },
  });

  return redirect("/dashboard");
}