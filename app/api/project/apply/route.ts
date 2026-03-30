import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { patches } = await req.json();

  for (const patch of patches) {
    if (patch.type === "file") {
      await prisma.file.upsert({
        where: { name: patch.name },
        update: { content: patch.content },
        create: {
          name: patch.name,
          content: patch.content,
          projectId: "default",
        },
      });
    }

    // NOTE: DIFF patching can be added later with a diff parser lib
  }

  return Response.json({ success: true });
}