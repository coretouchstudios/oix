'use client'

import {useEffect} from 'react'
import {useterminalStore} from './terminal.store'
import {getterminalData} from './terminal.service'

export default function Page(){

const {items,setItems}=useterminalStore()

useEffect(()=>{
getterminalData().then(setItems)
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
