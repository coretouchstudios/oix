
export const nodes=[
{id:"1",position:{x:0,y:0},data:{label:"Start"},type:"input"},
{id:"2",position:{x:200,y:100},data:{label:"LLM"},type:"default"},
{id:"3",position:{x:400,y:0},data:{label:"Output"},type:"output"}
]

export const edges=[
{id:"e1-2",source:"1",target:"2"},
{id:"e2-3",source:"2",target:"3"}
]

