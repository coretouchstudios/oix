import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const ROOT = path.join(process.cwd(), "sandbox");

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const file = searchParams.get("path");

  if (!file) return NextResponse.json({ error: "No file" });

  const filePath = path.join(ROOT, file);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const content = fs.readFileSync(filePath, "utf-8");

  return new NextResponse(content);
}