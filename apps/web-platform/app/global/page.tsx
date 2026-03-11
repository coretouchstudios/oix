
"use client"

import PlanetMap from "../../components/global/map/PlanetMap"
import AgentSwarm from "../../components/global/swarm/AgentSwarm"
import KnowledgeMesh from "../../components/global/knowledge/KnowledgeMesh"
import EconomyMarket from "../../components/global/economy/EconomyMarket"

export default function GlobalNetwork(){

return(

<div style={{height:"100vh",display:"grid",gridTemplateRows:"55% 45%"}}>

<div style={{display:"grid",gridTemplateColumns:"60% 40%"}}>
<PlanetMap/>
<AgentSwarm/>
</div>

<div style={{display:"grid",gridTemplateColumns:"50% 50%"}}>
<KnowledgeMesh/>
<EconomyMarket/>
</div>

</div>

)

}

