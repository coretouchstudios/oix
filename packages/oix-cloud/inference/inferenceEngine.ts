import {getModel} from "../models/modelRegistry"

export async function infer(modelName:string,input:any){

const model=getModel(modelName)

if(!model) throw new Error("model not found")

return {
model:modelName,
output:"AI_RESULT:"+JSON.stringify(input)
}

}
