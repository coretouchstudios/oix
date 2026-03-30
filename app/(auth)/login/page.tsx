"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);

    await fetch("/api/auth/magic/request", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    setLoading(false);
    alert("Check your email for login link");
  }

  return (
    <div className="space-y-4">

      {/* EMAIL INPUT */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 bg-black border border-white/10 rounded-lg"
      />

      {/* MAGIC LINK LOGIN */}
      <button
        onClick={login}
        disabled={loading}
        className="w-full p-3 bg-purple-600 rounded-lg hover:bg-purple-500 transition"
      >
        {loading ? "Sending..." : "Continue with Email"}
      </button>

      {/* DIVIDER */}
      <div className="text-center text-white/30 text-sm">
        OR
      </div>

      {/* 🔥 GOOGLE LOGIN BUTTON */}
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: "/api/auth/google-success",
          })
        }
        className="w-full p-3 bg-white text-black rounded-lg hover:bg-gray-200 transition"
      >
        Continue with Google
      </button>

    </div>
  );
}