import { runLLM } from "../oix-engine/llm"

export class Agent {

name:string
goal:string
tools:any[]

constructor(config:any){

this.name=config.name
this.goal=config.goal
this.tools=config.tools || []

}

async run(input:string){

const prompt=`
Agent: ${this.name}
Goal: ${this.goal}

Task:
${input}
`

const result = await runLLM(prompt)

return result

}

}