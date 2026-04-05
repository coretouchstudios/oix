import { supabase } from "./supabase";

export function subscribeToWorkspace(workspace: string, cb: Function) {
  return supabase
    .channel("workspace:" + workspace)
    .on("broadcast", { event: "update" }, (payload) => {
      cb(payload);
    })
    .subscribe();
}