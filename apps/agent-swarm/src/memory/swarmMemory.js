

class SwarmMemory{

constructor(){
this.records=[]
}

store(data){

this.records.push(data)

}

search(q){

return this.records.filter(r=>r.includes(q))

}

}

module.exports=SwarmMemory

