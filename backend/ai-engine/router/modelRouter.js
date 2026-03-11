
const config=require("./config")

const openai=require("./providers/openai")
const anthropic=require("./providers/anthropic")
const meta=require("./providers/meta")

async function route(prompt,mode="fast"){

const model=config.models[mode]

let provider

if(model.provider==="openai") provider=openai
if(model.provider==="anthropic") provider=anthropic
if(model.provider==="meta") provider=meta

try{

return await provider.chat(prompt)

}catch(err){

console.log("Model failed, fallback triggered")

if(model.provider!=="openai")
return await openai.chat(prompt)

throw err

}

}

module.exports={route}

