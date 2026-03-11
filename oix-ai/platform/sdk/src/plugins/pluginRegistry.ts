import { OIXPlugin } from "../types/oixPlugin"

export class PluginRegistry {

 private plugins:Map<string,OIXPlugin> = new Map()

 register(plugin:OIXPlugin){

  this.plugins.set(plugin.name,plugin)

 }

 get(name:string){

  return this.plugins.get(name)

 }

 list(){

  return Array.from(this.plugins.values())

 }

}
