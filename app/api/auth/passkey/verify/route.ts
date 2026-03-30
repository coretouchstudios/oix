import { verifyRegistrationResponse } from "@simplewebauthn/server";

export async function POST(req: Request) {
  const body = await req.json();

  const verification = await verifyRegistrationResponse({
    response: body,
    expectedOrigin: "http://localhost:3000",
    expectedRPID: "localhost",
  });

  return Response.json({ verified: verification.verified });
}