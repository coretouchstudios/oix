export function generateStartupIdea(){

 const ideas = [

  "AI Marketing Platform",
  "Automated SaaS Analytics",
  "AI Customer Support Tool",
  "AI Content Generator",
  "AI Sales Assistant"

 ]

 const random = ideas[Math.floor(Math.random()*ideas.length)]

 return random

}
