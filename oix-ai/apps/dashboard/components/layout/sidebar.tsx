export default function Sidebar() {
  return (
    <div className="w-60 h-screen border-r p-4">
      <div className="font-bold text-lg mb-6">OIX OS</div>

      <nav className="flex flex-col gap-3">
        <a href="/dashboard">Dashboard</a>
        <a href="/ai">AI Assistant</a>
        <a href="/startups">Startup Builder</a>
        <a href="/automation">Automation</a>
        <a href="/marketplace">Marketplace</a>
      </nav>
    </div>
  )
}
