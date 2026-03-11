import express from "express"
import cors from "cors"
import routes from "../routes/routes"
import { logger } from "../middleware/logger"

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

app.use("/api",routes)

const PORT = 4000

app.listen(PORT,()=>{

 console.log("OIX API Gateway Running on port",PORT)

})
