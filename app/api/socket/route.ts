import { Server } from "socket.io";

let io: any;

export const runtime = "nodejs"; // important

export async function GET() {
  if (!io) {
    io = new Server(3001, {
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
      console.log("⚡ client connected");

      socket.on("join", (projectId) => {
        socket.join(projectId);
      });
    });
  }

  return new Response("Socket running");
}