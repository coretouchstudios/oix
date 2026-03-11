Write-Host "🚀 Bootstrapping OIX AI Swarm..."

$root="oix-ai"
New-Item $root -ItemType Directory -Force | Out-Null
Set-Location $root

$folders=@(
"core",
"agents",
"tools",
"memory",
"automation",
"api",
"dashboard",
"dashboard/app",
"dashboard/components",
"dashboard/lib"
)

foreach($f in $folders){
    New-Item -ItemType Directory -Force -Path $f | Out-Null
}

# Orchestrator
@"
from core.router import route_task
from memory.session_memory import Memory

class Orchestrator:

    def __init__(self):
        self.memory = Memory()

    async def run(self, task):
        agent = route_task(task)
        result = await agent.execute(task)
        self.memory.store(task,result)
        return result
"@ | Set-Content core/orchestrator.py

# Router
@"
from agents.research_agent import ResearchAgent
from agents.coding_agent import CodingAgent
from agents.automation_agent import AutomationAgent

def route_task(task):

    task=task.lower()

    if "code" in task:
        return CodingAgent()

    if "automate" in task:
        return AutomationAgent()

    return ResearchAgent()
"@ | Set-Content core/router.py

# Memory
@"
class Memory:

    def __init__(self):
        self.history=[]

    def store(self,task,result):
        self.history.append({"task":task,"result":result})

    def recall(self):
        return self.history
"@ | Set-Content memory/session_memory.py

# Base agent
@"
class BaseAgent:

    name="base"

    async def execute(self,task):
        raise NotImplementedError
"@ | Set-Content agents/base_agent.py

# Research agent
@"
from agents.base_agent import BaseAgent

class ResearchAgent(BaseAgent):

    name="research"

    async def execute(self,task):
        return {"agent":self.name,"task":task,"result":"research done"}
"@ | Set-Content agents/research_agent.py

# Coding agent
@"
from agents.base_agent import BaseAgent

class CodingAgent(BaseAgent):

    name="coder"

    async def execute(self,task):
        return {"agent":self.name,"task":task,"result":"code generated"}
"@ | Set-Content agents/coding_agent.py

# Automation agent
@"
from agents.base_agent import BaseAgent

class AutomationAgent(BaseAgent):

    name="automation"

    async def execute(self,task):
        return {"agent":self.name,"task":task,"result":"automation created"}
"@ | Set-Content agents/automation_agent.py

# API
@"
from fastapi import FastAPI
from core.orchestrator import Orchestrator

app = FastAPI()
brain = Orchestrator()

@app.get("/")
def root():
    return {"system":"OIX ONLINE"}

@app.post("/task")
async def run(task:str):
    return await brain.run(task)
"@ | Set-Content api/server.py

# Dashboard package
@"
{
"name":"oix-dashboard",
"private":true,
"scripts":{"dev":"next dev"},
"dependencies":{
"next":"latest",
"react":"latest",
"react-dom":"latest"
}
}
"@ | Set-Content dashboard/package.json

# Next layout
@"
export const metadata={title:"OIX"}

export default function RootLayout({children}){
return(
<html lang="en">
<body>{children}</body>
</html>
)
}
"@ | Set-Content dashboard/app/layout.js

# Next page
@"
export default function Page(){
return(
<main>
<h1>OIX AI Swarm</h1>
<p>System Online</p>
</main>
)
}
"@ | Set-Content dashboard/app/page.js

pip install fastapi uvicorn | Out-Null

Set-Location dashboard
npm install | Out-Null
Set-Location ..

Write-Host ""
Write-Host "✅ OIX AI SWARM INSTALLED"
Write-Host ""
Write-Host "Start backend:"
Write-Host "cd api ; uvicorn server:app --reload --port 8000"
Write-Host ""
Write-Host "Start dashboard:"
Write-Host "cd dashboard ; npm run dev"
Write-Host ""
Write-Host "Dashboard → http://localhost:3000"
Write-Host "API → http://localhost:8000"
