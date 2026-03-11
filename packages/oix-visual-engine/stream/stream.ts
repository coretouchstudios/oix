export async function streamOutput(text:string,emit:(chunk:string)=>void){

const words=text.split(" ")

for(const w of words){

emit(w)

await new Promise(r=>setTimeout(r,40))

}

}
