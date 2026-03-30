import { generateRegistrationOptions } from "@simplewebauthn/server";

export async function POST() {
  const options = generateRegistrationOptions({
    rpName: "OIX",
    rpID: "localhost",
    userID: "temp-id",
    userName: "temp@email.com",
  });

  return Response.json(options);
}