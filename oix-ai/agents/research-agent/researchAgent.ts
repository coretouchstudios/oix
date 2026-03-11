export class ResearchAgent {

 async run(plan:any){

  console.log('Research Agent analyzing plan')

  return {
   recommendations:[
    'Use Next.js frontend',
    'Use Node API',
    'Use PostgreSQL'
   ]
  }

 }

}
