import { Request, Response } from "express"
import { triggerAgent } from "../services/runtimeService.js"

export async function runAgent(req: Request, res: Response) {

  try {

    const result = await triggerAgent(req.body)

    res.json(result)

  } catch (err) {

    res.status(500).json({
      error: "Agent execution failed"
    })

  }

}