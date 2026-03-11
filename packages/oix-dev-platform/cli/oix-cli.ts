#!/usr/bin/env node

import {deployProject} from "../deploy/deploy"

const cmd=process.argv[2]

if(cmd==="deploy"){
deployProject()
}

if(cmd==="init"){
console.log("OIX project initialized")
}

if(cmd==="publish"){
console.log("Publishing to OIX marketplace...")
}
