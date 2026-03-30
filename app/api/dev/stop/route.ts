import { stopSandbox } from "@/lib/docker";

export async function POST(req: Request) {
  const { containerName } = await req.json();

  await stopSandbox(containerName);

  return Response.json({ ok: true });
}