let developers:any[]=[]

export function registerDeveloper(dev:any){
developers.push(dev)
return dev
}

export function listDevelopers(){
return developers
}
