import { createStartup,getStartups } from "../services/venture.service"

export function create(req:any,res:any){

 const {name,template} = req.body

 const startup = createStartup(name,template)

 res.json(startup)

}

export function list(req:any,res:any){

 const startups = getStartups()

 res.json(startups)

}
