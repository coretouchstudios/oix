export interface AITool {

 name:string

 execute(input:any):Promise<any>

}
