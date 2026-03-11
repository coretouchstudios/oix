Write-Host "⚡ Repairing OIX..."

# folders
$folders = @(
"backend",
"dashboard",
"dashboard/app",
"dashboard/components",
"dashboard/lib"
)

foreach($f in $folders){
 New-Item -ItemType Directory -Force -Path $f | Out-Null
}

# backend
@"
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
 CORSMiddleware,
 allow_origins=["*"],
 allow_credentials=True,
 allow_methods=["*"],
 allow_headers=["*"]
)

agents = [
 {"name":"builder","status":"online"},
 {"name":"research","status":"online"},
 {"name":"automation","status":"online"}
]

@app.get("/")
def root():
 return {"system":"OIX ONLINE"}

@app.get("/agents")
def get_agents():
 return agents
"@ | Set-Content backend/server.py

# package.json
@"
{
 "name":"oix-dashboard",
 "private":true,
 "scripts":{
  "dev":"next dev"
 },
 "dependencies":{
  "next":"latest",
  "react":"latest",
  "react-dom":"latest"
 }
}
"@ | Set-Content dashboard/package.json

# api
@"
const API = "http://127.0.0.1:8000"

export async function agents(){
 const res = await fetch(API+"/agents",{cache:"no-store"})
 return res.json()
}
"@ | Set-Content dashboard/lib/api.js

# swarm
@"
"use client"
import {useEffect,useState} from "react"
import {agents} from "../lib/api"

export default function Swarm(){

const [list,setList]=useState([])

useEffect(()=>{
 async function load(){
  const data = await agents()
  setList(data)
 }
 load()
},[])

return(
<div>
<h2>Agent Swarm</h2>
{list.map((a,i)=>(
<div key={i}>{a.name} - {a.status}</div>
))}
</div>
)
}
"@ | Set-Content dashboard/components/Swarm.js

# terminal
@"
"use client"
import {useState} from "react"

export default function Terminal(){

const [cmd,setCmd]=useState("")

return(
<div>
<h2>OIX Terminal</h2>
<input value={cmd} onChange={(e)=>setCmd(e.target.value)} />
</div>
)
}
"@ | Set-Content dashboard/components/Terminal.js

# page
@"
import Swarm from "../components/Swarm"
import Terminal from "../components/Terminal"

export default function Page(){
return(
<main>
<h1>OIX Control Center</h1>
<Swarm/>
<Terminal/>
</main>
)
}
"@ | Set-Content dashboard/app/page.js

# install dashboard deps
cd dashboard
npm install next react react-dom

cd ..

pip install fastapi uvicorn

Write-Host ""
Write-Host "✅ OIX REPAIR COMPLETE"
Write-Host ""
Write-Host "Run backend:"
Write-Host "cd backend ; uvicorn server:app --reload --port 8000"
Write-Host ""
Write-Host "Run dashboard:"
Write-Host "cd dashboard ; npm run dev"
