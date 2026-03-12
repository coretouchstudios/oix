type Project = {
  id: string
}

const agent = "default"

export default async function Page() {

  const projects = (await fetch("/api/projects").then(r => r.json())) as Project[]
  const projectId = projects?.[0]?.id

  const res = await fetch("/api/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      projectId,
      agent
    })
  })

  const data = await res.json()

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}