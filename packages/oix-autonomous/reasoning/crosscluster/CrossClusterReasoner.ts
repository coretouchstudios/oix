
export class CrossClusterReasoner{

clusters:string[]=[]

addCluster(c:string){
this.clusters.push(c)
}

reason(query:string){
return this.clusters.map(c=>({cluster:c,answer:query}))
}

}

