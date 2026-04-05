import { planner } from "./planner";
import { builder } from "./builder";
import { fixer } from "./fixer";
import { AgentStep } from "./types";

let running = false;

export function stopAgents() {
  running = false;
}

export async function runAutonomous(
  goal: string,
  onUpdate: (steps: AgentStep[]) => void
) {
  running = true;

  let steps: AgentStep[] = [];
  let iteration = 0;
  let lastOutput = "";

  while (running && iteration < 10) {
    iteration++;

    /* ===== PLANNER ===== */
    const plan = await planner(goal);

    steps.push({
      id: Date.now(),
      role: "planner",
      content: `Iteration ${iteration}: Plan created`,
      status: "done",
    });

    onUpdate([...steps]);

    /* ===== EXECUTION ===== */
    let executionOutput = "";

    for (const task of plan) {
      if (!running) break;

      const result = await builder(task);
      executionOutput += result + "\n";

      steps.push({
        id: Date.now() + Math.random(),
        role: "builder",
        content: result,
        status: "done",
      });

      onUpdate([...steps]);
    }

    /* ===== FIX / IMPROVE ===== */
    const improved = await fixer(executionOutput);

    steps.push({
      id: Date.now(),
      role: "fixer",
      content: improved,
      status: "done",
    });

    onUpdate([...steps]);

    /* ===== CHECK STOP CONDITION ===== */
    if (improved === lastOutput) {
      steps.push({
        id: Date.now(),
        role: "fixer",
        content: "✅ Goal stabilized. Stopping.",
        status: "done",
      });

      onUpdate([...steps]);
      break;
    }

    lastOutput = improved;
  }

  running = false;
}