

class Memory{

constructor(){

this.logs=[]

}

store(data){

this.logs.push({

data,
time:Date.now()

})

}

search(q){

return this.logs.filter(l=>JSON.stringify(l).includes(q))

}

}

module.exports=Memory


