import { supabase } from "./supabase";

export function trackPresence(userId: string) {
  return supabase.channel("presence")
    .on("presence", { event: "sync" }, () => {
      console.log("Presence updated");
    })
    .subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await supabase.channel("presence").track({
          user: userId,
          online_at: new Date().toISOString(),
        });
      }
    });
}