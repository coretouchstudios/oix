

require("dotenv").config()

const OpenAI=require("openai")

let client=null

if(process.env.OPENAI_API_KEY){

 client=new OpenAI({
  apiKey:process.env.OPENAI_API_KEY
 })

}

async function runAgent(task){

 if(!client){

  return "AI running but no API key configured"

 }

 const res=await client.chat.completions.create({

  model:"gpt-4o-mini",

  messages:[
   {role:"system",content:"You are an autonomous AI agent"},
   {role:"user",content:task}
  ]

 })

 return res.choices[0].message.content

}

module.exports={runAgent}

