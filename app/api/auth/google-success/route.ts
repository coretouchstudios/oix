import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

const SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // 🔥 CREATE JWT
    const token = jwt.sign(
      { userId: user.id },
      SECRET,
      { expiresIn: "15m" }
    );

    // ✅ USE NextResponse (NOT Response)
    const res = NextResponse.redirect(new URL("/dashboard", req.url));

    // ✅ SET COOKIE PROPERLY
    res.cookies.set("accessToken", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 15,
      sameSite: "lax",
    });

    return res;

  } catch (err) {
    console.error("Google success error:", err);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
export const runtime = "nodejs";