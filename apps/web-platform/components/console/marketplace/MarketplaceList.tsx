
"use client"

import {useEffect,useState} from "react"
import axios from "axios"

export default function MarketplaceList(){

const [apps,setApps]=useState([])

useEffect(()=>{

async function load(){

const res=await axios.get("http://localhost:7000/v1/marketplace/apps")

setApps(res.data||[])

}

load()

},[])

return(

<div>

<h2>OIX AI Marketplace</h2>

<ul>

{apps.map((a:any)=>(
<li key={a.id}>
<b>{a.name}</b> — {a.type}
</li>
))}

</ul>

</div>

)

}

