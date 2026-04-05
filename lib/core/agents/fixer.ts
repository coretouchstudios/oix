import { planner } from "./planner";
import { builder } from "./builder";
import { fixer } from "./fixer";
import { AgentStep } from "./types";

export async function runAgents(input: string, onUpdate: (steps: AgentStep[]) => void) {
  let steps: AgentStep[] = [];

  /* ========= PLANNER ========= */
  const plan = await planner(input);

  for (let i = 0; i < plan.length; i++) {
    steps.push({
      id: i,
      role: "planner",
      content: plan[i],
      status: "done",
    });
  }

  onUpdate([...steps]);

  /* ========= BUILDER ========= */
  for (let i = 0; i < plan.length; i++) {
    steps.push({
      id: Date.now() + i,
      role: "builder",
      content: `Running: ${plan[i]}`,
      status: "running",
    });

    onUpdate([...steps]);

    const result = await builder(plan[i]);

    steps[steps.length - 1].content = result;
    steps[steps.length - 1].status = "done";

    onUpdate([...steps]);
  }

  /* ========= FIXER ========= */
  const finalOutput = steps.map((s) => s.content).join("\n");

  const improved = await fixer(finalOutput);

  steps.push({
    id: Date.now(),
    role: "fixer",
    content: improved,
    status: "done",
  });

  onUpdate([...steps]);

  return improved;
}