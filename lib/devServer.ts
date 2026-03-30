import { spawn } from "child_process";

let devProcess: any = null;
let currentPort = 3001;

export function startDevServer(projectPath: string) {
  if (devProcess) {
    devProcess.kill();
  }

  const port = currentPort++;

  devProcess = spawn("npm", ["run", "dev", "--", "-p", port], {
    cwd: projectPath,
    shell: true,
  });

  devProcess.stdout.on("data", (data: any) => {
    console.log("[DEV]", data.toString());
  });

  devProcess.stderr.on("data", (data: any) => {
    console.error("[DEV ERROR]", data.toString());
  });

  return { port };
}

export function stopDevServer() {
  if (devProcess) {
    devProcess.kill();
    devProcess = null;
  }
}