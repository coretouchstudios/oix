export class TaskDecomposer {

 async breakdown(goal:string){

  console.log('Breaking goal into tasks')

  return [
   'design UI',
   'build API',
   'design database',
   'apply security',
   'run tests',
   'optimize performance',
   'setup deployment'
  ]

 }

}
