export class MeshAgent{

id:string
region:string

constructor(id:string,region:string){

this.id=id
this.region=region

}

async act(task:any){

return {
agent:this.id,
region:this.region,
result:"processed:"+JSON.stringify(task)
}

}

}
