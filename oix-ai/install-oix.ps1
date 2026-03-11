
Write-Host "🚀 Installing OIX AI OS Dashboard..."

$dirs=@(
"dashboard/app",
"dashboard/app/agents",
"dashboard/app/workflows",
"dashboard/app/memory",
"dashboard/app/traces",
"dashboard/app/logs",
"dashboard/app/terminal",
"dashboard/app/analytics",
"dashboard/app/models",

"dashboard/components/layout",
"dashboard/components/ui",
"dashboard/components/agents",
"dashboard/components/workflow",
"dashboard/components/terminal",
"dashboard/components/charts",
"dashboard/components/memory",

"dashboard/modules/agents",
"dashboard/modules/workflows",
"dashboard/modules/memory",
"dashboard/modules/traces",
"dashboard/modules/terminal",
"dashboard/modules/analytics",

"dashboard/services",
"dashboard/hooks",
"dashboard/store",
"dashboard/config",
"dashboard/styles",
"dashboard/types",
"dashboard/utils"
)

foreach($d in $dirs){New-Item -ItemType Directory -Force -Path $d | Out-Null}

Set-Content dashboard/app/layout.tsx @"
import "../styles/globals.css"
import Sidebar from "../components/layout/Sidebar"
import Navbar from "../components/layout/Navbar"

export default function RootLayout({children}:any){
return(
<html>
<body>
<div className="layout">
<Sidebar/>
<div className="main">
<Navbar/>
<main>{children}</main>
</div>
</div>
</body>
</html>
)
}
"@

Set-Content dashboard/app/page.tsx @"
export default function Page(){
return(
<div>
<h1>OIX Control Center</h1>

<div className='grid'>

<div className='card'>Agents Running</div>
<div className='card'>Active Workflows</div>
<div className='card'>Vector Memories</div>
<div className='card'>System Events</div>

</div>

</div>
)
}
"@

Set-Content dashboard/components/layout/Sidebar.tsx @"
"use client"
import Link from "next/link"

export default function Sidebar(){
return(
<div className="sidebar">

<h2>OIX</h2>

<Link href="/">Dashboard</Link>
<Link href="/agents">Agents</Link>
<Link href="/workflows">Workflows</Link>
<Link href="/memory">Memory</Link>
<Link href="/traces">Traces</Link>
<Link href="/terminal">Terminal</Link>
<Link href="/analytics">Analytics</Link>

</div>
)
}
"@

Set-Content dashboard/components/layout/Navbar.tsx @"
export default function Navbar(){
return(
<div className="navbar">
<b>OIX AI OS</b>
</div>
)
}
"@

Set-Content dashboard/styles/globals.css @"
body{
margin:0;
background:#070b14;
color:white;
font-family:system-ui;
}

.layout{
display:flex;
height:100vh;
}

.sidebar{
width:230px;
background:#0f1629;
padding:20px;
display:flex;
flex-direction:column;
gap:12px;
}

.sidebar a{
color:#9fb3ff;
text-decoration:none;
}

.main{
flex:1;
display:flex;
flex-direction:column;
}

.navbar{
height:60px;
background:#131c34;
display:flex;
align-items:center;
padding-left:20px;
}

.grid{
display:grid;
grid-template-columns:repeat(auto-fill,minmax(220px,1fr));
gap:20px;
padding:30px;
}

.card{
background:#131c34;
padding:20px;
border-radius:10px;
}
"@

Write-Host "✅ OIX Dashboard Installed Successfully"
Write-Host "Next Step:"
Write-Host "cd dashboard"
Write-Host "npm install next react react-dom"
Write-Host "npm run dev"

