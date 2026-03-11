export default function StartupFactoryControl(){

  return(

    <div className="border p-6 rounded">

      <h2 className="text-xl font-bold mb-3">
        Startup Factory
      </h2>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Startup idea"
      />

      <button className="bg-black text-white px-4 py-2">
        Generate Startup
      </button>

    </div>

  )

}
