export function optimizeWorkflow(workflow:any){

workflow.optimized=true

workflow.performance=(workflow.performance||1)*1.2

return workflow

}
