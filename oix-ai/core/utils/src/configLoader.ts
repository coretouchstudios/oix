import fs from "fs"

export class ConfigLoader {

 static load(path:string){

  if(!fs.existsSync(path)){
   throw new Error("Config file missing: "+path)
  }

  const data = fs.readFileSync(path,"utf8")
  return JSON.parse(data)

 }

}
