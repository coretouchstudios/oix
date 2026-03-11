export class PromptBuilder {

 static build(system:string,user:string){

  return `
SYSTEM:
${system}

USER:
${user}
`

 }

}
