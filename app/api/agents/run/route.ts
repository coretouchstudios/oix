import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { planner } from "@/lib/core/agents/planner";
import { builder } from "@/lib/core/agents/builder";
import { fixer } from "@/lib/core/agents/fixer";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // IMPORTANT
);

export async function POST(req: Request) {
  const { goal, userId } = await req.json();

  /* ===== CREATE MISSION ===== */
  const { data: mission } = await supabase
    .from("missions")
    .insert({
      user_id: userId,
      goal,
      status: "running",
    })
    .select()
    .single();

  let output = "";

  /* ===== PLANNER ===== */
  const plan = await planner(goal);

  for (const step of plan) {
    await supabase.from("agent_logs").insert({
      mission_id: mission.id,
      role: "planner",
      content: step,
    });
  }

  /* ===== BUILDER ===== */
  for (const step of plan) {
    const result = await builder(step);

    output += result + "\n";

    await supabase.from("agent_logs").insert({
      mission_id: mission.id,
      role: "builder",
      content: result,
    });
  }

  /* ===== FIXER ===== */
  const improved = await fixer(output);

  await supabase.from("agent_logs").insert({
    mission_id: mission.id,
    role: "fixer",
    content: improved,
  });

  /* ===== COMPLETE ===== */
  await supabase
    .from("missions")
    .update({ status: "done" })
    .eq("id", mission.id);

  return NextResponse.json({ success: true, missionId: mission.id });
}