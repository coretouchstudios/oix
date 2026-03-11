
const fetch=require("node-fetch")

async function chat(prompt){

const res=await fetch("https://api.llama-api.com/chat",{
method:"POST",
headers:{
"Content-Type":"application/json",
"Authorization":`Bearer ${process.env.LLAMA_API_KEY}`
},
body:JSON.stringify({
model:"llama3-70b",
messages:[
{role:"user",content:prompt}
]
})
})

const data=await res.json()

return data.choices[0].message.content

}

module.exports={chat}

