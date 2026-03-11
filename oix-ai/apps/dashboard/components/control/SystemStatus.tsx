export default function SystemStatus(){

  return(

    <div className="border p-6 rounded">

      <h2 className="text-xl font-bold mb-3">
        System Status
      </h2>

      <ul className="text-sm">

        <li>Agents: Running</li>
        <li>Swarm: Ready</li>
        <li>Startup Factory: Active</li>
        <li>Platform Builder: Online</li>

      </ul>

    </div>

  )

}
