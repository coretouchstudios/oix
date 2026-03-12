"use client"

import { useState } from "react"
import axios from "axios"

export default function Home(){

  const [prompt,setPrompt] = useState("")
  const [response,setResponse] = useState("")

  async function runAgent(){

    const res = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/agents/run",
      { task: prompt }
    )

    setResponse(JSON.stringify(res.data,null,2))

  }

  return(

    <div style={{padding:40}}>

      <h1>OIX AI Studio</h1>

      <input
        value={prompt}
        onChange={(e)=>setPrompt(e.target.value)}
        placeholder="Ask the agent..."
        style={{width:400}}
      />

      <button onClick={runAgent}>
        Run Agent
      </button>

      <pre>{response}</pre>

    </div>

  )
}