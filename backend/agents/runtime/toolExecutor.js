
async function execute(step){

if(step.step==="analyze")
return "analysis complete"

if(step.step==="research")
return "research complete"

if(step.step==="generate")
return "generation complete"

}

module.exports={execute}

