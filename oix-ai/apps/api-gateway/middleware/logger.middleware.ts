export function requestLogger(req:any,res:any,next:any){

 console.log(`[Gateway] ${req.method} ${req.url}`)

 next()

}
