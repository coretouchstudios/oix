export async function stream(prompt:string,emit:(chunk:string)=>void){

const words=prompt.split(" ")

for(const w of words){

await new Promise(r=>setTimeout(r,50))

emit(w)

}

}
