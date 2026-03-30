/* =========================
   🔐 LOGIN USER
========================= */
export async function loginUser(email: string) {
  const res = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  const data = await res.json();

  // ✅ Store BOTH user + token
  localStorage.setItem("oix_user", JSON.stringify(data.user));
  localStorage.setItem("oix_token", data.token);

  return data.user;
}

/* =========================
   👤 GET USER
========================= */
export function getUser() {
  const user = localStorage.getItem("oix_user");
  return user ? JSON.parse(user) : null;
}

/* =========================
   🔑 GET TOKEN
========================= */
export function getToken() {
  return localStorage.getItem("oix_token");
}

/* =========================
   🚪 LOGOUT
========================= */
export function logoutUser() {
  localStorage.removeItem("oix_user");
  localStorage.removeItem("oix_token");
}

/* =========================
   📡 AUTH FETCH (AUTO TOKEN)
========================= */
export async function authFetch(url: string, options: RequestInit = {}) {
  const token = getToken();

  return fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
}