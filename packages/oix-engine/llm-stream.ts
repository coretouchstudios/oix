import OpenAI from "openai"

const client=new OpenAI({
apiKey:process.env.OPENAI_API_KEY
})

export async function streamLLM(prompt:string){

const stream=await client.chat.completions.create({

model:"gpt-4o-mini",

messages:[
{role:"user",content:prompt}
],

stream:true

})

return stream

}