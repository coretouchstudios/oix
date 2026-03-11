type Project = {
  id: string
}

export default async function Page() {

  const projects = (await fetch("/api/projects").then(r => r.json())) as Project[]

  const res = await fetch("/api/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      projectId: projects && projects.length > 0 ? projects[0].id : undefined,
      agent
    })
  })

}