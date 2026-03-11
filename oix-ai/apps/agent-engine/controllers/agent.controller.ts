import { createAgent,getAgents } from "../services/agent.service"

export function create(req:any,res:any){

 const agent = createAgent(req.body)

 res.json(agent)

}

export function list(req:any,res:any){

 const agents = getAgents()

 res.json(agents)

}
