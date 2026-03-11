

class PluginRuntime{

constructor(){

this.plugins=[]

}

install(plugin){

this.plugins.push(plugin)

console.log("plugin installed")

}

run(name,input){

console.log("running plugin",name)

return input

}

}

module.exports=PluginRuntime


