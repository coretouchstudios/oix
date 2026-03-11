export interface OIXPlugin {

name:string
version:string

nodes:any[]

init?():Promise<void>

}