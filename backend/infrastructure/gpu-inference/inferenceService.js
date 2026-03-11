

class InferenceService{

constructor(){

this.gpus=[
{id:"gpu-1",load:0},
{id:"gpu-2",load:0}
]

}

route(prompt){

const gpu=this.gpus.sort((a,b)=>a.load-b.load)[0]

gpu.load+=1

console.log("routing inference to",gpu.id)

return "AI result for "+prompt

}

}

module.exports=InferenceService


