import Sidebar from "@/components/layout/sidebar"

export default function Marketplace() {
  return (
    <div className="flex">

      <Sidebar/>

      <div className="p-10">

        <h1 className="text-3xl font-bold">OIX Marketplace</h1>

        <p className="mt-4">
          Discover and deploy AI tools built on OIX.
        </p>

      </div>

    </div>
  )
}
