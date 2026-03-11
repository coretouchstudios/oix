'use client'

import {useEffect} from 'react'
import {useagentsStore} from './agents.store'
import {getagentsData} from './agents.service'

export default function Page(){

const {items,setItems}=useagentsStore()

useEffect(()=>{
getagentsData().then(setItems)
},[])

return(

<div style={{padding:30}}>

<h1> MODULE</h1>

<div className='grid'>

{items.map((i:any)=>(

<div className='card' key={i.id}>
{i.name}
</div>

))}

</div>

</div>

)

}
