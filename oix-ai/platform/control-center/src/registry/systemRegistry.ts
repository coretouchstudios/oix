import { SystemStatus } from "../types/systemStatus"

export class SystemRegistry {

 private systems:Map<string,SystemStatus> = new Map()

 register(name:string){

  this.systems.set(name,{
   name,
   status:"active",
   timestamp:Date.now()
  })

 }

 list(){

  return Array.from(this.systems.values())

 }

}
