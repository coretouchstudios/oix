type WorkflowInput = {
  nodes: any[]
  edges: any[]
  emit?: (log: any) => void
}

export async function executeWorkflow(input: WorkflowInput) {

  const emit = (log:any)=>{
    if(input.emit) input.emit(log)
  }

  emit({ type: "start", time: Date.now() })

  for (const node of input.nodes || []) {
    emit({
      type: "node",
      id: node?.id || "unknown",
      label: node?.label || "node",
      time: Date.now()
    })
  }

  emit({ type: "complete", time: Date.now() })

  return { status: "ok" }
}