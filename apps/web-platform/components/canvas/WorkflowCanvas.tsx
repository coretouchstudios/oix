import ReactFlow, { Node, Edge } from "reactflow"
import "reactflow/dist/style.css"

const nodes: Node[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Start" },
    type: "default"
  }
]

const edges: Edge[] = []

export default function WorkflowCanvas() {
  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ReactFlow nodes={nodes} edges={edges} />
    </div>
  )
}