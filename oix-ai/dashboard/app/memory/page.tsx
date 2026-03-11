'use client'

import {useEffect} from 'react'
import {usememoryStore} from './memory.store'
import {getmemoryData} from './memory.service'

export default function Page(){

const {items,setItems}=usememoryStore()

useEffect(()=>{
getmemoryData().then(setItems)
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
