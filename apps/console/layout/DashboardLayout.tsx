export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: 20 }}>
      <h1>OIX Console</h1>
      {children}
    </div>
  )
}