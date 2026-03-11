
const fs=require("fs")

const FILE="global_vector_memory.json"

function load(){

if(!fs.existsSync(FILE)) return []

return JSON.parse(fs.readFileSync(FILE))

}

function save(data){

fs.writeFileSync(FILE,JSON.stringify(data,null,2))

}

function store(vector){

const data=load()

data.push(vector)

save(data)

}

function search(){

return load()

}

module.exports={store,search}

