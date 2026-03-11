import { Request, Response } from "express"
import { AIEngine } from "../../../core/ai-engine/src/engine/aiEngine"

const ai = new AIEngine()

export async function askAI(req:Request,res:Response){

 const {system,user} = req.body

 const result = await ai.ask(system,user)

 res.json(result)

}
