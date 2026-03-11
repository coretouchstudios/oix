import {NextResponse} from "next/server"

export async function POST(req:Request){

const stream = new ReadableStream({

async start(controller){

controller.enqueue("Running workflow...\n")

setTimeout(()=>{
controller.enqueue("LLM response chunk 1\n")
},500)

setTimeout(()=>{
controller.enqueue("LLM response chunk 2\n")
controller.close()
},1000)

}

})

return new NextResponse(stream)

}