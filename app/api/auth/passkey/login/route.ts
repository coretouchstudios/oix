import { getLoginOptions } from "@/lib/passkeys";

export async function POST() {
  const options = getLoginOptions();
  return Response.json(options);
}