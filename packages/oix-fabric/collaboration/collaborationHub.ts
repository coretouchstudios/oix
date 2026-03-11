export class CollaborationHub{

rooms:any={}

join(room:string,agent:any){

if(!this.rooms[room]){
this.rooms[room]=[]
}

this.rooms[room].push(agent)

}

broadcast(room:string,message:any){

const agents=this.rooms[room] || []

for(const a of agents){
a.receive(message)
}

}

}
