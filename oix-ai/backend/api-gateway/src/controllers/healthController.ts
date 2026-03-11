import { Request, Response } from "express"

export function health(req:Request,res:Response){

 res.json({
  status:"OIX API Running",
  timestamp:Date.now()
 })

}
