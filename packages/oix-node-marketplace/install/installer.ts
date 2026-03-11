import {findNode} from "../registry/registry"
import {installPlugin} from "../plugins/pluginManager"

export function installFromRegistry(name:string){

const node=findNode(name)

if(!node) throw new Error("Node not found")

return installPlugin(node)

}
