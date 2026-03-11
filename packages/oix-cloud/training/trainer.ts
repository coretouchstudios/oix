import {getModel} from "../models/modelRegistry"

export async function runTraining(modelName:string,dataset:any){

const model=getModel(modelName)

if(!model) throw new Error("model not found")

return {
status:"training-started",
model:modelName,
dataset
}

}
