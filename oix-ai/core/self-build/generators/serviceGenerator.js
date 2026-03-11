import fs from "fs"

export function generateService(name) {

  const folder = `services/${name}`

  fs.mkdirSync(folder, { recursive: true })

  const code = `
export function ${name}Service(){

  return {
    service: "${name}",
    status: "running"
  }

}
`

  fs.writeFileSync(`${folder}/${name}Service.js`, code)

  return "Service created"

}
