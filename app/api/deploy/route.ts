export const runtime = "nodejs";

import { exec } from "child_process";
import { promisify } from "util";

const run = promisify(exec);

export async function POST(req: Request) {
  const { provider, repoUrl } = await req.json();

  try {
    if (provider === "vercel") {
      const { stdout } = await run(`npx vercel --yes`);
      return Response.json({ success: true, output: stdout });
    }

    if (provider === "docker") {
      await run(`docker build -t oix-app .`);
      const { stdout } = await run(`docker run -d -p 3001:3000 oix-app`);
      return Response.json({ success: true, output: stdout });
    }

    if (provider === "git") {
      await run(`git init`);
      await run(`git add .`);
      await run(`git commit -m "OIX auto deploy"`);
      await run(`git branch -M main`);
      await run(`git remote add origin ${repoUrl}`);
      await run(`git push -u origin main`);

      return Response.json({ success: true });
    }

    return Response.json({ error: "Invalid provider" }, { status: 400 });
  } catch (err: any) {
    return Response.json(
      { error: err.message || "Deploy failed" },
      { status: 500 }
    );
  }
}