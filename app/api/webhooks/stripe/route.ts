export const runtime = "nodejs";

export async function POST(req: Request) {
  return new Response("stripe webhook ok");
}