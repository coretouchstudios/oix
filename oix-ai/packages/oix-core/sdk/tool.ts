export function createTool(fn:any){

return async(input:any)=>{
return await fn(input)
}

}
