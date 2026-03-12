export async function api(p: string) {
  const r = await fetch("/api/" + p)
  return r.json()
}