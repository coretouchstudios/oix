const express=require("express")
const router=express.Router()

const {signup}=require("../../platform/auth/developerAuth")
const {createProject,listProjects}=require("../../platform/projects/projectManager")
const {deployAgent}=require("../../platform/deployments/agentDeploy")

router.post("/signup",async(req,res)=>{
const {email,password}=req.body
const dev=await signup(email,password)
res.json(dev)
})

router.post("/projects",async(req,res)=>{
const {developerId,name}=req.body
res.json(createProject(developerId,name))
})

router.get("/projects/:dev",async(req,res)=>{
res.json(listProjects(req.params.dev))
})

router.post("/deploy",async(req,res)=>{
const {projectId,agent}=req.body
res.json(deployAgent(projectId,agent))
})

module.exports=router
