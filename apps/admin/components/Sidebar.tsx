import Link from "next/link"

export default function Sidebar() {

  return (

    <div className="sidebar">

      <h2>OIX</h2>

      <nav>

        <Link href="/">Dashboard</Link>

        <Link href="/users">Users</Link>

        <Link href="/workflows">Workflows</Link>

        <Link href="/nodes">Nodes</Link>

        <Link href="/plugins">Plugins</Link>

        <Link href="/analytics">Analytics</Link>

      </nav>

    </div>
  )
}