
const fs=require("fs")
const FILE="marketplace.json"

function load(){
if(!fs.existsSync(FILE)) return []
return JSON.parse(fs.readFileSync(FILE))
}

function save(data){
fs.writeFileSync(FILE,JSON.stringify(data,null,2))
}

function add(app){
const data=load()
data.push(app)
save(data)
return app
}

function list(){
return load()
}

module.exports={add,list}

