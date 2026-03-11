export class GPURouter{

gpus:any[]=[]

registerGPU(id:string){
this.gpus.push({id,load:0})
}

routeJob(){

this.gpus.sort((a,b)=>a.load-b.load)

return this.gpus[0]

}

}
