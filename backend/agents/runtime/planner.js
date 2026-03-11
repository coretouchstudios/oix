
function plan(task){

return [
{step:"analyze",input:task},
{step:"research",input:task},
{step:"generate",input:task}
]

}

module.exports={plan}

