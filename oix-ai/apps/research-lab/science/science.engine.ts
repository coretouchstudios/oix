export function discoverScience(){

 console.log("Searching for scientific breakthroughs")

 const discoveries = [
  "New battery chemistry with 3x energy density",
  "AI-designed protein for medical therapy",
  "Efficient carbon capture material",
  "Autonomous climate modeling algorithm"
 ]

 const discovery = discoveries[Math.floor(Math.random()*discoveries.length)]

 return {

  discovery,
  field:"scientific research"

 }

}
