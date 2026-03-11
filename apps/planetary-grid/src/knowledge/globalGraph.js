

class GlobalGraph{

constructor(){

this.nodes=[]
this.edges=[]

}

addNode(n){

this.nodes.push(n)

}

connect(a,b){

this.edges.push({a,b})

}

search(q){

return this.nodes.filter(n=>n.includes(q))

}

}

module.exports=GlobalGraph

