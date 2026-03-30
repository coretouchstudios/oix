import OpenAI from "openai";
import { getRelevantMemory } from "./chat.js";
import { saveMemory } from "./memory.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function chat(userInput) {
  // 🧠 1. Get memory
  const memories = await getRelevantMemory(userInput);

  const memoryText = memories
    .map(m => `User: ${m.input}\nAI: ${m.output}`)
    .join("\n");

  // 🤖 2. Call OpenAI
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are an AI with memory. Use past memory to answer better.\n\n${memoryText}`,
      },
      {
        role: "user",
        content: userInput,
      },
    ],
  });

  const response = completion.choices[0].message.content;

  // 💾 3. Save memory
  await saveMemory(userInput, response);

  return response;
}