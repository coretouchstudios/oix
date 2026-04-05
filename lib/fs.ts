import fs from "fs";
import path from "path";

const BASE = path.join(process.cwd(), "sandbox");

/* =========================
   📁 GET PROJECT PATH
========================= */
export function getProjectPath(projectId: string) {
  return path.join(BASE, "projects", projectId);
}

/* =========================
   📁 ENSURE PROJECT DIR
========================= */
export function ensureProjectDir(projectId: string) {
  const dir = getProjectPath(projectId);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return dir;
}

/* =========================
   📄 WRITE FILE
========================= */
export function writeFile(
  projectId: string,
  filePath: string,
  content: string
) {
  const base = ensureProjectDir(projectId);

  const fullPath = path.join(base, filePath);

  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content, "utf-8");
}

/* =========================
   📄 READ FILE
========================= */
export function readFile(
  projectId: string,
  filePath: string
) {
  const base = getProjectPath(projectId);
  const fullPath = path.join(base, filePath);

  if (!fs.existsSync(fullPath)) return "";

  return fs.readFileSync(fullPath, "utf-8");
}

/* =========================
   📂 LIST FILES (RECURSIVE)
========================= */
export function listFiles(projectId: string) {
  const base = getProjectPath(projectId);

  function walk(dir: string): any[] {
    if (!fs.existsSync(dir)) return [];

    return fs.readdirSync(dir).flatMap((file) => {
      const full = path.join(dir, file);
      const rel = full.replace(base, "");

      if (fs.statSync(full).isDirectory()) {
        return walk(full);
      }

      return [{ path: rel, name: file }];
    });
  }

  return walk(base);
}