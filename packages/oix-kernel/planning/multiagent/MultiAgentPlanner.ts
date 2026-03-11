
export class MultiAgentPlanner{

agents:string[]=[]

plan(goal:string){
return this.agents.map(a=>({agent:a,task:goal}))
}

}

