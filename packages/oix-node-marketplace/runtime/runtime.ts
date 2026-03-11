import {getInstalled} from "../plugins/pluginManager"

export class MarketplaceRuntime{

nodes:any={}

load(){

const installed=getInstalled()

installed.forEach((n:any)=>{
this.nodes[n.name]=n
})

}

getNode(name:string){

return this.nodes[name]

}

}
