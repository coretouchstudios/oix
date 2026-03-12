import { useState } from "react"

type Agent = {
  name: string
  status: string
}

export default function AgentMonitor() {

  const [agents, setAgents] = useState<Agent[]>([])

  setAgents([
    { name: "Research Agent", status: "running" },
    { name: "Writer Agent", status: "idle" },
    { name: "Analysis Agent", status: "running" }
  ])

  return <div>Agent Monitor</div>
}