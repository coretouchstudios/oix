import { Server } from "socket.io";

let io: Server | null = null;

export function getIO() {
  if (!io) {
    io = new Server(3001, {
      cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
      console.log("⚡ connected");

      socket.on("join", (projectId) => {
        socket.join(projectId);
      });
    });
  }

  return io;
}

export function emit(projectId: string, event: string, data: any) {
  if (io) {
    io.to(projectId).emit(event, data);
  }
}