
export class GoalPlanner{

goals:string[]=[]

addGoal(goal:string){
this.goals.push(goal)
}

next(){
return this.goals.shift()
}

}

