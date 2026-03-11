"use client"

export default function LogsPanel({ logs = [] }: any) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 160,
        background: "#020617",
        borderTop: "1px solid #1e293b",
        overflowY: "auto",
        fontSize: 12,
        padding: 10
      }}
    >
      {logs.length === 0 && (
        <div style={{ opacity: 0.6 }}>Execution logs will appear here...</div>
      )}

      {logs.map((log: any, i: number) => (
        <div key={i} style={{ marginBottom: 4 }}>
          {log}
        </div>
      ))}
    </div>
  )
}