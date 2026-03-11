import { VentureIdea } from "../types/ventureIdea"

export class IdeaGenerator {

 generateIdea():VentureIdea{

  return {

   id:Date.now().toString(),

   name:"AI Generated Startup",

   description:"An AI-generated SaaS platform concept",

   market:"AI SaaS"

  }

 }

}
