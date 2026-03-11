

class ClusterNetwork{

constructor(){

this.clusters=[
{name:"cluster-us",capacity:1000},
{name:"cluster-eu",capacity:900},
{name:"cluster-asia",capacity:1200}
]

}

deploy(agent){

console.log("Deploying agent to cluster")

}

}

module.exports=ClusterNetwork

