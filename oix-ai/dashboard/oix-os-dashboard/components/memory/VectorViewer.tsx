export default function VectorViewer(){

const vectors=[
{id:1,vector:'[0.21,0.44,0.88]'},
{id:2,vector:'[0.19,0.62,0.77]'}
]

return(
<div>
{vectors.map(v=>(
<div key={v.id} className='card'>
Vector {v.id}: {v.vector}
</div>
))}
</div>
)
}
