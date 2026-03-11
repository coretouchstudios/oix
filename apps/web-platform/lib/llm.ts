
export async function streamLLM(prompt:string,onToken:(t:string)=>void){
const words=prompt.split(" ")
for(const w of words){
await new Promise(r=>setTimeout(r,100))
onToken(w)
}
}

