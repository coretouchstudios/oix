"use client"
import {useEffect,useState} from "react"
import {getPlugins,installPlugin} from "../../services/pluginService"
export default function Marketplace(){
const [plugins,setPlugins]=useState<any[]>([])
useEffect(()=>{getPlugins().then(setPlugins)},[])
async function install(id:string){
await installPlugin(id)
alert("Plugin installed")
}
return(
<div>
<h1>Node Marketplace</h1>
{plugins.map(p=>(
<div key={p.id}>
<h3>{p.name}</h3>
<p>Downloads: {p.downloads}</p>
<button onClick={()=>install(p.id)}>Install</button>
</div>
))}
</div>
)
}
