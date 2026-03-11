export function analyzeCompanies(){

 console.log("Mapping global companies")

 const companies = [
  "emerging AI startups",
  "robotics manufacturers",
  "climate technology firms",
  "digital health platforms"
 ]

 const companyGroup = companies[Math.floor(Math.random()*companies.length)]

 return {

  sector:companyGroup,
  disruptionRisk:Math.floor(Math.random()*100)

 }

}
