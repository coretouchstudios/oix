
const fs=require("fs")

const MEMORY_FILE="agent_memory.json"

function load(){

if(!fs.existsSync(MEMORY_FILE))
return []

return JSON.parse(fs.readFileSync(MEMORY_FILE))

}

function save(memory){

fs.writeFileSync(MEMORY_FILE,JSON.stringify(memory,null,2))

}

function remember(entry){

const memory=load()

memory.push(entry)

save(memory)

}

function recall(){

return load()

}

module.exports={remember,recall}

