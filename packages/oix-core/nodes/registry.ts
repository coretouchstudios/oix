import fs from "fs"
import path from "path"

export function loadNodes(){
  const nodes:any = {}

  const base = path.join(__dirname)

  const categories = fs.readdirSync(base)

  for(const cat of categories){
    const dir = path.join(base,cat)

    if(!fs.statSync(dir).isDirectory()) continue

    const files = fs.readdirSync(dir)

    for(const f of files){
      const mod = require(path.join(dir,f))
      const node = mod.default
      nodes[node.type] = node
    }
  }

  return nodes
}