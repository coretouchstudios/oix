import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/* =========================
   📧 SEND EMAIL (GENERIC)
========================= */
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const res = await resend.emails.send({
      from: process.env.EMAIL_FROM || "OIX <no-reply@yourdomain.com>",
      to,
      subject,
      html,
    });

    return res;
  } catch (err) {
    console.error("Email error:", err);
    throw err;
  }
}

/* =========================
   ✅ EMAIL VERIFICATION
========================= */
export async function sendVerificationEmail(
  email: string,
  token: string
) {
  const url = `${process.env.BASE_URL}/verify-email?token=${token}`;

  return sendEmail({
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Verify your email</h2>
      <p>Click the button below to verify your account:</p>
      <a href="${url}" style="
        display:inline-block;
        padding:10px 20px;
        background:#6d28d9;
        color:white;
        text-decoration:none;
        border-radius:6px;
      ">Verify Email</a>
      <p>If you didn't request this, ignore this email.</p>
    `,
  });
}

/* =========================
   🔐 PASSWORD RESET
========================= */
export async function sendPasswordResetEmail(
  email: string,
  token: string
) {
  const url = `${process.env.BASE_URL}/reset-password?token=${token}`;

  return sendEmail({
    to: email,
    subject: "Reset your password",
    html: `
      <h2>Password Reset</h2>
      <p>Click below to reset your password:</p>
      <a href="${url}" style="
        display:inline-block;
        padding:10px 20px;
        background:#dc2626;
        color:white;
        text-decoration:none;
        border-radius:6px;
      ">Reset Password</a>
      <p>This link expires soon.</p>
    `,
  });
}

/* =========================
   ✨ MAGIC LINK LOGIN
========================= */
export async function sendMagicLink(email: string, token: string) {
  const url = `${process.env.BASE_URL}/magic-login?token=${token}`;

  return sendEmail({
    to: email,
    subject: "Your login link",
    html: `
      <h2>Login to OIX</h2>
      <p>Click below to login instantly:</p>
      <a href="${url}" style="
        display:inline-block;
        padding:10px 20px;
        background:#16a34a;
        color:white;
        text-decoration:none;
        border-radius:6px;
      ">Login</a>
      <p>This link expires in a few minutes.</p>
    `,
  });
}