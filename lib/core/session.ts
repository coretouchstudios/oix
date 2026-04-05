import { supabase } from "@/lib/supabase";

export async function getSessionUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}