import { supabase } from "@/lib/supabase";

export function subscribeLogs(missionId: string, callback: any) {
  return supabase
    .channel("logs")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "agent_logs",
        filter: `mission_id=eq.${missionId}`,
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();
}