import { PrismaClient } from "@prisma/client";

import { prisma } from "@/lib/prisma";

/* --------------------------
   ✏️ UPDATE MEMORY
-------------------------- */
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { input, output } = await req.json();

  const updated = await prisma.memory.update({
    where: { id: params.id },
    data: {
      input,
      output,
    },
  });

  return Response.json(updated);
}

/* --------------------------
   🗑️ DELETE MEMORY
-------------------------- */
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.memory.delete({
    where: { id: params.id },
  });

  return Response.json({ success: true });
}
const { input, output, importance } = await req.json();

const updated = await prisma.memory.update({
  where: { id: params.id },
  data: {
    ...(input && { input }),
    ...(output && { output }),
    ...(importance !== undefined && { importance }),
  },
});