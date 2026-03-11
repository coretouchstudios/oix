
"use client"

import {Canvas} from "@react-three/fiber"
import {OrbitControls} from "@react-three/drei"

function Cluster({pos}:{pos:[number,number,number]}){

return(
<mesh position={pos}>
<sphereGeometry args={[0.25,16,16]}/>
<meshStandardMaterial color="cyan"/>
</mesh>
)

}

export default function PlanetMap(){

return(

<div style={{height:"100%"}}>

<h3>Planetary AI Network</h3>

<Canvas>

<ambientLight/>

<Cluster pos={[0,0,0]}/>
<Cluster pos={[2,1,-2]}/>
<Cluster pos={[-2,-1,1]}/>
<Cluster pos={[1,2,2]}/>

<OrbitControls/>

</Canvas>

</div>

)

}

