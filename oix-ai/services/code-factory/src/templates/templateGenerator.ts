export class TemplateGenerator {

 generateBasicAPI(){

  return {

   "server.js": `
const express = require("express")

const app = express()

app.get("/",(req,res)=>{

 res.send("API Running")

})

app.listen(3000)
`
  }

 }

}
