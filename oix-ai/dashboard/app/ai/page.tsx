'use client'

import {useEffect} from 'react'
import {useaiStore} from './ai.store'
import {getaiData} from './ai.service'

export default function Page(){

const {items,setItems}=useaiStore()

useEffect(()=>{
getaiData().then(setItems)
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
