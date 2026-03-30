import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

/* GET PROJECTS */
export async function GET(req: Request) {
  const token = req.headers.get("cookie")?.split("accessToken=")[1]?.split(";")[0];

  if (!token) return Response.json({ projects: [] });

  const decoded: any = jwt.verify(token, SECRET);

  const projects = await prisma.project.findMany({
    where: { userId: decoded.userId },
    orderBy: { createdAt: "desc" },
  });

  return Response.json({ projects });
}

/* CREATE PROJECT */
export async function POST(req: Request) {
  const token = req.headers.get("cookie")?.split("accessToken=")[1]?.split(";")[0];

  if (!token) return Response.json({ error: "Unauthorized" });

  const decoded: any = jwt.verify(token, SECRET);

  const { name } = await req.json();

  const project = await prisma.project.create({
    data: {
      name,
      userId: decoded.userId,
    },
  });

  return Response.json({ project });
}