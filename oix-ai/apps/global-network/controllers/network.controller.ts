import { registerNode } from "../nodes/node.registry"
import { getNetworkStatus } from "../services/network.service"

export function register(req:any,res:any){

 const node = req.body

 const nodes = registerNode(node)

 res.json(nodes)

}

export function status(req:any,res:any){

 const status = getNetworkStatus()

 res.json(status)

}
