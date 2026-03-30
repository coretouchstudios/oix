import { PrismaClient } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const sessions = await prisma.session.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(sessions);
}