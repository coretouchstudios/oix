export function agentTemplate(name:string){

return `
import {createAgent} from "@oix/sdk"

export default createAgent({
name:"${name}",
async run(task){
return task
}
})
`

}
