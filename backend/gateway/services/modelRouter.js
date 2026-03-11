

class ModelRouter{

route(prompt){

console.log("routing model request")

return{

response:"AI response for "+prompt

}

}

}

module.exports=ModelRouter


