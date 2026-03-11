
"use client"

import Layout from "@/components/console/layout/DashboardLayout"
import AgentsMonitor from "@/components/console/monitor/AgentsMonitor"
import WorkersMonitor from "@/components/console/monitor/WorkersMonitor"
import MemoryGraph from "@/components/console/monitor/MemoryGraph"

export default function Control(){

return(

<Layout>

<h1>OIX Live AI Control Center</h1>

<AgentsMonitor/>

<WorkersMonitor/>

<MemoryGraph/>

</Layout>

)

}

