
const {exec}=require("child_process")

function scale(workers){

for(let i=0;i<workers;i++){
exec("node backend/cluster/worker.js")
}

console.log("Scaled workers:",workers)

}

module.exports={scale}

