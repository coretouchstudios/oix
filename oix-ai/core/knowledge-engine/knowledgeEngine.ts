export class KnowledgeEngine {

 async load(){

  console.log('Loading global knowledge sources')

  return {
   sources:[
    'startup trends',
    'technology reports',
    'market growth data'
   ]
  }

 }

}
