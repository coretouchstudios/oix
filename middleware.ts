import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  const subdomain = host.split(".")[0];

  if (
    subdomain &&
    subdomain !== "www" &&
    subdomain !== "oixwork"
  ) {
    const url = req.nextUrl.clone();
    url.pathname = `/projects/${subdomain}/live`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}