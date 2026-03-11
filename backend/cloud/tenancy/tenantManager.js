

class TenantManager{

constructor(){

this.tenants=[]

}

create(name){

const t={name}

this.tenants.push(t)

console.log("tenant created",name)

return t

}

}

module.exports=TenantManager


