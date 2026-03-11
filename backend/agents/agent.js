require("dotenv").config()

const OpenAI = require("openai")

let client = null

if (process.env.OPENAI_API_KEY) {
  client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })
}

async function runAgent(task) {

  if (!client) {
    return "⚠️ OPENAI_API_KEY missing"
  }

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are an AI agent in the OIX platform." },
      { role: "user", content: task }
    ]
  })

  return res.choices[0].message.content
}

module.exports = { runAgent }