export async function embed(text:string){

return text.split("").map(c=>c.charCodeAt(0)/255)

}
