
"use client"

import {Canvas} from "@react-three/fiber"
import {OrbitControls} from "@react-three/drei"

function Node({position}:{position:[number,number,number]}){

return(
<mesh position={position}>
<sphereGeometry args={[0.2,16,16]}/>
<meshStandardMaterial color="cyan"/>
</mesh>
)

}

export default function ClusterMap3D(){

return(

<div style={{height:"100%"}}>

<h3>Global AI Clusters</h3>

<Canvas>

<ambientLight/>

<Node position={[0,0,0]}/>
<Node position={[2,1,-2]}/>
<Node position={[-2,-1,1]}/>

<OrbitControls/>

</Canvas>

</div>

)

}

