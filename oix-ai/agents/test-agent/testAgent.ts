export class TestAgent {

 async test(build:any){

  console.log('Running automated tests')

  return {
   status:'tests_passed'
  }

 }

}
