

class VectorMemory{

constructor(){

this.vectors=[]

}

store(data){

this.vectors.push({
text:data,
time:Date.now()
})

console.log("memory stored",data)

}

search(q){

return this.vectors.filter(v=>v.text.includes(q))

}

}

module.exports=VectorMemory

