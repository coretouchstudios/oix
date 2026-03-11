export interface OIXAgent{
name:string
run(task:any):Promise<any>
}

export function createAgent(agent:OIXAgent){
return agent
}
