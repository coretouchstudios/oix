
"use client"

import {LineChart,Line,XAxis,YAxis,Tooltip} from "recharts"

const data=[
{name:"10:00",runs:4},
{name:"11:00",runs:7},
{name:"12:00",runs:5},
{name:"13:00",runs:9}
]

export default function WorkflowGraph(){

return(

<div style={{background:"#111",padding:20}}>

<h3>Workflow Executions</h3>

<LineChart width={400} height={200} data={data}>
<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>
<Line type="monotone" dataKey="runs" stroke="#38bdf8"/>
</LineChart>

</div>

)

}

