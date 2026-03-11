export class Planner{

plan(goal:string){

return [
{step:"research",input:goal},
{step:"analyze",input:"research results"},
{step:"summarize",input:"analysis"}
]

}

}
