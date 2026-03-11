import {permissions} from "./roles"
export function can(role:string,action:string){
const perms=(permissions as any)[role]
if(!perms) return false
return perms.includes(action)
}
