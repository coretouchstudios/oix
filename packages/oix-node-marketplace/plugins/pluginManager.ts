let installed:any[]=[]

export function installPlugin(plugin:any){

installed.push(plugin)

return {status:"installed",plugin}

}

export function getInstalled(){

return installed

}
