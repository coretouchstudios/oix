type WorkflowInput = {
  nodes: any[]
  edges: any[]
  emit?: (log: any) => void
}

export async function executeWorkflow(input: WorkflowInput) {

  const emit = (log: any) => {
    if (input.emit) input.emit(log)
  }

  emit({ type: "workflow:start", time: Date.now() })

  for (const node of input.nodes || []) {
    emit({
      type: "node",
      id: node.id || "unknown",
      label: node.label || "node",
      time: Date.now()
    })
  }

  emit({ type: "workflow:complete", time: Date.now() })

  return {
    status: "success"
  }
}