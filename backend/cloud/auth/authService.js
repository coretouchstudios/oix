

const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")

class AuthService{

constructor(){

this.users=[]

}

register(email,password){

const hash=bcrypt.hashSync(password,10)

const user={email,password:hash}

this.users.push(user)

return user

}

login(email,password){

const user=this.users.find(u=>u.email===email)

if(!user) return null

if(!bcrypt.compareSync(password,user.password)) return null

return jwt.sign({email},"oix-secret")

}

}

module.exports=AuthService


