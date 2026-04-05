import { verifyRegister } from "@/lib/passkeys";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId, response, challenge } = await req.json();

  const verification = await verifyRegister(response, challenge);

  if (!verification.verified) {
    return Response.json({ error: "Verification failed" }, { status: 400 });
  }

  const { credentialPublicKey, credentialID, counter } =
    verification.registrationInfo!;

  await prisma.passkey.create({
    data: {
      userId,
      credentialID: Buffer.from(credentialID).toString("base64"),
      publicKey: Buffer.from(credentialPublicKey).toString("base64"),
      counter,
    },
  });

  return Response.json({ success: true });
}