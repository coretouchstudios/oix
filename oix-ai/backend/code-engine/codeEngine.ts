export class CodeEngine {

 async generateCode(templates:any){

  return {

   frontendFiles:[
    {
     path:'apps/web-platform/pages/index.tsx',
     content:'export default function Home(){return <h1>OIX App</h1>}'
    }
   ],

   backendFiles:[
    {
     path:'backend/api/server.ts',
     content:'console.log(""OIX API Running"")'
    }
   ]

  }

 }

}
