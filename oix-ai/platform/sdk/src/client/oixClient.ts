import { PluginRegistry } from "../plugins/pluginRegistry"

export class OIXClient {

 registry = new PluginRegistry()

 registerPlugin(plugin:any){

  this.registry.register(plugin)

 }

 listPlugins(){

  return this.registry.list()

 }

}
