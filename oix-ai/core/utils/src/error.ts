export class OIXError extends Error {

 constructor(message:string){
  super(message)
  this.name="OIXError"
 }

}
