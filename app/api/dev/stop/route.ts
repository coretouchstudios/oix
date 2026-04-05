import { NextResponse } from "next/server";

let proc: any;

export async function POST() {
  if (proc) proc.kill();

  return NextResponse.json({ stopped: true });
}