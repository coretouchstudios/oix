import { NextRequest } from "next/server";
import http from "http";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  { params }: { params: { port: string } }
) {
  const port = params.port;

  return new Promise((resolve) => {
    const proxy = http.request(
      {
        hostname: "localhost",
        port,
        path: req.nextUrl.pathname,
        method: "GET",
      },
      (res) => {
        let data = "";

        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          resolve(
            new Response(data, {
              headers: {
                "Content-Type": res.headers["content-type"] || "text/html",
              },
            })
          );
        });
      }
    );

    proxy.end();
  });
}