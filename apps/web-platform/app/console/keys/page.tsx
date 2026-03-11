

"use client"

import {useState} from "react"
import Layout from "@/components/console/layout/DashboardLayout"
import {createKey} from "@/lib/oix/api"

export default function Keys(){

const[key,setKey]=useState("")

async function generate(){

const res=await createKey()

setKey(res.data.apiKey)

}

return(

<Layout>

<h2>API Keys</h2>

<button onClick={generate}>
Generate API Key
</button>

{key && <p>{key}</p>}

</Layout>

)

}


