import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ROOT = path.join(process.cwd(), "sandbox");

export async function GET() {
  function readDir(dir: string): any[] {
    return fs.readdirSync(dir).map((name) => {
      const full = path.join(dir, name);
      const stat = fs.statSync(full);

      if (stat.isDirectory()) {
        return {
          name,
          type: "folder",
          children: readDir(full),
        };
      }

      return {
        name,
        type: "file",
      };
    });
  }

  if (!fs.existsSync(ROOT)) fs.mkdirSync(ROOT);

  return NextResponse.json(readDir(ROOT));
}

export async function POST(req: Request) {
  const { file, content } = await req.json();

  const filePath = path.join(ROOT, file);

  fs.writeFileSync(filePath, content);

  return NextResponse.json({ ok: true });
}