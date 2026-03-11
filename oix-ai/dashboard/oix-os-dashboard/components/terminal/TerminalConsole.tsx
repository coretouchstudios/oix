"use client"
import {useState} from 'react'

export default function TerminalConsole(){

const [output,setOutput]=useState<string[]>([])

function run(cmd:string){
setOutput(prev=>[
...prev,
'> '+cmd,
'executed'
])
}

return(
<div className='card'>
<button onClick={()=>run('run agent task')}>
Run Command
</button>

{output.map((o,i)=>(
<div key={i}>{o}</div>
))}
</div>
)
}
