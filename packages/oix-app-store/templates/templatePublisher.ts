export function publishTemplate(template:any){
return {
id:"template-"+Date.now(),
type:"template",
...template
}
}
