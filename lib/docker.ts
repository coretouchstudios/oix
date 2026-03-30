import { exec } from "child_process";
import path from "path";
import fs from "fs/promises";

let containerCount = 0;

export async function runSandbox(projectId: string, files: any[]) {
  const sandboxPath = path.join(process.cwd(), "sandbox", projectId);

  // -------------------------
  // CREATE FILE SYSTEM
  // -------------------------
  await fs.rm(sandboxPath, { recursive: true, force: true });
  await fs.mkdir(sandboxPath, { recursive: true });

  for (const file of files) {
    const filePath = path.join(sandboxPath, file.name);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, file.content);
  }

  const port = 4000 + containerCount++;

  const containerName = `sandbox-${projectId}-${Date.now()}`;

  // -------------------------
  // BUILD IMAGE
  // -------------------------
  await execPromise(`
    docker build -t sandbox-image ${sandboxPath}
  `);

  // -------------------------
  // RUN CONTAINER
  // -------------------------
  await execPromise(`
    docker run -d \
      -p ${port}:3000 \
      --name ${containerName} \
      --memory="512m" \
      --cpus="0.5" \
      --network=none \
      sandbox-image
  `);

  return {
    url: `http://localhost:${port}`,
    containerName,
  };
}

export async function stopSandbox(containerName: string) {
  await execPromise(`docker stop ${containerName}`);
  await execPromise(`docker rm ${containerName}`);
}

function execPromise(cmd: string) {
  return new Promise((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      if (err) return reject(stderr);
      resolve(stdout);
    });
  });
}