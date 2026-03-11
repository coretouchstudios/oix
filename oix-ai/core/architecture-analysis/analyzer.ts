export class ArchitectureAnalyzer {

 async analyze(goal:string){

  console.log('Analyzing project goal')

  return {
   type:'saas-platform',
   scale:'medium',
   aiRequired:true,
   realtime:false
  }

 }

}
