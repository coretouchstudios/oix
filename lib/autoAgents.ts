export function startAutoAgent(task: string) {
  setInterval(async () => {
    await fetch("/api/agents", {
      method: "POST",
      body: JSON.stringify({ message: task }),
    });
  }, 10000); // runs every 10s
}