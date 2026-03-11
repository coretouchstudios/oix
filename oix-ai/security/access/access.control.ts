export const roles = {

 ADMIN:"admin",
 USER:"user",
 DEVELOPER:"developer"

}

export function hasAccess(role:string,required:string){

 return role === required

}
