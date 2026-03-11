
const {Worker}=require("bullmq")
const {runAgent}=require("../agents/runtime/agentRunner")

const connection={host:"127.0.0.1",port:6379}

const worker=new Worker(
"agent-jobs",
async job=>{
const {task}=job.data
return await runAgent(task)
},
{connection}
)

console.log("🚀 OIX Worker Online")

