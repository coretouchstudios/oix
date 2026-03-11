let datasets:any[]=[]

export function uploadDataset(data:any){

datasets.push({
id:Date.now(),
data
})

return {status:"stored"}

}

export function listDatasets(){

return datasets

}
