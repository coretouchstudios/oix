export class InfrastructurePlanner {

 async plan(stack:any){

  console.log('Planning infrastructure')

  return {
   cloud:'aws',
   containers:'docker',
   orchestration:'kubernetes',
   database:'managed-postgres'
  }

 }

}
