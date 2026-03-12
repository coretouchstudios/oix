const memory = new Map()

function save(key,value){
  memory.set(key,value)
}

function load(key){
  return memory.get(key)
}

module.exports = {
  save,
  load
}