export class IdeaScorer {

 async score(ideas:any){

  console.log('Scoring startup ideas')

  return ideas.map(i => ({
   ...i,
   score:Math.floor(Math.random()*100)
  })).sort((a,b)=>b.score-a.score)

 }

}
