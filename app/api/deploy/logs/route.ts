import { prisma } from "@/lib/prisma";
import { deploy } from "@/worker/deploy";

export const runtime = "nodejs";

/* =========================
   🚀 DEPLOY API
========================= */
export async function POST(req: Request) {
  try {
    const { projectId } = await req.json();

    if (!projectId) {
      return Response.json(
        { error: "Missing projectId" },
        { status: 400 }
      );
    }

    /* =========================
       🧠 GET PROJECT
    ========================= */
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return Response.json(
        { error: "Project not found" },
        { status: 404 }
      );
    }

    /* =========================
       📦 CREATE DEPLOYMENT
    ========================= */
    const deployment = await prisma.deployment.create({
      data: {
        projectId: project.id,
        status: "building",
      },
    });

    try {
      /* =========================
         🚀 RUN WORKER
      ========================= */
      const result = await deploy({
        id: project.id,
        repo: project.repo!,
      });

      if (!result.success) {
        throw new Error(result.error || "Deploy failed");
      }

      /* =========================
         ✅ UPDATE SUCCESS
      ========================= */
      await prisma.deployment.update({
        where: { id: deployment.id },
        data: {
          status: "live",
          url: result.url,
          containerId: result.containerId,
        },
      });

      return Response.json({
        success: true,
        deploymentId: deployment.id,
        url: result.url,
      });
    } catch (err: any) {
      /* =========================
         ❌ UPDATE ERROR
      ========================= */
      await prisma.deployment.update({
        where: { id: deployment.id },
        data: {
          status: "error",
        },
      });

      return Response.json(
        {
          error: err.message || "Deployment failed",
        },
        { status: 500 }
      );
    }
  } catch (e: any) {
    console.error("Deploy API error:", e);

    return Response.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}