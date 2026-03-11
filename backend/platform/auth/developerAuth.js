const bcrypt=require("bcryptjs")
const {v4:uuid}=require("uuid")

let developers=[]

async function signup(email,password){
const hash=await bcrypt.hash(password,10)
const dev={id:uuid(),email,password:hash,created:Date.now()}
developers.push(dev)
return {developerId:dev.id}
}

module.exports={signup}
