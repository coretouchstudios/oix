let models:any[]=[]

export function registerModel(model:any){

models.push({
...model,
created:Date.now()
})

return model

}

export function getModels(){

return models

}

export function getModel(name:string){

return models.find(m=>m.name===name)

}
