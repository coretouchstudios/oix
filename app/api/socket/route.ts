import { Server } from "socket.io";

let io: any;

export async function GET(req: Request) {
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

/* =========================
   📡 EMIT HELPER
========================= */
export function emit(projectId: string, event: string, data: any) {
  if (io) {
    io.to(projectId).emit(event, data);
  }
}