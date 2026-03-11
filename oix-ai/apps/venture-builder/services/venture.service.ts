import { generateStartup } from "../generators/startup.generator"
import { registerStartup,listStartups } from "./startup.registry"

export function createStartup(name:string,template:string){

 const startup = generateStartup(name,template)

 return registerStartup({
  id:Date.now().toString(),
  name,
  template,
  status:"created"
 })

}

export function getStartups(){

 return listStartups()

}
