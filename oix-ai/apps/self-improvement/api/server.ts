import express from "express"
import selfRoutes from "../routes/self.routes"

const app = express()

app.use("/self",selfRoutes)

app.listen(11000,()=>{

 console.log("Self Improvement Layer running on port 11000")

})
