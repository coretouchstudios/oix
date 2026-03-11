export class ArchitecturePlanner {

 async plan(reasoning:any){

  return {

   frontend:{
    framework:'nextjs',
    pages:['dashboard','login','settings']
   },

   backend:{
    framework:'node',
    services:['auth','projects','ai']
   },

   database:{
    type:'postgres',
    models:['users','projects']
   }

  }

 }

}
