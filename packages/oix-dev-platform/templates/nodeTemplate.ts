export function nodeTemplate(name:string){

return `
import {createNode} from "@oix/sdk"

export default createNode({
name:"${name}",
async execute(input){
return input
}
})
`

}
