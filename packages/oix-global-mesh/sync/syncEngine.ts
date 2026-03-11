import {publishKnowledge} from "../knowledge/globalKnowledge"

export function syncCluster(data:any){

publishKnowledge(data)

return {
synced:true
}

}
