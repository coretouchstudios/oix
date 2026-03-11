const {runAgent}=require("../agents/agent")

async function execute(nodes){

 let result=""

 for(const node of nodes){

  if(node.type==="agent"){

   result=await runAgent(node.prompt)

  }

 }

 return result

}

module.exports={execute}