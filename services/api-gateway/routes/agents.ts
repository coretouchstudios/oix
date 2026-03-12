const express = require("express")
const router = express.Router()
const axios = require("axios")

const AGENT_RUNTIME = process.env.AGENT_RUNTIME_URL

router.post("/run", async (req,res)=>{

  try{

    const response = await axios.post(
      `${AGENT_RUNTIME}/run`,
      req.body
    )

    res.json(response.data)

  }catch(err){

    console.error(err.message)

    res.status(500).json({
      error:"Agent execution failed"
    })

  }

})

module.exports = router