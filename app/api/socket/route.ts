import { Server } from "socket.io";

let io: Server | null = null;

export const runtime = "nodejs";

export async function GET() {
  if (!io) {
    io = new Server(3001, {
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
      console.log("⚡ client connected");

      socket.on("join", (projectId: string) => {
        socket.join(projectId);
      });
    });
  }

  return new Response("Socket running");
}