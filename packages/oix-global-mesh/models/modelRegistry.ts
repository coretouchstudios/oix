let models:any[]=[]

export function registerModel(model:any){

models.push(model)

return model

}

export function listModels(){

return models

}
