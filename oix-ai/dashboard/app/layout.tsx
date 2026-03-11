import '../styles/globals.css'
import Link from 'next/link'

export default function RootLayout({children}:any){
return(

<html>
<body>

<div className="layout">

<div className="sidebar">

<h2>OIX</h2>

<Link href="/">Home</Link>
<Link href="/agents">Agents</Link>
<Link href="/ai">AI</Link>
<Link href="/analytics">Analytics</Link>
<Link href="/automation">Automation</Link>
<Link href="/control">Control</Link>
<Link href="/dashboard">Dashboard</Link>
<Link href="/logs">Logs</Link>
<Link href="/marketplace">Marketplace</Link>
<Link href="/memory">Memory</Link>
<Link href="/models">Models</Link>
<Link href="/startups">Startups</Link>
<Link href="/terminal">Terminal</Link>
<Link href="/traces">Traces</Link>
<Link href="/workflows">Workflows</Link>

</div>

<div className="main">

<div className="navbar">
OIX AI Operating System
</div>

<div className="content">
{children}
</div>

</div>

</div>

</body>
</html>

)
}
