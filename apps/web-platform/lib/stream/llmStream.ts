export async function streamLLM(
  prompt: string,
  onToken: (token: string) => void
) {

  const words = prompt.split(" ")

  for (const word of words) {
    onToken(word)
    await new Promise(r => setTimeout(r, 50))
  }

}