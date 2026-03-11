import express from 'express'
import { BuilderEngine } from '../../builder-engine/builderEngine'

const router = express.Router()

const builder = new BuilderEngine()

router.post('/build', async(req,res)=>{

 const {prompt} = req.body

 const project = await builder.build(prompt)

 res.json(project)

})

export default router
