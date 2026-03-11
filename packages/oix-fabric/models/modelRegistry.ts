let models:any[]=[]

export function registerModel(model:any){
models.push(model)
}

export function getModels(){
return models
}
