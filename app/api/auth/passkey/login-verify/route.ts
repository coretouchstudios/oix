import { verifyLogin } from "@/lib/passkeys";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  const { response, challenge } = await req.json();

  const verification = await verifyLogin(response, challenge);

  if (!verification.verified) {
    return Response.json({ error: "Login failed" }, { status: 401 });
  }

  const credentialID = Buffer.from(
    verification.credentialID
  ).toString("base64");

  const passkey = await prisma.passkey.findUnique({
    where: { credentialID },
  });

  if (!passkey) {
    return Response.json({ error: "No passkey" }, { status: 404 });
  }

  const token = jwt.sign(
    { userId: passkey.userId },
    SECRET,
    { expiresIn: "7d" }
  );

  return Response.json({ success: true, token });
}