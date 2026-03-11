import Sidebar from "@/components/layout/sidebar"

export default function ControlPanel(){

  return(

    <div className="flex">

      <Sidebar/>

      <div className="p-10 w-full">

        <h1 className="text-3xl font-bold mb-8">
          OIX Global Control Panel
        </h1>

        <div className="grid grid-cols-3 gap-6">

          <div className="border p-6 rounded">
            <h2 className="font-bold text-lg">Agent System</h2>
            <p className="text-sm mt-2">
              Manage AI agents and runtime
            </p>
          </div>

          <div className="border p-6 rounded">
            <h2 className="font-bold text-lg">Swarm System</h2>
            <p className="text-sm mt-2">
              Control multi‑agent collaboration
            </p>
          </div>

          <div className="border p-6 rounded">
            <h2 className="font-bold text-lg">Startup Factory</h2>
            <p className="text-sm mt-2">
              Generate startups automatically
            </p>
          </div>

          <div className="border p-6 rounded">
            <h2 className="font-bold text-lg">Self‑Build Engine</h2>
            <p className="text-sm mt-2">
              Expand platform capabilities
            </p>
          </div>

          <div className="border p-6 rounded">
            <h2 className="font-bold text-lg">Services</h2>
            <p className="text-sm mt-2">
              Monitor running services
            </p>
          </div>

          <div className="border p-6 rounded">
            <h2 className="font-bold text-lg">Deployments</h2>
            <p className="text-sm mt-2">
              Manage infrastructure
            </p>
          </div>

        </div>

      </div>

    </div>

  )

}
