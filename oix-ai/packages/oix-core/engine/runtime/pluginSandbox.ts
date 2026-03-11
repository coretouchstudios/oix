import vm from "vm"

export function runPlugin(code:string,input:any){

const sandbox={input,output:null}

vm.createContext(sandbox)

vm.runInContext(code,sandbox)

return sandbox.output

}
