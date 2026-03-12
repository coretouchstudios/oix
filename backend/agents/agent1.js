export default async function agent1(input) {

  console.log("Agent1 executing:", input);

  return {
    agent: "agent1",
    input,
    output: "Agent1 processed task successfully"
  };
}