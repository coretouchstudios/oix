export class ExtensionManager {

 private extensions:string[] = []

 add(name:string){

  this.extensions.push(name)

 }

 list(){

  return this.extensions

 }

}
