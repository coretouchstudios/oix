const { runAgent } = require("./agentRunner");

async function start() {
  console.log("OIX Agent Runtime starting...");

  // simple health test
  await runAgent({
    task: "system boot check"
  });
}

start();