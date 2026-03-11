export function createNodePlugin(config:any){

return {
name:config.name,
version:config.version || "1.0.0",
run:config.run,
inputs:config.inputs || [],
outputs:config.outputs || []
}

}
