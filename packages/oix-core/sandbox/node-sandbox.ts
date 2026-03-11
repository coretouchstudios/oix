import vm from "vm"

export async function runNodeSandbox(code:string,input:any){

const sandbox={

input,
output:null,
console

}

vm.createContext(sandbox)

const script=new vm.Script(code)

script.runInContext(sandbox)

return sandbox.output

}