import Sidebar from "@/components/layout/sidebar"

export default function Startups() {
  return (
    <div className="flex">

      <Sidebar/>

      <div className="p-10">

        <h1 className="text-3xl font-bold">Startup Builder</h1>

        <p className="mt-4">
          Generate SaaS startups automatically using OIX AI.
        </p>

        <button className="mt-6 bg-black text-white px-6 py-2">
          Generate Startup
        </button>

      </div>

    </div>
  )
}
