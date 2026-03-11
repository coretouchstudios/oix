import { ControlCenter } from "../controller/controlCenter"

export class SystemMonitor {

 center = new ControlCenter()

 getStatus(){

  return this.center.getSystems()

 }

}
