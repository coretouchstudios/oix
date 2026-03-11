const {getUsage}=require("../billing/usageMeter")

function stats(apiKey){
const data=getUsage(apiKey)
return{requests:data.length,tokens:data.reduce((t,x)=>t+x.tokens,0)}
}

module.exports={stats}
