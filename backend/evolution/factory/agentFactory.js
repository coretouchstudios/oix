
const fs=require("fs")

function createAgent(name,goal){

const code=`
module.exports={
name:"${name}",
goal:"${goal}",
run:async function(input){
return "Agent ${name} executed task: "+input
}
}
`

fs.writeFileSync(`backend/agents/generated/${name}.js`,code)

return {created:name}

}

module.exports={createAgent}

