import speakeasy from "speakeasy";
import QRCode from "qrcode";

/* =========================
   🔑 GENERATE SECRET
========================= */
export async function generate2FA(email: string) {
  const secret = speakeasy.generateSecret({
    length: 20,
    name: `OIX (${email})`,
  });

  const qr = await QRCode.toDataURL(secret.otpauth_url!);

  return {
    base32: secret.base32,
    qr,
  };
}

/* =========================
   ✅ VERIFY TOKEN
========================= */
export function verify2FA(token: string, secret: string) {
  return speakeasy.totp({
    secret,
    encoding: "base32",
    token,
    window: 1,
  });
}