export interface OIXPlugin{
name:string
version:string
install():Promise<void>
}

export function createPlugin(plugin:OIXPlugin){
return plugin
}
