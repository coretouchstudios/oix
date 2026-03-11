import fs from "fs"

export function generateAPI(name){

  const code = `
import express from "express"

const router = express.Router()

router.get("/", (req,res)=>{

  res.json({
    api: "${name}",
    status: "ok"
  })

})

export default router
`

  fs.writeFileSync(`backend/${name}API.js`, code)

  return "API created"

}
