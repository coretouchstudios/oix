

class MeshNetwork{

constructor(){

this.nodes=[
"cluster-us",
"cluster-eu",
"cluster-asia"
]

}

broadcast(msg){

console.log("Mesh broadcast",msg)

}

}

module.exports=MeshNetwork

