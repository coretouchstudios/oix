export const runtime = "nodejs";

import { exec } from "child_process";
import { promisify } from "util";

const run = promisify(exec);

export async function POST(req: Request) {
  const { cmd } = await req.json();

  try {
    const { stdout, stderr } = await run(cmd);
    return Response.json({ output: stdout || stderr });
  } catch (err: any) {
    return Response.json({ output: err.message });
  }
}