

const ModelRegistry=require("./model-registry/modelRegistry")
const Training=require("./training/trainingPipeline")
const Auth=require("./auth/authService")
const Plugins=require("./plugins/pluginRuntime")
const Tenants=require("./tenancy/tenantManager")

console.log("OIX Cloud Platform Online")

const registry=new ModelRegistry()
const training=new Training()
const auth=new Auth()
const plugins=new Plugins()
const tenants=new Tenants()

tenants.create("default")

registry.register({
name:"oix-llm",
version:"1.0"
})

training.train("dataset-v1")


