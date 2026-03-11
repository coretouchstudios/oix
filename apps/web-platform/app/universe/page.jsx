'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function Agent({position,color}){

const ref = useRef()

useFrame(()=>{
if(ref.current){
ref.current.rotation.y += 0.01
}
})

return (
<mesh ref={ref} position={position}>
  <sphereGeometry args={[0.3,32,32]} />
  <meshStandardMaterial color={color}/>
</mesh>
)

}

function Node({position}){

return(
<mesh position={position}>
  <boxGeometry args={[0.5,0.5,0.5]}/>
  <meshStandardMaterial color="cyan"/>
</mesh>
)

}

export default function Universe(){

const nodes = [
[5,0,0],
[-5,0,0],
[0,5,0],
[0,-5,0],
[0,0,5]
]

const agents = [
[1,1,0],
[-1,2,0],
[2,-1,1],
[-2,-1,-1]
]

return(

<div className="w-full h-screen bg-black">

<Canvas camera={{position:[0,0,10]}}>

<ambientLight intensity={0.6}/>
<pointLight position={[10,10,10]}/>

<Stars />

{nodes.map((p,i)=>(
<Node key={i} position={p}/>
))}

{agents.map((p,i)=>(
<Agent key={i} position={p} color="orange"/>
))}

<OrbitControls/>

</Canvas>

</div>

)

}