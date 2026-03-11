export async function runAgent({prompt, tools}:any){

let context = ""

for(const tool of tools){

const result = await tool(prompt)

context += result + "\n"

}

return {
response: context
}

}