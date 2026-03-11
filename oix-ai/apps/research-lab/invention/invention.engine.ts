export function inventTechnology(){

 console.log("Generating new technology concept")

 const inventions = [
  "Quantum AI optimization processor",
  "Autonomous robotic manufacturing swarm",
  "Self-learning energy grid AI",
  "Synthetic biology AI design system"
 ]

 const invention = inventions[Math.floor(Math.random()*inventions.length)]

 return {
  invention,
  field:"advanced technology"
 }

}
