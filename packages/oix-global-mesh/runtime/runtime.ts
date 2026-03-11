import {MeshNetwork} from "../network/network"
import {listClusters} from "../clusters/clusterManager"

export class GlobalMeshRuntime{

network=new MeshNetwork()

initialize(){

const clusters=listClusters()

clusters.forEach((c:any)=>this.network.connect(c))

}

status(){

return {
clusters:this.network.list().length
}

}

}
