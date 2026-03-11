const fs=require('fs')
const path=require('path')

function write(file,content){
fs.mkdirSync(path.dirname(file),{recursive:true})
fs.writeFileSync(file,content)
}

write('backend/platform/auth/developerAuth.js',
'const bcrypt=require("bcryptjs")\nconst {v4:uuid}=require("uuid")\n\nlet developers=[]\n\nasync function signup(email,password){\nconst hash=await bcrypt.hash(password,10)\nconst dev={id:uuid(),email,password:hash,created:Date.now()}\ndevelopers.push(dev)\nreturn {developerId:dev.id}\n}\n\nmodule.exports={signup}\n'
)

write('backend/platform/projects/projectManager.js',
'const {v4:uuid}=require("uuid")\n\nlet projects=[]\n\nfunction createProject(developerId,name){\nconst project={id:uuid(),developerId,name,created:Date.now()}\nprojects.push(project)\nreturn project\n}\n\nfunction listProjects(developerId){\nreturn projects.filter(p=>p.developerId===developerId)\n}\n\nmodule.exports={createProject,listProjects}\n'
)

write('backend/platform/billing/usageMeter.js',
'let usage=[]\n\nfunction track(apiKey,endpoint,tokens){\nusage.push({apiKey,endpoint,tokens,timestamp:Date.now()})\n}\n\nfunction getUsage(apiKey){\nreturn usage.filter(u=>u.apiKey===apiKey)\n}\n\nmodule.exports={track,getUsage}\n'
)

write('backend/platform/deployments/agentDeploy.js',
'const deployments=[]\n\nfunction deployAgent(projectId,agentName){\nconst deploy={projectId,agentName,status:"running",created:Date.now()}\ndeployments.push(deploy)\nreturn deploy\n}\n\nmodule.exports={deployAgent}\n'
)

write('backend/platform/analytics/usageStats.js',
'const {getUsage}=require("../billing/usageMeter")\n\nfunction stats(apiKey){\nconst data=getUsage(apiKey)\nreturn{requests:data.length,tokens:data.reduce((t,x)=>t+x.tokens,0)}\n}\n\nmodule.exports={stats}\n'
)

write('backend/gateway/routes/platform.js',
'const express=require("express")\nconst router=express.Router()\n\nconst {signup}=require("../../platform/auth/developerAuth")\nconst {createProject,listProjects}=require("../../platform/projects/projectManager")\nconst {deployAgent}=require("../../platform/deployments/agentDeploy")\n\nrouter.post("/signup",async(req,res)=>{\nconst {email,password}=req.body\nconst dev=await signup(email,password)\nres.json(dev)\n})\n\nrouter.post("/projects",async(req,res)=>{\nconst {developerId,name}=req.body\nres.json(createProject(developerId,name))\n})\n\nrouter.get("/projects/:dev",async(req,res)=>{\nres.json(listProjects(req.params.dev))\n})\n\nrouter.post("/deploy",async(req,res)=>{\nconst {projectId,agent}=req.body\nres.json(deployAgent(projectId,agent))\n})\n\nmodule.exports=router\n'
)

console.log("🚀 OIX Developer Platform Installed")
