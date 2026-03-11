let regions:any[]=[]

export function registerRegion(region:any){

regions.push(region)

return region

}

export function listRegions(){

return regions

}
