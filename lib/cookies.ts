import { cookies } from "next/headers";

export function setAuthCookie(token: string) {
  cookies().set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export function getAuthCookie() {
  return cookies().get("auth_token")?.value;
}

export function clearAuthCookie() {
  cookies().delete("auth_token");
}