export class PromptEngine {

 async parse(prompt:string){

  return {
   intent:'build_app',
   description:prompt,
   features:[],
   stack:[],
   constraints:[]
  }

 }

}
