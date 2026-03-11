export interface OIXPlugin {

 name:string

 version:string

 execute(input:any):Promise<any>

}
