"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function register() {
    setLoading(true);

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    setLoading(false);

    if (res.ok) {
      alert("Check your email to verify your account");
      window.location.href = "/login";
    } else {
      alert(data.error || "Registration failed");
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Create Account</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-white/10"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-white/10"
        />

        <button
          onClick={register}
          disabled={loading}
          className="w-full py-3 bg-purple-500 rounded"
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>

        <div className="text-sm text-white/40 text-center">
          Already have an account?
        </div>

        <button
          onClick={() => (window.location.href = "/login")}
          className="w-full py-3 border border-white/10 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
}