export const templates = {

chatbot:{
nodes:[
{id:"1",data:{label:"prompt"},position:{x:100,y:100}},
{id:"2",data:{label:"llm"},position:{x:350,y:100}}
],
edges:[
{id:"e1",source:"1",target:"2"}
]
},

researchAgent:{
nodes:[
{id:"1",data:{label:"prompt"},position:{x:100,y:100}},
{id:"2",data:{label:"agent"},position:{x:350,y:100}},
{id:"3",data:{label:"tool"},position:{x:600,y:100}}
],
edges:[
{id:"e1",source:"1",target:"2"},
{id:"e2",source:"2",target:"3"}
]
}

}