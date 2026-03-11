
export class GpuRouter{

gpus:string[]=["gpu0","gpu1","gpu2"]

route(){
return this.gpus[Math.floor(Math.random()*this.gpus.length)]
}

}

