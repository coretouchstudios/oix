import { getIO } from "@/lib/socket";

export async function GET() {
  getIO();
  return new Response("Socket running");
}