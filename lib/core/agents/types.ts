export type AgentStep = {
  id: number;
  role: "planner" | "builder" | "fixer";
  content: string;
  status: "pending" | "running" | "done" | "error";
};

export type AgentResult = {
  steps: AgentStep[];
  final: string;
};