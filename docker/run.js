import { exec } from "child_process";

export function runInDocker(cmd) {
  return new Promise((resolve) => {
    exec(
      `docker run --rm -v ${process.cwd()}:/app -w /app node:20 ${cmd}`,
      (err, stdout, stderr) => {
        resolve(stdout || stderr || err?.message);
      }
    );
  });
}