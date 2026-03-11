Write-Host "🚀 Creating OIX Dashboard..."

$root="dashboard"
New-Item $root -ItemType Directory -Force | Out-Null
Set-Location $root

$folders=@(
"app/ai",
"app/automation",
"app/control",
"app/dashboard",
"app/marketplace",
"app/startups",
"components/ai",
"components/control",
"components/layout",
"components/ui",
"hooks",
"lib",
"pages",
"services",
"styles"
)

foreach($f in $folders){
New-Item -ItemType Directory -Force -Path $f | Out-Null
}

# package.json
@"
{
"name":"oix-dashboard",
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
"axios":"^1.7.0"
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
const nextConfig = {
reactStrictMode:true
}
module.exports = nextConfig
"@ | Set-Content next.config.js

# css
@"
body{
margin:0;
font-family:Arial;
background:#0b0f19;
color:white;
}
.container{
padding:40px;
}
.card{
background:#111827;
padding:20px;
border-radius:10px;
}
"@ | Set-Content styles/global.css

# home
@"
import Link from 'next/link'

export default function Home(){
return(
<div className='container'>
<h1>OIX Control Center</h1>

<ul>
<li><Link href='/dashboard'>Dashboard</Link></li>
<li><Link href='/ai'>AI</Link></li>
<li><Link href='/automation'>Automation</Link></li>
<li><Link href='/control'>Control</Link></li>
<li><Link href='/marketplace'>Marketplace</Link></li>
<li><Link href='/startups'>Startups</Link></li>
</ul>

</div>
)
}
"@ | Set-Content pages/index.tsx

# dashboard page
@"
export default function Page(){
return(
<div className='container'>
<h2>OIX Dashboard</h2>
<p>System overview</p>
</div>
)
}
"@ | Set-Content app/dashboard/page.tsx

# ai page
@"
import AIConsole from '../../components/ai/AIConsole'

export default function Page(){
return(
<div className='container'>
<h2>AI Control</h2>
<AIConsole/>
</div>
)
}
"@ | Set-Content app/ai/page.tsx

# automation page
@"
export default function Page(){
return(
<div className='container'>
<h2>Automation</h2>
<p>Automation system</p>
</div>
)
}
"@ | Set-Content app/automation/page.tsx

# control page
@"
import ControlPanel from '../../components/control/ControlPanel'

export default function Page(){
return(
<div className='container'>
<h2>System Control</h2>
<ControlPanel/>
</div>
)
}
"@ | Set-Content app/control/page.tsx

# marketplace
@"
export default function Page(){
return(
<div className='container'>
<h2>Marketplace</h2>
<p>AI tools marketplace</p>
</div>
)
}
"@ | Set-Content app/marketplace/page.tsx

# startups
@"
export default function Page(){
return(
<div className='container'>
<h2>Startup Builder</h2>
<p>Create AI startups</p>
</div>
)
}
"@ | Set-Content app/startups/page.tsx

# ai console
@"
export default function AIConsole(){
return(
<div className='card'>
<h3>AI Console</h3>
<p>Interact with OIX agents</p>
</div>
)
}
"@ | Set-Content components/ai/AIConsole.tsx

# control panel
@"
export default function ControlPanel(){
return(
<div className='card'>
<h3>Control Panel</h3>
<p>Manage system services</p>
</div>
)
}
"@ | Set-Content components/control/ControlPanel.tsx

# navbar
@"
export default function Navbar(){
return(
<div className='card'>
<h3>OIX</h3>
</div>
)
}
"@ | Set-Content components/layout/Navbar.tsx

# sidebar
@"
import Link from 'next/link'

export default function Sidebar(){
return(
<div className='card'>
<Link href='/dashboard'>Dashboard</Link><br/>
<Link href='/ai'>AI</Link><br/>
<Link href='/automation'>Automation</Link>
</div>
)
}
"@ | Set-Content components/layout/Sidebar.tsx

# card
@"
export default function Card({children}:{children:any}){
return(
<div className='card'>
{children}
</div>
)
}
"@ | Set-Content components/ui/Card.tsx

# hook
@"
import {useState} from 'react'

export default function useSystemStatus(){

const [status,setStatus]=useState('online')

return {status,setStatus}

}
"@ | Set-Content hooks/useSystemStatus.ts

# api
@"
import axios from 'axios'

export const api=axios.create({
baseURL:'http://localhost:8000'
})
"@ | Set-Content lib/api.ts

# service
@"
import {api} from '../lib/api'

export const OIXService={

async runTask(task:string){
const res=await api.post('/task',{task})
return res.data
}

}
"@ | Set-Content services/oix.service.ts

Write-Host ""
Write-Host "✅ OIX DASHBOARD CREATED"
Write-Host ""
Write-Host "Run:"
Write-Host "cd dashboard"
Write-Host "npm install"
Write-Host "npm run dev"
