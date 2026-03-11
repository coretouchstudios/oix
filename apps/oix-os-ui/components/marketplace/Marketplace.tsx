"use client"
import {useState,useEffect} from "react"

export default function Marketplace(){

const [items,setItems]=useState<any[]>([])

useEffect(()=>{
setItems([
{name:"AI Research Agent"},
{name:"SEO Content Generator"}
])
},[])

return(
<div>
<h2>AI Marketplace</h2>
{items.map((i,index)=>(
<div key={index}>
{i.name} <button>Install</button>
</div>
))}
</div>
)

}
