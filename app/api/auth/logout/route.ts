import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  try {
    const cookies = req.headers.get("cookie") || "";
    const accessToken = cookies
      .split("; ")
      .find((c) => c.startsWith("accessToken="))
      ?.split("=")[1];

    if (accessToken) {
      try {
        const decoded: any = jwt.verify(accessToken, SECRET);

        // 🔥 revoke ALL sessions for user
        await prisma.session.deleteMany({
          where: { userId: decoded.userId },
        });
      } catch {}
    }

    const res = Response.json({ success: true });

    res.headers.append(
      "Set-Cookie",
      "accessToken=; HttpOnly; Path=/; Max-Age=0"
    );

    res.headers.append(
      "Set-Cookie",
      "refreshToken=; HttpOnly; Path=/; Max-Age=0"
    );

    return res;
  } catch {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}