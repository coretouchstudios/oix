import { buildPlatform } from "../services/platform-builder/platformBuilderService.js"

async function main(){

  const result = await buildPlatform()

  console.log(result)

}

main()
