import { supabase } from "./supabase";

/* =========================
   👤 GET USER
========================= */
export async function getUser() {
  const { data, error } = await supabase.auth.getUser();

  if (error) return null;
  return data.user;
}

/* =========================
   🔑 GET SESSION TOKEN
========================= */
export async function getToken() {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token || null;
}

/* =========================
   🚪 LOGOUT
========================= */
export async function logoutUser() {
  await supabase.auth.signOut();
}

/* =========================
   📡 AUTH FETCH (SECURE)
========================= */
export async function authFetch(
  url: string,
  options: RequestInit = {}
) {
  const token = await getToken();

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
}