import agent1 from "./agent1.js";
import agent2 from "./agent2.js";
import agent3 from "./agent3.js";
import agent4 from "./agent4.js";

export async function runAgent(agentName, input) {

  const agents = {
    agent1,
    agent2,
    agent3,
    agent4
  };

  const agent = agents[agentName];

  if (!agent) {
    throw new Error("Agent not found");
  }

  return await agent(input);
}