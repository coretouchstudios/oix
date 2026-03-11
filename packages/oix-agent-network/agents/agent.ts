export class Agent {

id:string
tools:any[]
memory:any

constructor(config:any){
this.id=config.id
this.tools=config.tools || []
this.memory={}
}

async act(input:any){

return {
agent:this.id,
result:"ACTION:"+JSON.stringify(input)
}

}

}
