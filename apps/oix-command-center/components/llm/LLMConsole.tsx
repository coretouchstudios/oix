"use client"
import {useState} from "react"

export default function LLMConsole(){

const [messages,setMessages]=useState<string[]>([])

function simulate(){

setMessages([...messages,"LLM Response: "+Math.random().toString(36)])

}

return(
<div>
<h2>Streaming LLM Output</h2>
<button onClick={simulate}>Simulate Stream</button>
{messages.map((m,i)=>(
<div key={i}>{m}</div>
))}
</div>
)
}
