import OpenAI from "openai";

export async function POST(req: Request) {
  const { code } = await req.json();

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "Continue the code naturally.",
      },
      {
        role: "user",
        content: code,
      },
    ],
  });

  return Response.json({
    completion: res.choices[0].message.content,
  });
}