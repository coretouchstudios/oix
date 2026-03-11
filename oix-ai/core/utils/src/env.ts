export class Env {

 static get(key:string){

  const value = process.env[key]

  if(!value){
   throw new Error("Missing ENV: "+key)
  }

  return value

 }

}
