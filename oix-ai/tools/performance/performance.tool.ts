export function measureExecution(fn:Function){

 const start = Date.now()

 const result = fn()

 const end = Date.now()

 console.log("Execution time:",end-start,"ms")

 return result

}
