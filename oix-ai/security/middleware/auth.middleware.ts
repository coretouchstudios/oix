import { verifyToken } from "../auth/auth.service"

export function authMiddleware(req:any,res:any,next:any){

 const token = req.headers.authorization

 if(!token){

  return res.status(401).send("Unauthorized")

 }

 try{

  verifyToken(token)

  next()

 }catch{

  res.status(401).send("Invalid Token")

 }

}
