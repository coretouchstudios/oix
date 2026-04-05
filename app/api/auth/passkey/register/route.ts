import { getRegisterOptions } from "@/lib/passkeys";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId } = await req.json();

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  const options = getRegisterOptions(user);

  return Response.json(options);
}