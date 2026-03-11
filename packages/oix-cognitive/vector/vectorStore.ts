export class VectorStore{

vectors:any[]=[]

add(id:string,vector:number[],text:string){
this.vectors.push({id,vector,text})
}

search(vector:number[],limit=5){

return this.vectors
.map(v=>({
text:v.text,
score:Math.random()
}))
.sort((a,b)=>b.score-a.score)
.slice(0,limit)

}

}
