import { runSandbox } from "@/lib/docker";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { files, projectId } = await req.json();

  try {
    const { url, containerName } = await runSandbox(projectId, files);

    return Response.json({
      url,
      containerName,
    });
  } catch (err) {
    return Response.json({
      error: "Sandbox failed",
      details: String(err),
    });
  }
}