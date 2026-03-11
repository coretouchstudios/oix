export class Debugger{

events:any[]=[]

emit(event:any){
this.events.push({
time:Date.now(),
...event
})
}

getEvents(){
return this.events
}

}
