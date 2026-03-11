export function computeMetrics(system:any){

return {
agents:system.agents?.length || 0,
workflows:system.workflows?.length || 0,
efficiency:Math.random()*100
}

}
