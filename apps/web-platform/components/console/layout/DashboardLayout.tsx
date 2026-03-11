

"use client"

import Link from "next/link"

export default function Layout({children}:{children:any}){

return(

<div style={{display:"flex",height:"100vh"}}>

<div style={{
width:250,
background:"#111",
color:"#fff",
padding:20
}}>

<h2>OIX Console</h2>

<nav style={{display:"flex",flexDirection:"column",gap:10}}>

<Link href="/console">Dashboard</Link>
<Link href="/console/keys">API Keys</Link>
<Link href="/console/usage">Usage</Link>
<Link href="/console/agents">Agents</Link>
<Link href="/console/workflows">Workflows</Link>

</nav>

</div>

<div style={{flex:1,padding:40}}>
{children}
</div>

</div>

)

}


