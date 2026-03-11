import OpenAI from "openai"

export const client = new OpenAI({
 apiKey: process.env.OPENAI_API_KEY
})

export async function runAgent(prompt:string){

 const res = await client.chat.completions.create({
  model:"gpt-4o-mini",
  messages:[
   {role:"user",content:prompt}
  ]
 })

 return res.choices[0].message.content
}