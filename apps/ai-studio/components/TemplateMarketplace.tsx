"use client"

import {templates} from "../lib/templates"

export default function TemplateMarketplace({load}:any){

return(

<div style={{padding:40}}>

<h2>Workflow Templates</h2>

{Object.keys(templates).map(name=>(

<div key={name} style={{
padding:20,
marginBottom:10,
background:"#1e293b",
borderRadius:10
}}>

<h3>{name}</h3>

<button onClick={()=>load(templates[name])}>
Load Template
</button>

</div>

))}

</div>

)

}