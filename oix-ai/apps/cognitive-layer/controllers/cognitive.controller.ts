import { processIdea } from "../services/cognitive.service"

export function analyze(req:any,res:any){

 const {idea} = req.body

 const result = processIdea(idea)

 res.json(result)

}
