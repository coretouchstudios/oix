import {infer} from "../inference/inferenceEngine"

export async function inferenceAPI(req:any){

const {model,input}=req

return infer(model,input)

}
