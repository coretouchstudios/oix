import StatCard from "../components/StatCard"

export default function Dashboard() {

  return (
    <div>

      <h1>OIX Admin Dashboard</h1>

      <div className="grid">

        <StatCard title="Users" value="124" />

        <StatCard title="Workflows" value="392" />

        <StatCard title="Plugins" value="87" />

        <StatCard title="Executions Today" value="12,901" />

      </div>

    </div>
  )
}