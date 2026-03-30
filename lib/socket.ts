let io: any;

export function setIO(server: any) {
  io = server;
}

export function emit(projectId: string, event: string, data: any) {
  if (io) {
    io.to(projectId).emit(event, data);
  }
}