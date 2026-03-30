// ✅ Force Node runtime (important for future upgrades)
export const runtime = "nodejs";

/**
 * TEMP SOCKET ENDPOINT (VERCEL SAFE)
 * This keeps your build passing and gives you a health check endpoint.
 */

export async function GET() {
  return Response.json({
    status: "ok",
    message: "Socket endpoint ready (external server required)",
  });
}