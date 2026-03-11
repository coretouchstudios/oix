export interface OIXNode {

id:string
type:string
data:any

}

export interface OIXEdge {

id:string
source:string
target:string

}

export interface OIXWorkflow {

nodes:OIXNode[]
edges:OIXEdge[]

}