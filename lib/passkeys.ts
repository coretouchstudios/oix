import {
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";

const rpName = "OIX";
const rpID = process.env.DOMAIN!;

/* =========================
   🔑 REGISTER OPTIONS
========================= */
export function getRegisterOptions(user: any) {
  return generateRegistrationOptions({
    rpName,
    rpID,
    userID: user.id,
    userName: user.email,
  });
}

/* =========================
   ✅ VERIFY REGISTER
========================= */
export async function verifyRegister(body: any, expectedChallenge: string) {
  return verifyRegistrationResponse({
    response: body,
    expectedChallenge,
    expectedOrigin: `https://${rpID}`,
    expectedRPID: rpID,
  });
}

/* =========================
   🔐 LOGIN OPTIONS
========================= */
export function getLoginOptions() {
  return generateAuthenticationOptions({
    rpID,
  });
}

/* =========================
   ✅ VERIFY LOGIN
========================= */
export async function verifyLogin(body: any, expectedChallenge: string) {
  return verifyAuthenticationResponse({
    response: body,
    expectedChallenge,
    expectedOrigin: `https://${rpID}`,
    expectedRPID: rpID,
  });
}