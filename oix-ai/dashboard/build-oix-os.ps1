Write-Host "🚀 Building OIX AI Operating System Dashboard..."

$root="oix-os-dashboard"
New-Item $root -ItemType Directory -Force | Out-Null
Set-Location $root

$folders=@(
"app",
"app/agents",
"app/logs",
"app/terminal",
"app/workflows",
"app/memory",
"app/analytics",
"components",
"components/layout",
"components/agents",
"components/logs",
"components/terminal",
"components/workflows",
"components/memory",
"components/ui",
"hooks",
"lib",
"services",
"styles"
)

foreach($f in $folders){New-Item -ItemType Directory -Force -Path $f | Out-Null}

# package.json
@"
{
"name":"oix-ai-os",
"private":true,
"scripts":{
"dev":"next dev -p 3000",
"build":"next build",
"start":"next start"
},
"dependencies":{
"next":"latest",
"react":"18.2.0",
"react-dom":"18.2.0",
"axios":"^1.7.0",
"xterm":"^5.3.0"
}
}
"@ | Set-Content package.json

# tsconfig
@"
{
"compilerOptions":{
"target":"es6",
"lib":["dom","dom.iterable","esnext"],
"module":"esnext",
"moduleResolution":"bundler",
"jsx":"preserve",
"strict":true,
"noEmit":true
}
}
"@ | Set-Content tsconfig.json

# next config
@"
const nextConfig={reactStrictMode:true}
module.exports=nextConfig
"@ | Set-Content next.config.js

# global css
@"
body{
background:#0b0f19;
color:white;
font-family:Arial;
margin:0;
}
.layout{
display:flex;
}
main{
flex:1;
padding:30px;
}
.sidebar{
width:220px;
background:#111827;
padding:20px;
}
.card{
background:#111827;
padding:20px;
margin:10px 0;
border-radius:8px;
}
"@ | Set-Content styles/global.css

# layout
@"
import '../styles/global.css'
import Navbar from '../components/layout/Navbar'
import Sidebar from '../components/layout/Sidebar'

export default function RootLayout({children}:{children:React.ReactNode}){
return(
<html>
<body>
<Navbar/>
<div className='layout'>
<Sidebar/>
<main>{children}</main>
</div>
</body>
</html>
)
}
"@ | Set-Content app/layout.tsx

# home
@"
export default function Page(){
return(
<div>
<h1>OIX AI Operating System</h1>
<p>Control agents, workflows, memory and automation.</p>
</div>
)
}
"@ | Set-Content app/page.tsx

# navbar
@"
export default function Navbar(){
return(
<div style={{background:'#111827',padding:'15px'}}>
<b>OIX AI OS</b>
</div>
)
}
"@ | Set-Content components/layout/Navbar.tsx

# sidebar
@"
import Link from 'next/link'

export default function Sidebar(){
return(
<div className='sidebar'>
<p><Link href='/'>Home</Link></p>
<p><Link href='/agents'>Agents</Link></p>
<p><Link href='/logs'>Logs</Link></p>
<p><Link href='/terminal'>Terminal</Link></p>
<p><Link href='/workflows'>Workflows</Link></p>
<p><Link href='/memory'>Memory</Link></p>
<p><Link href='/analytics'>Analytics</Link></p>
</div>
)
}
"@ | Set-Content components/layout/Sidebar.tsx

# agent page
@"
import AgentMonitor from '../../components/agents/AgentMonitor'

export default function Page(){
return(
<div>
<h2>Agent Monitoring</h2>
<AgentMonitor/>
</div>
)
}
"@ | Set-Content app/agents/page.tsx

# agent monitor
@"
import {useEffect,useState} from 'react'

export default function AgentMonitor(){

const [agents,setAgents]=useState<any[]>([])

useEffect(()=>{
setAgents([
{name:'ResearchAgent',status:'running'},
{name:'CodingAgent',status:'idle'},
{name:'AutomationAgent',status:'running'}
])
},[])

return(
<div>
{agents.map((a,i)=>(
<div key={i} className='card'>
<b>{a.name}</b> — {a.status}
</div>
))}
</div>
)
}
"@ | Set-Content components/agents/AgentMonitor.tsx

# logs page
@"
import LogStream from '../../components/logs/LogStream'

export default function Page(){
return(
<div>
<h2>System Logs</h2>
<LogStream/>
</div>
)
}
"@ | Set-Content app/logs/page.tsx

# logs
@"
import {useEffect,useState} from 'react'

export default function LogStream(){

const [logs,setLogs]=useState<string[]>([])

useEffect(()=>{

const interval=setInterval(()=>{
setLogs(prev=>[
...prev,
'Agent executed task '+new Date().toLocaleTimeString()
])
},2000)

return()=>clearInterval(interval)

},[])

return(
<div className='card'>
{logs.map((l,i)=>(
<div key={i}>{l}</div>
))}
</div>
)
}
"@ | Set-Content components/logs/LogStream.tsx

# terminal page
@"
import TerminalConsole from '../../components/terminal/TerminalConsole'

export default function Page(){
return(
<div>
<h2>OIX Terminal</h2>
<TerminalConsole/>
</div>
)
}
"@ | Set-Content app/terminal/page.tsx

# terminal console
@"
import {useState} from 'react'

export default function TerminalConsole(){

const [output,setOutput]=useState<string[]>([])

function run(cmd:string){
setOutput(prev=>[
...prev,
'> '+cmd,
'executed'
])
}

return(
<div className='card'>
<button onClick={()=>run('run agent task')}>
Run Command
</button>

{output.map((o,i)=>(
<div key={i}>{o}</div>
))}
</div>
)
}
"@ | Set-Content components/terminal/TerminalConsole.tsx

# workflows
@"
import WorkflowBuilder from '../../components/workflows/WorkflowBuilder'

export default function Page(){
return(
<div>
<h2>Workflow Builder</h2>
<WorkflowBuilder/>
</div>
)
}
"@ | Set-Content app/workflows/page.tsx

# workflow builder
@"
export default function WorkflowBuilder(){
return(
<div className='card'>
<p>Drag and connect tasks to create AI workflows.</p>
<button>Create Workflow</button>
</div>
)
}
"@ | Set-Content components/workflows/WorkflowBuilder.tsx

# memory
@"
import VectorViewer from '../../components/memory/VectorViewer'

export default function Page(){
return(
<div>
<h2>Vector Memory</h2>
<VectorViewer/>
</div>
)
}
"@ | Set-Content app/memory/page.tsx

# vector viewer
@"
export default function VectorViewer(){

const vectors=[
{id:1,vector:'[0.21,0.44,0.88]'},
{id:2,vector:'[0.19,0.62,0.77]'}
]

return(
<div>
{vectors.map(v=>(
<div key={v.id} className='card'>
Vector {v.id}: {v.vector}
</div>
))}
</div>
)
}
"@ | Set-Content components/memory/VectorViewer.tsx

# analytics
@"
export default function Page(){
return(
<div>
<h2>Analytics</h2>
<p>Agent performance and system metrics.</p>
</div>
)
}
"@ | Set-Content app/analytics/page.tsx

Write-Host ""
Write-Host "✅ OIX AI OS Dashboard Created"
Write-Host ""
Write-Host "Next Steps:"
Write-Host "cd oix-os-dashboard"
Write-Host "npm install"
Write-Host "npm run dev"
Write-Host ""
Write-Host "Open http://localhost:3000"
