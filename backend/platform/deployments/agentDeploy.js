const deployments=[]

function deployAgent(projectId,agentName){
const deploy={projectId,agentName,status:"running",created:Date.now()}
deployments.push(deploy)
return deploy
}

module.exports={deployAgent}
