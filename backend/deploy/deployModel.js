
const fs=require("fs")

function deployModel(name){

const data={
type:"model",
name,
status:"deployed",
time:Date.now()
}

fs.appendFileSync("deployments.json",JSON.stringify(data)+"\n")

return data
}

module.exports={deployModel}

