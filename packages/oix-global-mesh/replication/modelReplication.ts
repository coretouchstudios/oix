import {listModels} from "../models/modelRegistry"

export function replicateModel(modelName:string,targetRegion:string){

const model=listModels().find((m:any)=>m.name===modelName)

if(!model) throw new Error("model not found")

return {
model:modelName,
replicatedTo:targetRegion
}

}
