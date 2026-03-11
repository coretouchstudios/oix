let registry:any[]=[]

export function publishPackage(pkg:any){

registry.push(pkg)

return {
published:true,
package:pkg.name
}

}

export function listPackages(){
return registry
}
