import {inferenceAPI} from "../api/inferenceApi"
import {bill} from "../billing/billing"

export class CloudRuntime{

async request(user:string,model:string,input:any){

const result=await inferenceAPI({
model,
input
})

bill(user,0.01)

return result

}

}
