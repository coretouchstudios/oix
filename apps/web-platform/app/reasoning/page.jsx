'use client'

import { useEffect, useState } from "react"
import io from "socket.io-client"

export default function Reasoning(){

const [tokens,setTokens] = useState([])

useEffect(()=>{

const socket = io("http://localhost:7700")

socket.on("token",data=>{

setTokens(t=>[...t.slice(-30),data])

})

},[])

return (

<div className="w-full h-screen bg-black text-green-400 p-6 font-mono">

<h1 className="text-3xl mb-6">
🧠 Live AI Reasoning Stream
</h1>

<div className="grid grid-cols-3 gap-6">

{tokens.map((t,i)=>(

<div
key={i}
className="border border-green-500 p-3 rounded animate-pulse"
>

<div>Token: {t.token}</div>
<div>Node: {t.node}</div>

</div>

))}

</div>

</div>

)

}