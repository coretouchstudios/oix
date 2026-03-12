import { Request, Response } from "express"

export async function createTask(req: Request, res: Response) {

  res.json({
    message: "Task queued",
    data: req.body
  })

}