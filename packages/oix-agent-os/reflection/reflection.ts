export class Reflection{

reflect(result:any){

if(!result) return {retry:true}

if(typeof result==="string" && result.length<5){
return {retry:true}
}

return {retry:false}

}

}
