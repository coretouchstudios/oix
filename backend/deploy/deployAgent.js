
const fs=require("fs")

function deployAgent(name){

const data={
type:"agent",
name,
status:"deployed",
time:Date.now()
}

fs.appendFileSync("deployments.json",JSON.stringify(data)+"\n")

return data
}

module.exports={deployAgent}

