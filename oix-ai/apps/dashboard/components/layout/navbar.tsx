export default function Navbar() {
  return (
    <div className="w-full p-4 border-b flex justify-between">
      <h1 className="font-bold text-xl">OIX</h1>
      <div className="flex gap-6">
        <a href="/dashboard">Dashboard</a>
        <a href="/ai">AI</a>
        <a href="/startups">Startups</a>
        <a href="/automation">Automation</a>
      </div>
    </div>
  )
}
