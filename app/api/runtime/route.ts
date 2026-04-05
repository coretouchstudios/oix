export async function POST(req: Request) {
  const { code } = await req.json();

  try {
    const result = eval(code);
    return Response.json({ result });
  } catch (e: any) {
    return Response.json({ error: e.message });
  }
}