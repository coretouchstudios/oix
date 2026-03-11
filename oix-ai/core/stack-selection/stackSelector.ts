export class StackSelector {

 async select(systemDesign:any){

  console.log('Selecting technology stack')

  return {
   frontend:'nextjs',
   backend:'node',
   database:'postgres',
   ai:'openai-api'
  }

 }

}
