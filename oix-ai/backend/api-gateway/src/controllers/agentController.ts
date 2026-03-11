import { Request, Response } from "express"
import { AgentManager } from "../../../agents/framework/src/core/agentManager"
import { ExampleAgent } from "../../../agents/framework/src/agents/exampleAgent"

const manager = new AgentManager()

manager.registry.register(new ExampleAgent())

export async function runAgent(req:Request,res:Response){

 manager.queue.add({
  id:Date.now().toString(),
  description:"example-task"
 })

 await manager.run()

 res.json({
  status:"Agent executed"
 })

}
