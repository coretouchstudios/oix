import fs from "fs"

export async function POST(req:Request){

const body=await req.json()

fs.writeFileSync(
"./flow.json",
JSON.stringify(body,null,2)
)

return Response.json({ok:true})

}