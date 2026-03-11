import fs from "fs"
import path from "path"

export function loadPlugins(dir:string){

const plugins:any={}

const files=fs.readdirSync(dir)

files.forEach(file=>{

const plugin=require(path.join(dir,file))

Object.assign(plugins,plugin.nodes)

})

return plugins

}