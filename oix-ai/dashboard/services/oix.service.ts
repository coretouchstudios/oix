import {api} from '../lib/api'

export const OIXService={

async runTask(task:string){
const res=await api.post('/task',{task})
return res.data
}

}
