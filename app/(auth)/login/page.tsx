"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  /* ---------------- AUTO REDIRECT IF LOGGED IN ---------------- */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        router.replace("/mission");
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          router.replace("/mission");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  /* ---------------- EMAIL LOGIN ---------------- */
  async function login() {
    if (!email) return;

    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${location.origin}/mission`,
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email ✉️");
    }

    setLoading(false);
  }

  /* ---------------- GOOGLE LOGIN ---------------- */
  async function loginWithGoogle() {
    setLoading(true);

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/mission`,
      },
    });
  }

  return (
    <div className="flex h-screen items-center justify-center bg-black text-white">
      <div className="p-6 border border-white/10 rounded-xl w-80 space-y-4 bg-white/5 backdrop-blur">

        <h1 className="text-xl font-bold text-center">Login to OIX</h1>

        {/* EMAIL INPUT */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border border-white/10 p-2 rounded bg-black/40 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* EMAIL LOGIN */}
        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-white text-black p-2 rounded font-medium"
        >
          {loading ? "Sending link..." : "Login with Email"}
        </button>

        {/* DIVIDER */}
        <div className="text-center text-xs text-gray-400">OR</div>

        {/* GOOGLE LOGIN */}
        <button
          onClick={loginWithGoogle}
          disabled={loading}
          className="w-full border border-white/20 p-2 rounded"
        >
          Continue with Google
        </button>

      </div>
    </div>
  );
}