export async function getPlugins(){
return[
{id:"openai",name:"OpenAI Node",downloads:12000,rating:4.8},
{id:"scraper",name:"Web Scraper",downloads:8300,rating:4.6}
]
}
export async function installPlugin(id:string){
return{plugin:id,status:"installed"}
}
