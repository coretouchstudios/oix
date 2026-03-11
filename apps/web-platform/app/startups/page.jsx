'use client'

import { useEffect, useState } from "react"
import io from "socket.io-client"

export default function Startups(){

const [ideas,setIdeas] = useState([])

useEffect(()=>{

const socket = io("http://localhost:7900")

socket.on("startup",idea=>{

setIdeas(i=>[idea,...i.slice(0,20)])

})

},[])

return(

<div className="w-full h-screen bg-black text-white p-6">

<h1 className="text-3xl mb-6">
💡 AI Startup Generator
</h1>

<div className="space-y-4">

{ideas.map((idea,i)=>(

<div
key={i}
className="border border-purple-500 p-4 rounded-lg bg-gray-900"
>

<div className="text-xl text-purple-400">
{idea.name}
</div>

<div className="text-gray-300">
{idea.description}
</div>

</div>

))}

</div>

</div>

)

}