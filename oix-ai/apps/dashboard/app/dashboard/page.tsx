import Sidebar from "@/components/layout/sidebar"

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar/>

      <div className="p-10">
        <h1 className="text-3xl font-bold">OIX Dashboard</h1>

        <div className="grid grid-cols-3 gap-6 mt-10">

          <div className="p-6 border rounded">
            <h2 className="font-bold">AI Assistant</h2>
            <p>Access OIX AI tools</p>
          </div>

          <div className="p-6 border rounded">
            <h2 className="font-bold">Startup Builder</h2>
            <p>Create AI startups</p>
          </div>

          <div className="p-6 border rounded">
            <h2 className="font-bold">Automation</h2>
            <p>Build AI workflows</p>
          </div>

        </div>
      </div>
    </div>
  )
}
