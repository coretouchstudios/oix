export class ProductAgent {

 async run(features:any){

  console.log('Building product features')

  return {status:'product_built',features:features}

 }

}
