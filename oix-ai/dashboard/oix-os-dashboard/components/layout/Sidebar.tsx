"use client"
import Link from 'next/link'

export default function Sidebar(){
return(
<div className='sidebar'>

<b style={{marginBottom:'10px'}}>Navigation</b>

<Link href="/">Dashboard</Link>
<Link href="/agents">Agents</Link>
<Link href="/workflows">Workflows</Link>
<Link href="/memory">Memory</Link>
<Link href="/logs">Logs</Link>
<Link href="/terminal">Terminal</Link>
<Link href="/analytics">Analytics</Link>

</div>
)
}
