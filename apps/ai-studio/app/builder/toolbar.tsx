"use client"

const nodes = [
  { type: "prompt", label: "Prompt" },
  { type: "llm", label: "LLM" },
  { type: "agent", label: "Agent" },
  { type: "memory", label: "Memory" },
  { type: "tool", label: "Tool" }
]

export default function Toolbar() {

  const onDragStart = (event:any, nodeType:string) => {
    event.dataTransfer.setData("application/reactflow", nodeType)
    event.dataTransfer.effectAllowed = "move"
  }

  return (
    <div style={{
      position:"absolute",
      left:10,
      top:80,
      display:"flex",
      flexDirection:"column",
      gap:8
    }}>
      {nodes.map(n=>(
        <div
          key={n.type}
          draggable
          onDragStart={(e)=>onDragStart(e,n.type)}
          style={{
            padding:"6px 10px",
            background:"#1e293b",
            borderRadius:6,
            cursor:"grab"
          }}
        >
          {n.label}
        </div>
      ))}
    </div>
  )
}