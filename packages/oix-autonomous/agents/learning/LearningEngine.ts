
export class LearningEngine{

experience:any[]=[]

learn(data:any){
this.experience.push(data)
}

knowledge(){
return this.experience.length
}

}

