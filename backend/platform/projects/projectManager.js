const {v4:uuid}=require("uuid")

let projects=[]

function createProject(developerId,name){
const project={id:uuid(),developerId,name,created:Date.now()}
projects.push(project)
return project
}

function listProjects(developerId){
return projects.filter(p=>p.developerId===developerId)
}

module.exports={createProject,listProjects}
