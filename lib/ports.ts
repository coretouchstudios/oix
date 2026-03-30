const ports = new Map<string, number>();

export function assignPort(sessionId: string) {
  if (ports.has(sessionId)) return ports.get(sessionId)!;

  const port = 4000 + Math.floor(Math.random() * 2000);
  ports.set(sessionId, port);
  return port;
}

export function getPort(sessionId: string) {
  return ports.get(sessionId);
}