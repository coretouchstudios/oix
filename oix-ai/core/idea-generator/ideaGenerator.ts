export class IdeaGenerator {

 async generate(opportunities:any){

  console.log('Generating startup ideas')

  return opportunities.map(o => ({
   idea:o,
   description:'AI powered solution'
  }))

 }

}
