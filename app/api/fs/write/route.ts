import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";

const ROOT = path.join(process.cwd(), "sandbox");

export async function POST(req: Request) {
  const { files } = await req.json();

  for (const file of files) {
    const filePath = path.join(ROOT, file.path);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, file.content);
  }

  return NextResponse.json({ success: true });
}