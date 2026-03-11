export class Logger {

 static info(message:string){
  console.log("[OIX INFO]",message)
 }

 static warn(message:string){
  console.warn("[OIX WARN]",message)
 }

 static error(message:string){
  console.error("[OIX ERROR]",message)
 }

}
