export function publishPlugin(plugin:any){
return {
id:"plugin-"+Date.now(),
type:"plugin",
...plugin
}
}
