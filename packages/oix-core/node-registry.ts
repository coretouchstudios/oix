export const nodeRegistry:any={}

export function registerNode(name:string,handler:any){

nodeRegistry[name]=handler

}