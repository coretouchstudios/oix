import { writeFile, readFile, listFiles } from "@/lib/fs";

export const runtime = "nodejs";

/* =========================
   📂 LIST FILES
========================= */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const projectId = searchParams.get("projectId");

  if (!projectId) {
    return Response.json({ error: "projectId required" }, { status: 400 });
  }

  const files = listFiles(projectId);

  return Response.json(files);
}

/* =========================
   💾 SAVE FILE
========================= */
export async function POST(req: Request) {
  const { projectId, path, content } = await req.json();

  if (!projectId || !path) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }

  writeFile(projectId, path, content || "");

  return Response.json({ success: true });
}

/* =========================
   📖 READ FILE
========================= */
export async function PUT(req: Request) {
  const { projectId, path } = await req.json();

  const content = readFile(projectId, path);

  return Response.json({ content });
}