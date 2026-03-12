import axios from "axios"

export async function triggerAgent(data: any) {

  const runtime = process.env.AGENT_RUNTIME_URL

  const res = await axios.post(`${runtime}/run`, data)

  return res.data

}