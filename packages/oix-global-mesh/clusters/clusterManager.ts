let clusters:any[]=[]

export function createCluster(config:any){

const cluster={
id:"cluster-"+Date.now(),
region:config.region,
nodes:config.nodes||[]
}

clusters.push(cluster)

return cluster

}

export function listClusters(){

return clusters

}
