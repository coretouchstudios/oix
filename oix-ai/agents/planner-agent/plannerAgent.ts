export class PlannerAgent {

 async plan(goal:string){

  console.log('Planning goal:',goal)

  return {
   tasks:[
    'design architecture',
    'select templates',
    'generate code',
    'test project',
    'deploy app'
   ]
  }

 }

}
