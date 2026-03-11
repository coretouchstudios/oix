const tools:any={}

export function registerTool(name:string,tool:any){
tools[name]=tool
}

export async function runTool(name:string,input:any){

const tool=tools[name]

if(!tool) throw new Error("Tool not found")

return tool.run(input)

}
