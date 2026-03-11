'use client'

import {useEffect} from 'react'
import {useworkflowsStore} from './workflows.store'
import {getworkflowsData} from './workflows.service'

export default function Page(){

const {items,setItems}=useworkflowsStore()

useEffect(()=>{
getworkflowsData().then(setItems)
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
