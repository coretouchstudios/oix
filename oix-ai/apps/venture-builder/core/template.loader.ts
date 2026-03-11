import fs from "fs"

export function loadTemplate(name:string){

 const path = `templates/startups/${name}/template.json`

 const data = fs.readFileSync(path,"utf8")

 return JSON.parse(data)

}
