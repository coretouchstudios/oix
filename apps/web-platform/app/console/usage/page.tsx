

"use client"

import Layout from "@/components/console/layout/DashboardLayout"
import {BarChart,Bar,XAxis,YAxis,Tooltip} from "recharts"

const data=[
{name:"Chat",usage:10},
{name:"Agents",usage:5},
{name:"Workflows",usage:2}
]

export default function Usage(){

return(

<Layout>

<h2>Usage Analytics</h2>

<BarChart width={500} height={300} data={data}>
<XAxis dataKey="name"/>
<YAxis/>
<Tooltip/>
<Bar dataKey="usage"/>
</BarChart>

</Layout>

)

}


