import fs from "fs"

export async function GET(){

if(!fs.existsSync("./flow.json"))
return Response.json({nodes:[],edges:[]})

const data=JSON.parse(
fs.readFileSync("./flow.json","utf8")
)

return Response.json(data)

}