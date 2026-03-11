export class ProductManagerAI {

 async defineProduct(idea:string){

  console.log('Defining product vision')

  return {
   idea:idea,
   productType:'saas',
   targetUsers:'businesses',
   coreValue:'automation'
  }

 }

}
