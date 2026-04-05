import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

/* CREATE WORKSPACE */
export async function POST(req: Request) {
  const { name, userId } = await req.json();

  const { data, error } = await supabase
    .from("workspaces")
    .insert([{ name, user_id: userId }])
    .select();

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(data);
}

/* GET WORKSPACES */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  const { data, error } = await supabase
    .from("workspaces")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error }, { status: 500 });

  return NextResponse.json(data);
}