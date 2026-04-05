export function saveMission(userId: string, input: string, output: string) {
  const key = `oix_memory_${userId}`;

  const existing = JSON.parse(localStorage.getItem(key) || "[]");

  existing.unshift({
    id: Date.now(),
    input,
    output,
    createdAt: new Date().toISOString(),
  });

  localStorage.setItem(key, JSON.stringify(existing));
}

export function getMissions(userId: string) {
  const key = `oix_memory_${userId}`;
  return JSON.parse(localStorage.getItem(key) || "[]");
}