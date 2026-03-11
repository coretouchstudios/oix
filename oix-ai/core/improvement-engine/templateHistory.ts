export class TemplateHistory {

 history:any[] = []

 record(template:any){
  this.history.push(template)
 }

 getHistory(){
  return this.history
 }

}
