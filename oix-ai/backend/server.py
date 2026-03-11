from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
 CORSMiddleware,
 allow_origins=["*"],
 allow_credentials=True,
 allow_methods=["*"],
 allow_headers=["*"]
)

agents = [
 {"name":"builder","status":"online"},
 {"name":"research","status":"online"},
 {"name":"automation","status":"online"}
]

@app.get("/")
def root():
 return {"system":"OIX ONLINE"}

@app.get("/agents")
def get_agents():
 return agents
