export function generateAgent(spec:any){

return {
id:"agent-"+Date.now(),
skills:spec.skills || [],
goal:spec.goal,
created:Date.now()
}

}
