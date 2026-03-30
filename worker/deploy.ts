import { exec } from "child_process";
import util from "util";
import fs from "fs/promises";
import path from "path";

const run = util.promisify(exec);

/* =========================
   📁 CONFIG
========================= */
const PROJECTS_DIR =
  process.env.PROJECTS_DIR ||
  path.join(process.cwd(), "projects");

/* =========================
   🔒 SAFE COMMAND EXEC
========================= */
async function safeRun(cmd: string, cwd?: string) {
  try {
    const { stdout, stderr } = await run(cmd, { cwd });
    return stdout + stderr;
  } catch (err: any) {
    return (err.stdout || "") + (err.stderr || "");
  }
}

/* =========================
   🔢 RANDOM PORT
========================= */
function getPort() {
  return Math.floor(3000 + Math.random() * 2000);
}

/* =========================
   🚀 DEPLOY FUNCTION
========================= */
export async function deploy(project: {
  id: string;
  repo: string;
}) {
  const projectPath = path.join(PROJECTS_DIR, project.id);

  // 🔥 stable + unique container name
  const containerName = `app_${project.id}`;
  const port = getPort();

  try {
    /* =========================
       📁 ENSURE ROOT DIR EXISTS
    ========================= */
    await fs.mkdir(PROJECTS_DIR, { recursive: true });

    /* =========================
       🧹 CLEAN OLD PROJECT FILES
    ========================= */
    await fs.rm(projectPath, { recursive: true, force: true });

    /* =========================
       🧹 STOP + REMOVE OLD CONTAINER
    ========================= */
    await safeRun(`docker rm -f ${containerName}`);

    /* =========================
       📥 CLONE REPO
    ========================= */
    const cloneLogs = await safeRun(
      `git clone ${project.repo} ${project.id}`,
      PROJECTS_DIR
    );

    /* =========================
       🐳 BUILD IMAGE
    ========================= */
    const buildLogs = await safeRun(
      `docker build -t ${containerName} .`,
      projectPath
    );

    /* =========================
       ▶️ RUN CONTAINER
    ========================= */
    const runOutput = await safeRun(
      `docker run -d -p ${port}:3000 --name ${containerName} ${containerName}`,
      projectPath
    );

    // 🔥 THIS IS CRITICAL (used for logs streaming)
    const containerId = runOutput.trim();

    /* =========================
       🌍 RESULT
    ========================= */
    const url = `http://localhost:${port}`;

    console.log("🚀 DEPLOY SUCCESS");
    console.log("Project:", project.id);
    console.log("Container:", containerId);
    console.log("URL:", url);

    return {
      success: true,
      url,
      port,
      containerId, // 🔥 REQUIRED FOR SSE LOGS
      logs: {
        clone: cloneLogs,
        build: buildLogs,
      },
    };
  } catch (e: any) {
    console.error("❌ DEPLOY FAILED:", e);

    return {
      success: false,
      error: e.message,
    };
  }
}