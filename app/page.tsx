import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export default function Home() {
  const token = cookies().get("accessToken")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    jwt.verify(token, SECRET);
    redirect("/dashboard");
  } catch {
    redirect("/login");
  }
}