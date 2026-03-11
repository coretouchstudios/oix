
export class AgentGenerator{

create(name:string){
return{
name,
async run(input:any){
return {agent:name,input}
}
}
}

}

