export async function runAgents(input: string, onLog: (log: string) => void) {
  const steps = [
    "🧠 Planner analyzing mission...",
    "📊 Researcher gathering data...",
    "💻 Builder generating solution...",
    "🚀 Finalizing output...",
  ];

  let result = "";

  for (let i = 0; i < steps.length; i++) {
    await new Promise((r) => setTimeout(r, 1000));

    onLog(steps[i]);

    if (i === steps.length - 1) {
      result = `
✅ Mission Complete

Here is your result for:
"${input}"

- Landing page structure created
- Auth system planned
- API routes designed

Next step: Deploy or refine.
      `;
    }
  }

  return result;
}