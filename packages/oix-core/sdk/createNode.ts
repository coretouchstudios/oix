export function createNode(config:any){

return {
type:config.type,
run:config.run,
inputs:config.inputs||[],
outputs:config.outputs||[]
}

}
