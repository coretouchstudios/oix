
export async function GET(){

const stream=new ReadableStream({

start(controller){

controller.enqueue("AI streaming output...")

controller.close()

}

})

return new Response(stream)

}

