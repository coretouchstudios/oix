
const {remember}=require("../memory/memoryGraph")

function learn(task,result){

remember({
task,
result,
timestamp:Date.now()
})

return {status:"learned"}

}

module.exports={learn}

