export class AutoScaler{

workers:number=1

scale(load:number){

if(load>0.7){
this.workers++
}

if(load<0.3 && this.workers>1){
this.workers--
}

return this.workers

}

}
