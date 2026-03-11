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
