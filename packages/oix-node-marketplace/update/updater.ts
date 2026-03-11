import {findNode} from "../registry/registry"

export function checkUpdates(name:string,currentVersion:string){

const node=findNode(name)

if(!node) return null

if(node.version!==currentVersion){

return {
update:true,
version:node.version
}

}

return {update:false}

}
