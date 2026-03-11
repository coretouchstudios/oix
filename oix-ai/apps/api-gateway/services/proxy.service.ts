import axios from "axios"

export async function proxyRequest(url:string,req:any,res:any){

 try{

  const response = await axios({

   method:req.method,
   url:url + req.originalUrl,
   data:req.body

  })

  res.json(response.data)

 }catch(error:any){

  res.status(500).json({error:error.message})

 }

}
