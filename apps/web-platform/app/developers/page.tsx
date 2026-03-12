type Project = {
  id: string
}

const agent = "default"

export default async function Page() {
  const projects = (await fetch("http://localhost:3000/api/projects").then(r =>
    r.json()
  )) as Project[]

  const res = await fetch("http://localhost:3000/api/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      projectId: projects && projects.length > 0 ? projects[0].id : undefined,
      agent
    })
  })

  const data = await res.json()

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}