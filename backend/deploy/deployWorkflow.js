
const fs=require("fs")

function deployWorkflow(name){

const data={
type:"workflow",
name,
status:"deployed",
time:Date.now()
}

fs.appendFileSync("deployments.json",JSON.stringify(data)+"\n")

return data
}

module.exports={deployWorkflow}

