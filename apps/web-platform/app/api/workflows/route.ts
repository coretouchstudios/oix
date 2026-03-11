import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { id: "w1", name: "AI Workflow" }
  ]);
}