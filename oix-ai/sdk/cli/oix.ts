console.log("OIX CLI")

const args = process.argv.slice(2)

if(args[0] === "create"){
  console.log("Creating project:", args[1])
}
