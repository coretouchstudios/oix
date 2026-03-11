
export class SelfImprover{

history:any[]=[]

observe(run:any){
this.history.push(run)
}

improve(){
return "system optimized"
}

}

