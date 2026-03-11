
export async function streamLLM(prompt,onToken){

const words=prompt.split(" ")

for(const w of words){

await new Promise(r=>setTimeout(r,80))

onToken(w)

}

}

