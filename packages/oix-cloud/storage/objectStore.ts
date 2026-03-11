let storage:any={}

export function store(key:string,value:any){

storage[key]=value

}

export function load(key:string){

return storage[key]

}
