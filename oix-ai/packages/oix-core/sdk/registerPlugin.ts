const plugins:any={}

export function registerPlugin(name:string,plugin:any){
plugins[name]=plugin
}

export function getPlugin(name:string){
return plugins[name]
}
