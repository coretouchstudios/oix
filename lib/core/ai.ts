export async function runAgent(input: string, userId: string) {
  const res = await fetch("/api/agents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-user": userId,
    },
    body: JSON.stringify({ message: input }),
  });

  if (!res.body) throw new Error("No stream");

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  let output = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    output += chunk;
  }

  return output;
}