import Sidebar from "@/components/layout/sidebar"

export default function AIPage() {
  return (
    <div className="flex">

      <Sidebar/>

      <div className="p-10 w-full">

        <h1 className="text-2xl font-bold mb-6">OIX AI Assistant</h1>

        <textarea
          className="w-full h-40 border p-3"
          placeholder="Ask OIX AI anything..."
        />

        <button className="mt-4 bg-black text-white px-6 py-2">
          Send
        </button>

      </div>

    </div>
  )
}
