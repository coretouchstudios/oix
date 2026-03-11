
const Anthropic=require("@anthropic-ai/sdk")

const client=new Anthropic({
apiKey:process.env.ANTHROPIC_API_KEY
})

async function chat(prompt){

const res=await client.messages.create({
model:"claude-3-opus-20240229",
max_tokens:1000,
messages:[
{role:"user",content:prompt}
]
})

return res.content[0].text

}

module.exports={chat}

