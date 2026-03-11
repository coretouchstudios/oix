import { Startup } from "../models/startup.model"

const startups:Startup[] = []

export function registerStartup(startup:Startup){

 startups.push(startup)

 return startup

}

export function listStartups(){

 return startups

}
