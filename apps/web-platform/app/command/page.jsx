'use client'

import dynamic from "next/dynamic"

const Swarm = dynamic(()=>import("../swarm/page"),{ssr:false})
const Reasoning = dynamic(()=>import("../reasoning/page"),{ssr:false})
const Startups = dynamic(()=>import("../startups/page"),{ssr:false})
const Replay = dynamic(()=>import("../replay/page"),{ssr:false})

export default function CommandCenter(){

return(

<div className="w-screen h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-4">

<h1 className="text-3xl font-bold mb-4">
🚀 OIX AI Command Center
</h1>

<div className="grid grid-cols-3 grid-rows-2 gap-4 h-[90vh]">

{/* Universe */}

<div className="glass col-span-2">
<iframe
src="/universe"
className="w-full h-full"
/>
</div>

{/* Swarm */}

<div className="glass">
<Swarm/>
</div>

{/* Reasoning */}

<div className="glass">
<Reasoning/>
</div>

{/* Startup Generator */}

<div className="glass">
<Startups/>
</div>

{/* Replay */}

<div className="glass">
<Replay/>
</div>

</div>

<style jsx>{`

.glass{
backdrop-filter: blur(20px);
background: rgba(255,255,255,0.05);
border:1px solid rgba(255,255,255,0.15);
border-radius:16px;
overflow:hidden;
}

`}</style>

</div>

)

}