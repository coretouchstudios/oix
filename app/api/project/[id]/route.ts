import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

/* =========================
   📦 GET PROJECT DETAIL
========================= */
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const projectId = params.id;

    if (!projectId) {
      return Response.json(
        { error: "Project ID required" },
        { status: 400 }
      );
    }

    /* =========================
       🧠 FETCH PROJECT
    ========================= */
    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: {
        deployments: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!project) {
      return Response.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    /* =========================
       🔄 FORMAT RESPONSE
    ========================= */
    return Response.json({
      project: {
        id: project.id,
        name: project.name,
        repo: project.repo,
        createdAt: project.createdAt,
        deployments: project.deployments.map((d) => ({
          id: d.id,
          status: d.status,
          url: d.url,
          createdAt: d.createdAt,
        })),
      },
    });
  } catch (e: any) {
    console.error("Project fetch error:", e);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}