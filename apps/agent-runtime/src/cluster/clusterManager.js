

class ClusterManager{

constructor(){

this.nodes=[
{name:"node-us",region:"us"},
{name:"node-eu",region:"eu"},
{name:"node-asia",region:"asia"}
]

}

deploy(agent){

console.log("deploying",agent)

}

}

module.exports=ClusterManager

